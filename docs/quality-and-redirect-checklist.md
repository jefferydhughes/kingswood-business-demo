# Quality and redirect release checklist

Status: required release gate for every migrated template, content wave, and production launch.

## Purpose

This checklist turns the WordPress migration definition of done into repeatable, testable acceptance criteria. A page or migration wave may not ship with an unresolved **Blocker** or **Critical** defect. Exceptions require a named owner, documented rationale, approved remediation date, and explicit approval from the product owner.

## Evidence and severity

Record each result as **Pass, Fail, Not applicable, or Blocked**, with the tester, date, environment, viewport/device, and evidence link. Screenshots alone are insufficient for redirects, form delivery, analytics, or assistive-technology checks; retain the response, event, submission, or test record as appropriate.

| Severity | Meaning | Release rule |
| --- | --- | --- |
| Blocker | Prevents a primary task, exposes sensitive data, corrupts data, or makes the site unavailable | No release |
| Critical | Breaks accessibility, enrollment conversion, search migration, form delivery, or a key mobile journey | No release |
| Major | Materially degrades comprehension, trust, performance, or a secondary task | Fix before release unless an exception is approved |
| Minor | Cosmetic or low-impact defect | May enter the backlog with an owner |

## 1. High-level page and template acceptance

Apply these checks to the homepage, Academics, Admissions, Student Life, About, program, service/utility, news, and event templates. Test at least one short, one typical, and one content-heavy record for each template.

| Test | Pass criterion | Failure severity |
| --- | --- | --- |
| Page purpose | The page title, opening content, and primary action make the intended audience and task understandable without relying on navigation context | Major |
| Content structure | Exactly one visible `h1`; headings are sequential and describe their sections; no heading is used only for visual styling | Critical |
| Required fields | The template prevents publication when required title, owner, review date, SEO title/description, primary CTA, or template-specific facts are missing | Critical |
| Structured program facts | Credential, delivery, duration, location, admissions route, and program status are rendered from structured fields and match the approved source | Critical |
| CTA hierarchy | Each decision area has at most one red primary action; labels state the destination or outcome; Apply, Visit, Request Information, and external-system handoffs reach the correct destination | Critical |
| Navigation context | Breadcrumbs, active navigation, and back/related paths identify where the page sits in the university architecture | Major |
| Long and missing content | Long titles, long words, missing optional fields, zero/many related items, and expired records do not break layout or expose placeholder text | Major |
| Media | Images preserve aspect ratio, have meaningful alternative text or are marked decorative, avoid embedded essential text, and use the correct responsive crop | Critical |
| Downloads and external links | File type/size and external destination are clear where useful; every link returns the intended current resource | Major |
| Content provenance | High-risk facts include a named owner, authoritative source, and review date in the CMS; drafts imported from WordPress cannot publish without verification | Critical |
| Brand compliance | UI uses only deep blue `#061722`, grey `#CCCCCC`, warm neutral `#DED8D0`, Kingswood red `#972E2D`, and accessibility white; no pink or red variation appears | Major |
| Empty/error states | Search, finder, event, form, and integration empty/error states explain what happened and provide a safe next action | Major |
| Draft/preview/publish | Draft content is absent from production; preview matches the proposed page; publish/unpublish updates the public route and sitemap as intended | Critical |

## 2. Mobile, responsive, and accessibility acceptance

Test real devices where available and automated emulation at minimum widths of 320, 375, 768, 1024, and 1440 CSS pixels. Test portrait and landscape on a representative iOS and Android phone. Automated accessibility scans assist review but do not replace keyboard or screen-reader testing.

| Test | Pass criterion | Failure severity |
| --- | --- | --- |
| Reflow | At 320 CSS pixels and 400% browser zoom, content reflows without horizontal page scrolling; two-dimensional data tables may scroll within a labelled container | Critical |
| Text resizing | At 200% text size, content and controls remain visible, operable, and non-overlapping | Critical |
| Touch targets | Interactive targets meet WCAG 2.2 target-size requirements and have enough spacing to avoid accidental activation | Critical |
| Keyboard | All interactive elements are reachable and operable in a logical order with no keyboard trap; skip link works | Critical |
| Focus | Focus is visible against every background and is not fully hidden by sticky headers, dialogs, or cookie controls | Critical |
| Screen reader | Landmarks, page title, headings, control names, field instructions, status messages, menus, dialogs, and errors are announced meaningfully in VoiceOver or NVDA | Critical |
| Contrast | Text and meaningful UI components meet WCAG 2.2 AA contrast; verify token combinations and image overlays with a contrast tool | Critical |
| Forms | Every field has a programmatic label; required state, format, and errors are communicated in text and associated with the field; focus moves to an error summary after failure | Critical |
| Motion/media | Animation respects `prefers-reduced-motion`; video has captions; audio/video does not autoplay with sound | Critical |
| Orientation | Primary tasks work in portrait and landscape without requiring a specific orientation | Critical |
| Mobile navigation | Menu opens/closes by touch and keyboard, traps focus only while modal, restores focus on close, exposes current state, and does not obscure the page | Critical |
| Sticky CTAs | Sticky controls do not cover content, cookie choices, field errors, or browser zoom controls | Critical |

Release threshold: zero axe-core serious/critical violations on representative pages and zero unresolved failures in manual WCAG 2.2 AA checks.

## 3. SEO and content migration acceptance

| Test | Pass criterion | Failure severity |
| --- | --- | --- |
| Indexability | Public canonical pages return `200`, are not blocked by `robots.txt`, and do not carry `noindex`; preview, admin, search-result, and duplicate routes are excluded as intended | Critical |
| Metadata | Each indexable page has a unique, accurate title and meta description with no placeholder or truncation-prone boilerplate | Major |
| Canonical | Each indexable page declares one absolute HTTPS canonical URL pointing to the preferred production route; redirected URLs are never canonical targets | Critical |
| Sitemap | Every intended indexable canonical appears once in XML sitemap(s); redirects, errors, admin, preview, and `noindex` pages do not appear | Critical |
| Structured data | Organization, BreadcrumbList, Event, Article, and other approved schema validate with no errors and match visible content | Major |
| Social metadata | Open Graph title, description, image, and canonical URL are accurate; the image is accessible at an absolute production URL | Major |
| Language and locale | HTML language and regional content are correct; alternate-language tags are present only when equivalent localized pages exist | Major |
| Internal links | No scoped page contains a broken, redirected, staging, localhost, or legacy-domain internal link | Critical |
| Content parity | Enrollment-critical facts, high-value downloads, and approved media from the source inventory are present or have an approved disposition | Critical |
| Search-equity preservation | Every legacy URL with traffic, backlinks, conversions, or institutional value has an approved one-hop redirect to the closest relevant canonical page | Critical |

## 4. Redirect acceptance

### Redirect rules

- Use permanent redirects (`308` preferred, or `301`) for stable migrations. Temporary redirects require a documented expiry date and owner.
- Map a retired URL to the closest equivalent page. Do not send unrelated URLs to the homepage.
- Preserve meaningful query parameters only when the destination uses them. Never propagate sensitive or obsolete tracking data by default.
- Match legacy paths with and without trailing slash, and account for URL-encoded characters, capitalization behavior, historic aliases, HTTP, and `www` where those requests can reach the platform.
- A source must not redirect to another redirect. The final destination must return `200` and declare itself canonical.
- Never redirect a genuinely removed page with no relevant replacement merely to hide a `404`; return a useful `404` or `410` according to the approved disposition.

### Redirect CSV schema

Use UTF-8 CSV with a header row. Store paths beginning with `/` unless a full external origin is necessary.

| Column | Required | Allowed/example value | Purpose |
| --- | --- | --- | --- |
| `source_url` | Yes | `/admissions/cost/` | Exact legacy URL or path |
| `destination_url` | Conditional | `/admissions/tuition-and-aid` | Final canonical destination; blank only for approved `404`/`410` |
| `status_code` | Yes | `308`, `301`, `302`, `307`, `404`, `410` | Intended response |
| `match_type` | Yes | `exact`, `prefix`, `regex`, `query-aware` | How the rule matches |
| `preserve_query` | Yes | `true` or `false` | Whether approved query parameters carry forward |
| `disposition` | Yes | `keep-improve`, `merge`, `rewrite`, `archive`, `redirect`, `remove` | Migration decision |
| `content_family` | Yes | `admissions` | Inventory grouping |
| `reason` | Yes | `Merged duplicate cost pages` | Human-readable rationale |
| `owner` | Yes | `Admissions` | Accountable content owner |
| `approved_by` | Yes | Name or role | Redirect approver |
| `approved_date` | Yes | `YYYY-MM-DD` | Approval date |
| `expiry_date` | Conditional | `YYYY-MM-DD` | Required for `302`/`307`; otherwise blank |
| `traffic_priority` | Yes | `critical`, `high`, `medium`, `low` | Determines test/monitoring priority |
| `notes` | No | Free text | Edge cases or implementation notes |

Example:

```csv
source_url,destination_url,status_code,match_type,preserve_query,disposition,content_family,reason,owner,approved_by,approved_date,expiry_date,traffic_priority,notes
/admissions/cost/,/admissions/tuition-and-aid,308,exact,false,merge,admissions,Merged cost and aid journey,Admissions,VP Enrolment,2026-09-22,,critical,
```

### Redirect pass/fail checks

The complete CSV must pass an automated test before release:

- 100% of valid sources return the declared status code.
- 100% of redirect destinations resolve in one hop to `200` on the production host.
- Zero loops, chains, self-redirects, malformed URLs, duplicate/conflicting sources, or staging destinations.
- Zero redirects to an unrelated homepage or generic hub unless that hub is the approved closest replacement.
- Query strings and fragments behave according to the approved rule.
- A stratified manual sample includes every critical/high-priority URL, every regex/prefix rule, and at least 10% of medium/low exact rules.

## 5. Forms and integration acceptance

Test inquiry, visit, application handoff, newsletter, event registration, and any Salesforce-integrated form in preview and production using clearly marked test records.

| Test | Pass criterion | Failure severity |
| --- | --- | --- |
| Happy path | One valid submission produces one success state and one correctly mapped downstream record | Blocker |
| Validation | Invalid or incomplete input is not submitted; accessible inline errors preserve user-entered values | Critical |
| Duplicate protection | Repeat clicks, browser retries, and integration retries do not create unintended duplicate records | Critical |
| Field mapping | Values, consent, campaign/source, program interest, and timestamps appear in the approved Salesforce fields without truncation or silent fallback | Critical |
| Failure handling | Downstream failure does not show false success; it is logged with a correlation ID and either safely queued/retried or gives a useful recovery path | Blocker |
| Spam/rate protection | Bot and abuse controls work without blocking normal keyboard or assistive-technology use | Critical |
| Privacy/consent | Only necessary data is collected; consent wording and links are current; sensitive data is absent from URLs, analytics events, and client/server logs | Blocker |
| Notifications | Required staff/user notifications contain the correct non-sensitive details and are delivered once | Major |
| External handoff | Application/payment/authentication links clearly identify the destination, use HTTPS, and return users safely where applicable | Critical |
| Data retention | Test submissions can be identified and removed; retention and access follow the approved policy | Critical |

## 6. Analytics and conversion measurement acceptance

| Test | Pass criterion | Failure severity |
| --- | --- | --- |
| Environment isolation | Preview/development traffic is excluded from production reporting or labelled unambiguously | Critical |
| Page views | A route change produces one page-view event with the correct canonical path and title | Critical |
| Conversion events | Primary CTA, inquiry start/submit, visit start/submit, application handoff, program-finder result, download, phone, and email events use the approved event names and parameters | Critical |
| No duplicate events | One user action emits one intended event, including after client-side navigation and browser back/forward use | Critical |
| Attribution | Approved UTM/referrer values persist to conversion records without storing unnecessary personal information | Major |
| Consent | Non-essential analytics respects the approved consent state and regional/privacy requirements | Critical |
| PII exclusion | Names, email addresses, phone numbers, free-text responses, authentication data, and full sensitive URLs never enter analytics payloads | Blocker |
| Funnel reporting | Reports can segment at least by landing page, program interest, device category, campaign/source, and conversion type | Major |
| Operational alerts | A documented owner receives actionable alerts for material submission or conversion-event failure | Major |

Use browser/network inspection and the analytics debug view to verify exact payloads. A dashboard screenshot without event-level evidence is not a pass.

## 7. Performance and resilience acceptance

Measure representative production-like pages on mobile and desktop. Include the homepage, a content-heavy hub, a program page, and a form page. Use field data once available; use Lighthouse/WebPageTest lab runs before launch.

| Test | Pass criterion | Failure severity |
| --- | --- | --- |
| Core Web Vitals target | At the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 for mobile and desktop once sufficient field data exists | Major |
| Pre-launch lab gate | Mobile Lighthouse Performance score ≥ 90 on three-run median under the agreed profile, with no run below 80; Accessibility, Best Practices, and SEO ≥ 95 | Major |
| Image delivery | Responsive dimensions and modern formats are used; the LCP image is prioritized; below-fold images lazy-load; no image is materially oversized for its rendered slot | Major |
| JavaScript | No avoidable third-party script blocks the primary content; consent-blocked scripts are not downloaded before consent | Major |
| Fonts | Fonts do not hide readable text and do not cause material layout shift | Major |
| Errors | No uncaught browser error, failed first-party request, mixed content, or hydration mismatch occurs in primary journeys | Critical |
| Resilience | CMS/API/integration failure yields a safe, branded state; public cached content remains available where designed | Critical |
| Security headers | HTTPS is enforced and approved security headers are present without breaking required embeds/integrations | Critical |

Performance regression rule: investigate any change that worsens an individual Core Web Vital by more than 10% or adds more than 50 KB compressed first-party JavaScript to a representative route. Release requires either remediation or an approved, measured exception.

## 8. Pre-launch release gate

The release owner confirms all of the following:

- Production domain, HTTPS, canonical host, DNS, environment variables, CMS roles, backups, rollback, and form/integration credentials have been verified.
- The complete scoped URL inventory has an approved disposition and redirect row where required.
- Automated build, type, lint, unit/integration, accessibility, link, and redirect checks pass.
- Representative templates pass manual mobile, keyboard, screen-reader, content, analytics, and form tests.
- Sitemap and robots behavior are correct in production configuration.
- Content freeze, final WordPress export, migration delta, DNS cutover, rollback decision maker, and communication channels are documented.
- A production smoke-test script and named on-call owners exist for launch day.

## 9. Production smoke test

Run immediately after each deployment and domain cutover:

1. Confirm homepage, priority hubs, program pages, and utility pages return `200` over HTTPS on the canonical host.
2. Complete navigation, search/program finder, inquiry, visit, Apply handoff, phone/email, download, and current-student system journeys on mobile.
3. Verify a marked form submission reaches Salesforce and required notifications, then remove the test record.
4. Verify analytics page-view and conversion events without personal data.
5. Test all critical/high-priority redirects plus regex/prefix rules and a sample of remaining rules.
6. Confirm robots, sitemap, canonical, structured data, social image, 404, and 500 states.
7. Review deployment, browser, function, integration, and security logs for new errors.

Any Blocker or Critical result triggers rollback or traffic protection according to the runbook; the release owner records the decision.

## 10. Post-launch monitoring

| Window | Required review | Pass/escalation criterion |
| --- | --- | --- |
| First 2 hours | Availability, error rate, form delivery, analytics, critical redirects, security events | Escalate immediately for outage, elevated 5xx, form loss, bad canonical/robots behavior, or redirect loop |
| Daily for 14 days | Top 404s, redirect misses/chains, Salesforce failures, conversion volume, search coverage, CWV, broken links, top landing pages | Every material anomaly has a ticket, owner, severity, and due date within one business day |
| Weekly for 8 weeks | Search impressions/clicks, indexed/excluded pages, organic landing-page performance, mobile conversion, accessibility feedback, content accuracy | Investigate material decline against the documented pre-launch baseline; do not infer causation without segmentation |
| Monthly thereafter | CWV field data, conversions, 404 trends, integration health, stale/high-risk content, accessibility and security findings | Owners review dashboards and close or schedule remediation |

Retain a pre-launch baseline for organic sessions, rankings/impressions, conversions, top landing pages, form completion, 404 volume, and Core Web Vitals. Alert thresholds should be set from that baseline rather than arbitrary traffic counts. At minimum, alert on any sustained availability failure, non-zero confirmed form loss, redirect loops, and a statistically meaningful conversion or organic-landing-page decline.

## Sign-off record

Each migration wave records:

- scope and release identifier;
- production deployment and commit;
- automated test report links;
- manual test devices/browsers and evidence;
- content, accessibility, SEO, analytics, integration, and technical approvers;
- accepted exceptions with owner and remediation date;
- launch/rollback decision and timestamp;
- post-launch review dates and outcomes.
