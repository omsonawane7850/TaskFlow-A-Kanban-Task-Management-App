import Header from "./Header";
import Sidebar from "./Sidebar";
import Board from "./Board";
import TaskModal from "./TaskModal";
import Toast from "./Toast";

import { useTasks } from "../context/TaskContext";

function Dashboard() {
  const {
    stats,

    isSidebarOpen,
    closeSidebar,

    isTaskModalOpen,
    taskToEdit,

    addTask,
    updateTask,

    openCreateModal,
    openEditModal,
    closeTaskModal,

    toast,
    hideToast,
  } = useTasks();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F5F7FB] text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-200">
      <Header onCreateTaskClick={openCreateModal} />

      <div className="flex min-h-[calc(100vh-73px)]">
        <Sidebar stats={stats} isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {/* Dashboard heading */}
          <div className="mb-7 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="mb-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Workspace / Overview
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                My Board
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Organize your work, focus on priorities, and get things done.
              </p>
            </div>

            {/* Dashboard statistics */}
            <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:min-w-[240px]">
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total tasks
                </p>

                <p className="mt-1 text-xl font-bold text-slate-800 dark:text-slate-100">
                  {stats.total}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Completed
                </p>

                <p className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.done}
                </p>
              </div>
            </div>
          </div>

          {/* Kanban board */}
          <Board onAddTask={openCreateModal} onEditTask={openEditModal} />

          <footer className="mt-8 border-t border-slate-200 py-5 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500 sm:mt-10">
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

      {/* Toast notification */}
      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
}

export default Dashboard;
