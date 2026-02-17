export interface TeamMember {
  id: string;
  rowNumber: number;
  name: string;
  avatar?: string;
  designation: string;
  totalProjects: number;
  completedProjects: number;
}

export type TeamMemberRole = "all" | "developer" | "designer" | "manager";

export interface TeamMemberFilter {
  role: TeamMemberRole;
  searchQuery: string;
}
