import { ModalTable, type ColumnDef } from "@/components/shared";
import { TasksModalRow } from "./TasksModalRow";
import { DEMO_TASKS, TASK_FILTER_TABS } from "@/constants/task";
import type { Task, TaskStatus } from "@/types/task";

const TOTAL_RECORDS = 97; // From the screenshot "1-10 of 97"

const COLUMNS: ColumnDef[] = [
  { key: "number", label: "#" },
  { key: "task", label: "Task" },
  { key: "client", label: "Client" },
  { key: "profile", label: "Profile" },
  { key: "project", label: "Project" },
  { key: "dueDate", label: "Due Date" },
  { key: "status", label: "Status" },
];

export function TasksModalTable() {
  const handleFilterData = (
    data: Task[],
    filter: TaskStatus | "all",
    search: string,
  ): Task[] => {
    return data.filter((task) => {
      const matchesFilter = filter === "all" || task.status === filter;
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  };

  return (
    <ModalTable<Task, TaskStatus | "all">
      data={DEMO_TASKS}
      columns={COLUMNS}
      totalRecords={TOTAL_RECORDS}
      filterTabs={TASK_FILTER_TABS}
      defaultFilter="all"
      onFilterData={handleFilterData}
      enableSearch={true}
      searchPlaceholder="Search..."
      renderRow={(task, index) => (
        <TasksModalRow key={task.id} task={task} rowNumber={index + 1} />
      )}
      enableCheckboxes={true}
      rowsPerPageOptions={[10, 20, 50, 100]}
      defaultRowsPerPage={10}
      showDCRButton={true}
    />
  );
}
