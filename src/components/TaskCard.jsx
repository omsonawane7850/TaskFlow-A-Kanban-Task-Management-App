import {
  FiCalendar,
  FiMoreHorizontal,
  FiMessageSquare,
} from "react-icons/fi";

const priorityStyles = {
  High: "bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-100",
  Medium:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-100",
  Low: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100",
};

const priorityDots = {
  High: "bg-rose-500",
  Medium: "bg-amber-500",
  Low: "bg-emerald-500",
};

const categoryStyles = {
  Design: "bg-violet-50 text-violet-700",
  Development: "bg-sky-50 text-sky-700",
};

function TaskCard({ task, column }) {
  const priorityClass =
    priorityStyles[task.priority] || priorityStyles.Medium;

  const priorityDot =
    priorityDots[task.priority] || priorityDots.Medium;

  const categoryClass =
    categoryStyles[task.category] || "bg-slate-100 text-slate-600";

  return (
    <article className="group relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60">
      {/* Colored top accent */}
      <div
        className={`absolute left-0 top-4 h-8 w-1 rounded-r-full ${column.dot}`}
      />

      {/* Category and menu */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <span
          className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${categoryClass}`}
        >
          {task.category}
        </span>

        <button
          type="button"
          aria-label={`More options for ${task.title}`}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <FiMoreHorizontal size={19} />
        </button>
      </div>

      {/* Title and description */}
      <h4 className="text-[15px] font-bold leading-6 text-slate-800">
        {task.title}
      </h4>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
        {task.description}
      </p>

      {/* Priority */}
      <div className="mt-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${priorityClass}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${priorityDot}`} />

          {task.priority} Priority
        </span>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-100" />

      {/* Due date and task status */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className={`flex items-center gap-1.5 text-xs font-medium ${
            task.status === "done"
              ? "text-emerald-600"
              : "text-slate-500"
          }`}
        >
          {task.status === "done" ? (
            <>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px]">
                ✓
              </span>

              Completed
            </>
          ) : (
            <>
              <FiCalendar size={14} />
              <span>Due {task.dueDate}</span>
            </>
          )}
        </div>

        <div
          className="flex items-center gap-1.5 text-xs text-slate-400"
          title="Comments"
        >
          <FiMessageSquare size={14} />
          <span>0</span>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;