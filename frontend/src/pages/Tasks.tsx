import { useEffect, useState } from "react";

import { getTasks, createTask, deleteTask, updateTask } from "../api/tasks";

import { DndContext } from "@dnd-kit/core";

import type { DragEndEvent } from "@dnd-kit/core";

import TaskCard from "../components/tasks/TaskCard";

import TaskColumn from "../components/tasks/TaskColumn";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");

  const todoCount =
  tasks.filter(
    (task) =>
      task.status === "TODO"
  ).length;

const progressCount =
  tasks.filter(
    (task) =>
      task.status ===
      "IN_PROGRESS"
  ).length;

const doneCount =
  tasks.filter(
    (task) =>
      task.status === "DONE"
  ).length;

  const fetchTasks = async () => {
    const response = await getTasks();

    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) return;

    await createTask(title, "");

    setTitle("");

    fetchTasks();
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const task = tasks.find((t) => t.id === active.id);

    if (!task) return;

    const newStatus = over.id as "TODO" | "IN_PROGRESS" | "DONE";

    await updateTask(task.id, task.title, task.description, newStatus);

    fetchTasks();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-6">
        Tasks
      </h1>
      <p className="text-zinc-400 mt-2 mb-4">
        Organize and track your work
      </p>
      <div className="flex gap-3 mb-8 items-center">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="
            bg-zinc-900
            border
            border-zinc-700
            p-3
            rounded-xl
            text-white
            w-80
          "
        />

        <button
          onClick={handleCreate}
          className="
            bg-violet-600
            hover:bg-violet-500
            transition
            px-6
            rounded-xl
            text-white
            font-medium
          "      
        >
          Add
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          <TaskColumn id="TODO" title={`Todo (${todoCount})`}>
            {tasks
              .filter((task) => task.status === "TODO")
              .map((task) => (
                <TaskCard key={task.id} task={task} onDelete={handleDelete} />
              ))}
            {tasks.filter(
              (task) =>
                task.status === "TODO"
            ).length === 0 && (
              <p className="text-zinc-500 text-sm">
                No tasks yet
              </p>
            )}
          </TaskColumn>

          <TaskColumn id="IN_PROGRESS" title={`In Progress (${progressCount})`}>
            {tasks
              .filter((task) => task.status === "IN_PROGRESS")
              .map((task) => (
                <TaskCard key={task.id} task={task} onDelete={handleDelete} />
              ))}
            {tasks.filter(
              (task) =>
                task.status === "IN_PROGRESS"
            ).length === 0 && (
              <p className="text-zinc-500 text-sm">
                No tasks yet
              </p>
            )}
          </TaskColumn>

          <TaskColumn id="DONE" title={`Done (${doneCount})`}>
            {tasks
              .filter((task) => task.status === "DONE")
              .map((task) => (
                <TaskCard key={task.id} task={task} onDelete={handleDelete} />
              ))}
            {tasks.filter(
              (task) =>
                task.status === "DONE"
            ).length === 0 && (
              <p className="text-zinc-500 text-sm">
                No tasks yet
              </p>
            )}
          </TaskColumn>
        </div>
      </DndContext>
    </div>
  );
}
