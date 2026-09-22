import type { CollectionConfig } from "payload";

import {
  editors,
  editorsForDraftsPublishersForPublishing,
  publishedOrAuthenticated,
  publishers,
} from "@/access/cms";

export const Programs: CollectionConfig = {
  slug: "programs",
  admin: { useAsTitle: "title" },
  access: {
    create: editorsForDraftsPublishersForPublishing,
    delete: publishers,
    read: publishedOrAuthenticated,
    readVersions: editors,
    update: editorsForDraftsPublishersForPublishing,
  },
  versions: {
    drafts: { autosave: true, schedulePublish: true },
    maxPerDoc: 50,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "studyLevel",
      type: "select",
      required: true,
      options: ["undergraduate", "graduate", "certificate", "gap-year"],
    },
    {
      name: "deliveryModes",
      type: "select",
      hasMany: true,
      required: true,
      options: ["campus", "online", "hybrid"],
    },
    { name: "credential", type: "text", required: true },
    { name: "shortValueProposition", type: "textarea", required: true },
    { name: "overview", type: "richText", required: true },
    { name: "duration", type: "text" },
    { name: "credits", type: "number", min: 0 },
    { name: "curriculumURL", type: "text" },
  ],
};
