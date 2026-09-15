import Link from "next/link";
import { FileText, Download, ArrowRight, ExternalLink } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { documents, learningTracks } from "@/data/resources";
import { portfolioPlatforms } from "@/data/projects";
import { departments } from "@/data/departments";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { DepartmentIcon } from "@/components/shared/department-icon";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Resource Center",
  description: "Official documents of the Tech & AI Innovation Club — application, proposal, constitution, committee formation and founding minutes — plus learning tracks for every department.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="Resources" crumbs={[{ label: "Resources" }]} title={<>Documents and <span className="gradient-text">learning tracks</span>.</>} description="Founding documents, a roadmap per department, and where we publish." />

      <section className="section" aria-labelledby="docs-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Official documents" title={<span id="docs-heading">Founding documents.</span>} />
          <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((d) => (
              <StaggerItem key={d.id}>
                <a href={d.file} target="_blank" rel="noopener noreferrer" className="group flex h-full items-center gap-5 rounded-3xl border border-border/80 bg-card p-6 card-hover">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary transition-transform duration-500 group-hover:-translate-y-1"><FileText className="size-5" aria-hidden /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-snug group-hover:text-primary">{d.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">PDF · {d.pages} page{d.pages > 1 ? "s" : ""}</span>
                  </span>
                  <Download className="size-4 shrink-0 text-primary" aria-hidden />
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section bg-muted/40" aria-labelledby="tracks-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Learning tracks" title={<span id="tracks-heading">A path for every department.</span>} />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {learningTracks.map((t) => {
              const dept = departments.find((d) => d.slug === t.slug)!;
              return (
                <Reveal key={t.slug}>
                  <Link href={`/departments/${t.slug}`} className="group block h-full rounded-3xl border border-border/80 bg-card p-6 card-hover" aria-label={`${t.department} learning track, ${t.steps.length} steps`}>
                    <div className="flex items-center gap-3">
                      <span className={cn("flex size-11 items-center justify-center rounded-xl bg-gradient-to-br text-white", dept.color)}><DepartmentIcon icon={dept.icon} className="size-5" /></span>
                      <h3 className="font-semibold">{t.department}</h3>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <ol className="flex items-center gap-1.5" aria-label={`${t.steps.length} steps`}>
                        {t.steps.map((s, i) => (
                          <li key={s} className="flex size-7 items-center justify-center rounded-full bg-muted font-mono text-xs lg:text-[11px] text-primary" title={s}>{i + 1}</li>
                        ))}
                      </ol>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">{t.steps.length} steps <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="tools-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Platforms" align="center" title={<span id="tools-heading">Where we publish.</span>} />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioPlatforms.map((p) => (
              <Reveal key={p.name}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex h-full items-center justify-between gap-3 rounded-3xl border border-border/80 bg-card px-6 py-6 card-hover">
                  <span className="font-semibold">{p.name}</span>
                  <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
