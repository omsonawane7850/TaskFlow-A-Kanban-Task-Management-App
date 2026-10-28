import {
  FiCheckSquare,
  FiSearch,
  FiPlus,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

function Header() {
  const handleAddTask = () => {
    window.dispatchEvent(new Event("taskflow:add-task"));
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <FiCheckSquare size={22} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              TaskFlow
            </h2>

            <p className="hidden text-xs text-slate-400 sm:block">
              Plan. Organize. Achieve.
            </p>
          </div>
        </a>

        {/* Search */}
        <div className="hidden max-w-md flex-1 md:block">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
            <FiSearch className="shrink-0 text-slate-400" size={18} />

            <input
              type="text"
              placeholder="Search tasks..."
              aria-label="Search tasks"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />

            <kbd className="hidden rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-400 lg:block">
              /
            </kbd>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:flex"
          >
            <FiBell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-slate-50 sm:flex"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
              OM
            </div>

            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-slate-800">
                My Workspace
              </p>

              <p className="text-xs text-slate-400">Personal account</p>
            </div>

            <FiChevronDown size={16} className="text-slate-400" />
          </button>

          <button
            type="button"
            onClick={handleAddTask}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0 sm:px-4"
          >
            <FiPlus size={18} />

            <span className="hidden sm:inline">Create Task</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;