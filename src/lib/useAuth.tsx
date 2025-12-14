import { useState, useEffect, useCallback } from "react";
import * as sessionManager from "./sessionManager";
import type { User } from "./sessionManager";

// Global state shared across all hook instances
let globalUser: User | null = null;
let globalListeners: Set<(user: User | null) => void> = new Set();

function setGlobalUser(user: User | null) {
  globalUser = user;
  globalListeners.forEach((listener) => listener(user));
}

/**
 * Auth hook with global state
 * All instances of useAuth share the same user state
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(globalUser);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to global user changes
  useEffect(() => {
    const listener = (newUser: User | null) => setUser(newUser);
    globalListeners.add(listener);
    return () => {
      globalListeners.delete(listener);
    };
  }, []);

  // Load session on mount
  const loadSession = useCallback(async () => {
    setIsPending(true);
    try {
      const session = await sessionManager.getSession();
      const newUser = session?.user || null;
      setUser(newUser);
      setGlobalUser(newUser);
    } catch (err) {
      setError(err as Error);
    }
    setIsPending(false);
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    const user = await sessionManager.signIn(email, password);
    setUser(user);
    setGlobalUser(user);
    return user;
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      const user = await sessionManager.signUp(email, password, name);
      setUser(user);
      setGlobalUser(user);
      return user;
    },
    []
  );

  const signOut = useCallback(async () => {
    await sessionManager.signOut();
    setUser(null);
    setGlobalUser(null);
  }, []);

  return {
    user,
    isPending,
    error,
    signIn,
    signUp,
    signOut,
    refetch: loadSession,
  };
}
