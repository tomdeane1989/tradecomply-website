import Link from "next/link";
import { HUB_ORDER, HUBS } from "@/lib/guides";

export default function NotFound() {
  return (
    <main className="px-5 py-20">
      <div className="mx-auto max-w-[var(--readw)] text-center">
        <p className="font-mono text-sm font-semibold text-[var(--color-accent-d)]">404</p>
        <h1 className="mt-3 font-head text-3xl font-bold text-[var(--color-ink)] md:text-4xl">
          That page isn&apos;t here
        </h1>
        <p className="mt-3 text-[var(--color-ink-soft)]">
          It may have moved. Try one of our three guides instead:
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {HUB_ORDER.map((hub) => (
            <Link
              key={hub}
              href={HUBS[hub].path}
              className="rounded-[9px] border px-5 py-3 font-head text-sm font-semibold no-underline border-[var(--color-hair)] text-[var(--color-ink)] hover:border-[var(--color-accent)]"
            >
              {HUBS[hub].label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
