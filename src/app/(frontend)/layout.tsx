import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Fonts are self-hosted from @fontsource rather than fetched from Google at
 * build time, so a build never depends on an external service being reachable.
 * Both families match docs/brand-guide.md.
 */
const bodyFont = localFont({
  src: [
    { path: "./fonts/dm-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

const displayFont = localFont({
  src: [
    { path: "./fonts/libre-franklin-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/libre-franklin-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Kingswood University", template: "%s | Kingswood University" },
  description: "Personal, practical, purpose-driven Christian education.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
