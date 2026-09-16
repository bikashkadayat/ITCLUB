import { pageMetadata } from "@/lib/seo";
import { events, featuredEvents } from "@/data/events";
import { NextUp } from "@/components/events/next-up";
import { UnlessPast } from "@/components/events/status-badge";
import { FeaturedEvent } from "@/components/events/featured-event";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { EventsBrowser } from "@/components/events/events-browser";

export const metadata = pageMetadata({
  title: "Events",
  description: "Upcoming events of the Tech & AI Innovation Club — Vibe Coding Week 2026, member orientation, an open roadmap discussion and our first workshop at Tech AI College of Management & Law.",
  path: "/events",
});

export default async function EventsPage() {
  const buildNow = new Date().toISOString();
  return (
    <>
      <PageHero eyebrow="Events" crumbs={[{ label: "Events" }]} title={<>Our first activities <span className="gradient-text">as a new club</span>.</>} description="From orientation to Vibe Coding Week, Career Talks, a 24-hour hackathon, the AI for Social Good Challenge, the Annual Project Exhibition and the Portfolio Website Bootcamp.">
        <NextUp events={events} buildNow={buildNow} />
      </PageHero>

      {featuredEvents.map((fe, i) => (
        <UnlessPast key={fe.slug} date={fe.date} endDate={fe.endDate} buildNow={buildNow}>
          <FeaturedEvent event={fe} variant={i % 2 === 0 ? "dark" : "light"} buildNow={buildNow} />
        </UnlessPast>
      ))}

      <section className="section" aria-labelledby="browse-heading">
        <div className="container-x">
          <SectionHeading eyebrow="All events" title={<span id="browse-heading">Find something to join.</span>} />
          <Reveal className="mt-14">
            <EventsBrowser events={events} buildNow={buildNow} />
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
