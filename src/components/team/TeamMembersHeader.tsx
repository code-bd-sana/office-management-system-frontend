import { TEAM_MEMBERS_DESCRIPTION } from "@/constants/team";

export function TeamMembersHeader() {
  return (
    <div className="mb-6">
      <p className="mt-1 text-2xl text-muted-foreground">
        {TEAM_MEMBERS_DESCRIPTION}
      </p>
    </div>
  );
}
