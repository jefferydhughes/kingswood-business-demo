import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/forms/inquiry-schema";
import { createSalesforceAdapter } from "@/lib/integrations/salesforce";
import type { ProspectInput } from "@/lib/integrations/contracts";
import { notifierConfigured, sendInquiryEmail } from "@/lib/forms/notify";
import { recordDemoInquiry } from "@/lib/forms/demo-store";
import { allowRequest, clientKey } from "@/lib/forms/rate-limit";

/**
 * Public inquiry endpoint.
 *
 * Delivery is attempted through every configured channel. When no channel is
 * configured the submission is captured in demo mode and the response says so,
 * so a demonstration can complete without implying a record was delivered.
 */

/**
 * Stable for repeated submissions of the same inquiry inside a 15 minute
 * window, so a double tap or a retry after a transient failure resolves to one
 * record rather than several.
 */
function submissionIdFor(email: string, landingPath: string, policyVersion: string): string {
  const bucket = Math.floor(Date.now() / (15 * 60 * 1000));
  return createHash("sha256")
    .update(`${email.toLowerCase()}|${landingPath}|${policyVersion}|${bucket}`)
    .digest("hex")
    .slice(0, 32);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "unsupported_media_type" }, { status: 415 });
  }

  if (!allowRequest(clientKey(request))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  const parsed = inquirySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    // Field names are withheld so an automated caller cannot map the schema.
    return NextResponse.json({ error: "invalid_submission" }, { status: 400 });
  }

  const submissionId = submissionIdFor(
    parsed.data.email,
    parsed.data.landingPath,
    parsed.data.consentPolicyVersion,
  );

  // A populated honeypot is answered exactly like a success so the caller
  // learns nothing about why the submission went nowhere.
  if (parsed.data.companyWebsite) {
    return NextResponse.json({ submissionId, status: "received" }, { status: 202 });
  }

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

  const adapter = createSalesforceAdapter();
  const emailEnabled = notifierConfigured();

  if (!adapter && !emailEnabled) {
    recordDemoInquiry({
      submissionId,
      capturedAt: now,
      prospect,
      extras: {
        role: parsed.data.role,
        source: parsed.data.source,
        grade: parsed.data.grade,
        church: parsed.data.church,
        guardianEmail: parsed.data.guardianEmail,
      },
    });
    return NextResponse.json(
      {
        submissionId,
        status: "captured",
        mode: "demo",
        message: "No CRM or email channel is configured, so this inquiry was captured for demonstration only and was not delivered to anyone.",
      },
      { status: 202 },
    );
  }

  let delivered = false;
  let retryable = false;

  if (emailEnabled) {
    const sent = await sendInquiryEmail(parsed.data, submissionId);
    if (sent) delivered = true;
    else {
      retryable = true;
      console.error("inquiry channel failed", { channel: "email", submissionId });
    }
  }

  if (adapter) {
    const result = await adapter.upsertProspect(prospect, { idempotencyKey: submissionId });
    if (result.ok) delivered = true;
    else {
      if (result.kind === "retryable") retryable = true;
      // Logged per channel so one healthy channel cannot hide the other failing.
      console.error("inquiry channel failed", { channel: "salesforce", submissionId, kind: result.kind, code: result.code });
    }
  }

  if (!delivered) {
    return NextResponse.json({ error: "unavailable" }, { status: retryable ? 503 : 422 });
  }

  return NextResponse.json({ submissionId, status: "received" }, { status: 202 });
}
