import { useDroppable } from "@dnd-kit/core";
import { FiPlus } from "react-icons/fi";

import TaskCard from "./TaskCard";

function Column({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <section
      ref={setNodeRef}
      className={`flex w-full min-w-0 flex-col rounded-xl transition-colors ${
        isOver ? "bg-blue-50/50" : ""
      }`}
    >
      {/* Column header */}
      <div
        className={`mb-4 rounded-xl border p-4 ${column.headerBg} ${column.border}`}
      >
        <div className="mb-1 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${column.dot}`}
            />

            <h2 className="font-semibold text-slate-800">
              {column.title}
            </h2>
          </div>

          <span
            className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold ${column.countBg}`}
          >
            {tasks.length}
          </span>
        </div>

        <p className="text-sm text-slate-500">
          {column.subtitle}
        </p>
      </div>

      {/* Task cards */}
      <div className="flex w-full min-w-0 flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <div
            className={`flex min-h-36 w-full items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center ${
              isOver
                ? "border-blue-300 bg-blue-50"
                : "border-slate-200"
            }`}
          >
            <p className="text-sm text-slate-400">
              {isOver ? "Drop task here" : "No tasks yet"}
            </p>
          </div>
        )}
      </div>

      {/* Add task */}
      <button
        type="button"
        onClick={onAddTask}
        className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-3 text-sm font-medium transition ${column.button}`}
      >
        <FiPlus size={16} />
        Add a task
      </button>
    </section>
  );
}

export default Column;