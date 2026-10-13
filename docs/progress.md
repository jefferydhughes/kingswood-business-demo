# Project progress

**Updated:** October 13, 2026 (America/Halifax)
**Scope:** Demo build for stakeholder review. Salesforce access is not available.
**Branch:** `main` at `805739e`.
**Supersedes:** `docs/handoff.md` on `modernization/phase-1-foundation`, which was last accurate on September 30. Every item it listed is resolved or restated below.
**Next action:** Jeff adds the three Resend variables in Vercel (section 5), then records the demo.

## 1. State of the build

| Area | State | Evidence |
| --- | --- | --- |
| Public routes | Working. `/`, `/academics`, `/admissions`, `/student-life`, `/about`, `/encounter`, `/demo/inquiries` all return 200 | Browser pass at 390px and 1280px, no layout overflow, no console errors |
| Inquiry form | Working end to end. Captures and reports honestly when no channel is configured | `POST /api/forms/inquiry` returns 202 with `mode: "demo"` |
| Email delivery | Code complete, not switched on. Needs three Vercel variables | `src/lib/forms/notify.ts`, verified against a mock server |
| Salesforce | Adapter present, deliberately unmapped beyond standard Lead fields | `src/lib/integrations/salesforce.ts` |
| Payload CMS | Not available. The database it points at no longer exists | Runtime log: `cannot connect to Postgres: (ENOTFOUND) tenant/user postgres.azgwspixvedmrgwcjysm not found` |
| Content source | Fixture content, not CMS content | `src/lib/content/fixture-repository.ts` is still the composition root |
| Build | Clean. Lint, typecheck and production build all pass with no workaround | `npm run check` |

## 2. The CMS database is gone

The `/admin` HTTP 500 recorded in the September handoff has a definite cause. The Supabase project the deployment points at was deleted, not paused, and does not appear on the account. Payload cannot start without it.

Decision taken: `/admin` now fails to a page that states the position plainly and sends the visitor back to the site. The public site never depended on the database and is unaffected.

Standing up a replacement is a scoped piece of work, not a fix to this build. Note that the public pages read from fixture content, so a working database would make the editing interface reachable but would not yet make the visible site editable. Binding the content layer to the CMS is the larger task behind it.

## 3. What changed on October 13

**The form no longer fails on camera.** Every submission previously ended in a red error, because the route returned 503 whenever no delivery channel was configured. It now captures the submission and says, in the confirmation itself, that nothing was delivered to anyone. `/demo/inquiries` shows every captured field, including the consent record and campaign attribution that would be written to a CRM. That view refuses to render as soon as any real channel is configured, so it can never display a production lead.

**The four university routes are reachable.** They had no inbound link from anywhere. They are now in the site header, the landing page footer and the mobile action bar, and they carry the same header, footer, review banner, analytics and heading scale as the rest of the site. Their internal links now stay inside the demo, with kingswood.edu links kept as clearly labelled secondary actions.

**Accreditation and outcomes claims were removed.** Two cards on `/about` published claims that README.md requires an owner, a source and a review date for. None existed. The cards were removed rather than published with invented provenance, and the reason is recorded in `src/content/institutional-pages.ts`.

**Security and correctness.** The honeypot now answers a populated value exactly like a success, instead of returning a validation error naming the field that caught the bot. Validation failures no longer echo field names. Per-IP rate limiting was added. Submission ids are derived from the submission rather than generated fresh, so a double tap resolves to one record. Salesforce calls are bounded by a timeout, and a rejected client secret is now classified as permanent rather than reported to visitors as a temporary outage for as long as it lasts. GraphQL is disabled and added to the proxy matcher.

**Accessibility.** The focus ring used brand grey, which measures 1.61:1 on white against a 3:1 requirement, and now uses brand blue on light surfaces and keeps grey on dark ones. Focus is moved deliberately through the program finder and onto the form confirmation instead of being dropped to the document body. Form errors are tied to the field they describe. Anchor targets clear the sticky header. Section labels and status pills were enlarged so they survive video compression.

**Build robustness.** Fonts are self-hosted from files committed under `src/app/(frontend)/fonts/`. The build previously fetched them from Google at build time, which made every deployment depend on an external service.

## 4. What remains

Ranked. Nothing here blocks the demo.

| # | Work | Why it matters | Owner |
| --- | --- | --- | --- |
| 1 | Durable inquiry store | Inquiries exist only as an outbound email. A failed send loses a prospect with no trace. A Payload `Inquiries` collection written before delivery is the fix | Unassigned |
| 2 | Shared rate-limit store | The current limiter counts within one serverless instance. Vercel KV or Upstash makes it cluster wide | Unassigned |
| 3 | Published privacy notice | `consentPolicyVersion` is `demo-2026-10`, a version string with no policy behind it. Required before any marketing send, and before the Encounter form collects from minors | Kingswood, with counsel |
| 4 | Owner for the cost figures | Tuition figures carry a source and a retrieval date but no owner. README.md requires one | Finance or Admissions |
| 5 | Replacement database and CMS binding | Restores the editing interface, then makes the visible site CMS driven | Unassigned |
| 6 | Salesforce field mapping | Consent, attribution and academic interest are collected but not mapped, by deliberate choice, until Kingswood exports its Salesforce schema | Deferred until access |
| 7 | Campaign membership | `addToCampaign` has no caller and `campaignId` is read but unused | Deferred until access |
| 8 | Logo asset at higher resolution | Served at its native 278x70 for a 39px render, so the wordmark is soft on high-density screens and on video | Unassigned |
| 9 | Decide the fate of the root static prototype | `index.html`, `styles.css` and `app.js` sit beside the Next application. They are preserved on the `v1` branch, so the root copies can go | Jeff |

## 5. Switching on email delivery

Three variables in the Vercel project, then redeploy. The code is already in place.

1. Create a Resend account at resend.com. Use `hughesj@kingswood.edu` as the account email.
2. Get an API key from the Resend dashboard.
3. In Vercel, Settings then Environment Variables on `kingswood-business-demo`, add all three to Production:
   - `RESEND_API_KEY` = the key from step 2
   - `INQUIRY_NOTIFY_TO` = `hughesj@kingswood.edu`
   - `INQUIRY_FROM` = `Kingswood Business <onboarding@resend.dev>`
4. Redeploy.

`onboarding@resend.dev` is Resend's shared sender and needs no DNS. Confirm the current restriction in Resend's own documentation before relying on it: an unverified Resend account is normally limited to sending to the account owner's own address, which is enough for a demo and for Jeff receiving his own inquiries, and not enough for anything else.

Before this is used for real recruiting, replace `INQUIRY_FROM` with a sender on a Kingswood domain verified in Resend. That needs DNS records on the sending domain, which is a Kingswood IT request.

Behaviour once configured: `/demo/inquiries` returns 404 by design, and the confirmation message drops the demonstration notice. Until configured, the demo capture continues to work.

## 6. Open flags

- **Minors' data.** The Encounter form collects name, email, grade, church and a guardian email from students as young as Grade 10. There is no retention period, no deletion path and no published policy. Confirm with Kingswood's privacy officer or counsel before it is used outside a demonstration.
- **Vercel sign-in protection** is enabled for all but custom domains, so the `.vercel.app` link asks viewers for a Vercel login. Fine for recording. It must change, or a custom domain must be attached, before a link is shared with anyone outside the team.
- **Cost figures are unverified.** From `kingswood.edu/?p=190`, retrieved October 11, 2026, with no academic year stated on the source page.
- **No accreditation claim appears anywhere**, and none may be added. ACBSP was chosen; a Fall 2027 launch cannot use the word accredited.
- **Three unapproved degrees are the headline** of the landing page. The review banner and status pills disclose this, and both are controlled by `NEXT_PUBLIC_REVIEW_MODE`. Turning that flag off removes the disclosure without removing the claims, so it must stay on until the programs are approved.
- **Supabase CA file.** `src/lib/database/pool.ts` imports a named export from JSON, which Next supports and plain Node ESM does not. If `payload migrate` is ever run outside Next, that import is where it breaks.

## 7. Verification performed

- Lint, typecheck and production build: clean, with no font workaround.
- Seven public routes at 390px and 1280px: all 200, no horizontal overflow, no console errors.
- Inquiry endpoint: valid submission returns 202 and is captured; a populated honeypot returns an identical-looking 202; an invalid submission returns 400 with no field names.
- `/admin` against production: confirmed 500 and root cause read from the runtime log.
- Not tested: real email delivery through Resend, any Salesforce path, Payload login, and anything requiring the database.

## 8. Handoff routine

At session start, read this document, then `git status --short`, the current branch and recent history. Compare working code, `origin/main` and the deployed commit rather than assuming they match.

At session end, update this snapshot rather than appending a contradictory one. Record what was completed, exact checks and their results, blockers with owners, one exact next action, and the verified deployment commit. Keep secrets and prospect data out of this file.
