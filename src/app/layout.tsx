import type { Metadata } from "next";
import Script from "next/script";
import { Sora, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieConsent } from "@/components/CookieConsent";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";
import { GA_ID } from "@/lib/analytics";
import { SITE_URL } from "@/lib/guides";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
});

const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  title: {
    default: "TradeComply — UK Construction Accreditation, Explained",
    template: "%s | TradeComply",
  },
  description:
    "Independent, no-upsell guidance on UK construction accreditation — CHAS, SafeContractor, Constructionline, SSIP. What each costs and which you need.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "TradeComply",
  },
  twitter: {
    card: "summary_large_image",
  },
  ...(GSC_VERIFICATION
    ? { verification: { google: GSC_VERIFICATION } }
    : {}),
  other: {
    "geo.region": "GB",
    "geo.placename": "United Kingdom",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <head>
        {GA_ID && (
          <>
            {/* Google Consent Mode v2 — runs before GA4 loads; analytics denied
                by default until the visitor accepts (see CookieConsent). */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('consent', 'default', {
                    analytics_storage: 'denied',
                    ad_storage: 'denied',
                    ad_user_data: 'denied',
                    ad_personalization: 'denied',
                    wait_for_update: 500,
                  });
                `,
              }}
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`gtag('js', new Date()); gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body className={`${sora.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}>
        <SiteHeader />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
