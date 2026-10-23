import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "node:crypto";

import { institutionalPageSlugs } from "@/content/types";

/**
 * Turns on draft mode for the Payload live preview pane.
 *
 * Requires PREVIEW_SECRET, so an unpublished page cannot be reached by guessing
 * a URL. The redirect target is matched against the known page slugs rather
 * than taken from the query, so this cannot be used as an open redirect.
 */
export const dynamic = "force-dynamic";

function secretMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const expected = process.env.PREVIEW_SECRET;
  if (!expected) return new Response("Not Found", { status: 404 });

  const url = new URL(request.url);
  const provided = url.searchParams.get("secret") ?? "";
  if (!secretMatches(provided, expected)) {
    return new Response("Not Found", { status: 404 });
  }

  const slug = url.searchParams.get("slug") ?? "";
  const known = institutionalPageSlugs.find((candidate) => candidate === slug);
  if (!known) return new Response("Unknown page", { status: 400 });

  const draft = await draftMode();
  draft.enable();
  redirect(`/${known}`);
}
