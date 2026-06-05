import type { ReactNode } from "react";

/*
  Inline source citation for a specific figure, e.g.
  <SourceNote href="https://www.chas.co.uk/...">CHAS pricing, checked 04/06/2026</SourceNote>
  Keeps the page honest about where a number came from (brief §5/§7).
*/
export function SourceNote({ href, children }: { href?: string; children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] text-[var(--color-mid)]">
      {" "}
      (
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener"
          className="underline decoration-[var(--color-accent)] underline-offset-2"
        >
          {children}
        </a>
      ) : (
        children
      )}
      )
    </span>
  );
}
