import { useEffect, useRef, useState } from "react";

import {
  FiCalendar,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiMessageSquare,
  FiCheck,
} from "react-icons/fi";

function TaskCard({ task, onEdit, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const priorityStyles = {
    High: {
      badge: "border border-rose-100 bg-rose-50 text-rose-600",
      dot: "bg-rose-500",
    },

    Medium: {
      badge: "border border-amber-100 bg-amber-50 text-amber-600",
      dot: "bg-amber-500",
    },

    Low: {
      badge: "border border-emerald-100 bg-emerald-50 text-emerald-600",
      dot: "bg-emerald-500",
    },
  };

  const categoryStyles = {
    Design: "bg-violet-50 text-violet-700",
    Development: "bg-sky-50 text-sky-700",
    Learning: "bg-amber-50 text-amber-700",
    Planning: "bg-indigo-50 text-indigo-700",
    Personal: "bg-pink-50 text-pink-700",
  };

  const statusAccent = {
    todo: "bg-blue-500",
    "in-progress": "bg-orange-500",
    done: "bg-emerald-500",
  };

  const priority =
    priorityStyles[task.priority] || priorityStyles.Medium;

  const category =
    categoryStyles[task.category] ||
    "bg-slate-100 text-slate-700";

  // Format date from YYYY-MM-DD into Oct 30, 2026
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Handle existing dates such as "Oct 30, 2026"
    if (dateString.includes(",")) {
      return dateString;
    }

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );

    setIsMenuOpen(false);

    if (confirmed) {
      onDelete(task.id);
    }
  };

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit(task);
  };

  return (
    <article className="relative overflow-visible rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Colored status strip */}
      <span
        className={`absolute bottom-auto left-0 top-6 h-10 w-1.5 rounded-r-full ${
          statusAccent[task.status] || "bg-blue-500"
        }`}
      />

      {/* Category and actions */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <span
          className={`rounded-lg px-3 py-2 text-sm font-semibold ${category}`}
        >
          {task.category}
        </span>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-label={`Task options for ${task.title}`}
            aria-expanded={isMenuOpen}
            title="Task options"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiMoreHorizontal size={22} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
              <button
                type="button"
                onClick={handleEdit}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                <FiEdit2 size={15} />
                Edit task
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
              >
                <FiTrash2 size={15} />
                Delete task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Task details */}
      <h3 className="mb-3 break-words text-lg font-bold leading-7 text-slate-800">
        {task.title}
      </h3>

      <p className="mb-6 whitespace-pre-line break-words text-sm leading-7 text-slate-500">
        {task.description || "No description provided."}
      </p>

      {/* Priority */}
      <div className="mb-5">
        <span
          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${priority.badge}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${priority.dot}`}
          />

          {task.priority} Priority
        </span>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        {task.status === "done" ? (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
              <FiCheck size={15} />
            </span>

            Completed
          </span>
        ) : task.dueDate ? (
          <span className="inline-flex items-center gap-2 text-sm text-slate-500">
            <FiCalendar size={19} />

            <span>
              Due {formatDate(task.dueDate)}
            </span>
          </span>
        ) : (
          <span className="text-sm text-slate-400">
            No due date
          </span>
        )}

        <span
          className="inline-flex items-center gap-2 text-sm text-slate-400"
          title="Comments"
        >
          <FiMessageSquare size={19} />
          <span>0</span>
        </span>
      </div>
    </article>
  );
}

export default TaskCard;