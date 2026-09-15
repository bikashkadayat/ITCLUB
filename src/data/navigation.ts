import { departments } from "./departments";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}
export interface NavEntry {
  label: string;
  href?: string;
  children?: NavLink[];
}

/** Primary navigation: six top-level entries, secondary pages in dropdowns. */
export const primaryNav: NavEntry[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Vision & Mission", href: "/about", description: "Why the club exists and where it is going" },
      { label: "Leadership Team", href: "/committee", description: "Executive Committee and Faculty Advisor" },
      { label: "Constitution", href: "/constitution", description: "The rules we govern ourselves by" },
      { label: "Member Area", href: "/members", description: "Look up your membership, status and card" },
    ],
  },
  {
    label: "Departments",
    href: "/departments",
    children: departments.map((d) => ({ label: d.name, href: `/departments/${d.slug}`, description: d.tagline })),
  },
  { label: "Events", href: "/events" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Projects", href: "/projects", description: "What members are building" },
      { label: "Blog", href: "/blog", description: "Updates and student stories" },
      { label: "Gallery", href: "/gallery", description: "Moments from the lab and beyond" },
      { label: "Downloads", href: "/resources", description: "Documents, notes and learning tracks" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
