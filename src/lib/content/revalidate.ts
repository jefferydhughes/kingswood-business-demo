import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from "payload";

import type { Page } from "@/payload-types";

/**
 * The four university pages are prerendered at build time, so a publish would
 * otherwise stay invisible until the next deployment. These hooks rebuild the
 * affected route as soon as published content changes.
 *
 * Drafts of a page that was never published are ignored. A draft of a
 * published page cannot be told apart from an unpublish here, so it triggers a
 * rebuild too, which is harmless: the rebuild still serves the published
 * version.
 */

function refresh(slug: string | null | undefined, req: PayloadRequest) {
  if (!slug) return;
  const path = `/${slug}`;
  try {
    revalidatePath(path);
    req.payload.logger.info(`revalidated ${path}`);
  } catch (error) {
    // revalidatePath needs the Next.js runtime. Scripts such as the seed run
    // outside it, and the next deployment picks their changes up instead.
    req.payload.logger.warn(`could not revalidate ${path}: ${(error as Error).message}`);
  }
}

export const revalidatePageAfterChange: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req,
}) => {
  const isPublished = doc._status === "published";
  const wasPublished = previousDoc?._status === "published";

  // Publishing, editing a published page, or unpublishing it.
  if (isPublished || wasPublished) refresh(doc.slug, req);

  // A published page moved to a different route leaves the old one stale.
  if (wasPublished && previousDoc?.slug && previousDoc.slug !== doc.slug) {
    refresh(previousDoc.slug, req);
  }

  return doc;
};

export const revalidatePageAfterDelete: CollectionAfterDeleteHook<Page> = ({ doc, req }) => {
  refresh(doc.slug, req);
  return doc;
};
