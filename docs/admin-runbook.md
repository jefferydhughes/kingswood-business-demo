# Kingswood website administration runbook

This guide is for Kingswood staff who will maintain the public website. It separates what staff can do today from the planned Payload CMS workflow so that planned controls are not mistaken for live features.

## At a glance

| Capability | Current demo | Planned production CMS |
|---|---|---|
| Public website | Available | Available |
| Staff editing screen | Not available | `/admin` |
| Draft and preview | Developer workflow only | Staff workflow |
| Scheduled publishing or expiry | Not available | Staff workflow with approval |
| Media library | Code repository assets | CMS media library |
| Form delivery to Salesforce | Technical integration foundation; verify per environment | Monitored staff workflow |
| Rollback | Developer restores a Git/Vercel version | Editor restores content version; developer restores application release |

## 1. What staff can do today

The current site is **code-managed**. There is no staff CMS login yet. Page copy, navigation, calls to action, program information, and images are changed in the GitHub repository and deployed through Vercel.

Until the CMS launches:

1. Send a change request to the designated website owner.
2. Include the page URL, exact replacement text, desired image, deadline, and the person who approved the facts.
3. A developer makes the change on a short-lived branch and opens a pull request.
4. The content owner reviews the Vercel preview link.
5. An authorized reviewer approves the pull request; merging it deploys the change to production.
6. Check the public URL after deployment and report any problem immediately.

Do not expect `/admin`, CMS passwords, staff-managed scheduling, or content rollback to work before the Payload CMS milestone is completed and announced.

## 2. Planned Payload CMS access

After launch, authorized staff will use:

- **Admin URL:** `https://<production-domain>/admin`
- **Preview environment:** supplied during training; never enter real applicant or student data there
- **Authentication for Phase 1:** Payload's built-in staff authentication. Institutional SSO is a later enhancement only after an identity-owner and integration are approved.

### First login

1. Open the official `/admin` address from a saved Kingswood bookmark.
2. Enter the staff credentials created through the approved administrator onboarding process.
3. Complete any additional verification configured for the CMS.
4. Confirm that your name and assigned role are correct.
5. Do not share accounts, passwords, authentication codes, or login links.
6. If access or permissions are wrong, stop and contact the CMS administrator.

Administrative access must be requested by a manager and approved by the system owner. Access is removed when a staff member changes responsibilities or leaves Kingswood.

## 3. Roles and responsibilities

| Role | Normal responsibility | Cannot do alone |
|---|---|---|
| Contributor | Create and revise assigned drafts | Publish |
| Program owner | Verify assigned program facts and approve drafts | Change unrelated programs or system settings |
| Admissions editor | Maintain admissions, dates, costs, and form content | Change integration credentials |
| Marketing editor | Maintain campaigns, stories, and landing pages | Change technical configuration |
| Accessibility reviewer | Review and block inaccessible content | Publish unapproved facts |
| Publisher | Complete final review and publish approved content | Bypass required two-person review |
| Administrator | Manage users, roles, workflow, and CMS configuration | Use unrestricted access for routine editing |
| Auditor | Review versions and activity logs | Edit or publish |

Tuition, fees, deadlines, admission requirements, accreditation, policy, and AI instructions require two-person review. The person entering the change should not be its only approver.

## 4. Editing a page or program

1. Sign in and open **Pages**, **Programs**, or the relevant content collection.
2. Search by title or public URL; do not create a duplicate because an item is difficult to find.
3. Select **Create new version** or edit the existing draft.
4. Update only the fields you own. Keep headings descriptive and links meaningful.
5. Confirm mobile call-to-action labels and destinations.
6. Add an internal change note: what changed, why, source, approver, and effective date.
7. Save as **Draft**.
8. Use **Preview** at mobile and desktop widths.
9. Submit the draft to the appropriate program/content owner and accessibility reviewer.
10. A Publisher completes the final checklist and publishes it.

Never paste confidential applicant, donor, employee, or student information into a public page or an AI writing tool.

### Content checks before approval

- Facts match the official source and have a named owner.
- Dates, prices, requirements, credentials, delivery modes, and contact details are current.
- The page has one clear primary action appropriate to its audience.
- Heading levels are logical; avoid using headings only for visual size.
- Link text describes the destination; avoid “click here.”
- Images have useful alternative text, or are marked decorative when appropriate.
- Uploaded files have accessible content and descriptive filenames.
- Mobile preview has no clipped text, unreadable type, or obstructed action.
- Search title, description, canonical URL, and redirect needs have been reviewed.

## 5. Media library

Use approved Kingswood photography and brand assets only.

1. Search before uploading to avoid duplicates.
2. Use a descriptive filename, such as `business-students-team-project-2026.jpg`.
3. Add alternative text that communicates the image's purpose; do not begin with “image of.”
4. Add photographer/source, usage permission, subject consent where required, and an expiry date if rights are time-limited.
5. Crop around the important subject and inspect the mobile crop before publishing.
6. Never upload raw camera sets, private documents, screenshots containing personal data, or unlicensed imagery.
7. Do not alter the approved logo, create alternate reds, or introduce pink into the brand system. Follow `docs/brand-guide.md`.

Replacing an image in the library may affect multiple pages. Check its usage list before replacing or deleting it.

## 6. Preview, publishing, and expiry

### Preview

Preview links may expose unpublished information. Share them only with authorized reviewers, and never post them publicly. A preview approval does not publish the page.

### Publish now

The Publisher confirms content approval, accessibility review, mobile preview, links/forms, metadata, and any redirect. After publishing, check the live page in a private browser window and record completion in the change ticket.

### Schedule publication

Use a scheduled start only when the date, time zone, and owner are confirmed. The CMS should display dates in Kingswood's approved local time zone. A Publisher must review scheduled content before it enters the queue.

### Schedule expiry

Campaigns, notices, events, deadlines, temporary alerts, and time-limited media should have an expiry action. Choose one approved result:

- remove the component from the page;
- unpublish the page and redirect it to a current destination; or
- replace it with an approved evergreen message.

Assign an owner and test the post-expiry destination. Do not allow expired pages to become unexplained 404 errors. Staff should review items expiring in the next 30 days each week.

## 7. Forms and Salesforce CRM

Public forms should collect only the information necessary for the stated purpose. Staff may update approved labels, help text, confirmation messages, consent language, and routing choices within their permissions.

Before publishing a form change:

1. Submit a test record using clearly marked test data.
2. Confirm the visitor sees the correct success message or next step.
3. Confirm the submission reaches the expected Salesforce object, campaign, owner, and notification route.
4. Confirm consent source, wording/version, and timestamp are recorded.
5. Confirm a repeat submission does not create uncontrolled duplicates.
6. Remove test records according to the agreed CRM procedure.

Never export or email lead lists for convenience. Access form submissions only through approved systems. Report missing submissions, spam spikes, duplicate creation, exposed personal data, or broken consent recording as incidents.

Integration mappings, credentials, webhooks, API permissions, retry queues, and Salesforce automation are developer/CRM-administrator tasks. See `docs/integrations/salesforce-mapping.md`.

## 8. Rollback and recovery

### Incorrect content, site otherwise healthy

1. Unpublish urgent harmful or materially inaccurate content if your role permits.
2. Open the content item's version history.
3. Compare the previous approved version; do not overwrite evidence of the change.
4. Restore it as a new draft, obtain the required approval, and publish.
5. Record what happened and whether other pages reuse the same content.

### Application defect or widespread outage

1. Stop publishing new changes.
2. Capture the URL, time, device/browser, screenshot, and exact action that failed.
3. Contact the technical incident lead.
4. A developer decides whether to roll back the Vercel deployment, disable a feature, or repair forward.
5. Do not change DNS, environment variables, integrations, or deployment settings unless assigned to the incident team.

Content rollback and application rollback are different. Restoring a CMS page does not restore code; restoring a Vercel deployment does not necessarily reverse database content.

## 9. Incident contacts and severity

Replace the placeholders below with named primary and backup contacts before launch, then review them each term.

| Issue | First contact | Backup/escalation |
|---|---|---|
| Wrong public fact or expired notice | `[Content owner]` | `[Publisher/Marketing lead]` |
| Admission, tuition, or deadline error | `[Admissions owner]` | `[Executive approver]` |
| Cannot sign in or wrong permissions | `[CMS administrator]` | `[IT identity administrator]` |
| Form or Salesforce delivery failure | `[CRM administrator]` | `[Technical lead]` |
| Site outage, broken layout, deployment | `[Technical lead]` | `[Hosting/development partner]` |
| Privacy or exposed personal information | `[Privacy officer]` | `[Executive incident lead]` |
| Accessibility barrier | `[Accessibility owner]` | `[Content/technical lead]` |
| Security concern or suspicious access | `[IT security contact]` | `[Executive incident lead]` |

Treat a site outage, security/privacy concern, broken application or inquiry form, or materially wrong tuition/admissions information as urgent. Do not include passwords, authentication codes, or unnecessary personal information in an incident ticket.

## 10. Developer-only tasks

Content staff should not perform the following unless separately trained and assigned:

- change code, CMS schemas, validation rules, components, or design tokens;
- modify domain/DNS, Vercel, GitHub, database, storage, or environment settings;
- install plugins or dependencies;
- change authentication providers, roles, or permission logic;
- edit API keys, secrets, Salesforce mappings, webhooks, queues, or email configuration;
- run content/database migrations or restore backups;
- create redirects in bulk or delete collections/media permanently;
- change analytics, consent, security headers, rate limits, or AI system instructions;
- promote, roll back, or delete deployments.

Request these through the technical change process, including impact, owner, approval, test plan, rollback plan, and desired date.

## 11. Pre-launch checklist

- [ ] Production `/admin` URL and official bookmark are confirmed.
- [ ] Institutional sign-in and MFA work for every role.
- [ ] Named primary and backup administrators are recorded.
- [ ] Role permissions and two-person approvals are tested with real role accounts.
- [ ] Departing-user and emergency access-removal procedures are tested.
- [ ] Draft, preview, publish, scheduled publish, and scheduled expiry are tested.
- [ ] Version history and both content/application rollback exercises succeed.
- [ ] Media permissions, alt text, focal crops, and rights expiry are tested.
- [ ] Priority WordPress content owners sign off migrated pages.
- [ ] Redirect map, search metadata, analytics, and 404 monitoring are verified.
- [ ] Inquiry and visit forms are tested end to end into Salesforce.
- [ ] Consent wording/version and retention rules are approved.
- [ ] Backups and restore procedure are tested, not merely documented.
- [ ] Incident contacts and after-hours escalation details are complete.
- [ ] Accessibility, privacy, security, performance, and mobile acceptance gates pass.
- [ ] A content freeze and launch-day publishing authority are communicated.

## 12. First-day staff training checklist

- [ ] Sign in through `/admin` and complete MFA.
- [ ] Identify your role, owned collections, approver, and support contact.
- [ ] Find an existing page by title and URL without creating a duplicate.
- [ ] Create and save a practice draft.
- [ ] Add a change note and submit the draft for review.
- [ ] Upload an approved practice image with source, rights, and alternative text.
- [ ] Preview the page on mobile and desktop.
- [ ] Check headings, links, calls to action, metadata, and accessibility fields.
- [ ] Practise scheduling and cancelling a publication/expiry in the training environment.
- [ ] Review version history and restore a prior practice version as a draft.
- [ ] Complete a test form and confirm its Salesforce destination.
- [ ] Locate the incident contacts and explain when an issue is urgent.
- [ ] Identify developer-only tasks and the technical change-request route.
- [ ] Sign out and confirm that the admin page no longer exposes the session.

## 13. Routine operating rhythm

- **Daily:** review urgent corrections, failed form/integration alerts, and scheduled releases.
- **Weekly:** review upcoming expiries, broken links, 404s, form delivery, and stale priority content.
- **Monthly:** audit high-conversion journeys, user access, accessibility issues, media rights, and page ownership.
- **Each term:** recertify users/roles, incident contacts, tuition/dates/requirements, training needs, and recovery readiness.
- **Annually:** review the entire information architecture, retention rules, integrations, vendor access, and this runbook.

The CMS reduces routine dependence on developers; it does not remove content ownership, factual approval, accessibility review, security controls, or operational accountability.
