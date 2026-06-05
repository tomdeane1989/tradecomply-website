import type { Guide, Pillar, PillarOrSelf } from "./content";

export const SITE_URL = "https://www.tradecomply.co.uk";
export const SITE_NAME = "TradeComply";

export interface HubMeta {
  hub: Pillar;
  /** Short nav label. */
  label: string;
  /** Breadcrumb / crumb label. */
  crumb: string;
  /** Pretty path of the pillar page. */
  path: string;
}

export const HUBS: Record<Pillar, HubMeta> = {
  compare: { hub: "compare", label: "Compare", crumb: "Compare", path: "/compare" },
  ssip: { hub: "ssip", label: "SSIP", crumb: "SSIP", path: "/ssip" },
  documents: {
    hub: "documents",
    label: "Documents",
    crumb: "Documents",
    path: "/documents",
  },
};

export const HUB_ORDER: Pillar[] = ["compare", "ssip", "documents"];

/** The canonical, nested URL for any guide (pillar or spoke). */
export function guideUrl(guide: Guide): string {
  const { pillar, type, slug } = guide.frontmatter;
  if (type === "pillar") return HUBS[slug as Pillar].path;
  return `${HUBS[pillar as Pillar].path}/${slug}`;
}

/** Absolute URL form, for canonicals / JSON-LD / OG. */
export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export interface Crumb {
  name: string;
  url: string;
}

/** Home > Pillar > Spoke breadcrumb trail for a guide. */
export function breadcrumbsFor(guide: Guide): Crumb[] {
  const crumbs: Crumb[] = [{ name: "Home", url: "/" }];
  const { type, pillar, title, slug } = guide.frontmatter;

  if (type === "pillar") {
    crumbs.push({ name: HUBS[slug as Pillar].crumb, url: HUBS[slug as Pillar].path });
  } else {
    const hub = pillar as Pillar;
    crumbs.push({ name: HUBS[hub].crumb, url: HUBS[hub].path });
    crumbs.push({ name: title, url: guideUrl(guide) });
  }
  return crumbs;
}

export function hubOf(pillar: PillarOrSelf, slug: string): Pillar {
  return (pillar === "self" ? (slug as Pillar) : pillar) as Pillar;
}

/** Human label for a hub used in CTAs and related blocks. */
export const HUB_HEADLINE: Record<Pillar, string> = {
  compare: "Compare accreditation schemes",
  ssip: "Understand SSIP",
  documents: "Compliance documents",
};
