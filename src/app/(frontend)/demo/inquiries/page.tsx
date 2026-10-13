import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { notFound } from "next/navigation";
import { listDemoInquiries } from "@/lib/forms/demo-store";
import { notifierConfigured } from "@/lib/forms/notify";
import { createSalesforceAdapter } from "@/lib/integrations/salesforce";

/**
 * Shows what the inquiry endpoint captured while no delivery channel is
 * configured, so the enrollment data contract can be demonstrated without a
 * CRM. It refuses to render once any real channel exists, which means it can
 * never display a production lead.
 */
export const metadata: Metadata = {
  title: "Captured inquiries (demo)",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function DemoInquiries() {
  if (createSalesforceAdapter() || notifierConfigured()) notFound();

  const captures = listDemoInquiries();

  return (
    <>
      <SiteHeader />
      <main id="main-content">
      <section className="section">
        <div className="container">
          <p className="eyebrow">DEMONSTRATION VIEW</p>
          <h1 className="sob-title">What the form <em>actually captured.</em></h1>
          <p className="demo-lead">
            Every field the enrollment form collects, including the consent record and the campaign attribution that would
            be written to a CRM. Nothing here was delivered to anyone.
          </p>
          <p className="footnote-dark">
            This page exists only while no CRM and no email channel are configured, and it disappears as soon as one is.
            Records are held in the memory of a single server instance, so they are lost on restart and this is not a store
            of record. A durable inquiry table is named as a launch requirement in the progress document.
          </p>

          {captures.length === 0 ? (
            <div className="demo-empty">
              <h2>Nothing captured yet.</h2>
              <p>
                Submit the form on the <Link href="/#contact">School of Business page</Link> or the{" "}
                <Link href="/encounter">Encounter page</Link>, then return here.
              </p>
            </div>
          ) : (
            <ol className="demo-list">
              {captures.map((capture) => {
                const name = [capture.prospect.givenName, capture.prospect.familyName].filter(Boolean).join(" ");
                const marketing = capture.prospect.consents.find((c) => c.purpose === "marketing_email");
                const campaign = [
                  capture.prospect.attribution.utmSource,
                  capture.prospect.attribution.utmMedium,
                  capture.prospect.attribution.utmCampaign,
                ]
                  .filter(Boolean)
                  .join(" / ");
                return (
                  <li key={capture.submissionId} className="demo-capture">
                    <div className="demo-capture-head">
                      <h2>{name || "(no name given)"}</h2>
                      <time dateTime={capture.capturedAt}>{new Date(capture.capturedAt).toUTCString()}</time>
                    </div>
                    <dl className="demo-fields">
                      <div><dt>Email</dt><dd>{capture.prospect.email}</dd></div>
                      <div><dt>Asked as</dt><dd>{capture.extras.role ?? "not given"}</dd></div>
                      <div><dt>Program interest</dt><dd>{capture.prospect.programInterest ?? "not given"}</dd></div>
                      <div><dt>Planning to start</dt><dd>{capture.prospect.intendedStart ?? "not given"}</dd></div>
                      <div><dt>Province</dt><dd>{capture.prospect.province ?? "not given"}</dd></div>
                      {capture.extras.grade && <div><dt>Grade or stage</dt><dd>{capture.extras.grade}</dd></div>}
                      {capture.extras.church && <div><dt>Church or youth group</dt><dd>{capture.extras.church}</dd></div>}
                      {capture.extras.guardianEmail && <div><dt>Guardian email</dt><dd>{capture.extras.guardianEmail}</dd></div>}
                      <div><dt>Marketing consent</dt><dd>{marketing?.granted ? "granted" : "withheld"} (policy {marketing?.policyVersion})</dd></div>
                      <div><dt>Landing page</dt><dd>{capture.prospect.attribution.landingPath}</dd></div>
                      <div><dt>Form</dt><dd>{capture.extras.source ?? "not given"}</dd></div>
                      <div><dt>Campaign</dt><dd>{campaign || "none"}</dd></div>
                      <div><dt>Reference</dt><dd className="demo-ref">{capture.submissionId}</dd></div>
                    </dl>
                  </li>
                );
              })}
            </ol>
          )}

          <p className="actions">
            <Link className="button" href="/#contact" data-cta="demo-inbox-back">Back to the form</Link>
          </p>
        </div>
      </section>
      </main>
    </>
  );
}
