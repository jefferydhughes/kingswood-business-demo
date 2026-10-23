import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getRequestContentRepository } from "@/lib/content/request";

export async function generateMetadata(): Promise<Metadata> {
  const data = await (await getRequestContentRepository()).getInstitutionalPage("student-life");
  return data?.seo ?? {};
}

export default async function StudentLifePage() {
  const data = await (await getRequestContentRepository()).getInstitutionalPage("student-life");
  if (!data) notFound();
  return <InstitutionalPage data={data} />;
}
