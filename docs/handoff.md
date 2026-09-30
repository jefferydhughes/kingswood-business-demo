# Project handoff

**Last reviewed:** September 30, 2026 (America/Halifax)
**Reviewed branch:** `modernization/phase-1-foundation`
**Reviewed code baseline:** `ca3b040` (ignore-file update)
**Stage:** Early Phase 1 foundation; not ready for public launch.
**Next action:** Establish passing local checks, then resolve inquiry reliability and mapping gaps before connecting a public form.

This is the operational source of truth for progress. Keep the snapshot and next actions current; use the session log for history. Architecture documents describe intended scope and acceptance gates.

## Resume in five minutes

1. Read this file. Run `git status --short`, `git branch --show-current`, and `git log -5 --oneline`; preserve unfinished changes.
2. Compare the current commit with the baseline above. Review intervening changes rather than rediscovering the entire project.
3. Check the validation table below. Use Node 22, install dependencies if needed, and run `npm run check` (`npm.cmd` on this Windows machine).
4. Choose the first unblocked next-work item; record the task and owner under Active work.
5. At session end, update status, checks, blockers, next action, and session log. Link commits/PRs and deployment evidence when available.

## Active work

- Implementation task: none recorded at handoff.
- Last completed task: repository review and README/handoff draft.
- Assigned implementation owner: not recorded.
- Worktree at review start: clean.
- Pending changes from this session: documentation only (`README.md`, `docs/handoff.md`).

## Implemented versus planned

| Area | Evidence and current status |
| --- | --- |
| Static prototype | Root HTML/CSS/JS and imagery retained as reference. |
| Application | Next.js 16.2.6, React 19, TypeScript, Zod. Payload is not a dependency. |
| Public UI | `src/app/page.tsx`, `SiteHeader.tsx`, `ProgramFinder.tsx`: one landing page and goal-based finder. No complete internal program routes. |
| Accessibility | Skip link, navigation labels, Escape handling, finder live region exist. No completed browser/accessibility audit recorded here. |
| Inquiry API | JSON validation and direct Salesforce call. No frontend form, persistence, queue, rate limiting, or automated tests. |
| Salesforce | OAuth client credentials and Lead upsert; basic identity/contact mapping. Campaign method exists but is not called by inquiry route. Sandbox success unverified. |
| CMS/database/auth | Documented only; no Payload config, collections, migrations, database client, admin route, or staff auth. Environment filenames do not prove provisioning. |
| Analytics/search/AI | Planned only. Ask Kingswood flag has no implementation behind it. |
| Delivery | Vercel targets Next.js. CI installs and runs lint/typecheck/build. Live deployment and external CI results unverified. |

## Review findings and launch blockers

Source-inspection findings, not runtime reproductions. Application code was not changed during this documentation task.

| Priority | Finding and evidence | Follow-up |
| --- | --- | --- |
| High | Inquiry `route.ts` generates a fresh UUID per request; `salesforce.ts` ignores idempotency context. No durable outbox. Retries may duplicate Leads, subject to Salesforce matching rules. | Persist submissions, define stable retry identity, add outbox/retries/dead-letter/reconciliation, and test outages and duplicates. |
| High | Consent, policy version, attribution, and academic interest are assembled in memory but omitted by `leadPayload`, with no local persistence. | Confirm Salesforce/privacy model and implement approved persistence/mapping before exposing a form. |
| High | Unconfirmed Master of Organizational Leadership appears in program cards, comparison text, and finder results. A verification label is not a publication control. | Confirm institutional approval or remove/gate all affected content before launch. |
| Medium | `companyWebsite` has `.max(0)` in the schema, so populated honeypots fail validation before reaching the intended `202` response. | Align validation and spam handling; test both cases. |
| Medium | Campaign configuration does not cause enrollment. A `204` Lead upsert response returns the submission UUID as `externalId`, not a resolved Salesforce Lead ID. | Resolve Lead ID before using it for CampaignMember; wire and test campaign handling. |
| Medium | No throttling or explicit fetch timeout; token failures are all classified as retryable network failures. | Add abuse controls, bounded requests, and correct permanent/transient failure classification. |
| Medium | No committed lockfile; CI uses `npm install --ignore-scripts`. | Review/commit a lockfile and use reproducible CI installation. |
| Low | Final `.env*` ignore rule overrides `!.env.example`. Existing example remains tracked, but new matching templates would be ignored. | Consolidate ignore rules and preserve template exception. |

## Next work, in order

Owners are suggested roles, not recorded assignments.

| Order | Task | Done when | Dependency / proposed owner |
| --- | --- | --- | --- |
| 1 | Verify development baseline | Reviewed lockfile; passing lint/typecheck/build; linked CI result; desktop/mobile navigation and finder checked | Developer; dependency/network access |
| 2 | Confirm scope and integration decisions | Approval status, content owners, Salesforce object/field mapping, sandbox access, consent model recorded | Project owner, admissions, IT/privacy |
| 3 | Make inquiry handling reliable | Stable idempotency, durable storage/outbox, retries, corrected honeypot, approved mapping, focused API/adapter tests | Developer; item 2 and storage decision |
| 4 | Deliver inquiry flow | Accessible UI, error/retry states, consent capture, verified sandbox receipt without duplicate delivery | Developer/admissions; item 3 |
| 5 | Build CMS foundation | Payload/PostgreSQL, reviewed migrations, roles, drafts, preview, one approved program rendered from CMS | Developer/content owner; scope and provisioning |
| 6 | Expand enrollment content | Program/admissions/cost/visit routes, analytics/consent, redirects, content approval, accessibility/performance evidence | Product/content/development; roadmap gates |

Ask Kingswood is later work. The roadmap puts its pilot in Phase 3 but includes a flagged proof in the Must backlog; confirm the Phase 1 boundary before implementation.

## Decisions and unresolved information

- Implemented: Next.js/TypeScript; Salesforce behind a generic CRM adapter; preserved prototype.
- Proposed: Payload and managed PostgreSQL, neither installed nor proven operational here.
- Approval record conflicts: the previous README called the direction approved, while the master plan says **Proposed for approval** and includes an implementation gate. Code exists, but no explicit approval record was found in the reviewed material. Record the decision/date/owner rather than inferring approval from code.
- Broad integration inventory calls systems unconfirmed; Salesforce-specific mapping names Salesforce as current recruitment system of record. Reconcile during discovery.
- Unknown: deployment URL/health, current CI results, sandbox readiness, CMS/database provisioning, content owners, launch date, institutional scope approval.
- Never copy secrets or prospect data here. `.env.local`, `.env.cms-preview.local`, `.vercel/`, and `.cms-diagnostics/` are local artifacts, not shared progress records. Their contents were not used in this review.

## Latest verification

| Check | September 30, 2026 result |
| --- | --- |
| Source review | Application, CRM/schema, config, CI, recent history, planning documents reviewed |
| Tooling | Node `v24.20.0` installed; project/CI target Node 22 |
| Dependencies | `node_modules` absent; no tracked lockfile |
| `npm.cmd run check` | Blocked at lint: ESLint not found because dependencies are absent. Typecheck/build did not run. |
| Browser/accessibility/API tests | Not run; no dev server started or CRM requests sent |
| External systems | No deployment, database, or Salesforce success claimed |

This is a source review with an attempted check, not a passing build certification. Install dependencies and repeat validation first.

## End-of-session update contract

The person or agent doing the work updates this file before handing off. Replace stale current status instead of accumulating contradictory snapshots. Keep setup in the README and architecture in existing planning documents.

Record:

- Date, branch, reviewed commit, and uncommitted work.
- Changes with file/commit/PR links and completion evidence.
- Exact checks and outcomes; distinguish failed, blocked, and not run.
- Blockers, missing inputs/decisions, and owners when known.
- One exact next action and remaining ordered work.
- Deployment URL and deployed commit only when verified.

## Session log

### 2026-09-30 — Review and documentation

- Reviewed `ca3b040` on `modernization/phase-1-foundation`; starting worktree clean.
- Replaced stale static-deployment README with actual Next.js setup and feature boundaries.
- Added this progress snapshot, findings, next steps, and daily update contract.
- Attempted `npm.cmd run check`; blocked at ESLint by missing dependencies. No application fixes, deployments, or external writes.
- Next session: use Node 22, install dependencies, establish reproducible installation, and capture passing checks before feature work.
