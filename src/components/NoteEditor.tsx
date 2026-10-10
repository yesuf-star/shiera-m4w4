
import { useId, useState, type FormEvent } from "react";
import type { Note, NoteInput } from "../types/note";

type NoteEditorProps = {
  note: Note | null;
  onSave: (data: NoteInput) => void;
  onCancel: () => void;
};

export default function NoteEditor({
  note,
  onSave,
  onCancel,
}: NoteEditorProps) {
  const titleId = useId();
  const contentId = useId();

  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      title: title.trim(),
      content: content.trim(),
    };

    if (!data.title || !data.content) {
      return;
    }

    onSave(data);

    if (!note) {
      setTitle("");
      setContent("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-indigo-300 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 className="text-lg font-semibold">
        {note ? "Edit note" : "Create a note"}
      </h2>

      <div className="space-y-2">
        <label
          htmlFor={titleId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Title
        </label>

        <input
          id={titleId}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Give your note a title"
          maxLength={120}
          required
          className="w-full rounded-xl border border-slate-300 bg-gray-200 px-4 py-3 placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor={contentId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Content
        </label>

        <textarea
          id={contentId}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your thoughts..."
          rows={5}
          maxLength={10000}
          required
          className="w-full resize-y rounded-xl border placeholder:text-slate-500 border-slate-300 bg-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-xl bg-amber-500  px-5 py-3 font-medium text-white hover:bg-amber-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {note ? "Save changes" : "Add note"}
        </button>

        {note && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}