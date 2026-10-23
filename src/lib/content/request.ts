import { draftMode } from "next/headers";

import type { ContentRepository } from "@/content/types";
import { contentRepository } from "./index";
import { createPayloadContentRepository } from "./payload-repository";

/**
 * The repository for the current request.
 *
 * In draft mode, unpublished versions are served so an editor can see a change
 * before anyone else does. Draft mode is only ever enabled by the preview route,
 * which requires the CMS preview secret, so this cannot leak unpublished content
 * to the public.
 *
 * Outside draft mode this is the normal repository, which is the fixtures until
 * CMS_CONTENT is switched on.
 */
export async function getRequestContentRepository(): Promise<ContentRepository> {
  try {
    const { isEnabled } = await draftMode();
    if (isEnabled) return createPayloadContentRepository({ draft: true });
  } catch {
    // draftMode() throws outside a request scope, such as at build time.
  }
  return contentRepository;
}
