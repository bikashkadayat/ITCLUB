import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Breadcrumbs } from "./breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, description, crumbs, children, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border/70", className)}>
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow-blue), transparent)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-[-8%] h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow-coral), transparent)" }}
        aria-hidden
      />
      <div className="container-x relative pb-12 pt-36 sm:pb-20 sm:pt-40">
        {crumbs && <Breadcrumbs items={crumbs} className="mb-6" />}
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary/60" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h1 className="text-balance text-[2.25rem] font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">{description}</p>}
        </Reveal>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
