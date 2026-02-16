import Link from "next/link";
import type { ILeave } from "@/types/ILeave";
import { TableCell, TableRow } from "@/components/ui/table";

interface LeaveTableRowProps {
  record: ILeave;
}

export function LeaveTableRow({ record }: LeaveTableRowProps) {
  return (
    <TableRow className="border-b border-border/40 hover:bg-muted/30">
      <TableCell className="py-3.5 pl-5 text-sm font-medium text-foreground/70">
        {record.rowNumber}
      </TableCell>
      <TableCell className="py-3.5 text-sm font-semibold ">
        {record.leaveType}
      </TableCell>
      <TableCell className="py-3.5 text-sm text-foreground/70">
        {record.from}
      </TableCell>
      <TableCell className="py-3.5 text-sm text-foreground/70">
        {record.to}
      </TableCell>
      <TableCell className="py-3.5 text-sm">
        {record.duration}
      </TableCell>
      <TableCell className="py-3.5 text-sm text-foreground/70">
        {record.status}
      </TableCell>
    </TableRow>
  );
}
