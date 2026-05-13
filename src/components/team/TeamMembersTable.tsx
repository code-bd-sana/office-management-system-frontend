"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TeamMembersRow } from "./TeamMembersRow";
import { TEAM_MEMBER_TABLE_COLUMNS, TEAM_MEMBER_ROLES } from "@/constants/team";
import type { TeamMember } from "@/types/team";
import { useParams } from "next/navigation";
import { useAccessToken } from "@/hooks/useAccessToken";
import { TeamManagementService } from "@/api";
import { toast } from "sonner";

export function TeamMembersTable() {
  const params = useParams();
  const teamId = params?.teamId as string;
  const token = useAccessToken();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Delete state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserIdToDelete, setSelectedUserIdToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMembers = useCallback(async () => {
    if (!token || !teamId) return;
    setLoading(true);
    try {
      // The API returns the team and its members
      const res = await TeamManagementService.teamManagementControllerGetTeamMembers({
        authorization: token,
        teamId: teamId,
      });

      const data = (res as Record<string, unknown>)?.data as Record<string, unknown>;
      // Assuming members is an array inside the returned data. It could be data.members or just data.
      const membersArray = Array.isArray(data?.members) ? data.members : Array.isArray(data) ? data : [];
      
      const mappedMembers: TeamMember[] = (membersArray as Record<string, unknown>[]).map((record: Record<string, unknown>, idx: number) => {
        // Handle various API response structures securely
        const memberObj = (typeof record.team_member_id === "object" && record.team_member_id as Record<string, unknown>) || 
                          (typeof record.user === "object" && record.user as Record<string, unknown>) || 
                          record;

        let memberName = "Unknown User";
        if (memberObj?.name) memberName = memberObj.name as string;
        else if (record.name) memberName = record.name as string;
        else if (record.team_member_name) memberName = record.team_member_name as string;

        let memberDesignation = "N/A";
        if (typeof memberObj?.designation === "string") memberDesignation = memberObj.designation;
        else if (typeof memberObj?.designation === "object" && (memberObj.designation as Record<string, unknown>)?.name) memberDesignation = (memberObj.designation as Record<string, unknown>).name as string;
        else if (typeof record.designation === "string") memberDesignation = record.designation;
        else if (typeof record.designation === "object" && (record.designation as Record<string, unknown>)?.name) memberDesignation = (record.designation as Record<string, unknown>).name as string;

        // Use the actual user ID for deletion purposes
        const userId = memberObj?._id || memberObj?.id || record.team_member_id || record._id || `member-${idx}`;

        return {
          id: userId as string,
          rowNumber: 0, // Assigned later during slicing
          name: memberName as string,
          designation: memberDesignation as string,
          totalProjects: 0, // Mock for now if API doesn't return
          completedProjects: 0, // Mock for now
          avatar: undefined,
        };
      });

      setMembers(mappedMembers);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load team members.");
    } finally {
      setLoading(false);
    }
  }, [token, teamId]);

  useEffect(() => {
    setTimeout(() => fetchMembers(), 0);
  }, [fetchMembers]);

  // Client-side filtering (search and role)
  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || member.designation?.toLowerCase().includes(selectedRole.toLowerCase());
    return matchesSearch && matchesRole;
  });

  // Calculate pagination
  const totalRecords = filteredMembers.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedMembers = filteredMembers.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  // Ensure page is valid after filter/rows change
  useEffect(() => {
    if (currentPage > totalPages) {
      setTimeout(() => setCurrentPage(1), 0);
    }
  }, [totalPages, currentPage]);

  const handleDeleteClick = (userId: string) => {
    setSelectedUserIdToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUserIdToDelete || !token || !teamId) return;
    setIsDeleting(true);
    try {
      await TeamManagementService.teamManagementControllerRemoveMember({
        authorization: token,
        requestBody: {
          teamId: teamId,
          userId: selectedUserIdToDelete,
        }
      });
      toast.success("Member removed from team successfully!");
      setIsDeleteModalOpen(false);
      fetchMembers();
    } catch (err: unknown) {
      const errObj = err as Record<string, unknown>;
      const body = errObj?.body as Record<string, unknown>;
      toast.error((body?.message as string) || "Failed to remove member.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="rounded-sm bg-white shadow-sm">
      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border/40 p-3 sm:gap-4 sm:p-4">
        {/* Left: Filter Icon + Search */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/icons/filter-icons.png"
            alt="Filter"
            width={20}
            height={20}
            className="hidden sm:block"
          />
          <div className="relative w-32 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-sm border-border/60 pl-9 pr-3 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Right: Role Dropdown */}
        <div className="flex items-center gap-2 rounded-sm border border-border/60 px-2 py-1 sm:px-3">
          <span className="text-xs font-medium text-foreground/70 sm:text-sm">Role :</span>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="h-9 w-24 border-none bg-none text-xs sm:w-35 sm:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TEAM_MEMBER_ROLES.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/40 bg-[#E7EFFF] hover:bg-[#E7EFFF]">
              {TEAM_MEMBER_TABLE_COLUMNS.map((column) => (
                <TableHead
                  key={column}
                  className={`h-11 whitespace-nowrap font-semibold text-foreground/80 ${
                    column === "#" ? "pl-3 sm:pl-5" : ""
                  } ${
                    column === "MEMBER" ? "pl-3 sm:pl-5" : ""
                  } ${
                    column === "TOTAL PROJECTS" || column === "COMPLETED PROJECTS"
                      ? "text-center"
                      : ""
                  } ${column === "ACTION" ? "pr-3 sm:pr-5" : ""}`}
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={TEAM_MEMBER_TABLE_COLUMNS.length} className="h-32 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : displayedMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={TEAM_MEMBER_TABLE_COLUMNS.length} className="h-32 text-center text-muted-foreground">
                  No members found.
                </TableCell>
              </TableRow>
            ) : (
              displayedMembers.map((member: TeamMember, index: number) => (
                <TeamMembersRow
                  key={member.id}
                  member={member}
                  rowNumber={startIndex + index + 1}
                  onDelete={handleDeleteClick}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between rounded-b-sm bg-[#E8EAEE] px-3 py-3 sm:px-5">
        {/* Left: Rows count display */}
        <div className="text-xs text-foreground/70 sm:text-sm">
          {totalRecords === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, totalRecords)} of {totalRecords}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Rows per page selector */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="hidden text-sm text-foreground/70 sm:inline">Rows per page:</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-14 rounded-sm border-border/60 bg-white text-xs sm:w-17.5 sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="h-8 w-8 rounded-sm hover:bg-white/50 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="h-8 w-8 rounded-sm hover:bg-white/50 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Remove Member?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this member from the team?
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
                  Removing
                </>
              ) : (
                "Remove Member"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
