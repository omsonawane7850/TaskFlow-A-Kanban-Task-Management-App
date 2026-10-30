import { FiMenu } from "react-icons/fi";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Board from "./Board";
import TaskModal from "./TaskModal";

import { useTasks } from "../context/TaskContext";

function Dashboard() {
  const {
    stats,

    isSidebarOpen,
    openSidebar,
    closeSidebar,

    isTaskModalOpen,
    taskToEdit,

    addTask,
    updateTask,

    openCreateModal,
    openEditModal,
    closeTaskModal,
  } = useTasks();

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-800">
      <Header onCreateTaskClick={openCreateModal} />

      <div className="flex">
        <Sidebar stats={stats} isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={openSidebar}
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
          <Board onAddTask={openCreateModal} onEditTask={openEditModal} />

          <footer className="mt-10 border-t border-slate-200 py-5 text-center text-xs text-slate-400">
            TaskFlow — Make every task count.
          </footer>
        </main>
      </div>

      {/* Create/Edit modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        onCreateTask={addTask}
        onUpdateTask={updateTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}

export default Dashboard;
