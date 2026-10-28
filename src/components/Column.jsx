import { FiPlus, FiMoreHorizontal } from "react-icons/fi";
import TaskCard from "./TaskCard";

function Column({ column, tasks }) {
  const handleAddTask = () => {
    window.dispatchEvent(new Event("taskflow:add-task"));
  };

  return (
    <section
      className={`min-w-0 overflow-hidden rounded-2xl border ${column.border} bg-white shadow-sm`}
    >
      {/* Column header */}
      <div className={`${column.headerBg} border-b ${column.border} p-4`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className={`h-3 w-3 rounded-full ${column.dot}`} />

            <h3 className="font-bold text-slate-800">
              {column.title}
            </h3>

            <span
              className={`flex h-6 min-w-6 items-center justify-center rounded-lg px-1.5 text-xs font-bold ${column.countBg}`}
            >
              {tasks.length}
            </span>
          </div>

          <button
            type="button"
            aria-label={`More options for ${column.title}`}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/80 hover:text-slate-700"
          >
            <FiMoreHorizontal size={20} />
          </button>
        </div>

        <p className="mt-2 pl-5 text-xs text-slate-500">
          {column.subtitle}
        </p>
      </div>

      {/* Task cards */}
      <div className="space-y-3 bg-slate-50/70 p-3 sm:p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} column={column} />
          ))
        ) : (
          <div className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-8 text-center">
            <p className="text-sm font-medium text-slate-400">
              No tasks here yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add a task to get started.
            </p>
          </div>
        )}

        {/* Add task button */}
        <button
          type="button"
          onClick={handleAddTask}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border border-dashed ${column.button} px-4 py-3 text-sm font-semibold transition`}
        >
          <FiPlus size={17} />
          Add a task
        </button>
      </div>
    </section>
  );
}

export default Column;