import type { ContentRepository } from "@/content/types";
import { fixtureContentRepository } from "./fixture-repository";

// Composition root: switch this binding when the Payload adapter is ready.
// Routes and components depend only on ContentRepository.
export const contentRepository: ContentRepository = fixtureContentRepository;

export { fixtureContentRepository } from "./fixture-repository";
