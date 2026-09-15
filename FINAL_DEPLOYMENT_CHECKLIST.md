# Final Deployment Checklist — itclub.techaicollege.edu.np

Everything below is configuration, not development. The repository builds to a static site (`npm run build` → `out/`) and GitHub Actions publishes it to GitHub Pages; Cloudflare points the custom domain at it.

```
Local repository ──push──▶ github.com/bikashkadayat/<repo> ──Actions──▶ GitHub Pages ──CNAME──▶ Cloudflare DNS ──▶ https://itclub.techaicollege.edu.np
```

Pre-launch audit result (13 September 2026): 48 exported pages, 0 dead internal links (1,225 checked), 0 horizontal overflow and 0 console errors at 390 / 768 / 1440 px, membership flow and committee tool end-to-end tests 33/33, lint and type checks clean.

---

## 1. Git commands

Run from the project folder. The repository is already initialised on `main`; nothing has been committed yet.

```bash
# 0. sanity check: only public build-time values, never secrets
cat .env.example

# 1. first commit
git add .
git commit -m "Tech & AI Innovation Club website and membership platform (static, GitHub Pages)"

# 2. create the GitHub repository (choose one)
#    a) with the GitHub CLI:
gh repo create bikashkadayat/taic-website --public --source=. --remote=origin --push
#    b) or manually: create an empty repository at github.com/new, then
git remote add origin git@github.com:bikashkadayat/taic-website.git
git push -u origin main
```

Later updates (content edits, a new `src/data/registry.json` from the committee tool):

```bash
git add .
git commit -m "Publish member registry"   # or describe the change
git push
```

Every push to `main` triggers `.github/workflows/deploy.yml`. Pushing takes about three minutes to reach the live site.

Ignored on purpose (`.gitignore`): `node_modules`, `.next`, `out`, `.env*`, local database and upload folders.

---

## 2. GitHub Pages settings

Repository → **Settings → Pages**

| Setting | Value |
| --- | --- |
| Build and deployment → Source | **GitHub Actions** |
| Custom domain | `itclub.techaicollege.edu.np` (after step 3) |
| Enforce HTTPS | tick after the certificate is issued (step 5) |

Repository → **Settings → Secrets and variables → Actions → Variables** (plain variables, compiled into the public site):

| Variable | Value | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | the club's inbox, e.g. `itclub@techaicollege.edu.np` | **Yes**, otherwise the membership and contact forms show "being set up" |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Formspree-style endpoint, e.g. `https://formspree.io/f/xxxxxxxx` | Recommended: applications arrive in an inbox instead of relying on the applicant's email app |

After setting variables, run **Actions → Deploy to GitHub Pages → Run workflow** once so the site is rebuilt with them.

Optional but recommended: **Profile → Settings → Pages → Add a domain** → `techaicollege.edu.np` and add the `TXT` record GitHub shows at Cloudflare, so nobody else can claim the subdomain.

---

## 3. Cloudflare DNS settings

Zone **techaicollege.edu.np** → **DNS → Records → Add record**

| Type | Name | Target | Proxy status | TTL |
| --- | --- | --- | --- | --- |
| `CNAME` | `itclub` | `bikashkadayat.github.io` | **DNS only** (grey) until step 5 is done, then Proxied (orange) | Auto |

Remove any older `A`/`AAAA`/`CNAME` records for `itclub`. Do not add `www.itclub`.

Recommended Cloudflare settings once proxied (details in `CLOUDFLARE_SETUP.md`):

| Area | Setting | Value |
| --- | --- | --- |
| SSL/TLS | Encryption mode | Full (strict) |
| SSL/TLS → Edge Certificates | Always Use HTTPS | On |
| Speed | Brotli | On |
| Speed | Rocket Loader | **Off** (breaks React hydration) |
| Speed | Auto Minify | retired by Cloudflare in 2024; the build is already minified |
| Network | HTTP/3 (QUIC) | On |
| Caching | Caching Level / Browser TTL | Standard / Respect Existing Headers |

---

## 4. Custom domain verification

1. Wait for DNS: `dig +short itclub.techaicollege.edu.np CNAME` returns `bikashkadayat.github.io.`
2. **Settings → Pages → Custom domain** → enter `itclub.techaicollege.edu.np` → **Save**.
3. GitHub shows **DNS check successful**. If it fails: record must be a `CNAME` (not `A`), proxy must be off, no conflicting records.
4. `public/CNAME` (and therefore `out/CNAME`) already contains the domain, so redeploys never reset it. `public/.nojekyll` is also included.

---

## 5. SSL verification

1. On the Pages settings page wait for **Certificate: issued** (5–30 minutes after the DNS check passes).
2. Tick **Enforce HTTPS**.
3. Check from a terminal:

   ```bash
   curl -I https://itclub.techaicollege.edu.np/        # HTTP/2 200
   curl -I http://itclub.techaicollege.edu.np/         # 301 → https://
   ```

4. Now switch the Cloudflare record to **Proxied** and set SSL/TLS to **Full (strict)**. Re-run the two `curl` commands; the response now includes `server: cloudflare`.
5. Optional: enable HSTS in Cloudflare (max-age 6 months) after a day of clean operation.

---

## 6. Final testing checklist (on the live domain)

Public website

- [ ] `/` loads with the padlock; hero, statistics, departments, leadership, next event and "Become a Member" render.
- [ ] Deep links load directly and after refresh: `/about/`, `/committee/`, `/departments/ai-data-science/`, `/events/member-intake-orientation/`, `/projects/`, `/resources/`, `/blog/founding-meeting-establishes-the-club/`, `/gallery/`, `/contact/`.
- [ ] `/this-page-does-not-exist/` shows the club's own 404 page.
- [ ] `/sitemap.xml` and `/robots.txt` reference `https://itclub.techaicollege.edu.np`.
- [ ] Sharing a link on WhatsApp / LinkedIn shows the club's preview image.
- [ ] Phone (390 px), tablet (768 px) and desktop (1440 px): no horizontal scrolling, menus open, cards align.

Membership

- [ ] `/membership/`: submit a test application. With the form endpoint set you land on "Application submitted" with a reference `TAIC-APP-…`; the entry appears in the form service. Without it, the email app opens pre-filled.
- [ ] `/membership/status/?ref=<that reference>` shows "No published decision yet".
- [ ] `/admin/applications/`: import the application (paste the JSON block or upload the `.json`), click **Approve & assign ID** → `TAIC-2026-0001`.
- [ ] `/admin/members/`: the member is listed; **Card** renders portrait and landscape; **Download PDF** produces a two-page PDF; **Letter** prints.
- [ ] `/admin/data/`: **Export registry.json** → commit it as `src/data/registry.json` → push → wait for the deploy.
- [ ] `/members/?id=TAIC-2026-0001` shows the member; `/membership/status/?ref=…` now shows "Approved · Membership ID TAIC-2026-0001".
- [ ] Scan the card's QR code with a phone: `/verify/TAIC-2026-0001` lands on the verification page and shows "Verified: active member".
- [ ] `/admin/data/`: **Export backup** and store it privately (never commit it). Then remove the test member from the registry if it was only a test, and republish.

Committee readiness

- [ ] Committee members know the workflow: import → approve → export registry → commit (see `docs/STATIC_PLATFORM.md`).
- [ ] The committee tool is used only on committee members' own devices; a backup is exported after every session.
- [ ] Executive Committee portraits: five real portraits are in place (Sadikshya, Sambridhi, Nirmal, Sanjita, Jenisha). Still to add: `bikash-kadayat.jpg` and a real `suman-karki.jpg` (the generic silhouette was removed; initials are shown until a portrait is added). `sambridhi-subedi.jpg` is only 94 × 94 px and looks soft on retina screens; replace it with a 600 × 600 px version when possible.
- [ ] Social links filled in `src/data/site.ts` (optional; icons stay hidden until then).

Performance (optional)

- [ ] Lighthouse from Chrome DevTools on `/`: Accessibility, Best Practices and SEO 100; Performance 90+ desktop.
