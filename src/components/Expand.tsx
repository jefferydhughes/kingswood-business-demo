"use client";

import { useEffect, useRef } from "react";

/** A disclosure that is closed on phones and open on wide screens, to shorten the mobile scroll. */
export function Expand({ summary, children, className = "" }: { summary: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (window.matchMedia("(min-width: 64rem)").matches && ref.current) ref.current.open = true;
  }, []);
  return (
    <details ref={ref} className={`more ${className}`.trim()}>
      <summary>{summary}</summary>
      <div className="more-body">{children}</div>
    </details>
  );
}
