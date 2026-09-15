# GitHub Pages Setup — itclub.techaicollege.edu.np

The Tech & AI Innovation Club platform (public website, membership application, member area, committee tool, membership cards and QR verification) is published as a static site from this repository to GitHub Pages, and served on the custom domain through Cloudflare. There is no server component.

```
GitHub repository  →  GitHub Actions (npm run build)  →  GitHub Pages
                                                                      ↓
                              Cloudflare DNS (CNAME itclub → bikashkadayat.github.io)
                                                                      ↓
                                                  https://itclub.techaicollege.edu.np
```

Everything below is a one-time setup. After that, every push to `main` redeploys the site automatically.

---

## 1. Repository settings

1. Create the repository on GitHub under the **bikashkadayat** account (for example `bikashkadayat/taic-website`). Public or private both work with GitHub Actions deployments; a private repository requires GitHub Pro / Team for Pages.
2. Push this project to the `main` branch:

   ```bash
   git init -b main
   git add .
   git commit -m "Tech & AI Innovation Club website"
   git remote add origin git@github.com:bikashkadayat/<repository>.git
   git push -u origin main
   ```

   `.env`, `.env.local`, `node_modules`, `out/`, `.next/` and the local database folder are already ignored by `.gitignore`. Never commit `.env`.
3. **Settings → Actions → General → Workflow permissions**: leave *Read and write permissions* or *Read repository contents* — the deploy workflow declares its own `pages: write` and `id-token: write` permissions, so the default is fine.
4. Optional repository variables (**Settings → Secrets and variables → Actions → Variables → New repository variable**):

   | Variable | Purpose |
   | --- | --- |
   | `NEXT_PUBLIC_CONTACT_EMAIL` | The club inbox. Shown on the Contact page and used by the forms' email fallback. |
   | `NEXT_PUBLIC_FORM_ENDPOINT` | Optional JSON endpoint that receives membership, contact and newsletter submissions (see `docs/STATIC_PLATFORM.md`). Recommended. |

   These are plain variables, not secrets, because they are compiled into the public site.

---

## 2. Pages configuration

1. Open **Settings → Pages**.
2. Under **Build and deployment → Source** choose **GitHub Actions** (not "Deploy from a branch").
3. Nothing else is needed here yet; the first successful workflow run creates the `github-pages` environment automatically.

---

## 3. Source setup (the workflow)

The workflow lives at `.github/workflows/deploy.yml` and runs on every push to `main` (and manually from the **Actions** tab via *Run workflow*). It:

1. Installs dependencies with `npm ci`.
2. Runs `npm run build`, which exports every page with `output: "export"` and writes `out/CNAME` (`itclub.techaicollege.edu.np`) and `out/.nojekyll`.
3. Verifies `out/index.html`, `out/404.html`, `out/CNAME` and `out/.nojekyll` exist.
4. Uploads `out/` and deploys it with `actions/deploy-pages`.

To test the exact same build locally:

```bash
npm run build      # → out/
npm run preview    # serves out/ at http://localhost:3000, including 404.html behaviour
```

---

## 4. Domain setup

1. Configure DNS at Cloudflare first (see `CLOUDFLARE_SETUP.md`): a `CNAME` record `itclub` → `bikashkadayat.github.io`, **DNS only** (grey cloud) until HTTPS is issued.
2. Back in **Settings → Pages → Custom domain**, enter `itclub.techaicollege.edu.np` and click **Save**. GitHub runs a DNS check; it passes once the CNAME record has propagated (usually within minutes, up to 24 h).
3. `public/CNAME` already contains the domain and is copied into every deployment, so the custom domain never gets reset by a redeploy.
4. Wait for the certificate. GitHub requests a Let's Encrypt certificate automatically; the Pages settings page shows *Certificate: issued* when ready (typically 5 to 30 minutes).
5. Tick **Enforce HTTPS**.
6. Optionally enable the Cloudflare proxy (orange cloud) afterwards, as described in `CLOUDFLARE_SETUP.md`.

**Recommended:** verify the parent domain on GitHub to stop anyone else from claiming the subdomain if the Pages site is ever removed. **Profile → Settings → Pages → Add a domain** → `techaicollege.edu.np` → add the `TXT` record GitHub shows (`_github-pages-challenge-bikashkadayat`) at Cloudflare.

---

## 5. Verification steps

After the first successful **Deploy to GitHub Pages** run:

- [ ] **Actions** tab shows the workflow green; the *Deploy* job prints the Pages URL.
- [ ] `https://bikashkadayat.github.io/<repository>/` redirects to the custom domain (GitHub does this once the CNAME is set).
- [ ] `https://itclub.techaicollege.edu.np/` loads with a valid padlock (certificate issued to the custom domain, or Cloudflare's certificate when proxied).
- [ ] `http://itclub.techaicollege.edu.np/` redirects to HTTPS.
- [ ] Deep links work directly: `/about/`, `/departments/ai-data-science/`, `/events/member-intake-orientation/`, `/blog/founding-meeting-establishes-the-club/`.
- [ ] An unknown URL such as `/does-not-exist/` shows the club's own 404 page (served from `out/404.html`).
- [ ] `https://itclub.techaicollege.edu.np/sitemap.xml` and `/robots.txt` return the club domain, not localhost.
- [ ] Share a link on WhatsApp or LinkedIn: the preview image (`/opengraph-image`) shows the club branding.
- [ ] Membership form: submit a test application. With `NEXT_PUBLIC_FORM_ENDPOINT` set you land on the "Application submitted" page and the entry appears in the form service; without it, the visitor's email app opens with the application pre-filled and addressed to `NEXT_PUBLIC_CONTACT_EMAIL`.
- [ ] `/members/`, `/membership/status/`, `/membership/card/` and `/admin/` load directly and after a refresh.
- [ ] A pretty QR URL such as `/verify/TAIC-2026-0001` lands on the verification page with the ID filled in (served via `404.html`).
- [ ] In `/admin/`, import a test application, approve it, open its card and export `registry.json`; then commit the file and confirm the member appears on `/members/` after the redeploy.
- [ ] Run Lighthouse on the live URL from Chrome DevTools; accessibility, best practices and SEO should be 100.

### Redeploying

Push to `main`. The workflow rebuilds and publishes within about three minutes. To republish without a code change, open **Actions → Deploy to GitHub Pages → Run workflow**.

### Rolling back

Open **Actions**, pick the last good run and choose **Re-run all jobs**, or revert the commit on `main`.

### Troubleshooting

| Symptom | Fix |
| --- | --- |
| Workflow fails with `dynamicParams: true cannot be used with output: export` | A dynamic route needs `generateStaticParams()` and must not export `dynamicParams`. |
| Members do not appear on `/members/` after approval | The registry has not been published: export `registry.json` from `/admin/data/` and commit it as `src/data/registry.json`. |
| Custom domain shows "DNS check unsuccessful" | The Cloudflare record must be a `CNAME` to `bikashkadayat.github.io` with the proxy **off** while GitHub validates and issues the certificate. |
| Site shows the GitHub 404 page instead of the club's | `out/.nojekyll` or `out/CNAME` missing: confirm the *Verify export* step passed. |
| Styles or images missing after deploy | Hard refresh; if Cloudflare is proxied, purge the cache (**Caching → Configuration → Purge Everything**). |
