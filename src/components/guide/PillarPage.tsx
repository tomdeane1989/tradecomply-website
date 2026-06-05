import Link from "next/link";
import { compileMDXContent } from "@/lib/mdx";
import { extractToc } from "@/lib/toc";
import { extractFaq } from "@/lib/faq";
import type { Guide, Pillar } from "@/lib/content";
import { getSpokesForPillar } from "@/lib/content";
import { absoluteUrl, breadcrumbsFor, guideUrl } from "@/lib/guides";
import { Breadcrumbs } from "./Breadcrumbs";
import { LastReviewed } from "./LastReviewed";
import { TableOfContents } from "./TableOfContents";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FAQJsonLd } from "@/components/seo/FAQJsonLd";
import { Waitlist } from "@/components/Waitlist";

export async function PillarPage({ guide }: { guide: Guide }) {
  const { frontmatter, content } = guide;
  const hub = frontmatter.slug as Pillar;

  const tocItems = extractToc(content);
  const mdxContent = await compileMDXContent(content);
  const spokes = getSpokesForPillar(hub);
  const faqs = extractFaq(content);
  const crumbs = breadcrumbsFor(guide);

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      {faqs.length > 0 && <FAQJsonLd questions={faqs} />}

      <main className="px-5 py-10 md:py-14">
        <div className="mx-auto max-w-[var(--maxw)]">
          <Breadcrumbs items={crumbs} />

          <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
            <article className="min-w-0">
              <header className="mb-8">
                <h1 className="font-head text-[clamp(31px,6.4vw,52px)] font-bold leading-[1.04] tracking-tight text-[var(--color-ink)]">
                  {frontmatter.title}
                </h1>
                <p className="mt-4 text-lg text-[var(--color-ink-soft)]">
                  {frontmatter.description}
                </p>
                <div className="mt-4">
                  <LastReviewed date={frontmatter.lastUpdated} />
                </div>
              </header>

              {tocItems.length > 0 && (
                <div className="mb-8 rounded-xl border p-4 lg:hidden border-[var(--color-hair)] bg-[var(--color-surface)]">
                  <TableOfContents items={tocItems} />
                </div>
              )}

              <div className="prose">{mdxContent}</div>

              {/* Spoke index — a pillar links down to every spoke. */}
              {spokes.length > 0 && (
                <section className="mt-12 border-t pt-8 not-prose border-[var(--color-hair)]">
                  <h2 className="mb-5 font-head text-2xl font-bold text-[var(--color-ink)]">
                    In-depth guides
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {spokes.map((s) => (
                      <Link
                        key={s.frontmatter.slug}
                        href={guideUrl(s)}
                        className="block rounded-xl border p-4 no-underline transition-colors hover:border-[var(--color-accent)] border-[var(--color-hair)] bg-[var(--color-surface)]"
                      >
                        <span className="block font-head text-base font-semibold leading-snug text-[var(--color-ink)]">
                          {s.frontmatter.title}
                        </span>
                        <span className="mt-1.5 block text-sm text-[var(--color-ink-soft)]">
                          {s.frontmatter.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <div className="mt-10">
                <Waitlist source={`pillar-${frontmatter.slug}`} />
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                <TableOfContents items={tocItems} />
                {spokes.length > 0 && (
                  <nav aria-label="Guides in this hub">
                    <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wide text-[var(--color-mid)]">
                      Guides
                    </h2>
                    <ul className="space-y-2">
                      {spokes.map((s) => (
                        <li key={s.frontmatter.slug}>
                          <Link
                            href={guideUrl(s)}
                            className="text-sm text-[var(--color-ink-soft)] no-underline hover:text-[var(--color-primary)] hover:underline"
                          >
                            {s.frontmatter.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

export const pillarAbsoluteUrl = (guide: Guide) => absoluteUrl(guideUrl(guide));
