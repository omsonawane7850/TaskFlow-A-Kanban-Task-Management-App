import {
  FiCalendar,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiMessageSquare,
} from "react-icons/fi";

function TaskCard({ task, onEdit, onDelete }) {
  const priorityStyles = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-emerald-50 text-emerald-600",
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );

    if (confirmed) {
      onDelete(task.id);
    }
  };

  return (
    <article className="group rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Category and actions */}
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
          {task.category}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            title="Edit task"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <FiEdit2 size={15} />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            aria-label={`Delete ${task.title}`}
            title="Delete task"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      </div>

      {/* Task details */}
      <h3 className="mb-2 font-semibold text-slate-800">
        {task.title}
      </h3>

      <p className="mb-4 text-sm leading-6 text-slate-500">
        {task.description || "No description provided."}
      </p>

      {/* Priority and due date */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <span
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
            priorityStyles[task.priority] || priorityStyles.Medium
          }`}
        >
          {task.priority}
        </span>

        {task.status === "done" ? (
          <span className="text-xs font-medium text-emerald-600">
            Completed
          </span>
        ) : task.dueDate ? (
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <FiCalendar size={13} />
            {task.dueDate}
          </span>
        ) : null}
      </div>
    </article>
  );
}

export default TaskCard;