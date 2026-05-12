"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, Users, LayoutDashboard, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";
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

export function PMTeamsGrid() {
  const router = useRouter();

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

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Team deleted successfully!");
      setIsDeleteModalOpen(false);
    } catch {
      toast.error("Failed to delete team.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Mock data for display
  const teams = [
    {
      id: "full-stack-team",
      name: "Full-Stack Team",
      type: "Full Stack",
      manager: "m1",
      leader: "l1",
      department: "d1",
      totalMembers: 8,
      departmentName: "IT & Development",
      createdAt: "12 Jan 2024",
    },
    {
      id: "uiux-team",
      name: "UIUX Team",
      type: "UI/UX",
      manager: "m2",
      leader: "l2",
      department: "d2",
      totalMembers: 4,
      departmentName: "IT & Development",
      createdAt: "12 Jan 2024",
    }
  ];

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
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="text-sm">Department</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">{team.departmentName}</span>
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
      />

      {/* Edit Team Modal */}
      <TeamFormModal 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen} 
        teamToEdit={selectedTeam}
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
