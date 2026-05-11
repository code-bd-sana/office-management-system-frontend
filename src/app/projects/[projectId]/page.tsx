"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { ProjectManagementService } from "@/api";
import { useAccessToken } from "@/hooks/useAccessToken";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import type { Project } from "@/types/project";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.projectId as string;
  const token = useAccessToken();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !projectId) return;

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      return format(new Date(dateString), "dd MMM, yyyy");
    } catch {
      return dateString;
    }
  };

  const resolveName = (field: { _id: string; name: string } | string | null | undefined): string => {
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
          <p className="text-lg font-medium text-foreground">Project not found</p>
          <button onClick={() => router.back()} className="mt-4 text-brand-navy hover:underline">Go Back</button>
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
            <h1 className="text-2xl font-bold text-slate-800">View Project Details</h1>
          </header>

          {/* Metadata Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Project Name</p>
                <p className="text-sm text-gray-400">{project.name || "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Order ID</p>
                <p className="text-sm text-gray-400">{project.orderId || "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Start Date</p>
                <p className="text-sm text-gray-400">{formatDate(project.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-600 mt-1">{project.status || "—"}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Value</p>
                <p className="text-sm text-gray-400">{project.value != null ? `$${project.value}` : "—"}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Client Name</p>
                <p className="text-sm text-gray-400">{resolveName(project.client)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Profile Name</p>
                <p className="text-sm text-gray-400">{resolveName(project.profile)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Due Date</p>
                <p className="text-sm text-gray-400">{formatDate(project.dueDate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Project Team</p>
                <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-600 mt-1">{project.projectTeam || "—"}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Assigned Department</p>
                <p className="text-sm text-gray-400">{resolveName(project.assignedDepartment)}</p>
              </div>
            </div>
          </section>

          {/* Description Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Project Description</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {project.projectRemarks || "No description provided."}
            </p>
            {project.projectFiles && project.projectFiles.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Project Files</h3>
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
              <h2 className="text-lg font-bold text-slate-800">Project Progress</h2>
              <span className="text-sm font-bold text-brand-navy">65%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div className="bg-brand-navy h-2.5 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </section>

          {/* Breakdown Section (Static for now) */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Project Breakdown</h2>
            <div className="overflow-x-auto border border-border/40 rounded-lg">
              <table className="min-w-full divide-y divide-border/40">
                <thead className="bg-muted/30">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">PHASE NAME</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">TEAM MEMBER</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">START DATE</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">END DATE</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border/40">
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">1</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">Frontend</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Ishrat Rintu</td>
                    <td className="px-4 py-3 text-sm text-gray-500">08 May, 2026</td>
                    <td className="px-4 py-3 text-sm text-gray-500">20 May, 2026</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">2</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">UIUX</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Marina Afroj</td>
                    <td className="px-4 py-3 text-sm text-gray-500">08 May, 2026</td>
                    <td className="px-4 py-3 text-sm text-gray-500">20 May, 2026</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">3</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">Backend</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Rakib</td>
                    <td className="px-4 py-3 text-sm text-gray-500">08 May, 2026</td>
                    <td className="px-4 py-3 text-sm text-gray-500">20 May, 2026</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">4</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">Flutter</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Rabbi</td>
                    <td className="px-4 py-3 text-sm text-gray-500">08 May, 2026</td>
                    <td className="px-4 py-3 text-sm text-gray-500">20 May, 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Actions Footer */}
          <footer className="flex justify-end mt-4">
            <button className="bg-brand-navy text-white px-6 py-2.5 rounded-md text-sm font-semibold shadow-sm hover:bg-brand-navy-dark transition-colors">
              Project Breakdown
            </button>
          </footer>
        </main>
      </div>
    </MainLayout>
  );
}
