import { getPayload } from "payload";
import config from "@payload-config";

import type {
  ContentRepository,
  InstitutionalLink,
  InstitutionalPageData,
  InstitutionalPageSlug,
  InstitutionalSection,
} from "@/content/types";
import { institutionalPageSlugs } from "@/content/types";
import { fixtureContentRepository } from "./fixture-repository";

/**
 * Institutional pages read from Payload, with the fixtures as a safety net.
 *
 * Two deliberate behaviours:
 *
 * A page that is not in the CMS yet falls back to its fixture, so the content
 * can be moved across one page at a time instead of in a single cutover.
 *
 * A CMS failure also falls back, rather than propagating. The public site does
 * not depend on the database for anything else, and a paused or unreachable
 * database has already taken this project's CMS down once. A university's
 * admissions pages should not go with it.
 */

type LinkRecord = { label?: string | null; href?: string | null; cta?: string | null } | null | undefined;

/** A link is present only when it actually points somewhere. */
function toLink(record: LinkRecord): InstitutionalLink | undefined {
  const label = record?.label?.trim();
  const href = record?.href?.trim();
  if (!label || !href) return undefined;
  const cta = record?.cta?.trim();
  return cta ? { label, href, cta } : { label, href };
}

function toRequiredLink(record: LinkRecord, field: string, slug: string): InstitutionalLink {
  const link = toLink(record);
  if (!link) throw new Error(`Page "${slug}" is missing its ${field} link.`);
  return link;
}

type SectionRecord = {
  title?: string | null;
  description?: string | null;
  internal?: LinkRecord;
  external?: LinkRecord;
};

function toSection(record: SectionRecord): InstitutionalSection | null {
  const title = record.title?.trim();
  const description = record.description?.trim();
  if (!title || !description) return null;
  const internal = toLink(record.internal);
  const external = toLink(record.external);
  return {
    title,
    description,
    ...(internal ? { internal } : {}),
    ...(external ? { external } : {}),
  };
}

type PageRecord = {
  slug?: string | null;
  eyebrow?: string | null;
  title?: string | null;
  introduction?: string | null;
  heading?: string | null;
  heroPrimary?: LinkRecord;
  heroSecondary?: LinkRecord;
  sections?: SectionRecord[] | null;
  nextStep?: {
    title?: string | null;
    description?: string | null;
    primary?: LinkRecord;
    external?: LinkRecord;
  } | null;
  seo?: { title?: string | null; description?: string | null } | null;
};

function toPageData(record: PageRecord): InstitutionalPageData {
  const slug = record.slug as InstitutionalPageSlug;
  const nextStepExternal = toLink(record.nextStep?.external);
  return {
    slug,
    eyebrow: record.eyebrow?.trim() ?? "",
    title: record.title?.trim() ?? "",
    introduction: record.introduction?.trim() ?? "",
    heading: record.heading?.trim() ?? "",
    heroPrimary: toRequiredLink(record.heroPrimary, "primary hero", slug),
    heroSecondary: toRequiredLink(record.heroSecondary, "secondary hero", slug),
    sections: (record.sections ?? []).map(toSection).filter((s): s is InstitutionalSection => s !== null),
    nextStep: {
      title: record.nextStep?.title?.trim() ?? "",
      description: record.nextStep?.description?.trim() ?? "",
      primary: toRequiredLink(record.nextStep?.primary, "next step", slug),
      ...(nextStepExternal ? { external: nextStepExternal } : {}),
    },
    seo: {
      title: record.seo?.title?.trim() ?? "",
      description: record.seo?.description?.trim() ?? "",
    },
  };
}

async function findPage(slug: InstitutionalPageSlug, draft: boolean): Promise<InstitutionalPageData | null> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    draft,
    depth: 0,
    limit: 1,
    overrideAccess: draft,
  });
  const doc = result.docs[0] as PageRecord | undefined;
  return doc ? toPageData(doc) : null;
}

export function createPayloadContentRepository(options: { draft?: boolean } = {}): ContentRepository {
  const draft = options.draft ?? false;

  const getInstitutionalPage = async (slug: InstitutionalPageSlug) => {
    try {
      const page = await findPage(slug, draft);
      if (page) return page;
    } catch (error) {
      console.error("cms page read failed", {
        slug,
        message: error instanceof Error ? error.message.slice(0, 200) : "unknown",
      });
    }
    return fixtureContentRepository.getInstitutionalPage(slug);
  };

  return {
    getInstitutionalPage,
    listInstitutionalPages: async () => {
      const pages = await Promise.all(institutionalPageSlugs.map(getInstitutionalPage));
      return pages.filter((page): page is InstitutionalPageData => page !== null);
    },
  };
}
