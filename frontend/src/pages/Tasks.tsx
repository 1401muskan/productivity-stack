import {
  useEffect,
  useState,
} from "react";

import {
  getTasks,
  createTask,
  deleteTask,
} from "../api/tasks";

import { Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status:
    | "TODO"
    | "IN_PROGRESS"
    | "DONE";
}

export default function Tasks() {
  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [title, setTitle] =
    useState("");

  const fetchTasks =
    async () => {
      const response =
        await getTasks();

      setTasks(response.data);
    };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (
  id: string
) => {
  try {
    await deleteTask(id);

    fetchTasks();
  } catch (error) {
    console.error(error);
  }
};

  const handleCreate =
    async () => {
      if (!title.trim()) return;

      await createTask(
        title,
        ""
      );

      setTitle("");

      fetchTasks();
    };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Tasks
      </h1>

      <div className="flex gap-3 mb-6">

        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          placeholder="New task..."
          className="bg-zinc-800 p-3 rounded-xl text-white w-72"
        />

        <button
          onClick={handleCreate}
          className="bg-violet-600 px-5 rounded-xl"
        >
          Add
        </button>

      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-zinc-900 p-4 rounded-2xl">
          <h2 className="font-semibold mb-4">
            Todo
          </h2>

          {tasks
            .filter(
              (task) =>
                task.status ===
                "TODO"
            )
            .map((task) => (
              <div
                key={task.id}
                className="bg-zinc-800 p-4 rounded-xl mb-3 border border-zinc-700"
              >
            <h3 className="font-medium">
              {task.title}
            </h3>

            <p className="text-sm text-zinc-400 mt-2">
              {task.description}
            </p>

            <button
              onClick={() =>
                handleDelete(task.id)
              }
              className="mt-3 text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
          ))}
        </div>

        <div className="bg-zinc-900 p-4 rounded-2xl">
          <h2 className="font-semibold mb-4">
            In Progress
          </h2>

            {tasks
              .filter(
                (task) =>
                  task.status ===
                  "IN_PROGRESS"
              )
              .map((task) => (
                <div
                  key={task.id}
                  className="
                    bg-zinc-800
                    p-4
                    rounded-xl
                    mb-3
                    border
                    border-zinc-700
                  "
                >
                  <h3 className="font-medium">
                    {task.title}
                  </h3>

                  <p className="text-sm text-zinc-400 mt-2">
                    {task.description}
                  </p>

                  <button
                    onClick={() =>
                      handleDelete(task.id)
                    }
                    className="mt-3 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
            ))}
        </div>

        <div className="bg-zinc-900 p-4 rounded-2xl">
          <h2 className="font-semibold mb-4">
            Done
          </h2>

            {tasks
              .filter(
                (task) =>
                  task.status ===
                  "DONE"
              )
              .map((task) => (
                <div
                  key={task.id}
                  className="
                    bg-zinc-800
                    p-4
                    rounded-xl
                    mb-3
                    border
                    border-zinc-700
                  "
                >
                  <h3 className="font-medium">
                    {task.title}
                  </h3>

                  <p className="text-sm text-zinc-400 mt-2">
                    {task.description}
                  </p>

                  <button
                    onClick={() =>
                      handleDelete(task.id)
                    }
                    className="mt-3 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
            ))}
        </div>

      </div>

    </div>
  );
}