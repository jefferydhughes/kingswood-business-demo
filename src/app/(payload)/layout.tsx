/* GENERATED FROM THE OFFICIAL PAYLOAD APP ROUTER TEMPLATE, then wrapped so a
   missing database produces an explanation rather than an unhandled error.
   This route group has no shared root layout, so the fallback below supplies
   its own document. */
import config from "@payload-config";
import "@payloadcms/next/css";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ReactNode } from "react";

import { importMap } from "./admin/importMap.js";
import "./custom.css";
import { CmsUnavailable, isPayloadInitError } from "@/components/CmsUnavailable";
import { cmsDatabaseReachable } from "@/lib/database/reachable";

export { metadata } from "@payloadcms/next/layouts";

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

function unavailableDocument() {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <CmsUnavailable />
      </body>
    </html>
  );
}

export default async function PayloadLayout({ children }: { children: ReactNode }) {
  // Checked before Payload starts, because its failure surfaces while
  // streaming and cannot be turned into a clean response after the fact.
  if (!(await cmsDatabaseReachable())) return unavailableDocument();

  try {
    return await RootLayout({ config, importMap, serverFunction, children });
  } catch (error) {
    if (!isPayloadInitError(error)) throw error;
    return unavailableDocument();
  }
}
