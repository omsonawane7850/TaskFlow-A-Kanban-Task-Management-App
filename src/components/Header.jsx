import { useEffect, useRef } from "react";

import {
  FiMenu,
  FiCheckSquare,
  FiSearch,
  FiPlus,
  FiBell,
  FiChevronDown,
  FiX,
} from "react-icons/fi";

import ThemeToggle from "./ThemeToggle";

import { useTasks } from "../context/TaskContext";

function Header({ onCreateTaskClick }) {
  const { searchQuery, setSearchQuery, clearSearch, openSidebar } = useTasks();

  const searchInputRef = useRef(null);

  // "/" dabane par search focus ho (jab user kisi input mein type na kar raha ho)
  useEffect(() => {
    const handleKeyDown = (event) => {
      const tag = event.target.tagName;
      const isTyping =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        event.target.isContentEditable;

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") {
      clearSearch();
      event.currentTarget.blur();
    }
  };

  const clearButton = searchQuery ? (
    <button
      type="button"
      onClick={clearSearch}
      aria-label="Clear search"
      className="shrink-0 rounded-md p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
    >
      <FiX size={16} />
    </button>
  ) : null;

  const searchBoxClass =
    "flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-blue-500 dark:focus-within:bg-slate-800 dark:focus-within:ring-blue-950";

  const searchInputClass =
    "w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 lg:px-10">
        {/* Menu + Logo */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Sidebar toggle (mobile / tablet) */}
          <button
            type="button"
            onClick={openSidebar}
            aria-label="Open sidebar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 lg:hidden"
          >
            <FiMenu size={20} />
          </button>

          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-950/50">
              <FiCheckSquare size={22} />
            </div>

            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-xl">
                TaskFlow
              </h2>

              <p className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                Plan. Organize. Achieve.
              </p>
            </div>
          </a>
        </div>

        {/* Search (desktop) */}
        <div className="hidden max-w-md flex-1 md:block">
          <div className={`${searchBoxClass} py-3`}>
            <FiSearch className="shrink-0 text-slate-400" size={18} />

            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search tasks..."
              aria-label="Search tasks"
              className={searchInputClass}
            />

            {clearButton}

            {!searchQuery && (
              <kbd className="hidden rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-500 lg:block">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-4">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Notifications"
            className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 sm:flex"
          >
            <FiBell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500 dark:border-slate-900" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-800 sm:flex"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
              OM
            </div>

            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                My Workspace
              </p>

              <p className="text-xs text-slate-400 dark:text-slate-500">
                Personal account
              </p>
            </div>

            <FiChevronDown size={16} className="text-slate-400" />
          </button>

          <button
            type="button"
            onClick={onCreateTaskClick}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0 dark:shadow-blue-950/50 sm:px-4"
          >
            <FiPlus size={18} />

            <span className="hidden sm:inline">Create Task</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>
      </div>

      {/* Search (mobile) */}
      <div className="px-4 pb-3 md:hidden">
        <div className={`${searchBoxClass} py-2.5`}>
          <FiSearch className="shrink-0 text-slate-400" size={18} />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search tasks..."
            aria-label="Search tasks"
            className={searchInputClass}
          />

          {clearButton}
        </div>
      </div>
    </header>
  );
}

export default Header;
