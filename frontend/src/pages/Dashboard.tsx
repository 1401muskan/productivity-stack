import {
  useEffect,
  useState,
} from "react";

import { getStats }
  from "../api/dashboard";

export default function Dashboard() {

   const [stats, setStats] =
  useState({
    notes: 0,
    tasks: 0,
    events: 0,
  });

useEffect(() => {
  const fetchStats =
    async () => {
      const response =
        await getStats();

      setStats(
        response.data
      );
    };

  fetchStats();
}, []); 

  return (
    <div>

      <h1 className="text-4xl font-bold text-white mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-400">
            Notes
          </h3>

          <p className="text-3xl text-white mt-3">
            {stats.notes}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-400">
            Tasks
          </h3>

          <p className="text-3xl text-white mt-3">
            0
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-400">
            Events
          </h3>

          <p className="text-3xl text-white mt-3">
            0
          </p>
        </div>

      </div>

    </div>
  );
}