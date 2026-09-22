import type { CollectionConfig } from "payload";

import { administrators, hasRole } from "@/access/cms";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 60 * 60 * 2,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  admin: {
    defaultColumns: ["email", "roles", "updatedAt"],
    useAsTitle: "email",
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: async ({ req }) => {
      if (administrators({ req })) return true;
      if (req.user) return false;
      // Payload's first-user screen needs exactly one anonymous bootstrap.
      // Once any user exists, anonymous creation is permanently denied.
      const result = await req.payload.count({ collection: "users", overrideAccess: true });
      return result.totalDocs === 0;
    },
    delete: administrators,
    read: ({ req }) => {
      if (administrators({ req })) return true;
      return req.user?.id ? { id: { equals: req.user.id } } : false;
    },
    update: ({ req }) => {
      if (administrators({ req })) return true;
      return req.user?.id ? { id: { equals: req.user.id } } : false;
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== "create" || req.user) return data;

        const result = await req.payload.count({
          collection: "users",
          overrideAccess: true,
        });

        // The controlled first-user flow creates the only anonymous account
        // and must establish an administrator who can manage later accounts.
        return result.totalDocs === 0
          ? { ...data, roles: ["administrator"] }
          : data;
      },
    ],
  },
  fields: [
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      defaultValue: ["editor"],
      saveToJWT: true,
      options: [
        { label: "Editor", value: "editor" },
        { label: "Publisher", value: "publisher" },
        { label: "Administrator", value: "administrator" },
      ],
      access: {
        create: ({ req }) => hasRole(req.user, ["administrator"]),
        update: ({ req }) => hasRole(req.user, ["administrator"]),
      },
    },
  ],
};
