"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Wrench, Rocket, Flag } from "lucide-react";
import { departments } from "@/data/departments";
import { DepartmentIcon } from "@/components/shared/department-icon";
import { cn } from "@/lib/utils";

export function DepartmentExplorer() {
  const [index, setIndex] = useState(0);
  const d = departments[index];
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="no-scrollbar flex gap-2 overflow-x-auto lg:col-span-4 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Departments">
        {departments.map((dep, i) => (
          <button
            key={dep.slug}
            role="tab"
            aria-selected={i === index}
            aria-controls={`dept-panel-${dep.slug}`}
            id={`dept-tab-${dep.slug}`}
            onClick={() => setIndex(i)}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all lg:w-full",
              i === index ? "border-primary/40 bg-secondary text-secondary-foreground shadow-sm" : "border-border/80 bg-card text-foreground/80 hover:bg-muted"
            )}
          >
            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white", dep.color)}>
              <DepartmentIcon icon={dep.icon} className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{dep.name}</span>
              <span className="hidden truncate text-xs text-muted-foreground lg:block">{dep.tagline}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={d.slug}
            id={`dept-panel-${d.slug}`}
            role="tabpanel"
            aria-labelledby={`dept-tab-${d.slug}`}
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-7 sm:p-9"
          >
            <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", d.color)} aria-hidden />
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Department {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">{d.name}</h3>
                <p className="mt-1 text-muted-foreground">{d.tagline}</p>
              </div>
              <Link href={`/departments/${d.slug}`} className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Full page <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <p className="mt-5 leading-relaxed text-foreground/85">{d.overview}</p>

            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Block icon={BookOpen} title="Learning areas" items={d.learningAreas} />
              <Block icon={Calendar} title="Planned activities" items={d.activities} />
              <Block icon={Wrench} title="Skills you build" items={d.skills} />
              <Block icon={Flag} title="Future goals" items={d.futureGoals} />
            </div>

            <div className="mt-7">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Rocket className="size-4 text-primary" aria-hidden /> Projects
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {d.projects.map((p) => (
                  <li key={p.title} className="rounded-2xl border border-border/80 bg-background p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{p.title}</p>
                      <span className={cn("rounded-full px-2 py-0.5 text-xs lg:text-[10px] font-semibold uppercase tracking-wider", p.status === "In development" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground")}>
                        {p.status}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Block({ icon: Icon, title, items }: { icon: React.ComponentType<{ className?: string }>; title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="size-4 text-primary" /> {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-sm text-foreground/85">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-coral" aria-hidden />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
