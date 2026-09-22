# Kingswood digital platform schema

## Principles

Store facts once; separate facts from narrative; assign every critical record an owner/source/review date; model programs, delivery, audiences, outcomes, costs, and deadlines independently; separate CMS, recruitment, analytics, identity, and AI security domains.

## CMS collections

### Programs

| Field | Type / purpose |
|---|---|
| id | UUID |
| title, slug | Unique public identity |
| status | draft, review, published, paused, archived |
| study_level | undergraduate, graduate, certificate, gap-year |
| credential | Relation |
| delivery_modes | campus, online, hybrid |
| areas_of_interest | Controlled relations |
| career_paths, calling_contexts | Controlled relations |
| short_value_proposition | Card and metadata copy |
| overview, is_this_for_me | Structured content |
| skills, outcomes | Sourced relations |
| curriculum_summary, curriculum_url | Summary plus authority link |
| duration, credits, intakes | Structured facts |
| requirements, cost_profile | Shared relations |
| faculty, stories, faqs | Reusable relations |
| primary_cta, secondary_cta | CTA relations |
| seo | Title, description, image, canonical |
| owner_id, source_url | Governance |
| last_verified_at, review_due_at | Governance |

Supporting collections:

- pages
- people
- stories with consent/expiry
- outcomes with source year and scope
- cost profiles by academic year
- financial-aid items
- requirements by program/level/geography
- deadlines and intakes
- events and visits
- locations
- FAQs
- calls to action
- navigation sets
- interests/careers/callings/skills/delivery/audience taxonomies
- redirects
- notices
- media with alt text/transcript/rights/focal point
- global settings

## Approved content blocks

Hero, proof/statistics, program cards, story/testimonial, outcomes, faculty, cost, requirements/deadlines, FAQ, events, accessible image/video, responsive comparison, rich text, CTA, form, and AI prompt entry.

Validation prevents arbitrary HTML, broken heading hierarchy, missing image disposition, or inaccessible brand combinations.

## Recruitment data

### Prospects

Minimum fields: ID; normalized email; optional phone; progressively collected name; geography; level; program interests; delivery; intended start; declared persona; first/latest source; granular consent/version/time; CRM external ID; timestamps.

### Inquiries

Prospect, program/context, question, page/campaign source, status, assigned staff, CRM sync status, created time.

Anonymous comparisons use browser storage. Server saves require consent plus account or secure emailed link. The CRM becomes the durable prospect source after successful synchronization.

## AI data

### Knowledge sources

Canonical location, title, audience, owner, approval, classification, effective/expiry dates, review date, allowed use cases, checksum/version.

### Knowledge chunks

Source/version, heading path, text, metadata, embedding, token count, dates.

### Conversations/messages

Pseudonymous identity; assistant; model/policy version; consent/classification; retention; role/content or redaction; retrieved sources; citations; safety flags; feedback; handoff; latency/cost.

### Evaluation cases/runs

Use case, input, expected facts/sources, forbidden claims, risk, rubric and version; then model/prompt/retrieval/knowledge versions, scores, reviewer, and release decision.

## Data boundaries

| Domain | Examples | Access |
|---|---|---|
| Public | Published programs/pages/events | Anonymous read |
| Editorial | Drafts/versions/schedules | CMS roles |
| Recruitment | Leads/consent/attribution | Admissions only |
| Academic | Courses/rosters/activity | Entitled student/faculty |
| AI operations | Policies/traces/evaluations | Restricted operators |
| Restricted | Counselling, disability, discipline, identity documents | Excluded from initial AI |

## API rules

Version APIs; validate with shared types; use idempotency keys; audit publish/role/consent/export/policy changes; archive governed content rather than silently deleting; cache only public content; use UTC storage; protect private responses from caching.

