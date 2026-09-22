import type { Metadata } from "next";
import { InstitutionalPage, type InstitutionalPageData } from "@/components/InstitutionalPage";

export const metadata: Metadata = { title: "Student Life", description: "Explore community and student life at Kingswood University." };

const data: InstitutionalPageData = {
  eyebrow: "Student life",
  title: "Learn in community",
  introduction: "University life extends beyond the classroom. Explore the community, experiences, and support that shape student life at Kingswood.",
  sections: [
    { title: "Residence life", description: "Get a sense of daily life and the relationships that form while living on campus.", href: "https://www.kingswood.edu/student-life/residences", linkLabel: "Explore residences" },
    { title: "Dining", description: "Review current information about eating and gathering on campus.", href: "https://www.kingswood.edu/student-life/dining-commons", linkLabel: "Explore dining" },
    { title: "Faith and formation", description: "Explore how worship and spiritual formation are part of the Kingswood experience.", href: "https://www.kingswood.edu/student-life/chapel-and-pulse-playlist", linkLabel: "Explore chapel" },
    { title: "Athletics", description: "Learn about ways students can participate, connect, and stay active.", href: "https://www.kingswood.edu/student-life/athletics", linkLabel: "Explore athletics" },
  ],
  nextStep: { title: "Experience Kingswood for yourself", description: "A visit is the best way to ask questions and understand whether Kingswood feels like the right fit.", primaryLabel: "Plan a campus visit", primaryHref: "https://www.kingswood.edu/admissions/visit" },
};

export default function StudentLifePage() { return <InstitutionalPage data={data} />; }
