import Link from "next/link";

/*
  Brand mark — stacked-brick motif from the mockup favicon (two white bricks on
  a course, one gold brick above). Inline SVG so it inherits header colour.
*/
export function BrickMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="30" y="57" width="18" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="3.2" />
      <rect x="52" y="57" width="18" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="3.2" />
      <rect x="41" y="41" width="18" height="10" rx="2" fill="none" stroke="var(--color-accent)" strokeWidth="3.2" />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 font-head text-lg font-bold tracking-tight no-underline ${
        inverted ? "text-white" : "text-[var(--color-ink)]"
      }`}
    >
      <BrickMark />
      <span>
        Trade<span className="text-[var(--color-accent)]">Comply</span>
      </span>
    </Link>
  );
}
