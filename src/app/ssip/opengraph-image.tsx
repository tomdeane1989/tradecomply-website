import { getPillar } from "@/lib/content";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = OG_SIZE;

export default function Image() {
  const guide = getPillar("ssip");
  return renderOgImage(guide?.frontmatter.title ?? "SSIP accreditation explained", "SSIP");
}
