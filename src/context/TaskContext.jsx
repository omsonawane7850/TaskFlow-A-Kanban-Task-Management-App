import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import initialTasks from "../data/initialTasks";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);

  // Create a new task
  const addTask = (newTask) => {
    setTasks((previousTasks) => [
      newTask,
      ...previousTasks,
    ]);
  };

  // Update an existing task
  const updateTask = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== taskId
      )
    );
  };

  // Calculate dashboard statistics
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

  const value = {
    tasks,
    stats,
    addTask,
    updateTask,
    deleteTask,
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