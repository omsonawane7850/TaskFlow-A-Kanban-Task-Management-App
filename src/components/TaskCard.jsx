import { useEffect, useRef, useState } from "react";

import { useDraggable } from "@dnd-kit/core";

import {
  FiCalendar,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiMessageSquare,
  FiCheck,
  FiMove,
} from "react-icons/fi";

import ConfirmDialog from "./ConfirmDialog";

function TaskCard({ task, onEdit, onDelete, isDragOverlay = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const menuRef = useRef(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
    disabled: isDragOverlay || isConfirmOpen,
  });

  const dragStyle =
    transform && !isDragOverlay
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

  const priorityStyles = {
    High: {
      badge:
        "border border-rose-100 bg-rose-50 text-rose-600 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400",
      dot: "bg-rose-500",
    },

    Medium: {
      badge:
        "border border-amber-100 bg-amber-50 text-amber-600 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400",
      dot: "bg-amber-500",
    },

    Low: {
      badge:
        "border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },
  };

  const categoryStyles = {
    Design:
      "bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300",
    Development: "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
    Learning:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
    Planning:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
    Personal: "bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300",
  };

  const statusAccent = {
    todo: "bg-blue-500",
    "in-progress": "bg-orange-500",
    done: "bg-emerald-500",
  };

  const priority = priorityStyles[task.priority] || priorityStyles.Medium;

  const category =
    categoryStyles[task.category] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

  const formatDate = (dateString) => {
    if (!dateString) return "";

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDelete = () => {
    setIsMenuOpen(false);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    onDelete(task.id);
    setIsConfirmOpen(false);
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
  };

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit(task);
  };

  const isDragDisabled = isDragOverlay || isConfirmOpen;

  // Desktop: poora card MOUSE se drag hoga (sirf onMouseDown).
  // Touch: sirf move icon se drag hoga (listeners handle pe hain).
  const cardMouseListeners =
    !isDragDisabled && listeners?.onMouseDown
      ? { onMouseDown: listeners.onMouseDown }
      : {};

  return (
    <>
      <article
        ref={setNodeRef}
        style={dragStyle}
        {...cardMouseListeners}
        className={`relative overflow-visible rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/40 md:p-3 lg:p-4 ${
          isDragOverlay
            ? "cursor-grabbing"
            : "pointer-fine:cursor-grab pointer-fine:active:cursor-grabbing"
        } ${isDragging && !isDragOverlay ? "z-10 opacity-30" : ""}`}
      >
        {/* Drag handle (touch + keyboard ke liye, mouse pe bhi chalta hai) */}
        <button
          ref={setActivatorNodeRef}
          type="button"
          {...attributes}
          {...listeners}
          disabled={isDragDisabled}
          title="Drag task to another column"
          aria-label={`Drag ${task.title}`}
          onClick={(event) => event.stopPropagation()}
          className="absolute right-11 top-4 z-10 flex cursor-grab touch-none items-center justify-center rounded-md p-1.5 text-slate-300 transition hover:bg-slate-100 hover:text-slate-500 active:cursor-grabbing dark:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 lg:right-12 lg:top-5"
        >
          <FiMove size={15} />
        </button>

        {/* Status strip */}
        <span
          className={`absolute left-0 top-4 h-9 w-1.5 rounded-r-full lg:top-5 ${
            statusAccent[task.status] || "bg-blue-500"
          }`}
        />

        {/* Category and actions */}
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-4">
          <span
            className={`max-w-[75%] truncate rounded-lg px-2.5 py-1.5 text-xs font-semibold ${category}`}
          >
            {task.category}
          </span>

          {/* mousedown yahin rok diya taaki menu click pe card drag na ho */}
          <div
            className="relative shrink-0"
            ref={menuRef}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label={`Task options for ${task.title}`}
              aria-expanded={isMenuOpen}
              title="Task options"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                setIsMenuOpen((open) => !open);
              }}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <FiMoreHorizontal size={22} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-300"
                >
                  <FiEdit2 size={15} />
                  Edit task
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-300 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
                >
                  <FiTrash2 size={15} />
                  Delete task
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Task details */}
        <h3 className="mb-2 line-clamp-2 wrap-break-word text-base font-bold leading-6 text-slate-800 dark:text-slate-100">
          {task.title}
        </h3>

        <p className="mb-4 line-clamp-2 whitespace-pre-line wrap-break-word text-sm leading-5 text-slate-500 dark:text-slate-400 lg:mb-4">
          {task.description || "No description provided."}
        </p>

        {/* Priority */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium ${priority.badge}`}
          >
            <span className={`h-2 w-2 shrink-0 rounded-full ${priority.dot}`} />
            {task.priority} Priority
          </span>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
          {task.status === "done" ? (
            <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60">
                <FiCheck size={15} />
              </span>
              Completed
            </span>
          ) : task.dueDate ? (
            <span className="inline-flex min-w-0 items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <FiCalendar size={17} className="shrink-0" />
              <span className="wrap-break-word">
                Due {formatDate(task.dueDate)}
              </span>
            </span>
          ) : (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              No due date
            </span>
          )}

          <span
            className="inline-flex shrink-0 items-center gap-2 text-xs text-slate-400 dark:text-slate-500"
            title="Comments"
          >
            <FiMessageSquare size={17} />
            <span>0</span>
          </span>
        </div>
      </article>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete task?"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default TaskCard;
