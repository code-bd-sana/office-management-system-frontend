import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import type { LearningRecord } from "@/types/learning";

interface LearningTableRowProps {
  record: LearningRecord;
}

export function LearningTableRow({ record }: LearningTableRowProps) {
  return (
    <TableRow className="border-b border-border/40 hover:bg-muted/30">
      <TableCell className="py-3.5 pl-5 text-sm font-medium text-foreground/70">
        {record.rowNumber}
      </TableCell>
      <TableCell className="py-3.5 text-sm font-semibold text-foreground">
        {record.topicTitle}
      </TableCell>
      <TableCell className="py-3.5 text-sm text-foreground/70">
        {record.category}
      </TableCell>
      <TableCell className="py-3.5 text-sm text-foreground/70">
        {record.uploadedBy}
      </TableCell>
      <TableCell className="py-3.5 text-sm">
        <Link
          href={record.fileUrl}
          className="font-medium text-brand-navy underline underline-offset-2 hover:text-brand-navy-dark"
        >
          {record.fileName}
        </Link>
      </TableCell>
      <TableCell className="py-3.5 text-sm text-foreground/70">
        {record.uploadDate}
      </TableCell>
      <TableCell className="py-3.5">
        <Link
          href="#"
          className="inline-block rounded-sm border border-brand-navy bg-brand-navy px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-navy-dark"
        >
          View Details
        </Link>
      </TableCell>
    </TableRow>
  );
}
