import type { DcrReviewMember } from "@/types/dcr-review";

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
