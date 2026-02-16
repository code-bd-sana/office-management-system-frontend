import { CloudUpload } from "lucide-react";

export function DCRUploadArea() {
  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-semibold text-foreground/80">
        Attach Documents <span className="text-red-500">*</span>
      </p>

      <div className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border-2 border-dashed border-border/60 bg-gray-50 py-10 transition-colors hover:border-brand-navy/30 hover:bg-gray-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
          <CloudUpload className="h-5 w-5 text-brand-navy-light" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground/90">
            <span className="font-bold text-brand-navy hover:underline">
              Click to Upload
            </span>{" "}
            or drag and drop
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            (Max. File size: 25 MB)
          </p>
        </div>
      </div>
    </div>
  );
}
