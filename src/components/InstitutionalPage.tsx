import Image from "next/image";
import Link from "next/link";
import { Tracker } from "@/components/Tracker";
import type { InstitutionalLink, InstitutionalPageData } from "@/content/types";

const navigation = [
  ["School of Business", "/"],
  ["Academics", "/academics"],
  ["Admissions", "/admissions"],
  ["Student life", "/student-life"],
  ["About", "/about"],
] as const;

const universityHome = "https://www.kingswood.edu/";

/** Review mode shows the approval banner. Set NEXT_PUBLIC_REVIEW_MODE=false only after content is approved. */
const reviewMode = process.env.NEXT_PUBLIC_REVIEW_MODE !== "false";

/** Links to the current university website stay anchors and say where they go. */
function ExternalLink({ link, className }: { link: InstitutionalLink; className?: string }) {
  return (
    <a className={className} href={link.href} data-cta={link.cta}>
      {link.label} <span aria-hidden="true">↗</span>
    </a>
  );
}

export function InstitutionalPage({ data }: { data: InstitutionalPageData }) {
  return (
    <>
      <header className="institutional-header">
        <div className="container institutional-nav">
          <Link className="brand" href="/" aria-label="Kingswood University home">
            <Image
              className="brand-logo"
              src="/assets/kingswood-logo.webp"
              alt="Kingswood University"
              width={278}
              height={70}
              priority
            />
          </Link>
          <nav aria-label="University sections">
            {navigation.map(([label, href]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </nav>
        </div>
      </header>

      {reviewMode && (
        <div className="review-banner" role="note">
          <div className="container">
            <strong>Concept demo for review.</strong>{" "}
            These pages show the proposed site structure. University information has not been reviewed or migrated, and links marked kingswood.edu open the current website.
          </div>
        </div>
      )}

      <main id="main-content">
        <section className="institutional-hero">
          <div className="container institutional-hero-inner">
            <p className="eyebrow light">{data.eyebrow}</p>
            <h1 className="sob-title">{data.title}</h1>
            <p className="lead">{data.introduction}</p>
            <div className="actions">
              <Link className="button" href={data.heroPrimary.href} data-cta={data.heroPrimary.cta}>{data.heroPrimary.label}</Link>
              <Link className="button ghost" href={data.heroSecondary.href} data-cta={data.heroSecondary.cta}>{data.heroSecondary.label}</Link>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="explore-heading">
          <div className="container">
            <div className="institutional-intro">
              <p className="eyebrow">Start here</p>
              <h2 id="explore-heading">{data.heading}</h2>
              <p>Links inside this demo open the new pages. Links marked kingswood.edu open the current university website, where detailed information remains while content is reviewed and migrated.</p>
            </div>
            <div className="institutional-card-grid">
              {data.sections.map((section) => (
                <article className="institutional-card" key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                  {section.internal && (
                    <Link href={section.internal.href} data-cta={section.internal.cta}>
                      {section.internal.label} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                  {section.external && (
                    <ExternalLink className="institutional-card-external" link={section.external} />
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="institutional-next">
          <div className="container institutional-next-inner">
            <div>
              <p className="eyebrow light">Next step</p>
              <h2>{data.nextStep.title}</h2>
              <p>{data.nextStep.description}</p>
            </div>
            <div className="actions">
              <Link className="button inverse" href={data.nextStep.primary.href} data-cta={data.nextStep.primary.cta}>{data.nextStep.primary.label}</Link>
              {data.nextStep.external && (
                <ExternalLink className="text-link-dark" link={data.nextStep.external} />
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>Kingswood University</strong>
            <p>Sussex, New Brunswick. Personal, practical, purpose-driven Christian education.</p>
            {reviewMode && <p>Concept demo for internal review. Programs shown as proposed are not approved.</p>}
          </div>
          <div>
            {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <a href={universityHome} data-cta={`${data.slug}-footer-university`}>University home on kingswood.edu</a>
          </div>
        </div>
      </footer>
      <Tracker />
    </>
  );
}
