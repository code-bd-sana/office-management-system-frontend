"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, FolderPlus } from "lucide-react";
import { toast } from "sonner";

import { ModalTable, type ColumnDef } from "@/components/shared";
import { ProjectsModalRow } from "@/components/project/ProjectsModalRow";

import { ProjectManagementService } from "@/api";
import { useAccessToken } from "@/hooks/useAccessToken";
import type { Project, ProjectStatus } from "@/types/project";

/* ─── Table columns ───────────────────────────────────────── */
const COLUMNS: ColumnDef[] = [
  { key: "number",      label: "#"            },
  { key: "project",     label: "Project"      },
  { key: "client",      label: "Client"       },
  { key: "orderId",     label: "Order ID"     },
  { key: "profile",     label: "Profile"      },
  { key: "value",       label: "Value"        },
  { key: "status",      label: "Status"       },
  { key: "actions",     label: "Actions",     className: "w-[120px]" },
];

/* ─── Status filter tabs ──────────────────────────────────── */
const FILTER_TABS = [
  { label: "All",       value: "all"       as const },
  { label: "WIP",       value: "WIP"       as const },
  { label: "NRA",       value: "NRA"       as const },
  { label: "Delivered", value: "DELIVERED" as const },
  { label: "Revision",  value: "REVISION"  as const },
  { label: "Cancelled", value: "CANCELLED" as const },
  { label: "Not Set",   value: "NULL"      as const },
];

type FilterValue = ProjectStatus | "all";

interface UserProjectsModalTableProps {
  userId: string;
}

/* ─── Component ───────────────────────────────────────────── */
export function UserProjectsModalTable({ userId }: UserProjectsModalTableProps) {
  const router = useRouter();
  const token = useAccessToken();

  /* ── Data state ─────────────────────────────────────────── */
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  /* ── Client-driven filters ───────────────────────────────── */
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ── Fetch projects ─────────────────────────────────────── */
  const fetchProjects = useCallback(async () => {
    if (!token || !userId) return;
    setLoading(true);
    try {
      const res = await ProjectManagementService.projectControllerFindByUserId({
        authorization: token,
        userId: userId,
      });

      const data = (res as Record<string, unknown>)?.data;
      const list: Project[] = Array.isArray(data) ? (data as Project[]) : [];

      setProjects(list);
    } catch (err: unknown) {
      const errBody = (err as Record<string, unknown>)?.body as Record<string, unknown>;
      const msg =
        (errBody?.message as string) ?? "Failed to load projects. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [token, userId]);

  useEffect(() => {
    setTimeout(() => fetchProjects(), 0);
  }, [fetchProjects]);

  /* ── Filter / pagination handlers ────────────────────────── */
  const handleFilterChange = (value: FilterValue) => {
    setActiveFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const openView = (id: string) => {
    router.push(`/projects/${id}`);
  };

  /* ── Client-side filtering logic ─────────────────────────── */
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name?.toLowerCase().includes(search.toLowerCase()) ||
      project.orderId?.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = activeFilter === "all" || project.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const totalRecords = filteredProjects.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedProjects = filteredProjects.slice(startIndex, endIndex);

  // We pass pre-filtered client data; onFilterData is identity so ModalTable doesn't re-filter it.
  const noopFilter = (data: Project[], _filter: FilterValue, _search: string) => data;

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <div className="space-y-4">
      {/* ── Filter Tabs ─────────────────────────────────────── */}
      <div className="flex w-full overflow-x-auto border-b border-border/40 scrollbar-hide">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleFilterChange(tab.value)}
            className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeFilter === tab.value
                ? "border-brand-navy text-brand-navy"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Table / Loading / Empty ─────────────────────────── */}
      {loading ? (
        <div className="flex h-48 flex-col items-center justify-center space-y-3 rounded-sm border border-border/40 bg-white shadow-sm">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading projects…</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center space-y-3 rounded-sm border border-border/40 bg-white shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
            <FolderPlus className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <p className="text-base font-medium text-foreground">
            No projects found.
          </p>
          <p className="text-sm text-muted-foreground">
            This user has no assigned projects.
          </p>
        </div>
      ) : displayedProjects.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center space-y-3 rounded-sm border border-border/40 bg-white shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
            <FolderPlus className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <p className="text-base font-medium text-foreground">
            No matching projects found.
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search term.
          </p>
        </div>
      ) : (
        <ModalTable<Project, FilterValue>
          data={displayedProjects}
          columns={COLUMNS}
          totalRecords={totalRecords}
          enableSearch={true}
          searchPlaceholder="Search by name or order ID…"
          onFilterData={noopFilter}
          onSearchChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          renderRow={(project, index) => (
            <ProjectsModalRow
              key={project._id || index}
              project={project}
              rowNumber={startIndex + index + 1}
              onView={() => openView(project._id as string)}
              onEdit={() => {}}
              onDelete={() => {}}
              hideEditAndDelete={true}
            />
          )}
          enableCheckboxes={false}
          rowsPerPageOptions={[10, 20, 50, 100]}
          defaultRowsPerPage={rowsPerPage}
        />
      )}
    </div>
  );
}
