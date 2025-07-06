"use server";

// import { unstable_after as after } from "next/server";
import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/notes`;

export async function createNoteAction(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || !content) {
    throw new Error("Missing fields");
  }

  await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  revalidatePath("/");

  after(() => {
    console.log("📝 Note created, running background task...");
  });
}

export async function updateNoteAction(id: string, formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || !content) throw new Error("Missing fields");

  await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  revalidatePath("/");

  after(() => {
    console.log(`✏️ Note ${id} updated, running background task...`);
  });
  redirect("/");
}

export async function deleteNote(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) throw new Error("Missing note ID");

  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  revalidatePath("/");

  after(() => {
    console.log(`🗑️ Note ${id} deleted, running background task...`);
  });
}
