/**
 * Executive Committee of the Tech & AI Innovation Club.
 * Names, positions, bios and key responsibilities are provided by the club.
 * `responsibilities` is the formal wording from Article 8 of the Constitution.
 *
 * Personal contact numbers are intentionally NOT published. Add `photo` paths
 * (e.g. /images/team/bikash-kadayat.jpg) and `linkedin` URLs when available.
 */

export interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  shortPosition: string;
  program: string;
  isFaculty?: boolean;
  photo?: string;
  linkedin?: string;
  /** Short, human bio (2–3 sentences). */
  bio: string;
  /** Key responsibilities shown on the profile card. */
  duties: string[];
  /** Formal responsibilities from the Constitution (Article 8). */
  responsibilities: string;
  focus: string[];
}

export const committee: CommitteeMember[] = [
  {
    id: "bikash-kadayat",
    linkedin: "https://www.linkedin.com/in/bikash-kadayat-978852273/",
    photo: "/images/team/bikash-kadayat.jpg",
    name: "Bikash Kadayat",
    position: "President",
    shortPosition: "President",
    program: "BSc CSIT, 2nd Semester",
    bio: "Bikash Kadayat is the Founding President of the Tech & AI Innovation Club. He is passionate about technology, innovation, leadership, and student empowerment. His vision is to create a collaborative environment where students gain practical skills, work on real-world projects, and become future technology leaders.",
    duties: [
      "Provides overall leadership and strategic direction.",
      "Represents the Club before the college and external organizations.",
      "Approves major initiatives, projects, and events.",
      "Oversees the Executive Committee and departmental operations.",
      "Ensures alignment with the Club's vision and objectives.",
    ],
    responsibilities:
      "Holds overall executive accountability for the club’s performance. Sets the club’s direction, chairs general assemblies, approves major inter-departmental initiatives, represents the club to external bodies and the college administration, and oversees the overall health of the executive team.",
    focus: ["Direction & strategy", "General assemblies", "External representation"],
  },
  {
    id: "sadikshya-rijal",
    photo: "/images/team/sadikshya-rijal.jpg",
    name: "Sadikshya Rijal",
    position: "Vice President",
    shortPosition: "Vice President",
    program: "BSc CSIT, 4th Semester",
    bio: "Sadikshya serves as Vice President of the Tech & AI Innovation Club. She supports strategic planning and operational coordination while fostering teamwork, collaboration, and effective execution of club initiatives.",
    duties: [
      "Assists the President in overall management.",
      "Coordinates activities among departments.",
      "Oversees internal operations and project execution.",
      "Acts on behalf of the President when required.",
      "Monitors departmental progress and engagement.",
    ],
    responsibilities:
      "Manages internal operations and coordinates between technical branches. Drives strategic execution planning, acts for the President during their absence, removes operational blockers, and tracks departmental milestones.",
    focus: ["Internal operations", "Execution planning", "Departmental milestones"],
  },
  {
    id: "sambridhi-subedi",
    photo: "/images/team/sambridhi-subedi.jpg",
    name: "Sambridhi Subedi",
    position: "Secretary",
    shortPosition: "Secretary",
    program: "BSc CSIT, 2nd Semester",
    bio: "Sambridhi Subedi is responsible for maintaining the Club's official records and ensuring smooth communication across the organization. She plays a key role in administration and documentation.",
    duties: [
      "Maintains meeting minutes and official documents.",
      "Manages internal communications.",
      "Records member activities and reports.",
      "Maintains official records and schedules.",
      "Supports organizational transparency and coordination.",
    ],
    responsibilities:
      "Maintains the club’s official records and documentation. Keeps accurate meeting minutes, publishes schedules, processes member status reports, operates internal communication channels, and maintains the club’s financial records and expense ledger under the President’s authorization and the Faculty Advisor’s oversight.",
    focus: ["Records & minutes", "Schedules", "Financial ledger"],
  },
  {
    id: "nirmal-bk",
    linkedin: "https://www.linkedin.com/in/nirmal-bahadur-bk-346a613a9/",
    photo: "/images/team/nirmal-bk.jpg",
    name: "Nirmal B.K",
    position: "IT / Technical Coordinator",
    shortPosition: "Technical Coordinator",
    program: "BSc CSIT, 2nd Semester",
    bio: "Nirmal B.K leads the technical direction of the Club. He supports technology initiatives, promotes best practices, and helps members develop practical technical skills through projects and learning opportunities.",
    duties: [
      "Oversees technical standards and project quality.",
      "Coordinates technical training and workshops.",
      "Supports software development and innovation initiatives.",
      "Ensures projects follow industry best practices.",
      "Guides technical departments and members.",
    ],
    responsibilities:
      "Oversees technical standards, technology stacks, and quality controls across the engineering departments. Approves codebase patterns and conventions, coordinates training curricula across departments, ensures industry alignment, and manages deployment lifecycles for the club’s internal software assets.",
    focus: ["Technical standards", "Training curricula", "Deployment lifecycles"],
  },
  {
    id: "sanjita-shrestha",
    photo: "/images/team/sanjita-shrestha.jpg",
    name: "Sanjita Shrestha",
    position: "Event / Program Coordinator",
    shortPosition: "Event Coordinator",
    program: "BSc CSIT, 2nd Semester",
    bio: "Sanjita Shrestha manages and coordinates the Club's events and programs. She works to create engaging learning opportunities through workshops, seminars, competitions, and collaborative activities.",
    duties: [
      "Plans and manages club events.",
      "Coordinates workshops, bootcamps, and hackathons.",
      "Handles event logistics and scheduling.",
      "Collaborates with partners and guest speakers.",
      "Ensures successful execution of club activities.",
    ],
    responsibilities:
      "Plans and coordinates the club’s events end-to-end — workshops, bootcamps, hackathons, seminars, exhibitions, and site visits. Manages venue scheduling, event logistics, and coordination with the Events & Partnership department and external partners.",
    focus: ["Workshops & hackathons", "Venue & logistics", "Partner coordination"],
  },
  {
    id: "jenisha-basnet",
    photo: "/images/team/jenisha-basnet.jpg",
    name: "Jenisha Basnet",
    position: "Public Relations & Communication Officer",
    shortPosition: "PR Officer",
    program: "BCA, 2nd Semester",
    bio: "Jenisha Basnet is responsible for the Club's public image and communications. She supports branding, outreach, content creation, and community engagement initiatives.",
    duties: [
      "Manages social media and public communication.",
      "Promotes club activities and achievements.",
      "Creates marketing and branding content.",
      "Coordinates media and outreach campaigns.",
      "Strengthens community engagement and visibility.",
    ],
    responsibilities:
      "Manages the club’s public image and communication. Oversees social channels and growth, maintains brand-standard content, produces multimedia coverage of events, and runs project-launch media campaigns and outreach.",
    focus: ["Public image", "Social channels", "Media campaigns"],
  },
  {
    id: "suman-karki",
    name: "Suman Karki",
    position: "Faculty Advisor / Mentor",
    shortPosition: "Faculty Advisor",
    program: "Faculty, Tech AI College of Management & Law",
    isFaculty: true,
    bio: "Suman Karki serves as the Faculty Advisor and Mentor of the Tech & AI Innovation Club. He provides strategic guidance, institutional support, and mentorship to ensure the Club's growth and alignment with college policies and objectives.",
    duties: [
      "Provides strategic guidance and mentorship.",
      "Supports executive decision-making.",
      "Ensures compliance with college policies.",
      "Connects students with academic and professional opportunities.",
      "Facilitates collaboration between the Club and the college administration.",
    ],
    responsibilities:
      "Serves as the primary link between the student body and college administration. Provides strategic guidance, ensures all initiatives comply with institutional policies, reviews compliance, and leverages professional networks to open institutional and corporate channels.",
    focus: ["Strategic guidance", "Policy compliance", "Institutional & corporate channels"],
  },
];

export const studentCommittee = committee.filter((m) => !m.isFaculty);
export const facultyAdvisor = committee.find((m) => m.isFaculty)!;

/** Founding meeting chairperson (Founding Meeting Minutes) */
export const foundingChairperson = "Sunil Babu Adhikari";

export const leadershipTagline =
  "Meet the passionate student leaders and mentor dedicated to fostering innovation, collaboration, and real-world learning opportunities for every member of the Tech & AI Innovation Club.";

export const governance = {
  termOfOffice:
    "The term of office for the Executive Committee is two academic years, renewable for one additional term through re-selection / re-election, subject to college policy.",
  election:
    "Subsequent Executive Committees are selected / elected by the active members through nomination followed by a vote. The Faculty Advisor oversees the process, and the outcome is submitted to the college administration for clearance.",
  quorum: "Executive Committee meetings are held monthly or as required; a simple majority of the Executive Committee constitutes a quorum.",
};
