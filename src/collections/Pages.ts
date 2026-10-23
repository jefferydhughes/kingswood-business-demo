import type { CollectionConfig, Field } from "payload";

import {
  editors,
  editorsForDraftsPublishersForPublishing,
  publishedOrAuthenticated,
  publishers,
} from "@/access/cms";

/**
 * Institutional pages.
 *
 * The field shape deliberately mirrors InstitutionalPageData in
 * src/content/types.ts, so the Payload adapter is a direct mapping rather than
 * a translation layer. Change one and change the other.
 *
 * Editors choose a page from a fixed list rather than typing a slug. Every slug
 * here has a route that renders it, so it is not possible to create a page that
 * saves successfully and then appears nowhere on the site.
 */

const hrefHelp =
  "A route in this site starts with / or #. A link to the current university website is a full https:// address and its label should say so.";

const validateHref = (value: unknown) => {
  if (typeof value !== "string" || value.trim() === "") return true;
  const href = value.trim();
  if (href.startsWith("/") || href.startsWith("#")) return true;
  if (href.startsWith("https://")) return true;
  return "Use a route starting with / or #, or a full https:// address.";
};

/** label, href and analytics name, matching InstitutionalLink. */
const linkFields = (required: boolean): Field[] => [
  {
    type: "row",
    fields: [
      { name: "label", type: "text", required, admin: { width: "50%" } },
      {
        name: "href",
        type: "text",
        required,
        validate: validateHref,
        admin: { width: "50%", description: hrefHelp },
      },
    ],
  },
  {
    name: "cta",
    type: "text",
    admin: {
      description: "Analytics name for this link, for example admissions-hero-cost. Optional.",
    },
  },
];

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    description: "The four university pages. Each one has a route that renders it.",
  },
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
    {
      name: "slug",
      type: "select",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Which page this is. Each option maps to one route." },
      options: [
        { label: "About (/about)", value: "about" },
        { label: "Academics (/academics)", value: "academics" },
        { label: "Admissions (/admissions)", value: "admissions" },
        { label: "Student life (/student-life)", value: "student-life" },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          required: true,
          admin: { width: "40%", description: "Small label above the headline." },
        },
        { name: "title", type: "text", required: true, admin: { width: "60%" } },
      ],
    },
    {
      name: "introduction",
      type: "textarea",
      required: true,
      admin: { description: "The paragraph under the headline." },
    },
    {
      name: "heading",
      type: "text",
      required: true,
      admin: {
        description:
          "Heading above the cards. Write it for this page. Do not restate the title, which is how pages ended up reading 'Explore prepare for your calling'.",
      },
    },
    {
      type: "collapsible",
      label: "Hero actions",
      fields: [
        { name: "heroPrimary", type: "group", label: "Primary action", fields: linkFields(true) },
        { name: "heroSecondary", type: "group", label: "Secondary action", fields: linkFields(true) },
      ],
    },
    {
      name: "sections",
      type: "array",
      minRows: 1,
      maxRows: 8,
      labels: { singular: "Card", plural: "Cards" },
      admin: {
        initCollapsed: true,
        description: "The card grid. Drag to reorder.",
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "internal",
          type: "group",
          label: "Primary link, inside this site",
          fields: linkFields(false),
          admin: { description: "Leave blank if this card has no internal destination." },
        },
        {
          name: "external",
          type: "group",
          label: "Secondary link, on kingswood.edu",
          fields: linkFields(false),
          admin: { description: "Leave blank if this card does not link out." },
        },
      ],
    },
    {
      name: "nextStep",
      type: "group",
      label: "Next step panel",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "primary", type: "group", label: "Primary action", fields: linkFields(true) },
        {
          name: "external",
          type: "group",
          label: "Secondary link, on kingswood.edu",
          fields: linkFields(false),
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "Search and sharing",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
};
