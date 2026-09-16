import { departments } from "@/data/departments";
import { events } from "@/data/events";
import { Counter } from "@/components/shared/counter";
import { StatArt } from "@/components/shared/mini-art";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

/** The club in numbers. Each figure sits on a miniature of the thing it counts. */
export function StatsCards() {
  const opportunities = departments.reduce((n, d) => n + d.learningAreas.length + d.activities.length + d.projects.length, 0);
  const stats = [
    { kind: "faculties" as const, value: 3, suffix: "", label: "Faculties united" },
    { kind: "departments" as const, value: departments.length, suffix: "", label: "Specialized departments" },
    { kind: "events" as const, value: events.length, suffix: "", label: "Planned events" },
    { kind: "learning" as const, value: opportunities, suffix: "+", label: "Learning opportunities" },
  ];
  return (
    <section className="pb-0 pt-4 sm:pt-6 lg:pt-8" aria-label="Club in numbers">
      <div className="container-x">
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border/80 bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_28px_60px_-34px_var(--glow-blue)]">
                <div className="pointer-events-none absolute -right-2 -top-3 h-24 w-32 text-foreground opacity-[0.45] transition-transform duration-700 group-hover:scale-105 sm:h-28 sm:w-36" aria-hidden>
                  <StatArt kind={s.kind} />
                </div>
                <p className="relative font-display text-4xl font-medium tracking-tight sm:text-5xl"><Counter value={s.value} suffix={s.suffix} /></p>
                <p className="relative mt-1 max-w-[60%] font-medium leading-snug">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
