"use client";

import Link from "next/link";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { EventCover } from "./event-cover";
import { EmptyState } from "@/components/shared/empty-state";
import { events as staticEvents, type ClubEvent } from "@/data/events";
import { departments } from "@/data/departments";
import { groupEvents, getEventStatus, STATUS_META, type EventStatus } from "@/lib/event-status";
import { useNow } from "@/lib/use-now";
import { formatDateRange, formatTimeSpan, spanDays, cn } from "@/lib/utils";

/**
 * Events grouped automatically by the visitor's clock:
 * Upcoming (soonest first) · Current (live now) · Past (most recent first).
 */
export function EventsBrowser({ events = staticEvents, buildNow }: { events?: ClubEvent[]; buildNow: string }) {
  const now = useNow(buildNow);
  const groups = groupEvents(events, now);
  const sections: { key: EventStatus; title: string; blurb: string; items: ClubEvent[] }[] = [
    { key: "upcoming", title: "Upcoming Events", blurb: "Nearest first.", items: groups.upcoming },
    { key: "ongoing", title: "Current Events", blurb: "Happening today.", items: groups.ongoing },
    { key: "past", title: "Past Events", blurb: "Most recent first.", items: groups.past },
  ];

  if (events.length === 0) {
    return <EmptyState className="mt-8" title="No events published yet." description="The Executive Committee is finalising the first cycle of workshops, hackathons and talks. Members are notified the moment an event goes live." action={{ label: "Become a Member to hear first", href: "/membership" }} />;
  }

  return (
    <div className="space-y-16">
      {sections.filter((s) => s.items.length > 0 || s.key === "upcoming").map((s) => (
        <section key={s.key} aria-labelledby={`events-${s.key}`} data-group={s.key}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 id={`events-${s.key}`} className="inline-flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
              <span className={cn("size-2.5 rounded-full", STATUS_META[s.key].dot)} aria-hidden /> {s.title}
            </h3>
            <span className="text-sm text-muted-foreground">{s.items.length} · {s.blurb}</span>
          </div>
          {s.items.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-border bg-card/60 px-5 py-6 text-sm text-muted-foreground">No upcoming events yet. New activities are announced after each planning discussion.</p>
          ) : (
            <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {s.items.map((e) => (
                <li key={e.slug} id={e.slug} className="scroll-mt-28">
                  <EventCard event={e} status={getEventStatus(e, now)} />
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

export function EventCard({ event: e, status }: { event: ClubEvent; status: EventStatus }) {
  const dept = departments.find((d) => d.slug === e.department);
  const meta = STATUS_META[status];
  const past = status === "past";
  const live = status === "ongoing";
  return (
    <article
      data-status={status}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border bg-card p-6 transition-all",
        past ? "border-border/60 opacity-75 saturate-50 hover:opacity-100 hover:saturate-100" : "border-border/80 card-hover",
        live && "border-emerald-500/50 shadow-[0_20px_60px_-30px_rgba(16,185,129,0.6)] ring-1 ring-emerald-500/30"
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r", live ? "from-emerald-500 to-emerald-300" : past ? "from-zinc-300 to-zinc-200" : dept?.color ?? "from-brand-blue to-brand-coral")} aria-hidden />
      <div className={cn("relative -mx-6 -mt-6 mb-5 aspect-[16/9] overflow-hidden bg-gradient-to-br from-secondary via-background to-accent/50", past && "opacity-70 grayscale-[0.55]")}>
        <EventCover event={e} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider lg:text-[11px]", meta.badge)}>
          <span className="relative flex size-1.5">
            {live && <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-60", meta.dot)} />}
            <span className={cn("relative inline-flex size-1.5 rounded-full", meta.dot)} />
          </span>
          {meta.label}
        </span>
        <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium lg:text-[11px]">{e.type}</span>
        {(dept || e.host) && <span className="ml-auto text-xs text-muted-foreground lg:text-[11px]">{dept?.shortName ?? e.host}</span>}
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug"><Link href={`/events/${e.slug}`} className="hover:text-primary">{e.title}</Link></h3>
      <dl className="mt-4 space-y-2 text-sm text-foreground/80">
        <div className="flex items-center gap-2.5">
          <CalendarDays className="size-4 text-primary" aria-hidden />
          <dt className="sr-only">Date</dt>
          <dd>{formatDateRange(e.date, e.endDate)}</dd>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock className="size-4 text-primary" aria-hidden />
          <dt className="sr-only">Time</dt>
          <dd>{spanDays(e.date, e.endDate) > 1 ? `${spanDays(e.date, e.endDate)} days · ${formatTimeSpan(e.date, e.endDate)}` : e.duration ? `${formatTimeSpan(e.date, e.endDate)} · ${e.duration}` : formatTimeSpan(e.date, e.endDate)}</dd>
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin className="size-4 text-primary" aria-hidden />
          <dt className="sr-only">Venue</dt>
          <dd>{e.venue}</dd>
        </div>
      </dl>
      <Link href={`/events/${e.slug}`} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary">
        {past ? "Recap" : e.registrationOpen ? "Register" : "Details"} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </article>
  );
}
