import { useState } from "react";
import { FiX, FiCalendar, FiFlag, FiTag } from "react-icons/fi";

const initialForm = {
  title: "",
  description: "",
  priority: "Medium",
  category: "Development",
  dueDate: "",
  status: "todo",
};

function TaskModal({ isOpen, onClose, onCreateTask }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    onCreateTask({
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      category: formData.category,
      dueDate: formData.dueDate,
      status: formData.status,
    });

    setFormData(initialForm);
    setError("");
    onClose();
  };

  const handleClose = () => {
    setFormData(initialForm);
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      {" "}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10"
      >
        {/* Modal header */}{" "}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          {" "}
          <div>
            {" "}
            <h2
              id="task-modal-title"
              className="text-xl font-extrabold text-slate-900"
            >
              Create a task{" "}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a new task to your Kanban board.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close task form"
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={20} />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Task title <span className="text-rose-500">*</span>
            </label>

            <input
              id="task-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Build a login page"
              maxLength={100}
              autoFocus
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="task-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What needs to be done?"
              rows={3}
              maxLength={500}
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* Priority and category */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-priority"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <FiFlag className="text-rose-500" size={16} />
                Priority
              </label>

              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-category"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <FiTag className="text-violet-500" size={16} />
                Category
              </label>

              <select
                id="task-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Research">Research</option>
                <option value="Planning">Planning</option>
                <option value="Testing">Testing</option>
              </select>
            </div>
          </div>

          {/* Due date and status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-due-date"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <FiCalendar className="text-blue-500" size={16} />
                Due date
              </label>

              <input
                id="task-due-date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <div>
              <label
                htmlFor="task-status"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Status
              </label>

              <select
                id="task-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          {/* Validation error */}
          {error && (
            <p role="alert" className="text-sm font-medium text-rose-600">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Create Task
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TaskModal;
