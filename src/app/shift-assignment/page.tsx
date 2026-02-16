import { MainLayout } from "@/components/layout";
import { ShiftAssignmentHeader } from "@/components/shift-assignment/ShiftAssignmentHeader";
import { ShiftAssignmentContent } from "@/components/shift-assignment/ShiftAssignmentContent";

export default function ShiftAssignmentPage() {
  return (
    <MainLayout pageTitle="Shift Assignment">
      {/* Header Section */}
      <ShiftAssignmentHeader />

      {/* Legend + Banner + User Info + Calendar + Legend */}
      <ShiftAssignmentContent />
    </MainLayout>
  );
}
