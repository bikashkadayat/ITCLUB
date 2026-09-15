import type { DepartmentSlug } from "./departments";

/**
 * Events. The club was founded on 13 September 2026, so the founding meeting is
 * the only completed event. Only activities that the Executive Committee has
 * actually scheduled are listed here — no placeholder or "planned" items.
 * Additional workshops, competitions and hackathons are announced after member
 * onboarding and the roadmap discussion.
 */

export type EventType = "Meeting" | "Discussion" | "Workshop";
export type EventStatus = "upcoming" | "past";

export interface ClubEvent {
  slug: string;
  title: string;
  type: EventType;
  status: EventStatus;
  /** ISO date-time (Nepal time, UTC+05:45). */
  date: string;
  endDate?: string;
  venue: string;
  /** Organising department, when one department hosts the event. */
  department?: DepartmentSlug;
  /** Organiser shown when the event is not run by a single department (e.g. "Club Administration"). */
  host?: string;
  summary: string;
  description: string;
  highlights?: string[];
  image?: string;
  registrationOpen?: boolean;
}

export const events: ClubEvent[] = [
  {
    slug: "founding-meeting-2026",
    title: "Founding Meeting of the Tech & AI Innovation Club",
    type: "Meeting",
    status: "past",
    date: "2026-09-13T20:30:00+05:45",
    venue: "Tech AI College, New Baneshwor, Kathmandu",
    host: "Founding members",
    summary:
      "The founding members met, adopted the proposal, formed the initial Executive Committee and confirmed the Faculty Advisor.",
    description:
      "Chaired by Sunil Babu Adhikari, the founding meeting presented the concept and proposal for the Tech & AI Innovation Club — its background and rationale, vision and mission, the six functional departments, operational cadence, membership structure and lean budget. The founding members expressed unanimous support, formed the initial Executive Committee, confirmed the Faculty Advisor / Mentor subject to written consent, and resolved to submit the establishment documents to the college administration.",
    highlights: [
      "Seven founding participants",
      "Initial Executive Committee formed",
      "Faculty Advisor / Mentor confirmed",
      "Establishment documents approved for submission",
    ],
  },
  {
    slug: "member-intake-orientation",
    title: "Member Intake & Orientation Assembly",
    type: "Meeting",
    status: "upcoming",
    date: "2026-10-08T07:00:00+05:45",
    venue: "Tech AI College of Management & Law",
    host: "Club Administration",
    summary:
      "Open registration for all students in good standing. Meet the Executive Committee and learn about the Club's vision, mission, activities and future opportunities.",
    description:
      "Open registration for all students in good standing. Meet the Executive Committee, learn about the Club's vision, mission, activities, and future opportunities. Students can ask questions, connect with fellow members, and understand how they can contribute to club initiatives.",
    registrationOpen: true,
  },
  {
    slug: "club-roadmap-open-discussion",
    title: "Open Discussion on Club Roadmap & Future Plans",
    type: "Discussion",
    status: "upcoming",
    date: "2026-10-09T07:00:00+05:45",
    venue: "Tech AI College of Management & Law",
    host: "All Members",
    summary:
      "A collaborative session with newly registered members to gather ideas, discuss club goals and plan future workshops, projects and events.",
    description:
      "A collaborative discussion session with newly registered members to gather ideas, discuss club goals, identify priority activities, and plan future workshops, projects, and events. Members will have the opportunity to directly contribute to the direction of the club.",
  },
  {
    slug: "internet-governance-icann-apnic-workshop",
    title: "Internet Governance, ICANN & APNIC Workshop",
    type: "Workshop",
    status: "upcoming",
    date: "2026-10-12T07:00:00+05:45",
    venue: "Tech AI College of Management & Law",
    department: "ai-data-science",
    summary:
      "An introductory workshop inspired by APIGA (Asia Pacific Internet Governance Academy) on Internet Governance, ICANN, APNIC and youth engagement in digital policy.",
    description:
      "An introductory workshop inspired by APIGA (Asia Pacific Internet Governance Academy). Participants will learn about Internet Governance, ICANN, APNIC, Internet Ecosystem Stakeholders, Domain Name Systems, Internet Policy Development, and opportunities for youth engagement in digital policy and Internet governance.",
  },
];

export const upcomingEvents = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));
export const pastEvents = events
  .filter((e) => e.status === "past")
  .sort((a, b) => b.date.localeCompare(a.date));
export const nextEvent = upcomingEvents[0];
export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
