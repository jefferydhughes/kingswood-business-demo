import type {
  InstitutionalPageData,
  InstitutionalPageSlug,
} from "./types";

/**
 * Phase-one fixtures. Primary actions stay inside this demo so a reviewer can
 * walk the structure without leaving it. Links to the current university
 * website are secondary and say where they go, because that content has not
 * been reviewed or migrated.
 *
 * The /about page previously carried an Accreditation card and an Outcomes
 * card. README.md requires an owner, a source, and a review date for claims of
 * that kind, no owner has recorded one, and the project makes no accreditation
 * claim, so both cards were removed rather than published unsourced.
 *
 * They can be replaced by a CMS adapter without changing page components.
 */
export const institutionalPageFixtures = {
  about: {
    slug: "about",
    eyebrow: "About Kingswood",
    title: "Education shaped by purpose",
    introduction:
      "Learn about Kingswood's identity, people, and commitment to preparing students for lives of service and leadership.",
    heading: "What Kingswood believes, and where it has been.",
    heroPrimary: { label: "See the School of Business", href: "/", cta: "about-hero-business" },
    heroSecondary: { label: "See the academics", href: "/academics", cta: "about-hero-academics" },
    sections: [
      {
        title: "Mission and identity",
        description: "Understand the Christian purpose and commitments that guide Kingswood.",
        external: { label: "Read the mission and beliefs on kingswood.edu", href: "https://www.kingswood.edu/mission-statement-of-faith", cta: "about-mission-external" },
      },
      {
        title: "History",
        description: "Learn about the people and events that shaped Kingswood.",
        external: { label: "Read the history on kingswood.edu", href: "https://www.kingswood.edu/history", cta: "about-history-external" },
      },
      {
        title: "School of Business",
        description: "See how business at Kingswood is being rebuilt around real work in every year of the degree.",
        internal: { label: "Open the School of Business", href: "/", cta: "about-card-business" },
      },
      {
        title: "Straight answers",
        description: "Read what students, parents, and pastors ask most, including which programs are open today.",
        internal: { label: "Read the questions and answers", href: "/#faq", cta: "about-card-faq" },
      },
    ],
    nextStep: {
      title: "Get to know Kingswood",
      description: "Tell us where you are and what you are wondering. A real person replies.",
      primary: { label: "Ask your questions", href: "/#contact", cta: "about-next-contact" },
      external: { label: "Contact the university on kingswood.edu", href: "https://www.kingswood.edu/contact", cta: "about-next-external" },
    },
    seo: { title: "About", description: "Learn about Kingswood University." },
  },
  academics: {
    slug: "academics",
    eyebrow: "Academics",
    title: "Prepare for your calling",
    introduction:
      "Explore undergraduate, graduate, ministry, and professional pathways designed to connect learning with purpose.",
    heading: "Pick the level, then pick the format.",
    heroPrimary: { label: "See the degrees", href: "/#degrees", cta: "academics-hero-degrees" },
    heroSecondary: { label: "Find my path", href: "/#finder", cta: "academics-hero-finder" },
    sections: [
      {
        title: "Undergraduate programs",
        description: "Start with the School of Business, where the four-year business pathway is set out year by year.",
        internal: { label: "Open the School of Business", href: "/", cta: "academics-card-business" },
        external: { label: "View all undergraduate programs on kingswood.edu", href: "https://www.kingswood.edu/academic-excellence/undergraduate-degrees", cta: "academics-undergraduate-external" },
      },
      {
        title: "Graduate programs",
        description: "Consider advanced study for leadership, ministry, and professional growth.",
        internal: { label: "See the online MBA", href: "/#mba", cta: "academics-card-mba" },
        external: { label: "View all graduate programs on kingswood.edu", href: "https://www.kingswood.edu/academic-excellence/graduate-degrees", cta: "academics-graduate-external" },
      },
      {
        title: "Online learning",
        description: "Review flexible learning options and determine which format fits your goals.",
        external: { label: "Explore online learning on kingswood.edu", href: "https://www.kingswood.edu/academic-excellence/online-degrees", cta: "academics-online-external" },
      },
      {
        title: "Faculty",
        description: "Learn about the people who teach and support students throughout their studies.",
        external: { label: "Meet the professors on kingswood.edu", href: "https://www.kingswood.edu/academic-excellence/meet-our-professors", cta: "academics-faculty-external" },
      },
    ],
    nextStep: {
      title: "Find the right academic path",
      description: "Admissions can confirm current program details, requirements, and availability for your situation.",
      primary: { label: "Plan your next step", href: "/admissions", cta: "academics-next-admissions" },
      external: { label: "Explore current programs on kingswood.edu", href: "https://www.kingswood.edu/academic-excellence", cta: "academics-next-external" },
    },
    seo: { title: "Academics", description: "Explore academic pathways at Kingswood University." },
  },
  admissions: {
    slug: "admissions",
    eyebrow: "Admissions",
    title: "Your next step starts here",
    introduction:
      "Get oriented to the application journey, understand costs, and connect with Kingswood for answers specific to you.",
    heading: "Apply, price it out, plan a visit.",
    heroPrimary: { label: "See the cost", href: "/#cost", cta: "admissions-hero-cost" },
    heroSecondary: { label: "Ask a question", href: "/#contact", cta: "admissions-hero-contact" },
    sections: [
      {
        title: "How to apply",
        description: "Find out which programs are open today and what you will need before you begin.",
        internal: { label: "Ask what applying involves", href: "/#contact", cta: "admissions-card-apply" },
        external: { label: "Start an application on kingswood.edu", href: "https://www.kingswood.edu/admissions/apply-now", cta: "admissions-apply-external" },
      },
      {
        title: "Tuition and financial aid",
        description: "Read Kingswood's published figures for on-campus study, with the source stated.",
        internal: { label: "See the published costs", href: "/#cost", cta: "admissions-card-cost" },
        external: { label: "Review the cost of attendance on kingswood.edu", href: "https://www.kingswood.edu/admissions/cost-of-attendance", cta: "admissions-cost-external" },
      },
      {
        title: "Visit campus",
        description: "Discover opportunities to experience the campus and meet the Kingswood community.",
        external: { label: "Plan a visit on kingswood.edu", href: "https://www.kingswood.edu/admissions/visit", cta: "admissions-visit-external" },
      },
      {
        title: "International students",
        description: "Find guidance for applying to Kingswood from outside Canada.",
        external: { label: "View international guidance on kingswood.edu", href: "https://www.kingswood.edu/admissions/international-students-ircc", cta: "admissions-international-external" },
      },
    ],
    nextStep: {
      title: "Talk with admissions",
      description: "Admissions can confirm requirements, deadlines, costs, and the best next action for your situation.",
      primary: { label: "Ask your questions", href: "/#contact", cta: "admissions-next-contact" },
      external: { label: "Meet the admissions team on kingswood.edu", href: "https://www.kingswood.edu/admissions/meet-our-team", cta: "admissions-next-external" },
    },
    seo: { title: "Admissions", description: "Plan your next step toward studying at Kingswood University." },
  },
  "student-life": {
    slug: "student-life",
    eyebrow: "Student life",
    title: "Learn in community",
    introduction:
      "University life extends beyond the classroom. Explore the community, experiences, and support that shape student life at Kingswood.",
    heading: "Where you live, eat, worship, and play.",
    heroPrimary: { label: "Ask about life here", href: "/#contact", cta: "student-life-hero-contact" },
    heroSecondary: { label: "Plan your next step", href: "/admissions", cta: "student-life-hero-admissions" },
    sections: [
      {
        title: "Residence life",
        description: "Get a sense of daily life and the relationships that form while living on campus.",
        external: { label: "Explore residences on kingswood.edu", href: "https://www.kingswood.edu/student-life/residences", cta: "student-life-residences-external" },
      },
      {
        title: "Dining",
        description: "Review current information about eating and gathering on campus.",
        external: { label: "Explore dining on kingswood.edu", href: "https://www.kingswood.edu/student-life/dining-commons", cta: "student-life-dining-external" },
      },
      {
        title: "Faith and formation",
        description: "Explore how worship and spiritual formation are part of the Kingswood experience.",
        external: { label: "Explore chapel on kingswood.edu", href: "https://www.kingswood.edu/student-life/chapel-and-pulse-playlist", cta: "student-life-chapel-external" },
      },
      {
        title: "Athletics and recreation",
        description: "Learn about ways students can participate, connect, and stay active, including the sports and recreation degree.",
        internal: { label: "See the sports and recreation degree", href: "/#degrees", cta: "student-life-card-degrees" },
        external: { label: "Explore athletics on kingswood.edu", href: "https://www.kingswood.edu/student-life/athletics", cta: "student-life-athletics-external" },
      },
    ],
    nextStep: {
      title: "Experience Kingswood for yourself",
      description: "A visit is the best way to ask questions and understand whether Kingswood feels like the right fit.",
      primary: { label: "Plan your next step", href: "/admissions", cta: "student-life-next-admissions" },
      external: { label: "Plan a campus visit on kingswood.edu", href: "https://www.kingswood.edu/admissions/visit", cta: "student-life-next-external" },
    },
    seo: { title: "Student Life", description: "Explore community and student life at Kingswood University." },
  },
} as const satisfies Record<InstitutionalPageSlug, InstitutionalPageData>;
