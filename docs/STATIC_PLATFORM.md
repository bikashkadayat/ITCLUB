# How the static platform works

The Tech & AI Innovation Club platform runs entirely from GitHub Pages at **https://itclub.techaicollege.edu.np**. There is no server, database, API, login, admin tool or member registry anywhere. Membership applications go to the club WhatsApp number. This document explains what that means for each part of the site and how the Executive Committee operates it.

```
GitHub repository  ──push to main──▶  GitHub Actions (npm run build)  ──▶  GitHub Pages  ──▶  Cloudflare DNS  ──▶  itclub.techaicollege.edu.np
```

## Membership application (`/membership`)

1. The applicant fills in the form. Validation runs in the browser.
2. The browser generates an application reference (`TAIC-APP-YYYYMMDD-XXXX`) and keeps a copy of the application in the applicant's own browser storage.
3. Delivery to the committee is **WhatsApp**: on submit the browser opens WhatsApp automatically and shows a confirmation screen with a **Send Via WhatsApp** fallback button. The link is `https://wa.me/9779705811712?text=…` with the full application (name, email, phone, program, semester, department, skills, motivation and the reference) pre-filled; the applicant presses send in WhatsApp. No email, no form service, no backend.
5. The contact form, newsletter sign-up and event seat requests use the same WhatsApp number (`src/lib/whatsapp.ts`).

## What was removed and why

| Removed | Reason | Replacement |
| --- | --- | --- |
| PostgreSQL + Prisma | No database on GitHub Pages | Static content files |
| NextAuth login, member portal, roles, admin tool, member registry, membership cards, QR verification | No server to check credentials or store data; browser-only tools were impractical for club operations | Membership applications go to the club WhatsApp number and are reviewed there |
| Server actions, API routes, middleware | Not exportable | Browser-side forms handed to WhatsApp |
| Certificates, event registration, QR check-in, uploads, notifications, analytics | Needed database and storage | Seat requests on WhatsApp; attendance recorded at the venue |
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
| `NEXT_PUBLIC_SITE_URL` | Canonical origin and sitemap |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Club inbox shown on the Contact page (display only) |

There are no secrets. Anything set here is visible in the built site.
