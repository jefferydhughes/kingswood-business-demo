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

async function getToken(config: SalesforceConfig): Promise<TokenResponse> {
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
  });
  if (!response.ok) throw new Error(`Salesforce token request failed: ${response.status}`);
  return response.json() as Promise<TokenResponse>;
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

  async upsertProspect(input: ProspectInput, _context: { idempotencyKey: string }): Promise<AdapterResult> {
    try {
      const token = await getToken(this.config);
      const key = encodeURIComponent(input.submissionId);
      const endpoint = `${token.instance_url}/services/data/${this.config.apiVersion}/sobjects/Lead/${this.config.externalIdField}/${key}`;
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(leadPayload(input, this.config)),
        cache: "no-store",
      });

      if (!response.ok) return classifyFailure(response.status);
      if (response.status === 204) {
        return { ok: true, externalId: input.submissionId, receivedAt: new Date().toISOString() };
      }

      const result = (await response.json()) as UpsertResponse;
      return {
        ok: true,
        externalId: result.id ?? input.submissionId,
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
      const token = await getToken(this.config);
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
      });
      if (!response.ok) return classifyFailure(response.status);
      const result = (await response.json()) as UpsertResponse;
      return { ok: true, externalId: result.id ?? input.submissionId, receivedAt: new Date().toISOString() };
    } catch {
      return { ok: false, kind: "retryable", code: "salesforce_campaign_error", safeMessage: "Campaign attribution is temporarily unavailable." };
    }
  }
}

export function createSalesforceAdapter(): SalesforceCrmAdapter | null {
  const config = configFromEnvironment();
  return config ? new SalesforceCrmAdapter(config) : null;
}
