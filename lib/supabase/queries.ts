import { createClient } from "./server";

export async function getUserBookActions(bookSlug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { favorite: false, read: false, wishlist: false, isSignedIn: false };

  const [favRes, readRes, wishRes] = await Promise.all([
    supabase.from("favorites").select("id").eq("user_id", user.id).eq("book_slug", bookSlug).single(),
    supabase.from("read_status").select("id").eq("user_id", user.id).eq("book_slug", bookSlug).single(),
    supabase.from("wishlist").select("id").eq("user_id", user.id).eq("book_slug", bookSlug).single(),
  ]);

  return {
    favorite: !!favRes.data,
    read: !!readRes.data,
    wishlist: !!wishRes.data,
    isSignedIn: true,
  };
}
