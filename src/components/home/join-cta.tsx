import Image from "next/image";
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
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-7">
                <h2 id="join-heading" className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  Any student can join. <span className="gradient-text">Yes, that means you.</span>
                </h2>
                <div className="mt-8">
                  <Link href="/membership" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90">
                    Become a Member <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-3xl border border-border/80">
                  <Image
                    src="/images/gallery/computer-lab-session.jpg"
                    alt="Students working together during a lab session at Tech AI College."
                    width={1078}
                    height={1351}
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="aspect-[4/3] w-full object-cover object-[55%_38%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-blue/20 to-transparent" aria-hidden />
                  <p className="absolute inset-x-0 bottom-0 p-5 text-sm font-medium text-white">Members at work in the computer lab.</p>
                </div>
                <div className="mt-4 rounded-3xl border border-border/80 bg-background/80 p-5 backdrop-blur">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Newsletter</h3>
                  <NewsletterForm className="mt-3" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
