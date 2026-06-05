import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/content";
import { absoluteUrl, guideUrl } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1.0, lastModified: now },
    { url: absoluteUrl("/product"), changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.4, lastModified: now },
  ];

  const guidePages: MetadataRoute.Sitemap = getAllGuides().map((g) => ({
    url: absoluteUrl(guideUrl(g)),
    lastModified: g.frontmatter.lastUpdated,
    changeFrequency: "monthly",
    priority: g.frontmatter.type === "pillar" ? 0.9 : 0.7,
  }));

  return [...staticPages, ...guidePages];
}
