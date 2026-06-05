import { getPillar } from "@/lib/content";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = OG_SIZE;

export default function Image() {
  const guide = getPillar("compare");
  return renderOgImage(guide?.frontmatter.title ?? "Compare accreditation schemes", "Compare");
}
