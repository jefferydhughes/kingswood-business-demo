import type { CollectionConfig } from "payload";

import { editors, publishers } from "@/access/cms";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { useAsTitle: "alt" },
  access: {
    create: editors,
    delete: publishers,
    read: () => true,
    update: editors,
  },
  upload: {
    adminThumbnail: "card",
    focalPoint: true,
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "card", width: 768, height: 512, position: "centre" },
      { name: "hero", width: 1600, height: 900, position: "centre" },
    ],
  },
  fields: [
    { name: "alt", type: "text", required: true },
    { name: "caption", type: "textarea" },
    { name: "rightsOwner", type: "text", required: true },
    { name: "rightsExpiry", type: "date" },
  ],
};
