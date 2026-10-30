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

  const stats = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    progress: tasks.filter((task) => task.status === "in-progress").length,
    done: tasks.filter((task) => task.status === "done").length,
  };

  const handleCreateTask = (newTask) => {
    setTasks((previousTasks) => [newTask, ...previousTasks]);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-800">
      {" "}
      <Header onCreateTaskClick={() => setIsTaskModalOpen(true)} />
      <div className="mx-auto flex max-w-[1800px] items-start">
        <Sidebar
          stats={stats}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 lg:hidden"
          >
            <FiMenu size={18} />
            Workspace menu
          </button>

          <section className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Workspace / Projects
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                My Board
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Organize your work. Stay focused. Get things done.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium text-slate-500">
                  Total tasks
                </p>

                <p className="mt-1 text-xl font-extrabold text-slate-900">
                  {stats.total.toString().padStart(2, "0")}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                <p className="text-xs font-medium text-emerald-700">
                  Completed
                </p>

                <p className="mt-1 text-xl font-extrabold text-emerald-700">
                  {stats.done.toString().padStart(2, "0")}
                </p>
              </div>
            </div>
          </section>

          <Board tasks={tasks} onAddTask={() => setIsTaskModalOpen(true)} />

          <footer className="mt-10 border-t border-slate-200 py-5 text-center text-xs text-slate-400">
            Made for better teamwork with{" "}
            <span className="font-bold text-blue-600">TaskFlow</span>
          </footer>
        </main>
      </div>
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
}

export default App;
