import path from "node:path";
import { fileURLToPath } from "node:url";

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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const siteURL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Inactive CMS scaffold.
 *
 * Nothing in the public application imports this config yet. Payload routes,
 * the Next.js plugin, and database migrations are intentionally deferred until
 * a disposable development database and Vercel Preview resources exist.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Pages, Programs, Redirects],
  globals: [Header, Footer, SiteSettings],
  cors: [siteURL],
  csrf: [siteURL],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL ?? "" },
  }),
  editor: lexicalEditor(),
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
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
