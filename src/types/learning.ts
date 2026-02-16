/** A single learning & training record */
export interface LearningRecord {
  id: string;
  rowNumber: number;
  topicTitle: string;
  category: string;
  uploadedBy: string;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
}
