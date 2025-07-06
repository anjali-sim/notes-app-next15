"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { createNoteAction } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-6 rounded-lg shadow hover:opacity-90 transition disabled:opacity-60"
    >
      {pending ? "Saving..." : "💾 Save"}
    </button>
  );
}

export default function NewNotePage() {
  return (
    <main className="mt-16 p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md border border-purple-200">
      <h1 className="text-2xl font-semibold mb-6 text-purple-700">
        Create New Note
      </h1>

      <form action={createNoteAction} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-400"
          required
        />
        <textarea
          name="content"
          placeholder="Write your content..."
          className="w-full border border-gray-300 p-3 rounded-md h-40 resize-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <div className="flex justify-between">
          <SubmitButton /> {/* ✅ must be a child */}
          <Link href="/">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              ↩️ Back
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
}
