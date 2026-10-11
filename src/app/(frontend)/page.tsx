import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { ProgramFinder } from "@/components/ProgramFinder";
import { InquiryForm } from "@/components/InquiryForm";
import { Expand } from "@/components/Expand";
import { ShareButton } from "@/components/ShareButton";
import { Tracker } from "@/components/Tracker";
import { costFacts, costSourceLine } from "@/content/facts";

export const metadata: Metadata = {
  title: "School of Business",
  description:
    "Business, sports and recreation, and entrepreneurship degrees at Kingswood University in Sussex, New Brunswick. Real work every year, faith built in, and costs stated up front.",
};

/** Review mode shows the approval banner and status labels. Set NEXT_PUBLIC_REVIEW_MODE=false only after programs are approved. */
const reviewMode = process.env.NEXT_PUBLIC_REVIEW_MODE !== "false";

type Status = "Confirmed" | "Proposed" | "Exploratory" | "Hypothesis";

function StatusPill({ status }: { status: Status }) {
  if (!reviewMode) return null;
  return <span className={`status-pill status-${status.toLowerCase()}`}>{status}</span>;
}

const whyKingswood = [
  { title: "Real work from semester one", copy: "Fundraisers, community events, client projects, and campus businesses. You do business from the start." },
  { title: "AI in every business class", copy: "You build AI workflows that save time or raise sales, and you are assessed on the results." },
  { title: "A portfolio, not only grades", copy: "Venture financials, customer results, and client reports show an employer or a lender what you can do." },
  { title: "A network built into the degree", copy: "Mentors and outside business owners review your work before you graduate." },
];

const stages = [
  {
    id: "year-1",
    label: "Year 1",
    credential: "Certificate",
    title: "One shared start",
    summary: "Every student begins in Elements, Kingswood's faith-and-adventure first year, with a business track or a ministry track.",
    credits: [
      ["12", "Faith and character formation"],
      ["6", "Electives, including Outdoor Education 1013 and 1023"],
      ["12", "Business track or ministry track"],
    ],
    doing: [
      "Run the Balloon Fiesta and Christmas tree fundraisers as real ventures with a profit and loss statement",
      "Plan a community event with a budget and a results report",
      "Build a brand and marketing plan for a real local business",
    ],
    proof: "Portfolio, marketing certification, mentor evaluations, client report",
    note: "The business track earns an introductory business certificate. The ministry track earns the Elements certificate.",
  },
  {
    id: "year-2",
    label: "Year 2",
    credential: "Associate degree",
    title: "Choose a direction",
    summary: "Three associate degrees share a common core, then split: Sports and Recreation Management, Entrepreneurship, or Management.",
    credits: [
      ["15", "Common core, shared by all three"],
      ["15", "Your chosen stream"],
    ],
    doing: [
      "Research a school or campus business while working in it",
      "Design a business plan, including ventures that solve a named problem",
      "Pitch at a year-end showcase judged by a panel",
    ],
    proof: "Research report, business plan, pitch",
    note: "The audience vote picks only the seed award. A panel judges every pitch.",
  },
  {
    id: "years-3-4",
    label: "Years 3 and 4",
    credential: "Bachelor's degree",
    title: "Run something real",
    summary: "Choose to run a campus business or start your own, then finish with a review by a panel that includes outside business owners.",
    credits: [
      ["9", "Capstone: internship, project, or an international client project"],
      ["120", "Credits across the four years"],
    ],
    doing: [
      "Run a campus business from its manual, or launch your own venture",
      "Year 4: grow it, then defend your portfolio",
    ],
    proof: "Business or venture financials, final panel review, client results",
    note: "The certificate and associate are exit points on the way to the bachelor's, not a discount. The path stays four years and 120 credits.",
  },
];

const degrees = [
  {
    title: "Sports and Recreation Management",
    credential: "Bachelor of Arts",
    pitch: "Turn the sport and the outdoors you love into a career. Manage programs, events, and facilities, and run them for real.",
    courses: ["Introduction to Leisure, Sport and Recreation Management", "Sports Marketing and Promotion", "Managing Events and Facilities", "Experience Design and Delivery", "Financial Management in Sports and Recreation"],
  },
  {
    title: "Entrepreneurship",
    credential: "Bachelor of Arts",
    pitch: "Start something that solves a real problem. Build the offer, test it with customers, and launch with sponsor support.",
    courses: ["New Venture Creation", "Social Innovation and Social Finance", "Personal Branding", "Digital Marketing and E-Commerce", "Sales Management"],
  },
  {
    title: "Management",
    credential: "Bachelor of Arts",
    pitch: "Lead people and operations. Learn strategy, projects, and technology, then run a business with a team and a budget.",
    courses: ["Strategic Management and Planning", "Project Management", "Financial Management", "Integrated Marketing Communication", "Business Technology and AI"],
  },
];

const labStages = [
  { year: "Year 1", name: "Discern", doing: "Learn business and calling. Shadow a campus business. Interview customers." },
  { year: "Year 2", name: "Prototype", doing: "Take a role in a campus business. Test one offer with real customers." },
  { year: "Year 3", name: "Operate", doing: "Run a campus business under supervision, or take your own venture to its first customers." },
  { year: "Year 4", name: "Launch", doing: "Launch your venture with sponsor support, or manage a campus business and plan your next step." },
];

const competencies = [
  ["Customer and market insight", "Interviews, proven demand, retention data"],
  ["Offer and business model design", "Tested offers, pricing decisions, results"],
  ["Operations and quality", "Performance against the business's own standards"],
  ["Financial management", "Profit and loss, cash plan, variance explanations"],
  ["Leadership and team management", "Peer and supervisor reviews, coaching records"],
  ["Sales, marketing, and AI-enabled work", "Campaign results, documented AI workflows"],
  ["Risk, ethics, and compliance", "Checklists, incident responses, ethics case defences"],
  ["Vocation and stewardship", "Reflective portfolio, service outcomes, mentor assessment"],
];

const faqs = [
  { q: "Which programs can I apply for today?", a: "The current B.A. in Business Management and the online MBA are available now. The programs on this page marked Proposed are in development and are not yet open for admission." },
  { q: "What does it cost?", a: "See the cost section above for Kingswood's published figures. Ask us about your situation, and an enrolment counsellor will tell you what applies to you." },
  { q: "Can I study business and still prepare for ministry?", a: "That is the design. Year 1 offers a ministry track, the faith questions run through every degree, and the MBA ends with a Business as Mission capstone." },
  { q: "I do not know what I want to study yet.", a: "You do not have to decide at once. Every student starts in the same first year, and you choose a degree in Year 2." },
  { q: "I live outside Canada. Can I study with Kingswood?", a: "Tell us where you are using the form below. We will confirm your study options, including online study, and any permit requirements for your situation." },
  { q: "What if I want to talk to a person first?", a: "Use the form below. A real person replies to the email you give us." },
];

const evidenceLegend: [Status, string][] = [
  ["Confirmed", "The online MBA launched in May 2026."],
  ["Proposed", "The four-year pathway, the three bachelor's degrees, three associate degrees, and the competency model."],
  ["Exploratory", "The Business Lab, and sponsored cohorts open to MBA students and community entrepreneurs."],
  ["Hypothesis", "Campus businesses run by students, and the promise of a business track record as a recruiting advantage. Demand is not yet tested."],
];

const room = costFacts.find((f) => f.label.startsWith("Room"))?.value ?? "listed in the cost section";
const meals = costFacts.find((f) => f.label.startsWith("Meal"))?.value ?? "listed in the cost section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      {reviewMode && (
        <div className="review-banner" role="note">
          <div className="container">
            <strong>Proposed programs for review.</strong>{" "}
            Not yet approved by Kingswood&rsquo;s Academic Cabinet. Credit values are illustrative until checked against the catalogue.
          </div>
        </div>
      )}
      <main id="main-content">
        <section className="hero sob-hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow light">KINGSWOOD UNIVERSITY · SCHOOL OF BUSINESS</p>
              <h1 className="sob-title">Graduate with a track record, <em>not only a degree.</em></h1>
              <p className="lead">
                Business degrees in sports and recreation, entrepreneurship, and management. Real work every year, faith built in, and a clear price up front.
              </p>
              <div className="actions">
                <Link className="button" href="#finder" data-cta="hero-finder">Find my path</Link>
                <Link className="button ghost" href="#cost" data-cta="hero-cost">See the cost</Link>
              </div>
            </div>
            <div className="hero-visual">
              <Image
                src="/assets/business-students.jpg"
                alt="Business students collaborating around a table"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 42vw"
              />
              <aside className="hero-proof" aria-label="Program at a glance">
                <span><strong>4 years, 120 credits</strong>Three credentials earned on the way</span>
                <span><strong>3 bachelor&rsquo;s degrees</strong>Sports and Recreation, Entrepreneurship, Management</span>
                <span><strong>Real work every year</strong>Judged on evidence, not seat time</span>
              </aside>
            </div>
          </div>
        </section>

        <section className="identity" aria-label="About Kingswood University">
          <div className="container identity-inner">
            <p><strong>Kingswood University</strong> · Sussex, New Brunswick</p>
            <p>A Christian university in the Wesleyan tradition. Personal, practical, purpose-driven.</p>
          </div>
        </section>

        <section id="why" className="section">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow">WHY KINGSWOOD</p>
                <h2>Learn business by <em>doing business.</em></h2>
              </div>
              <p>
                Projects are the start. At Kingswood they lead to running a real business or launching your own. <StatusPill status="Proposed" />
              </p>
            </div>
            <ul className="why-grid">
              {whyKingswood.map((item, index) => (
                <li key={item.title}>
                  <span className="why-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="container section finder-wrap">
          <ProgramFinder reviewMode={reviewMode} />
        </div>

        <section id="cost" className="section cream">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow">WHAT IT COSTS</p>
                <h2>The price, <em>stated up front.</em></h2>
              </div>
              <p>These are Kingswood&rsquo;s published figures for on-campus study. Over 91% of students receive aid, and an enrolment counsellor can tell you what applies to you.</p>
            </div>
            <dl className="cost-grid">
              {costFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd><strong>{fact.value}</strong>{fact.note && <span>{fact.note}</span>}</dd>
                </div>
              ))}
            </dl>
            <p className="footnote-dark">
              {costSourceLine} {reviewMode ? "Review note: the source page does not name an academic year, and no owner has confirmed these figures. Pricing for the proposed programs is not set." : "Rates change. Confirm current figures with admissions."}
            </p>
            <div className="actions">
              <Link className="button" href="#contact" data-cta="cost-contact">Ask about my situation</Link>
            </div>
          </div>
        </section>

        <section id="calling" className="section">
          <div className="container split">
            <div>
              <p className="eyebrow">BUSINESS AND CALLING</p>
              <h2>Called to ministry? <em>Business is not a detour.</em></h2>
            </div>
            <div>
              <p className="lead dark-lead">
                Pastors, church planters, and missionaries run budgets, lead teams, and often start small enterprises. Kingswood prepares you for both.
              </p>
              <ul className="check-list">
                <li>Year 1 includes a ministry track that earns the Elements certificate <StatusPill status="Proposed" /></li>
                <li>Faith questions run through every degree, and vocation is one of the eight things you are assessed on</li>
                <li>The online MBA ends with a Business as Mission capstone <StatusPill status="Confirmed" /></li>
              </ul>
              <Link className="button" href="#finder" data-cta="calling-finder">Find my path</Link>
            </div>
          </div>
        </section>

        <section id="degrees" className="section cream">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow">THREE BACHELOR&rsquo;S DEGREES</p>
                <h2>Pick the business you want to <em>build or lead.</em></h2>
              </div>
              <p>
                Three distinct degrees. Each includes a shared business core, the Business Lab, and a capstone experience. <StatusPill status="Proposed" />
              </p>
            </div>
            <div className="degree-grid">
              {degrees.map((degree) => (
                <article key={degree.title} className="degree-card">
                  <p className="tag">{degree.credential}</p>
                  <h3>{degree.title}</h3>
                  <p>{degree.pitch}</p>
                  <p className="mini-label">Year 2 courses</p>
                  <ul>{degree.courses.map((course) => <li key={course}>{course}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pathway" className="section dark">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow light">THE FOUR-YEAR PATHWAY</p>
                <h2>One shared first year. <em>Three ways forward.</em></h2>
              </div>
              <p>
                Every student starts together. Each stage earns a credential, so there are exit points without ever shortening the degree. <StatusPill status="Proposed" />
              </p>
            </div>
            <ol className="stage-list">
              {stages.map((stage) => (
                <li key={stage.id} id={stage.id} className="stage">
                  <div className="stage-head">
                    <p className="stage-year">{stage.label}</p>
                    <p className="stage-credential">{stage.credential}</p>
                  </div>
                  <div className="stage-body">
                    <h3>{stage.title}</h3>
                    <p>{stage.summary}</p>
                    <ul className="credit-split" aria-label={`${stage.label} credit split`}>
                      {stage.credits.map(([credits, label]) => (
                        <li key={label}><strong>{credits}</strong><span>{label}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="stage-detail">
                    <Expand summary="What you do and how you are assessed" className="on-dark">
                      <p className="mini-label">Learn by doing</p>
                      <ul>{stage.doing.map((line) => <li key={line}>{line}</li>)}</ul>
                      <p className="mini-label">Proof of what you can do</p>
                      <p>{stage.proof}</p>
                      <p className="stage-note">{stage.note}</p>
                    </Expand>
                  </div>
                </li>
              ))}
            </ol>
            <p className="footnote">Recommended calendar: two 15-week terms, September to May, to be confirmed against the academic calendar.</p>
          </div>
        </section>

        <section id="lab" className="section">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow">THE BUSINESS LAB</p>
                <h2>Where the degree becomes <em>a business.</em></h2>
              </div>
              <p>
                A four-stage path runs across every degree. You move from learning how a campus business runs, to running one, to launching your own. <StatusPill status="Exploratory" />
              </p>
            </div>
            <ol className="lab-stages">
              {labStages.map((stage) => (
                <li key={stage.name}>
                  <p className="stage-year">{stage.year}</p>
                  <h3>{stage.name}</h3>
                  <p>{stage.doing}</p>
                </li>
              ))}
            </ol>
            <Expand summary="Campus businesses and taking one with you" className="on-light">
              <div className="lab-columns">
                <article className="lab-panel">
                  <p className="eyebrow">CAMPUS BUSINESSES <StatusPill status="Hypothesis" /></p>
                  <h3>Run from a written manual.</h3>
                  <p>Each campus business has an operating manual, training, pricing, suppliers, and measures. You learn it, then you run it.</p>
                  <p className="mini-label">Candidates for the first one</p>
                  <ul>
                    <li>Summer campus accommodation</li>
                    <li>Property services: cleaning, grounds, and turnovers</li>
                    <li>Camps and outdoor adventure programming</li>
                    <li>Digital operations for churches and small organizations</li>
                  </ul>
                  <p className="stage-note">A first business is planned for summer 2027, subject to legal, tax, insurance, and approval review.</p>
                </article>
                <article className="lab-panel">
                  <p className="eyebrow">TWO PATHS IN YEAR 3 <StatusPill status="Proposed" /></p>
                  <h3>Run one, or start your own.</h3>
                  <p>Some students lead a campus business against a real profit and loss statement under supervision. Others take their own idea to its first customers and launch with sponsor support.</p>
                  <h3>Take a business with you.</h3>
                  <p>Graduates leave with a track record and the option to license, buy, or replicate a campus business. It is an option, not a promise of ownership, and each route needs legal and tax review.</p>
                </article>
              </div>
            </Expand>
          </div>
        </section>

        <section id="families" className="section purpose">
          <div className="container split">
            <div>
              <p className="eyebrow light">FOR PARENTS AND PASTORS</p>
              <h2>What to know before <em>you recommend us.</em></h2>
              <ShareButton />
            </div>
            <div>
              <ul className="question-list plain">
                <li><strong>Faith.</strong> Christian formation is written into the first year and into how every student is assessed.</li>
                <li><strong>Outcomes.</strong> Every year ends with proof of what a student can do: a portfolio, client results, and financials.</li>
                <li><strong>Cost.</strong> Published figures are in the cost section, with the aid Kingswood reports.</li>
                <li><strong>Living on campus.</strong> A standard double room is {room.toLowerCase()}, and meal plans are {meals}.</li>
                <li><strong>A person to ask.</strong> Use the form below. A real person replies.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="mba" className="section cream">
          <div className="container mba-grid">
            <div className="mba-image">
              <Image
                src="/assets/mba-student.jpg"
                alt="MBA student working on a laptop in a cafe"
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
              />
            </div>
            <div>
              <p className="eyebrow">MASTER OF BUSINESS ADMINISTRATION <StatusPill status="Confirmed" /></p>
              <h2>Lead with integrity. Build with strategy. <em>Serve with purpose.</em></h2>
              <p className="lead dark-lead">
                Launched online in May 2026 for professionals who want broader responsibility across strategy, finance, operations, people, and innovation.
              </p>
              <ul className="check-list">
                <li>Strategic and financial decision-making</li>
                <li>Operations, people, and organizational leadership</li>
                <li>Practical, AI-aware business capability</li>
                <li>Business as Mission capstone</li>
              </ul>
              <p className="stage-note">
                Proposed: MBA students and community entrepreneurs join sponsored Business Lab cohorts alongside undergraduates. <StatusPill status="Exploratory" />
              </p>
              <a className="button" href="https://www.kingswood.edu/mba" data-cta="mba-link">Explore the MBA</a>
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container faq">
            <p className="eyebrow">QUESTIONS</p>
            <h2>Straight answers.</h2>
            {faqs.map((item) => (
              <details key={item.q} className="more on-light">
                <summary>{item.q}</summary>
                <div className="more-body"><p>{item.a}</p></div>
              </details>
            ))}
          </div>
        </section>

        <section id="competencies" className="section dark">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow light">HOW YOU ARE ASSESSED</p>
                <h2>Eight skills. <em>Three levels.</em></h2>
              </div>
              <p>
                You move from Emerging to Proficient to Ready-to-own, judged on real results and outside panels, not seat time. <StatusPill status="Proposed" />
              </p>
            </div>
            <Expand summary="See the eight skills and the evidence for each" className="on-dark">
              <ul className="competency-grid">
                {competencies.map(([name, evidence]) => (
                  <li key={name}><h3>{name}</h3><p>{evidence}</p></li>
                ))}
              </ul>
            </Expand>
          </div>
        </section>

        <section id="contact" className="section cream">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">TALK TO A PERSON</p>
              <h2>Ask your questions. <em>A real person replies.</em></h2>
              <p className="lead dark-lead">Students, parents, and pastors are all welcome. Tell us where you are and what you are wondering.</p>
            </div>
            <div className="contact-card">
              <InquiryForm source="page-bottom" reviewMode={reviewMode} />
            </div>
          </div>
        </section>

        {reviewMode && (
          <section id="status" className="section">
            <div className="container">
              <div className="split-heading">
                <div>
                  <p className="eyebrow">REVIEW ONLY</p>
                  <h2>Every claim carries <em>its status.</em></h2>
                </div>
                <p>This key and the status labels appear only in review mode. Nothing below the Confirmed line is approved, priced, or open for admission.</p>
              </div>
              <dl className="legend">
                {evidenceLegend.map(([status, text]) => (
                  <div key={status}>
                    <dt><StatusPill status={status} /></dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>Kingswood University</strong>
            <p>Sussex, New Brunswick. Personal, practical, purpose-driven Christian education.</p>
            {reviewMode && <p>Concept demo for internal review. Programs shown as proposed are not approved.</p>}
          </div>
          <div>
            <a href="https://www.kingswood.edu/">University home</a>
            <a href="https://www.kingswood.edu/admissions">Admissions</a>
            <a href="https://www.kingswood.edu/mba">MBA</a>
          </div>
        </div>
      </footer>
      <nav className="mobile-actions" aria-label="Enrollment actions">
        <a href="#finder" data-cta="mobile-finder">Find my path</a>
        <a href="https://www.kingswood.edu/admissions/apply-now" data-cta="mobile-apply">Apply</a>
      </nav>
      <Tracker />
    </>
  );
}
