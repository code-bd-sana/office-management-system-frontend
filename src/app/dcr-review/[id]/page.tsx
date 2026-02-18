import { MainLayout } from "@/components/layout/MainLayout";
import { DcrViewDetailsContent } from "@/components/dcr-review/DcrViewDetailsContent";

export default function DcrViewDetailsPage() {
  return (
    <MainLayout pageTitle="View Details">
      <DcrViewDetailsContent />
    </MainLayout>
  );
}
