import { MainLayout } from "@/components/layout/MainLayout";
import { DcrReviewHeader } from "@/components/dcr-review/DcrReviewHeader";
import { DcrReviewTable } from "@/components/dcr-review/DcrReviewTable";

export default function DcrReviewPage() {
  return (
    <MainLayout pageTitle="DCR Review">
      <DcrReviewHeader />
      <DcrReviewTable />
    </MainLayout>
  );
}
