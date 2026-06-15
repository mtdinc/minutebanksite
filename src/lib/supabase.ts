import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Guarded client — returns null if env vars are missing.
// The modal degrades gracefully (shows download state) when null.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
