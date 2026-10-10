
import { useCallback, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNotes } from "./contexts/NotesContext";
import type { Note, NotesView, NoteInput } from "./types/note";
import ThemeToggle from "./components/ThemeToggle";
import NoteEditor from "./components/NoteEditor";
import NoteList from "./components/NoteList";
import ViewTabs from "./components/ViewTabes";
import { useTheme } from "./contexts/ThemeContext";

export default function App() {
  const { theme } = useTheme();
  const {
    notes,
    add,
    update,
    remove,
    togglePin,
    toggleArchive,
    notesFor,
  } = useNotes();

  const [activeView, setActiveView] =
    useLocalStorage<NotesView>("notes-active-view-v1", "all");

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleEdit = useCallback((note: Note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSave = useCallback(
    (data: NoteInput) => {
      if (editingNote) {
        update(editingNote.id, data);
        setEditingNote(null);
      } else {
        add(data);
      }
    },
    [editingNote, add, update],
  );

  const handleCancel = useCallback(() => {
    setEditingNote(null);
  }, []);

  const counts: Record<NotesView, number> = {
    all: notes.filter((note) => !note.isArchived).length,
    pinned: notes.filter((note) => note.isPinned && !note.isArchived,).length,
    archived: notes.filter((note) => note.isArchived).length,
  };

  const visibleNotes = notesFor(activeView);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white"
      style={{
    backgroundImage: "url('/images/notes-bg.png')",
    backgroundSize: "100% 200%",
    backgroundPosition: theme === "dark" ? "bottom" : "top",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  }}
    >
      <header className="border-b border-slate-200 bg-slate-400 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        
            <div className="flex items-center gap-4">
               <img src="images/notes-logo.png" alt="Star Notes logo" className="h-12 w-12 rounded-2xl object-cover shadow-lg" /> 
            
              <h1 className="text-2xl font-bold tracking-tight cursor-pointer text-slate-900 dark:text-white"><span className= "text-amber-500">Negm</span> Notes </h1>
           
          </div>

          <ThemeToggle />
        </div>
      </header>
      
      <div>
            <h1 className=" text-2xl font-bold text-center text-amber-500 py-8 sm:text-3xl">
              Notes App
            </h1>
          </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[340px_1fr] lg:px-8">
        <aside>
          <NoteEditor
            key={editingNote?.id ?? "new-note"}
            note={editingNote}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </aside>

        <section className="min-w-0 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your notes</h2>

            <p className="mt-1 text-md text-gray-700 dark:text-slate-400">
              Organize your thoughts, one note at a time.
            </p>
          </div>

          <ViewTabs
            activeView={activeView}
            handleChange={setActiveView}
            counts={counts}
          />

          <div
            id="notes-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeView}`}
            tabIndex={0}
            className="min-w-0"
          >
            <NoteList
              notes={visibleNotes}
              onEdit={handleEdit}
              onRemove={remove}
              onTogglePin={togglePin}
              onToggleArchive={toggleArchive}
            />
          </div>
        </section>
      </div>

      <footer className="px-4 py-4 text-center text-md text-slate-500 bg-amber-100 dark:text-slate-400">
       &copy; {new Date().getFullYear()} Negm PLC All Rights Reserved.</footer>
    </main>
  );
}