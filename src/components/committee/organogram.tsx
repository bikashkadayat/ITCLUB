import Link from "next/link";
import { committee } from "@/data/committee";
import { departments } from "@/data/departments";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

function Node({ name, role, tone = "default", href, className }: { name: string; role: string; tone?: "default" | "primary" | "advisor"; href?: string; className?: string }) {
  const inner = (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 text-center transition-colors",
        tone === "primary" && "border-brand-blue/40 bg-gradient-to-br from-brand-blue to-brand-blue-deep text-white shadow-lg shadow-brand-blue/20",
        tone === "advisor" && "border-brand-coral/40 bg-accent text-accent-foreground",
        tone === "default" && "border-border/80 bg-card hover:border-primary/40",
        className
      )}
    >
      <p className={cn("text-xs lg:text-[10px] font-semibold uppercase tracking-[0.18em]", tone === "primary" ? "text-white/70" : tone === "advisor" ? "text-brand-coral" : "text-muted-foreground")}>{role}</p>
      <p className={cn("mt-0.5 text-sm font-medium", tone === "primary" && "text-white")}>{name}</p>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

const Connector = ({ className }: { className?: string }) => <div className={cn("mx-auto h-6 w-px bg-border", className)} aria-hidden />;

export function Organogram() {
  const by = (id: string) => committee.find((m) => m.id === id)!;
  const officers = ["sambridhi-subedi", "nirmal-bk", "sanjita-shrestha", "jenisha-basnet"].map(by);
  return (
    <section className="section bg-muted/40" aria-labelledby="organogram-heading">
      <div className="container-x">
        <SectionHeading eyebrow="Organogram" align="center" title={<span id="organogram-heading">How the club is organised.</span>} />
        <Reveal className="mx-auto mt-16 max-w-5xl">
          <ol className="space-y-0" aria-label="Reporting hierarchy">
            <li className="mx-auto max-w-xs"><Node name={by("suman-karki").name} role="Faculty Advisor / Mentor" tone="advisor" href="#suman-karki" /></li>
            <Connector />
            <li className="mx-auto max-w-xs"><Node name={by("bikash-kadayat").name} role="President" tone="primary" href="#bikash-kadayat" /></li>
            <Connector />
            <li className="mx-auto max-w-xs"><Node name={by("sadikshya-rijal").name} role="Vice President" href="#sadikshya-rijal" /></li>
            <Connector />
            <li>
              <div className="relative mx-auto hidden h-px w-3/4 bg-border md:block" aria-hidden />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:pt-6">
                {officers.map((m) => (
                  <div key={m.id} className="relative">
                    <div className="absolute -top-6 left-1/2 hidden h-6 w-px bg-border md:block" aria-hidden />
                    <Node name={m.name} role={m.shortPosition} href={`#${m.id}`} />
                  </div>
                ))}
              </div>
            </li>
            <Connector />
            <li>
              <p className="mb-3 text-center text-xs lg:text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Six departments</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {departments.map((d) => (
                  <Link key={d.slug} href={`/departments/${d.slug}`} className="rounded-2xl border border-border/80 bg-card px-3 py-3 text-center text-xs font-medium transition-colors hover:border-primary/40 hover:text-primary">
                    {d.name}
                  </Link>
                ))}
              </div>
            </li>
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
