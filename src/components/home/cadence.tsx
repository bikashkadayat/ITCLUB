import { club } from "@/data/club";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

export function Cadence() {
  return (
    <section className="section" aria-labelledby="cadence-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="How the club runs"
          align="center"
          title={<span id="cadence-heading">A cadence built for momentum.</span>}
          description="From weekly departmental builds to semester showcases, the club’s operational rhythm keeps every member shipping, learning and presenting."
        />
        <Stagger as="ol" className="relative mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {club.cadence.map((c, i) => (
            <StaggerItem key={c.period} as="li" className="relative">
              <div className="relative h-full rounded-3xl border border-border/80 bg-card p-6 card-hover">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{c.period}</span>
                <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                <span className="absolute right-5 top-5 font-display text-4xl font-semibold text-foreground/5" aria-hidden>
                  {i + 1}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
