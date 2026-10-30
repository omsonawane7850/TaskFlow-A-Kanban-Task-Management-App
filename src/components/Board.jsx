import { FiFilter, FiChevronDown } from "react-icons/fi";
import Column from "./Column";

const columns = [
  {
    id: "todo",
    title: "To Do",
    subtitle: "Ready when you are",
    dot: "bg-blue-500",
    headerBg: "bg-blue-50",
    border: "border-blue-100",
    countBg: "bg-blue-100 text-blue-700",
    button: "border-blue-200 text-blue-700 hover:bg-blue-100",
  },
  {
    id: "in-progress",
    title: "In Progress",
    subtitle: "Work in motion",
    dot: "bg-orange-500",
    headerBg: "bg-orange-50",
    border: "border-orange-100",
    countBg: "bg-orange-100 text-orange-700",
    button: "border-orange-200 text-orange-700 hover:bg-orange-100",
  },
  {
    id: "done",
    title: "Completed",
    subtitle: "Look what you achieved",
    dot: "bg-emerald-500",
    headerBg: "bg-emerald-50",
    border: "border-emerald-100",
    countBg: "bg-emerald-100 text-emerald-700",
    button: "border-emerald-200 text-emerald-700 hover:bg-emerald-100",
  },
];

function Board({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <div>
      {/* Board toolbar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Your Tasks
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your work across all stages.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <FiFilter size={15} />
          Filter
          <FiChevronDown size={14} />
        </button>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.id
          );

          return (
            <Column
              key={column.id}
              column={column}
              tasks={columnTasks}
              onAddTask={onAddTask}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Board;