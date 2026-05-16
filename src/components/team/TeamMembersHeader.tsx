import { useState } from "react";
import { TEAM_MEMBERS_DESCRIPTION } from "@/constants/team";
import { AddTeamMemberModal } from "./AddTeamMemberModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useUserInfo } from "@/hooks/useUserInfo";

interface TeamMembersHeaderProps {
  teamId?: string;
  onMemberAdded?: () => void;
}

export function TeamMembersHeader({ teamId, onMemberAdded }: TeamMembersHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role } = useUserInfo();

  // Only PROJECT MANAGER can add team members
  const isManager = role === "PROJECT MANAGER";

  return (
    <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <p className="mt-1 text-base font-light leading-relaxed text-muted-foreground sm:text-lg md:text-2xl max-w-4xl">
        {TEAM_MEMBERS_DESCRIPTION}
      </p>
      
      {isManager && teamId && (
        <>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-navy hover:bg-brand-navy-dark text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Team Members
          </Button>
          
          <AddTeamMemberModal
            teamId={teamId}
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            onAdded={onMemberAdded}
          />
        </>
      )}
    </div>
  );
}
