// GA4 measurement id, supplied via env. Blank disables analytics entirely
// (see layout.tsx — the gtag scripts are only rendered when GA_ID is set).
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
