import { createContext, useContext, useEffect, useMemo, useState } from "react";

import initialTasks from "../data/initialTasks";

const TaskContext = createContext(null);

const STORAGE_KEY = "taskflow-custom-tasks";

// initialTasks ke ids: inhe localStorage mein kabhi save nahi karenge
const initialIds = new Set(initialTasks.map((task) => task.id));

export function TaskProvider({ children }) {
  // Task state: user ke saved tasks + hamesha seedha import kiye hue initialTasks
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          const customTasks = parsed.filter((task) => !initialIds.has(task.id));
          return [...customTasks, ...initialTasks];
        }
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }

    return initialTasks;
  });

  // Sirf user-created tasks LocalStorage mein save honge
  useEffect(() => {
    try {
      const customTasks = tasks.filter((task) => !initialIds.has(task.id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customTasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [tasks]);

  // Dashboard UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Search state (UI state: persist nahi hota)
  const [searchQuery, setSearchQuery] = useState("");

  // Search ke baad dikhne wale tasks
  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return tasks;
    }

    return tasks.filter((task) =>
      [task.title, task.description, task.category].some((field) =>
        (field || "").toLowerCase().includes(query),
      ),
    );
  }, [tasks, searchQuery]);

  // Dashboard statistics (hamesha poori list se, filtered se nahi)
  const stats = useMemo(
    () => ({
      total: tasks.length,

      todo: tasks.filter((task) => task.status === "todo").length,

      progress: tasks.filter((task) => task.status === "in-progress").length,

      done: tasks.filter((task) => task.status === "done").length,
    }),
    [tasks],
  );

  // Create task
  const addTask = (newTask) => {
    setTasks((previousTasks) => [newTask, ...previousTasks]);
  };

  // Update task
  const updateTask = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
  };

  // Move task between Kanban columns
  const moveTask = (taskId, newStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  // Search actions
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Open create modal
  const openCreateModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  // Close modal
  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
  };

  // Sidebar actions
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const value = {
    tasks,
    filteredTasks,
    stats,

    searchQuery,
    setSearchQuery,
    clearSearch,

    addTask,
    updateTask,
    deleteTask,
    moveTask,

    isSidebarOpen,
    openSidebar,
    closeSidebar,

    isTaskModalOpen,
    taskToEdit,
    openCreateModal,
    openEditModal,
    closeTaskModal,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}
