import { Client } from "pg";

import { databasePoolOptions } from "./pool";

/**
 * Readiness probe for the CMS database.
 *
 * Payload surfaces a connection failure while the response is streaming, which
 * produces a 500 even when the route renders a fallback. Probing first lets the
 * admin route decide before Payload starts, so an absent database returns a
 * real page with a real status code.
 *
 * A name lookup is not enough: a paused or deleted Supabase project keeps
 * resolving, because the pooler hostname is shared, and rejects the tenant only
 * once a connection is opened. The result is cached so this costs one short-lived
 * connection per minute per instance, which also means a database that comes
 * back, after a paused project is restored, is picked up within a minute with no
 * redeploy.
 */
const TTL_MS = 60_000;
const CONNECT_TIMEOUT_MS = 4000;

let cached: { value: boolean; at: number } | null = null;
let inFlight: Promise<boolean> | null = null;

async function probe(): Promise<boolean> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return false;

  const options = databasePoolOptions(connectionString);
  const client = new Client({
    ...options,
    connectionTimeoutMillis: CONNECT_TIMEOUT_MS,
  });

  try {
    await client.connect();
    return true;
  } catch (error) {
    // Logged so an operator can tell a paused project from a wrong password or
    // a timeout. The connection string is never logged.
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "unknown";
    const message = error instanceof Error ? error.message : "";
    console.error("cms database probe failed", { code, message: message.slice(0, 200) });
    return false;
  } finally {
    await client.end().catch(() => {});
  }
}

export async function cmsDatabaseReachable(): Promise<boolean> {
  const now = Date.now();
  if (cached && now - cached.at < TTL_MS) return cached.value;
  // Collapse concurrent callers onto one probe.
  inFlight ??= probe().then((value) => {
    cached = { value, at: Date.now() };
    inFlight = null;
    return value;
  });
  return inFlight;
}
