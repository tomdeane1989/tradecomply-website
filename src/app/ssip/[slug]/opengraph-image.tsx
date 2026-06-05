import { getGuideBySlug, getSpokesForPillar } from "@/lib/content";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = OG_SIZE;

export function generateStaticParams() {
  return getSpokesForPillar("ssip").map((g) => ({ slug: g.frontmatter.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  return renderOgImage(guide?.frontmatter.title ?? "SSIP accreditation explained", "SSIP");
}
