import type { Note } from "@/types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/notes`;

export async function getNotes(): Promise<Note[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function getNote(id: string): Promise<Note> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    next: {
      staleTime: 15000, //Keep this data cached on the client for 15 seconds
    } as any,
  });
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
}
