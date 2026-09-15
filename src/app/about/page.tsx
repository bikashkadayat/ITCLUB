import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Target, Wrench, FlaskConical, Puzzle, Briefcase, Users, Globe, Building2, Scale, GraduationCap } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { club } from "@/data/club";
import { timeline } from "@/data/timeline";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { InteractiveTimeline } from "@/components/shared/timeline";

export const metadata = pageMetadata({
  title: "About the Club",
  description: "Why the Tech & AI Innovation Club was founded, its vision, mission, objectives, expected impact and establishment journey at Tech AI College of Management & Law.",
  path: "/about",
});

const objectiveIcons = [Wrench, FlaskConical, Puzzle, Briefcase, Users, Globe];

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
            <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue via-brand-blue-deep to-brand-navy p-9 text-white sm:p-12">
              <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
              <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand-coral/30 blur-3xl float-slow" aria-hidden />
              <div className="relative">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10"><Eye className="size-6" aria-hidden /></span>
                <h2 id="vm-heading" className="mt-6 text-3xl font-semibold">Vision</h2>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-white/90">{club.vision}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-border/80 bg-card p-9 sm:p-12">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground"><Target className="size-6" aria-hidden /></span>
              <h2 className="mt-6 text-3xl font-semibold">Mission</h2>
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
                <div className="group flex h-full items-center gap-4 rounded-3xl border border-border/80 bg-card px-5 py-4 card-hover sm:flex-col sm:py-8 sm:text-center">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-coral text-white shadow-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]">{(() => { const Icon = objectiveIcons[i % objectiveIcons.length]; return <Icon className="size-5" aria-hidden />; })()}</span>
                  <h3 className="text-base font-semibold">{o.title}</h3>
                  <span className="ml-auto font-mono text-xs text-muted-foreground sm:ml-0 sm:mt-auto lg:text-[11px]">0{i + 1}</span>
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
