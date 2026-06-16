import { useEffect, useState } from "react";

import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../api/notes";
import NoteEditor from "../components/editor/NoteEditor";
import {
  Trash2,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function Notes() {
  const [notes, setNotes] =
    useState<Note[]>([]);

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null);

  const [search, setSearch] =
  useState("");

  const [saving, setSaving] =
  useState(false);

  const fetchNotes = async () => {
    try {
      const response =
        await getNotes();

      setNotes(response.data);

      if (
        response.data.length > 0 &&
        !selectedNote
      ) {
        setSelectedNote(
          response.data[0]
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote =
    async () => {
      try {
        const response =
          await createNote(
            "Untitled Note",
            ""
          );

        await fetchNotes();

        setSelectedNote(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  const handleSave = async () => {
  if (!selectedNote) return;

  console.log("SAVE CLICKED");
  console.log(selectedNote);

  try {
    const response = await updateNote(
      selectedNote.id,
      selectedNote.title,
      selectedNote.content
    );

    console.log("SAVE RESPONSE", response.data);

    await fetchNotes();
  } catch (error) {
    console.error("SAVE ERROR", error);
  }
};

  const filteredNotes =
  notes.filter((note) =>
    note.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete =
  async () => {
    if (!selectedNote) return;

    try {
      await deleteNote(
        selectedNote.id
      );

      setSelectedNote(null);

      await fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  if (!selectedNote) return;

  const timeout = setTimeout(async () => {
    try {
      console.log("AUTO SAVE");
      console.log(selectedNote);

      setSaving(true);

      await updateNote(
        selectedNote.id,
        selectedNote.title,
        selectedNote.content
      );

      setSaving(false);
    } catch (error) {
      console.error("AUTO SAVE ERROR", error);
      setSaving(false);
    }
  }, 1000);

  return () => clearTimeout(timeout);
}, [
  selectedNote?.title,
  selectedNote?.content,
]);

  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-bold text-white">
          Notes
        </h1>

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
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search notes..."
              className="w-full mb-4 bg-zinc-800 text-white rounded-lg p-3 outline-none"
            />

          <div className="space-y-2">

            {filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() =>
                  setSelectedNote(
                    note
                  )
                }
                className="w-full text-left p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white"
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

              <input
                value={
                  selectedNote.title
                }
                onChange={(e) =>
                  setSelectedNote({
                    ...selectedNote,
                    title:
                      e.target.value,
                  })
                }
                className="w-full bg-transparent text-white text-3xl mb-6 outline-none"
              />

              <p className="text-sm text-zinc-500 mb-4">
                {saving
                  ? "Saving..."
                  : "Saved"}
              </p>

              {/* <textarea
                value={
                  selectedNote.content
                }
                onChange={(e) =>
                  setSelectedNote({
                    ...selectedNote,
                    content:
                      e.target.value,
                  })
                }
                className="w-full h-80 bg-transparent text-zinc-300 outline-none resize-none"
              /> */}

              <NoteEditor
                content={selectedNote.content}
                onChange={(content) =>
                    setSelectedNote({
                        ...selectedNote,
                        content,
                    })
                }
                />

              {/* <button
                onClick={
                  handleSave
                }
                className="mt-6 bg-violet-600 px-5 py-3 rounded-xl text-white"
              >
                Save
              </button> */}

              <div className="flex gap-3 mt-6">

            <button
              onClick={handleSave}
              className="bg-violet-600 px-5 py-3 rounded-xl text-white"
            >
              Save
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 px-4 py-3 rounded-xl text-white"
            >
              <Trash2 size={18} />
            </button>

          </div>

            </>
          ) : (
            <p className="text-zinc-500">
              No notes found
            </p>
          )}

        </div>

      </div>

    </div>
  );
}