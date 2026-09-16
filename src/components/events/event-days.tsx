import { cn } from "@/lib/utils";
import type { ClubEvent } from "@/data/events";

type Day = NonNullable<ClubEvent["days"]>[number];

function label(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Asia/Kathmandu" }).format(new Date(`${date}T12:00:00+05:45`));
}

/** Five-day programme. Compact: a horizontal strip of days. Detailed: each day with its activities. */
export function EventDays({ days, detailed = false, light = false, className }: { days: Day[]; detailed?: boolean; light?: boolean; className?: string }) {
  if (detailed) {
    return (
      <ol className={cn("relative space-y-4", className)}>
        <div className="absolute bottom-6 left-[19px] top-6 w-px bg-border" aria-hidden />
        {days.map((d) => (
          <li key={d.day} className="relative flex gap-5">
            <span className={cn("relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold text-white shadow-md", d.showcase ? "bg-brand-coral" : "bg-gradient-to-br from-brand-blue to-brand-coral")}>{d.day}</span>
            <div className={cn("flex-1 rounded-2xl border p-5", d.showcase ? "border-brand-coral/40 bg-accent/40" : "border-border/80 bg-card")}>
              <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", d.showcase ? "text-brand-red-deep dark:text-brand-coral-light" : "text-muted-foreground")}>{d.showcase ? "Showcase day" : `Day ${d.day}`} · {label(d.date)}{d.time ? ` · ${d.time}` : ""}</p>
              <h3 className="mt-1 text-lg font-semibold">{d.theme}</h3>
              <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
                {d.activities.map((a) => (<li key={a} className={cn("rounded-full px-2.5 py-1 text-xs", d.showcase ? "bg-card" : "bg-muted")}>{a}</li>))}
              </ul>
              {d.activity && <p className="mt-3 text-sm text-foreground/85"><strong>Activity:</strong> {d.activity}</p>}
            </div>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className={cn("grid grid-cols-1 gap-2 sm:grid-cols-5", className)} aria-label="Five-day programme">
      {days.map((d, i) => (
        <li key={d.day} className={cn("relative flex items-center gap-3 rounded-2xl border px-3.5 py-3 backdrop-blur sm:flex-col sm:items-start sm:gap-2", d.showcase ? (light ? "border-brand-coral/50 bg-accent/60" : "border-brand-coral/60 bg-brand-coral/25") : light ? "border-border/80 bg-background" : "border-white/15 bg-white/10")}>
          {i < days.length - 1 && <span className={cn("absolute -right-2 top-1/2 hidden h-px w-2 sm:block", light ? "bg-border" : "bg-white/30")} aria-hidden />}
          <span className={cn("inline-flex items-center gap-1.5 font-mono text-xs font-semibold", light ? "text-brand-red-deep" : "text-brand-coral-light")}>{d.showcase ? "Showcase" : `Day ${d.day}`}</span>
          <span className="min-w-0">
            <span className={cn("block text-sm font-medium leading-snug", light ? "text-foreground" : "text-white")}>{d.theme}</span>
            <span className={cn("block text-[11px]", light ? "text-muted-foreground" : "text-white/60")}>{label(d.date)}{d.time ? ` · ${d.time}` : ""}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
