"use client";

import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { TeamMembersHeader } from "@/components/team/TeamMembersHeader";
import { TeamMembersTable } from "@/components/team/TeamMembersTable";
import { PMTeamsGrid } from "@/components/team/PMTeamsGrid";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useAccessToken } from "@/hooks/useAccessToken";
import { TeamManagementService } from "@/api";
import { Loader2 } from "lucide-react";

export default function TeamMembersPage() {
  const { role, userId } = useUserInfo();
  const token = useAccessToken();

  const [employeeTeamId, setEmployeeTeamId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch for non-managers
    if (role && role !== "PROJECT MANAGER" && token && userId) {
      setTimeout(() => {
        setLoading(true);
        TeamManagementService.teamManagementControllerGetMemberTeamInfo({
          authorization: token,
          id: userId,
        })
          .then((res: unknown) => {
            const payload = (res as Record<string, unknown>)?.data as Record<string, unknown>;
            const teamData = payload?.team as Record<string, unknown>;
            setEmployeeTeamId((teamData?._id as string) || null);
          })
          .catch((err) => {
            console.error("Failed to fetch employee team info", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 0);
    }
  }, [role, token, userId]);

  if (role === "PROJECT MANAGER") {
    return (
      <MainLayout pageTitle="Team Management Dashboard">
        <PMTeamsGrid />
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle="Team Members">
      <TeamMembersHeader />
      {loading ? (
        <div className="flex items-center justify-center h-64 w-full">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : employeeTeamId ? (
        <TeamMembersTable teamIdProp={employeeTeamId} />
      ) : (
        <div className="flex flex-col items-center justify-center h-64 w-full border border-border/40 rounded-lg bg-white mt-4 shadow-sm">
          <p className="text-lg font-medium text-foreground">No Team Found</p>
          <p className="text-sm text-muted-foreground">You are not assigned to any team yet.</p>
        </div>
      )}
    </MainLayout>
  );
}
