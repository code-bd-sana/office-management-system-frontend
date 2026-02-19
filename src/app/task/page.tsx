import { MainLayout } from "@/components/layout";
import { TaskContent } from "@/components/task";

export default function TaskPage() {
  return (
    <MainLayout pageTitle="Tasks">
      <TaskContent />
    </MainLayout>
  );
}
