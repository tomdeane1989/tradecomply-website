import { NextResponse } from "next/server";

// Waitlist endpoint. Posts the email to a Google Apps Script web app — the SAME
// sheet the sibling LandlordReady site uses (its payload shape is matched below,
// so the existing script handles these rows). Rows are tagged `tradecomply:` in
// the `source` field so they're distinguishable in the shared sheet.
// Override per-environment with WAITLIST_WEBHOOK_URL if you later split sheets.
const WEBHOOK_URL =
  process.env.WAITLIST_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbypwSgfKD-_R-xfr6KpnTSE32OplCd82DJ4bsRoJ6VnK89rDhC6Nqzxxgi49Gpbjok/exec";

export async function POST(request: Request) {
  try {
    const { email, source = "unknown" } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        phone: "",
        companyName: "",
        source: `tradecomply:${source}`,
      }),
    });

    if (!res.ok) throw new Error(`Webhook returned ${res.status}`);

    return NextResponse.json({ success: true, persisted: true });
  } catch (err) {
    console.error("Waitlist signup error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
