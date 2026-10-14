# WordPress content migration playbook

Status: required Phase 1 workstream. The School of Business homepage is a design reference and one audience path within the university-wide site.

## Outcome

Move Kingswood from WordPress without losing useful content, search equity, institutional obligations, or familiar destinations. Apply the approved mobile-first design and conversion methodology to every high-level public journey. Do not wrap old pages in a new header and footer, and do not reproduce the WordPress tree page-for-page.

## Non-negotiable rules

1. Every indexable WordPress URL appears in the migration inventory.
2. Every URL receives one disposition: **Keep/Improve, Merge, Rewrite, Archive, or Redirect**.
3. Nothing is removed silently. Every valuable retired URL maps to the closest useful new destination.
4. Scraped content enters the CMS as a draft. A named owner verifies it before publication.
5. High-risk facts—cost, aid, requirements, dates, accreditation, program status, policies, immigration, and outcomes—require a source and review date.
6. The new page must satisfy its user task on mobile; visual consistency alone is not acceptance.
7. Current-student systems and institutional utilities remain easy to find without dominating prospective-student navigation.

## Current high-level WordPress areas

The current navigation contains these migration families:

| Current family | Examples | New treatment |
| --- | --- | --- |
| Academics | Gap Year/Elements, undergraduate, graduate, online and certificate offerings, professors, registrar, partnerships, calendars | Academics hub, program finder, structured program pages, faculty records, compact academic resources layer |
| Admissions | Apply, requirements, international, cost, financial aid, visit, enrolment team | Task-led admissions journeys with persistent next steps and verified shared facts |
| Student Life | Residence, athletics, Solid Grounds, chapel, dining | Student-life hub with experience proof, practical answers and visit/inquiry CTAs |
| About | Mission and faith, history, president, trustees, accreditation, outcomes, news | Trust-and-proof templates; leadership and governance separated from recruitment evidence |
| Events | Recruitment, chapel and community events | Structured events with dates, audiences, registration state and expiry |
| Current Students | Canvas, KXM, catalogue, counselling, dining, intranet, library, payments, Populi | Stable utility directory; external systems clearly labelled |
| Quick Links | Calendar, directory, careers, conferencing, contact, privacy and service forms | Searchable utility/footer layer; retain only justified global links |

This table is a starting taxonomy, not the final URL inventory.

## Template system

High-level pages are redesigned with shared blocks and page-specific intent:

### Academics hub

Program discovery first: interest, credential, delivery and calling/career goals. Provide comparison, proof and a clear route into each structured program page.

### Admissions hub

Start from visitor type and next decision. Surface requirements, deadlines, cost/aid, international guidance, visit and application readiness without forcing users through departmental language.

### Student Life hub

Answer what daily life feels like and what support exists. Use real photography, residence/food/spiritual/community details, student stories and visit prompts.

### About hub

Establish trust through mission, beliefs, accreditation, outcomes, leadership and history. Separate governance detail from prospect-facing proof while keeping both accessible.

### Program page

Use one structured template for all schools and disciplines, including Business. Fields and blocks adapt by program; the visual system does not create a separate microsite that fragments navigation.

### Service and utility page

Keep transactional information concise, searchable and owned. Do not force operational pages into long marketing layouts.

## Migration waves

### Wave 0 — Inventory and evidence

- Crawl WordPress pages, media, files, metadata and internal links.
- Add analytics, backlink, conversion and ownership evidence where available.
- Identify duplicates, expired events, broken links, inaccessible media and conflicting facts.
- Freeze deletion decisions until the redirect map is reviewed.

### Wave 1 — Enrollment-critical pages

- Global navigation and footer.
- Academics/program finder and program pages.
- Admissions, requirements, costs/aid, visit and international.
- Homepage pathways, inquiry and apply handoffs.
- Elements, MBA, counselling and online priority journeys.

### Wave 2 — Trust and experience

- Student Life, residence, spiritual life, athletics, dining and support.
- Faculty, accreditation, outcomes, mission/faith, leadership and contact.
- Parent, transfer and location/Sussex content.

### Wave 3 — Institutional and recurring content

- News, events, partnerships, calendars, policies and catalogue links.
- Current-student and community utilities.
- Remaining archive decisions and redirects.

## Per-page workflow

1. Capture current URL, title, metadata, body, media, downloads and inbound/internal links.
2. Record audience, user task, business value, owner, accuracy risk and analytics evidence.
3. Assign disposition and target template.
4. Rewrite around the primary task and conversion step; do not merely reformat old copy.
5. Import to CMS draft with source URL, owner and review date.
6. Verify facts, accessibility, mobile layout, SEO metadata, structured data and CTA destination.
7. Approve the new URL and redirect before publication.
8. Test old and new URLs in preview, then monitor production 404s and search-console coverage.

## Migration inventory fields

Minimum columns:

- current URL and canonical URL
- current title and proposed title
- content family and audience
- primary task and primary CTA
- disposition and rationale
- target route and template
- content owner and approver
- source of truth and last verified date
- risk level
- organic traffic, backlinks and conversion evidence when available
- media/download dependencies
- accessibility, metadata and link issues
- redirect target and redirect approval
- CMS draft, QA and publish status

## Definition of done

A migration wave is complete only when:

- all scoped URLs have an approved disposition;
- new pages use approved templates and CMS records;
- required facts have owners, sources and review dates;
- mobile, keyboard, screen-reader and contrast checks pass;
- metadata, canonical URLs, sitemap entries and structured data are correct;
- every retired valuable URL returns a tested permanent redirect;
- application, inquiry, visit, external-system and download links work;
- no critical broken link or unowned high-risk content remains;
- production 404s and search indexing are monitored after release.

## Timing

Begin inventory and classification while the CMS and templates are being built. Migrate content only after its target schema and template are stable. Launch by approved waves rather than waiting for every historic page, but do not switch the primary domain until Wave 1 routes and redirects pass their release gate.
