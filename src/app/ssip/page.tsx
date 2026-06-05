import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPillar } from "@/lib/content";
import { pillarMetadata } from "@/lib/metadata";
import { PillarPage } from "@/components/guide/PillarPage";

export const revalidate = false;

export function generateMetadata(): Metadata {
  return pillarMetadata("ssip");
}

export default function SSIPPillar() {
  const guide = getPillar("ssip");
  if (!guide) notFound();
  return <PillarPage guide={guide} />;
}
