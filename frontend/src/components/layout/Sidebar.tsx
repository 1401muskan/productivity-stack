import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Calendar,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Notes",
    path: "/notes",
    icon: FileText,
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Calendar",
    path: "/calendar",
    icon: Calendar,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 text-white p-6">

      <div className="mb-8">
  <h1 className="text-4xl font-extrabold tracking-tight text-white">
  FlowSpace
</h1>

<p className="text-zinc-500 text-base mt-2">
  Personal Productivity
</p>
</div>

<nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "hover:bg-zinc-900"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}