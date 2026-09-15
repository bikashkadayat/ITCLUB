import { pageMetadata } from "@/lib/seo";
import { events } from "@/data/events";
import { club } from "@/data/club";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { EventsBrowser } from "@/components/events/events-browser";
import { formatDate, formatTime } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Events",
  description: "Upcoming and past events of the Tech & AI Innovation Club — workshops, hackathons, bootcamps, seminars, tech talks and assemblies at Tech AI College of Management & Law.",
  path: "/events",
});

export default async function EventsPage() {
  const nextEvent = events.filter((e) => e.status === "upcoming" && e.date).sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""))[0];
  const upcomingCount = events.filter((e) => e.status !== "past").length;
  return (
    <>
      <PageHero
        eyebrow="Events"
        crumbs={[{ label: "Events" }]}
        title={
          <>
            Workshops, hackathons <span className="gradient-text">and everything in between</span>.
          </>
        }
        description={`${upcomingCount} activities are planned across the six departments this year, following the club's weekly, monthly and semester cadence.`}
      >
        {nextEvent?.date && (
          <div className="rounded-3xl border border-border/80 bg-card/80 p-5 backdrop-blur sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Next up{nextEvent.tentative ? " · tentative" : ""}</p>
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
          <SectionHeading eyebrow="Browse" title={<span id="browse-heading">Find something to join.</span>} />
          <Reveal className="mt-10">
            <EventsBrowser events={events} />
          </Reveal>
        </div>
      </section>

      <section className="section bg-muted/40" aria-labelledby="cadence2-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Operational cadence" align="center" title={<span id="cadence2-heading">Our rhythm through the year.</span>} />
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {club.cadence.map((c) => (
              <Reveal key={c.period} className="rounded-3xl border border-border/80 bg-card p-6">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{c.period}</p>
                <h3 className="mt-2 font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
