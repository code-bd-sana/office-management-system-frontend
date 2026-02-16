"use client";

import { useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { TasksModal } from "@/components/task/TasksModal";
import { ProjectsModal } from "@/components/project/ProjectsModal";
import { LearningModal } from "@/components/learning/LearningModal";
import { AttendanceModal } from "@/components/attendance/AttendanceModal";
import { DCRSubmissionModal } from "@/components/dcr/DCRSubmissionModal";
import { ShiftAssignmentModal } from "@/components/shift-assignment/ShiftAssignmentModal";
import { DASHBOARD_CARDS } from "@/constants/dashboard";

export function DashboardGrid() {
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isDCRModalOpen, setIsDCRModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);

  const handleCardClick = (cardId: string) => {
    if (cardId === "tasks") {
      setIsTasksModalOpen(true);
    } else if (cardId === "projects") {
      setIsProjectsModalOpen(true);
    } else if (cardId === "learning-training") {
      setIsLearningModalOpen(true);
    } else if (cardId === "my-attendance") {
      setIsAttendanceModalOpen(true);
    } else if (cardId === "dcr-submission") {
      setIsDCRModalOpen(true);
    } else if (cardId === "shift-assignment") {
      setIsShiftModalOpen(true);
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

      {/* Learning & Training Modal */}
      <LearningModal open={isLearningModalOpen} onOpenChange={setIsLearningModalOpen} />

      {/* Attendance Modal */}
      <AttendanceModal open={isAttendanceModalOpen} onClose={() => setIsAttendanceModalOpen(false)} />

      {/* DCR Submission Modal */}
      <DCRSubmissionModal open={isDCRModalOpen} onClose={() => setIsDCRModalOpen(false)} />

      {/* Shift Assignment Modal */}
      <ShiftAssignmentModal open={isShiftModalOpen} onClose={() => setIsShiftModalOpen(false)} />
    </section>
  );
}
