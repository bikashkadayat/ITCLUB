import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, BookOpen, Calendar, Wrench, Rocket, Flag } from "lucide-react";
import { departments, getDepartment } from "@/data/departments";
import { events } from "@/data/events";
import { formatDate } from "@/lib/utils";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { DepartmentIcon } from "@/components/shared/department-icon";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDepartment(slug);
  if (!d) return {};
  return pageMetadata({ title: `${d.name} Department`, description: d.overview, path: `/departments/${d.slug}` });
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDepartment(slug);
  if (!d) notFound();
  const idx = departments.findIndex((x) => x.slug === d.slug);
  const prev = departments[(idx - 1 + departments.length) % departments.length];
  const next = departments[(idx + 1) % departments.length];
  const deptEvents = events.filter((e) => e.department === d.slug);
  const deptProjects = projects.filter((p) => p.department === d.slug);

  return (
    <>
      <PageHero
        eyebrow={`Department ${String(idx + 1).padStart(2, "0")}`}
        crumbs={[{ label: "Departments", href: "/departments" }, { label: d.name }]}
        title={
          <span className="flex flex-wrap items-center gap-4">
            <span className={cn("flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg", d.color)}>
              <DepartmentIcon icon={d.icon} className="size-7" />
            </span>
            {d.name}
          </span>
        }
        description={d.tagline}
      />

      <section className="section" aria-labelledby="overview-heading">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 id="overview-heading" className="text-2xl font-semibold sm:text-3xl">
              Overview
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/85">{d.overview}</p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <List icon={BookOpen} title="Learning areas" items={d.learningAreas} />
              <List icon={Calendar} title="Activities" items={d.activities} />
              <List icon={Wrench} title="Skills" items={d.skills} />
              <List icon={Flag} title="Future goals" items={d.futureGoals} />
            </div>
          </Reveal>
          <div className="space-y-5 lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border/80 bg-card p-6">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Rocket className="size-4 text-primary" aria-hidden /> Projects
                </p>
                <ul className="mt-4 space-y-3">
                  {d.projects.map((p) => (
                    <li key={p.title} className="rounded-2xl border border-border/80 bg-background p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium">{p.title}</p>
                        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs lg:text-[10px] font-semibold uppercase tracking-wider", p.status === "In development" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground")}>{p.status}</span>
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
                    </li>
                  ))}
                </ul>
                {deptProjects.length > 0 && (
                  <Link href="/projects" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    View in project portfolio <ArrowRight className="size-4" aria-hidden />
                  </Link>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-border/80 bg-card p-6">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Calendar className="size-4 text-primary" aria-hidden /> Events run by this department
                </p>
                <ul className="mt-4 divide-y divide-border/70">
                  {deptEvents.map((e) => (
                    <li key={e.slug}>
                      <Link href={`/events#${e.slug}`} className="group flex items-center justify-between gap-3 py-3">
                        <span>
                          <span className="block text-sm font-medium group-hover:text-primary">{e.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {e.type} · {formatDate(e.date)}
                          </span>
                        </span>
                        <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className={cn("rounded-3xl bg-gradient-to-br p-6 text-white", d.color)}>
                <p className="text-lg font-semibold">Join {d.shortName}</p>
                <p className="mt-1 text-sm text-white/85">Select {d.name} as one of your two primary departments on the membership form.</p>
                <Link href={`/membership?department=${d.slug}`} className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-brand-navy hover:bg-white/90">
                  Apply now <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border/70 py-10">
        <div className="container-x flex flex-col justify-between gap-4 sm:flex-row">
          <Link href={`/departments/${prev.slug}`} className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden /> {prev.name}
          </Link>
          <Link href={`/departments/${next.slug}`} className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:text-right">
            {next.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </section>
      <Stagger className="hidden">
        <StaggerItem>
          <span />
        </StaggerItem>
      </Stagger>
    </>
  );
}

function List({ icon: Icon, title, items }: { icon: React.ComponentType<{ className?: string }>; title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="size-4 text-primary" /> {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-sm text-foreground/85">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-coral" aria-hidden />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
