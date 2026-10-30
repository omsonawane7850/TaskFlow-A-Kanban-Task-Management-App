import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import initialTasks from "../data/initialTasks";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  // Task state
  const [tasks, setTasks] = useState(initialTasks);

  // Dashboard UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Dashboard statistics
  const stats = useMemo(
    () => ({
      total: tasks.length,

      todo: tasks.filter(
        (task) => task.status === "todo"
      ).length,

      progress: tasks.filter(
        (task) => task.status === "in-progress"
      ).length,

      done: tasks.filter(
        (task) => task.status === "done"
      ).length,
    }),
    [tasks]
  );

  // Create task
  const addTask = (newTask) => {
    setTasks((previousTasks) => [
      newTask,
      ...previousTasks,
    ]);
  };

  // Update task
  const updateTask = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== taskId
      )
    );
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
    stats,

    addTask,
    updateTask,
    deleteTask,

    isSidebarOpen,
    openSidebar,
    closeSidebar,

    isTaskModalOpen,
    taskToEdit,
    openCreateModal,
    openEditModal,
    closeTaskModal,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTasks must be used inside TaskProvider"
    );
  }

  return context;
}