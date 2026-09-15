import { Users, Layers, CalendarDays, BookOpen, GraduationCap } from "lucide-react";
import { departments } from "@/data/departments";
import { events } from "@/data/events";
import { committee } from "@/data/committee";
import { publishedRegistry } from "@/lib/registry";
import { Counter } from "@/components/shared/counter";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

/** Figures derived from the club's own data (departments, planned events, learning areas and activities, founding team). */
export function StatsCards({ members = publishedRegistry.members.filter((m) => m.status === "ACTIVE").length }: { members?: number }) {
  const opportunities = departments.reduce((n, d) => n + d.learningAreas.length + d.activities.length + d.projects.length, 0);
  const showMembers = (members ?? 0) >= 25;
  const stats = [
    showMembers
      ? { icon: Users, value: members!, suffix: "+", label: "Active members", hint: "Students building together across three faculties" }
      : { icon: GraduationCap, value: 3, suffix: "", label: "Faculties united", hint: `Computer science, management and law · ${committee.length} founding leaders` },
    { icon: Layers, value: departments.length, suffix: "", label: "Specialized departments", hint: "AI, software, security, problem solving, media, events" },
    { icon: CalendarDays, value: events.length, suffix: "+", label: "Planned activities", hint: "Workshops, hackathons, CTFs, seminars and talks" },
    { icon: BookOpen, value: opportunities, suffix: "+", label: "Learning opportunities", hint: "Learning tracks, activities and projects" },
  ];
  return (
    <section className="section pb-0 pt-20 sm:pt-24 lg:pt-28" aria-label="Club in numbers">
      <div className="container-x">
        <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border/80 bg-card p-6 card-hover">
                <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-brand-blue/10 blur-2xl transition-transform group-hover:scale-150" aria-hidden />
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><s.icon className="size-5" aria-hidden /></span>
                <p className="mt-5 font-display text-4xl font-medium tracking-tight sm:text-5xl"><Counter value={s.value} suffix={s.suffix} /></p>
                <p className="mt-1 font-medium">{s.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
