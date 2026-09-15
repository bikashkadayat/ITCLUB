import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Target, Lightbulb, Users, Building2, Scale, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { club } from "@/data/club";
import { siteConfig } from "@/data/site";
import { timeline } from "@/data/timeline";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { InteractiveTimeline } from "@/components/shared/timeline";
import { formatDate } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About the Club",
  description: "Why the Tech & AI Innovation Club was founded, its vision, mission, objectives, expected impact and establishment journey at Tech AI College of Management & Law.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        crumbs={[{ label: "About" }]}
        title={
          <>
            Where students turn ideas into <span className="gradient-text">real projects</span>.
          </>
        }
        description={club.purpose}
      />

      {/* Introduction */}
      <section className="section" aria-labelledby="intro-heading">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Introduction" title={<span id="intro-heading">Learning by building.</span>} />
            <Reveal delay={0.1} className="mt-8 overflow-hidden rounded-3xl border border-border/80">
              <Image src="/images/gallery/computer-lab-session.jpg" alt="Students at work in the computer lab at Tech AI College." width={1078} height={1351} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] w-full object-cover" />
              <p className="bg-card px-5 py-3 text-xs text-muted-foreground">Hands-on session in the computer lab, Tech AI College of Management &amp; Law.</p>
            </Reveal>
          </div>
          <Reveal className="prose-club lg:col-span-7 lg:pt-2">
            {club.introduction.map((p) => (
              <p key={p} className="text-lg">
                {p}
              </p>
            ))}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { Icon: GraduationCap, label: "Computer Science" },
                { Icon: Building2, label: "Management" },
                { Icon: Scale, label: "Law" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card px-4 py-3">
                  <Icon className="size-5 text-primary" aria-hidden />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Three faculties, one club — a unifying platform for collaborative technical projects.</p>
          </Reveal>
        </div>
      </section>

      {/* Why founded */}
      <section className="section bg-muted/40" aria-labelledby="why-heading">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why the club was founded"
            align="center"
            title={<span id="why-heading">The gap we set out to close.</span>}
            description="From the rationale section of the establishment proposal."
          />
          <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {club.rationale.map((r, i) => (
              <StaggerItem key={r.title}>
                <div className="flex h-full gap-5 rounded-3xl border border-border/80 bg-card p-6 card-hover">
                  <span className="font-display text-3xl font-semibold text-primary/40">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" aria-labelledby="vm-heading">
        <div className="container-x grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue via-brand-blue-deep to-brand-navy p-8 text-white sm:p-10">
              <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
              <div className="relative">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/10">
                  <Eye className="size-5" aria-hidden />
                </span>
                <h2 id="vm-heading" className="mt-5 text-3xl font-semibold">
                  Vision
                </h2>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-white/90">{club.vision}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-border/80 bg-card p-8 sm:p-10">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Target className="size-5" aria-hidden />
              </span>
              <h2 className="mt-5 text-3xl font-semibold">Mission</h2>
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

      {/* Objectives */}
      <section className="section bg-muted/40" aria-labelledby="objectives-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Objectives" title={<span id="objectives-heading">Six measurable objectives.</span>} />
          <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {club.objectives.map((o, i) => (
              <StaggerItem key={o.title}>
                <div className="group h-full rounded-3xl border border-border/80 bg-card p-6 card-hover">
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Lightbulb className="size-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" aria-labelledby="journey-heading">
        <div className="container-x">
          <SectionHeading
            eyebrow="Club establishment journey"
            title={<span id="journey-heading">From idea to official recognition.</span>}
            description="Select a milestone to see what happened. Every step is recorded in the founding documents."
          />
          <div className="mt-12">
            <InteractiveTimeline items={timeline} />
          </div>
        </div>
      </section>

      {/* Founding meeting */}
      <section className="section bg-muted/40" aria-labelledby="founding-heading">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow="Founding information" title={<span id="founding-heading">The founding meeting.</span>} />
            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {[
                ["Date", formatDate(club.founding.date)],
                ["Time", club.founding.time],
                ["Venue", club.founding.venue],
                ["Chairperson", club.founding.chairperson],
                ["Minute-taker", club.founding.minuteTaker],
                ["Faculty Advisor", club.facultyAdvisor],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-border/80 bg-card p-4">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-2xl border border-border/80 bg-card p-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Users className="size-4 text-primary" aria-hidden /> Participants
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {club.founding.participants.map((p) => (
                  <li key={p} className="rounded-full bg-muted px-3 py-1 text-sm">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-3xl border border-border/80 bg-card p-7 sm:p-9">
              <h3 className="text-lg font-semibold">Agenda</h3>
              <ol className="mt-4 space-y-2.5">
                {club.founding.agenda.map((a, i) => (
                  <li key={a} className="flex gap-3 text-sm text-foreground/85">
                    <span className="font-mono text-xs text-primary">{i + 1}.</span> {a}
                  </li>
                ))}
              </ol>
              <h3 className="mt-8 text-lg font-semibold">Decisions / Resolutions</h3>
              <ol className="mt-4 space-y-2.5">
                {club.founding.resolutions.map((a, i) => (
                  <li key={a} className="flex gap-3 text-sm text-foreground/85">
                    <span className="font-mono text-xs text-primary">{i + 1}.</span> {a}
                  </li>
                ))}
              </ol>
              <blockquote className="mt-8 rounded-2xl border-l-4 border-brand-coral bg-accent/60 p-5 text-sm italic leading-relaxed text-foreground/90">
                “{club.founding.resolution}”
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expected impact */}
      <section className="section" aria-labelledby="impact-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Expected impact" align="center" title={<span id="impact-heading">What changes for students and the college.</span>} />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-border/80 bg-card p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Sparkles className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-xl font-semibold">For the student body</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {club.expectedOutcomes.students.map((s) => (
                    <li key={s} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-border/80 bg-card p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Building2 className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-xl font-semibold">For the college</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {club.expectedOutcomes.college.map((s) => (
                    <li key={s} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-coral" aria-hidden /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/membership" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Become a Member <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/resources" className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold hover:bg-muted">
              Download founding documents
            </Link>
          </Reveal>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Under the supervision of the Faculty Advisor and the administration of {siteConfig.college.name}.
          </p>
        </div>
      </section>
    </>
  );
}
