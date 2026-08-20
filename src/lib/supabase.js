import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// NOTE: this used to throw at import time when the env vars were missing.
// That throw happened while main.jsx was still evaluating its module graph,
// before React had rendered anything — so the whole app failed silently
// with a blank white page instead of showing any error. Degrade gracefully
// instead: leave `supabase` null and let callers surface a real UI message.
if (!isSupabaseConfigured) {
  console.error(
    "Missing Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY). Sign-in is disabled until these are set.",
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
