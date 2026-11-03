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

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
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

  const priority = priorityStyles[task.priority] || priorityStyles.Medium;

  const category =
    categoryStyles[task.category] || "bg-slate-100 text-slate-700";

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

  return (
    <>
      <article
        ref={setNodeRef}
        style={dragStyle}
        {...attributes}
        {...listeners}
        className={`relative overflow-visible rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${
          isDragOverlay
            ? "cursor-grabbing"
            : "cursor-grab active:cursor-grabbing"
        } ${isDragging && !isDragOverlay ? "z-10 opacity-30" : ""}`}
      >
        {/* Drag handle */}
        <div
          className="absolute right-11 top-5 z-10 flex items-center justify-center rounded-md p-1.5 text-slate-300 transition hover:bg-slate-100 hover:text-slate-500 sm:right-12 sm:top-6"
          title="Drag task to another column"
          aria-label={`Drag ${task.title}`}
        >
          <FiMove size={15} />
        </div>

        {/* Status strip */}
        <span
          className={`absolute bottom-auto left-0 top-5 h-9 w-1.5 rounded-r-full sm:top-6 sm:h-10 ${
            statusAccent[task.status] || "bg-blue-500"
          }`}
        />

        {/* Category and actions */}
        <div className="mb-4 flex items-center justify-between gap-2 sm:mb-5 sm:gap-3">
          <span
            className={`max-w-[75%] truncate rounded-lg px-2.5 py-1.5 text-xs font-semibold sm:px-3 sm:py-2 sm:text-sm ${category}`}
          >
            {task.category}
          </span>

          <div className="relative" ref={menuRef}>
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
        <h3 className="mb-2 break-words text-base font-bold leading-6 text-slate-800 sm:mb-3 sm:text-lg sm:leading-7">
          {task.title}
        </h3>

        <p className="mb-5 whitespace-pre-line break-words text-sm leading-6 text-slate-500 sm:mb-6 sm:leading-7">
          {task.description || "No description provided."}
        </p>

        {/* Priority */}
        <div className="mb-4 sm:mb-5">
          <span
            className={`inline-flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium sm:px-3 sm:text-sm ${priority.badge}`}
          >
            <span className={`h-2 w-2 shrink-0 rounded-full ${priority.dot}`} />
            {task.priority} Priority
          </span>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:pt-4">
          {task.status === "done" ? (
            <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-600 sm:text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                <FiCheck size={15} />
              </span>
              Completed
            </span>
          ) : task.dueDate ? (
            <span className="inline-flex items-center gap-2 text-xs text-slate-500 sm:text-sm">
              <FiCalendar size={17} />
              <span>Due {formatDate(task.dueDate)}</span>
            </span>
          ) : (
            <span className="text-xs text-slate-400 sm:text-sm">
              No due date
            </span>
          )}

          <span
            className="inline-flex items-center gap-2 text-xs text-slate-400 sm:text-sm"
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
