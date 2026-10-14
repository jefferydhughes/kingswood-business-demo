import type { CollectionConfig } from "payload";

import {
  editors,
  editorsForDraftsPublishersForPublishing,
  publishedOrAuthenticated,
  publishers,
} from "@/access/cms";

export const Pages: CollectionConfig = {
  slug: "pages",
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
    { name: "summary", type: "textarea", required: true },
    { name: "content", type: "richText", required: true },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
