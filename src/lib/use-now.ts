"use client";

import { useEffect, useState } from "react";

/**
 * The current time in the browser, refreshed every minute. Returns the
 * build-time instant until mounted so the first client render matches the
 * server HTML (no hydration mismatch); then switches to the visitor's clock.
 */
export function useNow(initialIso: string, intervalMs = 60_000): Date {
  const [now, setNow] = useState<Date>(() => new Date(initialIso));
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
