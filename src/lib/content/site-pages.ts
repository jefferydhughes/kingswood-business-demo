import { institutionalPageSlugs, type InstitutionalPageSlug } from "@/content/types";

/**
 * How each page is named for an editor, and the route that renders it.
 *
 * Typed as a complete record of the slugs, so adding a page to
 * institutionalPageSlugs without naming it here fails the build rather than
 * producing a nameless entry in the page switcher.
 */
const labels: Record<InstitutionalPageSlug, string> = {
  about: "About",
  academics: "Academics",
  admissions: "Admissions",
  "student-life": "Student life",
};

export type SitePage = {
  slug: InstitutionalPageSlug;
  label: string;
  route: string;
};

export const sitePages: readonly SitePage[] = institutionalPageSlugs.map((slug) => ({
  slug,
  label: labels[slug],
  route: `/${slug}`,
}));

/** The label an editor sees in a dropdown, including the route it publishes to. */
export const sitePageOption = (page: SitePage) => `${page.label} (${page.route})`;
