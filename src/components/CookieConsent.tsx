"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredConsent, setStoredConsent } from "@/lib/consent";
import { GA_ID } from "@/lib/analytics";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only ask if analytics is actually configured and no choice is stored yet.
    if (GA_ID && getStoredConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  function choose(state: "granted" | "denied") {
    setStoredConsent(state);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-xl border p-4 shadow-lg sm:flex sm:items-center sm:gap-4"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-hair)",
      }}
    >
      <p className="text-sm text-[var(--color-ink-soft)]">
        We use privacy-light analytics to see which guides help. No ads, no tracking across sites.{" "}
        <Link href="/about" className="underline">
          Learn more
        </Link>
        .
      </p>
      <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-[9px] border px-3 py-2 font-head text-sm font-semibold text-[var(--color-ink-soft)]"
          style={{ borderColor: "var(--color-hair)" }}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-[9px] px-3 py-2 font-head text-sm font-semibold"
          style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
