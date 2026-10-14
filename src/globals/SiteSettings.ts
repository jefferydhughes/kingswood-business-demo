import type { GlobalConfig } from "payload";

import { authenticated, publishers } from "@/access/cms";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: authenticated,
    readVersions: authenticated,
    update: publishers,
  },
  versions: { drafts: true, max: 25 },
  fields: [
    { name: "institutionName", type: "text", required: true, defaultValue: "Kingswood University" },
    { name: "defaultMetaDescription", type: "textarea" },
    { name: "admissionsURL", type: "text" },
    { name: "applicationURL", type: "text" },
  ],
};
