import { pageMetadata } from "@/lib/seo";
import { events, nextEvent } from "@/data/events";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { EventsBrowser } from "@/components/events/events-browser";
import { formatDate, formatTime } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Events",
  description: "Upcoming events of the Tech & AI Innovation Club — member orientation, an open roadmap discussion and our first workshop at Tech AI College of Management & Law.",
  path: "/events",
});

export default async function EventsPage() {
  return (
    <>
      <PageHero eyebrow="Events" crumbs={[{ label: "Events" }]} title={<>Our first activities <span className="gradient-text">as a new club</span>.</>} description="Orientation, an open roadmap discussion and our first workshop.">
        {nextEvent && (
          <div className="rounded-3xl border border-border/80 bg-card/80 p-5 backdrop-blur sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Next up</p>
            <p className="mt-2 text-lg font-semibold">{nextEvent.title}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(nextEvent.date)} · {formatTime(nextEvent.date)} · {nextEvent.venue}
            </p>
            <Countdown target={nextEvent.date} className="mt-4" />
          </div>
        )}
      </PageHero>

      <section className="section" aria-labelledby="browse-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Upcoming" title={<span id="browse-heading">Find something to join.</span>} />
          <Reveal className="mt-14">
            <EventsBrowser events={events} />
          </Reveal>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="more-events-heading">
        <div className="container-x">
          <Reveal className="rounded-3xl border border-dashed border-border bg-card/60 px-6 py-12 text-center sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Coming next</p>
            <h2 id="more-events-heading" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">More events will be announced soon.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The Club is in its establishment phase. Additional workshops, competitions, and hackathons will be announced after member onboarding and planning discussions.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
