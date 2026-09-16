"use client";

import { getEventStatus, STATUS_META } from "@/lib/event-status";
import { useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";

/** 🔵 Upcoming · 🟢 Live Now · ⚫ Past Event — computed from the visitor's clock. */
export function StatusBadge({ date, endDate, buildNow, onDark = false, className }: { date: string; endDate?: string; buildNow: string; onDark?: boolean; className?: string }) {
  const now = useNow(buildNow);
  const status = getEventStatus({ date, endDate }, now);
  const meta = STATUS_META[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]", onDark ? meta.onDark : meta.badge, className)} data-status={status}>
      <span className="relative flex size-2">
        {status === "ongoing" && <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-60", meta.dot)} />}
        <span className={cn("relative inline-flex size-2 rounded-full", meta.dot)} />
      </span>
      {meta.label}
    </span>
  );
}

/** Renders children only while the event is not over (hides past featured cards). */
export function UnlessPast({ date, endDate, buildNow, children }: { date: string; endDate?: string; buildNow: string; children: React.ReactNode }) {
  const now = useNow(buildNow);
  if (getEventStatus({ date, endDate }, now) === "past") return null;
  return <>{children}</>;
}
