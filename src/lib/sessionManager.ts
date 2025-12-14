import * as SecureStore from "expo-secure-store";

// IMPORTANT: Replace with your deployed backend URL after deploying to Render
const BACKEND = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000";
const PROJECT = process.env.EXPO_PUBLIC_PROJECT_ID || "wedsync";

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
    await SecureStore.setItemAsync(`${PROJECT}_token`, data.token);
  }
  await SecureStore.setItemAsync(`${PROJECT}_user`, JSON.stringify(data.user));

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
    await SecureStore.setItemAsync(`${PROJECT}_token`, data.token);
  }
  await SecureStore.setItemAsync(`${PROJECT}_user`, JSON.stringify(data.user));

  return data.user;
}

/**
 * Get current session from secure storage
 */
export async function getSession(): Promise<Session | null> {
  const token = await SecureStore.getItemAsync(`${PROJECT}_token`);
  const userStr = await SecureStore.getItemAsync(`${PROJECT}_user`);

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
  await SecureStore.deleteItemAsync(`${PROJECT}_token`);
  await SecureStore.deleteItemAsync(`${PROJECT}_user`);
}
