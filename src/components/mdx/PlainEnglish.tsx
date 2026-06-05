import type { ReactNode } from "react";

/*
  "In plain English" callout — the recurring plain-speech aside from the mockups.
  A petrol-tinted box that restates the section's takeaway without jargon.
*/
export function PlainEnglish({ children }: { children: ReactNode }) {
  return (
    <aside
      className="my-6 rounded-lg border px-5 py-4 not-prose"
      style={{
        backgroundColor: "var(--color-plain-bg)",
        borderColor: "var(--color-plain-bd)",
      }}
    >
      <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-[var(--color-primary-l)]">
        In plain English
      </p>
      <div className="text-[15px] leading-relaxed text-[var(--color-ink-soft)] [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
