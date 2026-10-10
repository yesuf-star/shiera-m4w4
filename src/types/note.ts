
export type Note = {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isArchived: boolean;
  createdAt: number;
  updatedAt: number;
};

export type NotesView = "all" | "pinned" | "archived";

export type NoteInput = {
  title: string;
  content: string;
};