import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/lib/guides";

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "TradeComply",
        url: SITE_URL,
        inLanguage: "en-GB",
        description:
          "Independent guidance on UK construction accreditation schemes — what they cost, what they cover, and which one a tender actually needs.",
        publisher: { "@id": `${SITE_URL}/#organization` },
      }}
    />
  );
}
