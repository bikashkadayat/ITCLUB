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
import { formatDate, cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Resource Center",
  description: "Official documents of the Tech & AI Innovation Club — application, proposal, constitution, committee formation and founding minutes — plus learning tracks for every department.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resource Center"
        crumbs={[{ label: "Resources" }]}
        title={
          <>
            Everything you need <span className="gradient-text">to keep learning</span>.
          </>
        }
        description="Everything members need in one place: the official founding documents, a learning roadmap for each department and the platforms where the club publishes its work."
      />

      <section className="section" aria-labelledby="docs-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Official documents" title={<span id="docs-heading">Founding documents.</span>} description="Signed PDFs submitted to the college administration on 13 September 2026." />
          <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((d) => (
              <StaggerItem key={d.id}>
                <a href={d.file} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-3xl border border-border/80 bg-card p-6 card-hover">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                      <FileText className="size-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">DOC {d.id}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-snug group-hover:text-primary">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-5 text-xs text-muted-foreground">
                    <span>
                      PDF · {d.pages} page{d.pages > 1 ? "s" : ""} · {formatDate(d.date)}
                    </span>
                    <Download className="size-4 text-primary" aria-hidden />
                  </div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>


      <section className="section" aria-labelledby="tracks-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Learning tracks" title={<span id="tracks-heading">A learning path for every department.</span>} description="Start at step one, learn at your own pace, and join a project when you feel ready." />
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {learningTracks.map((t) => {
              const dept = departments.find((d) => d.slug === t.slug)!;
              return (
                <Reveal key={t.slug}>
                  <div className="h-full rounded-3xl border border-border/80 bg-card p-6">
                    <div className="flex items-center gap-3">
                      <span className={cn("flex size-10 items-center justify-center rounded-xl bg-gradient-to-br text-white", dept.color)}>
                        <DepartmentIcon icon={dept.icon} className="size-5" />
                      </span>
                      <h3 className="text-lg font-semibold">{t.department}</h3>
                    </div>
                    <ol className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {t.steps.map((s, i) => (
                        <li key={s} className="flex items-center gap-3 rounded-xl bg-muted/70 px-3 py-2 text-sm">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background font-mono text-[11px] text-primary">{i + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                    <Link href={`/departments/${t.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Department page <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="tools-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Platforms" align="center" title={<span id="tools-heading">Where the club publishes.</span>} />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioPlatforms.map((p) => (
              <Reveal key={p.name}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex h-full items-start justify-between gap-3 rounded-3xl border border-border/80 bg-card p-6 card-hover">
                  <div>
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.purpose}</p>
                  </div>
                  <ExternalLink className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
