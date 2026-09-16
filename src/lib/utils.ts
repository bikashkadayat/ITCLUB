import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {}) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kathmandu",
    ...opts,
  }).format(d);
}

/** "16 – 20 November 2026" for multi-day events, or a single date. */
export function formatDateRange(startIso: string, endIso?: string) {
  if (!endIso || isSameDay(startIso, endIso)) return formatDate(startIso);
  const a = new Date(startIso), b = new Date(endIso);
  const sameMonth = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  if (sameMonth) return `${formatDate(startIso, { month: undefined, year: undefined, day: "numeric" })} – ${formatDate(endIso)}`;
  return `${formatDate(startIso)} – ${formatDate(endIso)}`;
}

export const isSameDay = (a: string, b: string) => formatDate(a) === formatDate(b);
/** Whole days covered by a start/end pair (1 for a single day). */
export const spanDays = (startIso: string, endIso?: string) => (endIso ? Math.round((new Date(endIso).getTime() - new Date(startIso).getTime()) / 86_400_000) + 1 : 1);
/** "7:00 am – 10:00 am" for a same-day end time, otherwise the start time. */
export function formatTimeSpan(startIso: string, endIso?: string) {
  return endIso && isSameDay(startIso, endIso) ? `${formatTime(startIso)} – ${formatTime(endIso)}` : formatTime(startIso);
}

export function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kathmandu",
  }).format(d);
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
