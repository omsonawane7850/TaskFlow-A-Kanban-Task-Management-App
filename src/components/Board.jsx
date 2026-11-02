import { useState } from "react";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { FiFilter, FiChevronDown } from "react-icons/fi";

import Column from "./Column";
import TaskCard from "./TaskCard";

import { useTasks } from "../context/TaskContext";

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

function Board({ onAddTask, onEditTask }) {
  const {
    tasks,
    filteredTasks,
    searchQuery,
    clearSearch,
    deleteTask,
    moveTask,
  } = useTasks();

  const [activeTask, setActiveTask] = useState(null);

  const isSearching = searchQuery.trim().length > 0;

  // Configure drag sensor
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  // When dragging starts
  const handleDragStart = ({ active }) => {
    const selectedTask = tasks.find(
      (task) => String(task.id) === String(active.id),
    );

    setActiveTask(selectedTask || null);
  };

  // When a task is dropped
  const handleDragEnd = ({ active, over }) => {
    setActiveTask(null);

    if (!over) {
      return;
    }

    const draggedTask = tasks.find(
      (task) => String(task.id) === String(active.id),
    );

    if (!draggedTask) {
      return;
    }

    // Identify the destination column
    const targetColumn = columns.find(
      (column) => column.id === String(over.id),
    );

    if (!targetColumn) {
      return;
    }

    // Don't update if the task stays in the same column
    if (draggedTask.status === targetColumn.id) {
      return;
    }

    // Update the task's status
    moveTask(draggedTask.id, targetColumn.id);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return (
    <div className="w-full min-w-0">
      {/* Board toolbar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Your Tasks</h2>

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

      {/* Search result summary */}
      {isSearching && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
          <p className="min-w-0 break-words">
            {filteredTasks.length === 0
              ? `No tasks match "${searchQuery.trim()}"`
              : `Showing ${filteredTasks.length} of ${tasks.length} tasks for "${searchQuery.trim()}"`}
          </p>

          <button
            type="button"
            onClick={clearSearch}
            className="shrink-0 font-semibold underline-offset-2 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Drag-and-drop board */}
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {/* Kanban columns */}
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-5 md:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.id,
            );

            return (
              <div key={column.id} className="w-full min-w-0">
                <Column
                  column={column}
                  tasks={columnTasks}
                  isSearching={isSearching}
                  onAddTask={() => onAddTask(column.id)}
                  onEditTask={onEditTask}
                  onDeleteTask={deleteTask}
                />
              </div>
            );
          })}
        </div>

        {/* Drag preview */}
        <DragOverlay>
          {activeTask ? (
            <div className="rotate-2 cursor-grabbing opacity-95 shadow-2xl">
              <TaskCard
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
                isDragOverlay
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default Board;
