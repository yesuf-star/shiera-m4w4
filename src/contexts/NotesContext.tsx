
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Note, NoteInput, NotesView } from "../types/note";

type NotesAction =
  | { type: "add"; note: Note }
  | { type: "update"; id: string; data: NoteInput }
  | { type: "remove"; id: string }
  | { type: "togglePin"; id: string }
  | { type: "toggleArchive"; id: string };

type NotesState = {
  notes: Note[];
};

const NotesStateContext = createContext<NotesState | undefined>(undefined,);

const NotesDispatchContext = createContext<Dispatch<NotesAction> | undefined>(undefined);

function notesReducer(
  state: NotesState,
  action: NotesAction,
): NotesState {
  if (action.type === "add") {
    return {
      notes: [action.note, ...state.notes],
    };
  }

  if (action.type === "update") {
    return {
      notes: state.notes.map((note) =>
        note.id === action.id
          ? {
              ...note,
              ...action.data,
              updatedAt: Date.now(),
            }
          : note,
      ),
    };
  }

  if (action.type === "remove") {
    return {
      notes: state.notes.filter(
        (note) => note.id !== action.id,
      ),
    };
  }

  if (action.type === "togglePin") {
    return {
      notes: state.notes.map((note) =>
        note.id === action.id
          ? { ...note, isPinned: !note.isPinned }
          : note,
      ),
    };
  }

  if (action.type === "toggleArchive") {
    return {
      notes: state.notes.map((note) =>
        note.id === action.id
          ? { ...note, isArchived: !note.isArchived }
          : note,
      ),
    };
  }

  return state;
}

export function NotesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [storedNotes, setStoredNotes] = useLocalStorage<Note[]>(
    "notes-data-v1",
    [],
  );

  const [state, dispatch] = useReducer(
    notesReducer,
    { notes: storedNotes },
  );

  useEffect(() => {
    setStoredNotes(state.notes);
  }, [state.notes, setStoredNotes]);

  const stateValue = useMemo(
    () => ({ notes: state.notes }),
    [state.notes],
  );

  return (
    <NotesStateContext.Provider value={stateValue}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesStateContext.Provider>
  );
}

export function useNotesState() {
  const context = useContext(NotesStateContext);

  if (context === undefined) {
    throw new Error(
      "useNotesState must be used inside NotesProvider",
    );
  }

  return context;
}

export function useNotesDispatch() {
  const context = useContext(NotesDispatchContext);

  if (context === undefined) {
    throw new Error(
      "useNotesDispatch must be used inside NotesProvider",
    );
  }

  return context;
}

export function useNotes() {
  const { notes } = useNotesState();
  const dispatch = useNotesDispatch();

  function add(data: NoteInput) {
    const now = Date.now();

    const note: Note = {
      id: crypto.randomUUID(),
      title: data.title,
      content: data.content,
      isPinned: false,
      isArchived: false,
      createdAt: now,
      updatedAt: now,
    };

    dispatch({ type: "add", note });
  }

  function update(id: string, data: NoteInput) {
    dispatch({ type: "update", id, data });
  }

  function remove(id: string) {
    dispatch({ type: "remove", id });
  }

  function togglePin(id: string) {
    dispatch({ type: "togglePin", id });
  }

  function toggleArchive(id: string) {
    dispatch({ type: "toggleArchive", id });
  }

  function notesFor(view: NotesView) {
    if (view === "pinned") {
      return notes.filter(
        (note) => note.isPinned && !note.isArchived,
      );
    }

    if (view === "archived") {
      return notes.filter((note) => note.isArchived);
    }

    return notes.filter((note) => !note.isArchived);
  }

  return {
    notes,
    add,
    update,
    remove,
    togglePin,
    toggleArchive,
    notesFor,
  };
}