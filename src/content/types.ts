export const institutionalPageSlugs = [
  "about",
  "academics",
  "admissions",
  "student-life",
] as const;

export type InstitutionalPageSlug = (typeof institutionalPageSlugs)[number];

export type InstitutionalSection = Readonly<{
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}>;

export type InstitutionalNextStep = Readonly<{
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
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
