import "server-only";
import type { AdapterResult, CrmAdapter, ProspectInput } from "./contracts";

type SalesforceConfig = {
  loginUrl: string;
  clientId: string;
  clientSecret: string;
  apiVersion: string;
  externalIdField: string;
  defaultCompany: string;
  campaignId?: string;
};

type TokenResponse = { access_token: string; instance_url: string };
type UpsertResponse = { id?: string; success?: boolean; created?: boolean };

function configFromEnvironment(): SalesforceConfig | null {
  const clientId = process.env.SALESFORCE_CLIENT_ID;
  const clientSecret = process.env.SALESFORCE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  return {
    loginUrl: process.env.SALESFORCE_LOGIN_URL ?? "https://login.salesforce.com",
    clientId,
    clientSecret,
    apiVersion: process.env.SALESFORCE_API_VERSION ?? "v66.0",
    externalIdField: process.env.SALESFORCE_EXTERNAL_ID_FIELD ?? "Website_Submission_ID__c",
    defaultCompany: process.env.SALESFORCE_DEFAULT_COMPANY ?? "Individual Prospect",
    campaignId: process.env.SALESFORCE_CAMPAIGN_ID,
  };
}

/** Every upstream call is bounded, so a hung Salesforce cannot hold a request open. */
const UPSTREAM_TIMEOUT_MS = 8000;

/**
 * Returns the token, or a classified failure. Throwing here previously made an
 * expired secret indistinguishable from an outage, so a permanent
 * misconfiguration was reported to visitors as a temporary one for as long as
 * it lasted.
 */
async function getToken(config: SalesforceConfig): Promise<{ ok: true; token: TokenResponse } | { ok: false; result: AdapterResult }> {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });
  const response = await fetch(`${config.loginUrl}/services/oauth2/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
  if (!response.ok) {
    const permanent = response.status === 400 || response.status === 401 || response.status === 403;
    return {
      ok: false,
      result: {
        ok: false,
        kind: permanent ? "permanent" : "retryable",
        code: permanent ? "salesforce_auth_failed" : `salesforce_token_http_${response.status}`,
        safeMessage: permanent
          ? "Salesforce rejected these integration credentials."
          : "Salesforce is temporarily unavailable.",
      },
    };
  }
  return { ok: true, token: (await response.json()) as TokenResponse };
}

function leadPayload(input: ProspectInput, config: SalesforceConfig): Record<string, string | boolean> {
  const payload: Record<string, string | boolean> = {
    FirstName: input.givenName ?? "",
    LastName: input.familyName?.trim() || "Prospective Student",
    Company: config.defaultCompany,
    Email: input.email,
    LeadSource: "Website",
  };

  if (input.phone) payload.Phone = input.phone;
  if (input.country) payload.Country = input.country;
  if (input.province) payload.State = input.province;

  // Custom academic-interest and consent fields are intentionally not guessed.
  // Add them only after the Kingswood Salesforce schema is exported and approved.
  return payload;
}

function classifyFailure(status: number): AdapterResult {
  const retryable = status === 408 || status === 429 || status >= 500;
  return {
    ok: false,
    kind: retryable ? "retryable" : "permanent",
    code: `salesforce_http_${status}`,
    safeMessage: retryable ? "Salesforce is temporarily unavailable." : "Salesforce rejected the mapped record.",
  };
}

export class SalesforceCrmAdapter implements CrmAdapter {
  constructor(private readonly config: SalesforceConfig) {}

  async upsertProspect(input: ProspectInput, context: { idempotencyKey: string }): Promise<AdapterResult> {
    try {
      const auth = await getToken(this.config);
      if (!auth.ok) return auth.result;
      const token = auth.token;
      // The caller's key is what makes a repeated submission resolve to one
      // Lead; falling back to the submission id keeps older callers working.
      const key = encodeURIComponent(context.idempotencyKey || input.submissionId);
      const endpoint = `${token.instance_url}/services/data/${this.config.apiVersion}/sobjects/Lead/${this.config.externalIdField}/${key}`;
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(leadPayload(input, this.config)),
        cache: "no-store",
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });

      if (!response.ok) return classifyFailure(response.status);
      if (response.status === 204) {
        // An update returns no body, so the Salesforce id is not available
        // here. Reporting the submission id instead would hand callers a value
        // that is not a Lead id, which is worse than reporting none.
        return { ok: true, externalId: null, receivedAt: new Date().toISOString() };
      }

      const result = (await response.json()) as UpsertResponse;
      return {
        ok: true,
        externalId: result.id ?? null,
        receivedAt: new Date().toISOString(),
      };
    } catch {
      return {
        ok: false,
        kind: "retryable",
        code: "salesforce_network_error",
        safeMessage: "Salesforce is temporarily unavailable.",
      };
    }
  }

  async addToCampaign(input: {
    prospectExternalId: string;
    campaignId: string;
    status?: string;
    submissionId: string;
  }): Promise<AdapterResult> {
    try {
      const auth = await getToken(this.config);
      if (!auth.ok) return auth.result;
      const token = auth.token;
      const response = await fetch(`${token.instance_url}/services/data/${this.config.apiVersion}/sobjects/CampaignMember`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          CampaignId: input.campaignId,
          LeadId: input.prospectExternalId,
          Status: input.status ?? "Responded",
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });
      if (!response.ok) return classifyFailure(response.status);
      const result = (await response.json()) as UpsertResponse;
      return { ok: true, externalId: result.id ?? null, receivedAt: new Date().toISOString() };
    } catch {
      return { ok: false, kind: "retryable", code: "salesforce_campaign_error", safeMessage: "Campaign attribution is temporarily unavailable." };
    }
  }
}

export function createSalesforceAdapter(): SalesforceCrmAdapter | null {
  const config = configFromEnvironment();
  return config ? new SalesforceCrmAdapter(config) : null;
}
