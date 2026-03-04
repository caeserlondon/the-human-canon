import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const [favoritesRes, readRes, wishlistRes] = await Promise.all([
    supabase.from("favorites").select("book_slug").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("read_status").select("book_slug").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("wishlist").select("book_slug").eq("user_id", user.id).order("created_at", { ascending: false }),
  ]);

  const favorites = favoritesRes.data ?? [];
  const read = readRes.data ?? [];
  const wishlist = wishlistRes.data ?? [];

  return (
    <main className="hc-bg flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto max-w-4xl flex-1 px-4 py-10">
        <h1 className="text-2xl font-bold">My books</h1>
        <p className="mt-1 text-muted">
          Your reading lists and favorites.
        </p>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">Favorites ({favorites.length})</h2>
          {favorites.length === 0 ? (
            <p className="mt-2 text-sm text-muted">No favorites yet.</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {favorites.map((f) => (
                <li key={f.book_slug}>
                  <Link href={`/books/${f.book_slug}`} className="text-gold hover:text-gold2 underline">
                    {f.book_slug.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">Read ({read.length})</h2>
          {read.length === 0 ? (
            <p className="mt-2 text-sm text-muted">No books marked as read.</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {read.map((r) => (
                <li key={r.book_slug}>
                  <Link href={`/books/${r.book_slug}`} className="text-gold hover:text-gold2 underline">
                    {r.book_slug.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">Wishlist ({wishlist.length})</h2>
          {wishlist.length === 0 ? (
            <p className="mt-2 text-sm text-muted">No books in wishlist.</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {wishlist.map((w) => (
                <li key={w.book_slug}>
                  <Link href={`/books/${w.book_slug}`} className="text-gold hover:text-gold2 underline">
                    {w.book_slug.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
