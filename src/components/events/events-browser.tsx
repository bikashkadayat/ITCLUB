"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { events as staticEvents, eventTypeGroups, type ClubEvent } from "@/data/events";
import { departments } from "@/data/departments";
import { Countdown } from "@/components/shared/countdown";
import { formatDate, formatTime, cn } from "@/lib/utils";

type Filter = "all" | "upcoming" | "past" | string;

const statusStyles: Record<ClubEvent["status"], string> = {
  upcoming: "bg-secondary text-secondary-foreground",
  planned: "bg-muted text-muted-foreground",
  past: "bg-accent text-accent-foreground",
};

export function EventsBrowser({ events = staticEvents }: { events?: ClubEvent[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(() => {
    if (filter === "all") return events;
    if (filter === "upcoming") return events.filter((e) => e.status !== "past");
    if (filter === "past") return events.filter((e) => e.status === "past");
    const g = eventTypeGroups.find((x) => x.label === filter);
    return g ? events.filter((e) => g.types.includes(e.type)) : events;
  }, [filter, events]);

  const chips: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Upcoming & planned", value: "upcoming" },
    { label: "Past", value: "past" },
    ...eventTypeGroups.map((g) => ({ label: g.label, value: g.label })),
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
                : "Try another filter, or check back after the next departmental cycle."
          }
          action={events.length === 0 ? { label: "Become a Member to hear first", href: "/membership" } : undefined}
        />
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2" aria-live="polite">
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
        <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider", statusStyles[e.status])}>{e.status}</span>
        <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium">{e.type}</span>
        {e.tentative && <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground">Tentative date</span>}
        {dept && <span className="ml-auto text-[11px] text-muted-foreground">{dept.shortName}</span>}
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-snug"><Link href={`/events/${e.slug}`} className="hover:text-primary">{e.title}</Link></h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.summary}</p>
      <dl className="mt-4 space-y-1.5 text-sm text-foreground/80">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-primary" aria-hidden />
          <dt className="sr-only">Date</dt>
          <dd>{e.date ? `${formatDate(e.date)} · ${formatTime(e.date)}` : e.schedule ?? "Date to be announced"}</dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-primary" aria-hidden />
          <dt className="sr-only">Venue</dt>
          <dd>{e.venue}</dd>
        </div>
      </dl>
      {e.highlights && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {e.highlights.map((h) => (
            <li key={h} className="rounded-full bg-muted px-2.5 py-1 text-[11px]">
              {h}
            </li>
          ))}
        </ul>
      )}
      {e.status === "upcoming" && e.date && (
        <div className="mt-5">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Clock className="size-3.5" aria-hidden /> Starts in
          </p>
          <Countdown target={e.date} compact />
        </div>
      )}
      <details className="mt-4 group/details">
        <summary className="cursor-pointer list-none text-sm font-semibold text-primary">
          <span className="group-open/details:hidden">Read more</span>
          <span className="hidden group-open/details:inline">Show less</span>
        </summary>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{e.description}</p>
      </details>
      {e.registrationOpen && (
        <Link href={`/events/${e.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Register <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </article>
  );
}
