import { useState } from "react";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
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

const priorityOrder = {
  High: 1,
  Medium: 2,
  Low: 3,
};

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

  const handleClearFilters = () => {
    setPriorityFilter("all");
    setCategoryFilter("all");
    setSortBy("default");
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = ({ active }) => {
    const selectedTask = tasks.find(
      (task) => String(task.id) === String(active.id),
    );

    setActiveTask(selectedTask || null);
  };

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
          onClick={() => setIsFilterOpen((previous) => !previous)}
          aria-expanded={isFilterOpen}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
            hasActiveControls
              ? "border-blue-200 bg-blue-50 text-blue-700"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
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

      {/* Filter and sorting panel */}
      {isFilterOpen && (
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">
              Filter & Sort Tasks
            </h3>

            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filters"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div>
              <label
                htmlFor="priorityFilter"
                className="mb-2 block text-sm font-medium text-slate-600"
              >
                Priority
              </label>

              <select
                id="priorityFilter"
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
              >
                <option value="all">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="categoryFilter"
                className="mb-2 block text-sm font-medium text-slate-600"
              >
                Category
              </label>

              <select
                id="categoryFilter"
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
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
              <label
                htmlFor="sortBy"
                className="mb-2 block text-sm font-medium text-slate-600"
              >
                Sort By
              </label>

              <select
                id="sortBy"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
              >
                <option value="default">Default Order</option>
                <option value="priority">Priority (High to Low)</option>
                <option value="dueDate">Due Date (Earliest First)</option>
                <option value="title">Title (A to Z)</option>
              </select>
            </div>
          </div>

          {hasActiveControls && (
            <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Clear Filters & Sorting
              </button>
            </div>
          )}
        </div>
      )}

      {/* Search result summary */}
      {isSearching && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
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

      {/* Drag-and-drop board */}
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {/* Responsive Kanban columns */}
        <div className="w-full min-w-0 overflow-x-auto pb-4 snap-x snap-mandatory md:overflow-visible md:pb-0">
          <div className="flex w-max min-w-full items-start gap-4 md:grid md:w-full md:grid-cols-3 md:gap-3 lg:gap-4">
            {columns.map((column) => {
              const columnTasks = visibleTasks.filter(
                (task) => task.status === column.id,
              );

              return (
                <div
                  key={column.id}
                  className="w-[min(88vw,360px)] min-w-[280px] shrink-0 snap-start md:w-full md:min-w-0"
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
