import type { ServerProps } from "payload";

import { hasRole } from "@/access/cms";

import { loadPageEntries } from "./page-entries";

/**
 * A "start here" panel above the default dashboard cards.
 *
 * The cards below it list collections. This panel answers the two questions an
 * editor actually arrives with: which page do I want, and what does the
 * visitor see right now. It adds the pages by name and the links that leave
 * the admin, rather than repeating the cards.
 */
export async function DashboardLinks({ payload, user }: ServerProps) {
  if (!user) return null;

  const pages = await loadPageEntries(payload, user);
  const adminRoute = payload.config.routes.admin ?? "/admin";
  const isAdministrator = hasRole(user, ["administrator"]);

  return (
    <section className="kw-start">
      <h2 className="kw-start__heading">Start here</h2>

      <div className="kw-start__grid">
        <div className="kw-start__group">
          <h3 className="kw-start__subheading">Edit a page</h3>
          {pages ? (
            <ul className="kw-start__list">
              {pages.map((page) => (
                <li key={page.slug}>
                  <a href={page.href ?? `${adminRoute}/collections/pages/create`}>
                    {page.label}
                  </a>
                  <span className="kw-start__meta">
                    {page.status === "Not created yet" ? "Not created yet" : page.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="kw-start__meta">Page list unavailable right now.</p>
          )}
        </div>

        <div className="kw-start__group">
          <h3 className="kw-start__subheading">Site-wide</h3>
          <ul className="kw-start__list">
            <li>
              <a href={`${adminRoute}/globals/site-settings`}>Site settings</a>
            </li>
            <li>
              <a href={`${adminRoute}/globals/header`}>Header navigation</a>
            </li>
            <li>
              <a href={`${adminRoute}/globals/footer`}>Footer</a>
            </li>
            <li>
              <a href={`${adminRoute}/collections/media`}>Images and files</a>
            </li>
            <li>
              <a href={`${adminRoute}/collections/programs`}>Programs</a>
            </li>
            {isAdministrator ? (
              <li>
                <a href={`${adminRoute}/collections/users`}>People with access</a>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="kw-start__group">
          <h3 className="kw-start__subheading">See the site</h3>
          <ul className="kw-start__list">
            <li>
              <a href="/" rel="noreferrer" target="_blank">
                Home page
              </a>
              <span className="kw-start__meta">What a visitor sees</span>
            </li>
            <li>
              <a href="/encounter" rel="noreferrer" target="_blank">
                Encounter 2026
              </a>
            </li>
            <li>
              <a href="/demo/inquiries" rel="noreferrer" target="_blank">
                Demo enquiries
              </a>
              <span className="kw-start__meta">Form submissions in this demo</span>
            </li>
          </ul>
        </div>
      </div>

      <p className="kw-start__note">
        Changes save as a draft first. Open a page, use the eye icon to see it beside the
        form, then publish when it reads the way you want.
      </p>
    </section>
  );
}
