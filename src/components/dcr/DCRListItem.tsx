"use client";

import { MoreVertical } from "lucide-react";
import type { DCRSubmissionItem } from "@/types/dcr";

interface DCRListItemProps {
  item: DCRSubmissionItem;
  onToggle: (id: string) => void;
}

export function DCRListItem({ item, onToggle }: DCRListItemProps) {
  return (
    <div className="flex items-start gap-2.5 border-b border-border/40 py-3 last:border-b-0 sm:gap-4 sm:py-4">
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
        <p className="hidden md:block text-sm text-foreground/80 leading-relaxed">
          {item.description.split(" ").slice(0, 30).join(" ")}
          {item.description.split(" ").length > 30 && "..."}
        </p>
        <p className="block md:hidden text-sm text-foreground/80 leading-relaxed">
          {item.description.split(" ").slice(0, 10).join(" ")}
          {item.description.split(" ").length > 10 && "..."}
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
