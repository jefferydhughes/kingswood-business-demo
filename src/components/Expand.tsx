"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/** Runs before paint on the client, and avoids the layout-effect warning during server rendering. */
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** A disclosure that is closed on phones and open on wide screens, to shorten the mobile scroll. */
export function Expand({ summary, children, className = "" }: { summary: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useBeforePaint(() => {
    const wide = window.matchMedia("(min-width: 64rem)");
    const apply = () => {
      if (ref.current) ref.current.open = wide.matches;
    };
    apply();
    wide.addEventListener("change", apply);
    return () => wide.removeEventListener("change", apply);
  }, []);

  return (
    <details ref={ref} className={`more ${className}`.trim()}>
      <summary>{summary}</summary>
      <div className="more-body">{children}</div>
    </details>
  );
}
