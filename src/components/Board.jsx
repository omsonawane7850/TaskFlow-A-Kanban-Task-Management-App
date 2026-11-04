import { useState } from "react";

import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  MeasuringStrategy,
  pointerWithin,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { FiFilter, FiChevronDown, FiX } from "react-icons/fi";

import Column from "./Column";
import TaskCard from "./TaskCard";

import { useTasks } from "../context/TaskContext";

const columns = [
  {
    id: "todo",
    title: "To Do",
    subtitle: "Ready when you are",
    dot: "bg-blue-500",
    headerBg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-100 dark:border-blue-900/60",
    countBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",
    button:
      "border-blue-200 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950",
  },
  {
    id: "in-progress",
    title: "In Progress",
    subtitle: "Work in motion",
    dot: "bg-orange-500",
    headerBg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-100 dark:border-orange-900/60",
    countBg:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/60 dark:text-orange-300",
    button:
      "border-orange-200 text-orange-700 hover:bg-orange-100 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950",
  },
  {
    id: "done",
    title: "Done",
    subtitle: "Look at you go!",
    dot: "bg-emerald-500",
    headerBg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-100 dark:border-emerald-900/60",
    countBg:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300",
    button:
      "border-emerald-200 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950",
  },
];

const priorityOrder = {
  High: 1,
  Medium: 2,
  Low: 3,
};

const selectClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-blue-500 dark:focus:ring-blue-950";

const labelClass =
  "mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400";

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

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const isSearching = searchQuery.trim().length > 0;

  const hasActiveFilters = priorityFilter !== "all" || categoryFilter !== "all";

  const hasActiveControls = hasActiveFilters || sortBy !== "default";

  // Filter and sort tasks
  const visibleTasks = [...filteredTasks]
    .filter((task) => {
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "all" || task.category === categoryFilter;

      return matchesPriority && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        return (
          (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
        );
      }

      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return new Date(a.dueDate) - new Date(b.dueDate);
      }

      return 0;
    });

  // Clear filters
  const handleClearFilters = () => {
    setPriorityFilter("all");
    setCategoryFilter("all");
    setSortBy("default");
  };

  // Sensors
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),

    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 180,
        tolerance: 8,
      },
    }),

    useSensor(KeyboardSensor),
  );

  // Collision detection: use actual pointer position
  const handleCollisionDetection = (args) => {
    const collisions = pointerWithin(args);

    if (collisions.length > 0) {
      return collisions;
    }

    // Keyboard drag fallback only
    if (!args.pointerCoordinates) {
      return closestCenter(args);
    }

    return [];
  };

  // Drag start
  const handleDragStart = ({ active }) => {
    const selectedTask = tasks.find(
      (task) => String(task.id) === String(active.id),
    );

    setActiveTask(selectedTask || null);
  };

  // Drag end
  const handleDragEnd = ({ active, over }) => {
    setActiveTask(null);

    if (!over) return;

    const draggedTask = tasks.find(
      (task) => String(task.id) === String(active.id),
    );

    if (!draggedTask) return;

    const targetColumn = columns.find(
      (column) => column.id === String(over.id),
    );

    if (!targetColumn) return;

    if (draggedTask.status === targetColumn.id) return;

    moveTask(draggedTask.id, targetColumn.id);
  };

  // Drag cancel
  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return (
    <div className="w-full min-w-0">
      {/* Board toolbar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Your Tasks
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your work across all stages.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFilterOpen((previous) => !previous)}
          aria-expanded={isFilterOpen}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
            hasActiveControls
              ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          <FiFilter size={15} />
          Filter & Sort
          {hasActiveControls && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
              !
            </span>
          )}
          <FiChevronDown
            size={14}
            className={`transition-transform ${
              isFilterOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Filter panel */}
      {isFilterOpen && (
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">
              Filter & Sort Tasks
            </h3>

            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filters"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div>
              <label htmlFor="priorityFilter" className={labelClass}>
                Priority
              </label>

              <select
                id="priorityFilter"
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
                className={selectClass}
              >
                <option value="all">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label htmlFor="categoryFilter" className={labelClass}>
                Category
              </label>

              <select
                id="categoryFilter"
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className={selectClass}
              >
                <option value="all">All Categories</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Learning">Learning</option>
                <option value="Planning">Planning</option>
                <option value="Personal">Personal</option>
              </select>
            </div>

            <div>
              <label htmlFor="sortBy" className={labelClass}>
                Sort By
              </label>

              <select
                id="sortBy"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className={selectClass}
              >
                <option value="default">Default Order</option>
                <option value="priority">Priority (High to Low)</option>
                <option value="dueDate">Due Date (Earliest First)</option>
                <option value="title">Title (A to Z)</option>
              </select>
            </div>
          </div>

          {hasActiveControls && (
            <div className="mt-4 flex justify-end border-t border-slate-100 pt-3 dark:border-slate-800">
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Clear Filters & Sorting
              </button>
            </div>
          )}
        </div>
      )}

      {/* Search summary */}
      {isSearching && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300">
          <p className="min-w-0 break-words">
            {visibleTasks.length === 0
              ? `No tasks match "${searchQuery.trim()}"`
              : `Showing ${visibleTasks.length} of ${tasks.length} tasks for "${searchQuery.trim()}"`}
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

      {/* Kanban board */}
      <DndContext
        sensors={sensors}
        collisionDetection={handleCollisionDetection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        autoScroll={{
          threshold: { x: 0.1, y: 0.15 },
          acceleration: 5,
          interval: 5,
        }}
        measuring={{
          droppable: { strategy: MeasuringStrategy.Always },
        }}
      >
        <div
          className={`w-full min-w-0 overflow-x-auto pb-4 md:overflow-visible md:pb-0 ${
            activeTask ? "" : "snap-x snap-mandatory"
          }`}
        >
          <div className="flex w-max min-w-full items-start gap-4 md:grid md:w-full md:grid-cols-3 md:gap-3 lg:gap-4">
            {columns.map((column) => {
              const columnTasks = visibleTasks.filter(
                (task) => task.status === column.id,
              );

              return (
                <div
                  key={column.id}
                  className="w-[min(78vw,340px)] min-w-[260px] shrink-0 snap-start md:w-full md:min-w-0"
                >
                  <Column
                    column={column}
                    tasks={columnTasks}
                    isSearching={isSearching || hasActiveControls}
                    onAddTask={() => onAddTask(column.id)}
                    onEditTask={onEditTask}
                    onDeleteTask={deleteTask}
                  />
                </div>
              );
            })}
          </div>
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
