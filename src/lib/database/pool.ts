import { rootCertificates } from "node:tls";

import { certificate } from "./supabase-ca.json";

export function databasePoolOptions(connectionString: string) {
  const defaults = {
    connectionString,
    max: 1,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 10_000,
  };

  // Builds without CMS credentials must still be able to load the config.
  if (!connectionString) return defaults;

  let url: URL;
  try {
    url = new URL(connectionString);
  } catch {
    throw new Error("DATABASE_URL must be a valid Postgres URL.");
  }

  const isSupabase = url.hostname.endsWith(".supabase.co") ||
    url.hostname.endsWith(".pooler.supabase.com");
  if (!isSupabase) return defaults;

  // pg connection-string SSL parameters replace the explicit ssl object.
  // Apply verified TLS here so sslmode=require cannot discard the trusted CA.
  for (const key of ["sslmode", "sslrootcert", "sslcert", "sslkey", "ssl", "uselibpqcompat"]) {
    url.searchParams.delete(key);
  }

  return {
    ...defaults,
    connectionString: url.toString(),
    ssl: {
      rejectUnauthorized: true,
      ca: [...rootCertificates, certificate],
    },
  };
}
