import type { ReactNode } from "react";

/*
  "Watch-out" note — the burnt-orange caution items from the mockup's
  "Before you pay: watch-outs" section. Short, factual cautions; never alarmist.
*/
export function WatchOut({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside
      className="my-5 rounded-lg border-l-4 px-5 py-4 not-prose"
      style={{
        backgroundColor: "var(--color-warn-bg)",
        borderColor: "var(--color-warn)",
      }}
    >
      {title && (
        <p className="mb-1 font-head text-sm font-semibold text-[var(--color-warn)]">
          {title}
        </p>
      )}
      <div className="text-[15px] leading-relaxed text-[var(--color-ink-soft)] [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
