import Link from "next/link";
import type { Crumb } from "@/lib/guides";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-[var(--color-mid)]">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.url}>
            {last ? (
              <span className="text-[var(--color-ink-soft)]">{item.name}</span>
            ) : (
              <Link
                href={item.url}
                className="text-[var(--color-mid)] no-underline hover:text-[var(--color-primary)]"
              >
                {item.name}
              </Link>
            )}
            {!last && <span className="mx-1.5 text-[var(--color-faint)]">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
