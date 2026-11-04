import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const initialForm = {
  title: "",
  description: "",
  priority: "Medium",
  category: "Development",
  dueDate: "",
  status: "todo",
};

const labelClass =
  "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-950";

const selectClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-500";

function TaskModal({
  isOpen,
  onClose,
  onCreateTask,
  onUpdateTask,
  taskToEdit,
}) {
  const [formData, setFormData] = useState(initialForm);

  const isEditing = Boolean(taskToEdit);

  useEffect(() => {
    if (isOpen && taskToEdit) {
      setFormData({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        priority: taskToEdit.priority || "Medium",
        category: taskToEdit.category || "Development",
        dueDate: taskToEdit.dueDate || "",
        status: taskToEdit.status || "todo",
      });
    } else if (isOpen) {
      setFormData(initialForm);
    }
  }, [isOpen, taskToEdit]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData(initialForm);
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = formData.title.trim();

    if (!trimmedTitle) {
      return;
    }

    const taskData = {
      ...formData,
      title: trimmedTitle,
      description: formData.description.trim(),
    };

    if (isEditing) {
      onUpdateTask({
        ...taskToEdit,
        ...taskData,
      });
    } else {
      onCreateTask({
        ...taskData,
        id: crypto.randomUUID(),
      });
    }

    handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-3 backdrop-blur-sm sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="my-auto max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl dark:border dark:border-slate-800 dark:bg-slate-900 sm:max-h-[90vh]">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 dark:border-slate-800 sm:px-6">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 sm:text-xl">
              {isEditing ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              {isEditing
                ? "Update your task details."
                : "Add a new task to your board."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 sm:space-y-5 sm:p-6"
        >
          <div>
            <label htmlFor="title" className={labelClass}>
              Task title *
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Build dashboard UI"
              required
              autoFocus
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="What needs to be done?"
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <label htmlFor="priority" className={labelClass}>
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className={labelClass}>
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Learning">Learning</option>
                <option value="Planning">Planning</option>
                <option value="Personal">Personal</option>
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className={labelClass}>
                Due date
              </label>

              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="status" className={labelClass}>
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Completed</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 sm:w-auto sm:py-2.5"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto sm:py-2.5"
            >
              {isEditing ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
