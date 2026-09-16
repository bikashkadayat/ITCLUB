import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Scale, GraduationCap } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { club } from "@/data/club";
import { timeline } from "@/data/timeline";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { InteractiveTimeline } from "@/components/shared/timeline";
import { Photo } from "@/components/shared/photo";

export const metadata = pageMetadata({
  title: "About the Club",
  description: "Why the Tech & AI Innovation Club was founded, its vision, mission, objectives, expected impact and establishment journey at Tech AI College of Management & Law.",
  path: "/about",
});


const faculties = [
  { Icon: GraduationCap, label: "Computer Science" },
  { Icon: Building2, label: "Management" },
  { Icon: Scale, label: "Law" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" crumbs={[{ label: "About" }]} title={<>Ideas into <span className="gradient-text">real projects</span>.</>} description={club.tagline} />

      {/* Visual intro: the lab, three faculties */}
      <section className="section" aria-label="Three faculties, one club">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-border/80">
            <Image src="/images/gallery/computer-lab-session.jpg" alt="Students at work in the computer lab at Tech AI College." width={1078} height={1351} sizes="100vw" priority className="aspect-[16/9] w-full object-cover object-[60%_40%] sm:aspect-[21/9]" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/20 to-transparent" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-white sm:p-10">
              <p className="font-display text-2xl leading-tight sm:text-4xl">Three faculties. One club.</p>
              <ul className="flex flex-wrap gap-2">
                {faculties.map(({ Icon, label }) => (
                  <li key={label} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm backdrop-blur">
                    <Icon className="size-4" aria-hidden /> {label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision / Mission cards */}
      <section className="section bg-muted/40" aria-labelledby="vm-heading">
        <div className="container-x grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="group relative h-full overflow-hidden rounded-3xl bg-brand-navy p-9 text-white sm:p-12">
              <Photo name="networkingEvent" grade="deep" className="absolute inset-0" sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/80 to-brand-navy/30" aria-hidden />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-coral-light">Where we are going</p>
                <h2 id="vm-heading" className="mt-3 text-4xl font-semibold">Vision</h2>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-white/90">{club.vision}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-border/80 bg-card p-9 sm:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">How we get there</p>
              <h2 className="mt-3 text-4xl font-semibold">Mission</h2>
              <ol className="mt-5 space-y-3">
                {club.mission.map((m, i) => (
                  <li key={m} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                    <span className="font-mono text-xs text-primary">0{i + 1}</span>
                    {m}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Objectives: title-only cards */}
      <section className="section" aria-labelledby="objectives-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Objectives" align="center" title={<span id="objectives-heading">Six objectives.</span>} />
          <Stagger className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4">
            {club.objectives.map((o, i) => (
              <StaggerItem key={o.title}>
                <div className="group flex h-full items-center gap-5 rounded-3xl border border-border/80 bg-card px-6 py-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_60px_-34px_var(--glow-blue)] sm:flex-col sm:items-start sm:py-7">
                  <span className="gradient-text font-display text-5xl font-semibold leading-none">0{i + 1}</span>
                  <h3 className="text-lg font-semibold leading-snug">{o.title}</h3>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-muted/40" aria-labelledby="journey-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Journey" title={<span id="journey-heading">From idea to official recognition.</span>} />
          <div className="mt-16">
            <InteractiveTimeline items={timeline} />
          </div>
          <Reveal className="mt-16 flex flex-wrap items-center justify-center gap-3">
            <Link href="/membership" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Become a Member <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/resources" className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-7 text-sm font-semibold hover:bg-muted">
              Founding documents
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
