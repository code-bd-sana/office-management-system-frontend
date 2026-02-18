import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import type { LearningRecord } from "@/types/learning";
import { SquarePen, Trash2 } from "lucide-react";

interface LearningTableRowProps {
  record: LearningRecord;
}

export function LearningTableRow({ record }: LearningTableRowProps) {
  return (
    <TableRow className="border-b border-border/40 hover:bg-muted/30">
      <TableCell className="whitespace-nowrap py-3 pl-3 text-sm font-medium text-foreground/70 sm:py-3.5 sm:pl-5">
        {record.rowNumber}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3 text-xs font-semibold text-foreground sm:py-3.5 sm:text-sm">
        {record.topicTitle}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3 text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
        {record.category}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3 text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
        {record.uploadedBy}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3 text-xs sm:py-3.5 sm:text-sm">
        <Link
          href={record.fileUrl}
          className="font-medium text-brand-navy underline underline-offset-2 hover:text-brand-navy-dark"
        >
          {record.fileName}
        </Link>
      </TableCell>
      <TableCell className="whitespace-nowrap py-3 text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
        {record.uploadDate}
      </TableCell>
      {/* View Details */}
      <TableCell className="whitespace-nowrap py-3 sm:py-3.5">
        <Link
          href="#"
          className="inline-block rounded-sm bg-[#044192] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#044192]/90 sm:px-4"
        >
          View Details
        </Link>
      </TableCell>
      {/* Actions (manager only) */}
      <TableCell className="whitespace-nowrap py-3 pr-3 sm:py-3.5 sm:pr-5">
        <div className="flex gap-2">
          <Link href="#" className="text-gray-400 hover:text-gray-600">
            <SquarePen className="h-4 w-4" />
          </Link>
          <Link href="#" className="text-red-400 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}
