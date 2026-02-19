import { MainLayout } from "@/components/layout";
import { NotificationContent } from "../../components/notification";

export default function NotificationPage() {
  return (
    <MainLayout pageTitle="Notifications">
      <NotificationContent />
    </MainLayout>
  );
}
