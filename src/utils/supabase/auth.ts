import { Session, SupabaseClient } from "@supabase/supabase-js";

/**
 * Check if a user is currently authenticated
 */
export async function isAuthenticated(supabase: SupabaseClient) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return !!session;
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(
  supabase: SupabaseClient
): Promise<Session | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

/**
 * Sign out the current user
 */
export async function signOut(supabase: SupabaseClient) {
  return supabase.auth.signOut();
}

/**
 * Exchange an auth code for a session (used in OAuth flows)
 */
export async function exchangeCodeForSession(
  supabase: SupabaseClient,
  code: string
) {
  return supabase.auth.exchangeCodeForSession(code);
}
