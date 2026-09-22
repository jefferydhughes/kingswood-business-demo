import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { contentRepository } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const data = await contentRepository.getInstitutionalPage("student-life");
  return data?.seo ?? {};
}

export default async function StudentLifePage() {
  const data = await contentRepository.getInstitutionalPage("student-life");
  if (!data) notFound();
  return <InstitutionalPage data={data} />;
}
