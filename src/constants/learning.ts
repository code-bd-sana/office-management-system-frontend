import type { LearningRecord } from "@/types/learning";

export const LEARNING_DESCRIPTION =
  "Access and manage all training materials, educational resources, and professional development content. Browse through topics, download files, and stay up to date with the latest learning opportunities shared by your team.";

export const DEMO_LEARNING_RECORDS: LearningRecord[] = [
  {
    id: "1",
    rowNumber: 1,
    topicTitle: "Website Redesign",
    category: "Ann Culhane",
    uploadedBy: "Rafiul Islam Refat",
    fileName: "Python_Advanced.pdf",
    fileUrl: "#",
    uploadDate: "Jan 25, 2026",
  },
  {
    id: "2",
    rowNumber: 2,
    topicTitle: "E-Commerce Redesigned",
    category: "Ann Culhane",
    uploadedBy: "Asif Ahmed",
    fileName: "Full_Stack_Dev.zip",
    fileUrl: "#",
    uploadDate: "Jan 25, 2026",
  },
  {
    id: "3",
    rowNumber: 3,
    topicTitle: "E-Commerce Redesigned",
    category: "Ann Culhane",
    uploadedBy: "Raju Mia",
    fileName: "Data_Structures.zip",
    fileUrl: "#",
    uploadDate: "Jan 25, 2026",
  },
  {
    id: "4",
    rowNumber: 4,
    topicTitle: "Website Redesign",
    category: "Ann Culhane",
    uploadedBy: "Rafiul Islam Refat",
    fileName: "Python_Advanced.pdf",
    fileUrl: "#",
    uploadDate: "Jan 25, 2026",
  },
  {
    id: "5",
    rowNumber: 5,
    topicTitle: "Website Redesign",
    category: "Ann Culhane",
    uploadedBy: "Asif Ahmed",
    fileName: "AI_ML_Introduction.pdf",
    fileUrl: "#",
    uploadDate: "Jan 25, 2026",
  },
  {
    id: "7",
    rowNumber: 7,
    topicTitle: "E-Commerce Redesigned",
    category: "Ann Culhane",
    uploadedBy: "Raju Mia",
    fileName: "Cloud_Computing_AWS.zip",
    fileUrl: "#",
    uploadDate: "Jan 25, 2026",
  },
];

export const LEARNING_TABLE_COLUMNS = [
  "#",
  "Topic Title",
  "Category",
  "Uploaded By",
  "File Name",
  "Upload Date",
  "Status",
] as const;

export const LEARNING_ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export const LEARNING_TOTAL_RECORDS = 97;
