import {
FiLayers,
FiCircle,
FiClock,
FiCheckCircle,
FiArrowUpRight,
} from "react-icons/fi";

const statConfig = [
{
key: "total",
label: "Total Tasks",
color: "blue",
icon: FiLayers,
iconBg: "bg-blue-100",
iconColor: "text-blue-600",
accent: "bg-blue-500",
},
{
key: "todo",
label: "To Do",
color: "violet",
icon: FiCircle,
iconBg: "bg-violet-100",
iconColor: "text-violet-600",
accent: "bg-violet-500",
},
{
key: "progress",
label: "In Progress",
color: "orange",
icon: FiClock,
iconBg: "bg-orange-100",
iconColor: "text-orange-600",
accent: "bg-orange-500",
},
{
key: "done",
label: "Completed",
color: "green",
icon: FiCheckCircle,
iconBg: "bg-emerald-100",
iconColor: "text-emerald-600",
accent: "bg-emerald-500",
},
];

function DashboardStats({ stats }) {
return ( <section
   aria-label="Task statistics"
   className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
 >
{statConfig.map((item) => {
const Icon = item.icon;
const value = stats[item.key] ?? 0;

    return (
      <article
        key={item.key}
        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
      >
        {/* Colored accent */}
        <div
          className={`absolute left-0 top-0 h-full w-1 ${item.accent}`}
        />

        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              {item.label}
            </p>

            <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
              {value.toString().padStart(2, "0")}
            </h3>
          </div>

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor} transition-transform duration-200 group-hover:scale-110`}
          >
            <Icon size={23} />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full ${item.iconBg} ${item.iconColor}`}
          >
            <FiArrowUpRight size={15} />
          </span>

          <p className="text-xs text-slate-500">
            Tasks in{" "}
            <span className="font-semibold text-slate-700">
              {item.label}
            </span>
          </p>
        </div>
      </article>
    );
  })}
</section>

);
}

export default DashboardStats;
