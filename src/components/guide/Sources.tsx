import type { GuideSource } from "@/lib/content";

/*
  Renders the guide's verified sources (from frontmatter `sources`) visibly at
  the foot of the page — surfacing the citations that already back the facts.
  Strengthens E-E-A-T (source attribution / third-party validation) and lets
  readers check our figures themselves. Pairs with the "How we keep this
  current" note that links to /about.
*/

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function Sources({ sources }: { sources?: GuideSource[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-6 not-prose border-[var(--color-hair)]">
      <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wide text-[var(--color-mid)]">
        Sources
      </h2>
      <ul className="space-y-1.5">
        {sources.map((s) => (
          <li key={s.url} className="text-sm text-[var(--color-ink-soft)]">
            <a
              href={s.url}
              target="_blank"
              rel="noopener"
              className="underline decoration-[var(--color-accent)] underline-offset-2 hover:text-[var(--color-primary)]"
            >
              {hostOf(s.url)}
            </a>
            <span className="font-mono text-xs text-[var(--color-mid)]">
              {" "}
              — checked {s.checked}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-[var(--color-mid)]">
        Scheme fees, tiers and question sets change. We re-check our sources and
        date every guide —{" "}
        <a href="/about" className="underline hover:text-[var(--color-primary)]">
          how we keep this current
        </a>
        .
      </p>
    </section>
  );
}
