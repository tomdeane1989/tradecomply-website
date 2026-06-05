import { getAllGuides } from "@/lib/content";
import { absoluteUrl, guideUrl, SITE_NAME, SITE_URL } from "@/lib/guides";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const guides = [...getAllGuides()].sort(
    (a, b) =>
      new Date(b.frontmatter.lastUpdated).getTime() -
      new Date(a.frontmatter.lastUpdated).getTime()
  );

  const items = guides
    .map((g) => {
      const url = absoluteUrl(guideUrl(g));
      return `    <item>
      <title>${escapeXml(g.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(g.frontmatter.description)}</description>
      <pubDate>${new Date(g.frontmatter.lastUpdated).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Independent guidance on UK construction accreditation schemes.</description>
    <language>en-GB</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
