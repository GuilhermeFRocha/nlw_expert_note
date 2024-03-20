import { useState } from "react";
import logo from "./assets/logo-nlw-expert.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NWL expert" />
      <form className="w-full ">
        <input
          type="text"
          placeholder="Busque em sua notas"
          className="w-full bg-transparent text-3xl font-semibold placeholder:text-slate-500 tracking-tight outline-none"
        />
      </form>

      <div className="h-px bg-slate-700 " />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard setNotes={setNotes} notes={notes} />

        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
