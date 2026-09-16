import type { DepartmentSlug } from "./departments";
import type { VisualKey } from "./visuals";

/**
 * Events. Only activities the Executive Committee has actually scheduled are
 * listed. Upcoming / Live Now / Past is never stored here: it is derived from
 * `date` / `endDate` and the visitor's clock (see lib/event-status), so the
 * Events page keeps itself current without edits or rebuilds.
 */

export type EventType = "Meeting" | "Discussion" | "Workshop" | "Innovation Week" | "Career Talk" | "Hackathon" | "Innovation Challenge" | "Project Exhibition" | "Bootcamp";

export interface ClubEvent {
  slug: string;
  title: string;
  type: EventType;
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
  /** Featured events get the large card on the Events page. */
  featured?: boolean;
  tagline?: string;
  eligibility?: string;
  /** What participants can build (multi-day events). */
  categories?: string[];
  /** Day-by-day programme for multi-day events. */
  days?: { day: number; date: string; theme: string; time?: string; activities: string[]; activity?: string; showcase?: boolean }[];
  showcase?: { title: string; description: string };
  /** Banner photograph, when a fitting one exists (see data/visuals). */
  photo?: VisualKey;
  /** What each participant leaves with. */
  takeaways?: string[];
  outcomesLabel?: string;
  /** Event objectives (organiser goals, as opposed to participant outcomes). */
  objectives?: string[];
  audience?: string[];
  /** Recognition / award categories. */
  awards?: string[];
  deliverablesLabel?: string;
  motto?: string;
  /** Heading for the topics block (e.g. "Themes" for a hackathon). */
  topicsLabel?: string;
  /** Single-day schedule. */
  schedule?: { time: string; title: string }[];
  duration?: string;
  /** Committee member ids (photos and roles come from the committee data) plus a label. */
  facilitators?: { memberId: string; label: string }[];
  topics?: { title: string; items: string[]; goal?: string }[];
  /** Judging criteria (competitions). */
  criteria?: string[];
  /** What every team presents at the end. */
  deliverables?: string[];
  outcomes?: string[];
}


export const events: ClubEvent[] = [
  {
    slug: "member-intake-orientation",
    title: "Member Intake & Orientation Assembly",
    type: "Meeting",
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
    photo: "networkingEvent",
    title: "Internet Governance, ICANN & APNIC Workshop",
    type: "Workshop",
    date: "2026-10-12T07:00:00+05:45",
    venue: "Tech AI College of Management & Law",
    department: "ai-data-science",
    summary:
      "An introductory workshop inspired by APIGA (Asia Pacific Internet Governance Academy) on Internet Governance, ICANN, APNIC and youth engagement in digital policy.",
    description:
      "An introductory workshop inspired by APIGA (Asia Pacific Internet Governance Academy). Participants will learn about Internet Governance, ICANN, APNIC, Internet Ecosystem Stakeholders, Domain Name Systems, Internet Policy Development, and opportunities for youth engagement in digital policy and Internet governance.",
  },
  {
    slug: "vibe-coding-week-2026",
    photo: "lab",
    title: "Vibe Coding Week 2026",
    tagline: "5 Days. Unlimited Ideas. One Showcase.",
    type: "Innovation Week",
    featured: true,
    date: "2026-11-16T07:00:00+05:45",
    endDate: "2026-11-20T07:00:00+05:45",
    venue: "Tech AI College of Management & Law",
    host: "All Departments",
    eligibility: "Open to all Tech AI College students.",
    summary: "Build • Learn • Showcase. A 5-day collaborative innovation event where students work in teams or individually to build creative technology projects.",
    description:
      "Vibe Coding Week is a 5-day collaborative innovation event where students work in teams or individually to build creative technology projects.\n\nThe objective is to encourage students to learn by building real projects and showcase their creativity, problem-solving skills, and technical abilities.",
    categories: ["AI Projects", "Web Applications", "Mobile Apps", "Automation Tools", "Cyber Security Tools", "Educational Platforms", "Open Source Projects", "Digital Solutions"],
    days: [
      { day: 1, date: "2026-11-16", theme: "Kickoff & Team Formation", activities: ["Event Orientation", "Team Formation", "Idea Discussion", "Mentor Introduction", "Project Planning"] },
      { day: 2, date: "2026-11-17", theme: "Build Phase", activities: ["Coding", "Design", "Research", "Development"] },
      { day: 3, date: "2026-11-18", theme: "Development Sprint", activities: ["Project Development", "Mentor Support", "Team Reviews"] },
      { day: 4, date: "2026-11-19", theme: "Final Build & Testing", activities: ["Feature Completion", "Testing", "Bug Fixes", "Presentation Preparation"] },
      { day: 5, date: "2026-11-20", theme: "Project Showcase Day", time: "07:00 AM", activities: ["Project Demonstrations", "Team Presentations", "Feedback Session", "Recognition & Certificates", "Community Networking"] },
    ],
    showcase: {
      title: "Project Showcase 2026",
      description: "Participants will present their solutions to fellow students, faculty members, and invited guests. Projects will be evaluated based on creativity, usefulness, innovation, presentation quality, and technical implementation.",
    },
    registrationOpen: true,
  },
  {
    slug: "career-talks-pathways-in-tech",
    photo: "datacenterEngineer",
    title: "Career Talks: Pathways in Tech",
    tagline: "Explore Your Future. Discover Your Path in Technology.",
    type: "Career Talk",
    featured: true,
    date: "2026-11-27T07:00:00+05:45",
    duration: "2 hours",
    venue: "Tech AI College of Management & Law",
    host: "All Members",
    eligibility: "Open to all students of Tech AI College of Management & Law. No prior technical knowledge required.",
    summary: "Explore careers in Web Development, Cyber Security, Artificial Intelligence, Networking, and Freelancing while learning how to prepare for future opportunities in technology.",
    description:
      "Career Talks: Pathways in Tech is an interactive session designed to help students understand the diverse opportunities available in the technology industry. Participants will explore career paths, required skills, industry expectations, and practical steps for becoming industry-ready professionals.\n\nThe session will provide guidance for students who are interested in building careers in technology, innovation, and digital transformation.",
    facilitators: [
      { memberId: "bikash-kadayat", label: "Lead Facilitator" },
      { memberId: "nirmal-bk", label: "Supporting Facilitator" },
    ],
    topics: [
      { title: "Web Development", items: ["Frontend Development", "Backend Development", "Full Stack Career Path", "Portfolio Building"] },
      { title: "Cyber Security", items: ["Introduction to Cyber Security", "Security Career Opportunities", "Industry Certifications", "Ethical Hacking Fundamentals"] },
      { title: "Artificial Intelligence", items: ["AI & Machine Learning Careers", "Generative AI Tools", "AI Skills for Students", "Future Opportunities"] },
      { title: "Networking & Infrastructure", items: ["Network Engineering", "Cloud Fundamentals", "Internet Technologies", "Infrastructure Careers"] },
      { title: "Freelancing & Remote Work", items: ["Building Online Presence", "Freelancing Platforms", "Client Management", "Personal Branding"] },
    ],
    outcomes: [
      "Understand major technology career pathways.",
      "Identify industry-relevant skills.",
      "Learn how to create a professional portfolio.",
      "Explore internship and freelancing opportunities.",
      "Gain insights into future technology trends.",
    ],
    registrationOpen: true,
  },
  {
    slug: "mini-hackathon-build-in-24-hours",
    title: "Mini Hackathon: Build in 24 Hours",
    tagline: "24 Hours. One Challenge. Unlimited Innovation.",
    motto: "Think Fast. Build Smart. Showcase Innovation.",
    type: "Hackathon",
    featured: true,
    date: "2026-12-11T07:00:00+05:45",
    duration: "24 hours",
    venue: "Tech AI College of Management & Law",
    host: "All Departments",
    eligibility: "Open to all registered members of Tech & AI Innovation Club. Students may participate individually or in teams.",
    summary: "A 24-hour internal hackathon where students build innovative solutions focused on education, environment, social impact, and productivity challenges.",
    description:
      "Mini Hackathon: Build in 24 Hours is an internal innovation challenge designed for students to transform ideas into working solutions within a single day.\n\nParticipants can compete individually or in teams and will build practical solutions that address real-world problems while improving teamwork, creativity, technical skills, and problem-solving abilities.\n\nThe event encourages students to learn by building, experimenting, and presenting innovative projects.",
    topicsLabel: "Hackathon themes",
    topics: [
      { title: "Education", items: ["Student Learning Tools", "Educational Platforms", "Academic Productivity Solutions"] },
      { title: "Environment", items: ["Sustainability Solutions", "Waste Management Ideas", "Climate Awareness Tools"] },
      { title: "Social Impact", items: ["Community Support Projects", "Accessibility Solutions", "Digital Inclusion Initiatives"] },
      { title: "Productivity Tools", items: ["Automation Solutions", "Personal Productivity Apps", "Workflow Improvement Tools"] },
    ],
    schedule: [
      { time: "07:00 AM", title: "Opening Session & Challenge Briefing" },
      { time: "08:00 AM", title: "Idea Validation & Team Preparation" },
      { time: "09:00 AM", title: "Development Sprint Begins" },
      { time: "01:00 PM", title: "Mid-Point Progress Review" },
      { time: "05:00 PM", title: "Final Development Phase" },
      { time: "07:00 PM", title: "Project Submission Deadline" },
      { time: "07:30 PM", title: "Project Demonstrations" },
      { time: "08:30 PM", title: "Judging & Feedback" },
      { time: "09:00 PM", title: "Recognition & Closing Session" },
    ],
    outcomes: [
      "Build a complete project in a limited time.",
      "Improve teamwork and collaboration skills.",
      "Practice rapid problem-solving.",
      "Gain project presentation experience.",
      "Strengthen technical and creative thinking abilities.",
    ],
    registrationOpen: true,
  },
  {
    slug: "ai-for-social-good-challenge-2026",
    photo: "digitalInclusion",
    title: "AI for Social Good Challenge 2026",
    tagline: "Build Technology That Creates Real Impact.",
    motto: "Technology for People. Innovation for Impact.",
    type: "Innovation Challenge",
    featured: true,
    date: "2026-12-21T07:00:00+05:45",
    duration: "Full day",
    venue: "Tech AI College of Management & Law",
    department: "ai-data-science",
    eligibility: "Open to all students of Tech AI College of Management & Law. Students may participate individually or in teams of 2–4 members.",
    summary: "Build innovative technology solutions that address challenges in education, environment, accessibility, and community development while creating meaningful social impact.",
    description:
      "AI for Social Good Challenge is a student innovation competition focused on solving real-world social problems through technology and artificial intelligence.\n\nParticipants will work individually or in teams to design and build innovative solutions that create positive impact in society.\n\nThe challenge encourages students to use technology not only for business and productivity, but also for education, environmental sustainability, accessibility, and community development.",
    topicsLabel: "Challenge themes",
    topics: [
      { title: "Education", goal: "Improve learning experiences and educational accessibility.", items: ["AI Learning Assistant", "Student Study Planner", "Smart Learning Platform", "Attendance Management System", "Educational Resource Sharing Platform", "Career Guidance Assistant"] },
      { title: "Environment", goal: "Promote environmental sustainability and responsible resource use.", items: ["Waste Management Solution", "Recycling Awareness Platform", "Carbon Footprint Tracker", "Environmental Awareness App", "Smart Energy Monitoring Tool", "Eco-Friendly Community Platform"] },
      { title: "Accessibility", goal: "Make technology accessible for everyone.", items: ["Text-to-Speech System", "Speech-to-Text Assistant", "Accessibility Tools for Students", "Inclusive Learning Platform", "Navigation Assistance Tools", "AI Assistive Technologies"] },
      { title: "Community Development", goal: "Strengthen communities through technology and innovation.", items: ["Community Service Platform", "Volunteer Coordination System", "Local Problem Reporting App", "Digital Inclusion Solution", "Community Resource Mapping Tool", "Public Information Platform"] },
    ],
    schedule: [
      { time: "07:00 AM", title: "Opening Session" },
      { time: "07:30 AM", title: "Challenge Briefing" },
      { time: "08:00 AM", title: "Team Formation & Idea Discussion" },
      { time: "09:00 AM", title: "Development & Prototyping" },
      { time: "01:00 PM", title: "Progress Review" },
      { time: "03:00 PM", title: "Final Development Session" },
      { time: "05:00 PM", title: "Project Submission" },
      { time: "05:30 PM", title: "Project Presentations" },
      { time: "06:30 PM", title: "Judging & Feedback" },
      { time: "07:00 PM", title: "Recognition & Closing Session" },
    ],
    criteria: ["Innovation & Creativity", "Social Impact", "Problem Solving", "Technical Implementation", "Usability", "Presentation Quality"],
    outcomes: [
      "Learn how technology can address social challenges.",
      "Develop teamwork and collaboration skills.",
      "Build real-world problem-solving abilities.",
      "Gain experience in project development.",
      "Improve presentation and communication skills.",
    ],
    deliverables: ["Problem Statement", "Proposed Solution", "Prototype or Demo", "Social Impact", "Future Roadmap"],
    registrationOpen: true,
  },
  {
    slug: "annual-project-exhibition-2026",
    title: "Annual Project Exhibition 2026",
    tagline: "Build. Create. Showcase. Inspire.",
    motto: "Ideas into Reality. Projects into Impact.",
    type: "Project Exhibition",
    featured: true,
    date: "2026-12-27T07:00:00+05:45",
    endDate: "2026-12-27T10:00:00+05:45",
    venue: "Tech AI College of Management & Law",
    host: "All Departments",
    summary: "A showcase event where members present websites, applications, AI innovations, and research projects developed throughout the semester.",
    description:
      "The Annual Project Exhibition 2026 is a showcase event where members of the Tech & AI Innovation Club present the projects they have developed throughout the semester.\n\nStudents will demonstrate their innovations, share their learning journey, receive feedback from peers and faculty, and inspire fellow students through practical technology solutions.\n\nThe event aims to celebrate creativity, technical skills, problem-solving, research, and project-based learning.",
    topicsLabel: "Project categories",
    topics: [
      { title: "Web Development", items: ["Club Websites", "Portfolio Websites", "E-Commerce Platforms", "Management Systems", "Educational Platforms"] },
      { title: "Mobile Applications", items: ["Student Utility Apps", "Educational Apps", "Community Apps", "Productivity Tools"] },
      { title: "AI Projects", items: ["AI Chatbots", "Recommendation Systems", "Computer Vision Projects", "Machine Learning Models", "AI for Social Good Solutions"] },
      { title: "Research Projects", items: ["Cyber Security Research", "Internet Governance Research", "Technology Policy Studies", "AI & Society Research", "Emerging Technology Research"] },
    ],
    objectives: [
      "Showcase student innovation and creativity.",
      "Encourage project-based learning.",
      "Improve presentation and communication skills.",
      "Promote collaboration and peer learning.",
      "Recognize student achievements.",
    ],
    schedule: [
      { time: "07:00 AM", title: "Opening Session" },
      { time: "07:15 AM", title: "Project Setup & Exhibition Begins" },
      { time: "08:00 AM", title: "Live Project Demonstrations" },
      { time: "09:00 AM", title: "Faculty & Peer Feedback Session" },
      { time: "09:30 AM", title: "Best Project Recognition" },
      { time: "09:45 AM", title: "Closing Remarks" },
      { time: "10:00 AM", title: "Event Conclusion" },
    ],
    deliverablesLabel: "Each participant or team presents",
    deliverables: ["Project Title", "Problem Statement", "Solution Overview", "Technologies Used", "Live Demonstration", "Impact & Benefits", "Future Improvements"],
    audience: ["Club Members", "Students", "Faculty Members", "Invited Guests"],
    awards: ["Most Innovative Project", "Best Technical Implementation", "Best AI Project", "Best Research Project", "People's Choice Award"],
    registrationOpen: true,
  },
  {
    slug: "portfolio-website-bootcamp-2027",
    photo: "connectedDevices",
    title: "Build Your Portfolio Website Bootcamp 2027",
    tagline: "Your Skills. Your Portfolio. Your Digital Identity.",
    motto: "Build Your Presence. Showcase Your Potential.",
    type: "Bootcamp",
    featured: true,
    date: "2027-01-08T07:00:00+05:45",
    endDate: "2027-01-12T10:00:00+05:45",
    duration: "3 hours daily",
    venue: "Tech AI College of Management & Law",
    department: "software-development",
    summary: "A practical bootcamp where students build, deploy, and showcase their own professional portfolio websites while improving their GitHub, LinkedIn, and resume profiles.",
    description:
      "Build Your Portfolio Website Bootcamp is a 4-day hands-on learning program where students design, develop, and deploy their own professional portfolio website.\n\nParticipants will learn how to showcase their skills, projects, achievements, certifications, and professional profiles online.\n\nOn the final day, students will present and demonstrate their completed portfolio websites during a Portfolio Showcase Session.\n\nBy the end of the event, every participant should have a live portfolio website publicly accessible online.",
    days: [
      { day: 1, date: "2027-01-08", theme: "Planning & Personal Branding", time: "07:00 – 10:00 AM", activities: ["Why Portfolio Websites Matter", "Personal Branding Fundamentals", "Setting Career Goals", "Choosing Portfolio Structure", "Collecting Content"], activity: "Participants create their portfolio plan and content outline." },
      { day: 2, date: "2027-01-09", theme: "Website Design & Development", time: "07:00 – 10:00 AM", activities: ["HTML Basics", "CSS Fundamentals", "Responsive Design", "Modern UI/UX Principles", "Portfolio Layout Design"], activity: "Build the first version of the portfolio homepage." },
      { day: 3, date: "2027-01-10", theme: "Portfolio Features & Deployment", time: "07:00 – 10:00 AM", activities: ["About Section", "Project Showcase", "Skills Section", "Contact Information", "GitHub Pages Deployment"], activity: "Students deploy their portfolio websites online." },
      { day: 4, date: "2027-01-11", theme: "LinkedIn & Resume Optimization", time: "07:00 – 10:00 AM", activities: ["LinkedIn Profile Optimization", "Professional Networking", "Resume Writing", "GitHub Profile Setup", "Portfolio Review"], activity: "Finalize portfolio website and improve online presence." },
      { day: 5, date: "2027-01-12", theme: "Portfolio Showcase Day", time: "07:00 – 10:00 AM", showcase: true, activities: ["Live Website Demonstrations", "Portfolio Walkthrough", "Faculty Feedback", "Peer Review Sessions", "Best Portfolio Recognition"] },
    ],
    showcase: {
      title: "Portfolio Showcase Day",
      description: "On 12 January every participant presents their live portfolio website, projects, skills, career goals, GitHub profile and LinkedIn profile to faculty and peers.",
    },
    deliverablesLabel: "Every participant presents",
    deliverables: ["Portfolio Website", "Projects", "Skills", "Career Goals", "GitHub Profile", "LinkedIn Profile"],
    takeaways: ["Live Portfolio Website", "GitHub Pages Deployment", "Professional LinkedIn Profile", "Updated Resume", "Personal Brand Presence"],
    outcomesLabel: "Participants will learn:",
    outcomes: ["Website Development Fundamentals", "Responsive Design", "Portfolio Building", "GitHub Pages Deployment", "LinkedIn Optimization", "Resume Building", "Personal Branding"],
    awards: ["Best Portfolio Design", "Best Technical Portfolio", "Best Personal Branding", "Most Creative Portfolio", "People's Choice Award"],
    registrationOpen: true,
  },
];

/** All events, soonest first. Grouping by state happens at render time (lib/event-status). */
export const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
/** Featured events, soonest first; finished ones are hidden at render time. */
export const featuredEvents = sortedEvents.filter((e) => e.featured);
export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
