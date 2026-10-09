import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "School of Business",
  description:
    "Three bachelor's degrees, one four-year stackable pathway, and a Business Lab where students run real ventures. Proposed programs for review at Kingswood University.",
};

type Status = "Confirmed" | "Proposed" | "Exploratory" | "Hypothesis";

function StatusPill({ status }: { status: Status }) {
  return <span className={`status-pill status-${status.toLowerCase()}`}>{status}</span>;
}

const whyKingswood = [
  { title: "Real work in every year", copy: "Fundraisers run as ventures, community events, client projects, and campus businesses. Students do business from the first semester." },
  { title: "AI in every business class", copy: "Students build and document AI workflows that save time or raise sales, and are assessed on the results." },
  { title: "A portfolio, not only a transcript", copy: "Venture financials, customer results, and client reports become the evidence a graduate shows an employer or a lender." },
  { title: "A network built into the degree", copy: "Sponsors, mentors, and outside panelists review student work before graduation, so graduates leave known." },
  { title: "Assessed on competence", copy: "Eight competencies, three levels, judged on evidence rather than seat time." },
];

const stages = [
  {
    id: "year-1",
    label: "Year 1",
    credential: "Certificate",
    title: "One shared start",
    summary: "Every student begins in the same Elements-based year: community, formation, adventure, service, and work duty, assessed as apprenticeship.",
    credits: [
      ["12", "Formation"],
      ["6", "Electives, including Outdoor Education 1013 and 1023"],
      ["12", "Business track"],
    ],
    doing: [
      "Run the Balloon Fiesta and Christmas tree fundraisers as real ventures with a profit and loss statement",
      "Plan a community event with a budget and a results report",
      "Build a brand and marketing plan for a real local business",
    ],
    proof: "Portfolio, marketing certification, mentor evaluations, client report",
    note: "The business track earns an introductory business certificate. A Praxis track for students called to ministry runs alongside and earns the Elements certificate.",
  },
  {
    id: "year-2",
    label: "Year 2",
    credential: "Associate degree",
    title: "Choose a direction",
    summary: "Three associate degrees share a common core, then split into a stream: Sports and Recreation Management, Entrepreneurship, or Management.",
    credits: [
      ["15", "Common core, shared by all three"],
      ["15", "Associate stream"],
    ],
    doing: [
      "Research a school or campus business while working in it",
      "Design a business plan, including social ventures that solve a named problem",
      "Pitch at a year-end showcase judged by a competency panel",
    ],
    proof: "Research report, business plan, pitch",
    note: "The audience vote picks only the seed award. A competency panel assesses every pitch.",
  },
  {
    id: "years-3-4",
    label: "Years 3 and 4",
    credential: "Bachelor's degree",
    title: "Run something real",
    summary: "Students choose a path inside the Business Lab and finish with a ready-to-own review before a panel that includes outside business owners.",
    credits: [
      ["9", "Capstone: internship, capstone project, or international client project"],
      ["120", "Credits in total across the four years"],
    ],
    doing: [
      "Operator path: run a campus unit from its playbook",
      "Founder path: launch your own venture",
      "Year 4: scale the unit or venture, then defend your portfolio",
    ],
    proof: "Unit or venture financials, ready-to-own review, final panel review, client results",
    note: "The certificate and associate are exit points on the way to the bachelor's, not a discount. The path stays four years and 120 credits.",
  },
];

const degrees = [
  {
    title: "Sports and Recreation Management",
    credential: "Bachelor of Arts",
    pitch: "Turn the industry you love into the career you are building. Manage programs, events, facilities, and community impact, and run them for real.",
    courses: [
      "Introduction to Leisure, Sport and Recreation Management",
      "Sports Marketing and Promotion",
      "Managing Events and Facilities",
      "Experience Design and Delivery",
      "Financial Management in Sports and Recreation",
    ],
  },
  {
    title: "Entrepreneurship",
    credential: "Bachelor of Arts",
    pitch: "Start something that solves a named problem. Build the offer, test it with real customers, and launch with sponsor support.",
    courses: [
      "New Venture Creation",
      "Social Innovation and Social Finance",
      "Personal Branding",
      "Digital Marketing and E-Commerce",
      "Sales Management",
    ],
  },
  {
    title: "Management",
    credential: "Bachelor of Arts",
    pitch: "Lead people and operations. Learn strategy, projects, and technology, then run a unit with a team and a budget.",
    courses: [
      "Strategic Management and Planning",
      "Project Management",
      "Financial Management",
      "Integrated Marketing Communication",
      "Business Technology and AI",
    ],
  },
];

const labStages = [
  { year: "Year 1", name: "Discern", doing: "Foundations of business and vocation. Shadow shifts in a unit. Customer interviews.", proof: "Portfolio entry, shadow log, vocation statement" },
  { year: "Year 2", name: "Prototype", doing: "Take a station in a unit. Test one offer with real customers. Build a pro forma.", proof: "Customer evidence, first unit measures, mentor review" },
  { year: "Year 3", name: "Operate", doing: "Choose a path. Founders run a venture to a first audience. Operators lead a unit team against a unit profit and loss statement.", proof: "Unit or venture financials, external panel review" },
  { year: "Year 4", name: "Launch", doing: "Founders launch with sponsor support. Operators manage the unit and prepare the transition. Both defend a portfolio.", proof: "Ready-to-own rating on all eight competencies" },
];

const competencies = [
  ["Customer and market insight", "Interview sets, validated demand, retention data"],
  ["Offer and business model design", "Tested offers, pricing decisions, results"],
  ["Operations and quality", "Performance against playbook standards"],
  ["Financial management", "Unit profit and loss, cash plan, variance explanations"],
  ["Leadership and team management", "Peer and supervisor reviews, coaching records"],
  ["Sales, marketing, and AI-enabled work", "Campaign results, documented AI workflows"],
  ["Risk, ethics, and compliance", "Compliance checklists, incident responses, ethics case defences"],
  ["Vocation and stewardship", "Reflective portfolio, service outcomes, mentor assessment"],
];

const evidenceLegend: [Status, string][] = [
  ["Confirmed", "The online MBA launched in May 2026."],
  ["Proposed", "The four-year pathway, the three bachelor's degrees, three associate degrees, and the competency model."],
  ["Exploratory", "The Business Lab, and a sponsored Lab cohort open to MBA students and community entrepreneurs."],
  ["Hypothesis", "Campus operating units, and the promise of a business track record as a recruiting advantage. Demand is not yet tested."],
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className="review-banner" role="note">
        <div className="container">
          <strong>Proposed programs for review.</strong> Not yet approved by Kingswood&rsquo;s Academic Cabinet. Credit values are illustrative until checked against the catalogue.
        </div>
      </div>
      <main id="main-content">
        <section className="hero sob-hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow light">KINGSWOOD UNIVERSITY · SCHOOL OF BUSINESS</p>
              <h1 className="sob-title">Graduate with a track record, <em>not only a degree.</em></h1>
              <p className="lead">
                Three bachelor&rsquo;s degrees in sports and recreation, entrepreneurship, and management. One four-year path where every stage is assessed on real work for real customers.
              </p>
              <div className="actions">
                <Link className="button" href="#pathway">See the pathway</Link>
                <Link className="button ghost" href="#degrees">Explore the degrees</Link>
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
                <span><strong>4 years, 120 credits</strong>Nothing shortened, three credentials earned on the way</span>
                <span><strong>3 bachelor&rsquo;s degrees</strong>Sports and Recreation, Entrepreneurship, Management</span>
                <span><strong>8 competencies</strong>Assessed on evidence, not seat time</span>
              </aside>
            </div>
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
                Project-based learning is the starting point, not the finish line. At Kingswood, projects lead to ownership of a running venture or campus unit. <StatusPill status="Proposed" />
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

        <section id="pathway" className="section dark">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow light">THE FOUR-YEAR PATHWAY</p>
                <h2>One shared first year. <em>Three ways forward.</em></h2>
              </div>
              <p>
                Every student starts in the same Elements-based year. Each stage earns a credential, so the path has exit points without ever shortening the degree. <StatusPill status="Proposed" />
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
                    <p className="mini-label">Learn by doing</p>
                    <ul>{stage.doing.map((line) => <li key={line}>{line}</li>)}</ul>
                    <p className="mini-label">Proof of competency</p>
                    <p>{stage.proof}</p>
                    <p className="stage-note">{stage.note}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="footnote">Recommended calendar: two 15-week terms, September to May, to be confirmed against the academic calendar.</p>
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
                Three distinct degrees, not minors on one general degree. Each includes the shared business core, the Business Lab, and a capstone experience. <StatusPill status="Proposed" />
              </p>
            </div>
            <div className="degree-grid">
              {degrees.map((degree) => (
                <article key={degree.title} className="degree-card">
                  <p className="tag">{degree.credential}</p>
                  <h3>{degree.title}</h3>
                  <p>{degree.pitch}</p>
                  <p className="mini-label">Year 2 stream</p>
                  <ul>{degree.courses.map((course) => <li key={course}>{course}</li>)}</ul>
                </article>
              ))}
            </div>
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
                A four-stage venture pathway runs across every degree. Students rotate into campus operating units, then lead, then choose to launch their own venture or run a unit. <StatusPill status="Exploratory" />
              </p>
            </div>
            <ol className="lab-stages">
              {labStages.map((stage) => (
                <li key={stage.name}>
                  <p className="stage-year">{stage.year}</p>
                  <h3>{stage.name}</h3>
                  <p>{stage.doing}</p>
                  <p className="mini-label">Evidence to advance</p>
                  <p>{stage.proof}</p>
                </li>
              ))}
            </ol>
            <div className="lab-columns">
              <article className="lab-panel">
                <p className="eyebrow">OPERATING UNITS <StatusPill status="Hypothesis" /></p>
                <h3>Campus businesses run from playbooks.</h3>
                <p>Each unit has an operating manual, training modules, pricing, a supplier list, measures, a compliance checklist, and brand standards. Students learn the playbook, then run it.</p>
                <p className="mini-label">Candidate first units</p>
                <ul>
                  <li>Summer campus accommodation, the leading candidate for the first unit</li>
                  <li>Property services: cleaning, grounds, and turnovers</li>
                  <li>Camps and outdoor adventure programming</li>
                  <li>Digital operations for churches and small organizations</li>
                </ul>
                <p className="stage-note">A first unit is planned for summer 2027, subject to legal, tax, insurance, and approval review.</p>
              </article>
              <article className="lab-panel">
                <p className="eyebrow">TWO PATHS IN YEAR 3 <StatusPill status="Proposed" /></p>
                <h3>Founder or operator.</h3>
                <p><strong>Founders</strong> take their own idea to a first audience and launch with sponsor support. <strong>Operators</strong> lead a unit team against a real profit and loss statement under supervision.</p>
                <h3>Take a unit with you.</h3>
                <p>Graduates leave with an operating track record and the option to license, buy, or replicate a unit. It is an option, not a promise of ownership, and each route is subject to legal and tax review.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="competencies" className="section dark">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow light">COMPETENCY-BASED</p>
                <h2>Eight competencies. <em>Three levels.</em></h2>
              </div>
              <p>
                Students move from Emerging to Proficient to Ready-to-own, judged on unit financials, customer results, portfolios, and outside panels. Ready-to-own on all eight is the gate for taking a unit out of Kingswood. <StatusPill status="Proposed" />
              </p>
            </div>
            <ul className="competency-grid">
              {competencies.map(([name, evidence]) => (
                <li key={name}><h3>{name}</h3><p>{evidence}</p></li>
              ))}
            </ul>
          </div>
        </section>

        <section id="mba" className="section">
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
                Launched online in May 2026 for professionals who want broader responsibility across strategy, finance, operations, people, and innovation, without separating ambition from values.
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
              <a className="button" href="https://www.kingswood.edu/mba">Explore the MBA</a>
            </div>
          </div>
        </section>

        <section id="purpose" className="section purpose">
          <div className="container split">
            <div>
              <p className="eyebrow light">FAITH AND BUSINESS</p>
              <h2>Leadership decisions are never value-neutral.</h2>
            </div>
            <div>
              <p className="lead">Kingswood brings faith into the decisions leaders actually make. Christian formation is written into the vocation competency and into every final panel.</p>
              <ul className="question-list">
                <li>What is profit for?</li>
                <li>What do leaders owe people?</li>
                <li>What makes growth good?</li>
                <li>What does stewardship require?</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="status" className="section cream">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow">WHAT IS SETTLED, WHAT IS NOT</p>
                <h2>Every claim carries <em>its status.</em></h2>
              </div>
              <p>This page presents a concept for review. Nothing below the Confirmed line is approved, priced, or open for admission.</p>
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
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>Kingswood University</strong>
            <p>Personal, practical, purpose-driven Christian education.</p>
            <p>Concept demo for internal review. Programs shown as proposed are not approved.</p>
          </div>
          <div>
            <a href="https://www.kingswood.edu/">University home</a>
            <a href="https://www.kingswood.edu/admissions">Admissions</a>
            <a href="https://www.kingswood.edu/mba">MBA</a>
          </div>
        </div>
      </footer>
      <nav className="mobile-actions" aria-label="Enrollment actions">
        <a href="https://www.kingswood.edu/admissions">Request information</a>
        <a href="https://www.kingswood.edu/admissions/apply-now">Apply</a>
      </nav>
    </>
  );
}
