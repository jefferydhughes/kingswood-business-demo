import type { InquiryInput } from "./inquiry-schema";

/**
 * Emails each inquiry to the recruiting contact through Resend (https://resend.com).
 * Configure RESEND_API_KEY, INQUIRY_NOTIFY_TO, and INQUIRY_FROM (a sender on a domain verified in Resend).
 * Server only. Personal details go in the message body, never in logs.
 */
export function notifierConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_NOTIFY_TO && process.env.INQUIRY_FROM);
}

const clean = (value: string | undefined) => (value ?? "").replace(/[\r\n]+/g, " ").trim();

export async function sendInquiryEmail(input: InquiryInput, submissionId: string): Promise<boolean> {
  if (!notifierConfigured()) return false;
  const name = [input.givenName, input.familyName].filter(Boolean).join(" ") || "(no name given)";
  const lines = [
    `Name: ${clean(name)}`,
    `Email: ${clean(input.email)}`,
    `Interest: ${clean(input.programInterest) || "(none)"}`,
    `Grade or stage: ${clean(input.grade) || "(not given)"}`,
    `Church or youth group: ${clean(input.church) || "(not given)"}`,
    `Parent or guardian email: ${clean(input.guardianEmail) || "(not given)"}`,
    `Province: ${clean(input.province) || "(not given)"}`,
    `Planning to start: ${clean(input.intendedStart) || "(not given)"}`,
    `Agreed to updates by email: ${input.consentEmail ? "yes" : "no"}`,
    "",
    `Page: ${clean(input.landingPath)}`,
    `Campaign: ${[input.utmSource, input.utmMedium, input.utmCampaign].map(clean).filter(Boolean).join(" / ") || "(none)"}`,
    `Reference: ${submissionId}`,
    `Received: ${new Date().toISOString()}`,
  ];
  const subject = `New business inquiry: ${clean(name)}${input.programInterest ? ` (${clean(input.programInterest).slice(0, 60)})` : ""}`;
  try {
    const res = await fetch(process.env.RESEND_API_URL ?? "https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json", "idempotency-key": submissionId },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM,
        to: [process.env.INQUIRY_NOTIFY_TO],
        reply_to: input.email,
        subject,
        text: lines.join("\n"),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("inquiry email failed", { status: res.status, submissionId });
    return res.ok;
  } catch {
    console.error("inquiry email error", { submissionId });
    return false;
  }
}
