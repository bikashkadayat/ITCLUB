import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/shared/social-links";
import { pageMetadata } from "@/lib/seo";
import { membership } from "@/data/membership";
import { club } from "@/data/club";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { ArrowUpRight } from "lucide-react";

export const metadata = pageMetadata({
  title: "Membership",
  description: "Eligibility, benefits, application process and structure of the Tech & AI Innovation Club. Become a Member — open to every student in good standing at Tech AI College of Management & Law.",
  path: "/membership",
});

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        crumbs={[{ label: "Membership" }]}
        title={<>Become a <span className="gradient-text">Member</span></>}
        description="Join a community of students passionate about technology, innovation, learning, and collaboration."
      >
        <a href="#apply" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-blue/25 hover:bg-primary/90">
          Become a Member
        </a>
        <a href={membership.applicationFormUrl} target="_blank" rel="noopener noreferrer" className="ml-3 inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold hover:bg-muted">
          Open the form <ArrowUpRight className="size-4" aria-hidden />
        </a>
        <figure className="relative mt-10 aspect-[16/7] w-full overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_var(--glow-blue)] ring-1 ring-black/5">
          <Image src="/images/gallery/computer-lab-session.jpg" alt="Club members working together in the computer lab at Tech AI College." fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover object-[50%_55%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-transparent" aria-hidden />
          <figcaption className="absolute bottom-5 left-6 font-display text-xl text-white sm:bottom-7 sm:left-8 sm:text-2xl">Your seat is waiting.</figcaption>
        </figure>
      </PageHero>

      {/* Process */}
      <section className="section" aria-labelledby="process-heading">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title={<span id="process-heading">Four simple steps.</span>} />
          <Stagger as="ol" className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {membership.process.map((s) => (
              <StaggerItem key={s.step} as="li">
                <div className="group relative flex h-full flex-col rounded-3xl border border-border/80 bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_28px_60px_-34px_var(--glow-blue)]">
                  <span className="gradient-text font-display text-6xl font-semibold leading-none">{s.step}</span>
                  <h3 className="mt-6 text-lg font-semibold leading-snug">{s.title}</h3>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-muted/40" aria-labelledby="benefits-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Membership benefits" title={<span id="benefits-heading">What you get as a member.</span>} />
          <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {membership.benefits.map((b, i) => (
              <StaggerItem key={b.title}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_28px_60px_-34px_var(--glow-blue)]">
                  <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-4 block h-px w-10 bg-gradient-to-r from-brand-blue to-brand-coral transition-all duration-500 group-hover:w-20" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold leading-snug">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Structure & responsibilities */}
      <section className="section" aria-labelledby="structure-heading">
        <div className="container-x">
          <Reveal>
            <div className="h-full rounded-3xl border border-border/80 bg-card p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red-deep dark:text-brand-coral-light">What we expect</p>
              <h2 id="structure-heading" className="mt-3 text-2xl font-semibold">Responsibilities &amp; conduct</h2>
              <ul className="mt-5 space-y-2.5">
                {membership.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm text-foreground/85">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-coral" aria-hidden /> {r}
                  </li>
                ))}
              </ul>
              <h3 className="mt-7 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Code of Conduct</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {club.codeOfConduct.map((c) => (
                  <li key={c} className="rounded-full bg-muted px-3 py-1 text-xs">
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground"><Link href="/committee" className="font-semibold text-primary">See how the club is organised →</Link><br />Membership may lapse if the engagement-compliance requirement is not met without valid reason, and may be terminated for serious or repeated violations following due process.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section id="apply" className="section bg-muted/40 scroll-mt-24" aria-labelledby="apply-heading">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title={<span id="apply-heading">Membership Application</span>} description="Fill in the official membership form below. The Executive Committee reviews every application after each intake." />
            <div className="mt-8 hidden rounded-2xl border border-border/80 bg-card p-5 lg:block">
              <p className="text-sm font-medium">Follow the club for event announcements.</p>
              <SocialLinks labelled className="mt-3" />
            </div>
          </div>
          <Reveal className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 lg:col-span-8">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-background">
                <iframe
                  title="Tech & AI Innovation Club membership application form"
                  src={membership.applicationFormEmbedUrl}
                  className="h-[calc(100vh-12rem)] min-h-[40rem] w-full border-0"
                  allow="fullscreen; microphone; camera; geolocation"
                  loading="lazy"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Form not loading?{" "}
                <a href={membership.applicationFormUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4">
                  Open it in a new tab <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
