"use client";

import { useState, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { TeamMembersHeader } from "@/components/team/TeamMembersHeader";
import { TeamMembersTable } from "@/components/team/TeamMembersTable";
import { useParams } from "next/navigation";

export default function TeamMembersDetailsPage() {
  const params = useParams();
  const teamId = params?.teamId as string;
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMemberAdded = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <MainLayout pageTitle="Team Members">
      <TeamMembersHeader teamId={teamId} onMemberAdded={handleMemberAdded} />
      <TeamMembersTable refreshTrigger={refreshTrigger} />
    </MainLayout>
  );
}
