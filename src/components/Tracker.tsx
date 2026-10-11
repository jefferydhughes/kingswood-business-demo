"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const WATCHED = ["finder", "cost", "calling", "degrees", "pathway", "lab", "families", "faq", "contact"];

/** Tracks CTA clicks (elements with data-cta) and first view of key sections. No personal data. */
export function Tracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta]");
      if (el) track("cta_click", { cta: el.dataset.cta, source: el.dataset.source });
    };
    document.addEventListener("click", onClick);

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && !seen.has(id)) {
            seen.add(id);
            track("section_view", { section: id });
          }
        }
      },
      { threshold: 0.35 },
    );
    for (const id of WATCHED) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }
    return () => {
      document.removeEventListener("click", onClick);
      observer.disconnect();
    };
  }, []);

  return null;
}
