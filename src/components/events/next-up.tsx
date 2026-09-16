"use client";

import type { ClubEvent } from "@/data/events";
import { nextEventOf, getEventStatus, eventEnd } from "@/lib/event-status";
import { useNow } from "@/lib/use-now";
import { Countdown } from "@/components/shared/countdown";
import { formatDateRange, formatTimeSpan } from "@/lib/utils";

/** Events-page hero card: the live event if one is on, otherwise the nearest upcoming one. */
export function NextUp({ events, buildNow }: { events: ClubEvent[]; buildNow: string }) {
  const now = useNow(buildNow);
  const e = nextEventOf(events, now);
  if (!e) return null;
  const live = getEventStatus(e, now) === "ongoing";
  return (
    <div className="rounded-3xl border border-border/80 bg-card/80 p-5 backdrop-blur sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{live ? "Happening now" : "Next up"}</p>
      <p className="mt-2 text-lg font-semibold">{e.title}</p>
      <p className="text-sm text-muted-foreground">
        {formatDateRange(e.date, e.endDate)} · {formatTimeSpan(e.date, e.endDate)} · {e.venue}
      </p>
      <Countdown target={e.date} end={eventEnd(e)} className="mt-4" />
    </div>
  );
}
