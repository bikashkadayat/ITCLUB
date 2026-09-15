"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Circle, Milestone } from "lucide-react";
import type { TimelineItem } from "@/data/timeline";
import { cn } from "@/lib/utils";

function label(date: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  if (/^\d{4}-\d{2}$/.test(date)) return new Date(`${date}-01`).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  return date;
}

export function InteractiveTimeline({ items }: { items: TimelineItem[] }) {
  const [active, setActive] = useState(items.findIndex((i) => i.status === "current"));
  const reduce = useReducedMotion();
  const current = items[active] ?? items[0];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <ol className="relative lg:col-span-5" aria-label="Club establishment journey">
        <div className="absolute bottom-4 left-[15px] top-4 w-px bg-border" aria-hidden />
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <li key={item.id} className="relative">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "group flex w-full items-start gap-4 rounded-2xl py-3 pl-1 pr-3 text-left transition-colors",
                  isActive ? "bg-secondary/70" : "hover:bg-muted/60"
                )}
              >
                <span
                  className={cn(
                    "relative z-10 mt-0.5 flex size-[30px] shrink-0 items-center justify-center rounded-full border-2 bg-background transition-colors",
                    item.status === "done" && "border-primary text-primary",
                    item.status === "current" && "border-brand-coral text-brand-coral",
                    item.status === "upcoming" && "border-border text-muted-foreground",
                    isActive && "ring-4 ring-primary/15"
                  )}
                >
                  {item.status === "done" ? <Check className="size-3.5" aria-hidden /> : item.status === "current" ? <Milestone className="size-3.5" aria-hidden /> : <Circle className="size-2.5" aria-hidden />}
                  {item.status === "current" && <span className="absolute inset-0 rounded-full bg-brand-coral/30 animate-pulse-ring" aria-hidden />}
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label(item.date)}</span>
                  <span className={cn("mt-0.5 block font-medium leading-snug", isActive ? "text-foreground" : "text-foreground/80")}>{item.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.article
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="relative h-full overflow-hidden rounded-3xl border border-border/80 bg-card p-7 sm:p-9"
            aria-live="polite"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand-blue/10 blur-3xl" aria-hidden />
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
                current.status === "done" && "bg-secondary text-secondary-foreground",
                current.status === "current" && "bg-accent text-accent-foreground",
                current.status === "upcoming" && "bg-muted text-muted-foreground"
              )}
            >
              {current.status === "done" ? "Completed" : current.status === "current" ? "In progress" : "Upcoming"} · {current.label}
            </span>
            <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">{current.title}</h3>
            <p className="mt-4 leading-relaxed text-foreground/85">{current.description}</p>
            {current.details && (
              <ul className="mt-5 space-y-2">
                {current.details.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-coral" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              Step {active + 1} of {items.length}
            </p>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
