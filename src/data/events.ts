import type { DepartmentSlug } from "./departments";

/**
 * Events. The club was founded on 13 September 2026, so the founding meeting is
 * the only completed event. Everything else is a planned activity from the
 * proposal's Annual Action Plan; dates marked `tentative` must be confirmed by
 * the Executive Committee and updated here.
 */

export type EventType = "Workshop" | "Hackathon" | "Bootcamp" | "Seminar" | "Tech Talk" | "Assembly" | "Competition" | "Site Visit" | "Meeting";
export type EventStatus = "upcoming" | "planned" | "past";

export interface ClubEvent {
  slug: string;
  title: string;
  type: EventType;
  status: EventStatus;
  /** ISO date-time. Omit when no date has been set yet. */
  date?: string;
  endDate?: string;
  tentative?: boolean;
  /** Free-text schedule when there is no fixed date (e.g. "Every week"). */
  schedule?: string;
  venue: string;
  department?: DepartmentSlug;
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
    type: "Assembly",
    status: "upcoming",
    date: "2026-10-04T11:00:00+05:45",
    tentative: true,
    venue: "Tech AI College of Management & Law",
    summary:
      "Open registration for all students in good standing. Meet the Executive Committee, explore the six departments and pick up to two to join.",
    description:
      "The first general assembly after establishment. Students from computer science, management and law learn how the club works — the weekly departmental cadence, bi-weekly assemblies and semester showcases — and submit the official membership / intake form. Department Leads introduce their learning areas and first project cycles.",
    highlights: ["Open to every enrolled student", "Choose up to two departments", "Meet the Executive Committee"],
    registrationOpen: true,
  },
  {
    slug: "neural-network-bootcamp",
    title: "Neural Network Bootcamp",
    type: "Bootcamp",
    status: "planned",
    schedule: "First semester cycle",
    venue: "Computer Lab, Tech AI College",
    department: "ai-data-science",
    summary: "A hands-on bootcamp taking members from statistical foundations to trained deep networks.",
    description:
      "Planned by the AI & Data Science department: a multi-session bootcamp covering machine learning models and deep nets, statistical data visualisation and experimental research methodology, ending with a small documented model each participant can publish.",
  },
  {
    slug: "kaggle-competitive-hackathon",
    title: "Kaggle Competitive Hackathon",
    type: "Hackathon",
    status: "planned",
    schedule: "Semester showcase",
    venue: "Computer Lab, Tech AI College",
    department: "ai-data-science",
    summary: "Club teams compete on a live Kaggle problem, with shared notebooks and a post-mortem review.",
    description:
      "A time-boxed competitive hackathon in which member teams tackle a Kaggle competition together. Results, notebooks and lessons are reviewed at the monthly general assembly and feed members’ public portfolios.",
  },
  {
    slug: "open-source-contribution-week",
    title: "Open-Source Contribution Week",
    type: "Workshop",
    status: "planned",
    schedule: "Each semester",
    venue: "Tech AI College & online",
    department: "software-development",
    summary: "A week of guided first contributions to open-source projects, from issue triage to merged pull request.",
    description:
      "Run by the Software Development department. Members learn the GitHub workflow — forking, branching, code review, pull requests — and make real contributions to open-source projects over one focused week.",
  },
  {
    slug: "github-agile-team-sprint",
    title: "GitHub Agile Team Sprint",
    type: "Workshop",
    status: "planned",
    schedule: "Recurring, per project cycle",
    venue: "Tech AI College",
    department: "software-development",
    summary: "Two-week sprints where teams build college utilities using agile ceremonies and GitHub projects.",
    description:
      "Structured sprints delivering College Utilities Engineering projects. Teams plan, build, review and demo in the agile, project-based workflow the club’s mission describes.",
  },
  {
    slug: "institutional-ctf",
    title: "Institutional Capture The Flag (CTF)",
    type: "Competition",
    status: "planned",
    schedule: "Semester showcase",
    venue: "Computer Lab, Tech AI College",
    department: "cyber-security",
    summary: "A jeopardy-style CTF for the college with challenges across web, crypto, forensics and networking.",
    description:
      "The Cyber Security department’s flagship competition. Challenges are authored by members, run in a controlled environment, and followed by public write-ups so every participant learns the solutions.",
  },
  {
    slug: "live-exploit-defense-simulation",
    title: "Live Exploit & Defense Simulation",
    type: "Workshop",
    status: "planned",
    schedule: "Monthly cross-pollination session",
    venue: "Computer Lab, Tech AI College",
    department: "cyber-security",
    summary: "Red-team / blue-team exercises in a sandboxed lab, with a defence-focused debrief.",
    description:
      "Members alternate between attacking and defending a deliberately vulnerable lab environment, then debrief on detection, hardening and data-privacy compliance.",
  },
  {
    slug: "college-digital-threat-briefing",
    title: "College Digital Threat Briefing",
    type: "Tech Talk",
    status: "planned",
    schedule: "Recurring",
    venue: "Auditorium, Tech AI College",
    department: "cyber-security",
    summary: "Short, plain-language briefings on current digital threats for students and staff.",
    description:
      "A recurring tech talk series translating the security landscape — phishing, account takeover, data-privacy obligations — into practical guidance for the whole college community.",
  },
  {
    slug: "weekly-online-coding-challenge",
    title: "Weekly Online Coding Challenge",
    type: "Competition",
    status: "planned",
    schedule: "Every week",
    venue: "Online",
    department: "programming-problem-solving",
    summary: "A weekly problem set with a club leaderboard, run by Programming & Problem Solving.",
    description:
      "Every week a curated set of algorithmic problems is released to members. Solutions are discussed in the departmental meeting and consistent solvers are recognised monthly.",
  },
  {
    slug: "leetcode-sprint-marathon",
    title: "LeetCode Sprint Marathon",
    type: "Competition",
    status: "planned",
    schedule: "Before placement seasons",
    venue: "Computer Lab, Tech AI College",
    department: "programming-problem-solving",
    summary: "An intensive day of timed problem-solving sprints to build interview readiness.",
    description:
      "Timed sprints across data structures, asymptotic analysis and optimisation, modelled on technical interview conditions.",
  },
  {
    slug: "mock-technical-screening",
    title: "Internal Mock Technical Screening",
    type: "Workshop",
    status: "planned",
    schedule: "Recurring",
    venue: "Tech AI College",
    department: "programming-problem-solving",
    summary: "Practice technical interviews run by senior members with structured feedback.",
    description:
      "Members experience a realistic technical screening — coding, reasoning and communication — and receive written feedback to prepare for internships and placements.",
  },
  {
    slug: "corporate-expert-panel-seminar",
    title: "Corporate Expert Panel Seminar",
    type: "Seminar",
    status: "planned",
    schedule: "Monthly masterclass series",
    venue: "Auditorium, Tech AI College",
    department: "events-partnership",
    summary: "Industry experts join a panel on careers, technology trends and what employers expect.",
    description:
      "Part of the monthly cross-pollination cadence: professional masterclasses with external guests from regional tech firms, ISPs and software companies.",
  },
  {
    slug: "tech-sector-site-exploration",
    title: "Tech Sector Site Exploration",
    type: "Site Visit",
    status: "planned",
    schedule: "Per semester",
    venue: "Partner companies, Kathmandu",
    department: "events-partnership",
    summary: "Guided visits to technology companies to see engineering teams at work.",
    description:
      "Organised by the Events & Partnership department with corporate partners, giving members first-hand exposure to industry environments.",
  },
  {
    slug: "annual-regional-hackathon-summit",
    title: "Annual Regional Hackathon Summit",
    type: "Hackathon",
    status: "planned",
    schedule: "Annual flagship",
    venue: "Tech AI College of Management & Law",
    department: "events-partnership",
    summary: "The club’s flagship inter-collegiate hackathon with mentors, corporate partners and public exhibition.",
    description:
      "A large-scale, inter-collegiate hackathon summit hosted at Tech AI College — the high-impact semester showcase described in the proposal, combining team competition, a public technology exhibition and formal performance awards.",
  },
];

export const eventTypeGroups: { label: string; types: EventType[] }[] = [
  { label: "Workshops", types: ["Workshop"] },
  { label: "Hackathons", types: ["Hackathon", "Competition"] },
  { label: "Bootcamps", types: ["Bootcamp"] },
  { label: "Seminars", types: ["Seminar", "Site Visit"] },
  { label: "Tech Talks", types: ["Tech Talk", "Assembly", "Meeting"] },
];

export const upcomingEvents = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
export const plannedEvents = events.filter((e) => e.status === "planned");
export const pastEvents = events
  .filter((e) => e.status === "past")
  .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
export const nextEvent = upcomingEvents.find((e) => e.date);
export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
