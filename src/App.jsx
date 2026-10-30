import { useState } from "react";
import { FiMenu } from "react-icons/fi";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import initialTasks from "./data/initialTasks";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const stats = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    progress: tasks.filter((task) => task.status === "in-progress").length,
    done: tasks.filter((task) => task.status === "done").length,
  };

  const handleCreateTask = (newTask) => {
    setTasks((previousTasks) => [newTask, ...previousTasks]);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    setTaskToEdit(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-800">
      <Header onCreateTaskClick={handleOpenCreateModal} />

      <div className="flex">
        <Sidebar
          stats={stats}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
            className="mb-5 rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 lg:hidden"
          >
            <FiMenu size={20} />
          </button>

          {/* Dashboard heading */}
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-indigo-600">
                Workspace / Overview
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                My Board
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Organize your work, focus on priorities, and get things done.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-xs text-slate-500">Total tasks</p>
                <p className="mt-1 text-xl font-bold text-slate-800">
                  {stats.total}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-xs text-slate-500">Completed</p>
                <p className="mt-1 text-xl font-bold text-emerald-600">
                  {stats.done}
                </p>
              </div>
            </div>
          </div>

          {/* Kanban board */}
          <Board
            tasks={tasks}
            onAddTask={handleOpenCreateModal}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <footer className="mt-10 border-t border-slate-200 py-5 text-center text-xs text-slate-400">
            TaskFlow — Make every task count.
          </footer>
        </main>
      </div>

      {/* Create/Edit modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}

export default App;