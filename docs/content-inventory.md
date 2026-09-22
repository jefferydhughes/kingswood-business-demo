# Kingswood.edu content inventory and migration register

Status: **working inventory — navigation-complete, crawl-incomplete**  
Inventory date: 2026-09-22  
Source: current public navigation and linked pages on `https://www.kingswood.edu/`.

## Scope and confidence

This register captures the homepage, all destinations exposed in the current primary navigation and footer, the program pages linked from the undergraduate/graduate indexes, and several current campaign pages. It is sufficient to plan the shared templates and first migration waves. It is **not yet a complete WordPress crawl**: unlinked posts, older campaigns, media attachments, PDFs, pagination, tags/categories, alternate URLs, and URLs known only through analytics or backlinks still require a machine crawl and exports from WordPress, Google Analytics and Search Console.

Disposition labels follow `docs/wordpress-migration.md`: **Keep/Improve, Merge, Rewrite, Archive, Redirect**. Recommendations below are provisional until the named business owner verifies facts and purpose.

## Proposed route and template conventions

| Page type | Proposed route | Template |
| --- | --- | --- |
| Academics discovery | `/programs` | Program finder/hub |
| Individual credential | `/programs/[slug]` | Structured program page |
| Concentration or pathway | `/programs/[program]/[pathway]` | Program pathway page |
| Admissions task | `/admissions/[slug]` | Admissions/service page |
| Student experience | `/student-life/[slug]` | Experience page |
| Institutional trust | `/about/[slug]` | Institutional page |
| Faculty/person | `/people/[slug]` | Person profile |
| News/event | `/news/[slug]`, `/events/[slug]` | Article/event record |
| Operational utility | `/resources/[slug]` | Utility/service page |

Final slugs should be frozen only after SEO/backlink evidence is added. Where a current URL is already clear and useful, retaining it may be safer than forcing the convention.

## High-level navigation and enrollment journeys

| Current page / URL | Recommended disposition | Target route / template | Risk / owner notes | Wave |
| --- | --- | --- | --- | --- |
| Home — `https://www.kingswood.edu/` | Rewrite | `/` / university homepage | Executive + Enrollment; preserve brand queries, pathways and application/inquiry measurement | 1 |
| Academic Excellence — `/academic-excellence` | Rewrite | `/programs` / program finder | Academic Affairs; should lead with discovery rather than institutional prose | 1 |
| Undergraduate Degrees — `/academic-excellence/undergraduate-degrees` | Merge | `/programs?level=undergraduate` / filtered finder | Registrar + Academic Affairs; must reflect only approved/current offerings | 1 |
| Graduate Degrees — `/academic-excellence/graduate-degrees` | Merge | `/programs?level=graduate` / filtered finder | Graduate Studies; MBA naming and status require verification | 1 |
| Online Degrees — `/academic-excellence/online-degrees` | Merge | `/programs?delivery=online` / filtered finder | Online Education; avoid duplicating program facts across delivery pages | 1 |
| Elements gap year — `/elements` | Keep/Improve | `/programs/elements` / structured program page | Program director; dates, price, travel and eligibility are high risk | 1 |
| Ordination Studies — `/academic-excellence/ordination-studies` | Keep/Improve | `/programs/ordination-studies` / program page | Academic Affairs + denomination liaison; credential requirements need review date | 2 |
| Personal Enrichment — `/academic-excellence/personal-enrichment-courses` | Keep/Improve | `/programs/personal-enrichment` / program page | Online Education; confirm current course inventory and enrollment mechanism | 2 |
| Train Your Volunteers — `/academic-excellence/train-your-volunteers` | Merge | `/programs/ministry-training` or Kingswood Learn destination | Academic/External Programs; determine overlap with Kingswood Learn | 3 |
| Dual Enrolment — `/academic-excellence/dual-enrolment` | Keep/Improve | `/programs/dual-enrolment` / program page | Registrar; spelling convention, course availability, eligibility and fees are high risk | 2 |
| Meet Our Professors — `/academic-excellence/meet-our-professors` | Rewrite | `/faculty` / people directory | Academic Affairs + HR; role, biography and portrait governance required | 2 |
| Registrar’s Office — `/academic-excellence/registrars-office` | Rewrite | `/resources/registrar` / utility page | Registrar; forms, deadlines, policies and downloads require source ownership | 3 |
| Academic Calendars — `/academic-excellence/academic-calendars` | Keep/Improve | `/resources/academic-calendar` / utility page | Registrar; time-sensitive, annual expiry and accessible document requirements | 2 |
| Partnerships — `/partnerships` | Rewrite | `/about/partnerships` / institutional page | President/Academic Affairs; verify every active agreement and claim | 3 |
| Admissions — `/admissions` | Rewrite | `/admissions` / task-led hub | Enrollment; primary conversion journey | 1 |
| Apply Now — `/admissions/apply-now` | Rewrite | `/apply` / application gateway | Enrollment + Registrar; current forms are external `tfaforms.com`; track handoff and failure states | 1 |
| Admission Requirements — `/admissions/admission-requirements` | Rewrite | `/admissions/requirements` / admissions page | Registrar; program, applicant type and country requirements must be structured and dated | 1 |
| International Students — `/admissions/international-students-ircc` | Rewrite | `/admissions/international` / admissions page | International Admissions; immigration/IRCC content is high legal and freshness risk | 1 |
| Cost of Attendance — `/admissions/cost-of-attendance` | Rewrite | `/admissions/costs` / cost calculator/table | Finance + Enrollment; currency, year, housing/meal assumptions and program variance are critical | 1 |
| Financial Aid — `/admissions/financial-aid` | Rewrite | `/admissions/financial-aid` / admissions page | Financial Aid; eligibility, deadlines and award values need sources and review dates | 1 |
| Visit Campus — `/admissions/visit` | Rewrite | `/visit` / visit conversion page | Enrollment; scheduling integration, confirmation and attribution required | 1 |
| Meet Our Team — `/admissions/meet-our-team` | Keep/Improve | `/admissions/team` / people directory | Enrollment; maintain territories, contact routes and staff lifecycle | 2 |

## Program records

All program pages should migrate into one CMS collection and one adaptable template. Shared fields should include credential, level, delivery, length, campus/online availability, admissions requirements, outcomes, courses, experiential learning, tuition reference, faculty, application CTA, approval/status, source owner and next review date.

| Current program URL | Recommended disposition | Target route | Risk / owner notes | Wave |
| --- | --- | --- | --- | --- |
| `/academic-excellence/undergraduate-degrees/bachelor-of-arts-in-business-management` | Rewrite | `/programs/business-management` | Business + Registrar; current page includes course list and faculty video; reconcile with approved curriculum | 1 |
| `/christian-counselling` | Rewrite | `/programs/christian-counselling` | Counselling + Registrar; distinguish undergraduate preparation from licensure claims | 1 |
| `/academic-excellence/undergraduate-degrees/christian-school-education` | Rewrite | `/programs/christian-school-education` | Education + Registrar; certification and transfer-articulation claims are high risk | 2 |
| `/academic-excellence/cse-certificate` → currently redirects to `/academic-excellence/cse-diploma` | Keep/Improve + Redirect | `/programs/christian-school-education-diploma` | Registrar; confirm official award name; preserve both legacy URLs in redirect map | 2 |
| `/academic-excellence/undergraduate-degrees/bachelor-of-arts-in-ministry` | Rewrite | `/programs/ministry` | Ministry + Registrar; parent program for concentrations | 1 |
| `/praxis` | Rewrite | `/programs/ministry/evangelism-compassion-social-justice` | Program owner; current label varies between “social justice” and “compassion”; confirm canonical name | 2 |
| `/intercultural-studies` | Rewrite | `/programs/ministry/intercultural-studies` | Ministry + Registrar; verify whether still offered/current delivery | 2 |
| `/marketplace-ministry` | Rewrite | `/programs/ministry/marketplace-ministry` | Ministry/Business + Registrar; clarify concentration vs stand-alone credential | 2 |
| `/pastoral-ministry` | Rewrite | `/programs/ministry/pastoral-ministry` | Ministry + Registrar; ordination implications require careful language | 1 |
| `/nextgen-ministry` | Rewrite | `/programs/ministry/nextgen-ministry` | Ministry + Registrar; verify current naming and course set | 2 |
| `/sports-recreation-management` | Rewrite | `/programs/sports-recreation-management` | Business/Sport + Registrar; approved status, career claims and delivery need confirmation | 1 |
| `/academic-excellence/undergraduate-degrees/bachelor-of-theology` | Rewrite | `/programs/theology` | Theology + Registrar | 1 |
| `/worship-arts` | Rewrite | `/programs/worship-leadership` | Worship + Registrar; resolve URL/title mismatch | 2 |
| `/academic-excellence/undergraduate-degrees/associate-of-arts-in-biblical-languages` | Rewrite | `/programs/biblical-languages` | Theology + Registrar | 2 |
| Additional associate pages listed on the undergraduate index | **Incomplete crawl** | `/programs/[slug]` | Known index includes Biblical Studies, Christian Ministry, and Evangelism & Compassion Ministry; exact linked URLs and current status still need verification | 2 |
| MA Clinical Mental Health Counselling (linked from graduate index) | Rewrite | `/programs/clinical-mental-health-counselling` | Graduate Counselling + Registrar; licensure/jurisdiction claims are high risk | 1 |
| MA Pastoral Theology (linked from graduate index) | Rewrite | `/programs/pastoral-theology` | Graduate Studies + Registrar | 1 |
| MBA — `/mba` | Rewrite | `/programs/mba` | Business + Graduate Studies; reconcile “Master of Business Administration” with application page’s erroneous “Master of Arts in Business Administration” wording | 1 |
| Master of Management — `/master-of-management` | Archive or Redirect after review | Likely `/programs/mba` or partnership archive | Page describes a Crandall-hosted arrangement; confirm whether active before any redirect | 0 decision |

## Student life and support

| Current page / URL | Recommended disposition | Target route / template | Risk / owner notes | Wave |
| --- | --- | --- | --- | --- |
| Student Life — `/student-life` | Rewrite | `/student-life` / experience hub | Student Life + Enrollment; needs real student proof and visit CTAs | 2 |
| Residences — `/student-life/residences` | Rewrite | `/student-life/residence` / experience page | Student Life; current costs, policies, accessibility and room details | 2 |
| Athletics — `/student-life/athletics` | Rewrite | `/student-life/athletics` | Athletics; teams/schedules/status and recruitment contacts | 2 |
| Solid Grounds — `/student-life/solid-grounds` | Keep/Improve | `/student-life/solid-grounds` | Student Life; clarify service and current operation | 2 |
| Chapel — `/student-life/chapel-playlist` | Rewrite | `/student-life/chapel` | Campus Ministries; live stream and archive should be distinct | 2 |
| Dining Commons — `/student-life/dining-commons` | Rewrite | `/student-life/dining` | Food Services; meal plans, allergies and hours are time-sensitive | 2 |
| Counselling Centre — `/counselling-centre-form-1` | Rewrite | `/student-life/counselling` or `/counselling-centre` | Counselling Centre; sensitive-service privacy, emergency boundaries and intake handling need legal review | 2 |
| Dining Hall Menu — `/dining-hall-menu` | Keep/Improve | `/resources/dining-menu` | Food Services; recurring operational content, not main recruitment navigation | 3 |
| Library — `/library` | Keep/Improve | `/resources/library` | Library; database/auth links and accessibility | 3 |

## About, trust and institutional content

| Current page / URL | Recommended disposition | Target route / template | Risk / owner notes | Wave |
| --- | --- | --- | --- | --- |
| About — `/about` | Rewrite | `/about` / trust hub | President/Communications | 2 |
| Mission & Statement of Faith — `/mission-statement-of-faith` | Keep/Improve | `/about/mission-and-faith` | Board/President; preserve approved wording verbatim where required | 2 |
| History — `/history` | Keep/Improve | `/about/history` | Archives/Communications; verify dates and names | 3 |
| President — `/staff/dr-rick-christman` | Keep/Improve | `/about/president` plus `/people/rick-christman` | President’s Office; avoid duplicate biography sources | 2 |
| Board of Trustees — `/board-of-trustees` | Keep/Improve | `/about/governance` | President’s Office/Board secretary; membership freshness | 2 |
| Accreditation — `/accreditation` | Keep/Improve | `/about/accreditation` | Academic Affairs; accreditor names/status and required disclosures are critical | 1 |
| Outcomes — `/outcomes` | Rewrite | `/about/outcomes` | Institutional Research; define measures, cohorts, sources and reporting years | 1 |
| Contact Us — `/contact-us` and `/contact` | Merge + Redirect | `/contact` | Communications/Operations; duplicate current URLs; validate address, phones, departments and form routing | 2 |
| Donate — `/donate` | Keep/Improve | `/give` | Advancement + Finance; payment security and receipting | 2 |
| Free Resources — `/free-resources` | Rewrite | `/resources` | External Programs; much content may route to Kingswood Learn | 3 |
| Privacy Policy — `/privacy-policy` | Keep/Improve | `/privacy` | Privacy/legal owner required; includes forms, analytics and integration disclosures | 1 |

## News, events and campaigns

| Current page / URL | Recommended disposition | Target route / template | Risk / owner notes | Wave |
| --- | --- | --- | --- | --- |
| Blog — `/blog` and News/Events — `/news-events` | Merge | `/news` | Communications; reconcile two indexes, categories, pagination and authors | 3 |
| Events — `/events` | Rewrite | `/events` / event index | Communications; events need start/end, location, audience, CTA and expiry behavior | 3 |
| Ablaze Spring 2026 — `/ablaze-spring-2026` | Keep/Improve or Archive | `/news/ablaze/spring-2026` | Advancement/Communications; model as publication issue, not singleton page | 3 |
| Co-Vocational Ministry Seminar — `/co-vo-seminar` | Archive after event or reuse event record | `/events/[slug]` | Event owner; preserve recap if valuable, remove stale registration CTA | 3 |
| Encounter 2026 — `/encounter-2026` | Archive after event or reuse event record | `/events/encounter-2026` | Event owner; dates/registration are time-sensitive | 3 |
| Kingswood Golf Classic — `/kingswood-golf-classic` | Keep/Improve | `/events/golf-classic` | Advancement; annual event should reuse one template with year records | 3 |
| Israel 2026 — `/israel-2026` (labelled postponed) | Archive/Redirect after owner decision | `/events/israel-2026` or explanatory archive | Trip owner; high financial/travel risk; retain clear status until obligations resolved | 0 decision |

## Current-student and operational utilities

These links should remain easy to find in a utility directory/footer, but external systems should not be copied into the CMS.

| Current destination | Recommended disposition | Target treatment | Risk / owner notes | Wave |
| --- | --- | --- | --- | --- |
| Canvas, KXM, Intranet, Populi, Online Student Payment | Keep external | `/students` authenticated-system directory with clearly labelled outbound links | IT + Student Services; confirm URLs, SSO behavior and support contacts | 3 |
| Catalogue — `/catalogue` | Keep/Improve | `/resources/catalogue` with accessible current and archived editions | Registrar; catalogue is a formal source of truth; preserve historic editions | 2 |
| Calendar — `/calendar` | Keep/Improve | `/events` plus academic-calendar distinction | Communications + Registrar; clarify event calendar vs academic dates | 3 |
| Campus Directory — `/campus-directory` | Rewrite | `/people` or `/contact/directory` | HR/Operations; privacy and staff lifecycle | 3 |
| Employment — `/employment` | Keep/Improve | `/about/careers` | HR; application privacy and posting expiry | 3 |
| Conferencing Services — `/conferencing-services` | Rewrite | `/conference-services` | Operations/Business Development; revenue journey and inquiry form | 3 |
| Food Trays — `/conferencing-services/food-trays` | Merge | `/conference-services/catering` | Food Services; prices, lead times and order handling | 3 |

## Required follow-up before migration decisions are final

1. Export all WordPress posts, pages, custom post types, media and redirects; crawl every internal URL and download.
2. Add GA/Search Console evidence, inbound links, conversions and 404 history to each row.
3. Expand all program indexes and confirm every linked credential/pathway URL and current approval status.
4. Inventory blog pagination, categories/tags, author archives, old event/campaign URLs, PDFs and media attachment pages.
5. Record current metadata, canonical tags, schema, forms, embeds, videos and downloadable dependencies.
6. Name an accountable content owner and approver for every high-risk fact set.
7. Produce a one-to-one redirect register only after target routes are approved; do not infer redirects solely from similar titles.

## Immediate Wave 1 release gate

The new primary domain should not replace WordPress until the homepage, program finder, priority programs, admissions hub, requirements, international, costs, aid, visit, apply/inquiry handoffs, accreditation, outcomes, privacy and all associated redirects pass mobile, accessibility, analytics and link testing.
