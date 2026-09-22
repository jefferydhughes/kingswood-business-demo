# Delivery roadmap

## Delivery model

Use staged product gates. Do not attempt the full public site, admissions integrations, student portal, and UF-scale AI suite in one release.

## Phase 0 — Alignment and baseline (2–3 weeks)

- Confirm repository/stack and owners.
- Inventory systems/contracts and current analytics/conversions.
- Crawl/classify current content.
- Confirm sources of truth.
- Interview admissions, students, parents, faculty, marketing, IT, leadership.
- Approve KPIs, audiences, platform, and Phase 1.

Gate: approved brief, owners, sources, budget range.

## Phase 1 — Enrollment foundation (6–10 weeks)

- Accessible design system.
- Payload CMS, roles, drafts, preview, schemas.
- Homepage/navigation/search shell.
- Program finder and complete program templates.
- Admissions, aid, visit, parents, online, international.
- Short inquiry/visit flows.
- Analytics/consent and redirects.
- Priority content migration and real imagery/proof.

WordPress migration in this phase includes the high-level recruitment journeys—not only copied footer links. Academics, Admissions, Student Life, About, Visit, Costs/Aid, program hubs, and priority program pages receive redesigned mobile-first templates. Each current URL is inventoried and assigned Keep/Improve, Merge, Rewrite, Archive, or Redirect status before launch. See `docs/wordpress-migration.md`.

Gate: ≥90% priority-task success with no critical accessibility, content, security, or usability defect.

## Phase 2 — Launch and optimization (4–6 weeks)

Complete public recruitment content, SEO/redirect validation, editor training, dashboards, controlled soft launch, defect repair, public launch, and two-week optimization cycles.

Gate: production review and signed content ownership.

## Phase 3 — Ask Kingswood pilot (4–6 weeks)

Approved public program/admissions/cost/visit content only; citations, review dates, limits, and human handoff. No admission decision, spiritual-direction claim, aid promise, or sensitive data.

Gate: ≥95% supported factual answers and zero critical policy failures.

## Phase 4 — Personalization and conversion (ongoing)

Declared-intent experiences, comparisons/email plans, parent/online journeys, verified cost planner, CRM nurture/appointments, controlled experiments.

Gate: credible improvement without accessibility/equity regression.

## Phase 5 — Compass Tutor pilot (one term)

Two or three courses, LTI 1.3, instructor sources and boundaries, grounded explanation/practice/feedback, no autonomous grading or high-stakes decisions.

Gate: academic, privacy, accessibility, security approval and pilot evidence.

## Phase 6 — Compass expansion

Secure chat, faculty assistant builder, accessibility assistant, prompt library, survey synthesis, course analytics, and model gateway. Each requires a business case, classification, evaluation set, and owner.

## Parallel implementation streams after approval

1. Platform: Next.js, CMS, database, CI/CD.
2. Design: tokens, components, responsive templates.
3. Content/data: crawl, mapping, migration, redirects.
4. Enrollment: finder, pages, forms, personalization.
5. Integrations: CRM, application, email, visits, identity, analytics.
6. AI: ingestion, gateway, Ask Kingswood, evaluation.
7. Quality: accessibility, performance, security, analytics, usability.

All streams use shared schemas, API contracts, design tokens, and acceptance tests. One integrator owns cross-stream merges.

## Backlog

Must: programs/finder, program template, admissions/cost/visit, navigation/search, CMS workflow, forms, analytics/consent, redirects/SEO, accessibility/performance pipeline, Ask Kingswood proof behind a flag.

WordPress migration must: complete URL inventory; assign content owners; build high-level templates; migrate priority recruitment content to CMS drafts; verify facts, accessibility, metadata, and mobile CTAs; approve a one-to-one redirect map; preserve required utility/current-student links; monitor 404s after launch.

Should: compare, parent hub, international program panels, stories/outcomes, emailed plans, events.

Later: prospect portal, cost calculator, CRM-stage personalization, LMS tutor, secure chat, AI authoring/analytics.

## Release controls

Short branches, PR previews, required lint/type/unit/integration/accessibility/smoke checks, repeatable migrations, feature flags, database review/rollback, and monitoring for errors, forms, queue, search gaps, and AI failures.

## Minimum resourcing

Product owner; technical lead; front-end/design-system developer; UX/content strategist; migration/editorial support; integration/data support; accessibility/QA; admissions/academic owners; AI engineer/evaluator for Compass.

Schedules expand when roles are fractional or sources/APIs are unresolved.
