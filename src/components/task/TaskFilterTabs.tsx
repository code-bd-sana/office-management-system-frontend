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
    <div className="flex flex-wrap items-center gap-3">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "rounded-sm px-5 py-2 text-sm font-medium transition-colors border",
              isActive
                ? "border-brand-navy bg-brand-navy text-white shadow-sm"
                : "border-border bg-white text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {tab.label} ({tab.count})
          </button>
        );
      })}
    </div>
  );
}
