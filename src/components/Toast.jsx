import { useEffect } from "react";
import { FiCheckCircle, FiX, FiAlertCircle } from "react-icons/fi";

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div className="fixed right-5 top-5 z-100 w-[calc(100%-40px)] max-w-sm animate-[slideIn_0.3s_ease-out]">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-800">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isError
              ? "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
              : "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
          }`}
        >
          {isError ? <FiAlertCircle size={21} /> : <FiCheckCircle size={21} />}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {toast.title}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
        >
          <FiX size={17} />
        </button>
      </div>
    </div>
  );
}

export default Toast;
