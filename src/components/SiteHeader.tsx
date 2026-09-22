"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const links = [
  ["Programs", "#programs"],
  ["Experience", "#experience"],
  ["Faith & Business", "#purpose"],
  ["Graduate Degrees", "#graduate"],
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
          <Link className="button compact" href="#program-finder" onClick={() => setOpen(false)}>Find my program</Link>
        </nav>
      </div>
    </header>
  );
}
