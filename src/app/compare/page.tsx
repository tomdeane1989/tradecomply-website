import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPillar } from "@/lib/content";
import { pillarMetadata } from "@/lib/metadata";
import { PillarPage } from "@/components/guide/PillarPage";

export const revalidate = false;

export function generateMetadata(): Metadata {
  return pillarMetadata("compare");
}

export default function ComparePillar() {
  const guide = getPillar("compare");
  if (!guide) notFound();
  return <PillarPage guide={guide} />;
}
