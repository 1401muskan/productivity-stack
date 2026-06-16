import { useEffect, useState } from "react";

import {
  createNote,
  getNotes,
  updateNote,
} from "../api/notes";
import NoteEditor from "../components/editor/NoteEditor";

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

  const handleSave =
    async () => {
      if (!selectedNote) return;

      try {
        await updateNote(
          selectedNote.id,
          selectedNote.title,
          selectedNote.content
        );

        await fetchNotes();
      } catch (error) {
        console.error(error);
      }
    };

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

          <div className="space-y-2">

            {notes.map((note) => (
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

              <button
                onClick={
                  handleSave
                }
                className="mt-6 bg-violet-600 px-5 py-3 rounded-xl text-white"
              >
                Save
              </button>

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