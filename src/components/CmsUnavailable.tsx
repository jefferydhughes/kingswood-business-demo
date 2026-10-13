/**
 * Rendered in place of the Payload admin when it cannot start, which in
 * practice means the database named by DATABASE_URL is unreachable. Styles are
 * inline because this route does not load the public site's stylesheet.
 */
/** Payload marks the failure to reach its database with this property. */
export function isPayloadInitError(error: unknown): boolean {
  return Boolean(error && typeof error === "object" && "payloadInitError" in error);
}

const palette = { blue: "#061722", red: "#972E2D", gray: "#CCCCCC", warm: "#DED8D0", white: "#FFFFFF" };

export function CmsUnavailable() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem 1rem",
        background: palette.blue,
        color: palette.white,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        lineHeight: 1.6,
      }}
    >
      <div style={{ maxWidth: "34rem" }}>
        <p style={{ margin: "0 0 .75rem", color: palette.gray, fontSize: ".8rem", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase" }}>
          Kingswood University
        </p>
        <h1 style={{ margin: "0 0 1.25rem", fontSize: "clamp(1.9rem, 5vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
          The content system is not connected.
        </h1>
        <p style={{ margin: "0 0 1rem", color: palette.warm, fontSize: "1.05rem" }}>
          The editing interface is part of this build, but this deployment has no database behind it, so it cannot start.
          The public site does not depend on it and every page is still available.
        </p>
        <p style={{ margin: "0 0 1.75rem", color: palette.warm, fontSize: "1.05rem" }}>
          Connecting a database and restoring editor access is a scoped piece of work. It is recorded in the project
          progress document, along with what has to follow it before the site becomes editable.
        </p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the Payload admin is a separate document tree from the public app, so a full navigation is correct here. */}
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: "3rem",
            padding: ".75rem 1.4rem",
            background: palette.red,
            color: palette.white,
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Back to the site
        </a>
      </div>
    </main>
  );
}
