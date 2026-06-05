# TradeComply website

Content-led SEO site for **TradeComply** (`tradecomply.co.uk`) — independent,
no-upsell guidance on UK construction accreditation schemes (CHAS,
SafeContractor, Constructionline, SSIP, the Common Assessment Standard), with an
email waitlist for the future compliance tracker.

Built to match the sibling sites (`commit-website`, `landlordready-website`):
**Next.js 16 · React 19 · Tailwind 4 · MDX** (`next-mdx-remote/rsc`). Design
follows the approved mockups in `~/Projects/tradecomply/` ("Direction A —
Petrol": Sora / IBM Plex Sans / IBM Plex Mono, petrol-teal + gold).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static)
npm run check-links # hub-and-spoke integrity: no orphans / broken guide links
```

## Architecture — hub and spoke

Three layers, wired by internal links (the core SEO mechanic):

- **Money pages** — `/` and `/product` (`src/app/page.tsx`, `product/page.tsx`).
- **Pillars** — `/compare`, `/ssip`, `/documents`. Broad hubs that link down to
  every spoke.
- **Spokes** — long-tail articles at `/<pillar>/<slug>`, each linking **up** to
  its pillar and **sideways** to ≥2 siblings.

All guide content lives as **flat MDX files in `content/guides/`** (filename =
slug). The nested URL is derived from frontmatter (`pillar` + `type`), so the
content directory stays flat — which is what the gtm-agents SEO agent reads.

## Adding a new spoke

1. Create `content/guides/<keyword-first-slug>.mdx`. The filename **is** the
   slug and the last URL segment.
2. Frontmatter (enforced by `GuideFrontmatter` in `src/lib/content.ts`):

   ```yaml
   ---
   title: "How Much Does CHAS Cost? (2026 Pricing)"
   slug: chas-cost                 # must match the filename
   description: 140–160 char meta description with the keyword + a reason to click
   seoTitle: CHAS Cost 2026 — Standard, Advanced & Elite Prices   # <60 chars
   pillar: compare                 # compare | ssip | documents  ('self' = a pillar page)
   type: spoke                     # pillar | spoke
   primaryKeyword: chas cost
   secondaryKeywords: [chas price, how much is chas membership]
   lastUpdated: "2026-06-05"       # shown on-page as "Last reviewed DD/MM/YYYY"
   draft: false
   sources:
     - url: https://www.chas.co.uk/contractors/products-packages/
       checked: "05/06/2026"
   ---
   ```

3. **Linking rules** (verified by `npm run check-links`): the body must link up
   to its pillar (`/compare`, `/ssip` or `/documents`) and to ≥2 sibling spokes,
   using descriptive keyword anchor text.
4. **Freshness / sources convention**: keep a `{/* SOURCES … */}` comment block
   at the top of the file listing the source URLs and the date checked, plus the
   `sources` frontmatter. Never invent a fee or statistic — if you can't verify
   a number from a primary source, describe the category and leave a
   `TODO(verify)` marker. Current open markers: grep `TODO(verify)` in
   `content/guides/`.
5. Routing, sitemap, RSS, breadcrumbs, JSON-LD and the OG card are all
   automatic. No code change needed to publish a new guide.

### MDX components

Registered in `src/lib/mdx.ts`: `ComparisonTable`, `TierGrid`/`TierCard`,
`PlainEnglish`, `Callout`, `WatchOut`, `StepList`/`Step`,
`FAQAccordion`/`FAQItem`, `SourceNote`.

> **Note:** `src/lib/mdx.ts` sets `blockJS: false` on `compileMDX`. This is
> required — next-mdx-remote's default strips JSX **expression** attributes
> (e.g. `columns={[…]}`), which would make object/array props like the
> comparison-table data arrive `undefined`. Our MDX is first-party, so allowing
> JS expressions is safe.

FAQ JSON-LD (`FAQPage`) is generated automatically from a markdown
`## Frequently Asked Questions` section with `###` question subheadings — write
the FAQ that way (see any existing spoke) rather than only using
`<FAQAccordion>`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in as they become available:

| Var | Purpose |
| --- | --- |
| `WAITLIST_WEBHOOK_URL` | Endpoint `/api/waitlist` POSTs signups to (a Google Apps Script web app, like the sibling sites). If blank, signups are logged, not persisted — no backend is invented. |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement id. Blank disables analytics (and the cookie banner). Consent Mode v2 defaults analytics to denied until accepted. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag verification token. Needed once to verify the property. |

## SEO surface

- `src/app/sitemap.ts` → `/sitemap.xml` (every non-draft page)
- `src/app/robots.ts` → `/robots.txt`
- `src/app/rss.xml/route.ts` → `/rss.xml`
- Canonicals + OG/Twitter via `generateMetadata` (canonical host is
  **`https://www.tradecomply.co.uk`**; point `.com` → `.co.uk` 301 in DNS later).
- JSON-LD in `src/components/seo/`: Organization + WebSite (sitewide),
  BreadcrumbList + Article (spokes), FAQPage (any page with an FAQ section).
- Branded petrol/gold OG cards via `opengraph-image.tsx` (root + each route),
  shared renderer in `src/lib/og.tsx`.

## gtm-agents integration

The site is built to be monitored by the gtm-agents `seo-monitor` agent with no
extra wiring: flat `content/guides/` directory, slug = filename, typed
frontmatter, a sitemap, and schema.org markup. The **code** side is already
done — `~/Projects/gtm-agents/src/sites/tradecomply.ts` plus registration in
`index.ts`, `types.ts` and `seo-config.ts` (typecheck passes).

**Go-live checklist** (runtime steps that need the live domain — do these once
the site is deployed):

- [ ] Push this repo to GitHub and confirm the slug in
      `gtm-agents/src/sites/tradecomply.ts` (`repo:` field).
- [ ] Install the gtm-agents GitHub App on the repo (read-only content access).
- [ ] Create + verify the `tradecomply.co.uk` Search Console property; set
      `NEXT_PUBLIC_GSC_VERIFICATION` and confirm Domain vs URL-prefix in
      `gtm-agents/src/sites/seo-config.ts`.
- [ ] Run `npm run gsc-auth` in gtm-agents to capture `GSC_OAUTH_REFRESH_TOKEN`.
- [ ] Insert the Supabase `sites` row for tradecomply.
- [ ] First manual run: `npm run seo -- tradecomply`.

## Honesty guardrails

Independent and ad-free; **no done-for-you / form-filling upsell** (that
neutrality is the differentiator). No invented figures. The product is described
in future / "coming soon" framing only. Footer carries the "informational only,
not compliance advice" disclaimer.
