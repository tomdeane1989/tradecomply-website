import type { ReactNode } from "react";

type CalloutVariant = "info" | "tip" | "warning";

interface CalloutProps {
  variant?: CalloutVariant;
  children: ReactNode;
}

const styles: Record<CalloutVariant, { bg: string; bd: string; fg: string }> = {
  info: { bg: "var(--color-plain-bg)", bd: "var(--color-plain-bd)", fg: "var(--color-primary)" },
  tip: { bg: "var(--color-plain-bg)", bd: "var(--color-plain-bd)", fg: "var(--color-primary)" },
  warning: { bg: "var(--color-warn-bg)", bd: "var(--color-warn-bd)", fg: "var(--color-warn)" },
};

export function Callout({ variant = "info", children }: CalloutProps) {
  const s = styles[variant];
  return (
    <aside
      role="note"
      className="my-6 rounded-lg border-l-4 px-5 py-4 text-[15px] leading-relaxed [&>p:last-child]:mb-0"
      style={{ backgroundColor: s.bg, borderColor: s.fg }}
    >
      {children}
    </aside>
  );
}
