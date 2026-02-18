import Link from "next/link";
import type { ILeave, ILeaveStatus } from "@/types/ILeave";
import { TableCell, TableRow } from "@/components/ui/table";

interface LeaveTableRowProps {
  record: ILeave;
}

const STATUS_STYLES: Record<
  ILeaveStatus,
  { bg: string; text: string; label: string }
> = {
  Approved: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Approved",
  },
  Rejected: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "Rejected",
  },
  Pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    label: "Pending",
  },
};

export function LeaveTableRow({ record }: LeaveTableRowProps) {
  const statusStyle = STATUS_STYLES[record.status];
  return (
    <TableRow className="border-b border-border/40 hover:bg-muted/30">
      <TableCell className="whitespace-nowrap py-3.5 pl-5 text-sm font-medium text-foreground/70">
        {record.rowNumber}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm font-semibold ">
        {record.leaveType}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {record.from}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {record.to}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm">
        {record.duration}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5">
        <span
          className={`inline-block rounded-sm px-2.5 w-20 text-center py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
        >
          {statusStyle.label}
        </span>
      </TableCell>
    </TableRow>
  );
}
