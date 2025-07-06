import { getNotes } from "@/lib/api";
import Link from "next/link";
import type { Note } from "@/types";
import { deleteNote } from "./notes/actions";

export default async function HomePage() {
  const notes: Note[] = await getNotes();

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-purple-700">📚 My Notes</h1>
        <Link
          href="/notes/new"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          + New Note
        </Link>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <li
            key={note._id}
            className="bg-white border-l-4 border-purple-500 p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <Link
              href={`/notes/${note._id}`}
              className="text-xl font-semibold text-purple-700 hover:underline"
            >
              {note.title}
            </Link>
            <p className="mt-2 text-gray-600 text-sm line-clamp-3">
              {note.content.length > 0
                ? note.content.length > 100
                  ? note.content.slice(0, 100) + "..."
                  : note.content
                : "No content"}
            </p>
            <div className="mt-3 flex gap-4 text-sm text-gray-600">
              <Link
                href={`/notes/edit/${note._id}`}
                className="hover:text-blue-500"
              >
                ✏️ Edit
              </Link>
              <form action={deleteNote}>
                <input type="hidden" name="id" value={note._id} />
                <button type="submit" className="hover:text-red-500">
                  🗑️ Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
