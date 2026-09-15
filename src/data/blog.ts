export type BlogCategory = "AI" | "Programming" | "Cyber Security" | "Club Updates" | "Student Stories";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  author: { name: string; role: string };
  readingTime: string;
  cover?: string;
  tags: string[];
  /** Markdown-ish blocks rendered as paragraphs/headings/lists. */
  content: Block[];
}

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export const blogCategories: BlogCategory[] = ["Club Updates", "AI", "Programming", "Cyber Security", "Student Stories"];

/**
 * Posts are written from the club's founding documents. Categories without
 * posts yet render an empty state inviting members to contribute.
 */
export const posts: BlogPost[] = [
  {
    slug: "founding-meeting-establishes-the-club",
    title: "Founding meeting establishes the Tech & AI Innovation Club",
    excerpt:
      "On 13 September 2026, seven founding members met at Tech AI College and unanimously resolved to establish an official student technology club.",
    category: "Club Updates",
    date: "2026-09-13",
    author: { name: "Sambridhi Subedi", role: "Secretary" },
    readingTime: "3 min read",
    cover: "/images/gallery/computer-lab-session.jpg",
    tags: ["founding", "announcement"],
    content: [
      { type: "p", text: "The founding meeting for the establishment of the Tech & AI Innovation Club was held on 13 September 2026 at 08:30 PM at Tech AI College, New Baneshwor, Kathmandu, chaired by Sunil Babu Adhikari." },
      { type: "p", text: "Seven participants attended: Bikash Kadayat, Sadikshya Rijal, Nirmal B.K, Sambridhi Subedi, Sanjita Shrestha, Suman Karki and Raj Adhikari." },
      { type: "h2", text: "What was discussed" },
      { type: "p", text: "The Chairperson opened the meeting and explained the purpose of establishing a student-led technical club. The proposal was presented in full: the background and rationale, the vision and mission, the six functional departments, the weekly, monthly and semester operational cadence, the membership structure, and the lean budget and sustainability model." },
      { type: "p", text: "The founding members discussed the proposal and expressed support for the establishment of the club. The Executive Committee structure and the roles and responsibilities of each position were reviewed and agreed upon. Members also discussed the requirement that all activities be conducted within the rules and policies of the college." },
      { type: "h2", text: "Resolutions" },
      { type: "ol", items: [
        "It was resolved to propose the establishment of the Tech & AI Innovation Club as an official student club of the college.",
        "The initial Executive Committee was formed as recorded in the Executive Committee Formation Document.",
        "The Faculty Advisor / Mentor was confirmed, subject to their written consent and college approval.",
        "It was resolved to submit the complete set of establishment documents to the college administration for approval.",
      ] },
      { type: "quote", text: "The founding members unanimously agreed to propose the establishment of the Tech & AI Innovation Club as an official student club of Tech AI College of Management & Law, subject to approval by the college administration." },
    ],
  },
  {
    slug: "meet-the-founding-executive-committee",
    title: "Meet the founding Executive Committee",
    excerpt:
      "Seven positions, six student office-bearers and one faculty mentor — here is who leads the club in its first term.",
    category: "Club Updates",
    date: "2026-09-13",
    author: { name: "Jenisha Basnet", role: "Public Relations / Communication Officer" },
    readingTime: "3 min read",
    tags: ["committee", "leadership"],
    content: [
      { type: "p", text: "The Executive Committee Formation Document records the initial Executive Committee of the Tech & AI Innovation Club, certified by the President and the Faculty Advisor / Mentor on 13 September 2026." },
      { type: "ul", items: [
        "President — Bikash Kadayat (BSc CSIT, 2nd Semester)",
        "Vice President — Sadikshya Rijal (BSc CSIT, 4th Semester)",
        "Secretary — Sambridhi Subedi (BSc CSIT, 2nd Semester)",
        "IT / Technical Coordinator — Nirmal B.K (BSc CSIT, 2nd Semester)",
        "Event / Program Coordinator — Sanjita Shrestha (BSc CSIT, 2nd Semester)",
        "Public Relations / Communication Officer — Jenisha Basnet (BCA, 2nd Semester)",
        "Faculty Advisor / Mentor — Suman Karki (Faculty)",
      ] },
      { type: "h2", text: "How the committee works" },
      { type: "p", text: "Under Article 12 of the Constitution, the term of office is two academic years, renewable for one additional term through re-selection / re-election, subject to college policy. Subsequent committees are selected by active members through nomination followed by a vote, overseen by the Faculty Advisor and cleared by the college administration." },
      { type: "p", text: "The Faculty Advisor / Mentor is appointed by, or with the approval of, the college administration and is not elected by members. The advisor is the primary link between the student body and the administration." },
    ],
  },
  {
    slug: "six-departments-one-mission",
    title: "Six departments, one mission: how the club is organised",
    excerpt:
      "AI & Data Science, Software Development, Cyber Security, Programming & Problem Solving, Media & Outreach and Events & Partnership — what each does and how they fit together.",
    category: "Club Updates",
    date: "2026-09-13",
    author: { name: "Nirmal B.K", role: "IT / Technical Coordinator" },
    readingTime: "4 min read",
    tags: ["departments", "structure"],
    content: [
      { type: "p", text: "The club delivers its work through six functional departments. Each operates under a Department Lead, an Assistant Lead and a pool of Technical Associates / Members, with the IT / Technical Coordinator providing technical oversight and standards across all of them." },
      { type: "h2", text: "The departments" },
      { type: "ul", items: [
        "AI & Data Science — machine learning models and deep nets, statistical data visualisation, experimental research methodology. Activities: Neural Network Bootcamps, Chatbot & NLP Engagements, Kaggle Competitive Hackathons.",
        "Software Development — full-stack web architectures, mobile application infrastructures, UI/UX design frameworks. Activities: Open-Source Contribution Weeks, College Utilities Engineering, GitHub Agile Team Sprints.",
        "Cyber Security — penetration analysis and ethical auditing, network and perimeter defences, data-privacy compliance. Activities: Institutional CTF, Live Exploit & Defense Simulations, College Digital Threat Briefings.",
        "Programming & Problem Solving — asymptotic analysis and optimisation, advanced data-structure modelling, technical interview logic. Activities: Weekly Online Coding Challenges, LeetCode Sprint Marathons, Internal Mock Technical Screenings.",
        "Media & Outreach — social channel and growth metrics, brand-standard content, production multimedia. Activities: Interactive Tech News Highlights, Project Launch Media Campaigns, Audio/Visual Event Documentation.",
        "Events & Partnership — corporate liaison and sponsorships, end-to-end event coordination, tech industry relationship portfolios. Activities: Annual Regional Hackathon Summits, Corporate Expert Panel Seminars, Tech Sector Site Explorations.",
      ] },
      { type: "h2", text: "The cadence that ties them together" },
      { type: "p", text: "Weekly departmental focus sessions, bi-weekly member assemblies, a monthly general assembly with masterclasses and mid-tier project reviews, and semester showcases with hackathons, exhibitions and performance awards." },
      { type: "p", text: "Members choose up to two primary departments when they join, and stay active by attending the bi-weekly assemblies and contributing to at least one departmental project delivery cycle per semester." },
    ],
  },
  {
    slug: "why-we-founded-the-club",
    title: "Why we founded the club: bridging theory and industry practice",
    excerpt:
      "Strong theoretical foundations are not enough. The club exists to give students a structured platform for real-world application, industry simulation and cross-disciplinary innovation.",
    category: "Club Updates",
    date: "2026-09-13",
    author: { name: "Bikash Kadayat", role: "President" },
    readingTime: "4 min read",
    tags: ["vision", "mission", "rationale"],
    content: [
      { type: "p", text: "In today’s rapidly evolving digital landscape, technology has moved from being an isolated field of academic study into a foundational, required skill across corporate and legal industries. While our courses provide strong theoretical foundations, students often lack a structured platform for real-world application, industry simulation and cross-disciplinary innovation." },
      { type: "h2", text: "The gap we saw" },
      { type: "ul", items: [
        "Academic learning is strong in theory but limited in structured, hands-on industry applications.",
        "Students lack a consistent platform for real-world project simulation and cross-disciplinary collaboration.",
        "Employers and internship providers increasingly demand practical competency in AI, software engineering, cyber security and problem-solving.",
        "A unified club can connect management, law and computer science students around collaborative technical projects.",
      ] },
      { type: "h2", text: "Our vision" },
      { type: "quote", text: "To architect a resilient, industry-aligned ecosystem of technical excellence, continuous innovation, and strategic leadership within Tech AI College of Management & Law, empowering students to build high-impact technological solutions for real-world complexities." },
      { type: "h2", text: "What we expect to change" },
      { type: "p", text: "For students: production-grade codebases and public developer portfolios on GitHub, Kaggle and Behance; greater readiness for national tech internships and technical leadership roles; and stronger communication, project-management and presentation skills." },
      { type: "p", text: "For the college: elevated standing as a hub for real-world technical competency and student innovation, stronger relationships with regional corporate entities and technology firms, and strong representation at national hackathons, innovation competitions and computer-science symposiums." },
    ],
  },
  {
    slug: "constitution-what-members-should-know",
    title: "Our Constitution and Bylaws: what every member should know",
    excerpt:
      "Eligibility, rights, responsibilities, how decisions get made and how the committee is elected — the essentials of the club’s eighteen-article constitution.",
    category: "Club Updates",
    date: "2026-09-13",
    author: { name: "Sadikshya Rijal", role: "Vice President" },
    readingTime: "5 min read",
    tags: ["constitution", "membership", "governance"],
    content: [
      { type: "p", text: "The Club Constitution and Bylaws set out how the Tech & AI Innovation Club operates as a student-led, non-profit academic and technical club within, and under the authority of, Tech AI College of Management & Law. Here are the parts members ask about most." },
      { type: "h2", text: "Who can join" },
      { type: "p", text: "Any student enrolled in good standing at the college. You submit the official membership / intake form, select up to two primary departments, and your membership becomes active once the Executive Committee accepts the form." },
      { type: "h2", text: "Your rights" },
      { type: "ul", items: [
        "Participate in workshops, projects, events and activities.",
        "Access shared learning resources and departmental project cycles.",
        "Vote in the selection / election of the Executive Committee and stand for positions, subject to eligibility.",
        "Receive recognition, certificates and portfolio credit for contributions, where applicable.",
      ] },
      { type: "h2", text: "Your responsibilities" },
      { type: "ul", items: [
        "Attend the mandatory bi-weekly assemblies.",
        "Contribute to at least one departmental project delivery cycle per semester.",
        "Abide by the Constitution, the Code of Conduct and all college rules and policies.",
      ] },
      { type: "h2", text: "How decisions are made" },
      { type: "p", text: "By consensus wherever possible; otherwise by a simple majority of members present and voting, with the President or Chair casting the deciding vote in a tie. Major inter-departmental initiatives need the President’s approval, and anything touching institutional policy needs the Faculty Advisor’s clearance." },
      { type: "p", text: "Read the full text on the Constitution page or download the signed PDF from the Resource Center." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
