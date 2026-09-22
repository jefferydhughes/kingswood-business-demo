import type { GlobalConfig } from "payload";

import { authenticated, publishers } from "@/access/cms";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
    readVersions: authenticated,
    update: publishers,
  },
  versions: { drafts: true, max: 25 },
  fields: [
    { name: "summary", type: "textarea" },
    {
      name: "links",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    { name: "legalText", type: "text" },
  ],
};
