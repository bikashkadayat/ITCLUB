import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import { HeroVisual } from "./hero-visual";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40" aria-labelledby="hero-title">
      {/* subtle background: circuit grid, glows, particles */}
      <div className="pointer-events-none absolute inset-0 bg-circuit mask-fade-b opacity-[0.5]" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-[10%] h-[36rem] w-[36rem] rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, var(--glow-blue), transparent 70%)", opacity: 0.45 }} aria-hidden />
      <div className="pointer-events-none absolute right-[-10%] top-40 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, var(--glow-coral), transparent 70%)", opacity: 0.35 }} aria-hidden />
      <div className="particles pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (<span key={i} className="particle" style={{ left: `${(i * 137) % 100}%`, top: `${(i * 61) % 100}%`, animationDelay: `${(i * 0.7) % 6}s`, animationDuration: `${8 + (i % 5) * 2}s` }} />))}
      </div>

      <div className="container-x relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div className="max-w-xl">
            <span className="rise inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 py-1 pl-1.5 pr-3.5 text-xs font-medium text-muted-foreground backdrop-blur" style={delay(0)}>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground"><Sparkles className="size-3" aria-hidden /> Official club</span>
              {siteConfig.college.name}
            </span>
            <h1 id="hero-title" className="rise mt-6 text-balance text-[2.6rem] font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem]" style={delay(80)}>
              Where students build the <span className="gradient-text">future with AI &amp; technology</span>.
            </h1>
            <p className="rise mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground" style={delay(160)}>
              A student innovation community in New Baneshwor, Kathmandu. Learn artificial intelligence, software engineering, cyber security and data science by building real projects with people who love it as much as you do.
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-3" style={delay(240)}>
              <Link href="/membership" className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-[15px] font-medium text-primary-foreground shadow-lg shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90">
                Become a Member <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link href="/departments" className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card/80 px-7 text-[15px] font-medium text-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-muted">
                <Compass className="size-4 text-primary" aria-hidden /> Explore Opportunities
              </Link>
            </div>
            <p className="rise mt-5 text-sm text-muted-foreground" style={delay(320)}>Open to every student in good standing. No experience required, just curiosity.</p>
          </div>
          <div className="rise" style={delay(200)}>
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
