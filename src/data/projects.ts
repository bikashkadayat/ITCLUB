import type { DepartmentSlug } from "./departments";

export type ProjectCategory = "Club Projects" | "Research Projects" | "Student Innovations" | "Open Source Contributions";
export type ProjectStatus = "In development" | "Proposed" | "Planning";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  department: DepartmentSlug;
  description: string;
  language?: string;
  topics: string[];
  repo?: string;
  demo?: string;
  visibility: "Public" | "Internal";
}

/**
 * Project portfolio. The club was established on 13 September 2026; entries
 * are the concrete initiatives named in the proposal's activity plan, plus this
 * website. Update `repo`/`demo` as repositories go public.
 */
export const projects: Project[] = [
  {
    slug: "club-website",
    name: "taic-website",
    category: "Club Projects",
    status: "In development",
    department: "software-development",
    description:
      "Official website and member platform of the Tech & AI Innovation Club — departments, events, membership intake, projects and resource center. Built with Next.js 15, TypeScript and Tailwind CSS.",
    language: "TypeScript",
    topics: ["nextjs", "typescript", "tailwindcss", "club-platform"],
    visibility: "Public",
  },
  {
    slug: "college-utilities",
    name: "college-utilities",
    category: "Club Projects",
    status: "Proposed",
    department: "software-development",
    description:
      "College Utilities Engineering: small, practical tools for students and staff of Tech AI College, built in GitHub agile team sprints and released as open source.",
    language: "TypeScript",
    topics: ["college", "utilities", "agile", "open-source"],
    visibility: "Public",
  },
  {
    slug: "ctf-platform",
    name: "institutional-ctf",
    category: "Club Projects",
    status: "Proposed",
    department: "cyber-security",
    description:
      "Challenge sets and infrastructure for the Institutional Capture The Flag competition — web, crypto, forensics and networking challenges with automated scoring.",
    language: "Python",
    topics: ["ctf", "security", "challenges"],
    visibility: "Internal",
  },
  {
    slug: "weekly-challenge-leaderboard",
    name: "weekly-challenge-leaderboard",
    category: "Club Projects",
    status: "Proposed",
    department: "programming-problem-solving",
    description:
      "Leaderboard and archive for the Weekly Online Coding Challenges, recognising consistent problem solvers every month.",
    language: "TypeScript",
    topics: ["competitive-programming", "leaderboard"],
    visibility: "Public",
  },
  {
    slug: "chatbot-nlp",
    name: "campus-chatbot-nlp",
    category: "Research Projects",
    status: "Proposed",
    department: "ai-data-science",
    description:
      "Chatbot & NLP Engagements: conversational assistants trained on college and departmental knowledge, with documented evaluation of retrieval and response quality.",
    language: "Python",
    topics: ["nlp", "chatbot", "machine-learning"],
    visibility: "Public",
  },
  {
    slug: "kaggle-team",
    name: "kaggle-team-notebooks",
    category: "Research Projects",
    status: "Proposed",
    department: "ai-data-science",
    description:
      "Shared notebooks, experiment logs and post-mortems from the club’s Kaggle competitive hackathons — the research methodology track of the AI & Data Science department.",
    language: "Jupyter Notebook",
    topics: ["kaggle", "data-science", "research"],
    visibility: "Public",
  },
  {
    slug: "open-source-contribution-weeks",
    name: "open-source-contribution-weeks",
    category: "Open Source Contributions",
    status: "Planning",
    department: "software-development",
    description:
      "Tracker for members’ contributions to external open-source projects made during Open-Source Contribution Weeks — from first issue to merged pull request.",
    language: "Markdown",
    topics: ["open-source", "community", "good-first-issue"],
    visibility: "Public",
  },
];

export const projectCategories: ProjectCategory[] = [
  "Club Projects",
  "Research Projects",
  "Student Innovations",
  "Open Source Contributions",
];

export const portfolioPlatforms = [
  { name: "GitHub", purpose: "Production-grade codebases and open-source contributions", href: "https://github.com" },
  { name: "Kaggle", purpose: "Data science competitions and shared notebooks", href: "https://www.kaggle.com" },
  { name: "Behance", purpose: "UI/UX, media and creative digital portfolios", href: "https://www.behance.net" },
  { name: "LeetCode", purpose: "Sprint marathons and interview preparation", href: "https://leetcode.com" },
];
