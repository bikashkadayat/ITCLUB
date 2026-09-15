/**
 * Site-wide configuration.
 * Source of truth: Official Club Establishment Application, Detailed Club
 * Establishment Proposal, Constitution & Bylaws, Executive Committee Formation
 * Document and Founding Meeting Minutes (all dated 13 September 2026).
 */

export const siteConfig = {
  name: "Tech & AI Innovation Club",
  shortName: "TAIC",
  tagline: "Building a Culture of Innovation, Engineering Excellence, and Leadership.",
  description:
    "Tech & AI Innovation Club is the official student-led technology club of Tech AI College of Management & Law, New Baneshwor, Kathmandu. We bridge the gap between academic theory and hands-on industry practice through AI, software engineering, cyber security, problem solving, media and events.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://itclub.techaicollege.edu.np",
  locale: "en_NP",
  foundedOn: "2026-09-13",
  college: {
    name: "Tech AI College of Management & Law",
    shortName: "Tech AI College",
    address: "New Baneshwor, Kathmandu, Nepal",
    addressLines: ["Tech AI College of Management & Law", "New Baneshwor", "Kathmandu, Nepal"],
    mapQuery: "Tech AI College of Management & Law, New Baneshwor, Kathmandu, Nepal",
    logo: "/brand/tech-ai-college-logo.png",
  },
  brand: {
    logo: "/brand/logo.png",
    logoMark: "/brand/logo-mark.png",
    logoMarkSquare: "/brand/logo-mark-square.png",
    logoWordmark: "/brand/logo-wordmark.png",
    logoOriginal: "/brand/logo-original.png",
    colors: {
      blue: "#2027E3",
      coral: "#FF5050",
      red: "#FD0909",
      rose: "#DE304C",
      navy: "#0B0D2A",
    },
  },
  /**
   * Social links. Fill in the club's official handles once created; entries
   * with an empty href are rendered as "coming soon" and never link out.
   */
  social: [
    { id: "facebook", label: "Facebook", href: "" },
    { id: "instagram", label: "Instagram", href: "" },
    { id: "linkedin", label: "LinkedIn", href: "" },
    { id: "github", label: "GitHub", href: "" },
    { id: "youtube", label: "YouTube", href: "" },
  ] as const,
  /** Public contact email for the club. Leave empty until an official address exists. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  nav: [
    { label: "About", href: "/about" },
    { label: "Departments", href: "/departments" },
    { label: "Committee", href: "/committee" },
    { label: "Events", href: "/events" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: {
    club: [
      { label: "About the Club", href: "/about" },
      { label: "Executive Committee", href: "/committee" },
      { label: "Constitution & Bylaws", href: "/constitution" },
      { label: "Membership", href: "/membership" },
      { label: "Contact", href: "/contact" },
    ],
    programs: [
      { label: "Departments", href: "/departments" },
      { label: "Events", href: "/events" },
      { label: "Projects", href: "/projects" },
      { label: "Resource Center", href: "/resources" },
      { label: "Blog & News", href: "/blog" },
    ],
  },
} as const;

export type SocialLink = (typeof siteConfig.social)[number];
