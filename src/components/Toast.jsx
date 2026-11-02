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

  return (
    <div className="fixed right-5 top-5 z-[100] w-[calc(100%-40px)] max-w-sm animate-[slideIn_0.3s_ease-out]">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          {toast.type === "error" ? (
            <FiAlertCircle size={21} />
          ) : (
            <FiCheckCircle size={21} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800">{toast.title}</p>

          <p className="mt-1 text-xs text-slate-500">{toast.message}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <FiX size={17} />
        </button>
      </div>
    </div>
  );
}

export default Toast;
