"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, Search } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAccessToken } from "@/hooks/useAccessToken";
import { UserManagementService, TeamManagementService } from "@/api";

export interface AddTeamMemberModalProps {
  teamId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded?: () => void;
}

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role?: {
    name: string;
  };
}

export function AddTeamMemberModal({
  teamId,
  open,
  onOpenChange,
  onAdded,
}: AddTeamMemberModalProps) {
  const token = useAccessToken();

  const [users, setUsers] = useState<UserItem[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  
  // Track selected user IDs
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch users whenever modal opens or searchKey changes (debounced)
  const fetchUsers = useCallback(async (search: string) => {
    if (!token) return;
    setLoadingUsers(true);
    try {
      const res = await UserManagementService.userControllerGetUsers({
        pageNo: 1,
        pageSize: 100, // Fetch top 100 or search results
        authorization: token,
        searchKey: search || undefined,
      });

      const data = (res as Record<string, unknown>)?.data as Record<string, unknown>;
      const userList = Array.isArray(data?.users) ? data.users : Array.isArray(data) ? data : [];
      setUsers(userList as UserItem[]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users.");
    } finally {
      setLoadingUsers(false);
    }
  }, [token]);

  // Handle open state & debounced search
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        // Clear selection on open
        setSelectedUserIds([]);
        fetchUsers(""); // initial fetch without search
      }, 0);
    } else {
      setTimeout(() => setSearchKey(""), 0);
    }
  }, [open, fetchUsers]);

  // Debounce search effect
  useEffect(() => {
    if (!open) return;
    
    const handler = setTimeout(() => {
      fetchUsers(searchKey);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchKey, fetchUsers, open]);

  const toggleUser = (userId: string) => {
    setSelectedUserIds((prev) => 
      prev.includes(userId) 
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserIds.length === 0) {
      toast.error("Please select at least one user to add.");
      return;
    }
    
    if (!token) {
      toast.error("Authentication required.");
      return;
    }

    setSubmitting(true);
    try {
      // API expects single user addition per call based on DTO
      // So we map the selected user IDs to multiple promises
      const addPromises = selectedUserIds.map((userId) => 
        TeamManagementService.teamManagementControllerAddMember({
          authorization: token,
          requestBody: {
            teamId: teamId,
            userId: userId,
          }
        })
      );

      await Promise.all(addPromises);
      
      toast.success("Members added successfully!");
      onOpenChange(false);
      onAdded?.();
    } catch (err: unknown) {
      const errorObj = err as Record<string, unknown>;
      const body = errorObj?.body as Record<string, unknown>;
      const errors = body?.errors as Array<Record<string, unknown>>;
      const msg =
        errors
          ?.map((e) => (e.message as string) ?? (e.field as string))
          ?.join(", ") ??
        (body?.message as string) ??
        "Failed to add members. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
          <DialogTitle className="text-xl font-semibold text-brand-navy">
            Add Team Members
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Search and select users to add to this team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col h-125">
          {/* Search Bar Area */}
          <div className="p-4 border-b border-border/40 bg-muted/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search users by name or email..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="pl-9 h-10 bg-white"
              />
            </div>
          </div>

          {/* User List Area */}
          <div className="flex-1 overflow-y-auto p-2">
            {loadingUsers ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : users.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-sm text-muted-foreground">No users found.</p>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {users.map((user) => (
                  <label 
                    key={user._id} 
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors border ${
                      selectedUserIds.includes(user._id) 
                        ? "bg-brand-navy/5 border-brand-navy/20" 
                        : "hover:bg-muted/50 border-transparent"
                    }`}
                  >
                    <input 
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-navy focus:ring-brand-navy"
                      checked={selectedUserIds.includes(user._id)}
                      onChange={() => toggleUser(user._id)}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800">{user.name}</span>
                      <span className="text-xs text-slate-500">{user.email} {user.role?.name ? `• ${user.role.name}` : ""}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Footer Area */}
          <div className="p-4 border-t border-border/40 bg-muted/10 flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">
              {selectedUserIds.length} selected
            </span>
            <Button
              type="submit"
              disabled={submitting || selectedUserIds.length === 0}
              className="bg-brand-navy hover:bg-brand-navy-dark text-white px-6 h-10"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Members"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
