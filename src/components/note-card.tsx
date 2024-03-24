import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface Note {
  date: Date;
  content: string;
  id: string;
}

interface NoteCardProps {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  deleteNote: (id: string) => void;
}

export function NoteCard({ note, deleteNote }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col  bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2  hover:ring-slate-600 focus-ring-2 focus-ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 from-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] md:rounded-md bg-slate-700 flex flex-col outline-none">
          <Dialog.Close className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>

            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <button
            type="button"
            onClick={() => deleteNote(note.id)}
            className="w-full py-4 bg-slate-800 text-center text-sm text-slate-300 outline-none font-medium group"
          >
            Deseja {""}
            <span className="text-red-400 group-hover:underline">
              excluir essa nota?
            </span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
