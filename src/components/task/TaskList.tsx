"use client";

import { useState, useMemo } from "react";
import { TaskFilterTabs } from "./TaskFilterTabs";
import { TaskItem } from "./TaskItem";
import { TASK_FILTER_TABS, DEMO_TASKS } from "@/constants/task";
import type { TaskStatus } from "@/types/task";

export function TaskList() {
  const [activeTab, setActiveTab] = useState<TaskStatus | "all">("all");

  const filteredTasks = useMemo(() => {
    if (activeTab === "all") return DEMO_TASKS;
    return DEMO_TASKS.filter((task) => task.status === activeTab);
  }, [activeTab]);

  return (
    <div className="h-full rounded-sm bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
      {/* Section heading + Filters */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          My Assigned Tasks
        </h2>

        <TaskFilterTabs
          tabs={TASK_FILTER_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Task items */}
      <div className="mt-4 sm:mt-6">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}

        {filteredTasks.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground/60">
            No tasks found for this filter.
          </p>
        )}
      </div>
    </div>
  );
}
