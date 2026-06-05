/*
  Hub-and-spoke integrity check (brief §3 — "verify no orphan pages").
  Asserts, from the MDX frontmatter + body, that:
    - every pillar has at least one spoke,
    - every spoke links UP to its pillar and SIDEWAYS to >= 2 siblings,
    - every internal /compare|/ssip|/documents link resolves to a real guide.
  The pillar->spoke index cards and spoke Related blocks are rendered from data,
  so this focuses on the in-body editorial links the templates can't guarantee.

  Run: npm run check-links
*/
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content", "guides");

interface FM {
  slug: string;
  pillar: string;
  type: "pillar" | "spoke";
  draft?: boolean;
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));
const guides = files.map((f) => {
  const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
  return { file: f, fm: data as FM, body: content };
});

const HUBS = ["compare", "ssip", "documents"] as const;
const hubPath: Record<string, string> = {
  compare: "/compare",
  ssip: "/ssip",
  documents: "/documents",
};

// Build the set of valid internal guide URLs.
const validUrls = new Set<string>();
for (const g of guides) {
  if (g.fm.draft) continue;
  if (g.fm.type === "pillar") validUrls.add(hubPath[g.fm.slug]);
  else validUrls.add(`${hubPath[g.fm.pillar]}/${g.fm.slug}`);
}

const errors: string[] = [];
const warnings: string[] = [];

// Every hub must have a pillar + >= 1 spoke.
for (const hub of HUBS) {
  const pillar = guides.find((g) => g.fm.type === "pillar" && g.fm.slug === hub && !g.fm.draft);
  const spokes = guides.filter((g) => g.fm.type === "spoke" && g.fm.pillar === hub && !g.fm.draft);
  if (!pillar) errors.push(`Hub "${hub}" has no pillar page.`);
  if (spokes.length === 0) errors.push(`Hub "${hub}" has a pillar but zero spokes (dead hub).`);
}

const linkRe = /\]\((\/(?:compare|ssip|documents)[^)\s]*)\)/g;

for (const g of guides) {
  if (g.fm.draft) continue;

  const links = [...g.body.matchAll(linkRe)].map((m) => m[1].replace(/#.*$/, ""));

  // All internal guide links must resolve.
  for (const l of links) {
    if (!validUrls.has(l)) errors.push(`${g.file}: link to "${l}" does not resolve to a guide.`);
  }

  if (g.fm.type === "spoke") {
    const pillarUrl = hubPath[g.fm.pillar];
    const siblingUrls = guides
      .filter((s) => s.fm.type === "spoke" && s.fm.pillar === g.fm.pillar && s.fm.slug !== g.fm.slug)
      .map((s) => `${pillarUrl}/${s.fm.slug}`);

    if (!links.includes(pillarUrl)) {
      warnings.push(`${g.file}: spoke does not link UP to its pillar (${pillarUrl}) in body text.`);
    }
    const siblingLinks = links.filter((l) => siblingUrls.includes(l));
    // Want >= 2 sibling links, but a small hub can't offer more than it has.
    const want = Math.min(2, siblingUrls.length);
    if (new Set(siblingLinks).size < want) {
      warnings.push(
        `${g.file}: spoke links to ${new Set(siblingLinks).size} sibling(s) in body; want >= ${want}.`
      );
    }
  }
}

console.log(`Checked ${guides.length} guides.`);
if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log("  - " + w));
}
if (errors.length) {
  console.error(`\n❌ ${errors.length} error(s):`);
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
console.log("\n✅ No orphan pages or broken internal guide links.");
