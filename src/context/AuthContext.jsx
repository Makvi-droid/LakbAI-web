import { createContext, useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // has the session bootstrap resolved?
  const [employeeLoading, setEmployeeLoading] = useState(false); // is an employee-profile fetch in flight?

  // Guards against out-of-order responses: if a newer fetch starts,
  // any older fetch that resolves later is discarded instead of
  // overwriting fresher data.
  const fetchIdRef = useRef(0);

  const fetchEmployee = useCallback(async (userId) => {
    const fetchId = ++fetchIdRef.current;

    if (!userId) {
      setEmployee(null);
      setEmployeeLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("employees")
      .select("employee_id, agency_id, name, email, address, role")
      .eq("employee_id", userId)
      .maybeSingle();

    // A newer call has since been made — ignore this stale result.
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
    let mounted = true;

    // IMPORTANT: onAuthStateChange fires immediately upon subscribing with
    // the CURRENT session (including on first load, and again on every
    // sign-in/sign-out/token refresh) — it is not just for *future* changes.
    //
    // Using onAuthStateChange as the SINGLE source of truth removes the
    // duplicate-fetch race that used to exist here.
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        setSession(session);
        setAuthLoading(false);

        // Reset any previous user's employee record immediately so a
        // stale role from a prior session can never be read by a
        // component while the new fetch is in flight.
        setEmployee(null);
        setEmployeeLoading(!!session?.user?.id);

        // CRITICAL FIX: don't call fetchEmployee() (which runs a
        // supabase.from() query) synchronously from inside this
        // callback. Supabase's GoTrueClient holds an internal lock
        // while processing an auth event, and issuing another Supabase
        // call before the callback returns can contend with that lock
        // and stall — sometimes indefinitely, until some unrelated
        // interaction (a click, a route change) happens to release it.
        // That stall is what was causing `role` to stay null right
        // after login, making ProtectedRoute bounce to /unauthorized
        // until something else "nudged" it loose.
        //
        // Deferring with setTimeout(..., 0) lets the callback return
        // and release the lock first, per Supabase's own guidance.
        setTimeout(() => {
          if (!mounted) return;
          fetchEmployee(session?.user?.id);
        }, 0);
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [fetchEmployee]);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
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
