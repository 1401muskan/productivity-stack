import { useEffect, useState } from "react";

import { createNote, getNotes, updateNote, deleteNote } from "../api/notes";
import NoteEditor from "../components/editor/NoteEditor";
import { Trash2 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [search, setSearch] = useState("");

  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  const filteredNotes = notes.filter((note) =>
  note.title
    .toLowerCase()
    .includes(search.toLowerCase())
);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();

      setNotes(response.data);

      if (response.data.length > 0 && !selectedNote) {
        setSelectedNote(response.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    try {
      const response = await createNote("Untitled Note", "");

      await fetchNotes();

      setSelectedNote(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
  if (!selectedNote) return;

  console.log("selectedNote", selectedNote);
console.log("selectedNote.id", selectedNote.id);
  try {
    setSaving(true);

    const response = await updateNote(
      selectedNote.id,
      selectedNote.title,
      selectedNote.content,
    );

    await fetchNotes();

    setSelectedNote(response.data);

    setSaving(false);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  } catch (error) {
    console.error("SAVE ERROR", error);

    setSaving(false);
  }
};

  const handleDelete = async () => {
    if (!selectedNote) return;

    try {
      await deleteNote(selectedNote.id);

      setSelectedNote(null);

      await fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Notes</h1>

          <p className="text-zinc-400 mt-2">
            Capture ideas and organize knowledge
          </p>
        </div>

        <button
          onClick={handleCreateNote}
          className="bg-violet-600 text-white px-5 py-3 rounded-xl"
        >
          New Note
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Sidebar */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="
  w-full
  mb-4
  bg-zinc-800
  border
  border-zinc-700
  text-white
  rounded-xl
  p-3
  outline-none
  focus:border-violet-500
"
          />

          <div className="space-y-2">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`
                  w-full
                  text-left
                  p-4
                  rounded-xl
                  transition
                  border

                  ${
                    selectedNote?.id === note.id
                      ? "bg-violet-600 border-violet-500 text-white"
                      : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300"
                  }
                `}
              >
                {note.title}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}

        <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          {selectedNote ? (
            <>

              <div className="flex items-center justify-between mb-6">

  <input
    value={selectedNote.title}
    onChange={(e) =>
      setSelectedNote({
        ...selectedNote,
        title: e.target.value,
      })
    }
    className="
      bg-transparent
      text-white
      text-4xl
      font-bold
      outline-none
      flex-1
    "
  />

<p
  className={`
    text-sm
    font-medium
    ml-4
    ${
      saving
        ? "text-yellow-400"
        : "text-emerald-400"
    }
  `}
>
  {saving
    ? "Saving..."
    : saved
    ? "✓ Saved"
    : ""}
</p>

</div>

              <NoteEditor
                content={selectedNote.content}
                onChange={(content) =>
                  setSelectedNote({
                    ...selectedNote,
                    content,
                  })
                }
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="bg-violet-600 px-5 py-3 rounded-xl text-white"
                >
                  Save
                </button>

                <button
                  onClick={handleDelete}
                  className="
  border
  border-red-500
  text-red-400
  px-4
  py-3
  rounded-xl
  hover:bg-red-500
  hover:text-white
  transition
"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
  <p className="text-zinc-400 text-lg">
    No note selected
  </p>

  <p className="text-zinc-500 mt-2">
    Create a new note to get started
  </p>
</div>
          )}
        </div>
      </div>
    </div>
  );
}
