import { OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage(
    "UK construction accreditation, explained in plain English",
    "Independent & ad-free"
  );
}
