"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GitBranch, Circle, Lock, Globe, Lightbulb, ArrowUpRight, Search } from "lucide-react";
import { projects as staticProjects, projectCategories, type Project, type ProjectCategory } from "@/data/projects";
import { departments } from "@/data/departments";
import { EmptyState } from "@/components/shared/empty-state";
import { languageColor } from "@/components/shared/language-color";
import { DepartmentIcon } from "@/components/shared/department-icon";
import { cn } from "@/lib/utils";

export function ProjectsBrowser({ projects = staticProjects }: { projects?: Project[] }) {
  const [cat, setCat] = useState<ProjectCategory | "All">("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const base = cat === "All" ? projects : projects.filter((p) => p.category === cat);
    const s = q.trim().toLowerCase();
    return s ? base.filter((p) => [p.name, p.description, ...p.topics].join(" ").toLowerCase().includes(s)) : base;
  }, [cat, q, projects]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <nav aria-label="Project categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:px-0">
          {(["All", ...projectCategories] as const).map((c) => {
            const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={cn(
                  "flex shrink-0 items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors lg:w-full",
                  cat === c ? "bg-secondary text-secondary-foreground" : "text-foreground/75 hover:bg-muted"
                )}
              >
                {c}
                <span className="rounded-full bg-background px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{count}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="lg:col-span-9">
        <label className="relative block">
          <span className="sr-only">Search projects</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Find a repository…"
            className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
          />
        </label>

        {list.length === 0 ? (
          <EmptyState
            className="mt-6"
            icon={Lightbulb}
            title={projects.length === 0 ? "No projects published yet." : cat === "Student Innovations" ? "Student innovations open for submissions" : "No projects match"}
            description={
              projects.length === 0
                ? "Members submit projects in the Project Hub. Once the IT / Technical Coordinator approves one, it appears here with its repository."
                : cat === "Student Innovations"
                  ? "Have a prototype, a research idea or a product you built? Submit it in the Project Hub and the IT / Technical Coordinator will review it for this page."
                  : "Try a different category or search term."
            }
            action={cat === "Student Innovations" ? { label: "Become a Member to submit", href: "/membership" } : undefined}
          />
        ) : (
          <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {list.map((p) => {
              const dept = departments.find((d) => d.slug === p.department);
              const gradient = dept?.color ?? "from-brand-blue to-brand-coral";
              return (
                <li key={p.slug} id={p.slug} className="scroll-mt-28">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-6 card-hover">
                    <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80", gradient)} aria-hidden />
                    <div className="flex items-start justify-between gap-3">
                      <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md", gradient)}>
                        {dept ? <DepartmentIcon icon={dept.icon} className="size-5" /> : <GitBranch className="size-5" aria-hidden />}
                      </span>
                      <div className="flex flex-wrap justify-end gap-1.5">
                        <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", p.status === "In development" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground")}>{p.status}</span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                          {p.visibility === "Public" ? <Globe className="size-3" aria-hidden /> : <Lock className="size-3" aria-hidden />} {p.visibility}
                        </span>
                      </div>
                    </div>
                    <p className="mt-5 font-mono text-[11px] text-muted-foreground">tech-ai-innovation-club /</p>
                    <h3 className="font-mono text-lg font-semibold leading-snug text-primary">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.topics.map((t) => (
                        <span key={t} className="rounded-full bg-secondary/70 px-2.5 py-0.5 font-mono text-[11px] text-secondary-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
                      {p.language && (
                        <span className="inline-flex items-center gap-1.5">
                          <Circle className="size-2.5 fill-current" style={{ color: languageColor(p.language) }} aria-hidden /> {p.language}
                        </span>
                      )}
                      <span>{p.category}</span>
                      {dept && (
                        <Link href={`/departments/${dept.slug}`} className="hover:text-foreground">
                          {dept.shortName}
                        </Link>
                      )}
                      <span className="ml-auto inline-flex items-center gap-3">
                        {p.repo && (
                          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary">
                            Repository <ArrowUpRight className="size-3" aria-hidden />
                          </a>
                        )}
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary">
                            Live <ArrowUpRight className="size-3" aria-hidden />
                          </a>
                        )}
                        {!p.repo && !p.demo && <span className="text-muted-foreground/80">Repository link coming with the first release</span>}
                      </span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
