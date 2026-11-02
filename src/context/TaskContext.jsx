import { createContext, useContext, useEffect, useMemo, useState } from "react";

import initialTasks from "../data/initialTasks";

const TaskContext = createContext(null);

const STORAGE_KEY = "taskflow-custom-tasks";

const initialIds = new Set(initialTasks.map((task) => task.id));

export function TaskProvider({ children }) {
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

  // LocalStorage persistence
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

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = "success") => {
    setToast({
      id: Date.now(),
      title,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Search filtering
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

  // Dashboard statistics
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

    showToast(
      "Task created",
      `"${newTask.title}" has been added successfully.`,
    );
  };

  // Update task
  const updateTask = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );

    showToast(
      "Task updated",
      `"${updatedTask.title}" has been updated successfully.`,
    );
  };

  // Delete task
  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );

    if (taskToDelete) {
      showToast("Task deleted", `"${taskToDelete.title}" has been deleted.`);
    }
  };

  // Move task between Kanban columns
  const moveTask = (taskId, newStatus) => {
    const task = tasks.find((item) => item.id === taskId);

    if (!task || task.status === newStatus) return;

    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === taskId ? { ...item, status: newStatus } : item,
      ),
    );

    const statusLabels = {
      todo: "To Do",
      "in-progress": "In Progress",
      done: "Completed",
    };

    showToast(
      "Task moved",
      `"${task.title}" moved to ${statusLabels[newStatus] || newStatus}.`,
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

    toast,
    showToast,
    hideToast,

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
