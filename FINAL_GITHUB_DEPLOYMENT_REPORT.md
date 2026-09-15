# Final GitHub Pages Deployment Report

**Site:** https://itclub.techaicollege.edu.np
**Repository:** bikashkadayat/ITCLUB (branch `main`)
**Hosting chain:** Cloudflare DNS (DNS-only) → GitHub Pages → bikashkadayat.github.io
**Audited:** 15 September 2026

---

## 1. Runtime Error Status

**Error**

```
Base UI: A component that acts as a button expected a native <button> because the `nativeButton` prop is true.
  at SheetClose → Navbar → SiteHeader → RootLayout
```

**Root cause**

Every link inside the mobile navigation sheet was written as `SheetClose render={<Link … />}`.
`SheetClose` wraps Base UI's `Dialog.Close`, whose `nativeButton` prop defaults to `true`, so it
expects to render a real `<button>`. Rendering a Next.js `Link` (an `<a>`) instead triggers the
error on every page load.

Simply passing `nativeButton={false}` would have been the wrong fix: with that setting Base UI
adds `role="button"` to the element, which would turn every navigation link into a fake button
for screen readers and remove link semantics.

The same pattern existed in two more places that render on the 404 page and empty states:
`Button render={<Link … />}` (Base UI `Button` also defaults to `nativeButton: true`).

**Fix applied**

| File | Change |
| --- | --- |
| `src/components/layout/navbar.tsx` | Mobile links are now plain `Link` elements. The Sheet was already controlled (`open` / `onOpenChange`), so each link closes it via `onClick`. Active link gets `aria-current="page"`. `SheetClose` import removed. |
| `src/app/not-found.tsx` | The two CTAs are now `Link` elements styled with `buttonVariants()` instead of `Button render={<Link/>}`. |
| `src/components/shared/empty-state.tsx` | Same change for the empty-state action link. |
| `src/components/ui/sheet.tsx` | Unchanged. The built-in close control renders a real `<button>` and is correct. |

Audit of the rest of the project: `DialogClose` is only ever rendered with a native `Button`
(correct), `Select` render props render non-interactive icons (correct), the command palette
(`cmdk`) does not use Base UI buttons, and there is no `asChild` or Drawer usage anywhere.

**Two additional runtime defects found and fixed during verification**

1. **Hydration error (React #418) for users with "Reduce motion" enabled.**
   `src/components/shared/counter.tsx` seeded its state with the final number when
   `useReducedMotion()` was true, but the server always renders `0`, so the first client render
   disagreed with the HTML. Reproduced on both the dev server and the static export, on desktop
   and mobile, only with `prefers-reduced-motion: reduce`. Fixed by always starting at `0` and
   jumping to the final value inside the effect when motion is reduced.
2. **Colour contrast (WCAG AA, serious) on the logo tagline.** The 9 px "Innovation Club" text
   used `#fd0909` on white (4.02:1). Added `--color-brand-red-deep: #c40606` (6.22:1) in
   `globals.css` and used it for the light-mode tagline in `src/components/shared/logo.tsx`.
   Dark mode was already compliant (8.26:1). No layout, size or wording changed.

**Verification**

Automated browser audit (Playwright + Chromium) run against the static export served exactly
as GitHub Pages serves it (`out/`, trailing-slash URLs, `404.html`):

- 35 / 35 checks passed.
- 0 console errors, 0 uncaught errors, 0 console warnings across home, 7 section pages, the 404
  page and the committee page, on desktop (1280 px) and mobile (390 px), with and without
  reduced motion.
- `npx eslint .` clean, `tsc --noEmit` clean, `npm run build` succeeds (49 pages exported).

---

## 2. Accessibility Status

**Passed**

- Mobile menu trigger is a native `<button>` with an accessible name and `aria-expanded`.
- Sheet opens as `role="dialog"`; focus moves inside; the page behind it is hidden from
  assistive technology; Escape closes it; the built-in close control is a native `<button>`.
- All navigation links (desktop and mobile) are real `<a>` elements with no `role="button"`.
- Keyboard: Tab reaches the primary nav; ArrowDown opens a desktop dropdown (`aria-expanded`
  + `role="menu"`); Escape closes it; Tab reaches links inside the sheet; Enter on a link
  navigates and closes the sheet.
- Clicking any mobile link navigates and closes the sheet.
- axe-core (WCAG 2.0/2.1 A + AA + best-practice): **no serious or critical violations** on the
  home page (desktop), the home page with the mobile menu open, or the 404 page.
- Hydration is clean with and without the OS reduce-motion preference.

**Failed**

- None remaining.

**Remaining warnings (informational, not blocking)**

- axe `region` (moderate, best-practice): some page content sits outside a landmark region.
- axe `heading-order` (moderate) on the 404 page: heading levels skip a level.

---

## 3. GitHub Pages Status

**Export status: PASS**

| Check | Result |
| --- | --- |
| `next.config.ts` | `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`, no `basePath`/`assetPrefix` (correct for a custom domain served at the root) |
| `out/index.html` | present |
| `out/CNAME` | `itclub.techaicollege.edu.np` (written by `scripts/postbuild.mjs`; `public/CNAME` also present) |
| `out/.nojekyll` | present (needed so `_next/` is not ignored by Jekyll) |
| `out/404.html` | present; served with HTTP 404 and the custom "route not found" page |
| Asset paths | root-absolute `/_next/static/...` |
| Image paths | root-absolute `/images/...`; all 6 committee photos load |
| Pages exported | 49 |
| External asset references | none |

**Build status: PASS** — `package.json` `build` = `next build --turbopack && node scripts/postbuild.mjs`;
the workflow calls exactly this and then asserts `index.html`, `CNAME`, `.nojekyll`, `404.html`.

**Deployment status: PASS (but stale)**

- Workflow "Deploy to GitHub Pages": completed, success, commit `45e9c5d`, 15 Sep 2026 10:21 UTC.
- Environment `github-pages` deployed twice from `45e9c5d`.
- Repository `has_pages: true`, public, default branch `main`.
- GitHub serves the site at the custom domain: `HTTP/2 200`, `server: GitHub.com`.
- **The live build is `45e9c5d`, which still contains the SheetClose error.** The fixes in this
  report are on disk but not yet committed or pushed. The workflow triggers on push to `main`.

**Enforce HTTPS: NOT enabled.** Plain `http://itclub.techaicollege.edu.np/` currently returns
200 without redirecting and no HSTS header is sent. Enable it in Settings → Pages.

---

## 4. DNS Status

**Current state**

| Query | Result |
| --- | --- |
| Authoritative nameservers for `techaicollege.edu.np` | `brian.ns.cloudflare.com`, `rosalie.ns.cloudflare.com` |
| `itclub.techaicollege.edu.np` via 1.1.1.1 | `CNAME bikashkadayat.github.io` → 185.199.108/109/110/111.153 |
| `itclub.techaicollege.edu.np` via 8.8.8.8 | same, correct |
| Cloudflare proxy | **off** (DNS-only / grey cloud): resolves directly to GitHub IPs — this is the correct setting |
| TLS certificate | Let's Encrypt, `CN=itclub.techaicollege.edu.np`, issued 15 Sep 2026 09:21 UTC, valid to 14 Dec 2026 |
| HTTPS response with forced resolution to GitHub | `HTTP/2 200` |
| DNSSEC | none on the zone (no DS record) — no validation failures possible |
| **Your machine's resolver (router 192.168.77.1 via systemd-resolved)** | **NXDOMAIN** |

**Diagnosis**

This is **not** a code issue, **not** a GitHub Pages issue, **not** a Cloudflare issue and
**not** a missing/incorrect record. The CNAME is correct and sufficient; GitHub has already
verified the domain (it cannot issue a certificate otherwise) and is serving the site over HTTPS.

The `DNS_PROBE_*` error in your browser is a **stale negative cache** on your local network:
the router's resolver looked the name up before the record existed, received "not found", and
is still returning that cached answer (Cloudflare's negative-cache TTL is 1800 s, but consumer
routers frequently hold negative answers longer). Public resolvers, which never cached the
failure, resolve it correctly.

The "DNS Check in Progress" banner in GitHub's Pages settings is the UI state from when the
check was first triggered; the backend check has since succeeded (proven by the issued
certificate). It clears when the page is refreshed or "Check again" is clicked.

**Required fix (in order)**

1. On the machine showing the error, clear the local cache and stop using the router as the
   resolver:
   ```bash
   sudo resolvectl flush-caches
   sudo resolvectl dns "$(resolvectl status | awk '/Link [0-9]+ \(/{gsub(/[()]/,"",$3); print $3; exit}')" 1.1.1.1 8.8.8.8
   dig +short itclub.techaicollege.edu.np      # expect bikashkadayat.github.io + 185.199.x.153
   ```
   Or set DNS to `1.1.1.1` / `8.8.8.8` in the Wi-Fi/Ethernet settings, or reboot the router.
   Other visitors on other networks are unaffected.
2. GitHub → repository → Settings → Pages → Custom domain: click **Check again** (or re-save
   `itclub.techaicollege.edu.np`). Expected: "DNS check successful".
3. Tick **Enforce HTTPS** (becomes available once the check shows successful).
4. Commit and push the fixes so the corrected build replaces `45e9c5d`:
   ```bash
   git add -A
   git commit -m "Fix SheetClose runtime error, reduced-motion hydration, tagline contrast; add president photo"
   git push origin main
   ```

**Is `CNAME itclub → bikashkadayat.github.io` sufficient?** Yes. For a subdomain this single
DNS-only CNAME is the complete, GitHub-recommended configuration. No A/AAAA records, no
`www` record and no apex changes are required for this hostname.

---

## 5. Cloudflare Status

**Recommended records (current, verified correct)**

| Type | Name | Target | Proxy status | TTL |
| --- | --- | --- | --- | --- |
| CNAME | `itclub` | `bikashkadayat.github.io` | **DNS only (grey cloud)** | Auto |

Do **not** enable the orange-cloud proxy on this record. With the proxy on, GitHub sees
Cloudflare's IPs instead of its own, the Pages DNS check reports the domain as improperly
configured and Let's Encrypt renewals on GitHub's side can fail.

**Recommended settings**

Because the record is DNS-only, traffic goes straight from visitors to GitHub's CDN (Fastly)
and Cloudflare's edge features do not apply to this hostname. TLS, HTTP/2, Brotli, edge
caching and the HTTPS redirect are all handled by GitHub Pages:

| Setting | Recommendation |
| --- | --- |
| SSL/TLS | Not applied (DNS-only). GitHub provides the Let's Encrypt certificate and auto-renews it. |
| Always Use HTTPS | Use GitHub's **Enforce HTTPS** instead (see §3). |
| Auto Minify | Not applicable; Cloudflare retired Auto Minify in 2024. Next.js already minifies the export. |
| Brotli | Provided by GitHub Pages' CDN. |
| Caching | GitHub sends `cache-control: max-age=600`; hashed `/_next/static` assets are immutable by filename. Nothing to configure. |
| HTTP/3 | Served by GitHub's CDN where supported. |
| Cloudflare zone-wide settings | Keep the zone's current settings for the apex (`techaicollege.edu.np`, proxied); they do not affect `itclub`. If the zone's SSL mode is changed in future, choose **Full (strict)**; never "Flexible". |

If the club ever decides to proxy this hostname through Cloudflare anyway: set SSL/TLS to
**Full (strict)**, enable **Always Use HTTPS**, **HTTP/3**, **Brotli**, leave **Rocket Loader off**
(it breaks React hydration), and accept that GitHub's DNS check will show a warning.

---

## 6. Launch Readiness

**Launch Readiness: 94 / 100**

Everything that can be verified from the code, the export, the DNS system and GitHub's servers
passes. The remaining points are operational steps outside the repository.

**Remaining items**

- **Push the fixes.** The live deployment (`45e9c5d`) still contains the SheetClose error and
  the reduced-motion hydration error. 7 files are modified and 1 new photo is untracked; the
  push triggers the deploy workflow automatically. (−4)
- **Enable "Enforce HTTPS"** in GitHub Pages settings after clicking "Check again". Until then
  `http://` is served without a redirect and no HSTS header. (−2)
- **Local DNS cache** on the author's machine/router needs flushing or a public resolver; this
  affects only that network, not visitors.
- Informational: axe `region` and `heading-order` best-practice notes; Sambridhi Subedi's
  committee photo is a 94 px thumbnail and Suman Karki has no photo yet (initials fallback).

After the push completes and Enforce HTTPS is on, the expected score is 99 / 100.
