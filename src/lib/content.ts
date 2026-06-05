import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content");
const guidesDirectory = path.join(contentDirectory, "guides");

// The three topic clusters (hubs). 'self' marks a pillar page itself.
export type Pillar = "compare" | "ssip" | "documents";
export type PillarOrSelf = Pillar | "self";
export type GuideType = "pillar" | "spoke";

export interface GuideSource {
  url: string;
  /** DD/MM/YYYY the fact was last verified against this source. */
  checked: string;
}

export interface GuideFrontmatter {
  title: string;
  /** Keyword-first, hyphenated, lowercase. Matches the filename. */
  slug: string;
  /** Meta description, 140–160 chars, keyword + reason to click. */
  description: string;
  /** Title tag, <60 chars. Falls back to `title` when absent. */
  seoTitle?: string;
  /** Which hub this belongs to; 'self' for a pillar page. */
  pillar: PillarOrSelf;
  type: GuideType;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** ISO date (YYYY-MM-DD) the page was last reviewed. */
  lastUpdated: string;
  draft?: boolean;
  /** Source URLs the facts came from, for the re-verify loop. */
  sources?: GuideSource[];
}

export interface Guide {
  frontmatter: GuideFrontmatter;
  content: string;
  readingTime: string;
  readingTimeMinutes: number;
}

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDirectory)) return [];
  return fs
    .readdirSync(guidesDirectory)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(guidesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    frontmatter: data as GuideFrontmatter,
    content,
    readingTime: stats.text,
    readingTimeMinutes: Math.ceil(stats.minutes),
  };
}

let cachedGuides: Guide[] | null = null;

export function getAllGuides(): Guide[] {
  if (cachedGuides) return cachedGuides;

  cachedGuides = getGuideSlugs()
    .map((slug) => getGuideBySlug(slug))
    .filter((g): g is Guide => g !== null)
    .filter((g) => g.frontmatter.draft !== true);

  return cachedGuides;
}

/** The pillar page for a given hub (pillar === 'self', the hub stored in `pillarHub`). */
export function getPillar(hub: Pillar): Guide | undefined {
  return getAllGuides().find(
    (g) => g.frontmatter.type === "pillar" && g.frontmatter.slug === hub
  );
}

export function getAllPillars(): Guide[] {
  return getAllGuides().filter((g) => g.frontmatter.type === "pillar");
}

/** All spoke articles belonging to a hub, in build/source order. */
export function getSpokesForPillar(hub: Pillar): Guide[] {
  return getAllGuides().filter(
    (g) => g.frontmatter.type === "spoke" && g.frontmatter.pillar === hub
  );
}

export function getAllSpokes(): Guide[] {
  return getAllGuides().filter((g) => g.frontmatter.type === "spoke");
}

/** Sibling spokes under the same hub, excluding the current one. */
export function getSiblingSpokes(currentSlug: string, hub: Pillar, count = 3): Guide[] {
  return getSpokesForPillar(hub)
    .filter((g) => g.frontmatter.slug !== currentSlug)
    .slice(0, count);
}
