import type {
  InstitutionalPageData,
  InstitutionalPageSlug,
} from "./types";

/**
 * Phase-one fixtures. These intentionally preserve the reviewed copy and
 * outbound links from the institutional route prototypes. They can be
 * replaced by a CMS adapter without changing page components.
 */
export const institutionalPageFixtures = {
  about: {
    slug: "about",
    eyebrow: "About Kingswood",
    title: "Education shaped by purpose",
    introduction:
      "Learn about Kingswood's identity, people, and commitment to preparing students for lives of service and leadership.",
    sections: [
      { title: "Mission and identity", description: "Understand the Christian purpose and commitments that guide Kingswood.", href: "https://www.kingswood.edu/mission-statement-of-faith", linkLabel: "Read the mission and beliefs" },
      { title: "History", description: "Learn about the people and events that shaped Kingswood.", href: "https://www.kingswood.edu/history", linkLabel: "Explore Kingswood's history" },
      { title: "Accreditation", description: "Review current institutional and academic accreditation information.", href: "https://www.kingswood.edu/accreditation", linkLabel: "Review accreditation" },
      { title: "Outcomes", description: "Review current information about Kingswood's institutional outcomes.", href: "https://www.kingswood.edu/outcomes", linkLabel: "View current outcomes" },
    ],
    nextStep: { title: "Get to know Kingswood", description: "Connect with the university for verified institutional details and answers.", primaryLabel: "Contact Kingswood", primaryHref: "https://www.kingswood.edu/contact" },
    seo: { title: "About", description: "Learn about Kingswood University." },
  },
  academics: {
    slug: "academics",
    eyebrow: "Academics",
    title: "Prepare for your calling",
    introduction:
      "Explore undergraduate, graduate, ministry, and professional pathways designed to connect learning with purpose.",
    sections: [
      { title: "Undergraduate programs", description: "Explore bachelor's degrees and other undergraduate study options.", href: "https://www.kingswood.edu/academic-excellence/undergraduate-degrees", linkLabel: "View undergraduate programs" },
      { title: "Graduate programs", description: "Consider advanced study for leadership, ministry, and professional growth.", href: "https://www.kingswood.edu/academic-excellence/graduate-degrees", linkLabel: "View graduate programs" },
      { title: "Online learning", description: "Review flexible learning options and determine which format fits your goals.", href: "https://www.kingswood.edu/academic-excellence/online-degrees", linkLabel: "Explore online learning" },
      { title: "Faculty", description: "Learn about the people who teach and support students throughout their studies.", href: "https://www.kingswood.edu/academic-excellence/meet-our-professors", linkLabel: "Meet the professors" },
    ],
    nextStep: { title: "Find the right academic path", description: "Review current program details, requirements, and availability directly with Kingswood.", primaryLabel: "Explore current programs", primaryHref: "https://www.kingswood.edu/academic-excellence" },
    seo: { title: "Academics", description: "Explore academic pathways at Kingswood University." },
  },
  admissions: {
    slug: "admissions",
    eyebrow: "Admissions",
    title: "Your next step starts here",
    introduction:
      "Get oriented to the application journey, understand costs, and connect with Kingswood for answers specific to you.",
    sections: [
      { title: "How to apply", description: "Review the current application process and what you will need before you begin.", href: "https://www.kingswood.edu/admissions/apply-now", linkLabel: "Review the application" },
      { title: "Tuition and financial aid", description: "Find current cost information and learn about available financial support.", href: "https://www.kingswood.edu/admissions/cost-of-attendance", linkLabel: "Review current costs" },
      { title: "Visit campus", description: "Discover opportunities to experience the campus and meet the Kingswood community.", href: "https://www.kingswood.edu/admissions/visit", linkLabel: "Plan a visit" },
      { title: "International students", description: "Find guidance for applying to Kingswood from outside Canada.", href: "https://www.kingswood.edu/admissions/international-students-ircc", linkLabel: "View international guidance" },
    ],
    nextStep: { title: "Talk with admissions", description: "Admissions can confirm requirements, deadlines, costs, and the best next action for your situation.", primaryLabel: "Meet the admissions team", primaryHref: "https://www.kingswood.edu/admissions/meet-our-team" },
    seo: { title: "Admissions", description: "Plan your next step toward studying at Kingswood University." },
  },
  "student-life": {
    slug: "student-life",
    eyebrow: "Student life",
    title: "Learn in community",
    introduction:
      "University life extends beyond the classroom. Explore the community, experiences, and support that shape student life at Kingswood.",
    sections: [
      { title: "Residence life", description: "Get a sense of daily life and the relationships that form while living on campus.", href: "https://www.kingswood.edu/student-life/residences", linkLabel: "Explore residences" },
      { title: "Dining", description: "Review current information about eating and gathering on campus.", href: "https://www.kingswood.edu/student-life/dining-commons", linkLabel: "Explore dining" },
      { title: "Faith and formation", description: "Explore how worship and spiritual formation are part of the Kingswood experience.", href: "https://www.kingswood.edu/student-life/chapel-and-pulse-playlist", linkLabel: "Explore chapel" },
      { title: "Athletics", description: "Learn about ways students can participate, connect, and stay active.", href: "https://www.kingswood.edu/student-life/athletics", linkLabel: "Explore athletics" },
    ],
    nextStep: { title: "Experience Kingswood for yourself", description: "A visit is the best way to ask questions and understand whether Kingswood feels like the right fit.", primaryLabel: "Plan a campus visit", primaryHref: "https://www.kingswood.edu/admissions/visit" },
    seo: { title: "Student Life", description: "Explore community and student life at Kingswood University." },
  },
} as const satisfies Record<InstitutionalPageSlug, InstitutionalPageData>;
