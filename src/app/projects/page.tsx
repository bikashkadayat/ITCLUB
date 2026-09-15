import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { portfolioPlatforms } from "@/data/projects";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { ProjectsBrowser } from "@/components/shared/projects-browser";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Club projects, research projects, student innovations and open-source contributions of the Tech & AI Innovation Club.",
  path: "/projects",
});

export default async function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        crumbs={[{ label: "Projects" }]}
        title={
          <>
            Built by students, <span className="gradient-text">shared with everyone</span>.
          </>
        }
        description="Helping students produce production-grade codebases and public developer portfolios is one of the club’s six objectives. Members submit and manage projects in the Project Hub; approved projects appear here."
      />
      <section className="section" aria-labelledby="repos-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Repositories" title={<span id="repos-heading">What we are building.</span>} />
          <Reveal className="mt-10">
            <ProjectsBrowser projects={projects} />
          </Reveal>
        </div>
      </section>
      <section className="section bg-muted/40" aria-labelledby="platforms-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Portfolio platforms" align="center" title={<span id="platforms-heading">Where members publish.</span>} description="The proposal names these platforms as the home of member portfolios." />
          <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioPlatforms.map((p) => (
              <StaggerItem key={p.name}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-3xl border border-border/80 bg-card p-6 card-hover">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.purpose}</p>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
