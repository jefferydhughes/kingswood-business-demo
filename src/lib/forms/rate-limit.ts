/**
 * Fixed-window limiter for the public inquiry endpoint.
 *
 * Counters live in the memory of a single serverless instance, so this reduces
 * the damage one client can do but is not a cluster-wide guarantee. A shared
 * store (Vercel KV or Upstash) is the production answer and is recorded as a
 * launch requirement in docs/progress.md.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

type Counter = { count: number; resetAt: number };

const globalStore = globalThis as typeof globalThis & { __kwRateLimit?: Map<string, Counter> };
globalStore.__kwRateLimit ??= new Map();

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0]?.trim() || "unknown";
}

/** Returns false when the caller has exceeded the window and should receive a 429. */
export function allowRequest(key: string, now = Date.now()): boolean {
  const counters = globalStore.__kwRateLimit as Map<string, Counter>;

  // Drop expired counters so the map cannot grow without bound.
  if (counters.size > 5000) {
    for (const [existing, counter] of counters) {
      if (counter.resetAt <= now) counters.delete(existing);
    }
  }

  const current = counters.get(key);
  if (!current || current.resetAt <= now) {
    counters.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  current.count += 1;
  return current.count <= MAX_PER_WINDOW;
}
