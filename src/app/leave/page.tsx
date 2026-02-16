import { MainLayout } from "@/components/layout";
import { LeaveContent } from "@/components/leave";

export default function LeavePage() {
  return (
    <MainLayout pageTitle="Leave Management">
      <LeaveContent />
    </MainLayout>
  );
}
