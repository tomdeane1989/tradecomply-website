import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const PETROL = "#1b3a38";
const GOLD = "#e6b54a";
const CREAM = "#faf9f5";

/** Branded petrol/gold OG card shared by the root and every guide route. */
export function renderOgImage(title: string, kicker?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 80px",
          backgroundColor: PETROL,
          color: CREAM,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {kicker && (
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: GOLD,
              marginBottom: 24,
            }}
          >
            {kicker}
          </div>
        )}
        <div
          style={{
            fontSize: title.length > 60 ? 46 : 56,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1,
            maxWidth: "92%",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "auto", gap: 14 }}>
          {/* stacked-brick mark */}
          <svg width="40" height="40" viewBox="0 0 100 100">
            <rect x="30" y="57" width="18" height="10" rx="2" fill="none" stroke={CREAM} strokeWidth="3.2" />
            <rect x="52" y="57" width="18" height="10" rx="2" fill="none" stroke={CREAM} strokeWidth="3.2" />
            <rect x="41" y="41" width="18" height="10" rx="2" fill="none" stroke={GOLD} strokeWidth="3.2" />
          </svg>
          <div style={{ fontSize: 26, fontWeight: 700, color: CREAM }}>TradeComply</div>
          <div style={{ fontSize: 18, color: CREAM, opacity: 0.7 }}>
            — independent UK accreditation guidance
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
