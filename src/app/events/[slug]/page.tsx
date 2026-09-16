import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, ArrowLeft } from "lucide-react";
import { events, getEvent } from "@/data/events";
import { departments } from "@/data/departments";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Countdown } from "@/components/shared/countdown";
import { EventActions } from "@/components/events/event-actions";
import { formatDateRange, formatTimeSpan } from "@/lib/utils";
import { EventDays } from "@/components/events/event-days";
import { StatusBadge } from "@/components/events/status-badge";
import { eventEnd } from "@/lib/event-status";
import { EventCover } from "@/components/events/event-cover";
import { committeeWithPhotos } from "@/lib/team-photos";
import { AvatarInitials } from "@/components/shared/avatar-initials";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  return pageMetadata({ title: e.title, description: e.summary, path: `/events/${slug}`, type: "article", image: e.image });
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();
  const dept = departments.find((d) => d.slug === e.department);
  const committee = committeeWithPhotos();
  const facilitators = (e.facilitators ?? []).map((f) => ({ ...f, member: committee.find((m) => m.id === f.memberId) })).filter((f) => f.member);
  const startsAt = new Date(e.date);
  const buildNow = new Date().toISOString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.summary,
    startDate: e.date,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: e.venue, address: "New Baneshwor, Kathmandu, Nepal" },
    organizer: { "@type": "Organization", name: "Tech & AI Innovation Club" },
  };
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="relative overflow-hidden border-b border-border/70">
        <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-40" aria-hidden />
        <div className="container-x relative pb-12 pt-32 sm:pt-40">
          <Breadcrumbs items={[{ label: "Events", href: "/events" }, { label: e.title }]} className="mb-6" />
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge date={e.date} endDate={e.endDate} buildNow={buildNow} />
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{e.type}</span>
            {(dept || e.host) && <span className="rounded-full border border-border px-3 py-1 text-xs">{dept?.name ?? e.host}</span>}
            {e.registrationOpen && <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">Registration open</span>}
          </div>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">{e.title}</h1>
          {e.tagline && <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{e.tagline}</p>}
          {e.motto && <p className="mt-2 text-sm italic text-muted-foreground">{e.motto}</p>}
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{e.summary}</p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" /><dd>{formatDateRange(e.date, e.endDate)} · {formatTimeSpan(e.date, e.endDate)}{e.duration ? ` · ${e.duration}` : ""}</dd></div>
            <div className="flex items-center gap-2"><MapPin className="size-4 text-primary" /><dd>{e.venue}</dd></div>
          </dl>
          <Countdown target={startsAt.toISOString()} end={eventEnd(e)} className="mt-6" />
          <div className="mt-8">
            <EventActions title={e.title} open={e.registrationOpen} />
          </div>
        </div>
      </header>
      <div className="container-x grid grid-cols-1 gap-12 py-14 lg:grid-cols-12">
        <div className="prose-club lg:col-span-8">
          {e.photo && (
            <div className="not-prose group relative mb-8 aspect-[16/7] w-full overflow-hidden rounded-3xl border border-border/80">
              <EventCover event={e} sizes="(min-width: 1024px) 60vw, 100vw" />
            </div>
          )}
          {e.description.split(/\n\s*\n/).map((p, i) => (<p key={i} className="text-[17px]">{p}</p>))}
          {e.categories && (
            <>
              <h2>What you can build</h2>
              <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                {e.categories.map((c) => (<li key={c} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium">{c}</li>))}
              </ul>
            </>
          )}
          {e.days && (
            <>
              <h2>Programme</h2>
              <div className="not-prose mt-4"><EventDays days={e.days} detailed /></div>
            </>
          )}
          {e.showcase && (
            <div className="not-prose mt-10 rounded-3xl border border-border/80 bg-gradient-to-br from-brand-navy via-brand-blue-deep to-brand-blue p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Showcase</p>
              <h2 className="mt-2 text-2xl font-semibold">{e.showcase.title}</h2>
              <p className="mt-3 text-pretty leading-relaxed text-white/85">{e.showcase.description}</p>
            </div>
          )}
          {facilitators.length > 0 && (
            <>
              <h2>Facilitators</h2>
              <ul className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2">
                {facilitators.map((f) => (
                  <li key={f.memberId} className="flex items-center gap-4 rounded-2xl border border-border/80 bg-card p-4">
                    <AvatarInitials name={f.member!.name} photo={f.member!.photo} size={64} className="size-16 rounded-full text-lg ring-4 ring-background" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{f.label}</p>
                      <p className="font-semibold">{f.member!.name}</p>
                      <p className="text-sm text-muted-foreground">{f.member!.position}, Tech &amp; AI Innovation Club</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          {e.topics && (
            <>
              <h2>{e.topicsLabel ?? "Topics covered"}</h2>
              <ul className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2">
                {e.topics.map((t) => (
                  <li key={t.title} className="rounded-2xl border border-border/80 bg-card p-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-primary">{String(e.topics!.indexOf(t) + 1).padStart(2, "0")}</span>
                      <h3 className="m-0 text-lg font-semibold">{t.title}</h3>
                    </div>
                    {t.goal && <p className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">Goal:</strong> {t.goal}</p>}
                    <ul className="mt-3 list-none space-y-1.5 p-0 text-sm text-foreground/85">
                      {t.items.map((it) => (<li key={it} className="flex gap-2.5"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-coral" aria-hidden />{it}</li>))}
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          )}
          {e.objectives && (
            <>
              <h2>Objectives</h2>
              <ul>{e.objectives.map((o) => (<li key={o}>{o}</li>))}</ul>
            </>
          )}
          {e.schedule && (
            <>
              <h2>Schedule</h2>
              <ol className="relative mt-4 list-none space-y-0 p-0">
                <div className="absolute bottom-3 left-[7px] top-3 w-px bg-border" aria-hidden />
                {e.schedule.map((sItem) => (
                  <li key={sItem.time} className="relative flex items-start gap-4 py-2 pl-7">
                    <span className="absolute left-0 top-3.5 size-[15px] rounded-full border-2 border-primary bg-background" aria-hidden />
                    <span className="w-20 shrink-0 font-mono text-xs text-primary sm:text-sm">{sItem.time}</span>
                    <span className="text-sm text-foreground/90 sm:text-base">{sItem.title}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
          {e.criteria && (
            <>
              <h2>Judging criteria</h2>
              <ul className="mt-4 grid list-none gap-2 p-0 sm:grid-cols-2">
                {e.criteria.map((c) => (<li key={c} className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-card px-4 py-2.5 text-sm font-medium"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">✓</span>{c}</li>))}
              </ul>
            </>
          )}
          {e.outcomes && (
            <>
              <h2>Learning outcomes</h2>
              <p className="mb-2 text-sm text-muted-foreground">{e.outcomesLabel ?? "Participants will:"}</p>
              <ul>{e.outcomes.map((o) => (<li key={o}>{o}</li>))}</ul>
            </>
          )}
          {e.deliverables && (
            <>
              <h2>{e.deliverablesLabel ?? "What every team presents"}</h2>
              <ol className={`mt-4 grid list-none gap-2 p-0 ${e.deliverables.length > 5 ? "sm:grid-cols-4" : "sm:grid-cols-5"}`}>
                {e.deliverables.map((d, i) => (<li key={d} className="rounded-xl border border-border/80 bg-card p-3 text-center text-sm font-medium"><span className="block font-mono text-xs text-primary">0{i + 1}</span>{d}</li>))}
              </ol>
            </>
          )}
          {e.takeaways && (
            <>
              <h2>What you leave with</h2>
              <ul className="mt-4 grid list-none gap-2 p-0 sm:grid-cols-2">
                {e.takeaways.map((t) => (<li key={t} className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-card px-4 py-2.5 text-sm font-medium"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">✓</span>{t}</li>))}
              </ul>
            </>
          )}
          {e.awards && (
            <>
              <h2>Recognition</h2>
              <ul className="mt-4 grid list-none gap-2 p-0 sm:grid-cols-2">
                {e.awards.map((a) => (<li key={a} className="flex items-center gap-3 rounded-xl border border-border/80 bg-card px-4 py-3 text-sm font-medium"><span className="font-mono text-xs text-primary">{String(e.awards!.indexOf(a) + 1).padStart(2, "0")}</span>{a}</li>))}
              </ul>
            </>
          )}
          {e.audience && (
            <>
              <h2>Audience</h2>
              <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                {e.audience.map((a) => (<li key={a} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium">{a}</li>))}
              </ul>
            </>
          )}
          {e.type === "Project Exhibition" && e.topics && (
            <>
              <h2>Showcase gallery</h2>
              <p className="text-sm text-muted-foreground">Project photos will be added here after the exhibition.</p>
              <ul className="mt-4 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4" aria-label="Showcase gallery placeholders">
                {e.topics.map((t) => (
                  <li key={t.title} className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/40 p-4 text-center">
                    <span className="text-xs font-medium text-muted-foreground">{t.title}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {e.eligibility && <p className="mt-6 text-sm text-muted-foreground"><strong>Who can join:</strong> {e.eligibility}</p>}
          {e.highlights && e.highlights.length > 0 && (
            <>
              <h2>Highlights</h2>
              <ul>{e.highlights.map((h) => (<li key={h}>{h}</li>))}</ul>
            </>
          )}
        </div>
        <aside className="space-y-5 lg:col-span-4">
          <div className="rounded-3xl border border-border/80 bg-card p-6 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">How to take part</p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-muted-foreground">
              <li>Apply for membership if you have not yet; every event is open to members first.</li>
              <li>Reserve your seat by email or at the club desk; the Event / Program Coordinator confirms by reply.</li>
              <li>Bring your membership card. Attendance is recorded at the venue.</li>
            </ol>
          </div>
          <Link href="/events" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"><ArrowLeft className="size-4" /> All events</Link>
        </aside>
      </div>
    </article>
  );
}
