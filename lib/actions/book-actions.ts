"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(bookSlug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("book_slug", bookSlug)
    .single();

  if (existing) {
    await supabase.from("favorites").delete().eq("id", existing.id);
  } else {
    await supabase.from("favorites").insert({ user_id: user.id, book_slug: bookSlug });
  }
  revalidatePath(`/books/${bookSlug}`);
  revalidatePath("/");
  return {};
}

export async function toggleRead(bookSlug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  const { data: existing } = await supabase
    .from("read_status")
    .select("id")
    .eq("user_id", user.id)
    .eq("book_slug", bookSlug)
    .single();

  if (existing) {
    await supabase.from("read_status").delete().eq("id", existing.id);
  } else {
    await supabase.from("read_status").insert({ user_id: user.id, book_slug: bookSlug });
  }
  revalidatePath(`/books/${bookSlug}`);
  revalidatePath("/");
  return {};
}

export async function toggleWishlist(bookSlug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  const { data: existing } = await supabase
    .from("wishlist")
    .select("id")
    .eq("user_id", user.id)
    .eq("book_slug", bookSlug)
    .single();

  if (existing) {
    await supabase.from("wishlist").delete().eq("id", existing.id);
  } else {
    await supabase.from("wishlist").insert({ user_id: user.id, book_slug: bookSlug });
  }
  revalidatePath(`/books/${bookSlug}`);
  revalidatePath("/");
  return {};
}
