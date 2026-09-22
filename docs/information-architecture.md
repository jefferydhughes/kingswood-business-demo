# Kingswood University information architecture

**Status:** proposed implementation specification  
**Scope:** university-wide public website  
**Source baseline:** current `kingswood.edu` navigation reviewed September 22, 2026, the approved master plan, WordPress migration playbook, and implemented School of Business homepage

## Architecture decision

The new website is one Kingswood University experience organized around visitor decisions. The School of Business is one academic pathway within the common program system; it does not receive separate global navigation, a separate header/footer, or an independent site structure.

The architecture deliberately separates three layers:

1. **Prospective-student navigation** answers what to study, how to join, what Kingswood is like, what it costs, and why it is credible.
2. **Institutional information** provides mission, governance, accreditation, news, policies, and public resources without competing with enrollment journeys.
3. **Authenticated and operational systems** remain easy to find in a utility directory, but do not occupy the primary navigation.

This replaces the current WordPress pattern of exposing internal categories and many equally weighted links. Existing useful destinations remain accessible through intentional new routes, footer groups, search, the utility directory, and redirects.

## Global navigation

Desktop uses five primary items plus a visually distinct Apply action. Each primary item opens a keyboard-accessible mega panel. The panel may include one highlighted task, but should not become a catalogue of every page.

| Primary item | Purpose | Recommended panel links | Featured action |
| --- | --- | --- | --- |
| **Programs** | Help visitors find an academic path | Program Finder; Undergraduate; Graduate; Online; Elements Gap Year; Certificates & Ministry Training; Compare Programs; Meet Our Faculty | Find Your Program |
| **Admissions & Aid** | Explain entry, affordability, and next steps | Admissions Overview; Undergraduate Admissions; Graduate Admissions; Online Admissions; International Students; Requirements; Deadlines; Cost of Attendance; Scholarships & Financial Aid | Request Information |
| **Experience Kingswood** | Make daily life and place tangible | Student Life; Residence; Spiritual Life & Chapel; Athletics & Recreation; Dining; Student Support; Sussex, New Brunswick; Events; Virtual Tour | Plan a Visit |
| **Outcomes** | Establish practical and spiritual value | Careers & Calling; Applied Learning; Graduate Stories; Student Stories; Ministry Preparation; Institutional Outcomes | Explore Outcomes |
| **About** | Establish institutional trust | Mission & Beliefs; Accreditation; Leadership; History; Partnerships; News; Contact; Work at Kingswood | About Kingswood |

### Program navigation rule

All programs use the same `/programs/[slug]` family and shared program template. Business Management, Sports & Recreation Management, MBA, Organizational Leadership, ministry programs, counselling, Elements, and online offerings appear according to level, delivery, interest, and credential—not according to which department has built the most prominent microsite.

The School of Business may have an optional collection page at `/programs/business` for shared narrative, faculty, and applied-learning proof. It must retain the university header, footer, search, admissions actions, program comparison, and related-program pathways. Its individual degrees remain canonical `/programs/[slug]` records.

## Utility navigation

### Public utility bar

The compact desktop utility bar contains:

- Current Students
- Faculty & Staff
- Alumni & Friends
- Give
- Search

Do not place the telephone number in the main desktop utility bar unless call analytics show it is a frequent task. Contact information remains in Contact and the footer. On small screens, utility destinations appear in a dedicated section near the bottom of the menu rather than in a second horizontal row.

### Persistent enrollment actions

- **Request Information** — secondary action
- **Visit** — secondary action
- **Apply** — primary action

On desktop, Apply is the persistent high-emphasis action; Request Information and Visit may appear as compact text actions. On mobile program and admissions pages, a sticky action area presents one context-aware primary action and an overflow or secondary action. It must not cover content, cookie controls, form errors, or device safe areas.

### Current-student directory

Route `/current-students` provides clearly labelled links to external systems:

- Canvas
- KXM
- Catalogue
- Chapel live stream
- Counselling Centre form
- Dining menu
- Intranet
- Library
- Online student payment
- Populi

Each external link indicates that it opens another system. Authentication state is not mixed into the public site navigation.

## Canonical route map

```text
/
├── /programs
│   ├── /program-finder
│   ├── /compare
│   ├── /programs/undergraduate
│   ├── /programs/graduate
│   ├── /programs/online
│   ├── /programs/elements
│   ├── /programs/certificates-ministry-training
│   ├── /programs/business                 optional collection
│   └── /programs/[slug]                   canonical program records
├── /admissions
│   ├── /admissions/undergraduate
│   ├── /admissions/graduate
│   ├── /admissions/online
│   ├── /admissions/international
│   ├── /admissions/requirements
│   ├── /admissions/deadlines
│   ├── /admissions/request-information
│   └── /admissions/apply
├── /costs-aid
│   ├── /costs-aid/cost-of-attendance
│   ├── /costs-aid/scholarships
│   ├── /costs-aid/financial-aid
│   └── /costs-aid/cost-planner
├── /visit
│   ├── /visit/campus
│   ├── /visit/virtual-tour
│   └── /visit/events
├── /student-life
│   ├── /student-life/residence
│   ├── /student-life/spiritual-life
│   ├── /student-life/chapel
│   ├── /student-life/athletics-recreation
│   ├── /student-life/dining
│   ├── /student-life/support
│   └── /student-life/sussex-new-brunswick
├── /outcomes
│   ├── /outcomes/careers-calling
│   ├── /outcomes/applied-learning
│   ├── /outcomes/student-stories
│   ├── /outcomes/graduate-stories
│   └── /outcomes/institutional-outcomes
├── /parents
├── /about
│   ├── /about/mission-beliefs
│   ├── /about/accreditation
│   ├── /about/leadership
│   ├── /about/history
│   ├── /about/partnerships
│   └── /about/contact
├── /news
├── /events
├── /current-students
├── /alumni-friends
├── /give
├── /work-at-kingswood
├── /resources
├── /search
└── /ask
```

The route map is a target model, not permission to invent facts or publish placeholder programs. WordPress URLs receive explicit redirect decisions in the migration inventory.

## Route ownership and review cadence

CMS permissions should reflect ownership. Marketing may edit presentation and supporting copy, but cannot silently change academic, financial, regulatory, or policy facts owned elsewhere.

| Route family | Accountable owner | Required contributors/approvers | Minimum review |
| --- | --- | --- | --- |
| `/`, global navigation, global footer | Marketing/Web product owner | Admissions, Academic Affairs, Communications | Quarterly and before each major intake |
| `/programs`, `/program-finder`, `/compare` | Academic Affairs | Registrar, program chairs, Admissions, Marketing | Each term |
| `/programs/[slug]` | Named program chair | Registrar for credential/curriculum; Admissions for requirements; Finance for costs | Each term; dates and status before publication |
| `/programs/business` | School of Business lead | Academic Affairs, Registrar, Marketing | Each term |
| `/admissions/**` | Enrollment/Admissions | Registrar, International office, Marketing | Each intake; deadlines continuously monitored |
| `/costs-aid/**` | Finance/Financial Aid | Admissions, Registrar | Each term and immediately after approved changes |
| `/visit/**` | Admissions/Visitor experience | Events, Facilities, Marketing | Monthly and before each event cycle |
| `/student-life/**` | Student Life | Residence, Chapel, Athletics, Dining, Student Support | Each term |
| `/outcomes/**` | Institutional Research/Academic Affairs | Alumni, Career/Ministry placement, Marketing | Annually; every statistic sourced |
| `/parents` | Admissions | Student Life, Finance, Marketing | Each intake |
| `/about/mission-beliefs` | President/Board designee | Communications, denominational or theological reviewer | Annual and after formal action |
| `/about/accreditation` | Academic Affairs/Accreditation officer | Registrar, Communications | Annual and after status change |
| `/about/leadership` | President's Office | HR, Communications | On appointment/change |
| `/about/history` | Communications/Archives | President's Office | Annual |
| `/about/partnerships` | Academic Affairs/Business Development | Partner owner, Communications | Quarterly; expiry required |
| `/news` | Communications | Relevant subject owner | Editorial cadence; archive policy applies |
| `/events` | Events/Communications | Event owner | Before publication; auto-expire after event |
| `/current-students`, `/resources` | Student Services/Web owner | IT and each linked service owner | Monthly link check; each term ownership review |
| `/give` | Advancement | Finance, Communications | Quarterly/campaign cycle |
| Policies, privacy, accessibility | Named institutional policy owner | Legal/privacy/accessibility reviewers | Annual and after regulatory/policy change |

Every structured record includes `owner`, `approver`, `sourceOfTruth`, `lastVerifiedAt`, `nextReviewAt`, and an optional `expiresAt`. High-risk expired facts should be unpublished or visibly flagged for staff—not left live indefinitely.

## Breadcrumb rules

Breadcrumbs appear below the header on all interior pages except intentionally simplified conversion steps such as a focused inquiry form. They provide orientation, not a reproduction of browser history.

- Begin with **Home** and end with the current page as plain text with `aria-current="page"`.
- Use the canonical information hierarchy; never include campaign or filter-query states.
- Show at most four visible levels. If the canonical hierarchy is deeper, collapse middle levels visually while retaining valid structured data.
- On mobile, show the immediate parent as a back-style link plus the current page label when the full trail would wrap excessively.
- Add `BreadcrumbList` structured data based on canonical URLs.
- Program pages use `Home → Programs → [Program name]` regardless of whether the visitor arrived from Business, Undergraduate, Online, search, or an ad.
- Collection pages use `Home → Programs → Business` or the relevant collection.
- A program's modality is metadata and a filter, not an extra breadcrumb level.
- External services do not inherit fake breadcrumbs; the directory page owns the public trail.

Examples:

- `Home → Programs → BA Business Management`
- `Home → Admissions & Aid → International Students`
- `Home → Experience Kingswood → Residence Life`
- `Home → About → Accreditation`

## CTA hierarchy

The interface should not present multiple actions as equally important. CTA selection follows visitor intent and page stage.

| Rank | Action type | Typical labels | Use |
| --- | --- | --- | --- |
| 1 | Primary conversion | Start Your Application; Request Information; Book a Visit | One per viewport/section; chosen by the page's primary task |
| 2 | Decision support | Find Your Program; Compare Programs; View Costs & Aid; Check Requirements | Before a visitor has enough confidence for the primary conversion |
| 3 | Evidence/depth | Meet Faculty; See Courses; Read a Student Story; Explore Outcomes | Contextual text links or lower-emphasis buttons |
| 4 | Utility | Download Catalogue; Contact; Open Canvas; Give | Utility navigation, footer, or task-specific placement |

Rules:

- **Apply** remains globally available but is not automatically the hero's primary CTA on discovery pages.
- Program pages normally progress through **Explore fit → See cost/requirements → Request information or Apply**.
- Campaign parameters and program context persist into inquiry/application handoffs where privacy and destination systems allow.
- Use specific verb-first labels; avoid `Learn More`, `Click Here`, and unexplained `Submit`.
- Never show a primary CTA that leads to a placeholder, missing program, or unverified application path.
- A sticky mobile CTA must match the current page's primary action, not default universally to Apply.

## Footer architecture

The footer provides durable secondary access, institutional identity, and required information. It does not repeat every mega-menu item.

### Find your path

- Program Finder
- Undergraduate Programs
- Graduate Programs
- Online Programs
- Elements Gap Year
- Certificates & Ministry Training

### Admissions & affordability

- Admissions
- Requirements
- International Students
- Cost of Attendance
- Scholarships & Financial Aid
- Request Information
- Apply

### Experience Kingswood

- Student Life
- Residence
- Spiritual Life & Chapel
- Athletics & Recreation
- Dining
- Visit Campus
- Events

### University

- Mission & Beliefs
- Accreditation
- Leadership
- Outcomes
- News
- Work at Kingswood
- Contact

### Resources

- Current Students
- Faculty & Staff
- Alumni & Friends
- Catalogue
- Academic Calendar
- Library
- Campus Directory
- Give

### Footer base

Include the Kingswood University wordmark, full campus address, main telephone and enrollment contact, social links, charitable/institutional identifiers where required, copyright, Privacy, Accessibility, Terms/Policies, and a consent-preferences control. Telephone and email links must be actionable on mobile.

## Mobile menu behaviour

The current proof-of-concept menu is a useful accessibility starting point but its business-only anchors must be replaced by the university architecture.

1. A labelled **Menu** button exposes a full-height navigation panel below or over the header. The button uses `aria-expanded` and references the panel with `aria-controls`.
2. The panel begins with Search, then the five primary sections as accordions. Only one accordion needs to be open at a time; users may always navigate directly to the section landing page.
3. Each accordion trigger is separate from its section landing link so expanding never unexpectedly navigates.
4. First-level items remain visible without opening every accordion. Do not reproduce a desktop mega menu at unreadable scale.
5. Apply is the persistent high-emphasis action. Request Information and Visit appear alongside it without creating three equal-width, permanently sticky buttons.
6. Current Students, Faculty & Staff, Alumni & Friends, and Give appear in a lower utility group.
7. Opening the menu moves focus to the panel or first meaningful control, locks background scroll, and prevents background content from receiving focus.
8. Escape and the close control dismiss the panel and return focus to the original Menu button. Route changes also close it.
9. Focus is contained while the modal-style panel is open. Screen readers receive an appropriate dialog/navigation label.
10. A program-page sticky CTA respects `env(safe-area-inset-bottom)`, allows zoom, and does not obscure form controls or content.
11. Touch targets are at least 44 by 44 pixels; text is at least 16 pixels; no essential interaction depends on hover or horizontal swiping.
12. Search results and Ask Kingswood are distinct: Search retrieves site content; Ask Kingswood provides sourced guidance with limitations and human handoff.

## Homepage transition requirement

The implemented School of Business homepage is a design reference, not the final university homepage. Its typography, deep blue palette, proof-led sections, program cards, mobile actions, and concise calls to action can inform the shared design system. Before it becomes part of the university build:

- replace business-only header anchors with the global navigation above;
- move Business Management, Sports & Recreation Management, MBA, and Organizational Leadership into structured program records;
- replace `University home` links that leave the experience with canonical internal routes;
- apply the common footer and breadcrumb rules;
- retain business-specific storytelling only on program records or the optional Business collection page;
- ensure related programs make cross-discipline discovery possible.

## Implementation order

1. Approve navigation labels and route ownership with Admissions, Academic Affairs, Student Life, and Communications.
2. Build the URL/content inventory and map every current WordPress navigation and footer destination.
3. Create structured program, person, fact, event, story, and policy records in the CMS.
4. Implement the shared header, mobile menu, breadcrumb, CTA, and footer components.
5. Build program finder and canonical program template; migrate School of Business content into that system.
6. Build Admissions & Aid, Visit, Experience, Outcomes, and About landing templates.
7. Migrate Wave 1 content, implement redirects, and verify analytics, accessibility, search, and external handoffs.
8. Test priority mobile tasks with prospective students, parents, online/graduate learners, and staff before switching the primary domain.

## Acceptance criteria

- A prospective student can find a relevant program, cost information, requirements, visit options, and a next step in no more than three purposeful navigation decisions.
- School of Business pages retain the university header, footer, URL system, program records, analytics, and enrollment actions.
- Every current top-navigation and footer destination has a documented keep, merge, rewrite, archive, or redirect decision.
- Keyboard and screen-reader users can open, navigate, and close every menu and reach all actions.
- Breadcrumbs, canonical URLs, metadata, structured data, and redirect targets agree.
- Each published route has an accountable owner and current verification date.
- No internal system, expired event, operational form, or institutional utility competes with prospective-student primary navigation.
