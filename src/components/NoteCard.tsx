
import { memo, useState } from "react";
import type { Note } from "../types/note";

type NoteCardProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onRemove: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleArchive: (id: string) => void;
};

function NoteCard({
  note,
  onEdit,
  onRemove,
  onTogglePin,
  onToggleArchive,
}: NoteCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <article className="flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-yellow-50 p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <h3 className="wrap-break-word text-lg font-semibold">
          {note.title}
        </h3>

        {note.isPinned && (
          <span title="Pinned" aria-label="Pinned note">
            📌
          </span>
        )}
      </div>

      <p className="mt-3 flex-1 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-600 dark:text-slate-300">
        {note.content}
      </p>

      <p className="mt-4 text-xs text-slate-500">
        Updated {new Date(note.updatedAt).toLocaleDateString()}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onTogglePin(note.id)}
          aria-pressed={note.isPinned}
          className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {note.isPinned ? "Unpin" : "Pin"}
        </button>

        <button
          type="button"
          onClick={() => onToggleArchive(note.id)}
          className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {note.isArchived ? "Unarchive" : "Archive"}
        </button>

        <button
          type="button"
          onClick={() => onEdit(note)}
          className="rounded-lg px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950"
        >
          Edit
        </button>

        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            Delete
          </button>
        ) : (
          <div
            className="flex w-full flex-wrap items-center gap-2 rounded-lg bg-red-50 p-3 dark:bg-red-950/40"
            aria-label={`Confirm deletion of ${note.title}`}
          >
            <span className="mr-auto text-sm">
              Delete this note?
            </span>

            <button
              type="button"
              onClick={() => onRemove(note.id)}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="rounded-lg px-3 py-2 text-sm hover:bg-white dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default memo(NoteCard);