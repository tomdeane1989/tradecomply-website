import type { Metadata } from "next";
import Link from "next/link";
import { Waitlist } from "@/components/Waitlist";

export const metadata: Metadata = {
  title: "The tool we're building for subcontractors",
  description:
    "We're building a compliance tracker for UK subcontractors: renewal reminders, an evidence vault, and the tiers mutual recognition misses. Join the list.",
  alternates: { canonical: "/product" },
};

const PLANNED = [
  {
    title: "Renewal deadlines in one place",
    body: "Every scheme renews annually on its own clock. We'll track each expiry date and warn you before a lapse costs you a tender — not after.",
  },
  {
    title: "A reusable evidence vault",
    body: "Insurance certificates, method statements, training records, RAMS — uploaded once, kept current, and ready to attach to whichever scheme or client PQQ asks next.",
  },
  {
    title: "The tiers that aren't mutually recognised",
    body: "Deem to Satisfy covers the core H&S assessment. It doesn't cover Constructionline Gold's finance checks, the Common Assessment Standard, or client-specific PQQs. We'll help you see what each new requirement actually needs.",
  },
];

export default function ProductPage() {
  return (
    <main className="px-5 py-12 md:py-16">
      <div className="mx-auto max-w-[var(--readw)]">
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-[var(--color-accent-d)]">
          Coming soon
        </p>
        <h1 className="mt-3 font-head text-[clamp(31px,6.4vw,48px)] font-bold leading-[1.05] tracking-tight text-[var(--color-ink)]">
          A compliance tracker built for how subcontractors actually work
        </h1>
        <p className="mt-5 text-lg text-[var(--color-ink-soft)]">
          We&apos;re not building it yet — and we&apos;ll be honest about that. We&apos;re writing
          the guides first, listening to what trips people up, and only funding the app once
          there&apos;s real demand. Here&apos;s the residual pain it&apos;s designed to remove.
        </p>

        <div className="mt-10 space-y-5">
          {PLANNED.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border p-5 border-[var(--color-hair)] bg-[var(--color-surface)]"
            >
              <h2 className="font-head text-lg font-bold text-[var(--color-ink)]">{f.title}</h2>
              <p className="mt-1.5 text-[15px] text-[var(--color-ink-soft)]">{f.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[15px] text-[var(--color-mid)]">
          Want to understand the landscape first? Start with{" "}
          <Link href="/compare" className="text-[var(--color-primary)] underline">
            the scheme comparison
          </Link>{" "}
          or{" "}
          <Link href="/ssip" className="text-[var(--color-primary)] underline">
            how SSIP mutual recognition works
          </Link>
          .
        </p>

        <div className="mt-10">
          <Waitlist
            source="product"
            heading="Be first to know when it launches"
            description="No accounts, no spam. One email when the tool is ready, framed around the deadlines and re-uploads you're tired of."
          />
        </div>
      </div>
    </main>
  );
}
