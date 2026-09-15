import Link from "next/link";
import { ArrowRight, GitBranch, Circle } from "lucide-react";
import { projects } from "@/data/projects";
import { departments } from "@/data/departments";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { languageColor } from "@/components/shared/language-color";

export function ProjectsPreview() {
  const featured = projects.slice(0, 3);
  return (
    <section className="section bg-muted/40" aria-labelledby="projects-heading">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title={<span id="projects-heading">Build in public.</span>}
            description="Production-grade codebases and public developer portfolios are a core objective. These are the initiatives the departments are lining up first."
          />
          <Link href="/projects" className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
            All projects <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
        <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {featured.map((p) => {
            const dept = departments.find((d) => d.slug === p.department);
            return (
              <StaggerItem key={p.slug}>
                <Link href={`/projects#${p.slug}`} className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-5 font-mono text-sm card-hover">
                  <div className="flex items-center gap-2 text-primary">
                    <GitBranch className="size-4" aria-hidden />
                    <span className="truncate font-semibold">{p.name}</span>
                    <span className="ml-auto rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{p.visibility}</span>
                  </div>
                  <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-xs text-muted-foreground">
                    {p.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <Circle className="size-2.5 fill-current" style={{ color: languageColor(p.language) }} aria-hidden /> {p.language}
                      </span>
                    )}
                    <span>{p.status}</span>
                    {dept && <span className="truncate">{dept.shortName}</span>}
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
