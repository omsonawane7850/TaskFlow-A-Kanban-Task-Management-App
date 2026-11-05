import {
  FiGrid,
  FiCheckSquare,
  FiLayers,
  FiHelpCircle,
  FiSettings,
  FiX,
} from "react-icons/fi";

import DashboardStats from "./DashboardStats";

function Sidebar({ stats, isOpen, onClose }) {
  const navigationItems = [
    {
      label: "Overview",
      icon: FiGrid,
      active: true,
    },
    {
      label: "My Tasks",
      icon: FiCheckSquare,
      active: false,
    },
  ];

  const prefButtonClass =
    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100";

  const sectionTitleClass =
    "text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-67.5 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-18.25 lg:z-10 lg:h-[calc(100vh-73px)] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile sidebar header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800 lg:hidden">
          <span className="font-bold text-slate-800 dark:text-slate-100">
            Workspace
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* Workspace selector */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-200 dark:shadow-blue-950/50">
                TF
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                  My Workspace
                </p>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Personal workspace
                </p>
              </div>

              <FiLayers className="text-slate-400" size={17} />
            </div>
          </div>

          {/* Main navigation */}
          <div className="mb-7">
            <p className={`mb-3 px-3 ${sectionTitleClass}`}>Workspace</p>

            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={onClose}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      item.active
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    }`}
                  >
                    <Icon size={19} />

                    <span>{item.label}</span>

                    {item.active && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Statistics */}
          <div>
            <div className="mb-3 flex items-center justify-between px-3">
              <p className={sectionTitleClass}>Statistics</p>

              <FiLayers size={15} className="text-slate-400" />
            </div>

            <DashboardStats stats={stats} />
          </div>

          {/* Settings */}
          <div className="mt-7 border-t border-slate-100 pt-5 dark:border-slate-800">
            <p className={`mb-3 px-3 ${sectionTitleClass}`}>Preferences</p>

            <button type="button" className={prefButtonClass}>
              <FiSettings size={18} />
              Settings
            </button>

            <button type="button" className={prefButtonClass}>
              <FiHelpCircle size={18} />
              Help & Support
            </button>
          </div>
        </div>

        {/* Progress card */}
        <div className="border-t border-slate-100 p-5 dark:border-slate-800">
          <div className="rounded-2xl bg-linear-to-br from-blue-600 to-violet-600 p-4 text-white">
            <p className="text-xs leading-1 text-blue-100">Progress Bar -</p>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white"
                style={{
                  width: `${
                    stats.total > 0 ? (stats.done / stats.total) * 100 : 0
                  }%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-blue-100">
              {stats.total > 0
                ? Math.round((stats.done / stats.total) * 100)
                : 0}
              % tasks completed
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
