"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** In-page sections of the School of Business landing page. */
const programLinks = [
  ["Cost", "/#cost"],
  ["Degrees", "/#degrees"],
  ["Pathway", "/#pathway"],
  ["Business Lab", "/#lab"],
  ["MBA", "/#mba"],
] as const;

/** University-level routes, so the wider site is reachable from every page. */
const universityLinks = [
  ["Academics", "/academics"],
  ["Admissions", "/admissions"],
  ["Student life", "/student-life"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const first = menu.current?.querySelector<HTMLElement>("a");
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      // Keep Tab inside the open panel; the content behind it is covered.
      const focusable = menu.current?.querySelectorAll<HTMLElement>("a,button");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menu.current?.contains(target) || toggle.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/" aria-label="Kingswood University home">
          <Image
            className="brand-logo"
            src="/assets/kingswood-logo.webp"
            alt=""
            width={278}
            height={70}
            priority
          />
        </Link>
        <button ref={toggle} className="menu-button" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(v => !v)}>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span> {open ? "Close" : "Menu"}
        </button>
        <nav ref={menu} id="primary-navigation" className={open ? "primary-nav open" : "primary-nav"} aria-label="Primary navigation">
          <div className="nav-section">
            <p className="nav-section-label">School of Business</p>
            {programLinks.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
          </div>
          <div className="nav-section">
            <p className="nav-section-label">University</p>
            {universityLinks.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
          </div>
          <Link className="button compact" href="/#finder" data-cta="header-finder" onClick={() => setOpen(false)}>Find my path</Link>
        </nav>
      </div>
    </header>
  );
}
