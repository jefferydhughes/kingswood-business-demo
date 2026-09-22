# CMS implementation decision

**Status:** Recommended implementation path  
**Decision date:** 2026-09-22  
**Scope:** Kingswood website modernization on Next.js 16.2.6, React 19.2, Node 22 and Vercel

## Decision

Integrate **Payload CMS 3.x directly into the existing Next.js App Router application**, backed by managed PostgreSQL and Vercel Blob. Do not create a separate CMS repository or a second frontend. The public website and `/admin` should deploy as one Vercel project, with Payload's Local API used from Server Components wherever possible.

This is now a compatible path. Payload officially supports Next.js 16.2.x beginning with Payload 3.73.0, and Payload's official templates have since moved to Next.js 16.2.6. The current official release page shows Payload 3.88.0 and a later template move to Next.js 16.3.0. Therefore, the repository's Next.js 16.2.6 and React 19.2 baseline can remain unchanged for the CMS integration.

## Package policy

Use a single exact Payload version for every `payload` and `@payloadcms/*` package. At implementation time, select the latest stable Payload 3.x release that passes a clean install and production build; today, `3.88.0` is the documented stable release to test first. Do not use Payload 4 canaries.

Initial packages:

```json
{
  "payload": "3.88.0",
  "@payloadcms/next": "3.88.0",
  "@payloadcms/db-postgres": "3.88.0",
  "@payloadcms/richtext-lexical": "3.88.0",
  "@payloadcms/storage-vercel-blob": "3.88.0",
  "sharp": "<exact tested version>"
}
```

`sharp` is needed for image resizing, crops and focal points. GraphQL is optional and should not be installed unless Kingswood identifies a real GraphQL consumer; the Local and REST APIs cover the planned site.

Keep Next.js at exactly `16.2.6` during the first CMS slice. Upgrade Next.js and Payload only in a separate dependency PR after CMS acceptance tests pass. Commit a lockfile and use `npm ci` in CI once packages are installed.

Official basis:

- [Payload installation in an existing Next.js app](https://payloadcms.com/docs/getting-started/installation)
- [Payload's official Next.js 16 support statement](https://github.com/payloadcms/payload/discussions/14330)
- [Payload releases](https://github.com/payloadcms/payload/releases)

## Required architecture

### Application structure

Add the official Payload route group beside the existing frontend route group:

```text
src/app/
  (frontend)/        public Kingswood routes
  (payload)/         Payload admin and API routes
payload.config.ts
src/collections/
src/globals/
src/access/
src/migrations/
```

The existing root page will need to move into the frontend route group without changing its URL. Add `@payload-config` to TypeScript paths and wrap the existing `next.config.ts` export with `withPayload`. Preserve the existing security headers and image configuration.

### PostgreSQL

Use a managed Postgres provider connected through Vercel Marketplace. Neon is the default recommendation because it is the successor path for Vercel Postgres and is designed for serverless connections. Supabase Postgres is also technically valid if Kingswood prefers its administration or already has an institutional account. Provider selection is a procurement/ownership choice, not an application-architecture change.

Requirements:

- One production database owned by a Kingswood-controlled organization/account.
- A separate development database or branch; never develop against production.
- Preview deployments must not automatically mutate the production schema.
- Encrypted connections and provider backups enabled.
- A documented data export and restore procedure before launch.
- Production schema changes performed by committed Payload migrations, not runtime `push`.

Payload recommends Drizzle push mode for a disposable local development database, followed by generated migrations for production. CI should verify that migrations and generated Payload types are current. A controlled deployment step must run pending migrations before the application version that depends on them receives traffic.

Official basis:

- [Payload Postgres adapter](https://payloadcms.com/docs/database/postgres)
- [Payload migrations](https://payloadcms.com/docs/database/migrations)
- [Postgres providers on Vercel](https://vercel.com/docs/postgres)

### Media storage

Use a **public Vercel Blob store** for website media and the official `@payloadcms/storage-vercel-blob` adapter. Configure the Media upload collection with `disableLocalStorage` through the adapter and enable `clientUploads: true`; Vercel server uploads are limited to 4.5 MB, while client uploads bypass that server limit.

Public Blob is appropriate only for publishable website assets. Do not upload student records, applications, private documents or confidential institutional files to this Media collection. Those data belong in Salesforce or another approved private system.

Official basis:

- [Payload storage adapters and Vercel Blob configuration](https://payloadcms.com/docs/upload/storage-adapters)
- [Payload production deployment and ephemeral filesystems](https://payloadcms.com/docs/production/deployment)
- [Vercel Blob](https://vercel.com/docs/vercel-blob)

### Authentication and authorization

Use Payload's built-in authentication for CMS staff. Do not add Clerk/Auth0 for the editor interface in phase 1. Create an auth-enabled `users` collection and explicitly make it the Admin user collection.

Roles:

- **Editor:** create and edit drafts; upload media; cannot publish, change navigation/site settings, manage users or delete published content.
- **Publisher:** editor rights plus publish/unpublish and scheduled publishing.
- **Administrator:** publisher rights plus users, roles, redirects, navigation, integrations and system settings.

Security rules:

- Disable public user creation after the first administrator is established.
- Enforce collection and field access in Payload access functions, not merely by hiding Admin UI controls.
- Enable a conservative login-attempt limit and lock interval.
- Require password resets through an institutional email path; configure transactional email before production onboarding.
- Do not enable API keys unless a named machine-to-machine use case requires them.
- Protect draft/version reads and preview endpoints so unpublished content is not publicly queryable.
- Treat the first-user route as a launch procedure: create the first admin immediately after the production database is initialized, then verify anonymous account creation is impossible.

Payload provides authentication, HTTP-only cookie sessions, password reset operations and granular RBAC-compatible access control. The implementation still has to define Kingswood's policy; secure authorization is not produced automatically by naming roles.

Official basis:

- [Payload authentication](https://payloadcms.com/docs/authentication/overview)
- [Payload access control](https://payloadcms.com/docs/access-control/overview)
- [Payload Admin Panel users](https://payloadcms.com/docs/admin/overview)

## Environment variables

All sensitive values are server-only and must be configured separately for Vercel Production, Preview and local development.

| Variable | Required | Purpose |
|---|---:|---|
| `DATABASE_URL` | Yes | Postgres connection used by Payload |
| `PAYLOAD_SECRET` | Yes | Long, random secret for Payload encryption/auth workflows |
| `BLOB_READ_WRITE_TOKEN` | For media | Vercel Blob credential, normally injected by the connected store |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical public URL used for links and preview handling |
| `PAYLOAD_PUBLIC_SERVER_URL` | Recommended | Absolute server URL for Payload; use an agreed name and map it to `serverURL` |
| `PREVIEW_SECRET` | Recommended | Random secret for draft-mode/preview entry routes |
| `CRON_SECRET` | Later | Required only when scheduled publishing/jobs are enabled on Vercel |
| Email-provider credentials | Before staff launch | Password reset and account email delivery |

Generate a different `PAYLOAD_SECRET` and `PREVIEW_SECRET` for local, preview and production. Never prefix credentials with `NEXT_PUBLIC_`, never commit `.env`, and never expose the database URL to browser code. The existing `.env.example` already reserves the three core values; extend it with placeholders only when the corresponding feature is implemented.

Official basis: [Payload environment variables](https://payloadcms.com/docs/configuration/environment-vars).

## Content model for the first slice

Scaffold only the structures needed to prove the editorial workflow:

- `Users` collection with roles.
- `Media` upload collection with alt text, caption and focal point.
- `Pages` collection with title, slug, SEO, status and a constrained block-based layout.
- `Programs` collection for degree/program pathways.
- `Redirects` collection for WordPress URL migration.
- `Header` and `Footer` globals.
- `SiteSettings` global for canonical institutional values and default SEO.

Enable versions and drafts for Pages, Programs and site navigation/settings. Enable autosave conservatively. Add server-side live preview only after draft access and origin checks are tested. Payload's versions UI provides history, diffs and restoration; drafts add `_status`, while autosave stores draft versions rather than publishing edits.

Official basis:

- [Payload versions](https://payloadcms.com/docs/versions/overview)
- [Payload drafts](https://payloadcms.com/docs/versions/drafts)
- [Payload server-side live preview](https://payloadcms.com/docs/live-preview/server)

## Safe implementation sequence

1. **Compatibility branch:** install exact package versions, commit the lockfile, add Payload routes/config and a minimal auth collection. Do not connect production resources.
2. **Local database:** connect a disposable local/dev Postgres database, generate types/import map, and prove `/admin`, account creation, login and a clean production build.
3. **Schemas and RBAC:** implement Users, Media, Pages, Programs, Redirects and Globals with explicit access tests.
4. **Frontend adapter:** add a typed content repository layer so public components do not depend directly on Payload document shapes. Keep current hard-coded content as a fallback during migration.
5. **Draft workflow:** add preview/draft mode, versions and restore tests. Confirm anonymous users cannot read drafts.
6. **Vercel preview resources:** connect a non-production Postgres database and Blob store to Preview only; run migrations manually and deploy. Test admin, uploads, edits and preview end to end.
7. **Production provisioning:** after approval, provision Kingswood-owned Postgres and Blob, set Production secrets, run reviewed migrations and create the first administrator.
8. **Content migration:** migrate the homepage first, compare rendering and metadata, then migrate WordPress pages in the waves defined in `wordpress-migration.md`.
9. **Operational handoff:** finish editor/admin login, publishing, media, user management, rollback, backup and deployment instructions before inviting staff.

Each step should be its own reversible PR or tightly scoped group of commits. Do not combine database provisioning, schema creation, content migration and public page redesign into one release.

## What can be scaffolded before provisioning

The following work is safe now and does not require creating a paid or externally persistent resource:

- Add and pin Payload packages and a lockfile.
- Add the official `(payload)` route files, `payload.config.ts`, `withPayload` wrapper and TypeScript alias.
- Define collections, globals, blocks, RBAC functions and generated TypeScript types.
- Build the frontend content adapter and fixtures.
- Add unit tests for access rules and schema helpers.
- Add migration/type/import-map scripts and CI checks.
- Extend `.env.example` with non-secret placeholders.
- Draft the administrator/editor runbooks and first-user checklist.
- Verify `npm run lint`, `npm run typecheck` and `npm run build` using an ephemeral/local Postgres instance.

These actions require provisioning or explicit provider access and should wait for the infrastructure decision:

- Connecting Vercel Marketplace Postgres.
- Creating the production Blob store.
- Setting production secrets.
- Running migrations against production.
- Creating the first real staff account.
- Importing production WordPress content or media.

## Vercel acceptance gates

Before merging the CMS-enabled release to `main`:

- Vercel Preview reports `Ready` and `/admin` loads without build/runtime errors.
- Admin login, logout, failed-login lockout and password reset are tested.
- An editor can save a draft but cannot publish; a publisher can publish.
- Anonymous REST/Local API paths cannot read drafts, versions, users or private fields.
- A direct-to-Blob image upload works and renders through `next/image` with correct alt text.
- A page edit appears in preview, publishing updates the public page, and version restore works.
- Database migrations run once and can be audited; deployments do not use schema push against production.
- Existing homepage, inquiry endpoint, Salesforce integration contract, security headers and stable production URL still work.
- Rollback behavior is documented: application rollback alone may not reverse a database migration, so destructive schema changes require expand/migrate/contract sequencing.

## Recommendation to proceed

Proceed now with the compatibility scaffold through step 4 on a short-lived feature branch, using a disposable development database only when the initial config needs to run. Pause before creating Vercel Postgres/Blob resources or production accounts. After the scaffold produces a clean local and Vercel Preview build, present the provider/cost choice and the working `/admin` workflow for approval, then provision production infrastructure.

