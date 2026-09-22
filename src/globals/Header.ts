import type { GlobalConfig } from "payload";

import { authenticated, publishers } from "@/access/cms";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
    readVersions: authenticated,
    update: publishers,
  },
  versions: { drafts: true, max: 25 },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
  ],
};
