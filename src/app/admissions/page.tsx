import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { contentRepository } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const data = await contentRepository.getInstitutionalPage("admissions");
  return data?.seo ?? {};
}

export default async function AdmissionsPage() {
  const data = await contentRepository.getInstitutionalPage("admissions");
  if (!data) notFound();
  return <InstitutionalPage data={data} />;
}
