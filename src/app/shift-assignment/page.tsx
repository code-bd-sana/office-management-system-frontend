import { MainLayout } from "@/components/layout";
import { ShiftAssignmentHeader } from "@/components/shift-assignment/ShiftAssignmentHeader";
import { ShiftLegend } from "@/components/shift-assignment/ShiftLegend";
import { ShiftAssignmentContent } from "@/components/shift-assignment/ShiftAssignmentContent";

export default function ShiftAssignmentPage() {
  return (
    <MainLayout pageTitle="Shift Assignment">
      {/* Header Section */}
      <ShiftAssignmentHeader />

      {/* Shift Legend and Request Button */}
      <ShiftLegend />

      {/* User Info + Calendar + Legend */}
      <ShiftAssignmentContent />
    </MainLayout>
  );
}
