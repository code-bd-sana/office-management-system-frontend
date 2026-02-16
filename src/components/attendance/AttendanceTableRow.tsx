import { TableCell, TableRow } from "@/components/ui/table";
import { IAttendance } from "@/types/IAttendance";

interface AttendanceTableRowProps {
  record: IAttendance;
}

export function AttendanceTableRow({ record }: AttendanceTableRowProps) {
  return (
    <TableRow className="border-b border-border/40 hover:bg-muted/30">
      <TableCell className="py-3.5 pl-5 text-sm font-medium text-foreground/70">
        {record?.rowNumber}
      </TableCell>
      <TableCell className="py-3.5 text-sm font-semibold ">
        {record?.date}
      </TableCell>
      <TableCell className="py-3.5 text-sm text-foreground/70">
        {record.day}
      </TableCell>
      <TableCell className="py-3.5 text-sm text-foreground/70">
        {record.checkIn}
      </TableCell>
      <TableCell className="py-3.5 text-sm">
        {record.checkOut}
      </TableCell>
      <TableCell className="py-3.5 text-sm text-foreground/70">
        {record.status}
      </TableCell>
    </TableRow>
  );
}
