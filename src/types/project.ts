/** Possible statuses for a project */
export type ProjectStatus = "running" | "new-assigned" | "delivered";

/** A single project item */
export interface Project {
  id: string;
  projectName: string;
  client: string;
  orderId: string;
  profile: string;
  projectFile: string;
  projectFileUrl: string;
  status: ProjectStatus;
}

/** Filter tab for the project list */
export interface ProjectFilterTab {
  label: string;
  value: ProjectStatus | "all";
  count: number;
}
