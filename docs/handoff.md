# Project handoff

**Updated:** September 30, 2026 (America/Halifax)
**Scope:** Demo. Salesforce access is not available yet.
**Local branch:** `modernization/phase-1-foundation` at `ca3b040`.
**Online deployment:** `main` at `a790843c412c8c82aaabdfc567d85e67eaed3103`.
**Next action:** Reconcile this older checkout with deployed main while preserving documentation changes; then expose the existing university subpages in navigation and investigate the main admin error as separately scoped work.

## Critical correction to the initial review

The first review inspected only the older foundation checkout and incorrectly generalized its missing CMS and subpages to the whole project. Vercel inspection and live HTTP checks confirmed later work exists online. Do not recreate the CMS or four subpages. Check deployment and branch state before deciding what remains.

## Verified online routes

Checked through the connected Vercel fetch tool on September 30, 2026. These are HTTP/HTML checks, not a full browser or authenticated editing test. The browser CLI is not installed in this environment.

| URL | Observed result |
| --- | --- |
| [Homepage](https://kingswood-business-demo.vercel.app/) | HTTP 200; business landing page, "Build what matters", logo and student hero image |
| [Academics](https://kingswood-business-demo.vercel.app/academics) | HTTP 200; "Prepare for your calling" |
| [Admissions](https://kingswood-business-demo.vercel.app/admissions) | HTTP 200; "Your next step starts here" |
| [Student life](https://kingswood-business-demo.vercel.app/student-life) | HTTP 200; "Learn in community" |
| [About](https://kingswood-business-demo.vercel.app/about) | HTTP 200; "Education shaped by purpose" |
| [Main admin](https://kingswood-business-demo.vercel.app/admin/) | HTTP 500; Payload page exists but is failing |
| [Main admin login](https://kingswood-business-demo.vercel.app/admin/login/) | HTTP 500 |
| [CMS preview admin](https://kingswood-business-demo-ldftla59z-jeffs-projects-3a93e6bd.vercel.app/admin) | HTTP 200 with application redirect to `/admin/login` |
| [CMS preview login](https://kingswood-business-demo-ldftla59z-jeffs-projects-3a93e6bd.vercel.app/admin/login) | HTTP 200, "Login - Payload"; account access/editing not tested |

Some fetch attempts returned connector access errors; successful results above are the observed HTTP responses. Preview access may require Vercel authentication. No accounts were created or credentials changed.

The homepage links to business-page anchors and the existing university website; it does not link to the four demo subpages. Those subpages share a university navigation linking Academics, Admissions, Student life, and About. This explains why they are difficult to discover from the homepage.

There is no separate university-wide homepage in the inspected route inventory. The original static `index.html` remains a local design reference, not evidence of a second active homepage. The four subpages are foundation pages, not a completed content migration; they direct users to existing university pages for details.

## Deployment and source map

- Vercel project: `kingswood-business-demo`, ID `prj_tzKBiRauI2e139Ggn2Rv1QM0ODqU`.
- Current production-target deployment: `dpl_ECgxzA1cHNQqcBAQmM5KaAhFRQSe`, READY, serving `main` commit `a790843c412c8c82aaabdfc567d85e67eaed3103` (merge PR #8, CMS migration initialization).
- Production alias: `https://kingswood-business-demo.vercel.app`.
- CMS preview: `dpl_GFbnXepWaGkVzoRnbQAZ1Ugh9jd6`, branch `cms/migration-first-init`, commit `13540f16437658ac7657720da44b8c6589a31e73`.
- Local `origin/main` currently points to older `808f4b1`; remote-tracking references are stale relative to Vercel deployment evidence.
- A separate CMS checkout exists at `.cms-diagnostics/cms`; it has an existing modification to `src/payload-types.ts`. Preserve it. Do not blindly replace or delete that checkout.
- Its route inventory includes frontend `/`, `/academics`, `/admissions`, `/student-life`, `/about`, plus Payload admin/API and inquiry API.
- Its content composition root still selects `fixtureContentRepository`. CMS presence does not mean public pages are already editable through it; verify the deployed binding before promising that behavior.

## CMS progress and limits

The local historical report `.cms-diagnostics/RESULTS.md` records the September 24 CMS investigation: trusted database TLS, corrected credentials, connection-pool fix, approved initial migration applied, 29 tables verified, and preview admin runtime verification. These are historical findings, not a fresh database audit.

That report ended with first-user setup; today's preview response redirects to login. Account ownership and usable login credentials were not checked. Email adapter and Vercel media storage were reported unconfigured historically and have not been rechecked.

Current known problem: main demo admin returns HTTP 500 while the CMS preview responds. Root cause has not been established; inspect production logs and configuration before changing anything. No migration, database reset, deployment, or secret update was performed in this review.

## Current work and next steps

- Latest completed task: live deployment/route inventory and correction of README/handoff.
- Pending local changes: `README.md` and `docs/handoff.md`; no application changes from these documentation sessions.
- Implementation owner: not recorded.

| Order | Work | Completion evidence |
| --- | --- | --- |
| 1 | Reconcile working branch with deployed main, preserving local edits | Current source baseline recorded; CMS/subpages retained; no duplicate rebuild |
| 2 | Make existing demo pages discoverable | Homepage links to the four university subpages; desktop/mobile navigation verified |
| 3 | Diagnose main admin HTTP 500 | Cause supported by runtime evidence; fix and verification scoped separately |
| 4 | Confirm CMS editing path | Authorized login tested, collections/content binding understood; no assumption that fixture pages are CMS-driven |
| 5 | Improve demo presentation and content | Prioritized visible gaps, placeholder claims identified, intended homepage direction recorded |

Salesforce work is deferred until access is available. No simulated inquiry mode exists in the reviewed foundation code; if a demo form is needed, explicitly simulate with sample data and label the result. CMS/email/storage completion and production launch requirements should follow the agreed demo scope.

## Retained source-review findings

These were found in the older foundation code. Recheck against current main before fixing; later work may differ.

- Fresh submission UUID per inquiry and no durable outbox; idempotency context ignored by adapter.
- Consent, attribution, and academic interest assembled in memory but omitted from Lead payload.
- Honeypot schema rejects populated values before the intended success-like handler runs.
- Campaign method not invoked; `204` upsert returns submission UUID rather than Salesforce Lead ID.
- No explicit upstream fetch timeout or throttling; token failures classified as retryable network errors.
- Unconfirmed Organizational Leadership claims appear in demo content; confirm or identify placeholders before broader publication.
- No tracked lockfile in the older checkout; final `.env*` ignore rule overrides the template exception.

CRM findings are future integration requirements, not demo blockers. Master plan approval language and actual scope decisions still need reconciliation; existing implemented work is not proof of institutional production approval.

## Validation

- Live homepage and four subpages: HTTP 200; HTML content checked.
- Main admin and login: HTTP 500; preview admin/login respond as above.
- Vercel deployment: READY, verified through deployment metadata; READY does not guarantee all runtime routes work.
- Local `npm.cmd run check` on the old foundation branch: blocked at ESLint because `node_modules` is absent; typecheck/build did not run.
- Local Node is `v24.20.0`; project/CI target Node 22.
- No fresh browser, authenticated CMS editing, database, or Salesforce tests.
- Documentation whitespace checked with `git diff --check`.

## Daily handoff routine

At session start, read this document, inspect `git status --short`, current branch, and recent history. Compare working code, remote main, and the deployed commit; do not assume they match. Review only relevant changes and select the first unblocked task.

At session end, update this snapshot rather than adding contradictory current states. Record completed work, commit/PR links, uncommitted changes, exact checks/results, blockers and owners, one exact next action, and verified deployment URLs/commits. Keep secrets and prospect data out of documentation.

## Session log

### 2026-09-30

- Reviewed older foundation branch and drafted README/handoff; local checks blocked by missing dependencies.
- User confirmed demo scope and lack of Salesforce access; deferred real CRM work.
- Broadened review to Vercel and CMS diagnostic checkout. Found deployed CMS and four live subpages on newer main; corrected the initial project-wide conclusions.
- Verified main admin failure and responding preview login; recorded URLs and navigation gap.
- No application changes, account creation, external writes, or deployments.
