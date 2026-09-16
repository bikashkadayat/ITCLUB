/**
 * Automatic event status. Nothing is hardcoded: the status is derived from the
 * event's start/end dates and the current date, using Nepal calendar days
 * (Asia/Kathmandu) so an event is "ongoing" for the whole of its date(s).
 *
 *   before the start day → upcoming · on any event day → ongoing · after the end day → past
 */

export type EventStatus = "upcoming" | "ongoing" | "past";

const TZ = "Asia/Kathmandu";

/** YYYY-MM-DD of an instant in Nepal. */
export function kathmanduDay(input: Date | string): string {
  const d = typeof input === "string" ? new Date(input) : input;
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** ISO instant for the very end of the event's last day in Nepal (23:59:59 +05:45). */
export function eventEnd(e: { date: string; endDate?: string }): string {
  return `${kathmanduDay(e.endDate ?? e.date)}T23:59:59+05:45`;
}

export function getEventStatus(e: { date: string; endDate?: string }, now: Date | string = new Date()): EventStatus {
  const today = kathmanduDay(now);
  const start = kathmanduDay(e.date);
  const end = kathmanduDay(e.endDate ?? e.date);
  if (today < start) return "upcoming";
  if (today > end) return "past";
  return "ongoing";
}

export function groupEvents<T extends { date: string; endDate?: string }>(events: readonly T[], now: Date | string = new Date()) {
  const asc = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return {
    upcoming: asc.filter((e) => getEventStatus(e, now) === "upcoming"),
    ongoing: asc.filter((e) => getEventStatus(e, now) === "ongoing"),
    past: asc.filter((e) => getEventStatus(e, now) === "past").reverse(),
  };
}

/** The event to spotlight: what is live right now, otherwise the nearest upcoming one. */
export function nextEventOf<T extends { date: string; endDate?: string }>(events: readonly T[], now: Date | string = new Date()): T | undefined {
  const g = groupEvents(events, now);
  return g.ongoing[0] ?? g.upcoming[0];
}

export const STATUS_META: Record<EventStatus, { label: string; dot: string; badge: string; onDark: string }> = {
  upcoming: { label: "Upcoming", dot: "bg-brand-blue", badge: "bg-secondary text-secondary-foreground", onDark: "bg-white text-brand-blue-deep" },
  ongoing: { label: "Live Now", dot: "bg-emerald-500", badge: "bg-emerald-600/15 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-200", onDark: "bg-emerald-400 text-emerald-950" },
  past: { label: "Past Event", dot: "bg-zinc-400", badge: "bg-muted text-muted-foreground", onDark: "bg-white/20 text-white/80" },
};
