import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCard {
  notes: { id: string; date: Date; content: string }[];
  setNotes: React.Dispatch<
    React.SetStateAction<{ id: string; date: Date; content: string }[]>
  >;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ setNotes, notes }: NewNoteCard) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    if (event.target.value === "") {
      setShouldShowOnboarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();
    if (content !== "") {
      const allNotes = [
        { id: crypto.randomUUID(), date: new Date(), content },
        ...notes,
      ];

      setNotes(allNotes);
      localStorage.setItem("notes", JSON.stringify(allNotes));
      setContent("");
      setShouldShowOnboarding(true);
      toast.success("Nota salva");
    } else {
      toast.error("Preencha a nota");
    }
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert("Seu navegador não suporta a API de reconhecimento de fala");
      return;
    }

    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");
      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 text-left p-5 gap-3 outline-none hover:ring-2  hover:ring-slate-600 focus-ring-2 focus-ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">Grave uma nota</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] md:rounded-md bg-slate-700 flex flex-col outline-none">
          <Dialog.Close
            className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100"
            onClick={() => {
              setContent("");
              setShouldShowOnboarding(true);
            }}
          >
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    onClick={handleStartRecording}
                    type="button"
                    className="font-medium text-lime-400 hover:underline"
                  >
                    gravando uma nota{" "}
                  </button>{" "}
                  em audio ou se preferir{" "}
                  <button
                    onClick={() => setShouldShowOnboarding(false)}
                    type="button"
                    className="font-medium text-lime-400 hover:underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (Clique para interromper)
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                type="button"
                className="w-full py-4 bg-lime-400 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
