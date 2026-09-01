export type TrainingLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface Training {
  _id: string;
  title: string;
  description?: string;
  note?: string;
  resourceLink: string;
  provider?: string;
  category?: string;
  level?: TrainingLevel;
  durationMinutes?: number;
  language?: string;
  thumbnail?: string;
  tags?: string[];
  isPublished: boolean;
  isActive: boolean;
  expiresAt?: string;
  createdBy: unknown;
  createdAt: string;
  updatedAt: string;
}

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
