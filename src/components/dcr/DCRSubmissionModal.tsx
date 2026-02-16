"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DCRListItem } from "./DCRListItem";
import { DEMO_DCR_SUBMISSIONS } from "@/constants/dcr";
import { X } from "lucide-react";
import type { DCRSubmissionItem } from "@/types/dcr";

interface DCRSubmissionModalProps {
  open: boolean;
  onClose: () => void;
}

export function DCRSubmissionModal({ open, onClose }: DCRSubmissionModalProps) {
  const [submissions, setSubmissions] =
    useState<DCRSubmissionItem[]>(DEMO_DCR_SUBMISSIONS);

  const handleToggle = (id: string) => {
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item,
      ),
    );
  };

  const handleUpload = () => {
    // TODO: Implement file upload functionality
    console.log("Upload clicked");
  };

  const handleSubmit = () => {
    // TODO: Implement submit functionality
    const checkedItems = submissions.filter((item) => item.isChecked);
    console.log("Submit clicked with items:", checkedItems);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl p-0">
        <DialogTitle className="sr-only">DCR Submission</DialogTitle>
        <DialogDescription className="sr-only">
          Submit your Daily Call Report
        </DialogDescription>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-semibold text-foreground">
            DCR Submission
          </h2>
          <div className="flex items-center gap-3">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="rounded-sm p-1.5 hover:bg-muted transition-colors"
            >
              {/* <X className="h-5 w-5" /> */}
            </button>
          </div>
        </div>

        <div className="flex w-full items-end justify-end px-6">
          <Button
            onClick={handleUpload}
            className="flex items-center gap-2 rounded-sm bg-[#14804A] px-5 py-2 text-sm font-medium text-white hover:bg-[#14804A]/90"
          >
            <Image
              src="/icons/upload-icons.png"
              alt="Upload"
              width={16}
              height={16}
              className="h-4 w-4"
            />
            Upload
          </Button>
        </div>

        {/* List Content */}
        <div className="px-6 py-2 max-h-125 overflow-y-auto">
          {submissions.map((item) => (
            <DCRListItem key={item.id} item={item} onToggle={handleToggle} />
          ))}
        </div>

        {/* Footer with Submit Button */}
        <div className="flex justify-end border-t px-6 py-4">
          <Button
            onClick={handleSubmit}
            className="rounded-sm bg-[#044192] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#033174]"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
