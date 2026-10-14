export const institutionalPageSlugs = [
  "about",
  "academics",
  "admissions",
  "student-life",
] as const;

export type InstitutionalPageSlug = (typeof institutionalPageSlugs)[number];

/**
 * One actionable link. `href` starting with "/" or "#" is a route inside this
 * demo and must be rendered with next/link. An absolute URL is a page on the
 * current university website and must be rendered as an anchor whose label
 * says so.
 */
export type InstitutionalLink = Readonly<{
  label: string;
  href: string;
  /** Analytics name, matching the data-cta convention used on the landing page. */
  cta?: string;
}>;

/**
 * A card in the "start here" grid.
 *
 * `internal` is the primary action and is present whenever a demo route covers
 * the topic. `external` is secondary and points at the current university
 * website for content that has not been reviewed or migrated.
 *
 * Accreditation, outcomes, tuition, deadlines, and program status claims are
 * deliberately absent from these fixtures. README.md requires an owner, a
 * source, and a review date for each, and none has been recorded.
 */
export type InstitutionalSection = Readonly<{
  title: string;
  description: string;
  internal?: InstitutionalLink;
  external?: InstitutionalLink;
}>;

export type InstitutionalNextStep = Readonly<{
  title: string;
  description: string;
  /** Primary action. Always a demo route. */
  primary: InstitutionalLink;
  /** Optional secondary action on the current university website. */
  external?: InstitutionalLink;
}>;

/**
 * Framework- and CMS-independent representation of an institutional page.
 * A future Payload adapter should return this shape rather than leaking CMS
 * generated types into route components.
 */
export type InstitutionalPageData = Readonly<{
  slug: InstitutionalPageSlug;
  eyebrow: string;
  title: string;
  introduction: string;
  /** Heading for the card grid. Written per page, never derived from the title. */
  heading: string;
  heroPrimary: InstitutionalLink;
  heroSecondary: InstitutionalLink;
  sections: ReadonlyArray<InstitutionalSection>;
  nextStep: InstitutionalNextStep;
  seo: Readonly<{
    title: string;
    description: string;
  }>;
}>;

export interface ContentRepository {
  getInstitutionalPage(
    slug: InstitutionalPageSlug,
  ): Promise<InstitutionalPageData | null>;
  listInstitutionalPages(): Promise<ReadonlyArray<InstitutionalPageData>>;
}
