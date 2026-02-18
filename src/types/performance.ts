export interface PerformanceMember {
  id: string;
  name: string;
  avatar?: string;
  designation: string;
  totalProjects: number;
  wip: number;
  delivered: number;
  pending: number;
  avgRating: string;
}
