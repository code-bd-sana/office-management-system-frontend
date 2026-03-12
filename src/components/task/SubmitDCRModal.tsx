"use client";

import { useRef, useState } from "react";
import { Loader2, Upload, X, FileText, Image, File } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { TaskManagementService } from "@/api";
import { useAccessToken } from "@/hooks/useAccessToken";

/* ── Allowed file types (must match backend) ────────────────── */
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "text/plain",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_FILES = 10;

const ACCEPT_STRING =
  ".jpg,.jpeg,.png,.webp,.txt,.pdf,.doc,.docx,.ppt,.pptx";

/* ── File icon helper ───────────────────────────────────────── */
function getFileIcon(type: string) {
  if (type.startsWith("image/")) return <Image className="h-4 w-4 text-blue-500" />;
  if (type === "application/pdf") return <FileText className="h-4 w-4 text-red-500" />;
  return <File className="h-4 w-4 text-gray-500" />;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ── Props ──────────────────────────────────────────────────── */
interface SubmitDCRModalProps {
  taskId: string | null;
  taskName?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted?: () => void;
}

/* ── Component ──────────────────────────────────────────────── */
export function SubmitDCRModal({
  taskId,
  taskName,
  open,
  onOpenChange,
  onSubmitted,
}: SubmitDCRModalProps) {
  const token = useAccessToken();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  /* ── Reset on close ──────────────────────────────────────── */
  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setFiles([]);
      setSubmitting(false);
    }
    onOpenChange(val);
  };

  /* ── File validation & add ───────────────────────────────── */
  const addFiles = (incoming: FileList | File[]) => {
    const newFiles: File[] = [];
    const fileArray = Array.from(incoming);

    for (const file of fileArray) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`"${file.name}" is not a supported file type.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" exceeds 20 MB limit.`);
        continue;
      }
      newFiles.push(file);
    }

    setFiles((prev) => {
      const combined = [...prev, ...newFiles];
      if (combined.length > MAX_FILES) {
        toast.error(`Maximum ${MAX_FILES} files allowed.`);
        return combined.slice(0, MAX_FILES);
      }
      return combined;
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /* ── Drag & drop ─────────────────────────────────────────── */
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  /* ── Submit ──────────────────────────────────────────────── */
  const handleSubmit = async () => {
    if (!taskId || !token || files.length === 0) return;
    setSubmitting(true);

    try {
      const blobs: Blob[] = files.map(
        (f) => new Blob([f], { type: f.type }),
      );

      await TaskManagementService.taskControllerSubmitDcr({
        id: taskId,
        authorization: token,
        formData: { dcrFiles: blobs },
      });

      toast.success("DCR submitted successfully.");
      handleOpenChange(false);
      onSubmitted?.();
    } catch (err: any) {
      const msg =
        err?.body?.message ?? err?.body?.error ?? "Failed to submit DCR.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[85vh] w-[calc(100vw-2rem)] max-w-lg overflow-y-auto sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-brand-navy">
            Submit DCR
          </DialogTitle>
          <DialogDescription>
            {taskName
              ? `Upload your DCR files for "${taskName}".`
              : "Upload your DCR files for this task."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {/* ── Drop zone ──────────────────────────────────── */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-sm border-2 border-dashed p-6 text-center transition-colors ${
              isDragOver
                ? "border-brand-navy bg-brand-navy/5"
                : "border-border/60 hover:border-brand-navy/40 hover:bg-muted/20"
            }`}
          >
            <Upload className="mx-auto h-8 w-8 text-muted-foreground/60" />
            <p className="mt-2 text-sm font-medium text-foreground/80">
              Drag & drop files here, or{" "}
              <span className="text-brand-navy underline">browse</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Images, PDF, Word, PowerPoint, Text — Max 20 MB each, up to{" "}
              {MAX_FILES} files
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPT_STRING}
              className="hidden"
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          {/* ── File list ──────────────────────────────────── */}
          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground/80">
                {files.length} file{files.length > 1 ? "s" : ""} selected
              </p>
              <div className="max-h-48 space-y-1.5 overflow-y-auto">
                {files.map((file, idx) => (
                  <div
                    key={`${file.name}-${idx}`}
                    className="flex items-center justify-between rounded-sm bg-muted/40 px-3 py-2"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {getFileIcon(file.type)}
                      <span className="truncate text-sm text-foreground/80">
                        {file.name}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="ml-2 shrink-0 text-muted-foreground hover:text-red-500 transition-colors"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Submit button ──────────────────────────────── */}
          <Button
            onClick={handleSubmit}
            disabled={submitting || files.length === 0}
            className="w-full rounded-sm bg-brand-navy py-5 text-sm font-semibold shadow-md transition-all hover:bg-brand-navy-dark hover:shadow-lg active:scale-[0.98]"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : (
              "Submit DCR"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
