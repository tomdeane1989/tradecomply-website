import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Callout } from "@/components/mdx/Callout";
import { PlainEnglish } from "@/components/mdx/PlainEnglish";
import { WatchOut } from "@/components/mdx/WatchOut";
import { ComparisonTable } from "@/components/mdx/ComparisonTable";
import { TierGrid, TierCard } from "@/components/mdx/TierGrid";
import { StepList, Step } from "@/components/mdx/StepList";
import { FAQAccordion, FAQItem } from "@/components/mdx/FAQAccordion";
import { SourceNote } from "@/components/mdx/SourceNote";

const mdxComponents = {
  Callout,
  PlainEnglish,
  WatchOut,
  ComparisonTable,
  TierGrid,
  TierCard,
  StepList,
  Step,
  FAQAccordion,
  FAQItem,
  SourceNote,
};

export async function compileMDXContent(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      // Our guide MDX is first-party (authored in-repo), not user input.
      // next-mdx-remote defaults to blockJS:true, which strips JSX *expression*
      // attributes (e.g. columns={[...]}) — so component props like the
      // comparison-table data arrive undefined. Disable it to allow object/array
      // props. blockDangerousJS stays on (we use no eval/Function/constructor).
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
    },
  });

  return content;
}
