import { lookup } from "node:dns/promises";

/**
 * Cheap readiness probe for the CMS database host.
 *
 * Payload throws while streaming when it cannot connect, which produces a 500
 * even when the route renders a fallback. Resolving the host first lets the
 * admin route decide before Payload starts, so an absent database returns a
 * real page with a real status code.
 *
 * This answers "does the host resolve", not "is the database healthy". A
 * deleted managed database stops resolving, which is the case this covers.
 */
let cached: { value: boolean; at: number } | null = null;
const TTL_MS = 60_000;

export async function cmsDatabaseReachable(): Promise<boolean> {
  const url = process.env.DATABASE_URL;
  if (!url) return false;

  const now = Date.now();
  if (cached && now - cached.at < TTL_MS) return cached.value;

  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    cached = { value: false, at: now };
    return false;
  }

  let value = true;
  try {
    await lookup(host);
  } catch {
    value = false;
  }
  cached = { value, at: now };
  return value;
}
