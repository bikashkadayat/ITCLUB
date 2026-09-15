/** Club Constitution and Bylaws — Tech & AI Innovation Club (Document 3). */

export interface ConstitutionArticle {
  number: number;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  numbered?: string[];
  sections?: { title: string; bullets: string[] }[];
}

export const constitution: ConstitutionArticle[] = [
  {
    number: 1,
    title: "Name",
    paragraphs: [
      "The official name of the organization shall be the “Tech & AI Innovation Club” (hereinafter referred to as “the Club”), established at Tech AI College of Management & Law, New Baneshwor, Kathmandu, Nepal.",
    ],
  },
  {
    number: 2,
    title: "Status and Nature",
    paragraphs: [
      "The Club is a student-led, non-profit academic and technical club operating within, and under the authority of, Tech AI College of Management & Law. It is not an independent legal entity separate from the college. The Club functions under the supervision of a Faculty Advisor / Mentor and with the clearance of the college administration.",
    ],
  },
  {
    number: 3,
    title: "Vision",
    paragraphs: [
      "To architect a resilient, industry-aligned ecosystem of technical excellence, continuous innovation, and strategic leadership within Tech AI College of Management & Law, empowering students to build high-impact technological solutions for real-world complexities.",
    ],
  },
  {
    number: 4,
    title: "Mission",
    bullets: [
      "To equip students with functional, hands-on competency in state-of-the-art software systems and artificial intelligence frameworks.",
      "To nurture institutional research capacities and promote end-to-end, agile, project-based development workflows.",
      "To harden technical problem-solving capabilities, computational thinking, and advanced structural reasoning.",
      "To proactively clear pathways for high-tier corporate internships, technology employment, and entrepreneurial ventures.",
      "To unify management, law, and computer-science faculties through collaborative technical project execution.",
    ],
  },
  {
    number: 5,
    title: "Objectives",
    numbered: [
      "Build practical competency in modern software systems and AI frameworks.",
      "Promote research capacity and agile, project-based development workflows.",
      "Strengthen problem-solving, computational thinking, and structural reasoning.",
      "Open pathways to internships, technology employment, and entrepreneurship.",
      "Unify management, law, and computer-science students through collaborative projects.",
      "Support the creation of production-grade codebases and public developer portfolios.",
    ],
  },
  {
    number: 6,
    title: "Membership",
    sections: [
      {
        title: "6.1 Eligibility",
        bullets: [
          "Any student enrolled in good standing at Tech AI College of Management & Law is eligible to become a member.",
        ],
      },
      {
        title: "6.2 Membership Process",
        bullets: [
          "An eligible student submits the official membership / intake form (Document 10).",
          "The member selects up to two primary departments aligned with their learning tracks or engineering interests.",
          "Membership becomes active upon acceptance of the form by the Executive Committee.",
        ],
      },
      {
        title: "6.3 Rights of Members",
        bullets: [
          "Participate in the Club’s workshops, projects, events, and activities.",
          "Access shared learning resources and departmental project cycles.",
          "Vote in the selection / election of the Executive Committee and stand for positions, subject to eligibility.",
          "Receive recognition, certificates, and portfolio credit for contributions, where applicable.",
        ],
      },
      {
        title: "6.4 Responsibilities of Members",
        bullets: [
          "Attend the mandatory bi-weekly assemblies.",
          "Contribute to at least one departmental project delivery cycle per semester.",
          "Abide by this Constitution, the Code of Conduct, and all college rules and policies.",
        ],
      },
      {
        title: "6.5 Resignation and Termination",
        bullets: [
          "A member may resign at any time by written notice to the Secretary.",
          "Membership may lapse if a member fails to meet the engagement-compliance requirement without valid reason.",
          "Membership may be terminated for serious or repeated violation of the Code of Conduct or college policies, following due process and with the Faculty Advisor’s knowledge.",
        ],
      },
    ],
  },
  {
    number: 7,
    title: "Executive Committee",
    paragraphs: ["The Club shall be governed by an Executive Committee comprising the following positions:"],
    numbered: [
      "President",
      "Vice President",
      "Secretary",
      "IT / Technical Coordinator",
      "Event / Program Coordinator",
      "Public Relations / Communication Officer",
      "Faculty Advisor / Mentor",
    ],
    bullets: [
      "The six functional departments (AI & Data Science; Software Development; Cyber Security; Programming & Problem Solving; Media & Outreach; Events & Partnership) each operate under a Department Lead, an Assistant Lead, and Technical Associates / Members, and function under the technical oversight of the IT/Technical Coordinator.",
    ],
  },
  {
    number: 8,
    title: "Roles and Responsibilities",
    sections: [
      { title: "President", bullets: ["Holds overall executive accountability for the club’s performance. Sets the club’s direction, chairs general assemblies, approves major inter-departmental initiatives, represents the club to external bodies and the college administration, and oversees the overall health of the executive team."] },
      { title: "Vice President", bullets: ["Manages internal operations and coordinates between technical branches. Drives strategic execution planning, acts for the President during their absence, removes operational blockers, and tracks departmental milestones."] },
      { title: "Secretary", bullets: ["Maintains the club’s official records and documentation. Keeps accurate meeting minutes, publishes schedules, processes member status reports, operates internal communication channels, and maintains the club’s financial records and expense ledger under the President’s authorization and the Faculty Advisor’s oversight."] },
      { title: "IT / Technical Coordinator", bullets: ["Oversees technical standards, technology stacks, and quality controls across the engineering departments. Approves codebase patterns and conventions, coordinates training curricula across departments, ensures industry alignment, and manages deployment lifecycles for the club’s internal software assets."] },
      { title: "Event / Program Coordinator", bullets: ["Plans and coordinates the club’s events end-to-end — workshops, bootcamps, hackathons, seminars, exhibitions, and site visits. Manages venue scheduling, event logistics, and coordination with the Events & Partnership department and external partners."] },
      { title: "Public Relations / Communication Officer", bullets: ["Manages the club’s public image and communication. Oversees social channels and growth, maintains brand-standard content, produces multimedia coverage of events, and runs project-launch media campaigns and outreach."] },
      { title: "Faculty Advisor / Mentor", bullets: ["Serves as the primary link between the student body and college administration. Provides strategic guidance, ensures all initiatives comply with institutional policies, reviews compliance, and leverages professional networks to open institutional and corporate channels."] },
    ],
  },
  {
    number: 9,
    title: "Meetings",
    bullets: [
      "Weekly departmental meetings: sub-group meetings, technical workshops, and collaborative builds.",
      "Bi-weekly member assemblies: mandatory for active members, for updates and coordination.",
      "Monthly general assembly: cross-department meeting, masterclasses, and mid-tier project reviews.",
      "Semester showcases: large-scale events, exhibitions, and performance awards.",
      "Executive Committee meetings: held monthly or as required; a simple majority of the Executive Committee constitutes a quorum.",
    ],
  },
  {
    number: 10,
    title: "Decision Making",
    bullets: [
      "Decisions are made by consensus wherever possible.",
      "Where consensus is not reached, decisions are taken by a simple majority of the members present and voting.",
      "In the event of a tie, the President (or the Chair of the meeting) casts the deciding vote.",
      "Major inter-departmental initiatives require the President’s approval; initiatives touching institutional policy require the Faculty Advisor’s clearance.",
    ],
  },
  {
    number: 11,
    title: "Selection / Election of Executive Committee",
    bullets: [
      "The initial Executive Committee is formed by the founding members and recorded in the Executive Committee Formation Document.",
      "Subsequent Executive Committees are selected / elected by the active members through nomination followed by a vote.",
      "The Faculty Advisor oversees the process, and the outcome is submitted to the college administration for clearance.",
      "The Faculty Advisor / Mentor is appointed by, or with the approval of, the college administration and is not elected by members.",
    ],
  },
  {
    number: 12,
    title: "Term of Office",
    paragraphs: [
      "The term of office for the Executive Committee shall be two academic years, renewable for one additional term through re-selection / re-election, subject to college policy. A position falling vacant mid-term may be filled by the Executive Committee for the remainder of the term, with the Faculty Advisor’s knowledge.",
    ],
  },
  {
    number: 13,
    title: "Financial Management",
    bullets: [
      "The Club operates on a lean model, relying on open-source tools and existing college infrastructure.",
      "Funding is sourced through institutional support, corporate underwriting / sponsorships, and nominal event registrations.",
      "The Secretary maintains the financial records and expense ledger under the President’s authorization and the Faculty Advisor’s oversight.",
      "All expenditure must be documented, transparent, and approved in accordance with this Constitution and college financial procedures.",
      "Financial / audit reports are presented to the college financial administrators as required.",
    ],
  },
  {
    number: 14,
    title: "Code of Conduct",
    paragraphs: [
      "All members and office-bearers are bound by the Club’s Code of Conduct (Document 11), which requires respectful, non-discriminatory, and professional behaviour; responsible use of technology and social media; protection of college and club property; confidentiality where applicable; and compliance with college policies. Serious violations may result in disciplinary action, including termination of membership.",
    ],
  },
  {
    number: 15,
    title: "Official Communication",
    paragraphs: [
      "Official internal communication and records are managed by the Secretary. Official external communication, social media, and public content are managed by the Public Relations / Communication Officer, following brand-standard guidelines. All public communication representing the Club and college must be accurate, professional, and consistent with college policy.",
    ],
  },
  {
    number: 16,
    title: "Amendments",
    paragraphs: [
      "Amendments to this Constitution may be proposed by the Executive Committee or by a petition of members. A proposed amendment is adopted when approved by a majority of members present and voting at a general assembly and takes effect only after approval by the college administration.",
    ],
  },
  {
    number: 17,
    title: "Dissolution",
    paragraphs: [
      "If the Club is unable to function, or if directed by the college administration, it may be dissolved. Upon dissolution, all Club records, accounts, assets, and equipment shall be handed over to the college administration. Dissolution is overseen by the Faculty Advisor and the college administration.",
    ],
  },
  {
    number: 18,
    title: "Final Provision",
    paragraphs: [
      "The rules, regulations, and policies of Tech AI College of Management & Law take precedence over this Constitution wherever applicable. Any matter not covered by this Constitution shall be decided by the Executive Committee in consultation with the Faculty Advisor and, where necessary, the college administration. This Constitution takes effect upon approval by the college administration.",
    ],
  },
];
