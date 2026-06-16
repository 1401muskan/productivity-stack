import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import MenuBar from "./MenuBar";

interface Props {
  content: string;
  onChange: (content: string) => void;
}

export default function NoteEditor({
  content,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [StarterKit],

    content,

    editorProps: {
      attributes: {
        class:
          "min-h-[400px] p-4 outline-none text-zinc-200",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (
      editor &&
      editor.getHTML() !== content
    ) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="border border-zinc-800 rounded-xl">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}