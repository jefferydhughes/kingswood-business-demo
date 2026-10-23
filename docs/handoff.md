# Project handoff

**Updated:** October 23, 2026 (America/Halifax)
**Scope:** Demo build for stakeholder review. Salesforce access is not available.
**Branch:** `main`. Deployed and verified at `de87c22`; CMS work pushed through `27a3a94`.
**Deployment:** https://kingswood-business-demo.vercel.app, Vercel project `prj_tzKBiRauI2e139Ggn2Rv1QM0ODqU`.
**Next action:** Jeff sets `CMS_CONTENT=on` and `PREVIEW_SECRET` in Vercel, applies the pending
migration, then creates Andrea's Publisher account (section 5).

This is the single living handoff. It replaces the September 30 copy that lived on
`modernization/phase-1-foundation` and was never merged to `main`, and it absorbs the
short-lived `docs/progress.md`. Update this file at the end of a session rather than
adding a second document that contradicts it.

## 1. State of the build

| Area | State | Evidence |
| --- | --- | --- |
| Public routes | Working. `/`, `/academics`, `/admissions`, `/student-life`, `/about`, `/encounter`, `/demo/inquiries` all return 200 | Browser pass at 390px and 1280px, no layout overflow, no console errors |
| Inquiry form | Working end to end. Captures and reports honestly when no channel is configured | `POST /api/forms/inquiry` returns 202 with `mode: "demo"` |
| Email delivery | Code complete, not switched on. Needs three Vercel variables | `src/lib/forms/notify.ts`, verified against a mock server |
| Salesforce | Adapter present, deliberately unmapped beyond standard Lead fields | `src/lib/integrations/salesforce.ts` |
| Payload CMS | Connected and running, with live preview, drafts and version history. Editing aids added for non-technical editors | Browser pass over dashboard, navigation and a page document in light and dark themes |
| Content source | CMS, behind `CMS_CONTENT=on`, with the fixture as the fallback for any page not yet in the CMS and for a CMS failure | Four pages rendered byte-identical from both sources |
| Build | Clean. Lint, typecheck and production build all pass with no workaround | `npm run check` |

## 2. The CMS database was unreachable

The `/admin` HTTP 500 recorded in September was caused by Payload being unable to reach its
database. The Supabase project was paused, and as of October 13 Jeff reports Supabase is
restoring it.

Correction worth recording, because it nearly became a wrong decision. This file previously
stated the project had been deleted. That was wrong. It came from reading a Supabase account
listing that returned only the Skill Samurai organization, and concluding from an absence
that the project was gone. The Kingswood project lives in an organization that listing did
not cover. The pooler error, `(ENOTFOUND) tenant/user postgres.azgwspixvedmrgwcjysm not
found`, is also what a paused project returns, because the tenant is dropped from pooler
routing while paused, so the evidence never distinguished the two. The lesson is the obvious
one: an empty listing is evidence about the listing, not about the world.

`/admin` now returns HTTP 200 with a page that states the position plainly and sends the
visitor back to the site. The public site never depended on the database and is unaffected.

The fix holds either way, which is why it did not need revisiting when the cause changed. It
is a readiness probe, not a hardcoded assumption: when the database answers, Payload starts
normally and the page disappears. The result is cached for sixty seconds, so production
picks up the restored database within a minute of it coming back, with no redeploy.

Getting there took three attempts, which is worth recording so nobody repeats them. An
error boundary was not enough, because Payload throws while the response is streaming, so
the body rendered correctly but the status stayed 500. A name lookup was not enough either:
a paused or deleted Supabase project keeps resolving, because the pooler hostname is
shared, and the tenant is rejected only once a connection is opened. The working answer is a short
connection probe in `src/lib/database/reachable.ts`, cached for a minute, which decides
before Payload starts.

**Resolved, October 13.** The Supabase project was restored, and the first probe against it
returned `28P01`, a bad password, which told us host, port, TLS and pooler routing were all
fine and only the credential was stale. That diagnosis came from the probe's own log line
without anyone reading the secret.

The Vercel project also held two separate `DATABASE_URL` entries, one scoped to Preview and
one to Production, holding different connection formats. The two probe failures named
different usernames, `postgres.<ref>` and plain `postgres`, which is how the split showed
itself. Jeff replaced both with a single Session pooler connection string covering
Production, Preview and Development, as `docs/cms-implementation-decision.md` specifies.

`/admin` now serves the Payload login and prompts to create the first user. The schema is
present, so the September migration survived the pause, but no admin account exists. Creating
that account is the next step and has to be done by a person in a browser.

One consequence of a single variable across environments: preview deployments share the
production database. Fine while the CMS holds nothing real. Once it holds content, preview
needs its own database, or a branch deploy will eventually edit live pages.

Note what a working database does not buy. The public pages read from fixture content, so
the editing interface becomes reachable but the visible site is still not editable. Binding
the content layer to the CMS is the larger task behind it.

## 3. September items, closed out

The five ordered items from the September handoff:

| # | Item | State |
| --- | --- | --- |
| 1 | Reconcile the working branch with deployed main | Done. `main` is the single line of work; merged feature branches are listed for deletion in section 9 |
| 2 | Make the existing demo pages discoverable | Done. The four university routes are in the site header, the landing page footer and the mobile action bar |
| 3 | Diagnose the main admin HTTP 500 | Done. Root cause established and the route fixed. See section 2 |
| 4 | Confirm the CMS editing path | Partly done. Payload starts and serves its login. Still to do: create the first admin user and confirm a working session |
| 5 | Improve demo presentation and content | Done. See section 4 |

The five retained source-review findings, rechecked against current code:

| Finding | State |
| --- | --- |
| Fresh submission UUID per inquiry, idempotency context ignored | Fixed. Ids are derived from the submission, and the adapter uses the caller's key |
| Consent, attribution and academic interest omitted from the Lead payload | Unchanged by choice for Salesforce, which stays unmapped until Kingswood exports its schema. The full record is now captured and visible at `/demo/inquiries` |
| Honeypot rejects populated values before the success-like handler | Fixed. A populated honeypot returns the same 202 as a success |
| Campaign method not invoked, 204 upsert returns the submission id | Partly fixed. A 204 now returns `externalId: null` rather than a value that is not a Lead id. `addToCampaign` still has no caller, deferred with the rest of Salesforce |
| No upstream timeout, token failures classified as retryable | Fixed. All three Salesforce calls are bounded, and a rejected client secret is classified as permanent |

## 4. What changed on October 13

**The form no longer fails on camera.** Every submission previously ended in a red error,
because the route returned 503 whenever no delivery channel was configured. It now captures
the submission and says, in the confirmation itself, that nothing was delivered to anyone.
`/demo/inquiries` shows every captured field, including the consent record and campaign
attribution that would be written to a CRM. That view refuses to render as soon as any real
channel is configured, so it can never display a production lead.

**The four university routes are reachable** and carry the same header, footer, review
banner, analytics and heading scale as the rest of the site. Their internal links now stay
inside the demo, with kingswood.edu links kept as clearly labelled secondary actions.

**Accreditation and outcomes claims were removed.** Two cards on `/about` published claims
that README.md requires an owner, a source and a review date for. None existed. The cards
were removed rather than published with invented provenance, and the reason is recorded in
`src/content/institutional-pages.ts`.

**Security and correctness.** Honeypot behaviour, validation responses that no longer echo
field names, per-IP rate limiting, derived submission ids, bounded Salesforce calls, and
GraphQL disabled and added to the proxy matcher.

**Accessibility.** The focus ring used brand grey, which measures 1.61:1 on white against a
3:1 requirement, and now uses brand blue on light surfaces and keeps grey on dark ones.
Focus moves deliberately through the program finder and onto the form confirmation. Form
errors are tied to the field they describe. Anchor targets clear the sticky header. Section
labels and status pills were enlarged so they survive video compression.

**Build robustness.** Fonts are self-hosted from files committed under
`src/app/(frontend)/fonts/`. The build previously fetched them from Google at build time,
which made every deployment depend on an external service.

## 5. The editing experience

Andrea wants to see how the site runs, see the back end, and change things. The CMS now
supports that without a developer.

**Where to sign in.** https://kingswood-business-demo.vercel.app/admin. Payload is part of
this application, not an outside service, so there is no payloadcms.com account to create
and nothing to sign up for. Accounts live in Kingswood's own Supabase database and are
created from inside the admin, under People with access.

**What an editor sees.**

- **Start here**, at the top of the dashboard: the four pages by name with their publication
  state, the site-wide settings, and links out to the live site.
- **Site pages** in the navigation: the same four pages, so nobody has to know they are
  stored in a collection called Pages.
- **A page switcher** above the save controls on any page, for moving between pages without
  returning to a list.
- **Live preview**, the eye icon beside the publish button: the real page beside the form,
  updating as fields change, at phone, tablet and desktop widths.
- **Draft and publish.** Every change saves as a draft first and is invisible to visitors
  until published. Version history is kept, so an earlier version can be restored.

**What an editor can change.** Every word on the four university pages: headlines,
introductions, cards, calls to action, page titles and descriptions. Also the header
navigation, the footer and site settings. Images upload to the Media library once the Vercel
Blob store exists and `BLOB_READ_WRITE_TOKEN` is set.

**What an editor cannot change, by design.** Page layout, colours, type and spacing. Those
come from the brand guide, and the contrast work behind them is what keeps the site
accessible. The reference editor Jeff shared allows per-element styling; adopting that here
would reintroduce the red-on-navy contrast failure fixed in September. Layout changes stay a
development task.

**Roles.** Editor drafts but cannot publish. Publisher drafts and publishes. Administrator
also manages accounts. Andrea's account should be Publisher.

**If nobody can sign in.** Payload has no password reset until the email key is in place
(section 7), so `/api/admin-bootstrap` exists as the way back in. It answers 404 unless
`ADMIN_BOOTSTRAP_TOKEN` is set in Vercel, which means it does not exist in normal operation.
Set the variable, send one request with the token in an `x-bootstrap-token` header, then
delete the variable. Leaving it set leaves a standing way into the CMS.

## 6. What remains

Ranked. Nothing here blocks the demo.

| # | Work | Why it matters | Owner |
| --- | --- | --- | --- |
| 1 | Durable inquiry store | Inquiries exist only as an outbound email. A failed send loses a prospect with no trace. A Payload `Inquiries` collection written before delivery is the fix | Unassigned |
| 2 | Shared rate-limit store | The current limiter counts within one serverless instance. Vercel KV or Upstash makes it cluster wide | Unassigned |
| 3 | Published privacy notice | `consentPolicyVersion` is `demo-2026-10`, a version string with no policy behind it. Required before any marketing send, and before the Encounter form collects from minors | Kingswood, with counsel |
| 4 | Owner for the cost figures | Tuition figures carry a source and a retrieval date but no owner. README.md requires one | Finance or Admissions |
| 5 | Switch the CMS on in production | The binding is built and verified locally. Production needs `CMS_CONTENT=on`, `PREVIEW_SECRET`, the pending migration applied, and the four pages seeded | Jeff for the variables, then unassigned |
| 6 | Salesforce field mapping | Consent, attribution and academic interest are collected but not mapped, by deliberate choice, until Kingswood exports its Salesforce schema | Deferred until access |
| 7 | Campaign membership | `addToCampaign` has no caller and `campaignId` is read but unused | Deferred until access |
| 8 | Logo asset at higher resolution | Served at its native 278x70 for a 39px render, so the wordmark is soft on high-density screens and on video | Unassigned |
| 9 | Decide the fate of the root static prototype | `index.html`, `styles.css` and `app.js` sit beside the Next application. They are preserved on the `v1` branch, so the root copies can go | Jeff |

## 7. Switching on email delivery

Three variables in the Vercel project, then redeploy. The code is already in place.

1. Create a Resend account at resend.com. Use `hughesj@kingswood.edu` as the account email.
2. Get an API key from the Resend dashboard.
3. In Vercel, Settings then Environment Variables on `kingswood-business-demo`, add all
   three to Production:
   - `RESEND_API_KEY` = the key from step 2
   - `INQUIRY_NOTIFY_TO` = `hughesj@kingswood.edu`
   - `INQUIRY_FROM` = `Kingswood Business <onboarding@resend.dev>`
4. Redeploy.

`onboarding@resend.dev` is Resend's shared sender and needs no DNS. Confirm the current
restriction in Resend's own documentation before relying on it: an unverified Resend account
is normally limited to sending to the account owner's own address, which is enough for a
demo and for Jeff receiving his own inquiries, and not enough for anything else.

Before this is used for real recruiting, replace `INQUIRY_FROM` with a sender on a Kingswood
domain verified in Resend. That needs DNS records on the sending domain, which is a
Kingswood IT request.

Behaviour once configured: `/demo/inquiries` returns 404 by design, and the confirmation
message drops the demonstration notice. Until configured, the demo capture continues to work.

## 8. Open flags

- **Minors' data.** The Encounter form collects name, email, grade, church and a guardian
  email from students as young as Grade 10. There is no retention period, no deletion path
  and no published policy. Confirm with Kingswood's privacy officer or counsel before it is
  used outside a demonstration.
- **Vercel sign-in protection** is enabled for all but custom domains, so the `.vercel.app`
  link asks viewers for a Vercel login. Fine for recording. It must change, or a custom
  domain must be attached, before a link is shared with anyone outside the team.
- **Cost figures are unverified.** From `kingswood.edu/?p=190`, retrieved October 11, 2026,
  with no academic year stated on the source page.
- **No accreditation claim appears anywhere**, and none may be added. ACBSP was chosen; a
  Fall 2027 launch cannot use the word accredited.
- **Three unapproved degrees are the headline** of the landing page. The review banner and
  status pills disclose this, and both are controlled by `NEXT_PUBLIC_REVIEW_MODE`. Turning
  that flag off removes the disclosure without removing the claims, so it must stay on until
  the programs are approved.
- **The Encounter headline** reads "Atlantic Canada's best kept education secret" at Jeff's
  request. It is a superlative with no evidence behind it. Flagged, and his call.
- **Supabase CA file.** `src/lib/database/pool.ts` imports a named export from JSON, which
  Next supports and plain Node ESM does not. If `payload migrate` is ever run outside Next,
  that import is where it breaks.

## 9. Branch state

`main` is the only branch that matters. These are fully merged and can be deleted, with
their tips recorded here in case anyone wants them back:

- `design/sob-encounter-event` (`0754550`), a direct ancestor of main
- `design/school-of-business-v2-landing` (`d7cb816`), tree identical to `5a2bef9`
- `design/sob-conversion-enhancements` (`b08c7b0`), tree identical to `8f61bcd`
- `cms/migration-first-init` (`13540f1`), tree identical to `a790843`

The last three were merged by squash or cherry-pick, so `git branch --merged` does not list
them. Restore any with `git push origin <sha>:refs/heads/<name>`.

Keep `v1` (`a790843`). It is the deliberate preservation point for the original static site
and should not be swept up in a merged-branch cleanup.

These seven hold content that exists nowhere on `main` and were left alone:
`cms/activate-supabase-preview`, `cms/content-adapter-scaffold`, `design/brand-system-hero`,
`docs/wordpress-migration`, `hotfix/cms-production-guard`,
`modernization/phase-1-foundation`, `phase-1/university-route-foundation`. Two are worth
reading before deciding: `modernization/phase-1-foundation` holds the September handoff this
file replaces, and `hotfix/cms-production-guard` may bear on the database problem.

## 10. Verification performed

- Lint, typecheck and production build: clean, with no font workaround.
- Seven public routes at 390px and 1280px: all 200, no horizontal overflow, no console errors.
- Inquiry endpoint: a valid submission returns 202 and is captured; a populated honeypot
  returns an identical-looking 202; an invalid submission returns 400 with no field names.
- `/admin` on production: root cause read from the runtime log, fix deployed, route confirmed
  returning 200 with the correct page.
- CMS binding: the four pages rendered from the CMS and from the fixtures and compared
  character for character, identical in both.
- Preview route: no secret 404, a traversal slug 400, a valid request redirects to the page.
- Recovery route: a wrong token 404, a short password 400, a valid request creates a working
  administrator.
- Editing aids: dashboard panel, navigation list and page switcher rendered in a browser for
  a signed-in administrator in light and dark themes; selecting another page in the switcher
  opened that document.
- Not tested: real email delivery through Resend, any Salesforce path, image upload to Vercel
  Blob, and the migration against the production database.

## 11. Handoff routine

At session start, read this document, then `git status --short`, the current branch and
recent history. Compare working code, `origin/main` and the deployed commit rather than
assuming they match.

At session end, update this file rather than adding a second one. Record what was completed,
exact checks and their results, blockers with owners, one exact next action, and the verified
deployment commit. Keep secrets and prospect data out of this file.

## 12. Session log

### 2026-10-23

- Reshaped the Pages collection to mirror the page data exactly, so the CMS adapter is a
  mapping rather than a translation, and generated the migration for it against a throwaway
  local Postgres rather than asking for the production connection string.
- Bound the four university pages to the CMS behind `CMS_CONTENT=on`, with the fixture kept
  as the fallback both for a page not yet in the CMS and for a CMS failure, so a paused
  database cannot take the admissions pages down. Verified byte-identical output.
- Added live preview, draft previews through `/api/preview`, and the token-gated recovery
  route described in section 5.
- Added the editing aids an executive reviewer needs: the dashboard panel, the named page
  list in the navigation, and the page switcher on a document.
- Corrected a misunderstanding worth recording: Payload is self-hosted inside this
  application. There is no payloadcms.com account, nothing to sign up for, and no reason to
  move authentication to Supabase Auth, which would discard the role model and the admin's
  own login.
- An earlier conclusion that the dashboard panel was not rendering came from reading a
  streamed response with curl, which returns the shell before the content. Confirmed in a
  browser instead. The lesson is the same one recorded in section 2: a tool that cannot see
  a thing is not evidence that the thing is absent.

### 2026-10-13

- Read the September handoff, mapped repository against deployment, and ran two parallel
  reviews over the server path and the frontend.
- Established that the `/admin` 500 was Payload failing to reach its database, and fixed the
  route to return 200 with an explanation, after two failed approaches recorded in section 2.
- Wrongly attributed the cause to a deleted Supabase project, from an account listing that
  covered only one organization. Jeff corrected it the same day: the project was paused and
  is being restored. The fix was unaffected, being a readiness probe rather than an
  assumption about why the database was absent.
- Added failure logging to the probe, which immediately earned its place: with the project
  restored, the database answered and rejected the stored password (`28P01`), which located
  the fault in one line without anyone reading a secret.
- Jeff consolidated two conflicting `DATABASE_URL` entries into one Session pooler string.
  Payload now starts and `/admin` serves its login, prompting to create the first user. The
  schema survived the pause; no admin account exists yet.
- Built the demo capture path and `/demo/inquiries` so the enrollment flow completes without
  a CRM, and nothing claims a delivery that did not happen.
- Made the four university routes reachable and consistent with the rest of the site.
- Removed the unsourced accreditation and outcomes cards.
- Security, accessibility and build-robustness work listed in section 4.
- Consolidated documentation: this file replaces the September handoff and the interim
  progress document, and README.md was rewritten to match the current state.
- Could not do, lacking permission in the working environment: write Vercel environment
  variables, or delete remote branches. Both are listed for Jeff.

### 2026-09-30

- Reviewed the older foundation branch; local checks blocked by missing dependencies.
- Confirmed demo scope and the absence of Salesforce access; deferred real CRM work.
- Found the deployed CMS and four live subpages on a newer main, correcting an earlier
  project-wide conclusion drawn from the stale checkout.
- Recorded the main admin failure and the navigation gap. No application changes.
