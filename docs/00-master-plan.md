# Kingswood University Digital Enrollment Platform

## Master plan and implementation brief

**Status:** Proposed for approval  
**Date:** September 22, 2026  
**Decision gate:** Do not begin implementation until Kingswood approves the direction, platform assumptions, and Phase 1 scope.

## Executive recommendation

Kingswood should not replace WordPress with another digital brochure. It should build an enrollment platform that helps each visitor answer four questions quickly:

1. Is Kingswood for someone like me?
2. Which program fits my calling and goals?
3. Can I afford it and make it work?
4. What is the easiest useful next step?

The platform has two connected products:

- **Public enrollment site:** fast, accessible, mobile-first, search-friendly, and organized around student decisions rather than internal departments.
- **Kingswood Compass:** a governed AI layer for prospective-student guidance, program matching, course tutoring, faculty tools, accessible-content support, and institutional knowledge.

Recommended foundation: **Next.js + TypeScript + Payload CMS + PostgreSQL**, deployed with a CDN and image optimization. Payload provides nontechnical staff with structured editing, drafts, versions, preview, reusable content, permissions, and approvals while preserving a fast custom site. Supabase can provide managed PostgreSQL, storage, vector search, and selected authentication services.

## Outcomes and acceptance criteria

North-star outcome: more qualified prospective students progress from discovery to a meaningful admissions action.

Primary conversions:

- Start an application
- Submit a short request-information form
- Book a visit or admissions conversation
- Download/save a program guide with consent for follow-up

Supporting conversions include completing program match, viewing cost/aid, comparing programs, registering for an event, and asking a grounded question.

| Area | Acceptance threshold |
|---|---|
| Find a relevant program | At least 90% task success in moderated testing |
| Reach a correct next step | At least 90% task success; no critical dead ends |
| Mobile speed | Core Web Vitals “good” at p75; target LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 |
| Accessibility | WCAG 2.2 AA target; automated plus manual keyboard/screen-reader review |
| Content accuracy | 100% of critical facts have an owner and review date |
| AI groundedness | ≥95% supported-answer rate on approved admissions evaluation cases |
| Privacy | No sensitive student data in the public AI assistant |
| Analytics | Full funnel and attribution events verified before launch |

Kingswood must capture its current analytics baseline before setting inquiry, application, or enrollment-lift targets.

## Research synthesis

- Program discovery is a core site job. Purdue Fort Wayne reports its program finder is its most-visited area after the homepage.
- Strong mobile program finders support search, interest filters, outcomes, authentic imagery, and short comparison paths.
- Calls to action belong where intent is highest. A published university CRO case reported major gains after raising homepage CTA visibility and adding end-of-page program CTAs.
- Personalization requires structured content and should start with declared choices such as on-campus, online, parent, or graduate—not covert profiling.
- UF NaviGator is a service platform rather than a chatbot. It includes model access, department assistants, tutoring, analytics, alt-text, feedback analysis, and prompt support.
- UF distinguishes locally hosted sensitive-data uses from cloud uses. Kingswood needs an equivalent policy boundary even if it starts with approved cloud vendors.

Kingswood already communicates Christian formation, community, faculty access, affordability, and campus life. Its primary weaknesses are page-based duplication, inconsistent program detail/CTAs, weak goal-led discovery, limited visitor context, stale legacy content, and no strong foundation for personalization, experiments, or AI grounding.

## Audiences and ethical personalization

The site should never force persona selection. It should offer optional shortcuts and remember only consented preferences.

| Audience | Core question | Best first action |
|---|---|---|
| On-campus undergraduate | What can I study and will I belong? | Explore by interest/calling |
| Ministry student | How will this prepare me for ministry? | Explore ministry outcomes and formation |
| Business/sport student | Will this prepare me for meaningful work? | View applied experiences and careers |
| Online learner | Can this fit my life? | Filter by delivery and time |
| MBA prospect | Is it credible, practical, affordable, flexible? | View format, investment, outcomes |
| Counselling prospect | Does it lead toward my professional goal? | View requirements and pathway |
| Elements prospect | What would the year be like? | Explore experience, credits, cost |
| Parent—value | What will it cost and lead to? | Cost, aid, outcomes |
| Parent—faith | Who will my student become? | Formation, community, mentorship |
| Parent—support | Will my student be known and safe? | Housing, support, family visit |
| Parent—logistics | How do travel, dates, residence, payments work? | Planning checklist |
| International | Am I eligible and what is required? | Country-aware checklist |

Gender must not alter academic recommendations. Testing should balance male/female representation and evaluate imagery, language, examples, and pathways for equitable welcome.

## Information architecture

Primary navigation:

1. Programs
2. Admissions & Aid
3. Experience Kingswood
4. Outcomes
5. About

Persistent utilities: Search/Ask Kingswood, Visit, Request Information, Apply, Current Students.

Proposed routes:

    /
    /programs
    /program-finder
    /compare
    /programs/[slug]
    /admissions/{undergraduate,graduate,online,international,requirements,deadlines,apply}
    /costs-aid/{cost-of-attendance,scholarships,financial-aid,cost-planner}
    /visit/{campus,virtual-tour,events}
    /student-life/{residence,spiritual-life,athletics,support,sussex-new-brunswick}
    /outcomes/{careers-and-calling,student-stories,graduate-stories}
    /parents
    /about/{mission-and-beliefs,faculty,accreditation,leadership,contact}
    /news
    /events
    /search
    /ask

Current-student systems, employee resources, catalogue, policies, alumni, and donor content remain in a compact utility layer and do not compete with recruitment navigation.

## Page system

### Homepage

Mobile order:

1. One promise: personal, practical, purpose-driven Christian education.
2. Find Your Program and Plan a Visit.
3. Optional intent chips.
4. Program-match prompt requiring no login.
5. Proof: outcomes, faculty access, affordability, accreditation.
6. Real story matched to declared intent.
7. Campus and online pathways.
8. Cost/aid reassurance.
9. Low-friction inquiry.

Avoid autoplay above the fold, rotating carousels, long institutional copy, and many equal-weight buttons.

### Program finder

Filter by interest/calling, credential, level, delivery, career/ministry goal, and time commitment. Cards show credential, delivery, duration, value proposition, and View Program. Comparison works without login.

### Program page

Outcome-led title; key facts; sticky mobile CTA; “Is this for me?”; skills/careers/ministry contexts; applied experiences; curriculum; faculty/story proof; cost/aid; requirements/dates; FAQs; related programs; final CTA. Facts render from shared records rather than repeated page text.

### Inquiry

Use progressive profiling. Step 1 asks email/mobile, interest, and intended start. Gather more after submission or later. Carry program/campaign context automatically.

## Mobile-first system

- Approve 360–430 px layouts before desktop.
- Minimum 44×44 px targets; one primary action per section.
- Sticky bottom CTA on program/admissions pages.
- No essential hover content.
- At least 16 px body text with comfortable line height.
- Responsive media; no decorative mobile autoplay.
- Correct keyboard modes, autocomplete, inline validation, and save/resume where justified.
- Reduced motion, contrast, focus, keyboard, screen-reader, captions, and transcripts.
- CMS blocks enforce heading, alt-text, and contrast rules.

## Platform

| Layer | Recommendation |
|---|---|
| Web | Next.js, TypeScript, React Server Components |
| CMS | Payload CMS |
| Data | Managed PostgreSQL with pgvector |
| Auth | Institutional SSO; separate prospect auth only if justified |
| Search | PostgreSQL search initially; Algolia/Typesense if needed |
| Media | Object storage with image transformation |
| Forms | Server-validated forms with CRM adapter |
| AI | Provider-neutral gateway, RAG, evaluations |
| Analytics | Consent-aware product analytics and server events |
| Deploy | Vercel or equivalent with preview/rollback |

CMS requirements: role dashboards, guided program editor, live mobile preview, reusable tuition/date/faculty/outcome facts, draft-review-publish, scheduled expiry, versions, broken-link/accessibility checks, and owner/review dates.

## Content migration

Classify each current URL: Keep/improve, Merge, Rewrite, Archive, or Redirect. Do not perform a page-for-page copy. Turn programs, faculty, costs, dates, stories, FAQs, events, and policies into structured records. Auto-import to drafts only; named owners verify all facts.

Priority: programs; admissions/apply; costs/aid; student life/support; faculty/accreditation/outcomes; Elements/MBA/counselling/online/international; visits/contact; policies/catalogue/news/events. Every valuable old URL receives an approved redirect.

## Measurement

Track program search/filter/view/compare, cost view, quiz start/complete, inquiry start/submit, visit start/book, application click/start/complete where supported, AI question/handoff, and errors. Include program, delivery, declared intent, campaign, device, and consent state; exclude sensitive free text.

Experiment order: CTA placement/language, program hero/proof order, inquiry steps, cost display, program-match prompt, parent/online journeys, then personalization.

## Synthetic 100-visitor design test

This is a scenario simulation of the architecture—not 100 recruited people and not a forecast of enrollment conversion. Each case had a goal, device, knowledge level, concern, and expected action.

| Segment | Count |
|---|---:|
| Ministry undergraduate | 12 |
| Business/sport undergraduate | 12 |
| Undecided undergraduate | 8 |
| Elements | 8 |
| Online | 10 |
| MBA | 8 |
| Counselling graduate | 8 |
| International | 8 |
| Four parent personas, five each | 20 |
| Current/community/referral | 6 |
| **Total** | **100** |

Student cases were balanced 50/50 male/female. Parent cases varied in role, geography, digital confidence, and first-generation experience. Seventy cases used mobile constraints.

### Round 1: 76/100 heuristic task success

Failures: degree categories did not help undecided users; parent answers were scattered; graduate/online users entered undergraduate paths; international information was detached from program and cost; Apply appeared before adequate proof; AI lacked visible source and handoff.

Revisions: added interest/calling/career filters; parent hub; persistent level/delivery context; program-level international panels; proof → fit → cost → requirements → action sequence; save/compare/inquiry before Apply; AI citations, review dates, limits, and counsellor handoff.

### Round 2: 91/100 heuristic task success; zero critical dead ends

Risks remaining: credential vocabulary needs human validation; cost requires verified data; counselling/international eligibility language needs approval; parents require real tests; program match must explain recommendations and never claim guaranteed admission or calling.

The plan passes a **planning threshold**, not a launch threshold. Test the prototype with 8–12 prospects, 4–6 parents, 3–5 international/online learners, admissions, and an accessibility-focused tester. Revise until ≥90% priority tasks succeed without moderator rescue and no segment trails the total by more than 10 points.

## Governance

Required owners: executive sponsor, product owner, web/CMS owner, admissions owner, academic owners, marketing owner, privacy/security owner, and AI governance group.

Review tuition/requirements/dates and programs each term; faculty twice yearly; sourced outcomes annually; policies by owner; news/events auto-expire.

## Decisions before build

1. Confirm the target repository and stack.
2. Approve or challenge Next.js + Payload + PostgreSQL.
3. Name application, CRM, SIS, LMS, email, identity, analytics, and payment systems.
4. Confirm sources of truth.
5. Approve Phase 1 audiences and conversions.
6. Assign content, security/privacy, accessibility, and AI owners.
7. Approve the Compass pilot boundary.
8. Confirm hosting/data-residency/vendor requirements.

## Phase 1 definition of done

Enrollment homepage/navigation; structured program finder/pages; admissions, cost/aid, visit, parents, international; short integrated forms; staff CMS; search/redirects/analytics/consent; accessibility/performance verification; limited grounded Ask Kingswood; and an optimization baseline.

## Evidence base

Current Kingswood public pages; UF official NaviGator descriptions; Purdue Fort Wayne digital strategy; current program-finder examples; a published university CRO case; the supplied research note; and the Skill Samurai Academy repository patterns.
