"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { TeamMembersHeader } from "@/components/team/TeamMembersHeader";
import { TeamMembersTable } from "@/components/team/TeamMembersTable";
import { useParams } from "next/navigation";

export default function TeamMembersDetailsPage() {
  const params = useParams();
  const teamId = params?.teamId as string;

  return (
    <MainLayout pageTitle="Team Members">
      <TeamMembersHeader teamId={teamId} />
      <TeamMembersTable />
    </MainLayout>
  );
}
