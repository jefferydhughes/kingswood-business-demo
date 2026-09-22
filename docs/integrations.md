# Integration architecture

## Principle

Use typed adapters, webhooks, retries, and an audit queue. Do not hard-code institutional vendors into pages.

## Discovery inventory

Application/status, CRM, SIS, LMS, SSO, email/SMS, visit booking, payments/deposits, catalogue, analytics, and tag management are currently unconfirmed. Each requires an owner, API capabilities, sandbox, IDs/matching rules, classification, residency/contract review, limits, failure process, and retention behavior.

## CRM

Site → queue → CRM: upsert prospect; interest/inquiry; first/latest attribution; consent; visit/guide/quiz/AI activity; routing by program/geography/level/start.

CRM → site where approved: consent changes, counsellor/appointment details, and authenticated stage personalization.

## Application

Deep-link with program/campaign context. Consume started/submitted/status events where available. Never treat an outbound click as completion.

## SIS/catalogue

Import approved IDs, status, credits, and curriculum references. Define conflict authority. Publish synchronized snapshots rather than requiring live SIS responses.

## LMS

Phase 5: LTI 1.3, course/role context, instructor-approved materials. No grade writing in pilot. Analytics/grade integrations need separate approval.

## Identity and communications

OIDC/SAML with automated deprovisioning and IdP MFA. Separate transactional confirmations from consent-aware marketing. Support program/delivery/start/geography/parent segmentation and monitored replies.

## Visits/events

Mobile capacity-aware booking, calendar files/reminders, and attendance returned to CRM.

## Search and analytics

Index only published/effective content. Blend programs, admissions, cost, people, events, policies, and stories, prioritizing programs for recruitment queries.

Use first-party events, consent-aware tags, server-confirmed form conversions, persistent attribution, non-sensitive experiment assignments, and CRM aggregate outcomes.

    source → landing → discovery → inquiry/visit/application
           → completed → admitted → deposited → enrolled

## Reliability

Outbox/queue, idempotency, exponential retry/dead-letter, human-readable dashboard, backlog alerts, reconciliation jobs, and sandbox contract tests.

## Current-site migration

An approved crawler extracts headings, text, metadata, media, links, and files; maps them into schemas; flags duplicates, broken links, alt-text gaps, stale dates, and conflicting facts; creates drafts only; requires owner approval; and generates redirects. Never auto-publish scraped content.

## Environment categories

Database/storage; CMS secret; SSO; CRM/application/SIS/LMS; email/SMS; maps/video; analytics; AI gateway/providers; rate limits/retention. Define exact names after vendor confirmation and keep secrets server-side.
