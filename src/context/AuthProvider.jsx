import { useEffect, useRef, useState, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [employeeLoading, setEmployeeLoading] = useState(false);

  const fetchIdRef = useRef(0);

  const fetchEmployee = useCallback(async (userId) => {
    const fetchId = ++fetchIdRef.current;

    if (!userId || !supabase) {
      setEmployee(null);
      setEmployeeLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("employees")
      .select("employee_id, agency_id, name, email, address, role")
      .eq("employee_id", userId)
      .maybeSingle();

    if (fetchId !== fetchIdRef.current) return;

    if (error) {
      console.error("Failed to load employee profile:", error.message);
      setEmployee(null);
    } else {
      setEmployee(data);
    }
    setEmployeeLoading(false);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let mounted = true;
    // Tracks the user id we last fetched an employee profile for, so
    // we can tell a real sign-in/sign-out/user-switch apart from a
    // silent event (e.g. TOKEN_REFRESHED on tab focus) for the same user.
    let currentUserId = null;

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        setSession(session);
        setAuthLoading(false);

        const newUserId = session?.user?.id ?? null;

        // Same user as before (e.g. a token refresh fired by tab focus) —
        // session is already updated above, nothing else to do. Skipping
        // this avoids wiping `employee` and re-toggling `employeeLoading`,
        // which was causing ProtectedRoute to remount the page on tab focus.
        if (newUserId === currentUserId) return;
        currentUserId = newUserId;

        setEmployee(null);
        setEmployeeLoading(!!newUserId);

        setTimeout(() => {
          if (!mounted) return;
          fetchEmployee(newUserId);
        }, 0);
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [fetchEmployee]);

  const login = async (email, password) => {
    if (!supabase) {
      throw new Error(
        "Sign-in is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
      );
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    session,
    user: session?.user ?? null,
    employee,
    role: employee?.role ?? null,
    loading: authLoading || employeeLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
