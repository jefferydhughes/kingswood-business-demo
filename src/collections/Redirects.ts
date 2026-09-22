import type { CollectionConfig } from "payload";

import { publishers } from "@/access/cms";

export const Redirects: CollectionConfig = {
  slug: "redirects",
  admin: {
    defaultColumns: ["from", "to", "statusCode", "updatedAt"],
    useAsTitle: "from",
  },
  access: {
    create: publishers,
    delete: publishers,
    read: () => true,
    update: publishers,
  },
  fields: [
    {
      name: "from",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Path only, beginning with / (for example /old-program)." },
    },
    {
      name: "to",
      type: "text",
      required: true,
      admin: { description: "Internal path or approved absolute URL." },
    },
    {
      name: "statusCode",
      type: "select",
      required: true,
      defaultValue: "301",
      options: [
        { label: "301 — Permanent", value: "301" },
        { label: "302 — Temporary", value: "302" },
      ],
    },
    { name: "notes", type: "textarea" },
  ],
};
