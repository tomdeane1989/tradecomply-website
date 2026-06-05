import Link from "next/link";
import type { Guide } from "@/lib/content";
import { guideUrl, HUBS } from "@/lib/guides";

interface RelatedGuidesProps {
  /** The pillar to link up to. */
  pillar?: Guide;
  /** Sibling spokes to link sideways to. */
  siblings: Guide[];
  heading?: string;
}

export function RelatedGuides({ pillar, siblings, heading = "Related" }: RelatedGuidesProps) {
  if (!pillar && siblings.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-8 not-prose border-[var(--color-hair)]">
      <h2 className="mb-5 font-head text-xl font-bold text-[var(--color-ink)]">{heading}</h2>

      {pillar && (
        <Link
          href={guideUrl(pillar)}
          className="mb-4 block rounded-xl border p-4 no-underline transition-colors hover:border-[var(--color-accent)] border-[var(--color-hair)] bg-[var(--color-surface)]"
        >
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-[var(--color-accent-d)]">
            Pillar · {HUBS[pillar.frontmatter.slug as keyof typeof HUBS]?.label}
          </span>
          <span className="mt-1 block font-head text-base font-bold text-[var(--color-ink)]">
            {pillar.frontmatter.title}
          </span>
        </Link>
      )}

      {siblings.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {siblings.map((s) => (
            <Link
              key={s.frontmatter.slug}
              href={guideUrl(s)}
              className="block rounded-xl border p-4 no-underline transition-colors hover:border-[var(--color-accent)] border-[var(--color-hair)] bg-[var(--color-surface)]"
            >
              <span className="block font-head text-[15px] font-semibold leading-snug text-[var(--color-ink)]">
                {s.frontmatter.title}
              </span>
              <span className="mt-1.5 block font-mono text-[11px] text-[var(--color-mid)]">
                {s.readingTime}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
