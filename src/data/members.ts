/**
 * General members of the Tech & AI Innovation Club, as supplied by the club.
 * Executive Committee members are listed in committee.ts and are not repeated here.
 *
 * Only name, program and semester are published — no contact or application details.
 */

export interface ClubMember {
  name: string;
  program: string;
  semester?: string;
}

export const memberCountLabel = "18+";

export const members: ClubMember[] = [
  { name: "Kshitiz Shrestha", program: "BSc CSIT", semester: "2nd Semester" },
  { name: "Roshan Rai", program: "BSc CSIT", semester: "1st Semester" },
  { name: "Tapendra Pariyar", program: "Cybersecurity" },
  { name: "Prinsa Bharati", program: "BSc CSIT", semester: "1st Semester" },
  { name: "Suman Kumar Kushwaha", program: "BSc CSIT", semester: "1st Semester" },
  { name: "Shreekant Mahato", program: "BSc CSIT", semester: "1st Semester" },
  { name: "Kushal Das", program: "BSc CSIT", semester: "1st Semester" },
  { name: "Rojina Thapa", program: "BCA", semester: "1st Semester" },
  { name: "Nirajan Bhandari", program: "BCA" },
  { name: "Ashish Karki", program: "BCA", semester: "1st Semester" },
  { name: "Aarati Bohara", program: "BSc CSIT", semester: "1st Semester" },
  { name: "Roselyn Ojha", program: "BCA", semester: "1st Semester" },
  { name: "Rachana Mahatara", program: "BCA", semester: "1st Semester" },
  { name: "Ganesh Khadayat", program: "BCA", semester: "1st Semester" },
  { name: "Sagar Sedai", program: "BCA" },
  { name: "Suresh Singh Khati", program: "BSc CSIT", semester: "2nd Semester" },
  { name: "Pradip Pandey", program: "BSc CSIT", semester: "2nd Semester" },
];
