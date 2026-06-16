import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    'Missing Supabase credentials. Real-time collaboration is disabled — the app runs in offline mode.'
  );
}

// Fall back to well-formed placeholders so the client constructs without throwing
// when no backend is configured. Realtime calls simply never connect, which the
// app already tolerates (drawing stays local).
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export const CHANNEL_NAME = 'canvas-room';
