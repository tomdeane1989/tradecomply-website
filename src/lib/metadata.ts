import type { Metadata } from "next";
import type { Pillar } from "./content";
import { getGuideBySlug, getPillar } from "./content";
import { guideUrl } from "./guides";

/** Metadata for a pillar page (slug === hub). */
export function pillarMetadata(hub: Pillar): Metadata {
  const guide = getPillar(hub);
  if (!guide) return {};
  const { frontmatter } = guide;
  const path = guideUrl(guide);

  return {
    title: frontmatter.seoTitle || frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: path },
    openGraph: {
      title: frontmatter.seoTitle || frontmatter.title,
      description: frontmatter.description,
      url: path,
      type: "website",
    },
  };
}

/** Metadata for a spoke article under a hub. */
export function spokeMetadata(hub: Pillar, slug: string): Metadata {
  const guide = getGuideBySlug(slug);
  if (!guide || guide.frontmatter.pillar !== hub) return {};
  const { frontmatter } = guide;
  const path = guideUrl(guide);

  return {
    title: frontmatter.seoTitle || frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: path },
    openGraph: {
      title: frontmatter.seoTitle || frontmatter.title,
      description: frontmatter.description,
      url: path,
      type: "article",
      publishedTime: frontmatter.lastUpdated,
      modifiedTime: frontmatter.lastUpdated,
    },
  };
}
