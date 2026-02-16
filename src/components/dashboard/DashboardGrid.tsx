"use client";

import { useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { TasksModal } from "@/components/task/TasksModal";
import { ProjectsModal } from "@/components/project/ProjectsModal";
import { DASHBOARD_CARDS } from "@/constants/dashboard";

export function DashboardGrid() {
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);

  const handleCardClick = (cardId: string) => {
    if (cardId === "tasks") {
      setIsTasksModalOpen(true);
    } else if (cardId === "projects") {
      setIsProjectsModalOpen(true);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_CARDS.map((card) => (
          <DashboardCard
            key={card.id}
            data={card}
            onClick={handleCardClick}
          />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Click on any card to view detailed history and manage operations
      </p>

      {/* Tasks Modal */}
      <TasksModal open={isTasksModalOpen} onOpenChange={setIsTasksModalOpen} />

      {/* Projects Modal */}
      <ProjectsModal open={isProjectsModalOpen} onOpenChange={setIsProjectsModalOpen} />
    </section>
  );
}
