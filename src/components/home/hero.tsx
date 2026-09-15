import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { HeroVisual } from "./hero-visual";
import { Aurora } from "@/components/shared/aurora";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-44" aria-labelledby="hero-title">
      <Aurora />
      <div className="pointer-events-none absolute inset-0 bg-circuit mask-fade-b opacity-[0.45]" aria-hidden />
      <div className="particles pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (<span key={i} className="particle" style={{ left: `${(i * 137) % 100}%`, top: `${(i * 61) % 100}%`, animationDelay: `${(i * 0.7) % 6}s`, animationDuration: `${8 + (i % 5) * 2}s` }} />))}
      </div>

      <div className="container-x relative">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-xl">
            <h1 id="hero-title" className="rise text-balance text-[2.75rem] font-medium leading-[1.04] tracking-[-0.02em] sm:text-6xl lg:text-[4rem]" style={delay(60)}>
              Build the Future with <span className="gradient-text">AI &amp; Technology</span>
            </h1>
            <p className="rise mt-7 max-w-md text-pretty text-xl leading-relaxed text-muted-foreground" style={delay(160)}>
              A student-led innovation community at Tech AI College.
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-3" style={delay(240)}>
              <Link href="/membership" className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-[15px] font-medium text-primary-foreground shadow-lg shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90">
                Become a Member <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link href="/departments" className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card/80 px-7 text-[15px] font-medium text-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-muted">
                <Compass className="size-4 text-primary" aria-hidden /> Explore
              </Link>
            </div>
          </div>
          <div className="rise" style={delay(200)}>
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
