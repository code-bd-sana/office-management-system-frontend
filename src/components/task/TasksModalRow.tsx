import { TableCell, TableRow } from "@/components/ui/table";
import type { Task, TaskStatus } from "@/types/task";

interface TasksModalRowProps {
  task: Task;
  rowNumber: number;
}

const STATUS_STYLES: Record<
  TaskStatus,
  { bg: string; text: string; label: string }
> = {
  "in-progress": {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "In Progress",
  },
  todo: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    label: "To Do",
  },
  completed: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Completed",
  },
};

export function TasksModalRow({ task, rowNumber }: TasksModalRowProps) {
  const statusStyle = STATUS_STYLES[task.status];

  return (
    <TableRow className="border-b border-border/40 hover:bg-muted/30">
      <TableCell className="py-3.5 pl-5">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300"
          aria-label={`Select task ${rowNumber}`}
        />
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm font-medium text-foreground/70">
        {rowNumber}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground">
        {task.title}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {task.client}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {task.profile}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {task.project}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {task.dueDate}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5">
        <span
          className={`inline-block rounded-sm px-2.5 py-1 text-xs font-semibold w-30 text-center ${statusStyle.bg} ${statusStyle.text}`}
        >
          {statusStyle.label}
        </span>
      </TableCell>
    </TableRow>
  );
}
