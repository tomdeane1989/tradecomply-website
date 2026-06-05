import Link from "next/link";
import { BrickMark } from "./Logo";
import { HUB_ORDER, HUBS } from "@/lib/guides";
import { getSpokesForPillar } from "@/lib/content";
import { guideUrl } from "@/lib/guides";

export function SiteFooter() {
  return (
    <footer className="mt-20 text-white/80" style={{ backgroundColor: "var(--color-primary-d)" }}>
      <div className="mx-auto max-w-[var(--maxw)] px-5 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-head text-base font-bold text-white no-underline">
              <BrickMark size={24} />
              <span>
                Trade<span style={{ color: "var(--color-accent)" }}>Comply</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Independent, ad-free guidance on UK construction accreditation. No scheme pays to be
              here.
            </p>
          </div>

          {HUB_ORDER.map((hub) => {
            const spokes = getSpokesForPillar(hub).slice(0, 4);
            return (
              <div key={hub}>
                <h2 className="mb-3 font-head text-sm font-semibold text-white">
                  <Link href={HUBS[hub].path} className="text-white no-underline hover:underline">
                    {HUBS[hub].label}
                  </Link>
                </h2>
                <ul className="space-y-2 text-sm">
                  {spokes.map((s) => (
                    <li key={s.frontmatter.slug}>
                      <Link
                        href={guideUrl(s)}
                        className="text-white/70 no-underline hover:text-white hover:underline"
                      >
                        {s.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/55">
          <p className="mb-2">
            TradeComply is an independent information resource. The guidance here is{" "}
            <strong className="font-semibold text-white/70">informational only and not compliance
            or legal advice</strong>
            . Scheme fees, tiers, and question sets change — always confirm current details with the
            scheme before you pay. Figures shown are typical sole-trader / micro-business rates.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} TradeComply</span>
            <Link href="/about" className="text-white/55 no-underline hover:text-white">
              About
            </Link>
            <Link href="/product" className="text-white/55 no-underline hover:text-white">
              The tool
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
