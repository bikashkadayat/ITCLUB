import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { departments } from "@/data/departments";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { DepartmentIcon } from "@/components/shared/department-icon";
import { cn } from "@/lib/utils";

/** Six departments: icon, name, one line. */
export function DepartmentsGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section relative bg-muted/40" aria-labelledby="departments-heading">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-60" aria-hidden />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Six departments" title={<span id="departments-heading">Pick your track. Or two.</span>} />
          {!compact && (
            <Link href="/departments" className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
              All departments <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          )}
        </div>

        <Stagger className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d, i) => (
            <StaggerItem key={d.slug}>
              <Link href={`/departments/${d.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-7 card-hover focus-visible:ring-2 focus-visible:ring-primary">
                <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80", d.color)} aria-hidden />
                <div className={cn("pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30", d.color)} aria-hidden />
                <div className="flex items-start justify-between">
                  <span className={cn("flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]", d.color)}>
                    <DepartmentIcon icon={d.icon} className="size-7" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-7 text-xl font-semibold">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.tagline}</p>
                <span className="mt-auto inline-flex items-center pt-8 text-primary" aria-hidden>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
