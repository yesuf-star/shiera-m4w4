
import NoteCard from "./NoteCard";
import type { Note } from "../types/note";

type NoteListProps = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onRemove: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleArchive: (id: string) => void;
};

export default function NoteList({
  notes,
  onEdit,
  onRemove,
  onTogglePin,
  onToggleArchive,
}: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-slate-700">
        <p className="text-4xl" aria-hidden="true">
          📝
        </p>

        <h3 className="mt-4 text-lg font-semibold">
          Nothing here yet
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Notes matching this view will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onRemove={onRemove}
          onTogglePin={onTogglePin}
          onToggleArchive={onToggleArchive}
        />
      ))}
    </div>
  );
}