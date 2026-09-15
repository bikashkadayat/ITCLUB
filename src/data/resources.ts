export interface ClubDocument {
  id: string;
  title: string;
  description: string;
  file: string;
  pages: number;
  date: string;
  kind: "Application" | "Proposal" | "Constitution" | "Committee" | "Minutes";
}

/** Official founding documents (public/documents). */
export const documents: ClubDocument[] = [
  {
    id: "01",
    title: "Official Club Establishment Application",
    description:
      "Application to the Principal / Campus Chief for the official establishment and recognition of the Tech & AI Innovation Club.",
    file: "/documents/01-official-club-establishment-application.pdf",
    pages: 2,
    date: "2026-09-13",
    kind: "Application",
  },
  {
    id: "02",
    title: "Detailed Club Establishment Proposal",
    description:
      "Background, rationale, vision, mission, objectives, departments, structure, membership, budget, outcomes and sustainability.",
    file: "/documents/02-detailed-club-establishment-proposal.pdf",
    pages: 7,
    date: "2026-09-13",
    kind: "Proposal",
  },
  {
    id: "03",
    title: "Club Constitution and Bylaws",
    description: "The eighteen articles governing the club’s name, status, membership, committee, meetings, finances and amendments.",
    file: "/documents/03-club-constitution-and-bylaws.pdf",
    pages: 5,
    date: "2026-09-13",
    kind: "Constitution",
  },
  {
    id: "04",
    title: "Executive Committee Formation Document",
    description: "Record of the initial Executive Committee certified by the President and the Faculty Advisor / Mentor.",
    file: "/documents/04-executive-committee-formation.pdf",
    pages: 1,
    date: "2026-09-13",
    kind: "Committee",
  },
  {
    id: "07",
    title: "Founding Meeting Minutes",
    description: "Agenda, discussion, decisions and resolution of the founding meeting held on 13 September 2026.",
    file: "/documents/07-founding-meeting-minutes.pdf",
    pages: 2,
    date: "2026-09-13",
    kind: "Minutes",
  },
];

export interface LearningTrack {
  department: string;
  slug: string;
  steps: string[];
}

/** Learning roadmaps derived from each department's core work areas. */
export const learningTracks: LearningTrack[] = [
  {
    department: "AI & Data Science",
    slug: "ai-data-science",
    steps: ["Python & statistics foundations", "Data visualisation", "Machine learning models", "Deep nets & NLP", "Experimental research write-ups", "Kaggle competitions"],
  },
  {
    department: "Software Development",
    slug: "software-development",
    steps: ["Git & GitHub workflow", "Full-stack web architecture", "UI/UX design frameworks", "Mobile application infrastructure", "Agile team sprints", "Open-source contribution"],
  },
  {
    department: "Cyber Security",
    slug: "cyber-security",
    steps: ["Linux & networking", "Web security fundamentals", "Penetration analysis & ethical auditing", "Network & perimeter defence", "Data-privacy compliance", "CTF practice"],
  },
  {
    department: "Programming & Problem Solving",
    slug: "programming-problem-solving",
    steps: ["Language fluency", "Data structures", "Asymptotic analysis & optimisation", "Weekly challenges", "LeetCode sprints", "Mock technical screenings"],
  },
  {
    department: "Media & Outreach",
    slug: "media-outreach",
    steps: ["Brand standards", "Content architecture", "Photography & video", "Multimedia production", "Growth metrics", "Launch campaigns"],
  },
  {
    department: "Events & Partnership",
    slug: "events-partnership",
    steps: ["Event planning", "Logistics & venues", "Sponsorship proposals", "Corporate liaison", "Site explorations", "Hackathon summits"],
  },
];
