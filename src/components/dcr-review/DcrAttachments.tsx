import PdfIcon from "@/components/icons/PdfIcon";
import { Button } from "@/components/ui/button";
import type { DcrAttachment } from "@/types/dcr-review";

interface DcrAttachmentsProps {
  attachments: DcrAttachment[];
}

export function DcrAttachments({ attachments }: DcrAttachmentsProps) {
  return (
    <div>
      <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
        Attachments
      </h3>
      <div className="space-y-3">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center justify-between rounded-sm border border-border/40 bg-white px-4 py-3 sm:px-5 sm:py-4"
          >
            <div className="flex items-center gap-3">
              <PdfIcon className="h-8 w-7 shrink-0 sm:h-10 sm:w-8" />
              <div>
                <p className="text-sm font-medium text-foreground sm:text-base">
                  {attachment.fileName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {attachment.fileSize}
                </p>
              </div>
            </div>
            <Button
              asChild
              className="rounded-sm bg-[#044192] px-4 py-2 text-xs font-semibold text-white hover:bg-[#044192]/90 sm:px-6 sm:text-sm"
            >
              <a href="">Download</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
