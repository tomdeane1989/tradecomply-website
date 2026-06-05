// GA4 measurement id. Defaults to the TradeComply property; override per-env
// with NEXT_PUBLIC_GA_ID. GA ids are client-side/public (they appear in page
// source), so hardcoding the default is fine — same pattern as the sibling
// sites. Set the default to "" to disable analytics + the cookie banner.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-4EEGC8J6T7";

export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
