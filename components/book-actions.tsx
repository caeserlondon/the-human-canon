"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, BookCheck, Bookmark } from "lucide-react";
import Link from "next/link";
import { toggleFavorite, toggleRead, toggleWishlist } from "@/lib/actions/book-actions";

interface BookActionsProps {
  bookSlug: string;
  initialFavorite: boolean;
  initialRead: boolean;
  initialWishlist: boolean;
  isSignedIn: boolean;
}

export function BookActions({
  bookSlug,
  initialFavorite,
  initialRead,
  initialWishlist,
  isSignedIn,
}: BookActionsProps) {
  const router = useRouter();
  const [favorite, setFavorite] = useState(initialFavorite);
  const [read, setRead] = useState(initialRead);
  const [wishlist, setWishlist] = useState(initialWishlist);

  const handleFavorite = async () => {
    if (!isSignedIn) {
      router.push(`/sign-in?next=/books/${bookSlug}`);
      return;
    }
    const result = await toggleFavorite(bookSlug);
    if (!result.error) setFavorite(!favorite);
  };

  const handleRead = async () => {
    if (!isSignedIn) {
      router.push(`/sign-in?next=/books/${bookSlug}`);
      return;
    }
    const result = await toggleRead(bookSlug);
    if (!result.error) setRead(!read);
  };

  const handleWishlist = async () => {
    if (!isSignedIn) {
      router.push(`/sign-in?next=/books/${bookSlug}`);
      return;
    }
    const result = await toggleWishlist(bookSlug);
    if (!result.error) setWishlist(!wishlist);
  };

  if (!isSignedIn) {
    return (
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/sign-in?next=/books/${bookSlug}`}
          className="inline-flex items-center gap-2 rounded border border-border bg-panel px-3 py-2 text-sm text-muted hover:border-gold hover:text-gold transition-colors"
        >
          <Heart className="size-4" />
          Sign in to save books
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleFavorite}
        className={`inline-flex items-center gap-2 rounded border px-3 py-2 text-sm transition-colors ${
          favorite
            ? "border-gold bg-gold/20 text-gold"
            : "border-border bg-panel text-muted hover:border-gold hover:text-gold"
        }`}
        title={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`size-4 ${favorite ? "fill-current" : ""}`} />
        {favorite ? "Favorited" : "Favorite"}
      </button>
      <button
        onClick={handleRead}
        className={`inline-flex items-center gap-2 rounded border px-3 py-2 text-sm transition-colors ${
          read
            ? "border-gold bg-gold/20 text-gold"
            : "border-border bg-panel text-muted hover:border-gold hover:text-gold"
        }`}
        title={read ? "Mark as unread" : "Mark as read"}
      >
        <BookCheck className={`size-4 ${read ? "fill-current" : ""}`} />
        {read ? "Read" : "Mark read"}
      </button>
      <button
        onClick={handleWishlist}
        className={`inline-flex items-center gap-2 rounded border px-3 py-2 text-sm transition-colors ${
          wishlist
            ? "border-gold bg-gold/20 text-gold"
            : "border-border bg-panel text-muted hover:border-gold hover:text-gold"
        }`}
        title={wishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Bookmark className={`size-4 ${wishlist ? "fill-current" : ""}`} />
        {wishlist ? "In wishlist" : "Wishlist"}
      </button>
    </div>
  );
}
