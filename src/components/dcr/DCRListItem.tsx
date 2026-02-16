"use client";

import { MoreVertical } from "lucide-react";
import type { DCRSubmissionItem } from "@/types/dcr";

interface DCRListItemProps {
  item: DCRSubmissionItem;
  onToggle: (id: string) => void;
}

export function DCRListItem({ item, onToggle }: DCRListItemProps) {
  return (
    <div className="flex items-start gap-4 border-b border-border/40 py-4 last:border-b-0">
      {/* Checkbox */}
      <div className="shrink-0 pt-1">
        <input
          type="checkbox"
          checked={item.isChecked}
          onChange={() => onToggle(item.id)}
          className="h-5 w-5 cursor-pointer rounded border-2 border-gray-300 accent-[#00B69B] focus:ring-2 focus:ring-[#00B69B] focus:ring-offset-0"
        />
      </div>

      {/* Description */}
      <div className="flex-1 pt-1">
        <p className="text-sm text-foreground/80 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Date and Menu */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Date with dot indicator */}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-400"></span>
          <span className="text-sm text-foreground/70 whitespace-nowrap">
            {item.date}
          </span>
        </div>

        {/* Three-dot menu */}
        <button
          type="button"
          className="rounded-sm p-1 hover:bg-muted transition-colors"
          aria-label="More options"
        >
          <MoreVertical className="h-5 w-5 text-foreground/70" />
        </button>
      </div>
    </div>
  );
}
