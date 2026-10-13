# Kingswood University digital enrollment platform

A Next.js and TypeScript application for Kingswood University in Sussex, New Brunswick,
built as a working demonstration of a redesigned public site and enrollment path. It is a
demo for stakeholder review, not a production site.

Read [docs/handoff.md](docs/handoff.md) first. It is the living record of what works, what
does not, and what to do next.

## Current state

| | |
| --- | --- |
| Public site | Working. Seven routes, mobile first, verified in a browser at phone and desktop width |
| Inquiry form | Working. Captures submissions and states plainly when nothing was delivered |
| Email delivery | Code complete, switched off. Needs three environment variables |
| Salesforce | Adapter present, unmapped beyond standard Lead fields, awaiting institutional access |
| Payload CMS | Unavailable. The database it points at was deleted. `/admin` explains this rather than erroring |
| Content | Served from fixtures, not from the CMS |

## Running it

Node 22. `npm install`, then:

```
npm run dev        # http://localhost:3000
npm run check      # lint, typecheck, production build
```

No environment variables are required to run the public site. Copy `.env.example` to
`.env.local` to configure the optional pieces.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | School of Business landing page, the main design path |
| `/academics`, `/admissions`, `/student-life`, `/about` | University-level pages. Structure, not migrated content |
| `/encounter` | QR destination for the November student weekend. Excluded from search engines |
| `/demo/inquiries` | Shows what the inquiry form captured. Exists only while no real delivery channel is configured, so it can never display a production lead |
| `/admin` | Payload CMS. Currently explains that it has no database |

## How an inquiry is handled

`POST /api/forms/inquiry` validates the submission, then delivers it through every
configured channel and returns 202 if any one succeeds.

When no channel is configured, the submission is captured in memory, the response carries
`mode: "demo"`, and the confirmation tells the visitor that nothing was delivered to anyone.
Nothing in the interface claims a delivery that did not happen. There is no durable store
yet, which is the first item in the handoff's remaining work.

## Environment

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_REVIEW_MODE` | Defaults to on. Shows the approval banner and the Proposed, Confirmed, Exploratory and Hypothesis labels. Turning it off hides the disclosure without removing the claims, so leave it on until programs are approved |
| `NEXT_PUBLIC_SHOW_INTEREST_LIST` | Shows the "programs in development" line on `/encounter`. Requires the president's approved wording |
| `RESEND_API_KEY`, `INQUIRY_NOTIFY_TO`, `INQUIRY_FROM` | All three switch on email delivery of inquiries. See the handoff for setup |
| `SALESFORCE_*` | CRM delivery. Requires a dedicated API-only integration user |
| `DATABASE_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN` | Payload CMS. Without the first two, CMS routes return 404 |

## Content guardrails

These are rules about what the site is allowed to say, and they are enforced in code and in
review, not by convention alone.

- The site markets the currently listed B.A. in Business Management and the online MBA. The
  three new bachelor's degrees are shown as proposed and are not approved.
- Nothing claims or implies accreditation. ACBSP was chosen; a Fall 2027 launch cannot use
  the word accredited.
- Tuition, requirements, deadlines, accreditation, outcomes and program status each require
  an owner, a source and a review date. `src/content/facts.ts` carries that shape. A claim
  without provenance is removed rather than published, as the accreditation and outcomes
  cards on `/about` were.
- Master of Organizational Leadership claims require institutional confirmation.
- Scraped or migrated content enters draft status and is never auto-published.
- AI services may answer only from approved sources and may never promise admission, aid,
  transfer credit, immigration, licensure, calling or employment outcomes.
- The brand palette in [docs/brand-guide.md](docs/brand-guide.md) is the whole palette, and
  text and controls meet WCAG AA.

## Repository layout

```
src/app/(frontend)      public routes, the inquiry API, global styles, self-hosted fonts
src/app/(payload)       Payload CMS admin and API
src/components          shared UI
src/content             fixture content and sourced facts
src/lib                 forms, integrations, analytics, database
src/collections         Payload collections
docs                    handoff, brand guide, architecture and planning documents
```

`index.html`, `styles.css` and `app.js` at the repository root are the original static
prototype, kept as a visual reference and excluded from linting. They are also preserved on
the `v1` branch, so these copies can be removed once that is confirmed.

## Governing documents

Read before changing architecture, content models, authentication, integrations, AI
behaviour or delivery scope.

- [Handoff](docs/handoff.md), the current state and next actions
- [Master plan](docs/00-master-plan.md)
- [Content and data schema](docs/schema.md)
- [Authentication, authorization and privacy](docs/auth.md)
- [Integration architecture](docs/integrations.md)
- [Delivery roadmap](docs/roadmap.md)
- [Kingswood Compass AI strategy](docs/ai-integrations.md)
- [Brand guide](docs/brand-guide.md)
- [WordPress content migration playbook](docs/wordpress-migration.md)

## Branch strategy

`main` is the production source. Work happens on one short-lived feature branch per package,
merged through review and deleted afterwards. Long-lived design, migration and environment
branches are not maintained.

`v1` is the one deliberate exception: it preserves the original static site and is kept
indefinitely. The handoff lists which other branches are merged and safe to delete.
