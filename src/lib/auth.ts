import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import Constants from "expo-constants";

// Get the backend URL - prefer localhost for local dev, then Render for production
const BACKEND_URL =
  process.env.EXPO_PUBLIC_BACKEND_URL ||
  "https://wedsync-api.onrender.com";

console.log("[Auth] Using backend URL:", BACKEND_URL);

// Token storage helpers
const tokenStorage = {
  async get(key: string): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        return localStorage.getItem(key);
      }
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error("[Auth] Error getting token:", e);
      return null;
    }
  },
  async set(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        localStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (e) {
      console.error("[Auth] Error setting token:", e);
    }
  },
  async remove(key: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        localStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (e) {
      console.error("[Auth] Error removing token:", e);
    }
  },
};

const TOKEN_KEY = "wedsync_auth_token";
const USER_KEY = "wedsync_auth_user";

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
): Promise<AuthSession> {
  const response = await fetch(`${BACKEND_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Sign up failed");
  }

  if (data.user && data.token) {
    await tokenStorage.set(TOKEN_KEY, data.token);
    await tokenStorage.set(USER_KEY, JSON.stringify(data.user));
    return { user: data.user, token: data.token };
  }

  // Better Auth returns session in a different format
  if (data.session && data.user) {
    await tokenStorage.set(TOKEN_KEY, data.session.token);
    await tokenStorage.set(USER_KEY, JSON.stringify(data.user));
    return { user: data.user, token: data.session.token };
  }

  throw new Error("Invalid response from server");
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthSession> {
  const response = await fetch(`${BACKEND_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Sign in failed");
  }

  if (data.user && data.token) {
    await tokenStorage.set(TOKEN_KEY, data.token);
    await tokenStorage.set(USER_KEY, JSON.stringify(data.user));
    return { user: data.user, token: data.token };
  }

  // Better Auth returns session in a different format
  if (data.session && data.user) {
    await tokenStorage.set(TOKEN_KEY, data.session.token);
    await tokenStorage.set(USER_KEY, JSON.stringify(data.user));
    return { user: data.user, token: data.session.token };
  }

  throw new Error("Invalid response from server");
}

/**
 * Sign out
 */
export async function signOutUser(): Promise<void> {
  try {
    const token = await tokenStorage.get(TOKEN_KEY);
    if (token) {
      await fetch(`${BACKEND_URL}/api/auth/sign-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
    }
  } catch (e) {
    console.log("[Auth] Sign out API call failed, clearing local tokens");
  }

  await tokenStorage.remove(TOKEN_KEY);
  await tokenStorage.remove(USER_KEY);
}

/**
 * Get current session from stored token
 */
export async function getStoredSession(): Promise<AuthSession | null> {
  try {
    const token = await tokenStorage.get(TOKEN_KEY);
    const userStr = await tokenStorage.get(USER_KEY);

    if (!token || !userStr) {
      return null;
    }

    const user = JSON.parse(userStr);
    return { user, token };
  } catch (e) {
    console.error("[Auth] Error getting stored session:", e);
    return null;
  }
}

/**
 * Validate session with backend
 */
export async function validateSession(): Promise<AuthSession | null> {
  try {
    const token = await tokenStorage.get(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const response = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      // Session invalid, clear tokens
      await tokenStorage.remove(TOKEN_KEY);
      await tokenStorage.remove(USER_KEY);
      return null;
    }

    const data = await response.json();
    if (data.user) {
      await tokenStorage.set(USER_KEY, JSON.stringify(data.user));
      return { user: data.user, token };
    }

    return null;
  } catch (e) {
    console.error("[Auth] Error validating session:", e);
    // Return stored session if validation fails (offline mode)
    return getStoredSession();
  }
}
