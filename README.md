# Tech & AI Innovation Club — website and membership platform

Official website of the **Tech & AI Innovation Club**, the student-led technology club of Tech AI College of Management & Law (New Baneshwor, Kathmandu). Live at **https://itclub.techaicollege.edu.np**.

The whole platform is a **static site on GitHub Pages**: public website, membership application, member area, committee tool, digital membership cards and QR verification all run in the browser. There is no server, database, API or login in production.

Built with Next.js 15 (static export), React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Framer Motion, Lucide, `qrcode` and `pdf-lib`. All content comes from the club's founding documents in `src/data/*.ts`.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/ (CNAME + .nojekyll included)
npm run preview    # serve out/ locally the way GitHub Pages does
npm run lint
```

Copy `.env.example` to `.env.local` to set the public contact email or a form endpoint. Every variable is public and compiled into the site; there are no secrets.

## Pages

| Area | Route | Notes |
| --- | --- | --- |
| Public website | `/`, `/about`, `/departments`, `/departments/[slug]`, `/committee`, `/events`, `/events/[slug]`, `/projects`, `/resources`, `/blog`, `/blog/[slug]`, `/gallery`, `/constitution`, `/contact` | Content in `src/data` |
| Membership application | `/membership` | Browser validation, reference number, delivery by form endpoint or email, downloadable copy |
| Application status | `/membership/status` | Looks up the reference in the published registry |
| Member area | `/members` | Lookup by Member ID (not a login) |
| Membership card | `/membership/card` | Rendered in the browser; PNG, PDF, print, QR |
| Verification | `/verify`, `/verify/<MEMBER-ID>` | Static check against the published registry |
| Committee tool | `/admin` | Client-side, localStorage; import applications, approve, generate cards, export registry and backups |

## How membership works without a server

1. Applicant submits `/membership` → gets a reference `TAIC-APP-YYYYMMDD-XXXX`; the application reaches the committee by form endpoint or email (JSON included).
2. A committee member imports it in `/admin/applications`, reviews it and approves it → the next Member ID `TAIC-YYYY-NNNN` is assigned.
3. The committee exports `registry.json` from `/admin/data` and commits it as `src/data/registry.json` → GitHub Pages rebuilds.
4. The member checks `/membership/status`, opens `/members` and `/membership/card`; the card's QR code verifies at `/verify/<ID>`.

Full details, the registry schema and what was deliberately removed: **`docs/STATIC_PLATFORM.md`**.

## Deployment

- `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
- Setup guides: `GITHUB_PAGES_SETUP.md` and `CLOUDFLARE_SETUP.md`.
- Repository variable (optional): `NEXT_PUBLIC_CONTACT_EMAIL` (display only). Form submissions go to the club WhatsApp number in `src/lib/whatsapp.ts`.

## Content

- Copy and data: `src/data/*.ts` (club, departments, committee, events, projects, blog, resources, gallery, membership, navigation, site).
- Committee photos: drop `public/images/team/<member-id>.jpg` (see `public/images/team/README.md`).
- Founding documents: `public/documents/`.
- Published member registry: `src/data/registry.json` (exported from the committee tool).

Brand colours from the logo: blue `#2027E3`, coral `#FF5050`, red `#FD0909`. Personal phone numbers from the founding documents are intentionally not published.
# ITCLUB
