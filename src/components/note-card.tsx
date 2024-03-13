export function NoteCard() {
  return (
    <button className="rounded-md text-left bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2  hover:ring-slate-600 focus-ring-2 focus-ring-lime-400 outline-none">
      <span className="text-sm font-medium text-slate-300">Adicionar nota</span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint aperiam
        iusto laudantium. Pariatur debitis autem rem magni nemo error ab ipsum
        rerum non magnam labore quod enim, culpa alias blanditiis.
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 from-black/0 pointer-events-none" />
    </button>
  );
}
