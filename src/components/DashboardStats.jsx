import {
  FiLayers,
  FiCircle,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

const statItems = [
  {
    key: "total",
    label: "Total Tasks",
    icon: FiLayers,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    key: "todo",
    label: "To Do",
    icon: FiCircle,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    key: "progress",
    label: "In Progress",
    icon: FiClock,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },
  {
    key: "done",
    label: "Completed",
    icon: FiCheckCircle,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
];

function DashboardStats({ stats }) {
  return (
    <div className="space-y-2">
      {statItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-slate-50"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}`}
              >
                <Icon size={17} />
              </div>

              <span className="truncate text-sm font-medium text-slate-600">
                {item.label}
              </span>
            </div>

            <span className="ml-2 text-sm font-bold text-slate-800">
              {(stats[item.key] ?? 0)
                .toString()
                .padStart(2, "0")}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardStats;