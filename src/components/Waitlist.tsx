"use client";

import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";

interface WaitlistProps {
  /** Analytics/source label, e.g. "home-hero" or "spoke-footer". */
  source: string;
  heading?: string;
  description?: string;
  /** Compact one-line variant for the foot of guides. */
  compact?: boolean;
}

const DEFAULT_HEADING = "We're building this for UK subcontractors";
const DEFAULT_DESCRIPTION =
  "Tired of tracking renewal dates and re-uploading the same certificates to every scheme? Join the list — we'll email you when it's ready. No spam, just one update when it launches.";

export function Waitlist({
  source,
  heading = DEFAULT_HEADING,
  description = DEFAULT_DESCRIPTION,
  compact = false,
}: WaitlistProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("Waitlist signup failed");
      trackEvent("generate_lead", { method: source });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className={`not-prose rounded-2xl px-6 ${compact ? "py-6" : "py-8 md:px-10 md:py-10"}`}
      style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
      aria-labelledby={`waitlist-${source}`}
    >
      <h2
        id={`waitlist-${source}`}
        className={`font-head font-bold tracking-tight text-white ${compact ? "text-lg" : "text-2xl md:text-[28px]"}`}
        style={{ margin: 0 }}
      >
        {heading}
      </h2>
      <p className={`mt-2 text-white/80 ${compact ? "text-sm" : "text-[15px] md:text-base"}`}>
        {description}
      </p>

      {status === "success" ? (
        <p className="mt-4 font-head text-sm font-semibold" style={{ color: "var(--color-accent)" }}>
          You&apos;re on the list. We&apos;ll be in touch when it&apos;s ready.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-2.5 sm:flex-row"
        >
          <label htmlFor={`waitlist-email-${source}`} className="sr-only">
            Email address
          </label>
          <input
            id={`waitlist-email-${source}`}
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourtrade.co.uk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full flex-1 rounded-[9px] border-0 bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] outline-none placeholder:text-[var(--color-faint)]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-[9px] px-5 py-3 font-head text-sm font-semibold whitespace-nowrap disabled:opacity-60"
            style={{ backgroundColor: "var(--color-accent)", color: "#1b1b16" }}
          >
            {status === "loading" ? "Joining…" : "Join the list"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-white/90">
          Something went wrong. Please try again, or email{" "}
          <a href="mailto:hello@tradecomply.co.uk" className="underline">
            hello@tradecomply.co.uk
          </a>
          .
        </p>
      )}
    </section>
  );
}
