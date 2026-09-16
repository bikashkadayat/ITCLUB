import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { departments } from "@/data/departments";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { Photo } from "@/components/shared/photo";
import { cn } from "@/lib/utils";

/** Visual-first department cards: a scene, the name, one sentence, one way in. */
export function DepartmentsGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section relative bg-muted/40" aria-labelledby="departments-heading">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-60" aria-hidden />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={compact ? "Explore" : "Six departments"} title={<span id="departments-heading">Pick your track. Or two.</span>} />
          {!compact && (
            <Link href="/departments" className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
              All departments <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          )}
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d, i) => (
            <StaggerItem key={d.slug}>
              <Link
                href={`/departments/${d.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-[0_18px_50px_-30px_var(--glow-blue)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_36px_80px_-32px_var(--glow-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className={cn("absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r", d.color)} aria-hidden />
                <div className="relative aspect-[8/5] w-full">
                  <Photo name={d.visual} className="absolute inset-0" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[11px] font-medium text-white backdrop-blur">0{i + 1}</span>
                </div>
                <div className="relative flex flex-1 flex-col px-6 pb-6 pt-1">
                  <h3 className="text-xl font-semibold tracking-tight">{d.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.tagline}</p>
                  <span className="mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                    Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
