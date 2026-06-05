import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/lib/guides";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  url: string;
  section?: string;
  wordCount?: number;
}

export function ArticleJsonLd({
  title,
  description,
  publishedAt,
  updatedAt,
  url,
  section,
  wordCount,
}: ArticleJsonLdProps) {
  // No editorial hero images on guides — the branded OG card for this route
  // is the article image.
  const imageUrl = `${url}/opengraph-image`;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title.slice(0, 110),
    description,
    image: [imageUrl],
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    inLanguage: "en-GB",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Organization",
      name: "TradeComply",
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "TradeComply",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
        width: 512,
        height: 512,
      },
    },
    ...(section ? { articleSection: section } : {}),
    ...(typeof wordCount === "number" ? { wordCount } : {}),
  };

  return <JsonLd data={data} />;
}
