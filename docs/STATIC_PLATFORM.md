# How the static platform works

The Tech & AI Innovation Club platform runs entirely from GitHub Pages at **https://itclub.techaicollege.edu.np**. There is no server, database, API or login anywhere. This document explains what that means for each part of the site and how the Executive Committee operates it.

```
GitHub repository  ──push to main──▶  GitHub Actions (npm run build)  ──▶  GitHub Pages  ──▶  Cloudflare DNS  ──▶  itclub.techaicollege.edu.np
```

## The one moving part: the published member registry

`src/data/registry.json` is the club's public record of approved members and application decisions. Everything member-related on the site reads from it at build time:

| Page | Reads from the registry |
| --- | --- |
| `/members` | Member lookup by Member ID |
| `/membership/status` | Application outcome by reference number |
| `/membership/card` | Card data for rendering |
| `/verify` (and QR codes `/verify/TAIC-2026-0001`) | Public verification |
| Home statistics | Active member count (once there are 25 or more) |

Only card-level information is published: Member ID, application reference, name, program, departments, position, status, member-since and valid-until dates. Waitlist and rejection decisions are published as reference + status only. **Emails, phone numbers, motivations and committee notes are never committed to the repository.**

Registry schema:

```json
{
  "publishedAt": "2026-09-13",
  "members": [
    { "memberId": "TAIC-2026-0001", "ref": "TAIC-APP-20260920-K7QF", "name": "…", "program": "BSc CSIT",
      "departments": ["ai-data-science"], "position": "Member", "status": "ACTIVE",
      "joinedOn": "2026-09-20", "validUntil": "2027-07-31" }
  ],
  "decisions": [ { "ref": "TAIC-APP-20260920-B2ZX", "status": "WAITLISTED", "decidedOn": "2026-09-25" } ]
}
```

## Membership application (`/membership`)

1. The applicant fills in the form. Validation runs in the browser.
2. The browser generates an application reference (`TAIC-APP-YYYYMMDD-XXXX`) and keeps a copy of the application in the applicant's own browser storage.
3. Delivery to the committee, in order of preference:
   - **Form endpoint** (`NEXT_PUBLIC_FORM_ENDPOINT`, e.g. Formspree): a JSON POST. The committee receives an email or sees it in the service's inbox. Recommended.
   - **Email fallback** (`NEXT_PUBLIC_CONTACT_EMAIL`): the applicant's email app opens with the application pre-filled and a JSON block at the bottom that the committee tool can import.
   - If neither is configured the form shows a notice; set at least one repository variable before launch.
4. The applicant can also download a `.json` copy and is shown the reference and a link to the status page.

## Committee tool (`/admin`)

A client-side administration tool. It has **no login** because there is no server to protect: everything it shows is stored in the committee member's own browser (`localStorage`). This is stated on every screen. Use it on a committee member's own device and export a backup after each session.

- **Applications**: import from `.json` files or by pasting the JSON block from an application email; search and filter; read the motivation; add private notes; Approve (assigns the next sequential Member ID and creates the member record), Waitlist, Reject.
- **Members**: list, edit position / status / validity / departments, add members manually, add the Executive Committee in one click, open the membership card, print an approval letter.
- **Data & publishing**: export `registry.json` (public), export a private backup (contains emails and phones, never commit it), import a backup on another device, CSV exports, pull published members into the browser, clear local data.

### Publishing decisions

1. `/admin/data` → **Export registry.json**.
2. In the GitHub repository, open `src/data/registry.json`, edit, paste the exported content, commit to `main`.
3. The deploy workflow rebuilds the site in about three minutes. Members can now look themselves up, their status page shows the decision, their card renders, and QR codes verify.

## Member area (`/members`)

A lookup by Member ID, not a login. It shows the same information as the card plus links to events, resources and the constitution. Data comes from the published registry; unpublished members that exist only in the committee browser are shown there with a warning.

## Membership card (`/membership/card`)

Rendered in the browser with the Canvas API: club and college logos, initials medallion, name, Member ID, position, department, program, member-since, valid-until, status pill and a QR code linking to `https://itclub.techaicollege.edu.np/verify/<MEMBER-ID>`. Portrait and landscape; PNG download; two-page PDF sized for a 54 × 86 mm ID card (pdf-lib); print. Nothing is uploaded.

## QR verification (`/verify`)

Static comparison against the published registry: green "verified" when the ID is present and active, otherwise "not found in the published registry". The page says explicitly that it is not a live database check. QR codes use the pretty URL `/verify/<MEMBER-ID>`; GitHub Pages serves `404.html` for that path and a small script redirects to `/verify/?id=<MEMBER-ID>`.

## What was removed and why

| Removed | Reason | Replacement |
| --- | --- | --- |
| PostgreSQL + Prisma | No database on GitHub Pages | Static content files + published registry |
| NextAuth login, member portal, roles | No server to check credentials; fake auth would mislead | Member lookup by ID; committee tool without login and with clear notices |
| Server actions, API routes, middleware | Not exportable | Browser-side forms and localStorage |
| Server-rendered admin dashboard | Needed sessions and database | Client-side committee tool |
| Certificates, event registration, QR check-in, uploads, notifications, analytics | Needed database and storage | Seat requests by email; attendance recorded at the venue; cards generated in the browser |
| Achievements page, resource library uploads, event photo uploads | Database-only content | Static gallery and documents in `public/` |

## Local development

```bash
npm install
npm run dev        # http://localhost:3000 (Next.js dev server, static-compatible)
npm run build      # exports the production site to out/
npm run preview    # serves out/ exactly like GitHub Pages (404.html included)
```

## Environment variables (public, build-time only)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, sitemap and QR verification links |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Club inbox for the Contact page and email fallbacks |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Optional JSON endpoint for form submissions |

There are no secrets. Anything set here is visible in the built site.
