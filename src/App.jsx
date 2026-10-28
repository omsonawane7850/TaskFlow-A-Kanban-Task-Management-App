import { useState } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import DashboardStats from "./components/DashboardStats";

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

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-800">
      <Header />

      <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-10">
        {/* Dashboard heading */}
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              WORKSPACE / PROJECTS
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              My Board
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Organize your work. Stay focused. Get things done.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Total tasks</p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {tasks.length.toString().padStart(2, "0")}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
              <p className="text-xs font-medium text-emerald-700">Completed</p>

              <p className="mt-1 text-xl font-bold text-emerald-700">
                {tasks
                  .filter((task) => task.status === "done")
                  .length.toString()
                  .padStart(2, "0")}
              </p>
            </div>
          </div>
        </section>

        <DashboardStats
          stats={{
            total: tasks.length,
            todo: tasks.filter((task) => task.status === "todo").length,
            progress: tasks.filter((task) => task.status === "in-progress")
              .length,
            done: tasks.filter((task) => task.status === "done").length,
          }}
        />

        {/* Kanban board */}
        <Board tasks={tasks} />

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-200 py-5 text-center text-sm text-slate-400">
          Made for better teamwork with{" "}
          <span className="font-semibold text-blue-600">TaskFlow</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
