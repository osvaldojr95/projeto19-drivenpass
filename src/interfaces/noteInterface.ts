import { Note } from "@prisma/client";

export type CreateNoteData = Omit<Note, "id">;
