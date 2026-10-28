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
    title: "Done",
    subtitle: "Look at you go!",
    dot: "bg-emerald-500",
    headerBg: "bg-emerald-50",
    border: "border-emerald-100",
    countBg: "bg-emerald-100 text-emerald-700",
    button: "border-emerald-200 text-emerald-700 hover:bg-emerald-100",
  },
];

function Board({ tasks }) {
  return (
    <section>
      {/* Board toolbar */}
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-bold text-slate-900">Project tasks</h2>

          <p className="mt-1 text-sm text-slate-500">
            Everything you need to get done, all in one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <FiFilter size={16} />
            Filters
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            All tasks
            <FiChevronDown size={15} />
          </button>
        </div>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id);

          return <Column key={column.id} column={column} tasks={columnTasks} />;
        })}
      </div>
    </section>
  );
}

export default Board;
