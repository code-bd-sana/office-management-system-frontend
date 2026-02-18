import type { DcrReviewMember, DcrViewDetails } from "@/types/dcr-review";

export const DCR_REVIEW_DESCRIPTION =
  "Lorem ipsum dolor sit amet consectetur. Volutpat a hendrerit sed dui netus aliquam fermentum placerat. Tempus scelerisque donec blandit lectus urna proin cursus.";

export const DEMO_DCR_REVIEW_MEMBERS: DcrReviewMember[] = [
  {
    id: "1",
    name: "Mahin R.",
    designation: "Full-stack Developer",
    shift: "Morning shift",
    shiftTime: "(8 AM - 4 PM)",
    taskPending: "Completed",
    dcrSubmission: "Submitted DCR",
    attendance: "Check In",
  },
  {
    id: "2",
    name: "Mahin R.",
    designation: "UI/UX Designer",
    shift: "Morning shift",
    shiftTime: "(8 AM - 4 PM)",
    taskPending: "Completed",
    dcrSubmission: "Submitted DCR",
    attendance: "Check In",
  },
  {
    id: "3",
    name: "Mahin R.",
    designation: "Graphic Designer",
    shift: "Morning shift",
    shiftTime: "(8 AM - 4 PM)",
    taskPending: "Completed",
    dcrSubmission: "Submitted DCR",
    attendance: "Check In",
  },
  {
    id: "4",
    name: "Mahin R.",
    designation: "Web Developer",
    shift: "Morning shift",
    shiftTime: "(8 AM - 4 PM)",
    taskPending: "Completed",
    dcrSubmission: "Submitted DCR",
    attendance: "Check In",
  },
  {
    id: "5",
    name: "Mahin R.",
    designation: "Web Developer",
    shift: "Morning shift",
    shiftTime: "(8 AM - 4 PM)",
    taskPending: "Completed",
    dcrSubmission: "Submitted DCR",
    attendance: "Check In",
  },
  {
    id: "6",
    name: "Mahin R.",
    designation: "Graphic Designer",
    shift: "Morning shift",
    shiftTime: "(8 AM - 4 PM)",
    taskPending: "Completed",
    dcrSubmission: "Submitted DCR",
    attendance: "Check In",
  },
  {
    id: "7",
    name: "Mahin R.",
    designation: "Web Developer",
    shift: "Morning shift",
    shiftTime: "(8 AM - 4 PM)",
    taskPending: "Completed",
    dcrSubmission: "Submitted DCR",
    attendance: "Check In",
  },
  {
    id: "8",
    name: "Mahin R.",
    designation: "Graphic Designer",
    shift: "Morning shift",
    shiftTime: "(8 AM - 4 PM)",
    taskPending: "Completed",
    dcrSubmission: "Submitted DCR",
    attendance: "Check In",
  },
  {
    id: "9",
    name: "Mahin R.",
    designation: "Full-stack Developer",
    shift: "Morning shift",
    shiftTime: "(8 AM - 4 PM)",
    taskPending: "Completed",
    dcrSubmission: "Submitted DCR",
    attendance: "Check In",
  },
  {
    id: "10",
    name: "Mahin R.",
    designation: "UI/UX Designer",
    shift: "Morning shift",
    shiftTime: "(8 AM - 4 PM)",
    taskPending: "Completed",
    dcrSubmission: "Submitted DCR",
    attendance: "Check In",
  },
];

export const DCR_REVIEW_TABLE_COLUMNS = [
  "#",
  "MEMBER",
  "DESIGNATION",
  "SHIFT",
  "TASK PENDING",
  "DCR SUBMISSION",
  "ATTENDANCE",
  "ACTION",
] as const;

export const DCR_REVIEW_ROLES = [
  { value: "all", label: "All Roles" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "manager", label: "Manager" },
] as const;

export const DCR_REVIEW_TOTAL_RECORDS = 97;

// ---------------------------------------------------------------------------
// View Details demo data
// ---------------------------------------------------------------------------

export const DEMO_DCR_VIEW_DETAILS: DcrViewDetails = {
  memberId: "1",
  memberName: "Robbi Darwis",
  employeeId: "Op 1033",
  tasks: [
    {
      id: "1",
      task: "Lorem ipsum dolor sit amet consectetur. Facilisis egestas enim mattis est.",
      orderId: "FO62F64434748",
      client: "Ann Culhane",
      profile: "Code_bd",
      value: "$270.00",
    },
    {
      id: "2",
      task: "Lorem ipsum dolor sit amet consectetur. Facilisis egestas enim mattis est.",
      orderId: "FO62F64434748",
      client: "Ann Culhane",
      profile: "Code_bd",
      value: "$270.00",
    },
    {
      id: "3",
      task: "Lorem ipsum dolor sit amet consectetur. Facilisis egestas enim mattis est.",
      orderId: "FO62F64434748",
      client: "Ann Culhane",
      profile: "Code_bd",
      value: "$270.00",
    },
    {
      id: "4",
      task: "Lorem ipsum dolor sit amet consectetur. Facilisis egestas enim mattis est.",
      orderId: "FO62F64434748",
      client: "Ann Culhane",
      profile: "Code_bd",
      value: "$270.00",
    },
    {
      id: "5",
      task: "Lorem ipsum dolor sit amet consectetur. Facilisis egestas enim mattis est.",
      orderId: "FO62F64434748",
      client: "Ann Culhane",
      profile: "Code_bd",
      value: "$270.00",
    },
    {
      id: "6",
      task: "Lorem ipsum dolor sit amet consectetur. Facilisis egestas enim mattis est.",
      orderId: "FO62F64434748",
      client: "Ann Culhane",
      profile: "Code_bd",
      value: "$270.00",
    },
  ],
  attachments: [
    {
      id: "1",
      fileName: "DCR Report.pdf",
      fileSize: "1.2 MB",
      fileUrl: "#",
    },
  ],
  feedback: {
    id: "1",
    content:
      "Lorem ipsum dolor sit amet consectetur. Fames sagittis metus iaculis adipiscing egestas arcu amet mi mauris. Vitae aliquet scelerisque sit vestibulum in a sed. Eu interdum quis imperdiet amet nulla lobortis interdum. Magna pellentesque vulputate ac est lorem leo. Erat ultricies consectetur tortor elit. Nunc placerat neque amet fermentum porta commodo. Mi vitae congue dui nisi sem. Bibendum sit arcu curabitur urna. Velit congue sed ultricies nunc.",
    timeAgo: "5 minutes ago",
  },
};

export const DCR_VIEW_DETAILS_TABLE_COLUMNS = [
  "#",
  "TASK",
  "ORDER ID",
  "CLIENT",
  "PROFILE",
  "VALUE",
] as const;
