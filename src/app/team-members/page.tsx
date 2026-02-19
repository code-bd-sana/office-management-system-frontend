import { MainLayout } from "@/components/layout/MainLayout";
import { TeamMembersHeader } from "@/components/team/TeamMembersHeader";
import { TeamMembersTable } from "@/components/team/TeamMembersTable";

export default function TeamMembersPage() {
  return (
    <MainLayout pageTitle="Team Members">
      <TeamMembersHeader />
      <TeamMembersTable />
    </MainLayout>
  );
}
