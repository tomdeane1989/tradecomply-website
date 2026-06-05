"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { HUB_ORDER, HUBS } from "@/lib/guides";

const NAV = [
  ...HUB_ORDER.map((hub) => ({ label: HUBS[hub].label, href: HUBS[hub].path })),
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 text-white"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="mx-auto flex h-16 max-w-[var(--maxw)] items-center justify-between px-5">
        <Logo inverted />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-head text-sm font-medium text-white/85 no-underline transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/product"
            className="rounded-[9px] px-4 py-2 font-head text-sm font-semibold no-underline shadow-[0_1px_0_rgba(0,0,0,.16)]"
            style={{ backgroundColor: "var(--color-accent)", color: "#1b1b16" }}
          >
            Get the tool
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-white/10 px-5 py-3 md:hidden"
          style={{ backgroundColor: "var(--color-primary-d)" }}
          aria-label="Mobile"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 font-head text-sm font-medium text-white/90 no-underline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/product"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-[9px] px-4 py-2.5 text-center font-head text-sm font-semibold no-underline"
            style={{ backgroundColor: "var(--color-accent)", color: "#1b1b16" }}
          >
            Get the tool
          </Link>
        </nav>
      )}
    </header>
  );
}
