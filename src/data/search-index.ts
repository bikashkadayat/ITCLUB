import { departments } from "./departments";
import { committee } from "./committee";
import { events } from "./events";
import { posts } from "./blog";
import { projects } from "./projects";
import { constitution } from "./constitution";
import { documents } from "./resources";

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  group: "Pages" | "Departments" | "Committee" | "Events" | "Projects" | "Blog" | "Constitution" | "Documents";
  keywords?: string;
}

const pages: SearchItem[] = [
  { id: "home", title: "Home", href: "/", group: "Pages", keywords: "tech ai innovation club tech ai college" },
  { id: "about", title: "About the Club", subtitle: "Vision, mission, objectives, history", href: "/about", group: "Pages" },
  { id: "departments", title: "Departments", subtitle: "Six functional departments", href: "/departments", group: "Pages" },
  { id: "committee", title: "Executive Committee", subtitle: "Office-bearers and faculty advisor", href: "/committee", group: "Pages" },
  { id: "membership", title: "Membership", subtitle: "Eligibility, benefits, apply online", href: "/membership", group: "Pages", keywords: "join apply form" },
  { id: "events", title: "Events", subtitle: "Workshops, hackathons, bootcamps, seminars", href: "/events", group: "Pages" },
  { id: "projects", title: "Projects", subtitle: "Club, research and open-source projects", href: "/projects", group: "Pages" },
  { id: "gallery", title: "Gallery", href: "/gallery", group: "Pages", keywords: "photos images" },
  { id: "blog", title: "Blog & News", href: "/blog", group: "Pages" },
  { id: "resources", title: "Resource Center", subtitle: "Documents and learning tracks", href: "/resources", group: "Pages" },
  { id: "constitution", title: "Constitution & Bylaws", href: "/constitution", group: "Pages" },
  { id: "contact", title: "Contact", subtitle: "New Baneshwor, Kathmandu", href: "/contact", group: "Pages", keywords: "map address email" },
];

export const searchIndex: SearchItem[] = [
  ...pages,
  ...departments.map((d) => ({
    id: `dept-${d.slug}`,
    title: d.name,
    subtitle: d.tagline,
    href: `/departments/${d.slug}`,
    group: "Departments" as const,
    keywords: [...d.learningAreas, ...d.activities].join(" "),
  })),
  ...committee.map((m) => ({
    id: `member-${m.id}`,
    title: m.name,
    subtitle: m.position,
    href: `/committee#${m.id}`,
    group: "Committee" as const,
  })),
  ...events.map((e) => ({
    id: `event-${e.slug}`,
    title: e.title,
    subtitle: `${e.type} · ${e.status}`,
    href: `/events#${e.slug}`,
    group: "Events" as const,
    keywords: e.summary,
  })),
  ...projects.map((p) => ({
    id: `project-${p.slug}`,
    title: p.name,
    subtitle: p.category,
    href: `/projects#${p.slug}`,
    group: "Projects" as const,
    keywords: p.topics.join(" "),
  })),
  ...posts.map((p) => ({
    id: `post-${p.slug}`,
    title: p.title,
    subtitle: p.category,
    href: `/blog/${p.slug}`,
    group: "Blog" as const,
    keywords: p.tags.join(" "),
  })),
  ...constitution.map((a) => ({
    id: `article-${a.number}`,
    title: `Article ${a.number} — ${a.title}`,
    href: `/constitution#article-${a.number}`,
    group: "Constitution" as const,
  })),
  ...documents.map((d) => ({
    id: `doc-${d.id}`,
    title: d.title,
    subtitle: `PDF · ${d.pages} page${d.pages > 1 ? "s" : ""}`,
    href: d.file,
    group: "Documents" as const,
  })),
];
