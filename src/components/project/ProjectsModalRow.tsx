import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Project, ProjectStatus } from "@/types/project";

interface ProjectsModalRowProps {
  project: Project;
  rowNumber: number;
}

const STATUS_STYLES: Record<
  ProjectStatus,
  { bg: string; text: string; label: string }
> = {
  running: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "Running",
  },
  "new-assigned": {
    bg: "bg-orange-100",
    text: "text-orange-700",
    label: "New Assigned",
  },
  delivered: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Delivered",
  },
};

export function ProjectsModalRow({
  project,
  rowNumber,
}: ProjectsModalRowProps) {
  const statusStyle = STATUS_STYLES[project.status];

  return (
    <TableRow className="border-b border-border/40 hover:bg-muted/30">
      <TableCell className="py-3.5 pl-5">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300"
          aria-label={`Select project ${rowNumber}`}
        />
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm font-medium text-foreground/70">
        {rowNumber}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm font-semibold text-foreground">
        {project.projectName}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {project.client}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {project.orderId}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {project.profile}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm">
        <Link
          href={project.projectFileUrl}
          className="font-medium text-brand-navy underline underline-offset-2 hover:text-brand-navy-dark"
        >
          {project.projectFile}
        </Link>
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5">
        <span
          className={`inline-block rounded-sm px-2.5 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
        >
          {statusStyle.label}
        </span>
      </TableCell>
    </TableRow>
  );
}
