import { useState, useEffect, useCallback } from "react";
import {
  signInWithEmail,
  signUpWithEmail,
  signOutUser,
  getStoredSession,
  validateSession,
  AuthUser,
  AuthSession,
} from "./auth";
import useAuthStore from "../state/authStore";

export type UserRole = "photographer" | "couple";

export interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

// Convert AuthUser to User format
function toUser(authUser: AuthUser, role: UserRole = "photographer"): User {
  return {
    id: authUser.id,
    email: authUser.email,
    name: authUser.name || "",
    role,
    emailVerified: authUser.emailVerified,
    image: authUser.image,
    createdAt: authUser.createdAt,
    updatedAt: authUser.updatedAt,
  };
}

// Global state shared across all hook instances
let globalUser: User | null = null;
let globalListeners: Set<(user: User | null) => void> = new Set();

function setGlobalUser(user: User | null) {
  globalUser = user;
  globalListeners.forEach((listener) => listener(user));

  // Sync with authStore for navigation
  if (user) {
    // Preserve the existing role from authStore if the incoming user doesn't have one
    // This is important because the backend doesn't store user roles
    const existingUser = useAuthStore.getState().user;
    const preservedRole = user.role || existingUser?.role || "couple";

    console.log("[Auth] setGlobalUser - user:", user.email, "existingRole:", existingUser?.role, "newRole:", user.role, "preservedRole:", preservedRole);

    useAuthStore.setState({
      isAuthenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: preservedRole,
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
 * Uses Better Auth backend for cross-device authentication
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
      // First try to get stored session for quick load
      const storedSession = await getStoredSession();
      if (storedSession) {
        const user = toUser(storedSession.user);
        setUser(user);
        setGlobalUser(user);
      }

      // Then validate with backend (if online)
      const validSession = await validateSession();
      if (validSession) {
        const user = toUser(validSession.user);
        setUser(user);
        setGlobalUser(user);
      } else if (!storedSession) {
        // No valid session
        setUser(null);
        setGlobalUser(null);
      }
    } catch (err) {
      console.error("[Auth] Error loading session:", err);
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
      const session = await signInWithEmail(email, password);
      const user = toUser(session.user);
      setUser(user);
      setGlobalUser(user);
      setIsPending(false);
      return user;
    } catch (err: any) {
      setError(err);
      setIsPending(false);
      throw err;
    }
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name: string, role: UserRole = "photographer") => {
      setError(null);
      setIsPending(true);
      try {
        const session = await signUpWithEmail(email, password, name);
        const user = toUser(session.user, role);
        setUser(user);
        setGlobalUser(user);
        setIsPending(false);
        return user;
      } catch (err: any) {
        setError(err);
        setIsPending(false);
        throw err;
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    await signOutUser();
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
