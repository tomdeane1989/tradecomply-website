import { compileMDXContent } from "@/lib/mdx";
import { extractToc } from "@/lib/toc";
import { extractFaq } from "@/lib/faq";
import type { Guide, Pillar } from "@/lib/content";
import { getPillar, getSiblingSpokes } from "@/lib/content";
import { absoluteUrl, breadcrumbsFor, guideUrl } from "@/lib/guides";
import { Breadcrumbs } from "./Breadcrumbs";
import { LastReviewed } from "./LastReviewed";
import { TableOfContents } from "./TableOfContents";
import { RelatedGuides } from "./RelatedGuides";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FAQJsonLd } from "@/components/seo/FAQJsonLd";
import { Waitlist } from "@/components/Waitlist";

export async function SpokeArticle({ guide }: { guide: Guide }) {
  const { frontmatter, content, readingTime } = guide;
  const hub = frontmatter.pillar as Pillar;

  const tocItems = extractToc(content);
  const mdxContent = await compileMDXContent(content);
  const pillar = getPillar(hub);
  const siblings = getSiblingSpokes(frontmatter.slug, hub, 3);
  const faqs = extractFaq(content);
  const crumbs = breadcrumbsFor(guide);
  const url = absoluteUrl(guideUrl(guide));

  return (
    <>
      <ArticleJsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        publishedAt={frontmatter.lastUpdated}
        updatedAt={frontmatter.lastUpdated}
        url={url}
        section={pillar?.frontmatter.title}
        wordCount={content.trim().split(/\s+/).length}
      />
      <BreadcrumbJsonLd items={crumbs} />
      {faqs.length > 0 && <FAQJsonLd questions={faqs} />}

      <main className="px-5 py-10 md:py-14">
        <div className="mx-auto max-w-[var(--maxw)]">
          <Breadcrumbs items={crumbs} />

          <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
            <article className="min-w-0">
              <header className="mb-8">
                <h1 className="font-head text-[clamp(31px,6.4vw,48px)] font-bold leading-[1.05] tracking-tight text-[var(--color-ink)]">
                  {frontmatter.title}
                </h1>
                <p className="mt-4 text-lg text-[var(--color-ink-soft)]">
                  {frontmatter.description}
                </p>
                <div className="mt-4">
                  <LastReviewed date={frontmatter.lastUpdated} meta={readingTime} />
                </div>
              </header>

              {/* Mobile TOC */}
              {tocItems.length > 0 && (
                <div className="mb-8 rounded-xl border p-4 lg:hidden border-[var(--color-hair)] bg-[var(--color-surface)]">
                  <TableOfContents items={tocItems} />
                </div>
              )}

              <div className="prose">{mdxContent}</div>

              <RelatedGuides pillar={pillar} siblings={siblings} />

              <div className="mt-10">
                <Waitlist source={`spoke-${frontmatter.slug}`} />
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
