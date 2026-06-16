import type { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
}

export default function MenuBar({
  editor,
}: Props) {
  return (
    <div className="flex gap-2 border-b border-zinc-800 p-2">

      <button
        onClick={() =>
          editor.chain().focus().toggleBold().run()
        }
      >
        Bold
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleItalic().run()
        }
      >
        Italic
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
      >
        List
      </button>

    </div>
  );
}