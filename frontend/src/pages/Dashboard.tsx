import { useEffect, useState } from "react";

import { getStats } from "../api/dashboard";

import TaskStatusChart from "../components/dashboard/TaskStatusChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    notes: 0,
    tasks: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await getStats();

      setStats(response.data);
    };

    fetchStats();
  }, []);

  const todo = stats.tasks - stats.completed;

  const inProgress = 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-white">
          Dashboard
        </h1>

        <p className="text-zinc-400 text-lg mt-3">
          Overview of your productivity
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-400 text-lg">Notes</h3>

          <p className="text-6xl font-bold text-white mt-4">{stats.notes}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-400 text-lg">Tasks</h3>

          <p className="text-6xl font-bold text-white mt-4">{stats.tasks}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-400 text-lg">Completed</h3>

          <p className="text-6xl font-bold text-white mt-4">
            {stats.completed}
          </p>
        </div>
      </div>

      <div
        className="
        mt-8
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
      "
      >
        <h3 className="text-zinc-400 mb-4">Completion Rate</h3>

        <p className="text-4xl font-bold text-white">
          {stats.tasks === 0
            ? 0
            : Math.round((stats.completed / stats.tasks) * 100)}
          %
        </p>
      </div>

      <div className="mt-8">
        <TaskStatusChart
          todo={todo}
          inProgress={inProgress}
          done={stats.completed}
        />
      </div>
    </div>
  );
}
