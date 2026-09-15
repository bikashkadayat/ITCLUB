import { Layers, CalendarDays, BookOpen, GraduationCap } from "lucide-react";
import { departments } from "@/data/departments";
import { upcomingEvents } from "@/data/events";
import { Counter } from "@/components/shared/counter";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

/** Figures derived from the club's own data (departments, scheduled events, learning areas and activities, founding team). */
export function StatsCards() {
  const opportunities = departments.reduce((n, d) => n + d.learningAreas.length + d.activities.length + d.projects.length, 0);
  const stats = [
    { icon: GraduationCap, value: 3, suffix: "", label: "Faculties united" },
    { icon: Layers, value: departments.length, suffix: "", label: "Specialized departments" },
    { icon: CalendarDays, value: upcomingEvents.length, suffix: "", label: "Upcoming activities" },
    { icon: BookOpen, value: opportunities, suffix: "+", label: "Learning opportunities" },
  ];
  return (
    <section className="section pb-0" aria-label="Club in numbers">
      <div className="container-x">
        <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border/80 bg-card p-6 card-hover">
                <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-brand-blue/10 blur-2xl transition-transform group-hover:scale-150" aria-hidden />
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><s.icon className="size-5" aria-hidden /></span>
                <p className="mt-5 font-display text-4xl font-medium tracking-tight sm:text-5xl"><Counter value={s.value} suffix={s.suffix} /></p>
                <p className="mt-1 font-medium">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
