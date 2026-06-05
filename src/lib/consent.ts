export type ConsentState = "granted" | "denied";

const STORAGE_KEY = "tc-consent";

export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function setStoredConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, state);
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: state,
    });
  }
}
