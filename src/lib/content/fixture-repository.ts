import { institutionalPageFixtures } from "@/content/institutional-pages";
import { institutionalPageSlugs } from "@/content/types";
import type {
  ContentRepository,
  InstitutionalPageSlug,
} from "@/content/types";

export const fixtureContentRepository: ContentRepository = {
  async getInstitutionalPage(slug: InstitutionalPageSlug) {
    return institutionalPageFixtures[slug] ?? null;
  },

  async listInstitutionalPages() {
    return institutionalPageSlugs.map(
      (slug) => institutionalPageFixtures[slug],
    );
  },
};
