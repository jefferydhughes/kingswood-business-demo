import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { Tracker } from "@/components/Tracker";
import { costFacts, costSourceLine } from "@/content/facts";
import { recruitingContact } from "@/content/contact";

/**
 * Landing page for the Encounter weekend QR code.
 * It promotes only programs that are approved today. The "in development" interest line stays hidden
 * until the president approves the wording and NEXT_PUBLIC_SHOW_INTEREST_LIST is set to true.
 * It is not linked from the main page and is excluded from search engines.
 */
export const metadata: Metadata = {
  title: "Business at Kingswood",
  description: "Business degrees at Kingswood University in Sussex, New Brunswick.",
  robots: { index: false, follow: false },
};

const reviewMode = process.env.NEXT_PUBLIC_REVIEW_MODE !== "false";
const showInterestList = process.env.NEXT_PUBLIC_SHOW_INTEREST_LIST === "true";
const tuition = costFacts.find((f) => f.label.startsWith("Tuition"))?.value ?? "";
const average = costFacts.find((f) => f.label.startsWith("Average"))?.value ?? "";
const aid = costFacts.find((f) => f.label.startsWith("Students receiving"))?.value ?? "";

export default function EncounterLanding() {
  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link className="brand" href="/" aria-label="Kingswood University home">
            <Image className="brand-logo" src="/assets/kingswood-logo.webp" alt="Kingswood University" width={278} height={70} priority />
          </Link>
          <a className="button compact" href="#contact" data-cta="encounter-header">Ask Jeff</a>
        </div>
      </header>
      {reviewMode && (
        <div className="review-banner" role="note">
          <div className="container"><strong>Draft for approval.</strong>{" "}Not for public release until the president approves the wording.</div>
        </div>
      )}
      <main id="main-content">
        <section className="hero sob-hero">
          <div className="container">
            <p className="eyebrow light">KINGSWOOD UNIVERSITY · SUSSEX, NEW BRUNSWICK</p>
            <h1 className="sob-title">Atlantic Canada&rsquo;s best kept <em>education secret.</em></h1>
            <p className="lead">
              A small Christian university where you learn business by doing it. You met us at Encounter. Here is what a business degree here looks like.
            </p>
            <div className="actions">
              <a className="button" href="#contact" data-cta="encounter-hero-contact">Ask me a question</a>
              <a className="button ghost" href="#programs" data-cta="encounter-hero-programs">See the programs</a>
            </div>
          </div>
        </section>

        <section id="programs" className="section">
          <div className="container">
            <p className="eyebrow">WHAT YOU CAN STUDY NOW</p>
            <h2>Business with <em>real experience built in.</em></h2>
            <div className="degree-grid two">
              <article className="degree-card">
                <p className="tag">Bachelor of Arts</p>
                <h3>Business Management</h3>
                <p>Marketing, entrepreneurship, sales, project management, and strategy, with a supervised internship built into the program.</p>
                <ul>
                  <li>Entrepreneurship and digital marketing</li>
                  <li>Market research and advertising</li>
                  <li>Project management and sales</li>
                  <li>Personal branding and strategic planning</li>
                </ul>
                <a className="text-link-dark" href="https://www.kingswood.edu/academic-excellence/undergraduate-degrees/bachelor-of-arts-in-business-management" data-cta="encounter-ba-link">See the program on kingswood.edu</a>
              </article>
              <article className="degree-card">
                <p className="tag">Master&rsquo;s degree, online</p>
                <h3>Master of Business Administration</h3>
                <p>For parents, youth leaders, and grads who want to lead organizations. Launched online in May 2026 and ends with a Business as Mission capstone.</p>
                <ul>
                  <li>Strategy and finance</li>
                  <li>Operations and people</li>
                  <li>Practical, AI-aware business skills</li>
                </ul>
                <a className="text-link-dark" href="https://www.kingswood.edu/mba" data-cta="encounter-mba-link">See the MBA on kingswood.edu</a>
              </article>
            </div>
            {showInterestList && (
              <p className="interest-line">New business programs are in development for a future start and are not yet approved. Tell us you are interested and we will keep you posted.</p>
            )}
          </div>
        </section>

        <section id="who" className="section cream">
          <div className="container">
            <p className="eyebrow">WHO THIS IS FOR</p>
            <h2>Students, parents, and <em>youth pastors.</em></h2>
            <div className="degree-grid">
              <article className="degree-card">
                <h3>If you are a student</h3>
                <p>You do not have to pick between faith and a career. Ask what business looks like at a Christian university, and what it costs.</p>
              </article>
              <article className="degree-card">
                <h3>If you are a parent</h3>
                <p>Kingswood publishes its costs. Tuition is {tuition.toLowerCase()} on campus, the average on-campus cost is {average.toLowerCase()} before aid, and over {aid.replace("Over ", "")} of students receive aid.</p>
              </article>
              <article className="degree-card">
                <h3>If you are a youth pastor</h3>
                <p>Send me the students who love to build, sell, or organize things. I will talk with them and their families, and with you.</p>
              </article>
            </div>
            <p className="footnote-dark">{costSourceLine} {reviewMode ? "Review note: no academic year is named on the source page and no owner has confirmed these figures." : "Rates change. Confirm current figures with admissions."}</p>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">TALK TO A PERSON</p>
              <h2>Ask your questions. <em>I reply personally.</em></h2>
              <p className="person"><strong>{recruitingContact.name}</strong><span>{recruitingContact.title}</span><a href={`mailto:${recruitingContact.email}`} data-cta="encounter-email">{recruitingContact.email}</a></p>
            </div>
            <div className="contact-card">
              <InquiryForm source="encounter-qr" variant="encounter" reviewMode={reviewMode} />
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>Kingswood University</strong>
            <p>Sussex, New Brunswick. Personal, practical, purpose-driven Christian education.</p>
          </div>
          <div>
            <a href="https://www.kingswood.edu/">University home</a>
            <a href="https://www.kingswood.edu/admissions">Admissions</a>
          </div>
        </div>
      </footer>
      <Tracker />
    </>
  );
}
