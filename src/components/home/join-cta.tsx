import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function JoinCta() {
  return (
    <section className="section pt-0" aria-labelledby="join-heading">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card p-8 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-b" aria-hidden />
            <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-coral/20 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-brand-blue/20 blur-3xl" aria-hidden />
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Everyone is welcome</p>
                <h2 id="join-heading" className="mt-3 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  Any student in good standing can join. <span className="gradient-text">Yes, that means you.</span>
                </h2>
                <p className="mt-5 max-w-lg text-muted-foreground">
                  Computer science, management or law — apply online, pick up to two departments, and start building with us this semester.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/membership" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90">
                    Become a Member <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <Link href="/constitution" className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold transition-colors hover:bg-muted">
                    <FileText className="size-4 text-primary" aria-hidden /> Read the Constitution
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl border border-border/80 bg-background/80 p-6 backdrop-blur sm:p-8">
                <h3 className="text-lg font-semibold">Newsletter</h3>
                <p className="mt-2 text-sm text-muted-foreground">Event announcements, project launches and club updates delivered to your inbox.</p>
                <NewsletterForm className="mt-5" />
                <p className="mt-3 text-xs text-muted-foreground">We only use your email for club communication, in line with the Code of Conduct.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
