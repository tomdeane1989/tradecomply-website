import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About TradeComply — independent accreditation guidance",
  description:
    "Why TradeComply exists: a neutral, ad-free source on UK construction accreditation — no done-for-you upsell. How we keep our figures honest and current.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="px-5 py-12 md:py-16">
      <div className="mx-auto max-w-[var(--readw)]">
        <h1 className="font-head text-[clamp(31px,6.4vw,48px)] font-bold leading-[1.05] tracking-tight text-[var(--color-ink)]">
          Why TradeComply exists
        </h1>
        <div className="prose mt-8">
          <p>
            If you&apos;re a small UK subcontractor, the accreditation maze is its own job. CHAS,
            SafeContractor, Constructionline, SMAS, Acclaim — overlapping schemes, annual renewals,
            and consultants offering to fill in the forms for £600 plus VAT. Most of the content you
            find online is bait for that service, and it goes quiet exactly where the useful detail
            should start.
          </p>
          <p>
            TradeComply is the opposite. We&apos;re an independent information resource. We don&apos;t
            sell form-filling, we don&apos;t take placement fees from the schemes, and we don&apos;t
            run ads. That neutrality is the whole point — it&apos;s what lets us publish the real
            figures and the full question categories that the consultancies bury.
          </p>
          <h2>How we keep it honest</h2>
          <p>
            Scheme fees, tiers, and question sets change. So every guide carries a visible{" "}
            <strong>&ldquo;last reviewed&rdquo;</strong> date and a record of the sources we checked.
            Where we can&apos;t verify a specific figure from a primary source, we say so and describe
            the category instead of inventing a number. If you spot something out of date, tell us.
          </p>
          <h2>What we&apos;re building</h2>
          <p>
            The honest, residual pain — the part mutual recognition doesn&apos;t solve — is tracking
            renewal deadlines, re-uploading the same evidence to each scheme, and the tiers that
            aren&apos;t mutually recognised. That&apos;s the{" "}
            <Link href="/product">tool we&apos;re building</Link>. We&apos;ll fund it once these
            guides prove there&apos;s demand.
          </p>
          <p className="text-sm text-[var(--color-mid)]">
            TradeComply is informational only and not compliance or legal advice. Always confirm
            current requirements with the scheme or client before you pay.
          </p>
        </div>
      </div>
    </main>
  );
}
