# Authentication, authorization, and privacy

## Identity strategy

The public site works without login. Add identity only when it creates clear value.

1. Anonymous visitor: browse, compare locally, use public assistant, submit forms.
2. Prospect: optional magic link for saved plans and events.
3. Student/faculty/staff: institutional SSO.
4. CMS editor: SSO plus collection roles.
5. Administrator: SSO, MFA, least privilege, elevated-action audit.
6. Service identity: narrowly scoped integration credentials.

Do not create parallel student identity if an institutional provider exists. Confirm Microsoft Entra, Google Workspace, or other IdP.

## Flows

- Inquiry: no account; server validation, rate limiting, bot protection, consent, idempotent CRM sync.
- Save/return: prefer short-lived, single-use email magic link before full prospect accounts.
- CMS: OIDC/SAML SSO → MFA → group mapping → short session → record permission.
- Student/faculty AI: SSO → LMS/SIS entitlement → classification/policy check → AI gateway.

## Roles

| Role | Permission |
|---|---|
| Contributor | Assigned drafts only |
| Program owner | Approve assigned program facts |
| Admissions editor | Admissions, dates, costs, forms |
| Marketing editor | Campaigns, stories, landing pages |
| Accessibility reviewer | Review/block accessibility defects |
| Publisher | Publish approved content |
| AI steward | Approve sources by assistant |
| AI evaluator | Evaluate; no production-secret access |
| Administrator | Configuration and roles |
| Auditor | Read logs/versions |

Tuition, deadlines, requirements, accreditation, policy, and AI system instructions require two-person review.

## Record-level controls

Anonymous users read only published/effective records. Contributors edit only assigned content. Program owners approve only their programs. Admissions accesses leads only as required. Faculty tutors use approved courses. Students access their own conversations and entitled courses. Services receive table/action/environment-scoped credentials.

## Security

MFA; server-only secrets; encryption; endpoint rate limits; CSRF, secure cookies, strict CORS/CSP; dependency/secret/code scans; synthetic data in previews; separate environments; immutable audits; incident/key-rotation/backup plans.

## Privacy

Collect minimum necessary data; use granular plain-language consent; store consent text/version/time; support withdrawal and requests; define retention; never use recruitment/student data to train public models; exclude sensitive text/identifiers from analytics; complete Canadian/provincial institutional review.

## AI classification

| Class | Example | Initial cloud use |
|---|---|---|
| Public | Published programs/policies | Approved gateway |
| Internal | Non-personal internal procedures | Approved vendors/use cases |
| Confidential | Prospect/student data, strategy | Not initial services |
| Restricted | Counselling, disability, discipline, finance/identity | Prohibited |

The gateway must block policy violations, not merely warn.

## Verification

Threat model; role/RLS/API tests; OWASP-aligned testing; prompt injection, exfiltration, impersonation, spam, and cost-abuse tests; backup restoration; incident tabletop; vendor/data-processing review.

