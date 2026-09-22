import type { Metadata } from "next";
import { InstitutionalPage, type InstitutionalPageData } from "@/components/InstitutionalPage";

export const metadata: Metadata = { title: "Academics", description: "Explore academic pathways at Kingswood University." };

const data: InstitutionalPageData = {
  eyebrow: "Academics",
  title: "Prepare for your calling",
  introduction: "Explore undergraduate, graduate, ministry, and professional pathways designed to connect learning with purpose.",
  sections: [
    { title: "Undergraduate programs", description: "Explore bachelor's degrees and other undergraduate study options.", href: "https://www.kingswood.edu/academic-excellence/undergraduate-degrees", linkLabel: "View undergraduate programs" },
    { title: "Graduate programs", description: "Consider advanced study for leadership, ministry, and professional growth.", href: "https://www.kingswood.edu/academic-excellence/graduate-degrees", linkLabel: "View graduate programs" },
    { title: "Online learning", description: "Review flexible learning options and determine which format fits your goals.", href: "https://www.kingswood.edu/academic-excellence/online-degrees", linkLabel: "Explore online learning" },
    { title: "Faculty", description: "Learn about the people who teach and support students throughout their studies.", href: "https://www.kingswood.edu/academic-excellence/meet-our-professors", linkLabel: "Meet the professors" },
  ],
  nextStep: { title: "Find the right academic path", description: "Review current program details, requirements, and availability directly with Kingswood.", primaryLabel: "Explore current programs", primaryHref: "https://www.kingswood.edu/academic-excellence" },
};

export default function AcademicsPage() { return <InstitutionalPage data={data} />; }
