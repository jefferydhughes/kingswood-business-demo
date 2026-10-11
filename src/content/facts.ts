/**
 * Published facts used on the School of Business landing page.
 * Per README guardrails, every fact carries an owner, a source, and a review date.
 * Owner is unassigned until Kingswood Finance or Admissions confirms it.
 */
export type Fact = {
  label: string;
  value: string;
  source: string;
  retrieved: string;
  owner: string;
  note?: string;
};

const SOURCE = "kingswood.edu/?p=190 (Affordable Education)";
const RETRIEVED = "2026-10-11";
const OWNER = "Unassigned: confirm with Finance or Admissions";

export const costFacts: Fact[] = [
  {
    label: "Tuition, full-time on campus",
    value: "$11,990 a year",
    source: SOURCE,
    retrieved: RETRIEVED,
    owner: OWNER,
    note: "Flat rate for 12 to 16 credit hours per semester ($5,995 a semester). Academic year not stated on the source page.",
  },
  {
    label: "Average on-campus cost",
    value: "$22,385 a year",
    source: SOURCE,
    retrieved: RETRIEVED,
    owner: OWNER,
    note: "Tuition, room, and meals, before scholarships and grants. Excludes a one-time $520 resource fee.",
  },
  {
    label: "Students receiving aid",
    value: "Over 91%",
    source: SOURCE,
    retrieved: RETRIEVED,
    owner: OWNER,
    note: "Stated by Kingswood: the average scholarship is nearly 30% of tuition.",
  },
  {
    label: "Room, standard double",
    value: "$3,390 a year",
    source: SOURCE,
    retrieved: RETRIEVED,
    owner: OWNER,
    note: "Standard single room is $4,578 a year, subject to availability.",
  },
  {
    label: "Meal plans",
    value: "$5,860 to $6,205 a year",
    source: SOURCE,
    retrieved: RETRIEVED,
    owner: OWNER,
    note: "14 or 21 meals a week. A 5-meal noon plan is $1,851 a year.",
  },
];

export const costSourceLine = `Figures from ${SOURCE}, retrieved ${RETRIEVED}.`;
