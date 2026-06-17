import { Trash2 } from "lucide-react";

import { useDraggable } from "@dnd-kit/core";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Props {
  task: Task;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(
          ${transform.x}px,
          ${transform.y}px,
          0
        )`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="
        bg-zinc-800
        hover:bg-zinc-700
        hover:-translate-y-1
        hover:shadow-xl
        transition-all
        duration-200
        p-4
        rounded-2xl
        border
        border-zinc-700
        mb-3
        cursor-grab
        shadow-lg
        "
    >
      <div
        className="
            inline-flex
            px-2
            py-1
            rounded-full
            text-xs
            bg-violet-500/20
            text-violet-300
            mb-3
        "
      >
        Task
      </div>
      <h3
        className="
            text-white
            font-semibold
            text-base
        "
      >
        {task.title}
      </h3>

      <p
        className="
            text-sm
            text-zinc-500
            mt-2
            leading-relaxed
        "
      >
        {task.description}
      </p>

      <button
        onClick={() => onDelete(task.id)}
        className="
            mt-4
            text-zinc-500
            hover:text-red-500
            transition
        "
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
