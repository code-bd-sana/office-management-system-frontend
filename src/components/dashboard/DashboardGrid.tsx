"use client";

import { useEffect, useMemo, useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { TasksModal } from "@/components/task/TasksModal";
import { ProjectsModal } from "@/components/project/ProjectsModal";
import { LearningModal } from "@/components/learning/LearningModal";
import { AttendanceModal } from "@/components/attendance/AttendanceModal";
import { DCRSubmissionModal } from "@/components/dcr/DCRSubmissionModal";
import { ShiftAssignmentModal } from "@/components/shift-assignment/ShiftAssignmentModal";
import { TeamMembersModal } from "@/components/team/TeamMembersModal";
import { DASHBOARD_CARDS } from "@/constants/dashboard";
import { TaskManagementService } from "@/api";
import { useAccessToken } from "@/hooks/useAccessToken";

function getTaskCountFromResponse(payload: unknown): number {
  if (!payload || typeof payload !== "object") return 0;

  const envelope = payload as { data?: unknown };
  if (!envelope.data || typeof envelope.data !== "object") return 0;

  const data = envelope.data as Record<string, unknown>;

  const totalKeys = ["total", "totalRecords", "count", "totalCount"];
  for (const key of totalKeys) {
    const value = data[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
  }

  const tasksValue = data.tasks;
  if (Array.isArray(tasksValue)) {
    return tasksValue.length;
  }

  const nestedDataValue = data.data;
  if (Array.isArray(nestedDataValue)) {
    return nestedDataValue.length;
  }

  return 0;
}

export function DashboardGrid() {
  const token = useAccessToken();

  const [taskCount, setTaskCount] = useState<number>(() => {
    const taskCard = DASHBOARD_CARDS.find((card) => card.id === "tasks");
    return taskCard?.count ?? 0;
  });

  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isDCRModalOpen, setIsDCRModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isTeamMembersModalOpen, setIsTeamMembersModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadTaskCount = async () => {
      if (!token) return;
      try {
        const res = await TaskManagementService.taskControllerFindAll({
          authorization: token,
          pageNo: 1,
          pageSize: 1,
        });

        const count = getTaskCountFromResponse(res);
        if (mounted) setTaskCount(count);
      } catch {
        // Keep the previous value if count request fails.
      }
    };

    loadTaskCount();

    return () => {
      mounted = false;
    };
  }, [token]);

  const dashboardCards = useMemo(
    () =>
      DASHBOARD_CARDS.map((card) =>
        card.id === "tasks" ? { ...card, count: taskCount } : card,
      ),
    [taskCount],
  );

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
    } else if (cardId === "team-members") {
      setIsTeamMembersModalOpen(true);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <DashboardCard key={card.id} data={card} onClick={handleCardClick} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Click on any card to view detailed history and manage operations
      </p>

      {/* Tasks Modal */}
      <TasksModal open={isTasksModalOpen} onOpenChange={setIsTasksModalOpen} />

      {/* Projects Modal */}
      <ProjectsModal
        open={isProjectsModalOpen}
        onOpenChange={setIsProjectsModalOpen}
      />

      {/* Learning & Training Modal */}
      <LearningModal
        open={isLearningModalOpen}
        onOpenChange={setIsLearningModalOpen}
      />

      {/* Attendance Modal */}
      <AttendanceModal
        open={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
      />

      {/* DCR Submission Modal */}
      <DCRSubmissionModal
        open={isDCRModalOpen}
        onClose={() => setIsDCRModalOpen(false)}
      />

      {/* Shift Assignment Modal */}
      <ShiftAssignmentModal
        open={isShiftModalOpen}
        onClose={() => setIsShiftModalOpen(false)}
      />

      {/* Team Members Modal */}
      <TeamMembersModal
        open={isTeamMembersModalOpen}
        onOpenChange={setIsTeamMembersModalOpen}
      />
    </section>
  );
}
