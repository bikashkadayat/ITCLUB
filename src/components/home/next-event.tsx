import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { nextEvent, plannedEvents } from "@/data/events";
import { Countdown } from "@/components/shared/countdown";
import { Reveal } from "@/components/shared/reveal";
import { formatDate, formatTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function NextEvent() {
  const e = nextEvent;
  return (
    <section className="section bg-muted/40" aria-labelledby="next-event-heading">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-brand-navy via-brand-blue-deep to-brand-blue p-8 text-white sm:p-10">
              <div className="absolute -right-20 -top-20 size-72 rounded-full bg-brand-coral/30 blur-3xl" aria-hidden />
              <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
              <div className="relative">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  <CalendarDays className="size-4" aria-hidden /> Next event
                </p>
                {e ? (
                  <>
                    <h2 id="next-event-heading" className="mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
                      {e.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-white/80">{e.summary}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
                      {e.date && (
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="size-4" aria-hidden />
                          {formatDate(e.date)} · {formatTime(e.date)}
                          {e.tentative && <Badge className="bg-white/15 text-white">Tentative</Badge>}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="size-4" aria-hidden /> {e.venue}
                      </span>
                    </div>
                    {e.date && <Countdown target={e.date} className="mt-8 [&>div]:border-white/15 [&>div]:bg-white/10 [&>div]:text-white [&_span]:text-white [&_span:last-child]:text-white/60" />}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link href={`/events/${e.slug}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-brand-blue transition-colors hover:bg-white/90">
                        See details <ArrowRight className="size-4" aria-hidden />
                      </Link>
                      <Link href="/events" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                        Upcoming Events
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 id="next-event-heading" className="mt-4 text-3xl font-semibold">
                      No events published yet.
                    </h2>
                    <p className="mt-3 max-w-xl text-white/80">The Executive Committee is finalising dates for the first cycle. Members hear first by email.</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link href="/events" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-brand-blue transition-colors hover:bg-white/90">
                        See planned activities <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Planned this year</p>
            <ul className="mt-4 divide-y divide-border/70 rounded-3xl border border-border/80 bg-card">
              {plannedEvents.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link href={`/events#${p.slug}`} className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted/60">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{p.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.type} · {p.schedule}
                      </p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
