# Deploying TradeComply — from scratch

You've bought `tradecomply.co.uk` from GoDaddy and nothing else is set up. This
guide takes you all the way to a live, SSL-secured, analytics-tracked,
Search-Console-verified site. Do the stages **in order** — later stages depend on
earlier ones.

Canonical host is **`https://www.tradecomply.co.uk`** (the `www` version). The
non-www apex (`tradecomply.co.uk`) will redirect to it. That's already baked into
the site's SEO config, so don't fight it later.

Rough time: ~30–40 min of clicking, plus up to a few hours of waiting for DNS.

---

## Stage 1 — Put the code on GitHub

Vercel deploys from a Git repo. The project is already a local git repo with one
commit (`main` branch). You just need to push it to GitHub.

1. Go to <https://github.com/new> (sign in as the account that owns your sibling
   repos — the gtm-agents config expects `tomdeane1989/tradecomply-website`).
2. **Repository name:** `tradecomply-website`. Owner: your account
   (`tomdeane1989`). Visibility: **Private** is fine.
3. **Do NOT** tick "Add a README", ".gitignore", or "license" — the repo already
   has them; an extra file would cause a conflict.
4. Click **Create repository**. GitHub shows a "push an existing repository"
   snippet. You want the two `git remote add` / `git push` lines. From a terminal:

   ```bash
   cd ~/Projects/tradecomply-website
   git remote add origin https://github.com/tomdeane1989/tradecomply-website.git
   git push -u origin main
   ```

   If it asks for a password, use a **GitHub personal access token** (Settings →
   Developer settings → Personal access tokens), not your account password.

5. Refresh the GitHub page — you should see all the files.

> Claude can run these push commands for you once the empty repo exists — just
> say so.

---

## Stage 2 — Deploy to Vercel (gets you a live *.vercel.app URL)

1. Go to <https://vercel.com> and **Sign up / Log in with GitHub** (same account).
2. On the dashboard: **Add New… → Project**.
3. **Import Git Repository** → find `tradecomply-website` → **Import**.
   - If Vercel can't see the repo, click "Adjust GitHub App Permissions" and
     grant it access to that repo.
4. **Configure Project** screen:
   - **Framework Preset:** Next.js (auto-detected — leave it).
   - **Root Directory:** leave as `./`.
   - **Build & Output settings:** leave defaults (`next build`).
   - **Environment Variables:** you can skip these for now (we add them in
     Stages 4 & 5 and redeploy). Or add them now if you already have the values.
5. Click **Deploy**. Wait ~1–2 minutes.
6. You get a live URL like `tradecomply-website-xxxx.vercel.app`. Open it — the
   site should work end to end (just not on your real domain yet).

From now on, **every `git push` to `main` auto-deploys.** That's also what the
content/SEO agent's future publish step relies on.

---

## Stage 3 — Connect the domain (Vercel side, then GoDaddy DNS)

### 3a. Add the domains in Vercel

1. In the project: **Settings → Domains**.
2. Add **`www.tradecomply.co.uk`** → **Add**.
3. Add **`tradecomply.co.uk`** (the apex) → **Add**. When prompted, choose to
   **redirect `tradecomply.co.uk` → `www.tradecomply.co.uk`**. This makes `www`
   the primary, matching the site's canonical URLs.
4. Vercel now shows **"Invalid Configuration"** with the exact DNS records it
   wants. They'll be (these are Vercel's standard values — **use whatever Vercel
   shows you** if different):
   - For the apex `tradecomply.co.uk`: an **A record → `76.76.21.21`**
   - For `www`: a **CNAME → `cname.vercel-dns.com`**

   Keep this Vercel tab open while you do GoDaddy.

### 3b. Set the DNS at GoDaddy

1. Go to <https://dcc.godaddy.com/control/portfolio> (or GoDaddy → your name →
   **My Products → Domains**), click **tradecomply.co.uk**, then **DNS** /
   **Manage DNS**.
2. You'll see a **Records** table. GoDaddy pre-creates a "parked" setup. Make it
   look like the below — **edit** existing rows or **delete + add**:

   | Type  | Name | Value                   | TTL     |
   |-------|------|-------------------------|---------|
   | A     | `@`  | `76.76.21.21`           | 600 sec / 1 hr |
   | CNAME | `www`| `cname.vercel-dns.com`  | 1 hr    |

   - The existing **A record on `@`** points at a GoDaddy parking IP — **edit it**
     to `76.76.21.21` (the value Vercel gave). `@` means the apex/root domain.
   - The existing **CNAME `www`** usually points to `@` or a GoDaddy domain —
     **edit it** to `cname.vercel-dns.com`.
   - **Delete** any GoDaddy "Domain Forwarding" / parked-page records if present;
     leave the `NS` and `SOA` records alone.
   - Leave any GoDaddy `MX` (email) records alone if you use GoDaddy email.
3. **Save.**

### 3c. Wait, then confirm

- DNS changes take anywhere from a few minutes to a couple of hours (occasionally
  up to 24–48h, but GoDaddy is usually fast).
- Back on the Vercel **Domains** screen, the records flip to a green
  **"Valid Configuration"** when it resolves. Vercel then **auto-issues a free SSL
  certificate** — no action needed.
- Test: visit `https://www.tradecomply.co.uk` (should load with a padlock) and
  `https://tradecomply.co.uk` (should redirect to the `www` version).
- Check propagation any time at <https://dnschecker.org> (enter your domain).

---

## Stage 4 — Google Analytics 4 (GA4)

1. Go to <https://analytics.google.com> → **Admin** (gear, bottom-left).
2. **Create → Property** (or "+ Create Property"):
   - **Property name:** `TradeComply`
   - **Time zone:** United Kingdom · **Currency:** British Pound (GBP)
   - Continue through the business-details steps (any reasonable answers).
3. When asked to **set up a data stream**, choose **Web**:
   - **Website URL:** `https://www.tradecomply.co.uk`
   - **Stream name:** `TradeComply Web`
   - Create stream.
4. On the stream page, copy the **Measurement ID** — it looks like **`G-XXXXXXXXXX`**.
5. Put it into Vercel as an environment variable:
   - Vercel project → **Settings → Environment Variables**.
   - **Key:** `NEXT_PUBLIC_GA_ID` · **Value:** your `G-XXXXXXXXXX` · Environments:
     tick **Production** (and Preview if you like). **Save.**
6. **Redeploy** so the variable takes effect: Vercel **Deployments** tab → the
   latest deployment → **⋯ → Redeploy**. (Or just `git commit --allow-empty -m
   "trigger deploy" && git push`.)

The site already has **Google Consent Mode v2** wired: analytics stays *off* until
a visitor clicks **Accept** on the cookie banner (the banner only appears once
`NEXT_PUBLIC_GA_ID` is set). After accepting, you'll see traffic in GA4 →
**Reports → Realtime** within a minute. Lead/waitlist submissions fire a
`generate_lead` event.

> If you leave `NEXT_PUBLIC_GA_ID` unset, there's simply no analytics and no
> cookie banner — the site works fine. Nothing breaks.

---

## Stage 5 — Google Search Console (GSC)

This is what lets Google index you **and** what the gtm-agents `seo-monitor`
agent reads. Use the **Domain property** method (it covers www + non-www + http +
https in one go, and matches the `sc-domain:tradecomply.co.uk` value already set
in the agent config).

1. Go to <https://search.google.com/search-console> (same Google account as GA4).
2. **Add property** → choose the **Domain** box (left option) → enter
   `tradecomply.co.uk` (no `https://`, no `www`) → **Continue**.
3. Google gives you a **TXT record** to prove ownership, e.g.
   `google-site-verification=AbC123...`. Copy it.
4. Add it at **GoDaddy DNS** (same Records table as Stage 3b):

   | Type | Name | Value                                   | TTL  |
   |------|------|-----------------------------------------|------|
   | TXT  | `@`  | `google-site-verification=AbC123...`    | 1 hr |

   Save.
5. Wait a few minutes for DNS, then back in GSC click **Verify**. (If it fails
   the first time, wait 10–15 min and retry — the TXT record needs to propagate.)
6. Once verified: **Sitemaps** (left menu) → under "Add a new sitemap" enter
   `sitemap.xml` → **Submit**. Full URL is
   `https://www.tradecomply.co.uk/sitemap.xml`. GSC should report ~13 URLs
   discovered (it can take a day to show "Success").

> **Alternative (only if you can't do the TXT record):** you could instead create
> a **URL-prefix** property for `https://www.tradecomply.co.uk` and verify with
> the **HTML tag** method — paste the tag's token into Vercel env var
> `NEXT_PUBLIC_GSC_VERIFICATION` and redeploy. But the **Domain + TXT** method
> above is preferred and is what the agent config assumes, so use that if you can.

---

## Stage 6 — Hand off to the gtm-agents SEO agent (optional, later)

The website **code** side of the agent integration is already done. Once the site
is live and GSC is collecting data (give it 1–2 weeks of impressions), do these
runtime steps in `~/Projects/gtm-agents`:

- [ ] Confirm `repo:` in `src/sites/tradecomply.ts` matches the real GitHub slug.
- [ ] Install the gtm-agents **GitHub App** on the `tradecomply-website` repo
      (read-only — lets the agent read your published guide slugs/content).
- [ ] In Supabase, insert the `sites` row for tradecomply (domain, repo,
      content_dir `content/guides`, file_extension `mdx`).
- [ ] Run `npm run gsc-auth` once to capture the GSC OAuth refresh token (it
      reuses the same Google account you verified GSC with).
- [ ] First manual run: `npm run seo -- tradecomply` and check the output /
      Slack digest.

The agent then runs on its existing cron (Sun/Wed) once it has ≥30 query rows.

---

## Quick reference — exact DNS records at GoDaddy

After Stages 3 and 5, your GoDaddy DNS should contain (alongside the untouched
`NS`/`SOA`/any `MX`):

| Type  | Name | Value                                | Purpose                |
|-------|------|--------------------------------------|------------------------|
| A     | `@`  | `76.76.21.21`                        | apex → Vercel          |
| CNAME | `www`| `cname.vercel-dns.com`               | www → Vercel           |
| TXT   | `@`  | `google-site-verification=…`         | GSC ownership          |

(Use the exact A/CNAME values Vercel shows you, and the exact TXT value GSC gives
you — the ones above are the standard/typical values.)

## Troubleshooting

- **Vercel domain stuck on "Invalid Configuration":** the DNS hasn't propagated
  or a value is wrong. Re-check the A/CNAME at GoDaddy against what Vercel shows;
  wait; check at dnschecker.org.
- **Site loads on www but not apex (or vice-versa):** make sure BOTH domains are
  added in Vercel and the apex is set to redirect to www.
- **No SSL padlock yet:** Vercel issues the cert automatically *after* DNS
  resolves — just wait; it's usually minutes.
- **GA4 shows nothing:** confirm `NEXT_PUBLIC_GA_ID` is set in Vercel **and** you
  redeployed afterwards, and that you clicked **Accept** on the cookie banner.
- **GSC "Couldn't verify":** the TXT record isn't visible yet — wait 15 min and
  retry; confirm Name is `@` (apex), not `www`.
