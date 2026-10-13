export type ConsentPurpose = "respond_to_inquiry" | "marketing_email" | "marketing_sms";

export type Consent = {
  purpose: ConsentPurpose;
  granted: boolean;
  policyVersion: string;
  capturedAt: string;
};

export type Attribution = {
  landingPath: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  firstSeenAt: string;
};

export type ProspectInput = {
  submissionId: string;
  email: string;
  givenName?: string;
  familyName?: string;
  phone?: string;
  country?: string;
  province?: string;
  programInterest?: string;
  intendedStart?: string;
  deliveryPreference?: string;
  attribution: Attribution;
  consents: Consent[];
};

export type AdapterResult =
  // externalId is null when the upstream system accepted the record but did not
  // return its identifier, as Salesforce does on a 204 update. Callers must not
  // substitute the submission id, which is not a CRM identifier.
  | { ok: true; externalId: string | null; receivedAt: string }
  | { ok: false; kind: "retryable" | "permanent"; code: string; safeMessage: string };

export interface CrmAdapter {
  upsertProspect(input: ProspectInput, context: { idempotencyKey: string }): Promise<AdapterResult>;
  addToCampaign?(input: {
    prospectExternalId: string;
    campaignId: string;
    status?: string;
    submissionId: string;
  }): Promise<AdapterResult>;
}
