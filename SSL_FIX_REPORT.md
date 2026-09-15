# SSL / Custom Domain Fix Report

**Domain:** itclub.techaicollege.edu.np
**Target:** bikashkadayat.github.io (GitHub Pages, repository bikashkadayat/ITCLUB)
**DNS provider:** Cloudflare (nameservers brian.ns.cloudflare.com, rosalie.ns.cloudflare.com)
**Audited:** 15 September 2026

---

## 1. Cause of "Not Secure"

The site is being opened over **plain HTTP** and GitHub is **not redirecting it to HTTPS**.

Evidence from the live domain:

| Probe | Result |
| --- | --- |
| `http://itclub.techaicollege.edu.np/` | `HTTP/1.1 200 OK`, `Server: GitHub.com`, **no `Location` header** (no redirect) |
| `https://itclub.techaicollege.edu.np/` | `HTTP/2 200`, `server: GitHub.com`, **no `Strict-Transport-Security` header** |
| `https://bikashkadayat.github.io/ITCLUB/` | `301` → **`http://`**itclub.techaicollege.edu.np/ (GitHub redirects to the insecure scheme) |
| Certificate | Let's Encrypt, `CN = itclub.techaicollege.edu.np`, SAN matches, valid 15 Sep 2026 → 14 Dec 2026, chain **Verify return code: 0 (ok)** |
| TLS | 1.2 and 1.3 accepted; 1.0 and 1.1 refused |
| Mixed content | none (no `http://` scripts, styles or images on the HTTPS page or in the export) |

So HTTPS is fully working and the certificate is valid. Anyone who types the address without `https://`, follows the github.io redirect, or has an old `http://` bookmark lands on the HTTP version, and the browser correctly labels that page "Not Secure". Nothing about the certificate, DNS or the code is wrong.

Both symptoms have one root cause: the GitHub Pages **"Enforce HTTPS"** checkbox is not enabled. GitHub only enables that checkbox after its DNS check succeeds, and the settings page was last seen while the check was still showing **"DNS Check In Progress"**. The check has since succeeded on GitHub's side (it issued the certificate, which it cannot do before verifying DNS), but the checkbox was never turned on.

There is no code change required. `public/CNAME` and `out/CNAME` are correct (`itclub.techaicollege.edu.np`), `next.config.ts` uses no `basePath`/`assetPrefix`, and every asset is loaded from a relative or root path, so nothing on the page forces HTTP.

---

## 2. Exact DNS records required (Cloudflare)

Only one record is needed for this hostname, and it already exists and is correct:

| Type | Name | Target / Content | Proxy status | TTL |
| --- | --- | --- | --- | --- |
| CNAME | `itclub` | `bikashkadayat.github.io` | **DNS only (grey cloud)** | Auto |

Verified from public resolvers (1.1.1.1 and 8.8.8.8) and from the local network:

```
itclub.techaicollege.edu.np.  CNAME  bikashkadayat.github.io.
bikashkadayat.github.io.      A      185.199.108.153
                              A      185.199.109.153
                              A      185.199.110.153
                              A      185.199.111.153
```

Do **not** add A/AAAA records for `itclub` (those are only for apex domains), do not add a `www.itclub` record unless you want that name to work, and do not change the apex `techaicollege.edu.np` records (they belong to the college site and are unrelated).

The earlier `DNS_PROBE_*` failure on the author's machine was a stale negative cache on the local router; it has expired and the name now resolves there too.

---

## 3. GitHub Pages settings (repository → Settings → Pages)

Do these in order; each depends on the previous one.

1. **Build and deployment → Source:** `GitHub Actions` (already correct; the deploy workflow runs on every push to `main`).
2. **Custom domain:** `itclub.techaicollege.edu.np` → click **Save** if not already saved, then click **Check again**.
   Expected result: green tick, **"DNS check successful"**. If it still says "in progress", wait one minute and click again; GitHub re-queries DNS on each click.
3. **Enforce HTTPS:** tick the checkbox. It becomes clickable only after step 2 shows success.
   Effect: every `http://` request is answered with `301` to `https://`, GitHub adds `Strict-Transport-Security`, and the github.io redirect changes to `https://`.
4. Leave **Custom domain** set. Removing and re-adding it is not needed and would restart certificate provisioning.

Verify afterwards:

```bash
curl -sI http://itclub.techaicollege.edu.np/ | grep -iE "^HTTP|^location"
# expect: HTTP/1.1 301 Moved Permanently
#         Location: https://itclub.techaicollege.edu.np/
curl -sI https://itclub.techaicollege.edu.np/ | grep -i strict-transport
# expect: strict-transport-security: max-age=31556952
```

---

## 4. Cloudflare settings

**Current state:** the `itclub` record is **DNS only**. Traffic goes straight from the visitor to GitHub's CDN and Cloudflare's zone settings (SSL/TLS mode, Always Use HTTPS, Automatic HTTPS Rewrites, Minimum TLS) **do not touch this hostname at all**. They apply only to proxied (orange-cloud) records. That is why changing them has no effect on the "Not Secure" warning.

### Recommended: keep DNS only (grey cloud)

This is GitHub's documented configuration for custom domains and the one that is currently working. GitHub issues and auto-renews the Let's Encrypt certificate, serves HTTP/2, Brotli and its own CDN caching, and the "Enforce HTTPS" switch (section 3) provides the HTTPS redirect and HSTS. Nothing else to configure at Cloudflare for this hostname.

The zone-wide values you listed are still sensible defaults for the rest of the `techaicollege.edu.np` zone, and are harmless for `itclub`:

| Cloudflare setting | Value | Effect on `itclub` while DNS only |
| --- | --- | --- |
| SSL/TLS encryption mode | **Full (strict)** (prefer strict over plain Full; never Flexible) | none |
| Always Use HTTPS | ON | none |
| Automatic HTTPS Rewrites | ON | none |
| Minimum TLS version | 1.2 | none (GitHub already refuses TLS 1.0/1.1) |

### Alternative: proxy through Cloudflare (orange cloud)

Only if the club specifically wants Cloudflare in front of GitHub. Then the settings above become active and **all four are required**:

| Setting | Required value | Why |
| --- | --- | --- |
| SSL/TLS encryption mode | **Full (strict)** | GitHub serves a valid certificate, so strict verification works. "Flexible" would send HTTP to GitHub and can create redirect loops once Enforce HTTPS is on. |
| Always Use HTTPS | ON | Redirects `http://` at the edge (this alone also fixes "Not Secure"). |
| Automatic HTTPS Rewrites | ON | Safety net for any `http://` sub-resource. |
| Minimum TLS version | 1.2 | Matches GitHub. |

Trade-offs to accept with the proxy on:

- GitHub's DNS check will show a warning because the name resolves to Cloudflare's IPs instead of GitHub's, and "Enforce HTTPS" may be unavailable; rely on Cloudflare's redirect instead.
- GitHub's certificate renewal (next due before 14 Dec 2026) uses an HTTP challenge that can fail behind the proxy. If it fails, Cloudflare's edge certificate keeps visitors secure, but Full (strict) will then break; you would have to fall back to Full (not strict) or switch off the proxy. This is the main reason DNS-only is recommended.
- Do not enable Rocket Loader (it breaks React hydration). Cloudflare Auto Minify no longer exists.

---

## 5. Final verification checklist

Run through top to bottom after enabling Enforce HTTPS.

- [ ] Cloudflare DNS: `itclub` → CNAME `bikashkadayat.github.io`, **grey cloud**, no other `itclub` records.
- [ ] `dig +short itclub.techaicollege.edu.np` returns `bikashkadayat.github.io.` followed by the four `185.199.x.153` addresses.
- [ ] GitHub → Settings → Pages shows **"DNS check successful"** for the custom domain.
- [ ] **Enforce HTTPS** is ticked.
- [ ] `curl -sI http://itclub.techaicollege.edu.np/` returns **301** with `Location: https://…`.
- [ ] `curl -sI https://itclub.techaicollege.edu.np/` returns **200** and a `strict-transport-security` header.
- [ ] `https://bikashkadayat.github.io/ITCLUB/` redirects to **https://** itclub.techaicollege.edu.np/.
- [ ] Browser: open `http://itclub.techaicollege.edu.np` in a private window; it lands on `https://` with the padlock and no "Not Secure" label.
- [ ] Certificate details in the browser: issued by Let's Encrypt to itclub.techaicollege.edu.np, valid to 14 Dec 2026 (GitHub renews it automatically about 30 days before expiry).
- [ ] After the next `git push` to `main`, the Actions run "Deploy to GitHub Pages" succeeds and the `Verify export` step confirms `out/CNAME`, `out/.nojekyll` and `out/404.html`.

Status at audit time: every item passes except the two that need a click in GitHub's settings (DNS check confirmation and Enforce HTTPS) and the three HTTP-redirect checks that follow from it.
