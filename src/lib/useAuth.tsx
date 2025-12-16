import { useState, useEffect, useCallback } from "react";
import * as sessionManager from "./sessionManager";
import type { User, UserRole } from "./sessionManager";
import useAuthStore from "../state/authStore";

// Global state shared across all hook instances
let globalUser: User | null = null;
let globalListeners: Set<(user: User | null) => void> = new Set();

function setGlobalUser(user: User | null) {
  globalUser = user;
  globalListeners.forEach((listener) => listener(user));

  // Sync with authStore for navigation
  if (user) {
    useAuthStore.setState({
      isAuthenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: (user.role as "photographer" | "couple") || "photographer",
        createdAt: user.createdAt,
      },
    });
  } else {
    useAuthStore.setState({
      isAuthenticated: false,
      user: null,
    });
  }
}

/**
 * Auth hook with global state
 * All instances of useAuth share the same user state
 * Syncs with authStore for navigation
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
    setError(null);
    setIsPending(true);
    try {
      const user = await sessionManager.signIn(email, password);
      setUser(user);
      setGlobalUser(user);
      setIsPending(false);
      return user;
    } catch (err) {
      setError(err as Error);
      setIsPending(false);
      throw err;
    }
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name: string, role: UserRole = "photographer") => {
      setError(null);
      setIsPending(true);
      try {
        const user = await sessionManager.signUp(email, password, name, role);
        setUser(user);
        setGlobalUser(user);
        setIsPending(false);
        return user;
      } catch (err) {
        setError(err as Error);
        setIsPending(false);
        throw err;
      }
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
