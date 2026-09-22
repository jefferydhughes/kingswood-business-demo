import type { Metadata } from "next";
import { InstitutionalPage, type InstitutionalPageData } from "@/components/InstitutionalPage";

export const metadata: Metadata = { title: "About", description: "Learn about Kingswood University." };

const data: InstitutionalPageData = {
  eyebrow: "About Kingswood",
  title: "Education shaped by purpose",
  introduction: "Learn about Kingswood's identity, people, and commitment to preparing students for lives of service and leadership.",
  sections: [
    { title: "Mission and identity", description: "Understand the Christian purpose and commitments that guide Kingswood.", href: "https://www.kingswood.edu/mission-statement-of-faith", linkLabel: "Read the mission and beliefs" },
    { title: "History", description: "Learn about the people and events that shaped Kingswood.", href: "https://www.kingswood.edu/history", linkLabel: "Explore Kingswood's history" },
    { title: "Accreditation", description: "Review current institutional and academic accreditation information.", href: "https://www.kingswood.edu/accreditation", linkLabel: "Review accreditation" },
    { title: "Outcomes", description: "Review current information about Kingswood's institutional outcomes.", href: "https://www.kingswood.edu/outcomes", linkLabel: "View current outcomes" },
  ],
  nextStep: { title: "Get to know Kingswood", description: "Connect with the university for verified institutional details and answers.", primaryLabel: "Contact Kingswood", primaryHref: "https://www.kingswood.edu/contact" },
};

export default function AboutPage() { return <InstitutionalPage data={data} />; }
