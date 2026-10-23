import type { Payload, TypedUser } from "payload";

import { sitePages } from "@/lib/content/site-pages";

export type PageEntry = {
  /** Null when this page has no document yet. */
  id: string | null;
  label: string;
  route: string;
  /** Null when this page has no document yet, so there is nothing to open. */
  href: string | null;
  status: "Published" | "Draft" | "Not created yet";
  slug: string;
};

type PageRecord = { id: number | string; slug?: string; _status?: string };

/**
 * Every site page with its document link and publication state.
 *
 * Shared by the navigation list and the document switcher so the two can never
 * disagree about which pages exist. Returns null on a read failure: these are
 * conveniences and must not take the admin down with them.
 */
export async function loadPageEntries(
  payload: Payload,
  user: TypedUser | undefined,
): Promise<PageEntry[] | null> {
  let records: PageRecord[];

  try {
    const result = await payload.find({
      collection: "pages",
      depth: 0,
      draft: true,
      overrideAccess: false,
      pagination: false,
      select: { slug: true, _status: true },
      user,
    });
    records = result.docs as PageRecord[];
  } catch (error) {
    console.error("admin page list read failed", {
      message: error instanceof Error ? error.message.slice(0, 200) : "unknown",
    });
    return null;
  }

  const adminRoute = payload.config.routes.admin ?? "/admin";

  return sitePages.map((page) => {
    const record = records.find((candidate) => candidate.slug === page.slug);
    return {
      id: record ? String(record.id) : null,
      label: page.label,
      route: page.route,
      slug: page.slug,
      href: record ? `${adminRoute}/collections/pages/${record.id}` : null,
      status: !record
        ? "Not created yet"
        : record._status === "published"
          ? "Published"
          : "Draft",
    };
  });
}
