import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideBySlug, getSpokesForPillar } from "@/lib/content";
import { spokeMetadata } from "@/lib/metadata";
import { SpokeArticle } from "@/components/guide/SpokeArticle";

export const revalidate = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getSpokesForPillar("compare").map((g) => ({ slug: g.frontmatter.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return spokeMetadata("compare", slug);
}

export default async function CompareSpoke({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide || guide.frontmatter.pillar !== "compare" || guide.frontmatter.draft) notFound();
  return <SpokeArticle guide={guide} />;
}
