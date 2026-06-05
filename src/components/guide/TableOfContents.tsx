import type { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TocItem[];
  /** Optional "On this page" heading override. */
  heading?: string;
}

export function TableOfContents({ items, heading = "On this page" }: TableOfContentsProps) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Table of contents">
      <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wide text-[var(--color-mid)]">
        {heading}
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? "0.85rem" : 0 }}>
            <a
              href={`#${item.id}`}
              className="text-sm text-[var(--color-ink-soft)] no-underline hover:text-[var(--color-primary)] hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
