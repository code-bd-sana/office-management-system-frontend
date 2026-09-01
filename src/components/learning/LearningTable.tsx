"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUpDown, Loader2, FolderPlus, Search, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { LearningTableRow } from "./LearningTableRow";
import { LearningPagination } from "./LearningPagination";
import {
  LEARNING_TABLE_COLUMNS,
  LEARNING_ROWS_PER_PAGE_OPTIONS,
} from "@/constants/learning";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useUserInfo } from "@/hooks/useUserInfo";
import { TrainingManagementService } from "@/api";
import type { Training } from "@/types/learning";
import { CreateTrainingModal } from "./CreateTrainingModal";
import { UpdateTrainingModal } from "./UpdateTrainingModal";
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

export function LearningTable() {
  const token = useAccessToken();
  const { role } = useUserInfo();
  const isManager = role === "PROJECT MANAGER";

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [trainings, setTrainings] = useState<Training[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTrainingId, setSelectedTrainingId] = useState<string | null>(null);

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [search]);

  const fetchTrainings = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await TrainingManagementService.trainingControllerFindAll({
        authorization: token,
        pageNo: currentPage,
        pageSize: rowsPerPage,
        ...(debouncedSearch && { searchKey: debouncedSearch }),
      });
      const data = (res as { data?: { trainings?: Training[]; total?: number } })?.data;
      const list = Array.isArray(data?.trainings) ? data.trainings : Array.isArray(data) ? data : [];
      const total = typeof data?.total === "number" ? data.total : list.length;
      
      setTrainings(list);
      setTotalRecords(total);
    } catch (err: unknown) {
      const e = err as { body?: { message?: string } };
      toast.error(e?.body?.message || "Failed to load trainings.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, rowsPerPage, debouncedSearch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchTrainings();
  }, [fetchTrainings]);

  const totalPages = Math.ceil(totalRecords / rowsPerPage) || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const openEdit = (id: string) => {
    setSelectedTrainingId(id);
    setIsUpdateOpen(true);
  };

  const openDelete = (id: string) => {
    setSelectedTrainingId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTrainingId || !token) return;
    setIsDeleting(true);
    try {
      await TrainingManagementService.trainingControllerRemove({
        id: selectedTrainingId,
        authorization: token,
      });
      toast.success("Training deleted successfully");
      fetchTrainings();
      setIsDeleteOpen(false);
    } catch (err: unknown) {
      const e = err as { body?: { message?: string } };
      toast.error(e?.body?.message || "Failed to delete training");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search trainings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm focus-visible:ring-1 border-border/60"
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={fetchTrainings}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border/40 bg-white text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          {isManager && (
            <button
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-sm bg-brand-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-navy-dark active:scale-[0.98]"
            >
              <FolderPlus className="h-4 w-4" />
              Add Training
            </button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-sm border border-border/40">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/40 bg-[#E7EFFF]">
                {LEARNING_TABLE_COLUMNS.map((col) => (
                  <TableHead
                    key={col}
                    className="whitespace-nowrap py-3 text-xs font-bold uppercase tracking-wider text-gray-500 first:pl-5"
                  >
                    <span className="flex items-center gap-1.5">
                      {col}
                      {col === "#" && (
                        <ArrowUpDown className="h-3 w-3 text-brand-navy/40" />
                      )}
                    </span>
                  </TableHead>
                ))}
                {isManager && (
                  <TableHead className="whitespace-nowrap py-3 pr-5 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && trainings.length === 0 ? (
                <TableRow>
                  <td colSpan={LEARNING_TABLE_COLUMNS.length + (isManager ? 1 : 0)} className="py-20 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Loading trainings...</p>
                  </td>
                </TableRow>
              ) : trainings.length === 0 ? (
                <TableRow>
                  <td colSpan={LEARNING_TABLE_COLUMNS.length + (isManager ? 1 : 0)} className="py-16 text-center">
                    <p className="text-sm font-medium text-foreground/70">No trainings found</p>
                  </td>
                </TableRow>
              ) : (
                trainings.map((training, index) => (
                  <LearningTableRow
                    key={training._id}
                    training={training}
                    rowNumber={(currentPage - 1) * rowsPerPage + index + 1}
                    isManager={isManager}
                    onEdit={() => openEdit(training._id)}
                    onDelete={() => openDelete(training._id)}
                    onRefresh={fetchTrainings}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalRecords > 0 && (
          <LearningPagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRecords={totalRecords}
            rowsPerPageOptions={LEARNING_ROWS_PER_PAGE_OPTIONS}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        )}
      </div>

      <CreateTrainingModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreated={fetchTrainings}
      />
      
      <UpdateTrainingModal
        id={selectedTrainingId}
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
        onUpdated={fetchTrainings}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete Training?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this training? This action cannot be undone.
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
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete Training"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
