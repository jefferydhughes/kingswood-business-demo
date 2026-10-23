import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getRequestContentRepository } from "@/lib/content/request";

export async function generateMetadata(): Promise<Metadata> {
  const data = await (await getRequestContentRepository()).getInstitutionalPage("admissions");
  return data?.seo ?? {};
}

export default async function AdmissionsPage() {
  const data = await (await getRequestContentRepository()).getInstitutionalPage("admissions");
  if (!data) notFound();
  return <InstitutionalPage data={data} />;
}
