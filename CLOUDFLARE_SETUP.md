# Cloudflare Setup — itclub.techaicollege.edu.np

Cloudflare manages DNS for `techaicollege.edu.np`. This guide adds the `itclub` subdomain, points it at GitHub Pages and applies the recommended edge settings.

Target: **`bikashkadayat.github.io`** (GitHub Pages for the `bikashkadayat` account).

---

## Step 1 — Add the DNS record

1. Sign in to the Cloudflare dashboard and open the **techaicollege.edu.np** zone.
2. Go to **DNS → Records → Add record** and enter:

   | Field | Value |
   | --- | --- |
   | Type | `CNAME` |
   | Name | `itclub` |
   | Target | `bikashkadayat.github.io` |
   | Proxy status | **DNS only** (grey cloud) — for now, see Step 3 |
   | TTL | Auto |

3. Save. Check propagation from a terminal:

   ```bash
   dig +short itclub.techaicollege.edu.np CNAME
   # → bikashkadayat.github.io.
   ```

4. Remove any old `A`, `AAAA` or `CNAME` records for `itclub` that point elsewhere; GitHub's DNS check fails if the name resolves to two different places.

> Do **not** create records for `www.itclub.techaicollege.edu.np`; GitHub Pages supports one custom domain per site, and the club address is the bare `itclub` subdomain.

---

## Step 2 — Let GitHub issue the certificate

1. In the GitHub repository open **Settings → Pages → Custom domain**, enter `itclub.techaicollege.edu.np` and save.
2. Wait until the page shows **DNS check successful** and **Certificate: issued** (5 to 30 minutes, occasionally longer). With the record on *DNS only*, GitHub sees its own servers behind the name and Let's Encrypt validation succeeds.
3. Tick **Enforce HTTPS**.

If the check keeps failing, confirm the record is a `CNAME` (not `A`), the proxy is off, and the target has no trailing path.

---

## Step 3 — Turn on the Cloudflare proxy (optional but recommended)

Once HTTPS is enforced on GitHub, edit the `itclub` record and switch **Proxy status** to **Proxied** (orange cloud). Cloudflare now terminates TLS, caches static assets at the edge and applies the settings below.

Keeping the record on *DNS only* is also a perfectly valid configuration; GitHub serves the site over HTTPS with its own certificate. The proxy adds caching, HTTP/3, Brotli and DDoS protection.

---

## Step 4 — SSL/TLS

**SSL/TLS → Overview → Encryption mode**: **Full (strict)**.

GitHub Pages presents a valid Let's Encrypt certificate for the custom domain, so *Full (strict)* works and is the safest choice. Use plain **Full** only if you ever see certificate errors between Cloudflare and GitHub; never use *Flexible*, which causes redirect loops with GitHub Pages.

**SSL/TLS → Edge Certificates**:

| Setting | Value |
| --- | --- |
| Always Use HTTPS | **On** |
| Automatic HTTPS Rewrites | On |
| Minimum TLS Version | TLS 1.2 |
| TLS 1.3 | On |
| HTTP Strict Transport Security (HSTS) | Optional. Enable with `max-age` 6 months once everything works; do not include subdomains unless every subdomain of `techaicollege.edu.np` is HTTPS. |

---

## Step 5 — Speed

**Speed → Optimization**:

| Setting | Value | Why |
| --- | --- | --- |
| Brotli | **On** | Smaller HTML, CSS and JavaScript transfers. |
| Early Hints | On | Lets browsers fetch fonts and CSS sooner. |
| Rocket Loader | **Off** | It rewrites how scripts load and breaks React hydration on Next.js sites. |
| Auto Minify | **Not available** | Cloudflare retired Auto Minify in August 2024. The site is already minified by the Next.js build, so nothing is lost. |
| Mirage / Polish | Off (Pro feature; images are already optimised in the build) | |

**Network**:

| Setting | Value |
| --- | --- |
| HTTP/2 | On |
| HTTP/3 (with QUIC) | **On** |
| 0-RTT Connection Resumption | On |
| WebSockets | Off (not used) |

---

## Step 6 — Caching

**Caching → Configuration**:

| Setting | Value |
| --- | --- |
| Caching Level | Standard |
| Browser Cache TTL | Respect Existing Headers |
| Always Online | On |

Optional **Cache Rule** (Caching → Cache Rules) to cache the immutable Next.js assets aggressively:

- When: *URI Path* starts with `/_next/static/`
- Then: Cache eligible, Edge TTL **1 month**, Browser TTL **1 month**

Do not add page rules that cache HTML for long periods; the workflow republishes HTML on every push, and stale HTML pointing at old asset hashes causes broken pages. After a deploy, if the site looks stale, use **Caching → Configuration → Purge Everything**.

---

## Step 7 — Security (defaults are fine)

- **Security → Settings → Security Level**: Medium.
- **Bot Fight Mode**: On.
- **Browser Integrity Check**: On.
- Leave the WAF managed rules at their defaults. The site is static and has no login, so no custom firewall rules are needed.

---

## Verification

```bash
# DNS
dig +short itclub.techaicollege.edu.np CNAME         # bikashkadayat.github.io.
# HTTPS and redirect
curl -I http://itclub.techaicollege.edu.np/           # 301 → https://
curl -I https://itclub.techaicollege.edu.np/          # 200, server: cloudflare (when proxied) or GitHub.com
# Protocol and compression (proxied)
curl -sI --http3 https://itclub.techaicollege.edu.np/ | head -1
curl -sI -H "Accept-Encoding: br" https://itclub.techaicollege.edu.np/ | grep -i content-encoding
```

In a browser, open the site, press F12 → **Network**, reload and confirm the document shows protocol `h3` and `content-encoding: br` when the proxy is on.

---

## Summary of required settings

| Area | Setting | Value |
| --- | --- | --- |
| DNS | `CNAME itclub` | `bikashkadayat.github.io` |
| SSL/TLS | Encryption mode | Full (strict) |
| SSL/TLS | Always Use HTTPS | On |
| Speed | Brotli | On |
| Speed | Rocket Loader | Off |
| Speed | Auto Minify | Retired by Cloudflare; build output is already minified |
| Network | HTTP/3 (QUIC) | On |
