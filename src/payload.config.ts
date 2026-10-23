import path from "node:path";
import { fileURLToPath } from "node:url";

import { resendAdapter } from "@payloadcms/email-resend";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";
import { Programs } from "@/collections/Programs";
import { Redirects } from "@/collections/Redirects";
import { Users } from "@/collections/Users";
import { Footer } from "@/globals/Footer";
import { Header } from "@/globals/Header";
import { SiteSettings } from "@/globals/SiteSettings";
import { databasePoolOptions } from "@/lib/database/pool";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const canonicalURL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const deploymentURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : canonicalURL;
const allowedOrigins = [...new Set([canonicalURL, deploymentURL])];
/**
 * Relational schema changes are applied separately from committed migrations.
 * Runtime schema push is disabled in every environment so a
 * serverless request never attempts DDL work.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    /**
     * The default navigation and dashboard are organised by collection. An
     * editor arrives wanting a page, not a collection, so both gain a list of
     * the site's pages by name. Added alongside the defaults, not replacing
     * them, so nothing in the CMS becomes unreachable.
     */
    components: {
      beforeNavLinks: ["/components/admin/SitePagesNav#SitePagesNav"],
      beforeDashboard: ["/components/admin/DashboardLinks#DashboardLinks"],
    },
  },
  collections: [Users, Media, Pages, Programs, Redirects],
  globals: [Header, Footer, SiteSettings],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  db: postgresAdapter({
    pool: databasePoolOptions(process.env.DATABASE_URL ?? ""),
    push: false,
  }),
  /**
   * Without an email adapter Payload writes mail to the console, which means
   * the password reset link never reaches anyone and a forgotten admin password
   * locks the CMS permanently. Configured only when a key exists, so local and
   * preview builds stay console-only.
   */
  ...(process.env.RESEND_API_KEY && process.env.INQUIRY_FROM
    ? {
        email: resendAdapter({
          apiKey: process.env.RESEND_API_KEY,
          defaultFromAddress: process.env.INQUIRY_FROM.replace(/^.*<|>.*$/g, ""),
          defaultFromName: "Kingswood University",
        }),
      }
    : {}),
  editor: lexicalEditor(),
  // Nothing in this application queries GraphQL. Leaving it enabled would
  // publish a second, unguarded surface over every collection.
  graphQL: { disable: true },
  maxDepth: 4,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      clientUploads: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? "",
    }),
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  serverURL: deploymentURL,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
