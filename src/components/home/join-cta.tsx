import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function JoinCta() {
  return (
    <section className="section pt-0" aria-labelledby="join-heading">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card p-10 sm:p-14 lg:p-20">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-b" aria-hidden />
            <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-coral/20 blur-3xl float-slow" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-brand-blue/20 blur-3xl float-slow" style={{ animationDelay: "3s" }} aria-hidden />
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 id="join-heading" className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  Any student can join. <span className="gradient-text">Yes, that means you.</span>
                </h2>
                <div className="mt-8">
                  <Link href="/membership" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90">
                    Become a Member <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl border border-border/80 bg-background/80 p-6 backdrop-blur sm:p-8">
                <h3 className="text-lg font-semibold">Newsletter</h3>
                <NewsletterForm className="mt-4" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
