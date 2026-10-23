/**
 * Copies the institutional page fixtures into Payload.
 *
 * Idempotent: a page that already exists is updated rather than duplicated, so
 * this can be run repeatedly. Pages are created published, because they are
 * replacing content that is already live.
 *
 * Run with: npx tsx scripts/seed-institutional-pages.ts
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { fixtureContentRepository } from "../src/lib/content/fixture-repository";
import { institutionalPageSlugs } from "../src/content/types";

async function main() {
  const payload = await getPayload({ config });
  let created = 0;
  let updated = 0;

  for (const slug of institutionalPageSlugs) {
    const fixture = await fixtureContentRepository.getInstitutionalPage(slug);
    if (!fixture) {
      console.warn(`no fixture for ${slug}, skipped`);
      continue;
    }

    const data = {
      slug: fixture.slug,
      eyebrow: fixture.eyebrow,
      title: fixture.title,
      introduction: fixture.introduction,
      heading: fixture.heading,
      heroPrimary: { ...fixture.heroPrimary },
      heroSecondary: { ...fixture.heroSecondary },
      sections: fixture.sections.map((section) => ({
        title: section.title,
        description: section.description,
        internal: section.internal ? { ...section.internal } : {},
        external: section.external ? { ...section.external } : {},
      })),
      nextStep: {
        title: fixture.nextStep.title,
        description: fixture.nextStep.description,
        primary: { ...fixture.nextStep.primary },
        external: fixture.nextStep.external ? { ...fixture.nextStep.external } : {},
      },
      seo: { ...fixture.seo },
      _status: "published" as const,
    };

    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "pages",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
      updated += 1;
      console.log(`updated  ${slug}`);
    } else {
      await payload.create({ collection: "pages", data, overrideAccess: true });
      created += 1;
      console.log(`created  ${slug}`);
    }
  }

  console.log(`\ndone. ${created} created, ${updated} updated.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
