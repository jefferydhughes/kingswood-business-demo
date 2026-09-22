# Salesforce enrollment integration

## Decision

Salesforce remains Kingswood's current recruitment system of record. The website integrates through a narrow adapter so Salesforce can later be replaced without rewriting page and form components.

## Authentication

Use a dedicated Salesforce Integration User, one External Client App or Connected App for this website, OAuth 2.0 client credentials, the Minimum Access API-only profile, and a least-privilege permission set. Never use a staff account or browser-exposed secret.

## Initial object flow

1. Website validates the inquiry and creates a server submission UUID.
2. Adapter upserts a Lead using Website_Submission_ID__c as a unique External ID.
3. Salesforce duplicate/matching rules remain active and must be tested against API submissions.
4. If a recruitment Campaign is configured, create a CampaignMember linking the Lead and Campaign.
5. Store marketing consent only after Kingswood confirms its Salesforce consent schema and CASL process.

## Minimum Lead mapping

| Website | Salesforce | Status |
|---|---|---|
| submissionId | Website_Submission_ID__c | Custom External ID required |
| givenName | FirstName | Standard |
| familyName | LastName | Standard; website fallback pending business approval |
| email | Email | Standard |
| phone | Phone | Standard |
| country | Country | Confirm State/Country Picklists |
| province | State | Confirm State/Country Picklists |
| source | LeadSource = Website | Confirm active value |
| individual prospect | Company | Confirm approved placeholder |
| program interest | Custom field | Discover existing field |
| intended start | Custom field | Discover existing field |
| delivery preference | Custom field | Discover existing field |
| first/latest attribution | Campaign/CampaignMember and/or custom fields | Discover |
| email/SMS consent | Existing privacy/consent model | Privacy review required |

## Salesforce discovery required

Export object and field metadata for Lead, Contact, Campaign, CampaignMember, and any Education Cloud recruitment objects already in use. Confirm:

- whether prospects enter as Leads, Contacts, or Education Cloud objects
- existing program-interest and start-term fields
- duplicate and matching rules
- Lead conversion automation
- Campaign and member statuses
- validation rules and required custom fields
- State/Country Picklists
- assignment rules and counsellor routing
- Account Engagement/Marketing Cloud sync
- consent, suppression, and unsubscribe objects
- sandbox credentials and API limits

Do not create parallel custom fields until this inventory is complete.

## Reliability gap before launch

The current foundation endpoint writes directly to Salesforce and fails closed when it is unavailable. Before public launch, add a durable website outbox, retry schedule, dead-letter administration, and reconciliation report so an accepted inquiry cannot be lost during a Salesforce outage.

## Privacy

Marketing consent is separate from permission to respond to an inquiry. Capture the exact policy version and timestamp. Do not send free-text questions, quiz answers, or analytics payloads into Salesforce until their purpose, visibility, retention, and consent basis are approved.
