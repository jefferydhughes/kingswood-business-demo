# Kingswood digital enrollment

An early recruitment-site foundation for Kingswood University, built with Next.js App Router, TypeScript, React, and Zod. The original static business-school prototype remains as a design reference.

**Start each session with [the project handoff](docs/handoff.md).** It records progress, issues, validation, and next steps. Planning documents describe intended scope, not completed features.

## Current implementation

- Business recruitment landing page at `/`, responsive navigation, program cards, graduate comparison, and a client-side program finder.
- JSON inquiry endpoint at `POST /api/forms/inquiry`, with validation and a server-only Salesforce Lead adapter. No inquiry form UI yet.
- Basic metadata, security headers, and GitHub Actions for lint, TypeScript, and production build.
- Vercel configuration targets **Next.js**, not the static prototype.

Payload CMS, database persistence, staff authentication, analytics, search, complete program/admissions pages, and Ask Kingswood are planned but not implemented. The inquiry integration is not launch-ready; see the handoff.

## Local setup

Use Node.js 22 to match `.nvmrc` and CI; `package.json` permits 22 or newer.

```sh
npm install --ignore-scripts
npm run dev
```

Open `http://localhost:3000`. On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

No credentials are needed to view the landing page. For integration configuration, copy `.env.example` to `.env.local` only if the destination does not already exist, then set sandbox values. Never overwrite an existing environment file or commit secrets.

There is no committed lockfile, so use `npm install`, not `npm ci`. Reproducible installation is a tracked follow-up.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript without emitting files |
| `npm run build` | Production build |
| `npm run check` | Lint, typecheck, then build |
| `npm start` | Serve an existing production build |

The build uses Google fonts through `next/font/google` and may require network access. No automated unit, integration, or browser test suite is configured. See the handoff for the latest observed validation result; CI configuration alone is not evidence of a passing run.

## Configuration

Use [.env.example](.env.example) as the inventory and [Salesforce mapping](docs/integrations/salesforce-mapping.md) for requirements.

| Variables | Current use |
| --- | --- |
| `SALESFORCE_CLIENT_ID`, `SALESFORCE_CLIENT_SECRET` | Enable the server-side adapter |
| `SALESFORCE_LOGIN_URL` | Set explicitly for sandbox use; code defaults to production login when omitted |
| `SALESFORCE_API_VERSION`, `SALESFORCE_EXTERNAL_ID_FIELD`, `SALESFORCE_DEFAULT_COMPANY` | API and Lead mapping configuration |
| `SALESFORCE_CAMPAIGN_ID` | Read by configuration; campaign enrollment is not wired into the inquiry route |
| `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ASK_KINGSWOOD_ENABLED` | Placeholders, not consumed by application code |
| `DATABASE_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN` | Reserved for future CMS implementation |

The inquiry endpoint returns `415` for unsupported content type, `400` for invalid input, and `503` when unconfigured. A successful CRM write returns `202`; no durable local queue exists. Use sandbox credentials for integration testing.

## Repository map

| Path | Responsibility |
| --- | --- |
| `src/app/` | Active homepage, layout, styles, inquiry API |
| `src/components/` | Navigation and program finder |
| `src/lib/forms/` | Inquiry validation |
| `src/lib/integrations/` | CRM contracts and Salesforce adapter |
| `index.html`, `styles.css`, `app.js`, `assets/` | Static prototype; not the active Next.js route |
| `.github/workflows/ci.yml` | Foundation checks |
| `docs/handoff.md` | Maintained progress and next-session entry point |

## Planning and content rules

- [Master plan](docs/00-master-plan.md): proposed platform and approval gate.
- [Roadmap](docs/roadmap.md): phases and acceptance gates.
- [Schema](docs/schema.md): intended content/data model.
- [Authentication and privacy](docs/auth.md): roles and data boundaries.
- [Integrations](docs/integrations.md) and [Salesforce mapping](docs/integrations/salesforce-mapping.md): contracts and discovery.
- [Compass AI strategy](docs/ai-integrations.md): future AI scope.

Keep the current B.A. in Business Management naming. Master of Organizational Leadership claims require institutional confirmation before publication. Critical program, tuition, deadline, accreditation, and outcome facts need an owner, source, and review date. Migrated content enters draft status. Future AI must use approved sources and must not promise admissions, aid, transfer, immigration, licensure, or employment outcomes.

The reviewed branch is `modernization/phase-1-foundation`; check the actual branch before working. Update the handoff at the end of every session, including incomplete work and validation failures.
