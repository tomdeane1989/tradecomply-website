import type { ReactNode } from "react";

interface StepListProps {
  children: ReactNode;
}

interface StepProps {
  number: number;
  children: ReactNode;
}

export function StepList({ children }: StepListProps) {
  return (
    <ol className="my-6 flex list-none flex-col gap-5 pl-0 not-prose">{children}</ol>
  );
}

export function Step({ number, children }: StepProps) {
  return (
    <li className="flex gap-4">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-head text-sm font-bold text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
        aria-label={`Step ${number}`}
      >
        {number}
      </span>
      <div className="min-w-0 pt-0.5 text-[15px] leading-relaxed text-[var(--color-ink-soft)] [&>p:last-child]:mb-0">
        {children}
      </div>
    </li>
  );
}
