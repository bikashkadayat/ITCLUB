export interface TimelineItem {
  id: string;
  date: string;
  label: string;
  title: string;
  description: string;
  status: "done" | "current" | "upcoming";
  details?: string[];
}

/** Club establishment journey, sourced from the founding documents. */
export const timeline: TimelineItem[] = [
  {
    id: "concept",
    date: "2026-09",
    label: "Concept",
    title: "The idea takes shape",
    description:
      "Students identify the gap between theory-heavy curricula and hands-on industry practice, and draft the concept for a professional, student-led technical club spanning AI, software, security, problem solving and digital media.",
    status: "done",
    details: [
      "Proposal prepared by Bikash Kadayat, Second Semester, BSc CSIT (Data Vision)",
      "Six functional departments defined",
      "Weekly / monthly / semester cadence designed",
    ],
  },
  {
    id: "founding-meeting",
    date: "2026-09-13",
    label: "Founding Meeting",
    title: "Founding meeting held at Tech AI College",
    description:
      "At 08:30 PM on 13 September 2026, seven founding participants met under Chairperson Sunil Babu Adhikari, reviewed the proposal and unanimously resolved to establish the club.",
    status: "done",
    details: [
      "Vision, mission, objectives and departments discussed",
      "Requirement to operate within college rules affirmed",
      "Minutes recorded by Sambridhi Subedi",
    ],
  },
  {
    id: "committee",
    date: "2026-09-13",
    label: "Executive Committee",
    title: "Initial Executive Committee formed",
    description:
      "Seven positions filled: President, Vice President, Secretary, IT / Technical Coordinator, Event / Program Coordinator, Public Relations / Communication Officer and Faculty Advisor / Mentor.",
    status: "done",
    details: [
      "Certified by President Bikash Kadayat",
      "Faculty Advisor / Mentor Suman Karki confirmed, subject to written consent",
    ],
  },
  {
    id: "constitution",
    date: "2026-09-13",
    label: "Constitution",
    title: "Constitution & Bylaws adopted",
    description:
      "An eighteen-article constitution defines the club’s status, membership, governance, meetings, decision making, finances, code of conduct and amendment process.",
    status: "done",
    details: ["Takes effect upon approval by the college administration"],
  },
  {
    id: "application",
    date: "2026-09-13",
    label: "Application",
    title: "Official establishment application submitted",
    description:
      "The application, detailed proposal, constitution, committee formation document, founding members list, faculty advisor consent, meeting minutes, annual action plan and budget are submitted to the Principal / Campus Chief.",
    status: "current",
    details: ["Proposed by Bikash Kadayat", "On behalf of the founding members: Sadikshya Rijal"],
  },
  {
    id: "recognition",
    date: "Pending",
    label: "Recognition",
    title: "Formal recognition by the college",
    description:
      "Approval by Tech AI College of Management & Law formally establishes the club as an official student organisation of the college.",
    status: "upcoming",
  },
  {
    id: "intake",
    date: "Next",
    label: "Member Intake",
    title: "Open registration and first departmental cycles",
    description:
      "Students in good standing submit the membership form, pick up to two departments, and the weekly departmental cadence begins.",
    status: "upcoming",
  },
  {
    id: "showcase",
    date: "Semester",
    label: "Showcase",
    title: "First semester showcase",
    description:
      "Inter-collegiate hackathon, public technology exhibition, peer-reviewed project publications and technical team performance awards.",
    status: "upcoming",
  },
];
