"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/** Lets a parent or pastor pass the page on. Uses the device share sheet, falling back to copying the link. */
export function ShareButton() {
  const [note, setNote] = useState("");

  async function share() {
    const data = { title: "Kingswood University School of Business", text: "A business degree with real work and faith built in.", url: window.location.href };
    track("cta_click", { cta: "share-page", source: "families" });
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(data.url);
      setNote("Link copied.");
    } catch {
      setNote("Copy the address from your browser to share it.");
    }
  }

  return (
    <div className="share">
      <button type="button" className="button inverse" onClick={share}>Share this page</button>
      <span role="status" aria-live="polite">{note}</span>
    </div>
  );
}
