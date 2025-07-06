import { getNote } from "@/lib/api";
import type { Note } from "@/types";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const note: Note = await getNote(unwrappedParams.id);

  return (
    <main className="mt-16 p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-purple-200">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 transition"
        >
          ↩️ Back to Notes
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-purple-700 mb-6">{note.title}</h1>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-gray-700 whitespace-pre-line leading-relaxed break-words overflow-x-auto">
        {note.content}
      </div>
    </main>
  );
}
