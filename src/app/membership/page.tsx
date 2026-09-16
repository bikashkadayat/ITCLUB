import { StepArt } from "@/components/shared/mini-art";
import { pageMetadata } from "@/lib/seo";
import { membership } from "@/data/membership";
import { club } from "@/data/club";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { MembershipForm } from "@/components/forms/membership-form";

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
      </PageHero>

      {/* Process */}
      <section className="section" aria-labelledby="process-heading">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title={<span id="process-heading">Four simple steps.</span>} />
          <Stagger as="ol" className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {membership.process.map((s) => (
              <StaggerItem key={s.step} as="li">
                <div className="group relative flex h-full flex-col rounded-3xl border border-border/80 bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_28px_60px_-34px_var(--glow-blue)]">
                  <div className="h-20 w-full transition-transform duration-500 group-hover:scale-105"><StepArt step={Number(s.step)} /></div>
                  <span className="mt-4 font-mono text-xs text-primary">{s.step}</span>
                  <h3 className="mt-1 text-lg font-semibold leading-snug">{s.title}</h3>
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
        <div className="container-x grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border/80 bg-card p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">How the club works</p>
              <h2 id="structure-heading" className="mt-3 text-2xl font-semibold">
                Club structure
              </h2>
              <ol className="mt-5 space-y-4">
                {[
                  ["Faculty Advisor / Mentor", "Strategic and administrative clearance; link to the college administration."],
                  ["Executive Committee", "President, Vice President, Secretary, IT/Technical Coordinator, Event/Program Coordinator, PR/Communication Officer."],
                  ["Six departments", "Each with a Department Lead, an Assistant Lead and Technical Associates / Members."],
                  ["Members", "Choose up to two primary departments; active status through engagement compliance."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs">{i + 1}</span>
                    <div>
                      <p className="font-medium">{t}</p>
                      <p className="text-sm text-muted-foreground">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-border/80 bg-card p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red-deep dark:text-brand-coral-light">What we expect</p>
              <h2 className="mt-3 text-2xl font-semibold">Responsibilities &amp; conduct</h2>
              <ul className="mt-5 space-y-2.5">
                {membership.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm text-foreground/85">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-coral" aria-hidden /> {r}
                  </li>
                ))}
              </ul>
              <h3 className="mt-7 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Code of Conduct</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {club.codeOfConduct.map((c) => (
                  <li key={c} className="rounded-full bg-muted px-3 py-1 text-xs">
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">Membership may lapse if the engagement-compliance requirement is not met without valid reason, and may be terminated for serious or repeated violations following due process.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section id="apply" className="section bg-muted/40 scroll-mt-24" aria-labelledby="apply-heading">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title={<span id="apply-heading">Membership Application</span>} description="Fill out the form below and send your application through WhatsApp." />
          </div>
          <Reveal className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 lg:col-span-8">
            <MembershipForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
