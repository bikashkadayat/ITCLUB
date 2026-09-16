/**
 * The six functional departments, with core work areas and planned activities
 * taken verbatim from Section 8 of the Detailed Club Establishment Proposal.
 * Skills, projects and goals expand on those work areas.
 */

import type { VisualKey } from "./visuals";

export type DepartmentSlug =
  | "ai-data-science"
  | "software-development"
  | "cyber-security"
  | "programming-problem-solving"
  | "media-outreach"
  | "events-partnership";

export interface Department {
  slug: DepartmentSlug;
  name: string;
  shortName: string;
  icon: "BrainCircuit" | "Code2" | "ShieldCheck" | "Braces" | "Megaphone" | "Handshake";
  tagline: string;
  overview: string;
  /** "Core Work Areas" from the proposal */
  learningAreas: string[];
  /** "Planned Activities" from the proposal */
  activities: string[];
  skills: string[];
  projects: { title: string; description: string; status: "Proposed" | "In development" }[];
  futureGoals: string[];
  /** Banner photograph (see data/visuals). */
  visual: VisualKey;
  color: string; // tailwind gradient classes
  accent: string; // text/border colour class
}

export const departments: Department[] = [
  {
    slug: "ai-data-science",
    visual: "aiHologram",
    name: "AI & Data Science",
    shortName: "AI & DS",
    icon: "BrainCircuit",
    tagline: "Build intelligent solutions with data and AI.",
    overview:
      "The AI & Data Science department builds functional, hands-on competency in artificial intelligence frameworks and data-driven research. Members move from statistical foundations to trained models, then to experiments that are documented, reproducible and publishable — the research capacity the club’s mission calls for.",
    learningAreas: [
      "Machine Learning Models & Deep Nets",
      "Statistical Data Visualizations",
      "Experimental Research Methodologies",
    ],
    activities: [
      "Neural Network Bootcamps",
      "Chatbot & NLP Engagements",
      "Kaggle Competitive Hackathons",
    ],
    skills: [
      "Python, NumPy & pandas",
      "Scikit-learn, PyTorch / TensorFlow",
      "Data visualisation & storytelling",
      "Experiment design & evaluation",
      "Natural language processing",
      "Kaggle competition workflow",
    ],
    projects: [
      {
        title: "Chatbot & NLP Engagements",
        description:
          "Conversational assistants trained on college and departmental knowledge, built and evaluated end-to-end by member teams.",
        status: "Proposed",
      },
      {
        title: "Kaggle Team Portfolio",
        description:
          "Coordinated club entries in Kaggle competitions with shared notebooks, leaderboards and post-mortems that feed public developer portfolios.",
        status: "Proposed",
      },
    ],
    futureGoals: [
      "Run Neural Network Bootcamps each semester for new members.",
      "Publish peer-reviewed project write-ups at semester showcases.",
      "Field club teams in Kaggle competitive hackathons and national AI competitions.",
    ],
    color: "from-brand-blue to-brand-blue-light",
    accent: "text-brand-blue dark:text-brand-blue-light",
  },
  {
    slug: "software-development",
    visual: "lab",
    name: "Software Development",
    shortName: "SoftDev",
    icon: "Code2",
    tagline: "Create modern websites and applications.",
    overview:
      "The Software Development department is where members practise end-to-end, agile, project-based workflows. Teams design, build and deploy full-stack web and mobile products using industry conventions — pull requests, sprints, code review — so that every member graduates with production-grade codebases on GitHub.",
    learningAreas: [
      "Full-Stack Web Architectures",
      "Mobile Application Infrastructures",
      "UI/UX Design Frameworks",
    ],
    activities: [
      "Open-Source Contribution Weeks",
      "College Utilities Engineering",
      "GitHub Agile Team Sprints",
    ],
    skills: [
      "TypeScript, React & Next.js",
      "REST & API design",
      "Mobile app development",
      "UI/UX design systems",
      "Git, GitHub & code review",
      "Agile sprint planning",
    ],
    projects: [
      {
        title: "Club Website & Member Platform",
        description:
          "The official Tech & AI Innovation Club website — membership intake, events, projects and resources — maintained by the department as a living codebase.",
        status: "In development",
      },
      {
        title: "College Utilities Engineering",
        description:
          "Small, useful software for the college community, built in GitHub agile team sprints and released as open source.",
        status: "Proposed",
      },
    ],
    futureGoals: [
      "Establish codebase patterns and conventions with the IT / Technical Coordinator.",
      "Run Open-Source Contribution Weeks every semester.",
      "Give every active member a shipped, public project on GitHub.",
    ],
    color: "from-brand-blue-light to-brand-coral",
    accent: "text-brand-blue-light",
  },
  {
    slug: "cyber-security",
    visual: "serverRoom",
    name: "Cyber Security",
    shortName: "CyberSec",
    icon: "ShieldCheck",
    tagline: "Learn how to protect digital systems.",
    overview:
      "The Cyber Security department develops information-security competency through ethical, hands-on practice: penetration analysis, network and perimeter defence, and the data-privacy compliance context that management and law students bring to the table. All exercises are run in controlled environments and within college policy.",
    learningAreas: [
      "Penetration Analysis & Ethical Auditing",
      "Network & Perimeter Defenses",
      "Data Privacy Compliance Regulations",
    ],
    activities: [
      "Institutional Capture The Flag (CTF)",
      "Live Exploit & Defense Simulations",
      "College Digital Threat Briefings",
    ],
    skills: [
      "Linux & networking fundamentals",
      "Web application security",
      "Vulnerability assessment tooling",
      "Defensive monitoring & hardening",
      "Privacy & compliance awareness",
      "Incident reporting & write-ups",
    ],
    projects: [
      {
        title: "Institutional CTF Platform",
        description:
          "A recurring Capture The Flag competition for the college with challenge sets authored by members across web, crypto, forensics and networking.",
        status: "Proposed",
      },
      {
        title: "College Digital Threat Briefings",
        description:
          "Regular, plain-language security briefings for students and staff on phishing, account safety and data-privacy hygiene.",
        status: "Proposed",
      },
    ],
    futureGoals: [
      "Host the first Institutional CTF at Tech AI College.",
      "Run live exploit-and-defence simulations in a sandboxed lab.",
      "Publish threat briefings for the wider college community.",
    ],
    color: "from-brand-rose to-brand-coral",
    accent: "text-brand-rose dark:text-brand-coral",
  },
  {
    slug: "programming-problem-solving",
    visual: "connectedDevices",
    name: "Programming & Problem Solving",
    shortName: "Prog & PS",
    icon: "Braces",
    tagline: "Strengthen logic and coding skills.",
    overview:
      "The Programming & Problem Solving department hardens the computational thinking and structural reasoning that every other department relies on. Through weekly challenges, sprint marathons and mock technical screenings, members build the algorithmic fluency that opens doors to internships and technical interviews.",
    learningAreas: [
      "Asymptotic Analysis & Optimizations",
      "Advanced Data Structure Modeling",
      "Technical Interview Logic Mastery",
    ],
    activities: [
      "Weekly Online Coding Challenges",
      "LeetCode Sprint Marathons",
      "Internal Mock Technical Screenings",
    ],
    skills: [
      "Algorithms & complexity analysis",
      "Data structures",
      "Competitive programming",
      "Problem decomposition",
      "Technical interview communication",
      "Code optimisation",
    ],
    projects: [
      {
        title: "Weekly Challenge Leaderboard",
        description:
          "A club-wide leaderboard for the weekly online coding challenges, recognising consistent problem-solvers each month.",
        status: "Proposed",
      },
      {
        title: "Mock Screening Programme",
        description:
          "Internal mock technical screenings run by senior members to prepare juniors for internship and placement interviews.",
        status: "Proposed",
      },
    ],
    futureGoals: [
      "Run a weekly coding challenge without interruption across the academic year.",
      "Organise LeetCode sprint marathons before each placement season.",
      "Make mock technical screenings available to every active member.",
    ],
    color: "from-brand-blue-deep to-brand-blue",
    accent: "text-brand-blue dark:text-brand-blue-light",
  },
  {
    slug: "media-outreach",
    visual: "nepalNetwork",
    name: "Media & Outreach",
    shortName: "Media",
    icon: "Megaphone",
    tagline: "Tell stories and grow our community.",
    overview:
      "The Media & Outreach department manages the club’s public image. It runs the club’s social channels and growth metrics, maintains brand-standard content, and produces multimedia coverage of every event — working closely with the Public Relations / Communication Officer.",
    learningAreas: [
      "Social Channel & Growth Metrics",
      "Brand Standard Content Architecture",
      "Production Multimedia Engineering",
    ],
    activities: [
      "Interactive Tech News Highlights",
      "Project Launch Media Campaigns",
      "Audio/Visual Event Documentations",
    ],
    skills: [
      "Content strategy & copywriting",
      "Graphic design & brand systems",
      "Photography & videography",
      "Video editing & motion graphics",
      "Analytics & audience growth",
      "Community management",
    ],
    projects: [
      {
        title: "Tech News Highlights",
        description:
          "An interactive series summarising the week’s most important technology news for the college community.",
        status: "Proposed",
      },
      {
        title: "Event Documentation Archive",
        description:
          "Audio/visual documentation of every club event, feeding the gallery and project-launch campaigns.",
        status: "Proposed",
      },
    ],
    futureGoals: [
      "Launch and grow the club’s official social channels.",
      "Document every workshop, hackathon and seminar in photo and video.",
      "Run launch campaigns for each departmental project release.",
    ],
    color: "from-brand-coral to-brand-coral-light",
    accent: "text-brand-coral",
  },
  {
    slug: "events-partnership",
    visual: "datacenterEngineer",
    name: "Events & Partnership",
    shortName: "Events",
    icon: "Handshake",
    tagline: "Organize impactful events and collaborations.",
    overview:
      "The Events & Partnership department delivers the club’s high-impact showcases and builds its relationships with the technology industry. It coordinates workshops, hackathons, seminars and site visits end-to-end, and manages corporate liaison and sponsorships under the Event / Program Coordinator.",
    learningAreas: [
      "Corporate Liaison & Sponsorships",
      "End-to-End Event Coordination",
      "Tech Industry Relationship Portfolios",
    ],
    activities: [
      "Annual Regional Hackathon Summits",
      "Corporate Expert Panel Seminars",
      "Tech Sector Site Explorations",
    ],
    skills: [
      "Event planning & logistics",
      "Sponsorship proposals",
      "Stakeholder communication",
      "Budgeting & reporting",
      "Partnership management",
      "Public speaking & hosting",
    ],
    projects: [
      {
        title: "Annual Regional Hackathon Summit",
        description:
          "A flagship inter-collegiate hackathon hosted at Tech AI College, bringing together student teams, mentors and corporate partners.",
        status: "Proposed",
      },
      {
        title: "Industry Partner Portfolio",
        description:
          "A structured portfolio of tech-sector relationships — ISPs, software firms and founders — supporting sponsorships, seminars and site visits.",
        status: "Proposed",
      },
    ],
    futureGoals: [
      "Host the first Annual Regional Hackathon Summit.",
      "Bring corporate experts to campus for panel seminars each semester.",
      "Organise tech-sector site explorations for members.",
    ],
    color: "from-brand-blue to-brand-rose",
    accent: "text-brand-rose dark:text-brand-coral-light",
  },
];

export const getDepartment = (slug: string) => departments.find((d) => d.slug === slug);

/** Department structure from Section 9 of the proposal / Article 7 of the constitution */
export const departmentStructure = {
  roles: ["Department Lead", "Assistant Lead", "Technical Associates / Members"],
  oversight:
    "Each department functions under an appointed Department Lead, an Assistant Lead, and a pool of selected Technical Associates / Members. The IT / Technical Coordinator provides technical oversight and standards across all departments.",
};
