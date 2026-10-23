import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import { allowRequest, clientKey } from "@/lib/forms/rate-limit";

/**
 * One-time recovery for CMS access.
 *
 * Payload has no password reset without an email adapter, so a forgotten admin
 * password locks the CMS with no way back in through the interface. This
 * creates an administrator, or resets an existing one's password.
 *
 * The route does not exist unless ADMIN_BOOTSTRAP_TOKEN is set: without it
 * every request is answered 404, the same as any unrouted path. Remove the
 * variable once you are back in, and the door closes again.
 *
 * Never logs the token or the password.
 */
export const dynamic = "force-dynamic";

function tokenMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // Compare lengths separately; timingSafeEqual throws on a length mismatch.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const expected = process.env.ADMIN_BOOTSTRAP_TOKEN;
  if (!expected) {
    return new NextResponse("Not Found", { status: 404, headers: { "Cache-Control": "no-store" } });
  }

  if (!allowRequest(`bootstrap:${clientKey(request)}`)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  const provided = request.headers.get("x-bootstrap-token") ?? "";
  if (!tokenMatches(provided, expected)) {
    console.warn("admin bootstrap rejected", { ip: clientKey(request) });
    return new NextResponse("Not Found", { status: 404, headers: { "Cache-Control": "no-store" } });
  }

  const body = (await request.json().catch(() => null)) as
    | { email?: unknown; password?: unknown }
    | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "email_required" }, { status: 400 });
  }
  if (password.length < 12) {
    return NextResponse.json({ error: "password_too_short", minimum: 12 }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config });
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "users",
        id: existing.docs[0].id,
        data: { password, roles: ["administrator"] },
        overrideAccess: true,
      });
      console.warn("admin bootstrap reset an existing account", { email });
      return NextResponse.json({ status: "password_reset", email });
    }

    await payload.create({
      collection: "users",
      data: { email, password, roles: ["administrator"] },
      overrideAccess: true,
    });
    console.warn("admin bootstrap created an account", { email });
    return NextResponse.json({ status: "created", email });
  } catch (error) {
    console.error("admin bootstrap failed", {
      message: error instanceof Error ? error.message.slice(0, 200) : "unknown",
    });
    return NextResponse.json({ error: "bootstrap_failed" }, { status: 500 });
  }
}
