import { z } from "zod";

const optionalShortText = z.string().trim().max(120).optional();

export const inquirySchema = z.object({
  email: z.email().max(254),
  givenName: optionalShortText,
  familyName: optionalShortText,
  phone: z.string().trim().max(40).optional(),
  country: optionalShortText,
  province: optionalShortText,
  programInterest: optionalShortText,
  intendedStart: optionalShortText,
  deliveryPreference: optionalShortText,
  landingPath: z.string().startsWith("/").max(500),
  referrer: z.url().max(1000).optional(),
  utmSource: optionalShortText,
  utmMedium: optionalShortText,
  utmCampaign: optionalShortText,
  consentEmail: z.boolean().default(false),
  consentSms: z.boolean().default(false),
  consentPolicyVersion: z.string().trim().min(1).max(40),
  companyWebsite: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
