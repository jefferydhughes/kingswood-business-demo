import Image from "next/image";
import Link from "next/link";
import type { InstitutionalPageData } from "@/content/types";

const navigation = [
  ["Academics", "/academics"],
  ["Admissions", "/admissions"],
  ["Student life", "/student-life"],
  ["About", "/about"],
] as const;

const currentSite = "https://www.kingswood.edu/";

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

      <main id="main-content">
        <section className="institutional-hero">
          <div className="container institutional-hero-inner">
            <p className="eyebrow light">{data.eyebrow}</p>
            <h1>{data.title}</h1>
            <p className="lead">{data.introduction}</p>
            <div className="actions">
              <a className="button" href={currentSite}>Explore current Kingswood information</a>
              <Link className="button ghost" href="/admissions">Plan your next step</Link>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="explore-heading">
          <div className="container">
            <div className="institutional-intro">
              <p className="eyebrow">Start here</p>
              <h2 id="explore-heading">Explore {data.title.toLowerCase()}</h2>
              <p>This page establishes the new Kingswood structure. Detailed information remains available on the current university website while content is reviewed and migrated.</p>
            </div>
            <div className="institutional-card-grid">
              {data.sections.map((section) => (
                <article className="institutional-card" key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                  <a href={section.href ?? currentSite}>
                    {section.linkLabel ?? "View current information"} <span aria-hidden="true">→</span>
                  </a>
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
            <a className="button inverse" href={data.nextStep.primaryHref}>{data.nextStep.primaryLabel}</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>Kingswood University</strong>
            <p>Sussex, New Brunswick, Canada</p>
          </div>
          <div>
            {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <a href={currentSite}>Current Kingswood website</a>
          </div>
        </div>
      </footer>
    </>
  );
}
