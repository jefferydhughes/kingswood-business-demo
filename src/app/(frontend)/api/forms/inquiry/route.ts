import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/forms/inquiry-schema";
import { createSalesforceAdapter } from "@/lib/integrations/salesforce";
import type { ProspectInput } from "@/lib/integrations/contracts";
import { notifierConfigured, sendInquiryEmail } from "@/lib/forms/notify";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "unsupported_media_type" }, { status: 415 });
  }

  const parsed = inquirySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_submission", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (parsed.data.companyWebsite) {
    return NextResponse.json({ status: "received" }, { status: 202 });
  }

  const adapter = createSalesforceAdapter();
  const emailEnabled = notifierConfigured();
  if (!adapter && !emailEnabled) {
    return NextResponse.json({ error: "inquiry_service_not_configured" }, { status: 503 });
  }

  const submissionId = randomUUID();
  const now = new Date().toISOString();
  const prospect: ProspectInput = {
    submissionId,
    email: parsed.data.email,
    givenName: parsed.data.givenName,
    familyName: parsed.data.familyName,
    phone: parsed.data.phone,
    country: parsed.data.country,
    province: parsed.data.province,
    programInterest: parsed.data.programInterest,
    intendedStart: parsed.data.intendedStart,
    deliveryPreference: parsed.data.deliveryPreference,
    attribution: {
      landingPath: parsed.data.landingPath,
      referrer: parsed.data.referrer,
      utmSource: parsed.data.utmSource,
      utmMedium: parsed.data.utmMedium,
      utmCampaign: parsed.data.utmCampaign,
      firstSeenAt: now,
    },
    consents: [
      { purpose: "respond_to_inquiry", granted: true, policyVersion: parsed.data.consentPolicyVersion, capturedAt: now },
      { purpose: "marketing_email", granted: parsed.data.consentEmail, policyVersion: parsed.data.consentPolicyVersion, capturedAt: now },
      { purpose: "marketing_sms", granted: parsed.data.consentSms, policyVersion: parsed.data.consentPolicyVersion, capturedAt: now },
    ],
  };

  let delivered = false;
  let retryable = false;
  if (emailEnabled) {
    delivered = await sendInquiryEmail(parsed.data, submissionId);
    if (!delivered) retryable = true;
  }
  if (adapter) {
    const result = await adapter.upsertProspect(prospect, { idempotencyKey: submissionId });
    if (result.ok) delivered = true;
    else if (result.kind === "retryable") retryable = true;
  }
  if (!delivered) {
    return NextResponse.json({ error: retryable ? "delivery_failed_retry" : "rejected" }, { status: retryable ? 503 : 422 });
  }

  return NextResponse.json({ submissionId, status: "received" }, { status: 202 });
}
