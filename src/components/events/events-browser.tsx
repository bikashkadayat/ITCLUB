"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { events as staticEvents, type ClubEvent } from "@/data/events";
import { departments } from "@/data/departments";
import { formatDate, formatTime, cn } from "@/lib/utils";

type Filter = "all" | "upcoming" | "past";

const statusStyles: Record<ClubEvent["status"], string> = {
  upcoming: "bg-secondary text-secondary-foreground",
  past: "bg-accent text-accent-foreground",
};

export function EventsBrowser({ events = staticEvents }: { events?: ClubEvent[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(() => {
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
    if (filter === "upcoming") return sorted.filter((e) => e.status === "upcoming");
    if (filter === "past") return sorted.filter((e) => e.status === "past").reverse();
    return sorted;
  }, [filter, events]);

  const chips: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Past", value: "past" },
  ];

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter events">
        {chips.map((c) => (
          <button
            key={c.value}
            role="tab"
            aria-selected={filter === c.value}
            onClick={() => setFilter(c.value)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === c.value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/75 hover:bg-muted"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState
          className="mt-8"
          icon={CalendarDays}
          title={events.length === 0 ? "No events published yet." : filter === "past" ? "No past events yet." : "Nothing in this category yet."}
          description={
            events.length === 0
              ? "The Executive Committee is finalising the first cycle of workshops, hackathons and talks. Members are notified the moment an event goes live."
              : filter === "past"
                ? "The club was founded on 13 September 2026, so the first activities are still ahead of us."
                : "Try another filter, or check back after the roadmap discussion."
          }
          action={events.length === 0 ? { label: "Become a Member to hear first", href: "/membership" } : undefined}
        />
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4" aria-live="polite">
          {list.map((e) => (
            <li key={e.slug} id={e.slug} className="scroll-mt-28">
              <EventCard event={e} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function EventCard({ event: e }: { event: ClubEvent }) {
  const dept = departments.find((d) => d.slug === e.department);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-6 card-hover">
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", dept?.color ?? "from-brand-blue to-brand-coral")} aria-hidden />
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn("rounded-full px-2.5 py-1 text-xs lg:text-[11px] font-semibold uppercase tracking-wider", statusStyles[e.status])}>{e.status}</span>
        <span className="rounded-full border border-border px-2.5 py-1 text-xs lg:text-[11px] font-medium">{e.type}</span>
        {(dept || e.host) && <span className="ml-auto text-xs lg:text-[11px] text-muted-foreground">{dept?.shortName ?? e.host}</span>}
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-snug"><Link href={`/events/${e.slug}`} className="hover:text-primary">{e.title}</Link></h3>
      <dl className="mt-5 space-y-2 text-sm text-foreground/80">
        <div className="flex items-center gap-2.5">
          <CalendarDays className="size-4 text-primary" aria-hidden />
          <dt className="sr-only">Date</dt>
          <dd>{formatDate(e.date)}</dd>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock className="size-4 text-primary" aria-hidden />
          <dt className="sr-only">Time</dt>
          <dd>{formatTime(e.date)}</dd>
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin className="size-4 text-primary" aria-hidden />
          <dt className="sr-only">Venue</dt>
          <dd>{e.venue}</dd>
        </div>
      </dl>
      <Link href={`/events/${e.slug}`} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary">
        {e.registrationOpen ? "Register" : "Details"} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </article>
  );
}
