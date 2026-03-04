/**
 * Supabase client for server-side canon data fetching (books, authors).
 * Does NOT use cookies — safe for static generation and request-time rendering.
 * Use this for public read-only data. For user-specific data (favorites, etc.),
 * use createClient from ./server.
 */

import { createClient } from "@supabase/supabase-js";

let _client: ReturnType<typeof createClient> | null = null;

export function getCanonDataClient() {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  _client = createClient(url, key);
  return _client;
}
