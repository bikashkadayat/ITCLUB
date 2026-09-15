import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Eye, Target, Quote } from "lucide-react";
import { club } from "@/data/club";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";

export function AboutPreview() {
  return (
    <section className="section relative" aria-labelledby="about-preview">
      <div className="container-x">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About the club"
              title={
                <span id="about-preview">
                  Where classroom theory meets <span className="gradient-text">real practice</span>.
                </span>
              }
              description={club.introduction[1]}
            />
            <Reveal delay={0.1} className="mt-8">
              <Link href="/about" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read our story
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 rounded-2xl border border-border/80 bg-card/70 p-5">
              <div className="flex items-center gap-4">
                <Image src={siteConfig.college.logo} alt={siteConfig.college.name} width={1384} height={450} sizes="140px" className="h-10 w-auto rounded-md bg-white p-1" />
                <div className="text-sm">
                  <p className="font-medium">{siteConfig.college.name}</p>
                  <p className="text-muted-foreground">{siteConfig.college.address}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The club is a student-led, non-profit academic and technical club operating within, and under the authority of, the college — supervised by a Faculty Advisor and cleared by the college administration.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 gap-5 lg:col-span-7">
            <StaggerItem>
              <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-7 card-hover sm:p-9">
                <div className="absolute -right-16 -top-16 size-48 rounded-full bg-brand-blue/10 blur-2xl transition-transform group-hover:scale-125" aria-hidden />
                <div className="relative flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Eye className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-xl font-semibold">Vision</h3>
                </div>
                <p className="relative mt-4 text-pretty leading-relaxed text-foreground/85">{club.vision}</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-7 card-hover sm:p-9">
                <div className="absolute -left-16 -bottom-16 size-48 rounded-full bg-brand-coral/10 blur-2xl transition-transform group-hover:scale-125" aria-hidden />
                <div className="relative flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Target className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-xl font-semibold">Mission</h3>
                </div>
                <ul className="relative mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {club.mission.map((m) => (
                    <li key={m} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-coral" aria-hidden />
                      {m.replace(/^To /, "")}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
            <StaggerItem>
              <blockquote className="relative rounded-3xl bg-gradient-to-br from-brand-blue via-brand-blue-deep to-brand-navy p-7 text-white sm:p-9">
                <Quote className="absolute right-6 top-6 size-10 text-white/15" aria-hidden />
                <p className="text-pretty font-display text-xl leading-snug sm:text-2xl">“{club.tagline}”</p>
                <footer className="mt-4 text-sm text-white/70">Club tagline · Detailed Club Establishment Proposal, 13 September 2026</footer>
              </blockquote>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
