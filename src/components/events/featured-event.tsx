import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Clock } from "lucide-react";
import { committeeWithPhotos } from "@/lib/team-photos";
import { AvatarInitials } from "@/components/shared/avatar-initials";
import { cn, formatDateRange, formatTimeSpan, spanDays } from "@/lib/utils";
import type { ClubEvent } from "@/data/events";
import { Countdown } from "@/components/shared/countdown";
import { StatusBadge } from "./status-badge";
import { Photo } from "@/components/shared/photo";
import { eventEnd } from "@/lib/event-status";
import { Reveal } from "@/components/shared/reveal";
import { EventDays } from "./event-days";

/**
 * When a featured event has no fitting photograph, its visual column shows the
 * real programme as a typographic timeline instead of a drawn illustration.
 */
function ProgrammePanel({ event: e, light }: { event: ClubEvent; light: boolean }) {
  const items = (e.schedule ?? []).slice(0, 6);
  const headline = e.duration === "24 hours" ? "24h" : e.duration ?? formatTimeSpan(e.date, e.endDate);
  return (
    <div className={cn("w-full rounded-[1.5rem] p-6 sm:p-8", light ? "border border-border/80 bg-background" : "border border-white/15 bg-white/[0.07] backdrop-blur")}>
      <p className={cn("font-display font-semibold leading-none tracking-tight", headline.length <= 4 ? "text-7xl sm:text-8xl" : "text-5xl", light ? "gradient-text" : "text-white")}>{headline}</p>
      <p className={cn("mt-3 text-xs font-semibold uppercase tracking-[0.22em]", light ? "text-muted-foreground" : "text-white/60")}>On the day</p>
      <ol className="relative mt-4 space-y-3">
        <span className={cn("absolute bottom-2 left-[5px] top-2 w-px", light ? "bg-border" : "bg-white/20")} aria-hidden />
        {items.map((it) => (
          <li key={it.time} className="relative flex items-baseline gap-4 pl-6">
            <span className={cn("absolute left-0 top-1.5 size-[11px] rounded-full border-2", light ? "border-primary bg-background" : "border-brand-coral-light bg-brand-navy")} aria-hidden />
            <span className={cn("w-[4.5rem] shrink-0 font-mono text-xs", light ? "text-primary" : "text-brand-coral-light")}>{it.time}</span>
            <span className={cn("text-sm leading-snug", light ? "text-foreground/85" : "text-white/85")}>{it.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FeaturedEvent({ event: e, variant = "dark", buildNow }: { event: ClubEvent; variant?: "dark" | "light"; buildNow: string }) {
  const light = variant === "light";
  const committee = committeeWithPhotos();
  const facilitators = (e.facilitators ?? []).map((f) => ({ ...f, member: committee.find((m) => m.id === f.memberId) })).filter((f) => f.member);
  return (
    <section className="section pb-0" aria-labelledby={`featured-${e.slug}`}>
      <div className="container-x">
        <Reveal>
          <article className={cn("relative overflow-hidden rounded-[2rem] border shadow-[0_40px_120px_-40px_var(--glow-blue)]", light ? "border-border/80 bg-card text-foreground" : "border-brand-blue/30 bg-gradient-to-br from-brand-navy via-brand-blue-deep to-brand-blue text-white")}>
            <div className={cn("pointer-events-none absolute inset-0 bg-grid", light ? "opacity-60 mask-fade-b" : "opacity-10")} aria-hidden />
            <div className="relative grid grid-cols-1 gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <p className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur", light ? "border border-border bg-background text-foreground/80" : "border border-white/20 bg-white/10 text-white/90")}>
                    Featured · {e.type}
                  </p>
                  <StatusBadge date={e.date} endDate={e.endDate} buildNow={buildNow} onDark={!light} />
                </div>
                <h2 id={`featured-${e.slug}`} className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">{e.title}</h2>
                {e.tagline && <p className={cn("mt-4 text-lg font-medium sm:text-xl", light ? "text-primary" : "text-brand-coral-light")}>{e.tagline}</p>}
                {e.motto && <p className={cn("mt-1 text-sm italic", light ? "text-muted-foreground" : "text-white/70")}>{e.motto}</p>}
                <p className={cn("mt-4 max-w-xl text-pretty", light ? "text-muted-foreground" : "text-white/80")}>{e.summary.replace(/^Build • Learn • Showcase\. /, "")}</p>
                <dl className={cn("mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm", light ? "text-foreground/80" : "text-white/85")}>
                  <div className="inline-flex items-center gap-2"><CalendarDays className="size-4" aria-hidden /><dt className="sr-only">Dates</dt><dd>{formatDateRange(e.date, e.endDate)} · {spanDays(e.date, e.endDate) > 1 ? `from ${formatTimeSpan(e.date)}` : formatTimeSpan(e.date, e.endDate)}</dd></div>
                  <div className="inline-flex items-center gap-2"><MapPin className="size-4" aria-hidden /><dt className="sr-only">Venue</dt><dd>{e.venue}</dd></div>
                  {e.duration && <div className="inline-flex items-center gap-2"><Clock className="size-4" aria-hidden /><dt className="sr-only">Duration</dt><dd>{e.duration}</dd></div>}
                </dl>
                {facilitators.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-3" aria-label="Facilitators">
                    {facilitators.map((f) => (
                      <li key={f.memberId} className={cn("flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4", light ? "border border-border/80 bg-background" : "border border-white/15 bg-white/10")}>
                        <AvatarInitials name={f.member!.name} photo={f.member!.photo} size={40} className="size-10 rounded-full text-sm" />
                        <span className="min-w-0 text-left">
                          <span className="block text-sm font-semibold leading-tight">{f.member!.name}</span>
                          <span className={cn("block text-[11px]", light ? "text-muted-foreground" : "text-white/65")}>{f.label} · {f.member!.shortPosition}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className={cn("mt-6 text-xs font-semibold uppercase tracking-[0.22em]", light ? "text-muted-foreground" : "text-white/60")}>Starts in</p>
                <Countdown target={e.date} end={eventEnd(e)} className={cn("mt-3", !light && "[&>div]:border-white/15 [&>div]:bg-white/10 [&_span]:text-white [&_span:last-child]:text-white/60")} />
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={`/events/${e.slug}`} className={cn("inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors", light ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white text-brand-blue hover:bg-white/90")}>
                    {e.days ? "See the full programme" : "Event details"} <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <Link href="/membership" className={cn("inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors", light ? "border-border bg-background hover:bg-muted" : "border-white/30 text-white hover:bg-white/10")}>
                    Become a Member to take part
                  </Link>
                </div>
              </div>
              <div className="flex items-center lg:col-span-5">
                {e.photo ? (
                  <div className={cn("group relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] shadow-2xl ring-1", light ? "ring-border/70" : "ring-white/15")}>
                    <Photo name={e.photo} className="absolute inset-0" fade={false} sizes="(min-width: 1024px) 40vw, 100vw" />
                  </div>
                ) : (
                  <ProgrammePanel event={e} light={light} />
                )}
              </div>
            </div>
            {e.days && (
              <div className={cn("relative border-t px-7 py-6 sm:px-10 lg:px-14", light ? "border-border/70" : "border-white/10")}>
                <EventDays days={e.days} light={light} />
              </div>
            )}
            {!e.days && e.topics && (
              <ul className={cn("relative grid grid-cols-1 gap-2 border-t px-7 py-6 sm:px-10 lg:px-14", e.topics.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-5", light ? "border-border/70" : "border-white/10")} aria-label={e.topicsLabel ?? "Topics covered"}>
                {e.topics.map((t, i) => (
                  <li key={t.title} className={cn("flex items-baseline gap-3 rounded-2xl px-4 py-3", light ? "border border-border/80 bg-background" : "border border-white/15 bg-white/10")}>
                    <span className={cn("font-mono text-xs", light ? "text-primary" : "text-brand-coral-light")}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-medium leading-snug">{t.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
