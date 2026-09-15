# Tech & AI Innovation Club — website and membership platform

Official website of the **Tech & AI Innovation Club**, the student-led technology club of Tech AI College of Management & Law (New Baneshwor, Kathmandu). Live at **https://itclub.techaicollege.edu.np**.

The whole platform is a **static site on GitHub Pages**: the public website and the membership application run entirely in the browser, and applications are sent to the club's WhatsApp number. There is no server, database, API, login or admin tool.

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
| Membership application | `/membership` | Browser validation, reference number, application sent to the club WhatsApp number |

## How membership works without a server

1. Applicant submits `/membership` → gets a reference `TAIC-APP-YYYYMMDD-XXXX` and WhatsApp opens with the full application addressed to the Executive Committee (`src/lib/whatsapp.ts`).
2. The committee reviews on WhatsApp and replies with the decision. Nothing is stored on the site: no registry, no admin tool, no login.

Full details: **`docs/STATIC_PLATFORM.md`**.

## Deployment

- `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
- Setup guides: `GITHUB_PAGES_SETUP.md` and `CLOUDFLARE_SETUP.md`.
- Repository variable (optional): `NEXT_PUBLIC_CONTACT_EMAIL` (display only). Form submissions go to the club WhatsApp number in `src/lib/whatsapp.ts`.

## Content

- Copy and data: `src/data/*.ts` (club, departments, committee, events, projects, blog, resources, gallery, membership, navigation, site).
- Committee photos: drop `public/images/team/<member-id>.jpg` (see `public/images/team/README.md`).
- Founding documents: `public/documents/`.

Brand colours from the logo: blue `#2027E3`, coral `#FF5050`, red `#FD0909`. Personal phone numbers from the founding documents are intentionally not published.
# ITCLUB
