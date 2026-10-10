
import type { KeyboardEvent } from "react";
import type { NotesView } from "../types/note";

type ViewTabsProps = {
  activeView: NotesView;
  handleChange: (view: NotesView) => void;
  counts: Record<NotesView, number>;
};

const tabs: { id: NotesView; label: string }[] = [
  { id: "all", label: "All notes" },
  { id: "pinned", label: "Pinned" },
  { id: "archived", label: "Archived" },
];

export default function ViewTabs({
  activeView,
  handleChange,
  counts,
}: ViewTabsProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = tabs.findIndex(
      (tab) => tab.id === activeView,
    );

    if (event.key === "ArrowRight") {
      event.preventDefault();

      const next = tabs[(currentIndex + 1) % tabs.length];
      handleChange(next.id);
      document.getElementById(`tab-${next.id}`)?.focus();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      const previous =
        tabs[(currentIndex - 1 + tabs.length) % tabs.length];

      handleChange(previous.id);
      document.getElementById(`tab-${previous.id}`)?.focus();
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();

      const target =
        event.key === "Home" ? tabs[0] : tabs[tabs.length - 1];

      handleChange(target.id);
      document.getElementById(`tab-${target.id}`)?.focus();
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Note views"
      className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800"
    >
      {tabs.map((tab) => {
        const selected = activeView === tab.id;

        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls="notes-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => handleChange(tab.id)}
            onKeyDown={handleKeyDown}
            className={`rounded-t-xl border-b-2 px-4 py-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              selected
                ? "border-blue-600 text-blue-700 dark:text-blue-300"
                : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
            <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">
              {counts[tab.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}