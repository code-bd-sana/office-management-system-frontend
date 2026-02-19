import { MainLayout } from "@/components/layout";
import { DashboardGrid } from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <MainLayout pageTitle="Overview">
      <DashboardGrid />
    </MainLayout>
  );
}
