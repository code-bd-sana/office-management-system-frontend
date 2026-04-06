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
import {
  DepartmentManagementService,
  ProjectManagementService,
  TaskManagementService,
  UserManagementService,
} from "@/api";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useUserInfo } from "@/hooks/useUserInfo";

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== "object") return null;
  return value as UnknownRecord;
}

function normalizeText(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function getResponseData(payload: unknown): UnknownRecord {
  const envelope = asRecord(payload);
  const data = asRecord(envelope?.data);
  return data ?? {};
}

function getArrayByKeys(data: UnknownRecord, keys: string[]): unknown[] {
  for (const key of keys) {
    const value = data[key];
    if (Array.isArray(value)) {
      return value;
    }
  }
  return [];
}

function getNumericValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function getTotalCount(data: UnknownRecord): number | null {
  const totalKeys = [
    "total",
    "totalRecords",
    "count",
    "totalCount",
    "usersCount",
    "projectsCount",
  ];

  for (const key of totalKeys) {
    const numeric = getNumericValue(data[key]);
    if (numeric !== null) {
      return numeric;
    }
  }

  return null;
}

function getSubmittedDcrCount(tasks: unknown[]): number {
  return tasks.reduce<number>((count, task) => {
    const taskRecord = asRecord(task);
    const statusValue = taskRecord?.dcrSubmissionStatus;
    const status =
      typeof statusValue === "string" ? normalizeText(statusValue) : "";

    if (status && status !== "NOT SUBMITTED") {
      return count + 1;
    }

    return count;
  }, 0);
}

export function DashboardGrid() {
  const token = useAccessToken();
  const { role, department } = useUserInfo();

  const normalizedDepartment = normalizeText(department);
  const normalizedRole = normalizeText(role);

  const isSalesDepartment = normalizedDepartment === "SALES";
  const isEmployeeRole = normalizedRole === "EMPLOYEE";

  const [taskCount, setTaskCount] = useState<number>(() => {
    const taskCard = DASHBOARD_CARDS.find((card) => card.id === "tasks");
    return taskCard?.count ?? 0;
  });
  const [projectCount, setProjectCount] = useState<number>(() => {
    const projectCard = DASHBOARD_CARDS.find((card) => card.id === "projects");
    return projectCard?.count ?? 0;
  });
  const [dcrSubmissionCount, setDcrSubmissionCount] = useState<number>(() => {
    const dcrCard = DASHBOARD_CARDS.find((card) => card.id === "dcr-submission");
    return dcrCard?.count ?? 0;
  });
  const [salesMembersCount, setSalesMembersCount] = useState<number>(() => {
    const shiftCard = DASHBOARD_CARDS.find(
      (card) => card.id === "shift-assignment",
    );
    return shiftCard?.count ?? 0;
  });
  const [registeredUsersCount, setRegisteredUsersCount] = useState<number>(() => {
    const attendanceCard = DASHBOARD_CARDS.find(
      (card) => card.id === "my-attendance",
    );
    return attendanceCard?.count ?? 0;
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

    const loadDashboardCounts = async () => {
      if (!token) return;

      try {
        const [tasksRes, projectsRes, usersRes, departmentsRes] =
          await Promise.all([
            TaskManagementService.taskControllerFindAll({
              authorization: token,
              pageNo: 1,
              pageSize: 1000,
            }),
            ProjectManagementService.projectControllerFindAll({
              authorization: token,
              pageNo: 1,
              pageSize: 1,
            }),
            UserManagementService.userControllerGetUsers({
              authorization: token,
              pageNo: 1,
              pageSize: 1,
            }),
            DepartmentManagementService.departmentControllerFindAll({
              pageNo: 1,
              pageSize: 100,
            }),
          ]);

        const tasksData = getResponseData(tasksRes);
        const tasks = getArrayByKeys(tasksData, ["tasks", "data"]);
        const nextTaskCount = getTotalCount(tasksData) ?? tasks.length;
        const nextDcrSubmissionCount = getSubmittedDcrCount(tasks);

        const projectsData = getResponseData(projectsRes);
        const projects = getArrayByKeys(projectsData, ["projects", "data"]);
        const nextProjectCount = getTotalCount(projectsData) ?? projects.length;

        const usersData = getResponseData(usersRes);
        const users = getArrayByKeys(usersData, ["users", "data"]);
        const nextRegisteredUsersCount = getTotalCount(usersData) ?? users.length;

        const departmentsData = getResponseData(departmentsRes);
        const departments = getArrayByKeys(departmentsData, ["departments", "data"]);
        const salesDepartment = departments.find((entry) => {
          const item = asRecord(entry);
          const name =
            item && typeof item.name === "string"
              ? normalizeText(item.name)
              : "";
          return name === "SALES";
        });

        let nextSalesMembersCount = 0;
        const salesDepartmentId = (() => {
          const item = asRecord(salesDepartment);
          return item && typeof item._id === "string" ? item._id : "";
        })();

        if (salesDepartmentId) {
          const salesUsersRes = await UserManagementService.userControllerGetUsers({
            authorization: token,
            pageNo: 1,
            pageSize: 1,
            department: salesDepartmentId,
          });
          const salesUsersData = getResponseData(salesUsersRes);
          const salesUsers = getArrayByKeys(salesUsersData, ["users", "data"]);
          nextSalesMembersCount =
            getTotalCount(salesUsersData) ?? salesUsers.length;
        }

        if (!mounted) return;

        setTaskCount(nextTaskCount);
        setProjectCount(nextProjectCount);
        setDcrSubmissionCount(nextDcrSubmissionCount);
        setSalesMembersCount(nextSalesMembersCount);
        setRegisteredUsersCount(nextRegisteredUsersCount);
      } catch {
        // Keep existing fallback counts if dashboard count requests fail.
      }
    };

    loadDashboardCounts();

    return () => {
      mounted = false;
    };
  }, [token]);

  const dashboardCards = useMemo(() => {
    const cardsWithDynamicTaskCount = DASHBOARD_CARDS.map((card) =>
      card.id === "tasks"
        ? { ...card, count: taskCount }
        : card.id === "projects"
          ? { ...card, count: projectCount }
          : card.id === "dcr-submission"
            ? { ...card, count: dcrSubmissionCount }
            : card.id === "shift-assignment"
              ? { ...card, count: salesMembersCount }
              : card.id === "my-attendance"
                ? { ...card, count: registeredUsersCount }
                : card,
    );

    return cardsWithDynamicTaskCount.filter((card) => {
      if (card.id === "shift-assignment" && !isSalesDepartment) {
        return false;
      }

      if (card.id === "projects" && !isSalesDepartment && isEmployeeRole) {
        return false;
      }

      return true;
    });
  }, [
    taskCount,
    projectCount,
    dcrSubmissionCount,
    salesMembersCount,
    registeredUsersCount,
    isSalesDepartment,
    isEmployeeRole,
  ]);

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
