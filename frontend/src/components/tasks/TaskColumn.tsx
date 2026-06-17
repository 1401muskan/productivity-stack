import { useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function TaskColumn({ id, title, children }: Props) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="
        bg-zinc-900/70
        backdrop-blur
        p-5
        rounded-3xl
        min-h-[550px]
        border
        border-zinc-800
        "
    >
      <h2
        className="
            text-lg
            font-bold
            text-white
            mb-4
            border-b
            border-zinc-800
            pb-3
        "
      >
        {title}
      </h2>

      {children}
    </div>
  );
}
