import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMPORTANT: Replace with your deployed backend URL after deploying to Render
const BACKEND = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000";
const PROJECT = process.env.EXPO_PUBLIC_PROJECT_ID || "wedsync";

// Platform-aware storage helper
const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return AsyncStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

export type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Session = {
  user: User;
  session: { token: string; expiresAt: string };
};

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<User> {
  const res = await fetch(`${BACKEND}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Sign in failed");
  if (!data.user) throw new Error("Invalid response from server");

  // CRITICAL: iOS blocks Set-Cookie header - use token from response body
  if (data.token) {
    await storage.setItem(`${PROJECT}_token`, data.token);
  }
  await storage.setItem(`${PROJECT}_user`, JSON.stringify(data.user));

  return data.user;
}

/**
 * Sign up with email, password, and name
 */
export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const res = await fetch(`${BACKEND}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Sign up failed");
  if (!data.user) throw new Error("Invalid response from server");

  // Store token and user data
  if (data.token) {
    await storage.setItem(`${PROJECT}_token`, data.token);
  }
  await storage.setItem(`${PROJECT}_user`, JSON.stringify(data.user));

  return data.user;
}

/**
 * Get current session from secure storage
 */
export async function getSession(): Promise<Session | null> {
  const token = await storage.getItem(`${PROJECT}_token`);
  const userStr = await storage.getItem(`${PROJECT}_user`);

  if (!token || !userStr) return null;

  return {
    user: JSON.parse(userStr),
    session: {
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  };
}

/**
 * Sign out - clear all stored data
 */
export async function signOut(): Promise<void> {
  await storage.removeItem(`${PROJECT}_token`);
  await storage.removeItem(`${PROJECT}_user`);
}
