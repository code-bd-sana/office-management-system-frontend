"use client";

import { cn } from "@/lib/utils";
import type { TaskFilterTab, TaskStatus } from "@/types/task";

interface TaskFilterTabsProps {
  tabs: TaskFilterTab[];
  activeTab: TaskStatus | "all";
  onTabChange: (value: TaskStatus | "all") => void;
}

export function TaskFilterTabs({
  tabs,
  activeTab,
  onTabChange,
}: TaskFilterTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "rounded-sm px-2 py-1.5 text-xs font-medium transition-colors border sm:px-3 sm:py-1 sm:text-sm",
              isActive
                ? "border-brand-navy bg-brand-navy text-white shadow-sm"
                : "border-border bg-white text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {tab.label} ({tab.count})
          </button>
        );
      })}
    </div>
  );
}
