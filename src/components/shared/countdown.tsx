"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function diff(target: number) {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
    done: total === 0,
  };
}

export function Countdown({ target, className, compact = false }: { target: string; className?: string; compact?: boolean }) {
  const ts = new Date(target).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(ts));
    const id = setInterval(() => setT(diff(ts)), 1000);
    return () => clearInterval(id);
  }, [ts]);

  const cells = [
    { label: "Days", value: t?.days },
    { label: "Hours", value: t?.hours },
    { label: "Min", value: t?.minutes },
    { label: "Sec", value: t?.seconds },
  ];

  if (t?.done) {
    return <p className={cn("text-sm font-medium text-primary", className)}>Happening now</p>;
  }

  return (
    <div className={cn("flex items-stretch gap-2 sm:gap-3", className)} role="timer" aria-live="off" aria-label="Countdown to the next event">
      {cells.map((c) => (
        <div
          key={c.label}
          className={cn(
            "flex min-w-[3.6rem] flex-col items-center justify-center rounded-xl border border-border/80 bg-card/80 px-2 py-2 text-center shadow-sm backdrop-blur",
            compact ? "min-w-[3rem] py-1.5" : "sm:min-w-[4.5rem] sm:py-3"
          )}
        >
          <span className={cn("font-mono tabular-nums font-semibold leading-none text-foreground", compact ? "text-lg" : "text-2xl sm:text-3xl")}>
            {t ? String(c.value).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
