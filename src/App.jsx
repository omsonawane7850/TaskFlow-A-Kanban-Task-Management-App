import { useState } from "react";
import { FiMenu } from "react-icons/fi";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";

const initialTasks = [
  {
    id: 1,
    title: "Design login page",
    description:
      "Create a clean and responsive login page with a modern user interface.",
    status: "todo",
    priority: "High",
    category: "Design",
    dueDate: "Oct 30, 2026",
  },
  {
    id: 2,
    title: "Build navbar component",
    description: "Create a reusable navigation component for the application.",
    status: "todo",
    priority: "Medium",
    category: "Development",
    dueDate: "Nov 01, 2026",
  },
  {
    id: 3,
    title: "Create dashboard UI",
    description: "Build the main dashboard layout using Tailwind CSS.",
    status: "in-progress",
    priority: "High",
    category: "Development",
    dueDate: "Oct 29, 2026",
  },
  {
    id: 4,
    title: "Implement search UI",
    description: "Prepare the search interface for finding tasks quickly.",
    status: "in-progress",
    priority: "Low",
    category: "Development",
    dueDate: "Nov 02, 2026",
  },
  {
    id: 5,
    title: "Initialize React project",
    description: "Set up the project using Vite and React.",
    status: "done",
    priority: "High",
    category: "Development",
    dueDate: "Oct 27, 2026",
  },
  {
    id: 6,
    title: "Choose color palette",
    description: "Finalize the color palette for the application.",
    status: "done",
    priority: "Medium",
    category: "Design",
    dueDate: "Oct 27, 2026",
  },
];

function App() {
  const [tasks] = useState(initialTasks);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const stats = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    progress: tasks.filter((task) => task.status === "in-progress").length,
    done: tasks.filter((task) => task.status === "done").length,
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-800">
      {/* Top navigation */}
      <Header />

      {/* Sidebar + Main content */}
      <div className="mx-auto flex max-w-[1800px] items-start">
        <Sidebar
          stats={stats}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {/* Mobile sidebar toggle */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 lg:hidden"
          >
            <FiMenu size={18} />
            Workspace menu
          </button>

          {/* Page heading */}
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

          {/* Kanban board */}
          <Board tasks={tasks} />

          <footer className="mt-10 border-t border-slate-200 py-5 text-center text-xs text-slate-400">
            Made for better teamwork with{" "}
            <span className="font-bold text-blue-600">TaskFlow</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
