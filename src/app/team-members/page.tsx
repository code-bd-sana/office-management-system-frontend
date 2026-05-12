"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { TeamMembersHeader } from "@/components/team/TeamMembersHeader";
import { TeamMembersTable } from "@/components/team/TeamMembersTable";
import { PMTeamsGrid } from "@/components/team/PMTeamsGrid";
import { useUserInfo } from "@/hooks/useUserInfo";

export default function TeamMembersPage() {
  const { role } = useUserInfo();

  if (role === "PROJECT MANAGER") {
    return (
      <MainLayout pageTitle="Team Management Dashboard">
        <PMTeamsGrid />
      </MainLayout>
    );
  }

  // Employee, Team Leader, or other roles
  return (
    <MainLayout pageTitle="Team Members">
      <TeamMembersHeader />
      <TeamMembersTable />
    </MainLayout>
  );
}
