import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Backend URL - Render production
const BACKEND_URL = "https://wedsync-backend.onrender.com";

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
  console.log("[Auth] Signing up with email:", email);

  const response = await fetch(`${BACKEND_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });

  // Get response text first
  const responseText = await response.text();
  console.log("[Auth] Sign up response status:", response.status);
  console.log("[Auth] Sign up response text:", responseText);

  // Handle empty response
  if (!responseText) {
    throw new Error("Server returned empty response. Please try again.");
  }

  // Parse JSON
  let data;
  try {
    data = JSON.parse(responseText);
  } catch (e) {
    console.error("[Auth] Failed to parse response:", responseText);
    throw new Error("Invalid server response. Please try again.");
  }

  if (!response.ok) {
    throw new Error(data.message || data.error || "Sign up failed");
  }

  // Handle response format: { token, user }
  if (data.user && data.token) {
    await tokenStorage.set(TOKEN_KEY, data.token);
    await tokenStorage.set(USER_KEY, JSON.stringify(data.user));
    return { user: data.user, token: data.token };
  }

  // Handle response format: { session: { token }, user }
  if (data.session && data.user) {
    const token = data.session.token || data.session.id;
    await tokenStorage.set(TOKEN_KEY, token);
    await tokenStorage.set(USER_KEY, JSON.stringify(data.user));
    return { user: data.user, token };
  }

  console.error("[Auth] Unexpected response format:", data);
  throw new Error("Invalid response from server");
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthSession> {
  console.log("[Auth] Signing in with email:", email);

  const response = await fetch(`${BACKEND_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // Get response text first
  const responseText = await response.text();
  console.log("[Auth] Sign in response status:", response.status);
  console.log("[Auth] Sign in response text:", responseText);

  // Handle empty response
  if (!responseText) {
    throw new Error("Server returned empty response. Please try again.");
  }

  // Parse JSON
  let data;
  try {
    data = JSON.parse(responseText);
  } catch (e) {
    console.error("[Auth] Failed to parse response:", responseText);
    throw new Error("Invalid server response. Please try again.");
  }

  if (!response.ok) {
    throw new Error(data.message || data.error || "Sign in failed");
  }

  // Handle response format: { token, user }
  if (data.user && data.token) {
    await tokenStorage.set(TOKEN_KEY, data.token);
    await tokenStorage.set(USER_KEY, JSON.stringify(data.user));
    return { user: data.user, token: data.token };
  }

  // Handle response format: { session: { token }, user }
  if (data.session && data.user) {
    const token = data.session.token || data.session.id;
    await tokenStorage.set(TOKEN_KEY, token);
    await tokenStorage.set(USER_KEY, JSON.stringify(data.user));
    return { user: data.user, token };
  }

  console.error("[Auth] Unexpected response format:", data);
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
    });

    if (!response.ok) {
      await tokenStorage.remove(TOKEN_KEY);
      await tokenStorage.remove(USER_KEY);
      return null;
    }

    const responseText = await response.text();
    if (!responseText) {
      return getStoredSession();
    }

    const data = JSON.parse(responseText);
    if (data.user) {
      await tokenStorage.set(USER_KEY, JSON.stringify(data.user));
      return { user: data.user, token };
    }

    return null;
  } catch (e) {
    console.error("[Auth] Error validating session:", e);
    return getStoredSession();
  }
}
