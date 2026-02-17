import { TEAM_MEMBERS_DESCRIPTION } from "@/constants/team";

export function TeamMembersHeader() {
  return (
    <div className="mb-4 sm:mb-6">
      <p className="mt-1 text-base leading-relaxed text-muted-foreground sm:text-lg md:text-2xl">
        {TEAM_MEMBERS_DESCRIPTION}
      </p>
    </div>
  );
}
