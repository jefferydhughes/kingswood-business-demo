import Link from "next/link";
import { ProgramFinder } from "@/components/ProgramFinder";
import { SiteHeader } from "@/components/SiteHeader";

const programs = [
  { level: "Undergraduate", title: "B.A. Business Management", copy: "Build practical capability in marketing, entrepreneurship, strategy, sales, projects, and leadership.", href: "https://www.kingswood.edu/academic-excellence/undergraduate-degrees/bachelor-of-arts-in-business-management" },
  { level: "Undergraduate", title: "B.A. Sports & Recreation Management", copy: "Learn the business behind sports: leadership, events, facilities, marketing, finance, and field experience.", href: "https://www.kingswood.edu/sports-recreation-management" },
  { level: "Graduate — verify before publication", title: "Master of Organizational Leadership", copy: "Develop judgment for culture, communication, change, stewardship, and developing other leaders.", href: "#graduate" },
  { level: "Graduate", title: "Master of Business Administration", copy: "Strengthen whole-organization leadership across strategy, finance, operations, people, and innovation.", href: "https://www.kingswood.edu/mba" }
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow light">KINGSWOOD UNIVERSITY · BUSINESS</p>
              <h1>Build what <em>matters.</em></h1>
              <p className="lead">Learn business by doing business—and learn what business is for. Build the skill, experience, and judgment to lead people, grow organizations, and create meaningful impact.</p>
              <div className="actions">
                <Link className="button" href="#programs">Explore programs</Link>
                <Link className="button ghost" href="#program-finder">Find my program</Link>
              </div>
            </div>
            <aside className="hero-proof" aria-label="Kingswood advantages">
              <span><strong>Personal</strong>Small classes and faculty access</span>
              <span><strong>Practical</strong>Applied projects and experience</span>
              <span><strong>Purpose-driven</strong>Faith integrated with leadership</span>
            </aside>
          </div>
        </section>

        <section id="programs" className="section">
          <div className="container">
            <div className="split-heading">
              <div><p className="eyebrow">FIND YOUR PATH</p><h2>Business education for every stage.</h2></div>
              <p>Kingswood offers a clear next step with practical learning, personal faculty access, and a Christian worldview that treats leadership as stewardship.</p>
            </div>
            <div className="program-grid">
              {programs.map((program, index) => (
                <article className={`program-card tone-${index + 1}`} key={program.title}>
                  <p className="tag">{program.level}</p>
                  <h3>{program.title}</h3>
                  <p>{program.copy}</p>
                  <a href={program.href}>Explore program <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section dark">
          <div className="container split">
            <div><p className="eyebrow light">BUSINESS SCHOOL SHOULD FEEL LIKE BUSINESS</p><h2>You will not just learn it. <em>You will use it.</em></h2></div>
            <ol className="numbered">
              <li><span>01</span><div><h3>Real experience</h3><p>Applied projects and professional contexts connect ideas to consequential work.</p></div></li>
              <li><span>02</span><div><h3>Real decisions</h3><p>Practice strategy, marketing, finance, leadership, and problem-solving.</p></div></li>
              <li><span>03</span><div><h3>Real skills</h3><p>Build communication, planning, digital, sales, and AI-aware decision capability.</p></div></li>
              <li><span>04</span><div><h3>Real purpose</h3><p>Ask what growth is for, what leaders owe people, and what makes an organization worth building.</p></div></li>
            </ol>
          </div>
        </section>

        <section id="graduate" className="section cream">
          <div className="container split-heading">
            <div><p className="eyebrow">GRADUATE BUSINESS</p><h2>Choose the capability your next role requires.</h2></div>
            <div className="comparison">
              <article><h3>Organizational Leadership</h3><p>Explore this path when your central challenge is people, culture, communication, and change.</p></article>
              <article><h3>MBA</h3><p>Explore this path when your next role requires broader strategy, finance, operations, and performance capability.</p></article>
            </div>
          </div>
        </section>

        <section id="purpose" className="section purpose">
          <div className="container split">
            <div><p className="eyebrow light">FAITH + BUSINESS</p><h2>Leadership decisions are never value-neutral.</h2></div>
            <div><p className="lead">Kingswood brings faith into the decisions leaders actually make.</p><ul className="question-list"><li>What is profit for?</li><li>What do leaders owe people?</li><li>What makes growth good?</li><li>How should power be used?</li></ul></div>
          </div>
        </section>

        <div className="container section"><ProgramFinder /></div>
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <div><strong>Kingswood University</strong><p>Personal, practical, purpose-driven Christian education.</p></div>
          <div><a href="https://www.kingswood.edu/">University home</a><a href="https://www.kingswood.edu/admissions">Admissions</a><a href="https://www.kingswood.edu/admissions/apply-now">Apply</a></div>
        </div>
      </footer>
      <nav className="mobile-actions" aria-label="Enrollment actions">
        <a href="https://www.kingswood.edu/admissions">Request information</a>
        <a href="https://www.kingswood.edu/admissions/apply-now">Apply</a>
      </nav>
    </>
  );
}
