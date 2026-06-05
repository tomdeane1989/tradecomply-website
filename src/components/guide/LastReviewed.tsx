/** Formats an ISO date as DD/MM/YYYY (UK). */
export function formatUkDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

interface LastReviewedProps {
  date: string;
  /** Show the "independent & ad-free" trust badge alongside (pillars/spokes). */
  badge?: boolean;
  /** Optional extra meta line, e.g. reading time or "Written by the TradeComply desk". */
  meta?: string;
}

export function LastReviewed({ date, badge = true, meta }: LastReviewedProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[var(--color-mid)]">
      <span>
        Last reviewed{" "}
        <time dateTime={date} className="text-[var(--color-ink-soft)]">
          {formatUkDate(date)}
        </time>
      </span>
      {meta && (
        <>
          <span className="text-[var(--color-faint)]">·</span>
          <span>{meta}</span>
        </>
      )}
      {badge && (
        <>
          <span className="text-[var(--color-faint)]">·</span>
          <span className="text-[var(--color-accent-d)]">Independent &amp; ad-free</span>
        </>
      )}
    </div>
  );
}
