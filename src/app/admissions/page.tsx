import type { Metadata } from "next";
import { InstitutionalPage, type InstitutionalPageData } from "@/components/InstitutionalPage";

export const metadata: Metadata = { title: "Admissions", description: "Plan your next step toward studying at Kingswood University." };

const data: InstitutionalPageData = {
  eyebrow: "Admissions",
  title: "Your next step starts here",
  introduction: "Get oriented to the application journey, understand costs, and connect with Kingswood for answers specific to you.",
  sections: [
    { title: "How to apply", description: "Review the current application process and what you will need before you begin.", href: "https://www.kingswood.edu/admissions/apply-now", linkLabel: "Review the application" },
    { title: "Tuition and financial aid", description: "Find current cost information and learn about available financial support.", href: "https://www.kingswood.edu/admissions/cost-of-attendance", linkLabel: "Review current costs" },
    { title: "Visit campus", description: "Discover opportunities to experience the campus and meet the Kingswood community.", href: "https://www.kingswood.edu/admissions/visit", linkLabel: "Plan a visit" },
    { title: "International students", description: "Find guidance for applying to Kingswood from outside Canada.", href: "https://www.kingswood.edu/admissions/international-students-ircc", linkLabel: "View international guidance" },
  ],
  nextStep: { title: "Talk with admissions", description: "Admissions can confirm requirements, deadlines, costs, and the best next action for your situation.", primaryLabel: "Meet the admissions team", primaryHref: "https://www.kingswood.edu/admissions/meet-our-team" },
};

export default function AdmissionsPage() { return <InstitutionalPage data={data} />; }
