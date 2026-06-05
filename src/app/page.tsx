import Link from "next/link";
import { getAllPillars, getSpokesForPillar } from "@/lib/content";
import { guideUrl, HUBS, HUB_ORDER } from "@/lib/guides";
import { Waitlist } from "@/components/Waitlist";

export default function Home() {
  const pillars = getAllPillars();

  return (
    <main>
      {/* Hero */}
      <section
        className="px-5 pb-14 pt-16 text-white md:pb-20 md:pt-24"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="mx-auto max-w-[var(--maxw)]">
          <p className="font-mono text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            Independent &amp; ad-free · no scheme pays to be here
          </p>
          <h1 className="mt-4 max-w-3xl font-head text-[clamp(33px,7vw,56px)] font-bold leading-[1.04] tracking-tight text-white">
            UK construction accreditation, explained in plain English
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80 md:text-xl">
            CHAS, SafeContractor, Constructionline, SSIP — what each actually costs, what it covers,
            and which one your tender really needs. No sales pitch, no done-for-you upsell. Just the
            numbers and the categories, kept current.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/compare"
              className="rounded-[9px] px-5 py-3 font-head text-sm font-semibold no-underline"
              style={{ backgroundColor: "var(--color-accent)", color: "#1b1b16" }}
            >
              Compare the schemes
            </Link>
            <Link
              href="/product"
              className="rounded-[9px] border border-white/25 px-5 py-3 font-head text-sm font-semibold text-white no-underline hover:bg-white/10"
            >
              About the tool we&apos;re building
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-[var(--maxw)]">
          <h2 className="font-head text-2xl font-bold text-[var(--color-ink)] md:text-3xl">
            Start with the question you came here to answer
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {HUB_ORDER.map((hub) => {
              const pillar = pillars.find((p) => p.frontmatter.slug === hub);
              if (!pillar) return null;
              const spokes = getSpokesForPillar(hub).slice(0, 3);
              return (
                <div
                  key={hub}
                  className="flex flex-col rounded-2xl border p-6 border-[var(--color-hair)] bg-[var(--color-surface)]"
                >
                  <h3 className="font-head text-lg font-bold text-[var(--color-ink)]">
                    <Link href={HUBS[hub].path} className="no-underline hover:underline">
                      {pillar.frontmatter.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-[var(--color-ink-soft)]">
                    {pillar.frontmatter.description}
                  </p>
                  {spokes.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t pt-4 text-sm border-[var(--color-hair-soft)]">
                      {spokes.map((s) => (
                        <li key={s.frontmatter.slug}>
                          <Link
                            href={guideUrl(s)}
                            className="text-[var(--color-primary)] no-underline hover:underline"
                          >
                            {s.frontmatter.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <section className="px-5 pb-6">
        <div className="mx-auto grid max-w-[var(--maxw)] gap-6 rounded-2xl border p-7 md:grid-cols-3 md:p-10 border-[var(--color-hair)] bg-[var(--color-surface)]">
          <div>
            <p className="font-mono text-3xl font-semibold text-[var(--color-cost)]">£0</p>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
              We don&apos;t sell form-filling services. The neutrality is the point.
            </p>
          </div>
          <div>
            <p className="font-mono text-3xl font-semibold text-[var(--color-primary)]">Dated</p>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
              Every guide shows when it was last reviewed, with the sources we checked.
            </p>
          </div>
          <div>
            <p className="font-mono text-3xl font-semibold text-[var(--color-accent-d)]">Complete</p>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
              Real figures and full question categories — not a teaser that stops at the upsell.
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="px-5 py-14 md:py-16">
        <div className="mx-auto max-w-[var(--maxw)]">
          <Waitlist source="home-footer" />
        </div>
      </section>
    </main>
  );
}
