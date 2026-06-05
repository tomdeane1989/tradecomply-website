import type { ReactNode } from "react";

/*
  Pricing-tier cards (Bronze / Silver / Gold) — from the spoke-article mockup.

  <TierGrid>
    <TierCard name="Bronze" price="£99 + VAT / yr" tagline="A verified company profile."
      features={["Company & insurance details verified", "Listed in the directory"]}
      excludes={["No H&S assessment", "Not SSIP-approved"]} />
    <TierCard name="Silver" badge="Most subbies" highlight ... />
  </TierGrid>
*/

interface TierGridProps {
  children: ReactNode;
  /** Small note under the grid, e.g. the "indicative rates" caveat. */
  note?: string;
}

export function TierGrid({ children, note }: TierGridProps) {
  return (
    <div className="my-8 not-prose">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
      {note && (
        <p className="mt-3 font-mono text-[11px] text-[var(--color-mid)]">{note}</p>
      )}
    </div>
  );
}

interface TierCardProps {
  name: string;
  price: string;
  tagline?: string;
  /** Small badge in the header, e.g. "Most subbies" or "For named requirements only". */
  badge?: string;
  /** Visually emphasise this tier (the recommended one). */
  highlight?: boolean;
  features?: string[];
  /** Rendered with a muted ✕ to show what the tier does NOT include. */
  excludes?: string[];
}

export function TierCard({
  name,
  price,
  tagline,
  badge,
  highlight = false,
  features = [],
  excludes = [],
}: TierCardProps) {
  return (
    <div
      className={`flex flex-col rounded-xl border p-5 ${
        highlight
          ? "border-[var(--color-accent)] bg-[var(--color-surface)] shadow-[0_1px_0_var(--color-accent)]"
          : "border-[var(--color-hair)] bg-[var(--color-surface)]"
      }`}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className="font-head text-lg font-bold text-[var(--color-ink)]">{name}</h3>
        {badge && (
          <span className="rounded-full bg-[var(--color-accent)]/20 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-[var(--color-accent-d)]">
            {badge}
          </span>
        )}
      </div>
      <p className="font-mono text-sm font-semibold text-[var(--color-cost)]">{price}</p>
      {tagline && (
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{tagline}</p>
      )}
      {features.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5 text-sm text-[var(--color-ink-soft)]">
          {features.map((f) => (
            <li key={f} className="flex gap-2">
              <span aria-hidden className="text-[var(--color-go)]">
                ✓
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      {excludes.length > 0 && (
        <ul className="mt-1.5 flex flex-col gap-1.5 text-sm text-[var(--color-mid)]">
          {excludes.map((f) => (
            <li key={f} className="flex gap-2">
              <span aria-hidden className="text-[var(--color-faint)]">
                ✕
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
