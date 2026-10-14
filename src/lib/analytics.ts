/**
 * Consent-aware event tracking.
 *
 * Events are pushed only if a `dataLayer` already exists on the page, which happens
 * after a tag manager loads under the site's consent rules. Without one, nothing is
 * stored or sent. Never pass names, emails, or other personal data in properties.
 */
type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...props };
  if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("kw:track", { detail: payload }));
}
