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

      <h1 className="text-2xl font-bold mb-10">
        Workspace
      </h1>

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