import { MainLayout } from "@/components/layout";
import { AttendanceContent } from "../../components/attendance";

export default function LeavePage() {
  return (
    <MainLayout pageTitle="Attendance">
      <AttendanceContent />
    </MainLayout>
  );
}
