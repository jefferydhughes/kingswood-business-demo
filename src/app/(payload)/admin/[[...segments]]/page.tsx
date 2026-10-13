/* GENERATED FROM THE OFFICIAL PAYLOAD APP ROUTER TEMPLATE, then wrapped so a
   missing database produces an explanation rather than an unhandled error. */
import type { Metadata } from "next";

import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap";
import { CmsUnavailable, isPayloadInitError } from "@/components/CmsUnavailable";
import { cmsDatabaseReachable } from "@/lib/database/reachable";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  if (!(await cmsDatabaseReachable())) {
    return { title: "Content system unavailable", robots: { index: false, follow: false } };
  }
  try {
    return await generatePageMetadata({ config, params, searchParams });
  } catch {
    return { title: "Content system unavailable", robots: { index: false, follow: false } };
  }
};

export default async function AdminPage({ params, searchParams }: Args) {
  if (!(await cmsDatabaseReachable())) return <CmsUnavailable />;

  try {
    return await RootPage({ config, params, searchParams, importMap });
  } catch (error) {
    // Payload throws during initialization when it cannot reach the database.
    // Anything else is a genuine fault and should surface as one.
    if (isPayloadInitError(error)) return <CmsUnavailable />;
    throw error;
  }
}
