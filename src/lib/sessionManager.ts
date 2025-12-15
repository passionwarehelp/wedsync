import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Backend URL - can be used when backend is available
const BACKEND = process.env.EXPO_PUBLIC_BACKEND_URL || "https://wedsync-api.onrender.com";
const PROJECT = "wedsync";

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

export type UserRole = "photographer" | "couple";

export type User = {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Session = {
  user: User;
  session: { token: string; expiresAt: string };
};

// Simple hash function for password storage
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Get all registered users from local storage
async function getRegisteredUsers(): Promise<Record<string, { user: User; passwordHash: string }>> {
  try {
    const usersStr = await storage.getItem(`${PROJECT}_registered_users`);
    if (usersStr) {
      return JSON.parse(usersStr);
    }
  } catch (e) {
    console.error("[Auth] Error getting registered users:", e);
  }
  return {};
}

// Save registered users to local storage
async function saveRegisteredUsers(users: Record<string, { user: User; passwordHash: string }>): Promise<void> {
  await storage.setItem(`${PROJECT}_registered_users`, JSON.stringify(users));
}

/**
 * Try to call the backend API, returns null if it fails
 */
async function tryBackendSignIn(email: string, password: string): Promise<User | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const res = await fetch(`${BACKEND}/api/auth/sign-in/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const data = await res.json();
    if (data.user && data.token) {
      await storage.setItem(`${PROJECT}_token`, data.token);
      return data.user;
    }
    return null;
  } catch (e) {
    console.log("[Auth] Backend unavailable, using local auth");
    return null;
  }
}

/**
 * Try to call the backend API for sign up, returns null if it fails
 */
async function tryBackendSignUp(email: string, password: string, name: string): Promise<User | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const res = await fetch(`${BACKEND}/api/auth/sign-up/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const data = await res.json();
    if (data.user && data.token) {
      await storage.setItem(`${PROJECT}_token`, data.token);
      return data.user;
    }
    return null;
  } catch (e) {
    console.log("[Auth] Backend unavailable, using local auth");
    return null;
  }
}

/**
 * Sign in with email and password
 * Tries backend first, falls back to local storage
 */
export async function signIn(email: string, password: string): Promise<User> {
  const normalizedEmail = email.toLowerCase().trim();

  // Try backend first
  const backendUser = await tryBackendSignIn(normalizedEmail, password);
  if (backendUser) {
    await storage.setItem(`${PROJECT}_user`, JSON.stringify(backendUser));
    return backendUser;
  }

  // Fall back to local auth
  const users = await getRegisteredUsers();
  const userRecord = users[normalizedEmail];

  if (!userRecord) {
    throw new Error("No account found with this email. Please create an account first.");
  }

  const passwordHash = simpleHash(password);
  if (userRecord.passwordHash !== passwordHash) {
    throw new Error("Invalid password. Please try again.");
  }

  // Update last login
  userRecord.user.updatedAt = new Date().toISOString();
  users[normalizedEmail] = userRecord;
  await saveRegisteredUsers(users);

  // Store current session
  await storage.setItem(`${PROJECT}_user`, JSON.stringify(userRecord.user));
  await storage.setItem(`${PROJECT}_token`, `local_${Date.now()}`);

  console.log("[Auth] Sign in successful for:", normalizedEmail);
  return userRecord.user;
}

/**
 * Sign up with email, password, and name
 * Tries backend first, falls back to local storage
 */
export async function signUp(
  email: string,
  password: string,
  name: string,
  role: UserRole = "photographer"
): Promise<User> {
  const normalizedEmail = email.toLowerCase().trim();

  // Check if user already exists locally
  const users = await getRegisteredUsers();
  if (users[normalizedEmail]) {
    throw new Error("An account with this email already exists. Please sign in instead.");
  }

  // Try backend first
  const backendUser = await tryBackendSignUp(normalizedEmail, password, name);
  if (backendUser) {
    // Also store locally for offline access
    const passwordHash = simpleHash(password);
    users[normalizedEmail] = { user: backendUser, passwordHash };
    await saveRegisteredUsers(users);
    await storage.setItem(`${PROJECT}_user`, JSON.stringify(backendUser));
    return backendUser;
  }

  // Create user locally
  const newUser: User = {
    id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: normalizedEmail,
    name: name.trim(),
    role: role,
    emailVerified: false,
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Store user with password hash
  const passwordHash = simpleHash(password);
  users[normalizedEmail] = { user: newUser, passwordHash };
  await saveRegisteredUsers(users);

  // Store current session
  await storage.setItem(`${PROJECT}_user`, JSON.stringify(newUser));
  await storage.setItem(`${PROJECT}_token`, `local_${Date.now()}`);

  console.log("[Auth] Sign up successful for:", normalizedEmail);
  return newUser;
}

/**
 * Get current session from storage
 */
export async function getSession(): Promise<Session | null> {
  try {
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
  } catch (e) {
    console.error("[Auth] Error getting session:", e);
    return null;
  }
}

/**
 * Sign out - clear session data (but keep registered users)
 */
export async function signOut(): Promise<void> {
  await storage.removeItem(`${PROJECT}_token`);
  await storage.removeItem(`${PROJECT}_user`);
  console.log("[Auth] Sign out successful");
}

/**
 * Check if an email is already registered
 */
export async function isEmailRegistered(email: string): Promise<boolean> {
  const users = await getRegisteredUsers();
  return !!users[email.toLowerCase().trim()];
}
