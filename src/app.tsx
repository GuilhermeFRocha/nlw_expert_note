import { ChangeEvent, useState } from "react";
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

  const [search, setSearch] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  function deleteNote(id: string) {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="NWL expert" />
      <form className="w-full ">
        <input
          type="text"
          placeholder="Busque em sua notas"
          className="w-full bg-transparent text-3xl font-semibold placeholder:text-slate-500 tracking-tight outline-none"
          onChange={handleChange}
        />
      </form>

      <div className="h-px bg-slate-700 " />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard setNotes={setNotes} notes={notes} />

        {filteredNotes.map((note: Note) => (
          <NoteCard
            key={note.id}
            note={note}
            setNotes={setNotes}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}
