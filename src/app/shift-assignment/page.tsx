import { MainLayout } from "@/components/layout";
import { ShiftAssignmentHeader } from "@/components/shift-assignment/ShiftAssignmentHeader";
import { ShiftLegend } from "@/components/shift-assignment/ShiftLegend";
import { ShiftUserInfo } from "@/components/shift-assignment/ShiftUserInfo";

export default function ShiftAssignmentPage() {
  return (
    <MainLayout pageTitle="Shift Assignment">
      {/* Header Section */}
      <ShiftAssignmentHeader />

      {/* Shift Legend and Request Button */}
      <ShiftLegend />

      {/* User Info and Month Navigation */}
      <ShiftUserInfo />

      {/* Calendar Section - To be implemented later */}
      <div className="mt-6 rounded-sm border bg-white p-6">
        <p className="text-center text-muted-foreground">
          Calendar will be implemented here
        </p>
      </div>
    </MainLayout>
  );
}
