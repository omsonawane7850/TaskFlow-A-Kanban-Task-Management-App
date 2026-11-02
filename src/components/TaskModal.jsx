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
      <div className="my-auto max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl sm:max-h-[90vh]">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
              {isEditing ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {isEditing
                ? "Update your task details."
                : "Add a new task to your board."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
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
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
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
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="What needs to be done?"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-400"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-400"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Learning">Learning</option>
                <option value="Planning">Planning</option>
                <option value="Personal">Personal</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Due date
              </label>

              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full min-w-0 rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-400"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Completed</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-auto sm:py-2.5"
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
