"use client";

import { use, useEffect, useState } from "react";
import { getNote } from "@/lib/api";
import type { Note } from "@/types";
import { updateNoteAction } from "../../actions";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditNotePage({ params }: PageProps) {
  const { id } = use(params);
  const [note, setNote] = useState<Note | null>(null);
  const router = useRouter();

  useEffect(() => {
    getNote(id).then(setNote);
  }, [id]);

  if (!note) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-xl border border-purple-200">
      <h1 className="text-2xl font-semibold mb-6 text-purple-700">Edit Note</h1>
      <form
        action={(formData) => updateNoteAction(id, formData)}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          defaultValue={note.title}
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-400"
          required
        />
        <textarea
          name="content"
          defaultValue={note.content}
          className="w-full border border-gray-300 p-3 rounded-md h-40 resize-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-6 rounded-lg shadow hover:opacity-90 transition"
          >
            ✅ Update
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
