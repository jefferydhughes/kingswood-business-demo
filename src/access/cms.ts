import type { Access } from "payload";

export type CMSRole = "editor" | "publisher" | "administrator";

type CMSUser = {
  id?: number | string;
  roles?: CMSRole[];
};

const getUser = (user: unknown): CMSUser | null =>
  user && typeof user === "object" ? (user as CMSUser) : null;

export const hasRole = (user: unknown, allowed: CMSRole[]) => {
  const roles = getUser(user)?.roles ?? [];
  return roles.some((role) => allowed.includes(role));
};

export const authenticated: Access = ({ req }) => Boolean(req.user);

export const editors: Access = ({ req }) =>
  hasRole(req.user, ["editor", "publisher", "administrator"]);

export const editorsForDraftsPublishersForPublishing: Access = ({ data, req }) =>
  data?._status === "published" ? publishers({ req }) : editors({ req });

export const publishers: Access = ({ req }) =>
  hasRole(req.user, ["publisher", "administrator"]);

export const administrators: Access = ({ req }) =>
  hasRole(req.user, ["administrator"]);

export const publishedOrAuthenticated: Access = ({ req }) =>
  req.user ? true : { _status: { equals: "published" } };
