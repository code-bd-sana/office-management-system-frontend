import { TaskPageHeader } from "./TaskPageHeader";
import { TaskPipeline } from "./TaskPipeline";
import { TaskList } from "./TaskList";
import { DCRPanel } from "./DCRPanel";

export function TaskContent() {
  return (
    <div className="space-y-6">
      {/* Header: description + Add Task button */}
      <TaskPageHeader />

      {/* Pipeline flow: All Tasks → To Do → Submit DCR */}
      <div className="py-2">
        <TaskPipeline />
      </div>

      {/* Two-column layout: Task list + DCR panel */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <TaskList />
        </div>
        <div className="lg:col-span-5">
          <DCRPanel />
        </div>
      </div>
    </div>
  );
}
