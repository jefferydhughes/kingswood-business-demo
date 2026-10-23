import type { ServerProps } from "payload";

import { loadPageEntries } from "./page-entries";

/**
 * A named list of the site's pages at the top of the navigation.
 *
 * The default navigation offers one "Pages" link into a list. An editor who
 * wants the admissions page should not have to know that, so the pages appear
 * by name with the route each one publishes to.
 */
export async function SitePagesNav({ payload, user }: ServerProps) {
  if (!user) return null;

  const pages = await loadPageEntries(payload, user);
  if (!pages) return null;

  const adminRoute = payload.config.routes.admin ?? "/admin";

  return (
    <nav aria-label="Site pages" className="kw-nav">
      <p className="kw-nav__heading">Site pages</p>
      <ul className="kw-nav__list">
        {pages.map((page) => (
          <li key={page.slug}>
            <a
              className="kw-nav__link"
              href={page.href ?? `${adminRoute}/collections/pages/create`}
            >
              <span className="kw-nav__name">{page.label}</span>
              <span className="kw-nav__status">
                {page.status === "Not created yet" ? "Add" : page.status}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
