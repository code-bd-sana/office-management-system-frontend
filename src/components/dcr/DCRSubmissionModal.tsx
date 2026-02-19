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
      <DialogContent className="w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto p-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">DCR Submission</DialogTitle>
        <DialogDescription className="sr-only">
          Submit your Daily Call Report
        </DialogDescription>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">
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

        <div className="flex w-full items-end justify-end px-4 sm:px-6">
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
        <div className="px-4 py-2 max-h-125 overflow-y-auto sm:px-6">
          {submissions.map((item) => (
            <DCRListItem key={item.id} item={item} onToggle={handleToggle} />
          ))}
        </div>

        {/* Footer with Submit Button */}
        <div className="flex justify-end border-t px-4 py-3 sm:px-6 sm:py-4">
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
