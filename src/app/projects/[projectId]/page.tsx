"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { ProjectManagementService, SubProjectManagementService } from "@/api";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useUserInfo } from "@/hooks/useUserInfo";
import { Loader2, Edit2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { Project } from "@/types/project";
import { AddPhaseModal } from "@/components/project/AddPhaseModal";
import { toast } from "sonner";
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

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.projectId as string;
  const token = useAccessToken();
  const { role } = useUserInfo();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddPhaseOpen, setIsAddPhaseOpen] = useState(false);
  const [subProjects, setSubProjects] = useState<Record<string, unknown>[]>([]);
  const [loadingSubProjects, setLoadingSubProjects] = useState(true);
  const [updatingPhaseId, setUpdatingPhaseId] = useState<string | null>(null);
  
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [phaseToComplete, setPhaseToComplete] = useState<string | null>(null);

  // Edit and Delete states
  const [selectedPhaseToEdit, setSelectedPhaseToEdit] = useState<Record<string, unknown> | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [phaseToDelete, setPhaseToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (phase: Record<string, unknown>) => {
    setSelectedPhaseToEdit(phase);
    setIsAddPhaseOpen(true);
  };

  const handleDeleteClick = (phaseId: string) => {
    setPhaseToDelete(phaseId);
    setIsDeleteModalOpen(true);
  };

  const handleDeletePhase = async () => {
    if (!token || !phaseToDelete) return;
    setIsDeleting(true);
    try {
      await SubProjectManagementService.subProjectControllerRemove({
        id: phaseToDelete,
        authorization: token,
      });
      toast.success("Phase deleted successfully!");
      setIsDeleteModalOpen(false);
      setPhaseToDelete(null);
      fetchSubProjects(); // Refresh the list
    } catch (err: unknown) {
      const errObj = err as Record<string, unknown>;
      const body = errObj?.body as Record<string, unknown>;
      toast.error((body?.message as string) || "Failed to delete phase.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCompleteClick = (phaseId: string) => {
    setPhaseToComplete(phaseId);
    setIsCompleteModalOpen(true);
  };

  const handleCompletePhase = async () => {
    if (!token || !phaseToComplete) return;
    setUpdatingPhaseId(phaseToComplete);
    try {
      await SubProjectManagementService.subProjectControllerUpdate({
        id: phaseToComplete,
        authorization: token,
        requestBody: {
          isCompleted: true,
        },
      });
      toast.success("Phase marked as completed!");
      setIsCompleteModalOpen(false);
      setPhaseToComplete(null);
      fetchSubProjects(); // Refresh the list
    } catch (err: unknown) {
      const errObj = err as Record<string, unknown>;
      const body = errObj?.body as Record<string, unknown>;
      toast.error((body?.message as string) || "Failed to update phase status.");
    } finally {
      setUpdatingPhaseId(null);
    }
  };

  const fetchProjectData = useCallback(() => {
    if (!token || !projectId) return;

    setLoading(true);
    ProjectManagementService.projectControllerFindOne({
      id: projectId,
      authorization: token,
    })
      .then((res: unknown) => {
        const payload = (res as Record<string, unknown>)?.data as Project;
        setProject(payload || null);
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId, token]);

  const fetchSubProjects = useCallback(() => {
    if (!token || !projectId) return;

    setLoadingSubProjects(true);
    SubProjectManagementService.subProjectControllerFindAll({
      authorization: token,
      projectId: projectId,
      pageNo: 1,
      pageSize: 100, // Fetch all for now
    })
      .then((res: unknown) => {
        const payload = (res as Record<string, unknown>)?.data as Record<string, unknown>;
        const items = Array.isArray(payload?.subProjects) ? payload.subProjects : [];
        setSubProjects(items as Record<string, unknown>[]);
      })
      .catch((err) => {
        console.error("Error fetching sub-projects:", err);
      })
      .finally(() => {
        setLoadingSubProjects(false);
      });
  }, [projectId, token]);

  useEffect(() => {
    setTimeout(() => {
      fetchProjectData();
      fetchSubProjects();
    }, 0);
  }, [fetchProjectData, fetchSubProjects]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      return format(new Date(dateString), "dd MMM, yyyy");
    } catch {
      return dateString;
    }
  };

  const resolveName = (
    field: { _id: string; name: string } | string | null | undefined,
  ): string => {
    if (!field) return "—";
    if (typeof field === "string") return field;
    return field.name || "—";
  };

  if (loading) {
    return (
      <MainLayout pageTitle="Project Details">
        <div className="flex items-center justify-center h-64 w-full">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout pageTitle="Project Details">
        <div className="flex flex-col items-center justify-center h-64 w-full">
          <p className="text-lg font-medium text-foreground">
            Project not found
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-brand-navy hover:underline"
          >
            Go Back
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle="Project Details">
      {/* We use w-full and px/py for responsiveness instead of max-w constraints, as requested */}
      <div className="w-full ">
        <main className="w-full overflow-hidden relative p-4 sm:p-6">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">
              View Project Details
            </h1>
          </header>

          {/* Metadata Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Project Name
                </p>
                <p className="text-sm text-gray-400">{project.name || "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Order ID</p>
                <p className="text-sm text-gray-400">
                  {project.orderId || "—"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Start Date</p>
                <p className="text-sm text-gray-400">
                  {formatDate(project.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-600 mt-1">
                  {project.status || "—"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Value</p>
                <p className="text-sm text-gray-400">
                  {project.value != null ? `$${project.value}` : "—"}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Client Name</p>
                <p className="text-sm text-gray-400">
                  {resolveName(project.client)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Profile Name
                </p>
                <p className="text-sm text-gray-400">
                  {resolveName(project.profile)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Due Date</p>
                <p className="text-sm text-gray-400">
                  {formatDate(project.dueDate)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Project Team
                </p>
                <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-600 mt-1">
                  {project.projectTeam || "—"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Assigned Department
                </p>
                <p className="text-sm text-gray-400">
                  {resolveName(project.assignedDepartment)}
                </p>
              </div>
            </div>
          </section>

          {/* Description Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-2">
              Project Description
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {project.projectRemarks || "No description provided."}
            </p>
            {project.projectFiles && project.projectFiles.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">
                  Project Files
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  {project.projectFiles.map((file, i) => (
                    <li key={i}>
                      <a
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-navy hover:text-brand-navy-dark hover:underline break-all"
                      >
                        {file}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Progress Section (Static for now) */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-slate-800">
                Project Progress
              </h2>
              <span className="text-sm font-bold text-brand-navy">65%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-brand-navy h-2.5 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </section>

          {/* Breakdown Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Project Breakdown
            </h2>
            <div className="overflow-x-auto border border-border/40 rounded-lg">
              <table className="min-w-full divide-y divide-border/40">
                <thead className="bg-muted/30">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      PHASE NAME
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      START DATE
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      END DATE
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      VALUE
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border/40">
                  {loadingSubProjects ? (
                    <tr>
                      <td colSpan={role === "PROJECT MANAGER" ? 7 : 6} className="px-4 py-8 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                      </td>
                    </tr>
                  ) : subProjects.length === 0 ? (
                    <tr>
                      <td colSpan={role === "PROJECT MANAGER" ? 7 : 6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No phases found for this project.
                      </td>
                    </tr>
                  ) : (
                    subProjects.map((phase, index) => (
                      <tr key={phase._id as string} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-slate-700">
                          {phase.name as string}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {formatDate(phase.startDate as string)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {formatDate(phase.endDate as string)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {phase.value != null ? `$${phase.value}` : "—"}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {phase.isCompleted ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700 cursor-not-allowed opacity-80">
                              Completed
                            </span>
                          ) : role === "PROJECT MANAGER" ? (
                            <button
                              onClick={() => handleCompleteClick(phase._id as string)}
                              disabled={updatingPhaseId === phase._id}
                              className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-brand-navy text-white hover:bg-brand-navy-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                              {updatingPhaseId === phase._id ? (
                                <>
                                  <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                                  Updating...
                                </>
                              ) : (
                                "Complete Phase"
                              )}
                            </button>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Active
                            </span>
                          )}
                        </td>
                        {role === "PROJECT MANAGER" && (
                          <td className="px-4 py-3 text-sm text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditClick(phase)}
                                className="p-1.5 text-muted-foreground hover:text-brand-blue transition-colors"
                                title="Edit Phase"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(phase._id as string)}
                                className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                                title="Delete Phase"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Actions Footer */}
          {role === "PROJECT MANAGER" && (
            <footer className="flex justify-end mt-4">
              <button
                onClick={() => setIsAddPhaseOpen(true)}
                className="bg-brand-navy text-white px-6 py-2.5 rounded-md text-sm font-semibold shadow-sm hover:bg-brand-navy-dark transition-colors"
              >
                Project Breakdown
              </button>
            </footer>
          )}
        </main>
      </div>

      <AddPhaseModal
        projectId={projectId}
        open={isAddPhaseOpen}
        onOpenChange={(open) => {
          setIsAddPhaseOpen(open);
          if (!open) {
            // Wait for modal close animation before clearing the edit state
            setTimeout(() => setSelectedPhaseToEdit(null), 300);
          }
        }}
        onAdded={fetchSubProjects}
        phaseToEdit={selectedPhaseToEdit}
      />

      {/* Delete Confirmation Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete Phase?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this phase? This action cannot be undone.
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
                handleDeletePhase();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Phase"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Complete Confirmation Modal */}
      <AlertDialog open={isCompleteModalOpen} onOpenChange={setIsCompleteModalOpen}>
        <AlertDialogContent className="rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Complete Phase?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this phase as completed? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={updatingPhaseId !== null} className="rounded-sm h-9">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-brand-navy hover:bg-brand-navy-dark text-white rounded-sm h-9"
              onClick={(e) => {
                e.preventDefault();
                handleCompletePhase();
              }}
              disabled={updatingPhaseId !== null}
            >
              {updatingPhaseId !== null ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Complete Phase"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
}
