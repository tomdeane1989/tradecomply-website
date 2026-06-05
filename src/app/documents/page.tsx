import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPillar } from "@/lib/content";
import { pillarMetadata } from "@/lib/metadata";
import { PillarPage } from "@/components/guide/PillarPage";

export const revalidate = false;

export function generateMetadata(): Metadata {
  return pillarMetadata("documents");
}

export default function DocumentsPillar() {
  const guide = getPillar("documents");
  if (!guide) notFound();
  return <PillarPage guide={guide} />;
}
