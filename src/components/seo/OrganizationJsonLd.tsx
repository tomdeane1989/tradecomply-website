import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/lib/guides";

export function OrganizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "TradeComply",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 512,
      height: 512,
    },
    description:
      "Independent, no-upsell guidance on UK construction accreditation schemes (CHAS, SafeContractor, Constructionline, SSIP) for subcontractors.",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    // TODO: add `sameAs` (real social profile URLs) and a contactPoint once
    // confirmed — do not point at non-existent profiles.
  };

  return <JsonLd data={data} />;
}
