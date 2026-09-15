import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, ArrowLeft } from "lucide-react";
import { events, getEvent } from "@/data/events";
import { departments } from "@/data/departments";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Countdown } from "@/components/shared/countdown";
import { EventActions } from "@/components/events/event-actions";
import { formatDate, formatTime } from "@/lib/utils";

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
  const startsAt = e.date ? new Date(e.date) : null;
  const upcoming = startsAt ? startsAt > new Date() : false;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.summary,
    ...(startsAt ? { startDate: startsAt.toISOString() } : {}),
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
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{e.type}</span>
            {dept && <span className="rounded-full border border-border px-3 py-1 text-xs">{dept.name}</span>}
            {e.tentative && <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">Tentative date</span>}
            {e.registrationOpen && <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">Registration open</span>}
          </div>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">{e.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{e.summary}</p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" /><dd>{startsAt ? `${formatDate(startsAt.toISOString())} · ${formatTime(startsAt.toISOString())}` : e.schedule ?? "Date to be announced"}</dd></div>
            <div className="flex items-center gap-2"><MapPin className="size-4 text-primary" /><dd>{e.venue}</dd></div>
          </dl>
          {startsAt && upcoming && <Countdown target={startsAt.toISOString()} className="mt-6" />}
          <div className="mt-8">
            <EventActions title={e.title} open={e.registrationOpen} />
          </div>
        </div>
      </header>
      <div className="container-x grid grid-cols-1 gap-12 py-14 lg:grid-cols-12">
        <div className="prose-club lg:col-span-8">
          {e.image && <Image src={e.image} alt="" width={1600} height={900} className="mb-8 max-h-[420px] w-full rounded-3xl border border-border/80 object-cover" />}
          {e.description.split(/\n\s*\n/).map((p, i) => (<p key={i} className="text-[17px]">{p}</p>))}
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
