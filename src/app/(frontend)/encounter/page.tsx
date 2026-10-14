import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { Tracker } from "@/components/Tracker";
import { costFacts, costSourceLine } from "@/content/facts";
import { recruitingContact } from "@/content/contact";

/**
 * Recruitment landing page for the Encounter weekend QR code.
 *
 * Its one job is to turn interest from the weekend into a conversation, so there is a
 * single primary action throughout: ask Jeff a question.
 *
 * Program status is disclosed permanently, not behind NEXT_PUBLIC_REVIEW_MODE. The four
 * year pathway is not an approved program, and the label saying so has to survive the flag
 * being turned off, or turning it off would hide the disclosure while leaving the claim.
 * Only the internal reviewer banner is flag-gated.
 *
 * Not linked from the main site and excluded from search engines.
 */
export const metadata: Metadata = {
  title: "Business at Kingswood",
  description: "Learn business, build practical skills, and explore how your faith shapes your work. Kingswood University, Sussex, New Brunswick.",
  robots: { index: false, follow: false },
};

const reviewMode = process.env.NEXT_PUBLIC_REVIEW_MODE !== "false";
const tuition = costFacts.find((f) => f.label.startsWith("Tuition"))?.value ?? "";
const average = costFacts.find((f) => f.label.startsWith("Average"))?.value ?? "";
const aid = costFacts.find((f) => f.label.startsWith("Students receiving"))?.value ?? "";

const skills = [
  ["Marketing and digital strategy", "Understand customers, communicate ideas, and help an organization grow."],
  ["Entrepreneurship and innovation", "Turn an opportunity you notice into an idea worth pursuing."],
  ["Sales and communication", "Build relationships, present ideas, and influence decisions."],
  ["Project management and leadership", "Organize people, resources and plans to actually get things done."],
  ["Strategy and problem solving", "Make decisions when the answers are not obvious."],
  ["Faith and business", "Explore how Christian conviction shapes leadership, work, and how people are treated."],
] as const;

const careers = [
  "Marketing, advertising and digital media",
  "Sales, customer relationships and business development",
  "Project coordination and operations",
  "Entrepreneurship and small business ownership",
  "Management and leadership",
  "Sports, recreation and event management",
] as const;

const askAbout = [
  "The B.A. in Business Management and how it works",
  "The proposed pathway and where it stands",
  "Tuition, financial aid and admissions",
  "Internships and practical learning",
  "How business study fits with your faith and your goals",
] as const;

/** Always rendered. A status label that disappears with a flag is not a disclosure. */
function Pill({ children }: { children: string }) {
  return <span className="status-pill status-proposed">{children}</span>;
}

export default function EncounterLanding() {
  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link className="brand" href="/" aria-label="Kingswood University home">
            <Image className="brand-logo" src="/assets/kingswood-logo.webp" alt="" width={278} height={70} priority />
          </Link>
          <a className="button compact" href="#contact" data-cta="encounter-header">Ask Jeff a question</a>
        </div>
      </header>

      {reviewMode && (
        <div className="review-banner" role="note">
          <div className="container">
            <strong>Draft for approval.</strong>{" "}Not for public release until the president approves the wording.
          </div>
        </div>
      )}

      <main id="main-content">
        <section className="hero enc-hero">
          <div className="container enc-hero-grid">
            <div>
              <p className="eyebrow light">KINGSWOOD UNIVERSITY · SUSSEX, NEW BRUNSWICK</p>
              <h1 className="sob-title">Your future is bigger than <em>a job title.</em></h1>
              <p className="lead">
                You have ideas. You notice opportunities. You want to do something that matters.
                Learn how business actually works, get real experience doing it, and find out how your
                faith shapes the way you lead, build and serve.
              </p>
              <div className="actions">
                <a className="button" href="#contact" data-cta="encounter-hero-ask">Ask Jeff a question</a>
                <a className="button ghost" href="#learn" data-cta="encounter-hero-explore">Explore business at Kingswood</a>
              </div>
              <p className="hero-sub">A small Christian university. Real business learning. A future you can build.</p>
            </div>
            <dl className="enc-proof">
              <div>
                <dt>Available now</dt>
                <dd>B.A. in Business Management</dd>
                <dd>B.A. in Entrepreneurship</dd>
                   <dd>B.A. in Sports & Rec Manageent</dd>
              </div>
              <div>
                <dt>Built into the degree</dt>
                <dd>Real business experience</dd>
              </div>
              <div>
                <dt>Where you would study</dt>
                <dd>Sussex, New Brunswick</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="learn" className="section">
          <div className="container">
            <p className="eyebrow">WHAT YOU WILL LEARN</p>
            <h2>Don&rsquo;t just study business. <em>Learn by doing business.</em></h2>
            <p className="lead-dark">
              Business is more than textbooks and exams. It is solving problems, understanding people,
              bringing ideas to life, and making things happen.
            </p>
            <div className="skill-grid">
              {skills.map(([title, body]) => (
                <article key={title} className="skill-card">
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <p className="footnote-dark">
              The B.A. in Business Management includes live business labs, and business operations, so you finish with experience
              as well as a transcript.
            </p>
          </div>
        </section>

        <section id="pathway" className="section cream">
          <div className="container">
            <p className="eyebrow">A PATH FROM HIGH SCHOOL TO YOUR DEGREE</p>
            <h2>You don&rsquo;t need your whole future <em>figured out in Grade 12.</em></h2>
            <p className="lead-dark">
              Start building skills, take the next step, and keep moving forward.
            </p>

            <ol className="pathway-track">
              <li>
                <p className="pathway-year">Year 1</p>
                <h3>Elements <Pill>Leadership Essentials Certificate</Pill></h3>
                <p className="pathway-line">Start exploring. Build confidence. Find out what you are good at.</p>
                <p>
                  An immersive year in Sussex. You work alongside a team in real campus
                  operations, grow through discipleship, personal development, outdoor education, community-ministry, and teamwork.
                </p>
              </li>
              <li>
                <p className="pathway-year">Year 2</p>
                <h3>Associate degree <Pill>In development</Pill></h3>
                <p className="pathway-line">Turn what you have learned into practical capability.</p>
                <p>
                  Continue your studies toward an associate degree, developing a stronger foundation in business, leadership, and applied learning.
                </p>
              </li>
              <li>
                <p className="pathway-year">Years 3 and 4</p>
                <h3>Degree completion <Pill>In development</Pill></h3>
                <p className="pathway-line">Build on your foundation. Prepare for what is next.</p>
                <p>
                  Continue into degree-level study, deepening your business knowledge and developing 
                  the skills and experience to pursue opportunities in business, entrepreneurship, management, and other fields.
                </p>
              </li>
            </ol>

            <p className="pathway-caveat">
              <strong>Where this stands.</strong> This pathway is in development and is not yet open for
              admission. Credential names, timing and admission requirements are subject to academic
              approval. What is available today is the B.A. in Business Management. Ask Jeff and he will
              tell you more.
            </p>

            <p className="actions">
              <a className="button" href="#contact" data-cta="encounter-pathway-ask">Let&rsquo;s talk about your pathway</a>
            </p>
          </div>
        </section>

        <section id="faith" className="section dark">
          <div className="container split-heading">
            <div>
              <p className="eyebrow light">FAITH AND WORK</p>
              <h2>Your faith belongs <em>in your future.</em></h2>
            </div>
            <div>
              <p>
                You don't need to choose between preparing for a career and growing in your faith.
                At Kingswood, business education is an opportunity to explore both.
              </p>
              <p>
                What does it mean to lead with integrity? To build something that serves people well? To
                create something valuable without losing sight of what matters most?
              </p>
              <p>
                Whether you end up leading a team, starting a business, working in sport and recreation, or
                leading a church, your education should help you think hard about the kind of leader you
                want to become.
              </p>
            </div>
          </div>
        </section>

        <section id="community" className="section">
          <div className="container community-grid">
            <div>
              <p className="eyebrow">SMALL UNIVERSITY. REAL PEOPLE.</p>
              <h2>Room to grow, <em>and people who notice.</em></h2>
              <p>
                Your university years should be about more than a credential. Here you learn in a Christian
                community where relationships matter, questions are welcome, and your professors actually
                know your name.
              </p>
              <p>
                You do not need to arrive with a business plan or a start-up idea. Curiosity and a
                willingness to learn are enough to begin.
              </p>
               <p>
                You can explore your interests, develop your confidence, and learn alongside people who want their work to make a difference.
              And you don't have to arrive with a business plan or an entrepreneurial idea.
              You just need curiosity, a willingness to learn, and an interest in what you could do with your future.

              </p>
            </div>
            <figure className="community-figure">
              <Image
                src="/assets/kingswood-hike.jpg"
                alt="Kingswood students and staff on a hike above the Bay of Fundy on a clear autumn day"
                width={1600}
                height={1200}
                sizes="(min-width: 64rem) 36rem, 100vw"
              />
              <figcaption>Out on the trail with Elements students. Class is not the only place you learn something.</figcaption>
            </figure>
          </div>
        </section>

        <section id="careers" className="section cream">
          <div className="container">
            <p className="eyebrow">WHERE IT CAN LEAD</p>
            <h2>What could you do <em>with a business education?</em></h2>
            <p className="lead-dark">A business foundation opens doors across a lot of industries. You might work in:</p>
            <ul className="career-list">
              {careers.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <p className="footnote-dark">
              Where you land depends on your interests, your experience and any further study. The point of the
              degree is skills that travel.
            </p>
          </div>
        </section>

        <section id="adults" className="section">
          <div className="container">
            <p className="eyebrow">QUESTIONS?</p>
            <h2>For parents <em>and youth pastors.</em></h2>
            <div className="degree-grid">
              <article className="degree-card">
                <h3>What it costs</h3>
                <p>
                  Kingswood publishes its numbers. Tuition is {tuition.toLowerCase()} on campus, the average
                  on-campus cost is {average.toLowerCase()} before aid, and over {aid.replace("Over ", "")} of
                  students receive aid.
                </p>
                <p className="source-note">{costSourceLine} No academic year is stated on the source page, and no owner has confirmed these figures.</p>
              </article>
              <article className="degree-card">
                <h3>Send the builders</h3>
                <p>
                  If you know a student who loves to build, lead, or solve problems, send them our way. I am
                  happy to talk with them, with you, and with their family. No pressure to apply.
                </p>
              </article>
              <article className="degree-card">
                <h3>For adults, there is also an MBA</h3>
                <p>
                  Kingswood runs an online MBA that launched in May 2026, for people already working who want
                  to lead more. It ends with a Business as Mission capstone.{" "}
                  <a className="text-link-dark" href="https://www.kingswood.edu/mba" data-cta="encounter-mba">See the MBA on kingswood.edu</a>
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="section dark">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow light">START WITH A CONVERSATION</p>
              <h2>Have questions? <em>Ask a real person.</em></h2>
              <p className="dark-lead">
                Choosing a university is a big decision, and you deserve straight answers about the program,
                the cost, and what your next step actually looks like. No pressure to apply. No need to have
                it all figured out.
              </p>
              <figure className="person-card">
                <Image
                  src="/assets/jeff-hughes.jpg"
                  alt={`${recruitingContact.name}, ${recruitingContact.title}`}
                  width={900}
                  height={900}
                  sizes="7rem"
                />
                <figcaption>
                  <strong>{recruitingContact.name}</strong>
                  <span>{recruitingContact.title}</span>
                  <a href={`mailto:${recruitingContact.email}`} data-cta="encounter-email">{recruitingContact.email}</a>
                </figcaption>
              </figure>
              <p className="ask-intro">Ask me about:</p>
              <ul className="ask-list">
                {askAbout.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
            <div className="contact-card">
              <InquiryForm source="encounter-qr" variant="encounter" reviewMode={reviewMode} />
            </div>
          </div>
        </section>

        <section id="about-jeff" className="section cream">
          <div className="container about-jeff">
            <p className="eyebrow">WHO YOU WILL BE TALKING TO</p>
            <h2>About Jeff</h2>
            <p>
              Jeff Hughes heads the Business and Management Department at Kingswood, and brings a mix of
              ministry, education and business to the classroom. He founded Skill Samurai, an award-winning
              education franchise that introduced students across a dozen countries to programming and
              technology skills.
            </p>
            <p>
              He cares about two things in particular: helping business leaders run organizations with a
              sense of mission, and helping ministry leaders learn the business skills their work needs.
            </p>
            <p className="closing-line">Your future is worth exploring. Let&rsquo;s start there.</p>
            <p className="actions">
              <a className="button" href="#contact" data-cta="encounter-footer-ask">Ask Jeff a question</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>Kingswood University</strong>
            <p>Sussex, New Brunswick. Personal, practical, purpose-driven Christian education.</p>
            {reviewMode && <p>Concept demo for internal review. Programs marked in development are not approved.</p>}
          </div>
          <div>
            <Link href="/" data-cta="encounter-footer-home">School of Business</Link>
            <Link href="/admissions" data-cta="encounter-footer-admissions">Admissions</Link>
            <a href="https://www.kingswood.edu/" data-cta="encounter-footer-university">University home on kingswood.edu</a>
          </div>
        </div>
      </footer>

      <Tracker />
    </>
  );
}
