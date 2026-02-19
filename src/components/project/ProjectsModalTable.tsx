"use client";

import { ModalTable, type ColumnDef } from "@/components/shared";
import { ProjectsModalRow } from "./ProjectsModalRow";
import { DEMO_PROJECTS, PROJECT_FILTER_TABS } from "@/constants/project";
import type { Project, ProjectStatus } from "@/types/project";

const TOTAL_RECORDS = 97;

const COLUMNS: ColumnDef[] = [
  { key: "number", label: "#" },
  { key: "project", label: "Project" },
  { key: "client", label: "Client" },
  { key: "orderId", label: "Order ID" },
  { key: "profile", label: "Profile" },
  { key: "projectFile", label: "Project File" },
  { key: "status", label: "Status" },
];

export function ProjectsModalTable() {
  const handleFilterData = (
    data: Project[],
    filter: ProjectStatus | "all",
    search: string
  ): Project[] => {
    return data.filter((project) => {
      const matchesFilter = filter === "all" || project.status === filter;
      const matchesSearch = project.projectName.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  };

  return (
    <ModalTable<Project, ProjectStatus | "all">
      data={DEMO_PROJECTS}
      columns={COLUMNS}
      totalRecords={TOTAL_RECORDS}
      filterTabs={PROJECT_FILTER_TABS}
      defaultFilter="all"
      onFilterData={handleFilterData}
      enableSearch={true}
      searchPlaceholder="Search..."
      renderRow={(project, index) => (
        <ProjectsModalRow key={project.id} project={project} rowNumber={index + 1} />
      )}
      enableCheckboxes={true}
      rowsPerPageOptions={[10, 20, 50, 100]}
      defaultRowsPerPage={10}
    />
  );
}
