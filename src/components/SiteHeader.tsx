"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const links = [
  ["Pathway", "#pathway"],
  ["Degrees", "#degrees"],
  ["Business Lab", "#lab"],
  ["MBA", "#mba"],
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
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/" aria-label="Kingswood University home">
          <Image
            className="brand-logo"
            src="/assets/kingswood-logo.webp"
            alt="Kingswood University"
            width={278}
            height={70}
            priority
          />
        </Link>
        <button ref={toggle} className="menu-button" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(v => !v)}>
          <span aria-hidden="true">☰</span> Menu
        </button>
        <nav ref={menu} id="primary-navigation" className={open ? "primary-nav open" : "primary-nav"} aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="button compact" href="https://www.kingswood.edu/admissions" onClick={() => setOpen(false)}>Request information</Link>
        </nav>
      </div>
    </header>
  );
}
