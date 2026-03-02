"use client";

import { useState, useCallback } from "react";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { useAccessToken } from "@/hooks/useAccessToken";
import { useUserInfo } from "@/hooks/useUserInfo";
import { SellsShiftManagementService } from "@/api";
import { RequestShiftExchangeDto } from "@/api/models/RequestShiftExchangeDto";

/* ─── types ─── */
type ShiftEnum = "MORNING" | "EVENING" | "NIGHT";

const SHIFT_OPTIONS: { value: ShiftEnum; label: string }[] = [
  { value: "MORNING", label: "Morning Shift" },
  { value: "EVENING", label: "Evening Shift" },
  { value: "NIGHT", label: "Night Shift" },
];

interface RequestShiftChangeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

/* ─── component ─── */
export function RequestShiftChangeModal({
  open,
  onClose,
  onSubmit,
}: RequestShiftChangeModalProps) {
  const token = useAccessToken();
  const { name, employeeId } = useUserInfo();

  /* form state */
  const [exchangeDate, setExchangeDate] = useState<Date | undefined>();
  const [originalShift, setOriginalShift] = useState<ShiftEnum | "">("");
  const [newShift, setNewShift] = useState<ShiftEnum | "">("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const resetForm = useCallback(() => {
    setExchangeDate(undefined);
    setOriginalShift("");
    setNewShift("");
    setReason("");
    setSubmitting(false);
  }, []);

  /* close handler */
  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  /* initials for avatar */
  const initials = name
    ? name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  /* submit */
  const handleSubmit = async () => {
    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      return;
    }
    if (!exchangeDate || !originalShift || !newShift) {
      toast.warning("Please fill all required fields.");
      return;
    }
    if (originalShift === newShift) {
      toast.warning("Original shift and new shift cannot be the same.");
      return;
    }

    setSubmitting(true);
    try {
      await SellsShiftManagementService.sellsShiftManagementControllerRequestShiftExchange(
        {
          authorization: token,
          requestBody: {
            exchangeDate: format(exchangeDate, "yyyy-MM-dd"),
            originalShift:
              originalShift as unknown as RequestShiftExchangeDto.originalShift,
            newShift:
              newShift as unknown as RequestShiftExchangeDto.newShift,
            ...(reason.trim() ? { reason: reason.trim() } : {}),
          },
        }
      );

      toast.success("Shift change request submitted successfully!");
      onSubmit();
      handleClose();
    } catch (err: any) {
      const msg =
        err?.body?.message ?? err?.message ?? "Failed to submit request.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit =
    !!exchangeDate && !!originalShift && !!newShift && !submitting;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100vw-2rem)] p-0 sm:max-w-xl">
        <DialogTitle className="sr-only">Request Shift Change</DialogTitle>
        <DialogDescription className="sr-only">
          Submit a request to change your shift assignment
        </DialogDescription>

        {/* Header */}
        <div className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">
            Request Shift Change
          </h2>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 px-4 pb-4 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#044192] text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm">
            {initials}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground sm:text-base">
              {name ?? "—"}
            </h3>
            <p className="text-xs text-muted-foreground">
              Employee ID: {employeeId ?? "—"}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4 px-4 pb-4 sm:space-y-5 sm:px-6 sm:pb-6">
          {/* Exchange Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Exchange Date <span className="text-red-500">*</span>
            </label>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-sm text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {exchangeDate ? (
                    format(exchangeDate, "MMMM d, yyyy")
                  ) : (
                    <span className="text-muted-foreground">
                      Pick a date
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={exchangeDate}
                  onSelect={(d) => {
                    setExchangeDate(d ?? undefined);
                    setDateOpen(false);
                  }}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Original Shift */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Original Shift <span className="text-red-500">*</span>
            </label>
            <Select
              value={originalShift}
              onValueChange={(v) => setOriginalShift(v as ShiftEnum)}
            >
              <SelectTrigger className="w-full rounded-sm">
                <SelectValue placeholder="Select your current shift" />
              </SelectTrigger>
              <SelectContent>
                {SHIFT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* New Shift */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              New Shift <span className="text-red-500">*</span>
            </label>
            <Select
              value={newShift}
              onValueChange={(v) => setNewShift(v as ShiftEnum)}
            >
              <SelectTrigger className="w-full rounded-sm">
                <SelectValue placeholder="Select the shift you want" />
              </SelectTrigger>
              <SelectContent>
                {SHIFT_OPTIONS.filter((o) => o.value !== originalShift).map(
                  (opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Reason */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Reason{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter your reason for the shift change request"
              rows={4}
              className="w-full resize-none rounded-sm border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-50 rounded-sm bg-[#044192] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#033174] disabled:opacity-50 sm:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}