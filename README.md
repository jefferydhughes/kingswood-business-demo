# Kingswood School of Business — Recruitment Demo

This repository contains the original School of Business recruitment prototype and the approved foundation for evolving it into Kingswood University's mobile-first digital enrollment platform.

## Current design reference

The original static prototype is intentionally preserved as the visual, messaging, and interaction reference:

- `index.html` — School of Business recruitment experience
- `styles.css` — responsive visual system
- `app.js` — program-finder quiz and navigation/reveal behavior
- `assets/` — current prototype imagery
- `vercel.json` — static Vercel configuration

The prototype remains deployable without a build command. During modernization, its strongest elements—bold editorial typography, navy/red/cream palette, program cards, applied-learning story, graduate comparison, faith-and-business positioning, and program finder—will be migrated into accessible reusable components.

## Approved modernization direction

Kingswood will evolve this repository into two connected products:

1. An enrollment-first public site built around program discovery, costs, visits, evidence, and clear next steps.
2. Kingswood Compass, a governed AI layer beginning with public admissions guidance and later expanding into course-specific tutoring and faculty tools.

Reference architecture:

- Next.js and TypeScript
- Payload CMS
- Managed PostgreSQL with pgvector
- Institutional SSO for staff and authenticated services
- Provider-neutral AI gateway with retrieval, citations, evaluations, and human handoff
- Consent-aware analytics and adapter-based institutional integrations

Implementation will proceed in phases. The current static files remain the reference until the Next.js implementation reaches approved design, content, accessibility, performance, and conversion gates.

## Governing documents

Read these before changing platform architecture, content models, authentication, integrations, AI behavior, or delivery scope:

- [Master plan](docs/00-master-plan.md)
- [Content and data schema](docs/schema.md)
- [Authentication, authorization, and privacy](docs/auth.md)
- [Integration architecture](docs/integrations.md)
- [Delivery roadmap](docs/roadmap.md)
- [Kingswood Compass AI strategy](docs/ai-integrations.md)

## Content guardrails

- The site markets the currently listed B.A. in Business Management, not an unapproved replacement.
- Master of Organizational Leadership claims require institutional confirmation before public launch.
- Tuition, requirements, deadlines, accreditation, outcomes, and program status require an owner, source, and review date.
- Scraped or migrated content enters draft status and is never auto-published.
- AI services may answer only from approved sources and may not promise admission, aid, transfer credit, immigration, licensure, calling, or employment outcomes.

## Branch strategy

- `main` — production source and approved releases
- One short-lived feature branch per implementation package
- Merge through review and delete the feature branch after production verification
- Do not maintain long-lived design, migration, or environment branches

## Phase 1 outcome

Phase 1 delivers an accessible mobile-first foundation, structured program finder and pages, admissions/cost/visit/parent/international pathways, staff-editable CMS, short integrated forms, analytics and redirects, plus a limited public-content-only Ask Kingswood assistant behind a feature flag.

See the roadmap and master plan for gates and sequencing.

The School of Business homepage is the first design path, not the whole information architecture. See the [WordPress content migration playbook](docs/wordpress-migration.md) for the university-wide page and redirect process.
