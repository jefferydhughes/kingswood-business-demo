import type { ContentRepository } from "@/content/types";
import { fixtureContentRepository } from "./fixture-repository";
import { createPayloadContentRepository } from "./payload-repository";

/**
 * Composition root. Routes depend on ContentRepository and never on a source.
 *
 * CMS_CONTENT=on serves the institutional pages from Payload, falling back to
 * the fixtures per page when the CMS has no record or cannot be reached.
 * Anything else serves the fixtures only, which is the revert path: one
 * environment variable, no deployment of different code.
 */
export const contentRepository: ContentRepository =
  process.env.CMS_CONTENT === "on"
    ? createPayloadContentRepository()
    : fixtureContentRepository;

export { fixtureContentRepository } from "./fixture-repository";
export { createPayloadContentRepository } from "./payload-repository";
