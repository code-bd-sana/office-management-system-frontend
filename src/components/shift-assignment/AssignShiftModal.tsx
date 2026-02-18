"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface AssignShiftModalProps {
  open: boolean;
  onClose: () => void;
}

const SHIFT_OPTIONS = ["Morning Shift", "Evening Shift", "Night Shift", "Off Day"];
const MEMBER_OPTIONS = ["Robbi Darwis", "Mahin R.", "John D.", "Sara K."];
const ID_OPTIONS = ["OP 1033", "DP 1034", "EM 1035", "HM 1036"];

export function AssignShiftModal({ open, onClose }: AssignShiftModalProps) {
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [member, setMember] = useState("");
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    console.log("Assign shift:", { date, shift, member, id, startDate, endDate });
    onClose();
  };

  const handleClose = () => {
    setDate("");
    setShift("");
    setMember("");
    setId("");
    setStartDate("");
    setEndDate("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto p-0 sm:max-w-lg">
        <DialogTitle className="sr-only">Assign Shift</DialogTitle>
        <DialogDescription className="sr-only">
          Assign a shift to a team member
        </DialogDescription>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/30 px-5 py-4 sm:px-6 sm:py-5">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">
            Assign Shift
          </h2>
          <button
            onClick={handleClose}
            className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            {/* <X className="h-5 w-5" /> */}
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-6">
          {/* Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Select Date"
                className="w-full rounded-sm border-gray-300 pr-10 text-sm"
              />
            </div>
          </div>

          {/* Shift */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Shift <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full appearance-none rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-[#044192]/40"
              >
                <option value="" disabled>
                  Select Shift
                </option>
                {SHIFT_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ▾
              </span>
            </div>
          </div>

          {/* Member */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Member <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={member}
                onChange={(e) => setMember(e.target.value)}
                className="w-full appearance-none rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-[#044192]/40"
              >
                <option value="" disabled>
                  Select Member
                </option>
                {MEMBER_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ▾
              </span>
            </div>
          </div>

          {/* ID */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full appearance-none rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-[#044192]/40"
              >
                <option value="" disabled>
                  Select ID
                </option>
                {ID_OPTIONS.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ▾
              </span>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Date Range <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="min-w-0">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Start date"
                  className="w-full rounded-sm border-gray-300 text-xs sm:text-sm"
                />
              </div>
              <div className="min-w-0">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="End date"
                  className="w-full rounded-sm border-gray-300 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-1">
            <Button
              onClick={handleSubmit}
              className="rounded-sm bg-[#044192] px-8 py-2 text-sm font-medium text-white hover:bg-[#044192]/90"
            >
              Assign Shift
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
