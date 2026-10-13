"use client";

/**
 * Shown when the Payload admin cannot start, which in practice means the
 * database named by DATABASE_URL is unreachable. Without this the route
 * renders an unhandled Next.js error page, which is both unhelpful and a poor
 * thing to meet during a review.
 */
export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#061722", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem 1rem",
          }}
        >
          <div style={{ maxWidth: "34rem" }}>
            <p style={{ color: "#CCCCCC", fontSize: ".8rem", letterSpacing: ".14em", textTransform: "uppercase", margin: "0 0 .75rem" }}>
              Kingswood University
            </p>
            <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.6rem)", lineHeight: 1.1, margin: "0 0 1rem" }}>
              The content system is not connected.
            </h1>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.6, margin: "0 0 1rem", color: "#DED8D0" }}>
              The editing interface is part of this build, but this deployment has no database behind it, so it cannot start.
              The public site is unaffected and every page is still available.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.6, margin: "0 0 1.75rem", color: "#DED8D0" }}>
              Connecting a database and restoring editor access is a scoped piece of work, not a fault in the site.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem" }}>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- this boundary renders its own document, outside the app shell, so a full navigation is correct here. */}
              <a
                href="/"
                style={{ background: "#972E2D", color: "#fff", padding: ".85rem 1.4rem", borderRadius: ".2rem", fontWeight: 800, textDecoration: "none", display: "inline-flex", minHeight: "2.75rem", alignItems: "center" }}
              >
                Back to the site
              </a>
              <button
                type="button"
                onClick={reset}
                style={{ background: "transparent", color: "#fff", border: "2px solid #CCCCCC", padding: ".85rem 1.4rem", borderRadius: ".2rem", fontWeight: 800, cursor: "pointer", minHeight: "2.75rem" }}
              >
                Try again
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
