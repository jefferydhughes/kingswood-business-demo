import type { ServerProps } from "payload";

import { loadPageEntries } from "./page-entries";
import { PageSwitcherControl, type SwitcherEntry } from "./PageSwitcherControl";

/**
 * Rendered above the save and publish controls on a page document, so an
 * editor who opened the wrong page moves to the right one without returning to
 * a list. This is the part of the reference editor worth copying.
 *
 * This slot receives the document id, not the document, so the current page is
 * identified by id rather than by slug.
 */
export async function PageSwitcher({ id, payload, user }: ServerProps) {
  const pages = await loadPageEntries(payload, user);
  if (!pages) return null;

  const currentId = id === undefined ? null : String(id);
  const entries: SwitcherEntry[] = pages.map((page) => ({
    label: page.label,
    route: page.route,
    href: page.href,
    status: page.status,
    current: page.id !== null && page.id === currentId,
  }));

  const current = entries.find((entry) => entry.current);

  return (
    <PageSwitcherControl
      entries={entries}
      liveRoute={current?.status === "Published" ? current.route : null}
    />
  );
}
