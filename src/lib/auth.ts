import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const BACKEND_URL = "https://wedsync-backend.onrender.com";

// Token storage
async function getToken(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  }
  return await SecureStore.getItemAsync(key);
}

async function setToken(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

async function deleteToken(key: string): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

const TOKEN_KEY = "better-auth.session_token";

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

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
): Promise<AuthSession> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const text = await response.text();
    if (!text) throw new Error("Empty response from server");

    // Check if response is HTML (backend not properly configured)
    if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
      throw new Error("Backend authentication service is not available. Please contact support.");
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Backend returned invalid response. Please try again later.");
    }

    if (!response.ok) throw new Error(data.message || data.error || "Sign up failed");

    const token = data.token || data.session?.token;
    if (token) await setToken(TOKEN_KEY, token);

    return { user: data.user, token };
  } catch (error: any) {
    if (error.message?.includes("JSON")) {
      throw new Error("Backend authentication service is not available. Please contact support.");
    }
    throw error;
  }
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthSession> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/sign-in/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const text = await response.text();
    if (!text) throw new Error("Empty response from server");

    // Check if response is HTML (backend not properly configured)
    if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
      throw new Error("Backend authentication service is not available. Please contact support.");
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Backend returned invalid response. Please try again later.");
    }

    if (!response.ok) throw new Error(data.message || data.error || "Sign in failed");

    const token = data.token || data.session?.token;
    if (token) await setToken(TOKEN_KEY, token);

    return { user: data.user, token };
  } catch (error: any) {
    if (error.message?.includes("JSON")) {
      throw new Error("Backend authentication service is not available. Please contact support.");
    }
    throw error;
  }
}

export async function signOutUser(): Promise<void> {
  const token = await getToken(TOKEN_KEY);
  if (token) {
    try {
      await fetch(`${BACKEND_URL}/api/auth/sign-out`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      // Ignore errors
    }
  }
  await deleteToken(TOKEN_KEY);
}

export async function getStoredSession(): Promise<AuthSession | null> {
  const token = await getToken(TOKEN_KEY);
  if (!token) return null;
  return validateSession();
}

export async function validateSession(): Promise<AuthSession | null> {
  const token = await getToken(TOKEN_KEY);
  if (!token) return null;

  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      await deleteToken(TOKEN_KEY);
      return null;
    }

    const data = await response.json();
    if (data.user) {
      return { user: data.user, token };
    }
    return null;
  } catch (e) {
    return null;
  }
}
