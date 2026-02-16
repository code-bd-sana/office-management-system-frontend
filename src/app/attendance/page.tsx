import { MainLayout } from "@/components/layout";
import { AttendanceContent } from "../../components/attendance/AttendanceContent";

export default function LeavePage() {
  return (
    <MainLayout pageTitle="Attendancey">
      <AttendanceContent />
    </MainLayout>
  );
}
