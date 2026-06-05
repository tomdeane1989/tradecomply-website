import type { ReactNode } from "react";

/*
  Comparison table — the centrepiece of the /compare pillar (mockup).
  Horizontally scrollable on mobile ("swipe sideways"); first column sticky.

  Usage in MDX:

  <ComparisonTable
    note="Swipe the table sideways"
    columns={[
      { name: "CHAS", sub: "Common safety standard" },
      { name: "SafeContractor", sub: "Alcumus", rec: "Cheapest full SSIP" },
    ]}
    rows={[
      { label: "Typical cost / yr", cells: ["£119+", "£369+"] },
      { label: "SSIP approved", cells: ["yes", "yes"] },
    ]}
  />

  A cell value of "yes" / "no" renders a pill; anything else renders as text.
*/

export interface CompareColumn {
  name: string;
  sub?: string;
  /** Optional "best pick" tag under the column header. */
  rec?: string;
}

export interface CompareRow {
  label: string;
  /** One entry per column. "yes"/"no" become pills; other strings render as-is. */
  cells: ReactNode[];
  /** Small grey note under the row label. */
  note?: string;
}

interface ComparisonTableProps {
  columns: CompareColumn[];
  rows: CompareRow[];
  note?: string;
}

function Pill({ kind }: { kind: "yes" | "no" }) {
  const yes = kind === "yes";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${
        yes ? "bg-go/12 text-go" : "bg-warn/10 text-warn"
      }`}
      style={{
        backgroundColor: yes ? "color-mix(in oklab, var(--color-go) 12%, transparent)" : "var(--color-warn-bg)",
        color: yes ? "var(--color-go)" : "var(--color-warn)",
      }}
    >
      {yes ? "✓ Yes" : "✕ No"}
    </span>
  );
}

function renderCell(value: ReactNode): ReactNode {
  if (value === "yes") return <Pill kind="yes" />;
  if (value === "no") return <Pill kind="no" />;
  return value;
}

export function ComparisonTable({ columns, rows, note }: ComparisonTableProps) {
  return (
    <figure className="my-8 not-prose">
      {note && (
        <figcaption className="mb-2 font-mono text-xs text-[var(--color-mid)] md:hidden">
          {note} →
        </figcaption>
      )}
      <div className="overflow-x-auto rounded-xl border border-[var(--color-hair)]">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead>
            <tr className="bg-[var(--color-row-alt)]">
              <th className="sticky left-0 z-10 bg-[var(--color-row-alt)] px-4 py-3 font-head text-sm font-semibold text-[var(--color-ink-soft)]" />
              {columns.map((col) => (
                <th
                  key={col.name}
                  className="min-w-[140px] border-l border-[var(--color-hair)] px-4 py-3 align-bottom"
                >
                  <span className="block font-head text-sm font-bold text-[var(--color-ink)]">
                    {col.name}
                  </span>
                  {col.sub && (
                    <span className="block font-mono text-[11px] text-[var(--color-mid)]">
                      {col.sub}
                    </span>
                  )}
                  {col.rec && (
                    <span className="mt-1.5 inline-block font-mono text-[11px] font-semibold text-[var(--color-accent-d)]">
                      ★ {col.rec}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={row.label}
                className={ri % 2 === 1 ? "bg-[var(--color-row-alt)]/40" : undefined}
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-[var(--color-bg)] px-4 py-3 align-top font-head text-sm font-semibold text-[var(--color-ink-soft)]"
                >
                  {row.label}
                  {row.note && (
                    <span className="block font-body text-[12.5px] font-normal text-[var(--color-mid)]">
                      {row.note}
                    </span>
                  )}
                </th>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className="border-l border-t border-[var(--color-hair)] px-4 py-3 align-top text-[var(--color-ink-soft)]"
                  >
                    {renderCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
