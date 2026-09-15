import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { departments } from "@/data/departments";
import { events } from "@/data/events";
import { posts } from "@/data/blog";

/** Prerendered at build time (required for the static GitHub Pages export). */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const staticRoutes = ["", "/about", "/departments", "/committee", "/membership", "/events", "/projects", "/gallery", "/blog", "/contact", "/constitution", "/resources"];
  return [
    ...staticRoutes.map((r) => ({ url: `${base}${r}`, lastModified: now, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.8 })),
    ...departments.map((d) => ({ url: `${base}/departments/${d.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
    ...events.map((e) => ({ url: `${base}/events/${e.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
