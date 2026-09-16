"use client";

import type { ClubEvent } from "@/data/events";
import { nextEventOf, getEventStatus, eventEnd } from "@/lib/event-status";
import { useNow } from "@/lib/use-now";
import { Countdown } from "@/components/shared/countdown";
import { formatDateRange, formatTimeSpan } from "@/lib/utils";
import { EventCover } from "./event-cover";

/** Events-page hero card: the live event if one is on, otherwise the nearest upcoming one. */
export function NextUp({ events, buildNow }: { events: ClubEvent[]; buildNow: string }) {
  const now = useNow(buildNow);
  const e = nextEventOf(events, now);
  if (!e) return null;
  const live = getEventStatus(e, now) === "ongoing";
  return (
    <div className="grid overflow-hidden rounded-3xl border border-border/80 bg-card/80 backdrop-blur sm:grid-cols-[1fr_minmax(0,22rem)]">
      <div className="p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{live ? "Happening now" : "Next up"}</p>
        <p className="mt-2 text-xl font-semibold">{e.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatDateRange(e.date, e.endDate)} · {formatTimeSpan(e.date, e.endDate)} · {e.venue}
        </p>
        <Countdown target={e.date} end={eventEnd(e)} className="mt-5" />
      </div>
      <div className="group relative hidden min-h-[12rem] sm:block">
        <EventCover event={e} sizes="352px" />
      </div>
    </div>
  );
}
