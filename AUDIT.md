# TradeComply — SEO/GEO audit (rubric v1)

Graded against the gtm-agents rubric (`~/Projects/gtm-agents/SEO Skills/scoring-rubric.md`):
five sections, 100 pts — **A** On-page (25), **B** GEO/extractability (30),
**C** metadata & structured data (20), **D** authority/E-E-A-T (15), **E** quality
gate (10). Grade bands: A 90–100, B 75–89, C 60–74, D 45–59, F 0–44.

This is an expert application of the rubric (the automated content-audit agent
needs live GSC + Supabase data the site doesn't have yet). Scores are indicative,
not to the single point. `rubric_version: v1`. Audited 05/06/2026.

## Headline

The site was already strong (**≈ B, 83**): every page ships self-canonical, full
Open Graph **and** Twitter tags, a per-route branded OG image, Article + Breadcrumb
+ FAQPage + Organization + WebSite JSON-LD, comparison tables, a 3–5 Q&A FAQ, a
featured-snippet TL;DR opener, visible "last reviewed" dates, and clean
hub-and-spoke internal linking. This pass lifts it to **≈ A (93)** by closing the
real gaps below.

## What was already good (kept)

- **C — metadata & schema: ~20/20.** Canonicals, OG (all 5 tags), Twitter cards,
  Article/Breadcrumb/FAQ + Org/WebSite JSON-LD, visible + schema dates. (Several
  "missing" flags in the first-pass machine audit were false — og:image and
  Twitter tags are present on every page; the "37-char meta" was a YAML-parsing
  artifact.)
- **B6/B5/B1** — comparison tables, self-contained FAQs, and strong TL;DR openers
  throughout.
- **A1/A3/A4/A6/A7** — titles ≤60 with keyword, keyword-first slugs, one H1 per
  page distinct from the title tag, keyword in the first 100 words and an H2, ≥3
  descriptive internal links.

## What we fixed this pass

| Gap (before) | Rubric | Change |
| --- | --- | --- |
| Meta descriptions 156–186 chars | A2 | Trimmed every page (14 guides + home/product/about) to ≤155 |
| Schemes/acronyms unexpanded for cold readers (CHAS, SafeContractor, RAMS, COSHH, SSIP, DtS…) | B2, E1 | Expanded on first use inline; added a **Key terms** glossary box on all three pillars |
| Sources hidden in frontmatter; no byline | D1, D2, D3 | New **Sources** block (visible, dated) at the foot of every guide; **"By the TradeComply desk"** byline + a "how we keep this current" line |
| Visible `TODO(verify)` markers (5×) | E2, trust | Reworded to reader-friendly honesty; bookkeeping kept in the invisible source comments |
| A few statement H2s where a question fits | B3 | Converted where natural (e.g. "How much does each one cost?") |
| Coverage gaps | gap | Added 4 spokes: SafeContractor explained, SMAS Worksafe, Acclaim→Once For All, renewal/expiry deadlines |

## Section scores — before → after (representative)

| Section | Max | Before | After | Why the lift |
| --- | --- | --- | --- | --- |
| A On-page | 25 | 22 | 24 | A2 meta length fixed (A8 image-alt N/A → redistributed) |
| B GEO | 30 | 24 | 27 | B2 standalone-readability (acronyms expanded), B3 question headers |
| C Schema | 20 | 20 | 20 | already full |
| D Authority | 15 | 8 | 13 | visible Sources (D1/D3) + byline (D2) |
| E Quality | 10 | 9 | 10 | removed reader-facing TODO markers (E2) |
| **Total** | **100** | **≈83 (B)** | **≈94 (A)** | |

D2 stays short of full because the byline is an editorial desk, not a named,
credentialed individual (a deliberate choice — no invented personas).

## Per-page summary (14 guides + 3 money pages)

All guides share the same template and now score in the **A** band (≈90–95). The
4 new spokes are built to the same standard (TL;DR, comparison table where useful,
3–4 self-contained FAQs, Sources, ≥3 internal links).

| Page | Type | Before | After |
| --- | --- | --- | --- |
| `/compare`, `/ssip`, `/documents` | pillar | B (~84) | A (~94) — + Key terms box |
| `/compare/chas-cost`, `…/safecontractor-cost` | spoke | B (~83) | A (~93) |
| `/compare/chas-vs-…`, `…/constructionline-gold-…` | spoke | B (~84) | A (~94) |
| `/compare/safecontractor-explained` *(new)* | spoke | — | A (~92) |
| `/compare/smas-worksafe-explained` *(new)* | spoke | — | A (~92) |
| `/ssip/ssip-mutual-recognition-explained` | spoke | B (~84) | A (~94) |
| `/ssip/common-assessment-standard-question-set` | spoke | B (~83) | A (~93) |
| `/ssip/acclaim-once-for-all-ssip` *(new)* | spoke | — | A (~92) |
| `/documents/chas-documents-checklist` | spoke | B (~82) | A (~92) |
| `/documents/accreditation-renewal-deadlines` *(new)* | spoke | — | A (~92) |
| `/`, `/product`, `/about` | money | B (~80) | A- (~88) — meta trimmed |

## Honesty notes (unverified facts → reader-friendly hedges, not guesses)

Per the brief's no-invented-figures rule, these stay hedged on-page (verification
context lives in each file's top `{/* SOURCES … */}` comment):

- Constructionline per-tier prices (turnover-banded; "from £219" entry confirmed).
- SafeContractor / SMAS joining-fee amounts and the "+VAT" suffix (not shown on
  the pages — we don't assert it).
- A single Common Assessment Standard price (none published; you pay the body).
- SMAS Worksafe Pro "desktop-only" CAS level (primary-confirmed it offers CAS;
  "desktop-only" only search-level — stated cautiously).
- No scheme publishes a formal renewal grace period — we say so rather than imply one.

## Recommended next (not done this pass)

- A routed `/glossary` page (the Key terms data already exists in `KeyTerms.tsx`)
  — could rank for "CHAS meaning / what is SSIP".
- Editorial hero images per guide (would activate rubric A8 image-alt).
- Once GSC has ~2 weeks of impressions, hand off to the gtm-agents `seo-monitor`
  agent (Stage 6 in `DEPLOYMENT.md`) for data-driven `refresh`/`gap` recs.
