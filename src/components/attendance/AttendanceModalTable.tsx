"use client";

import { ModalTable } from "@/components/shared/ModalTable";
import { AttendanceModalRow } from "./AttendanceModalRow";
import { DEMO_ATTENDANCE_RECORDS } from "@/constants/attendance";
import type { AttendanceRecord } from "@/types/attendance";
import type { ColumnDef } from "@/components/shared/ModalTable";

const COLUMNS: ColumnDef[] = [
  { key: "#", label: "#" },
  { key: "date", label: "DATE" },
  { key: "day", label: "DAY" },
  { key: "checkIn", label: "CHECK-IN" },
  { key: "checkOut", label: "CHECK-OUT" },
  { key: "status", label: "STATUS" },
];

export function AttendanceModalTable() {
  return (
    <ModalTable
      data={DEMO_ATTENDANCE_RECORDS}
      columns={COLUMNS}
      totalRecords={DEMO_ATTENDANCE_RECORDS.length}
      enableSearch={false}
      enableCheckboxes={false}
      renderRow={(record: AttendanceRecord) => (
        <AttendanceModalRow key={record.rowNumber} record={record} />
      )}
    />
  );
}
