import { Eye, Edit2, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Project, ProjectStatus } from "@/types/project";

interface ProjectsModalRowProps {
  project: Project;
  rowNumber: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

/* ── Status badge config ────────────────────────────────────── */
const STATUS_CONFIG: Record<
  ProjectStatus,
  { bg: string; text: string; label: string }
> = {
  NULL:      { bg: "bg-gray-100",   text: "text-gray-600",   label: "Not Set"   },
  NRA:       { bg: "bg-orange-100", text: "text-orange-700", label: "NRA"       },
  WIP:       { bg: "bg-blue-100",   text: "text-blue-700",   label: "WIP"       },
  DELIVERED: { bg: "bg-green-100",  text: "text-green-700",  label: "Delivered" },
  CANCELLED: { bg: "bg-red-100",    text: "text-red-700",    label: "Cancelled" },
  REVISION:  { bg: "bg-yellow-100", text: "text-yellow-700", label: "Revision"  },
};

/* ── Helpers ────────────────────────────────────────────────── */
function resolveName(
  field: { _id: string; name: string } | string | null | undefined
): string {
  if (!field) return "—";
  if (typeof field === "string") return field;
  return field.name || "—";
}

export function ProjectsModalRow({
  project,
  rowNumber,
  onView,
  onEdit,
  onDelete,
  hideEditAndDelete = false,
}: ProjectsModalRowProps & { hideEditAndDelete?: boolean }) {
  const statusCfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG["NULL"];
  return (
    <TableRow className="border-b border-border/40 hover:bg-muted/30">
      {/* # */}
      <TableCell className="whitespace-nowrap py-3.5 text-sm font-medium text-foreground/70">
        {rowNumber}
      </TableCell>

      {/* Project Name */}
      <TableCell className="py-3.5 text-sm font-semibold text-foreground">
        <div className="max-w-50 truncate">{project.name}</div>
        {project.orderId && (
          <div className="text-xs font-normal text-muted-foreground">
            {project.orderId}
          </div>
        )}
      </TableCell>

      {/* Client */}
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {resolveName(project.client)}
      </TableCell>

      {/* Order ID */}
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {project.orderId || "—"}
      </TableCell>

      {/* Profile */}
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {resolveName(project.profile)}
      </TableCell>

      {/* Value */}
      <TableCell className="py-3.5 text-sm font-medium text-foreground/80">
        {project.value != null ? `$${project.value}` : "—"}
      </TableCell>

      {/* Status */}
      <TableCell className="whitespace-nowrap py-3.5">
        <span
          className={`inline-block w-24 rounded-sm px-2.5 py-1 text-center text-xs font-semibold ${statusCfg.bg} ${statusCfg.text}`}
        >
          {statusCfg.label}
        </span>
      </TableCell>

      {/* Actions */}
      <TableCell className="whitespace-nowrap py-3.5 pl-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <button
            onClick={onView}
            className="text-brand-navy hover:text-brand-navy-dark transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          {!hideEditAndDelete && (
            <>
              <button
                onClick={onEdit}
                className="text-orange-500 hover:text-orange-600 transition-colors"
                title="Update Project"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={onDelete}
                className="text-red-500 hover:text-red-600 transition-colors"
                title="Delete Project"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
