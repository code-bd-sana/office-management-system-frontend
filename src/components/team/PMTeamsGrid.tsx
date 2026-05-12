"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, Users, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { TeamFormModal } from "./TeamFormModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TeamManagementService } from "@/api";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useUserInfo } from "@/hooks/useUserInfo";

export function PMTeamsGrid() {
  const router = useRouter();
  const token = useAccessToken();
  const { userId } = useUserInfo();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // To keep track of which team we are acting on
  const [selectedTeam, setSelectedTeam] = useState<{
    id: string;
    name: string;
    type: string;
    manager: string;
    leader: string;
    department: string;
  } | null>(null);

  const handleCardClick = (id: string) => {
    router.push(`/team-members/${id}`);
  };

  type TeamItem = {
    id: string;
    name: string;
    type: string;
    manager: string;
    leader: string;
    leaderName: string;
    department: string;
    totalMembers: number;
    departmentName: string;
    createdAt: string;
  };

  const openEdit = (e: React.MouseEvent, team: TeamItem) => {
    e.stopPropagation();
    setSelectedTeam(team);
    setIsEditModalOpen(true);
  };

  const openDelete = (e: React.MouseEvent, team: TeamItem) => {
    e.stopPropagation();
    setSelectedTeam(team);
    setIsDeleteModalOpen(true);
  };

  const [teams, setTeams] = useState<TeamItem[]>([]);

  const fetchTeams = useCallback(async () => {
    if (!token || !userId) return;
    try {
      const res = await TeamManagementService.teamManagementControllerFindAll({
        authorization: token,
        pageNo: 1,
        pageSize: 20,
        projectManagerId: userId,
      });
      const data = (res as Record<string, unknown>)?.data as Record<string, unknown> | undefined;
      const fetchedTeams = Array.isArray(data?.teams) ? data?.teams as Record<string, unknown>[] : [];
      
      const mappedTeams: TeamItem[] = fetchedTeams.map((t: Record<string, unknown>) => ({
        id: (t._id as string) || "",
        name: (t.name as string) || "",
        type: (t.team_type as string) || "",
        manager: (t.project_manager_id as string) || "",
        leader: typeof t.team_leader_id === "string" ? t.team_leader_id : (t.team_leader_id as Record<string, unknown>)?._id as string || "",
        leaderName: (t.team_leader_id as Record<string, unknown>)?.name as string || "Unknown",
        department: typeof t.department === "string" ? t.department : (t.department as Record<string, unknown>)?._id as string || "",
        totalMembers: (t.membersCount as number) || 0,
        departmentName: (t.department as Record<string, unknown>)?.name as string || "Unknown",
        createdAt: t.createdAt ? format(new Date(t.createdAt as string), "dd MMM yyyy") : "—",
      }));
      
      setTeams(mappedTeams);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load teams.");
    }
  }, [token, userId]);

  useEffect(() => {
    setTimeout(() => fetchTeams(), 0);
  }, [fetchTeams]);

  const confirmDelete = async () => {
    if (!selectedTeam || !token) return;
    setIsDeleting(true);
    try {
      await TeamManagementService.teamManagementControllerRemove({
        id: selectedTeam.id,
        authorization: token,
      });
      toast.success("Team deleted successfully!");
      setIsDeleteModalOpen(false);
      fetchTeams();
    } catch (err: unknown) {
      const errObj = err as Record<string, unknown>;
      const body = errObj?.body as Record<string, unknown>;
      toast.error((body?.message as string) || "Failed to delete team.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full">
      <main className="w-full mx-auto pb-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <h1 className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
              Manage and organize your teams. You can view team details, edit information, or remove teams as needed.
            </h1>
          </div>
          <div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-brand-navy hover:bg-brand-navy-dark text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors duration-200"
            >
              Add New Team
            </button>
          </div>
        </header>

        {/* Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <article 
              key={team.id}
              className="bg-white border border-border/40 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleCardClick(team.id)}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <h2 className="font-semibold text-slate-700 text-lg">{team.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 text-muted-foreground hover:text-brand-blue transition-colors" 
                    title="Edit Team"
                    onClick={(e) => openEdit(e, team)}
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 text-red-400 hover:text-red-600 transition-colors" 
                    title="Delete Team"
                    onClick={(e) => openDelete(e, team)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="h-5 w-5" />
                    <span className="text-sm">Total Members</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">{team.totalMembers}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="h-5 w-5" />
                    <span className="text-sm">Team Leader</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">{team.leaderName}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span className="text-sm">Created</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">{team.createdAt}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Add New Team Modal */}
      <TeamFormModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen} 
        onSuccess={fetchTeams}
      />

      {/* Edit Team Modal */}
      <TeamFormModal 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen} 
        teamToEdit={selectedTeam}
        onSuccess={fetchTeams}
      />

      {/* Delete Confirmation Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the team
              and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="rounded-sm h-9">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white rounded-sm h-9"
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting
                </>
              ) : (
                "Delete Team"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
