import { departments } from "@/data/departments";
import { events } from "@/data/events";
import { Counter } from "@/components/shared/counter";
import { Reveal } from "@/components/shared/reveal";

/** The club in numbers: one quiet band, figures first, no decoration. */
export function StatsCards() {
  const opportunities = departments.reduce((n, d) => n + d.learningAreas.length + d.activities.length + d.projects.length, 0);
  const stats = [
    { value: 3, suffix: "", label: "Faculties united" },
    { value: departments.length, suffix: "", label: "Specialized departments" },
    { value: events.length, suffix: "", label: "Planned events" },
    { value: opportunities, suffix: "+", label: "Learning opportunities" },
  ];
  return (
    <section className="pb-0 pt-4 sm:pt-6 lg:pt-8" aria-label="Club in numbers">
      <div className="container-x">
        <Reveal>
          <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-border/80 bg-card lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`relative flex flex-col px-6 py-7 sm:px-8 sm:py-9 ${i % 2 === 1 ? "border-l border-border/70" : ""} ${i >= 2 ? "border-t border-border/70 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
                <dt className="order-2 mt-1 text-sm font-medium text-muted-foreground">{s.label}</dt>
                <dd className="order-1 font-display text-5xl font-medium tracking-tight sm:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <span className="absolute bottom-0 left-6 h-0.5 w-10 bg-gradient-to-r from-brand-blue to-brand-coral sm:left-8" aria-hidden />
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
