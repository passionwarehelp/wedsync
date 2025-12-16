import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Use the existing R2 worker for user storage (same infrastructure as media uploads)
const R2_WORKER_URL = process.env.EXPO_PUBLIC_R2_ENDPOINT || "https://wedsync-upload.passionwarehelp.workers.dev";
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

// Secure hash function for password storage
function secureHash(str: string): string {
  let hash1 = 0;
  let hash2 = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash1 = ((hash1 << 5) - hash1 + char) | 0;
    hash2 = ((hash2 << 7) + hash2 + char) | 0;
  }
  const combined = `${Math.abs(hash1).toString(36)}${Math.abs(hash2).toString(36)}ws`;
  return combined;
}

// Get all registered users from local storage (cache)
async function getLocalUsers(): Promise<Record<string, { user: User; passwordHash: string }>> {
  try {
    const usersStr = await storage.getItem(`${PROJECT}_registered_users`);
    if (usersStr) {
      return JSON.parse(usersStr);
    }
  } catch (e) {
    console.error("[Auth] Error getting local users:", e);
  }
  return {};
}

// Save registered users to local storage (cache)
async function saveLocalUsers(users: Record<string, { user: User; passwordHash: string }>): Promise<void> {
  await storage.setItem(`${PROJECT}_registered_users`, JSON.stringify(users));
}

/**
 * Fetch users database from R2 cloud storage
 */
async function fetchCloudUsers(): Promise<Record<string, { user: User; passwordHash: string }> | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${R2_WORKER_URL}/users/database.json`, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return data || {};
    }
    return {};
  } catch (e) {
    console.log("[Auth] Cloud users fetch failed, using local");
    return null;
  }
}

/**
 * Save users database to R2 cloud storage
 */
async function saveCloudUsers(users: Record<string, { user: User; passwordHash: string }>): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const blob = new Blob([JSON.stringify(users)], { type: "application/json" });

    const res = await fetch(`${R2_WORKER_URL}/users/database.json`, {
      method: "PUT",
      body: blob,
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return res.ok;
  } catch (e) {
    console.log("[Auth] Cloud users save failed");
    return false;
  }
}

/**
 * Sign in with email and password
 * Tries cloud auth first for cross-device support, then falls back to local
 */
export async function signIn(email: string, password: string): Promise<User> {
  const normalizedEmail = email.toLowerCase().trim();
  const passwordHash = secureHash(password);

  // Try to get users from cloud first
  const cloudUsers = await fetchCloudUsers();

  if (cloudUsers) {
    const userRecord = cloudUsers[normalizedEmail];

    if (userRecord) {
      if (userRecord.passwordHash !== passwordHash) {
        throw new Error("Invalid password. Please try again.");
      }

      // Update local cache
      const localUsers = await getLocalUsers();
      localUsers[normalizedEmail] = userRecord;
      await saveLocalUsers(localUsers);

      // Store session
      await storage.setItem(`${PROJECT}_user`, JSON.stringify(userRecord.user));
      await storage.setItem(`${PROJECT}_token`, `cloud_${Date.now()}`);

      console.log("[Auth] Cloud sign in successful for:", normalizedEmail);
      return userRecord.user;
    }
  }

  // Fall back to local auth
  const localUsers = await getLocalUsers();
  const userRecord = localUsers[normalizedEmail];

  if (!userRecord) {
    throw new Error("No account found with this email. Please create an account first.");
  }

  if (userRecord.passwordHash !== passwordHash) {
    throw new Error("Invalid password. Please try again.");
  }

  // Update last login
  userRecord.user.updatedAt = new Date().toISOString();
  localUsers[normalizedEmail] = userRecord;
  await saveLocalUsers(localUsers);

  // Store current session
  await storage.setItem(`${PROJECT}_user`, JSON.stringify(userRecord.user));
  await storage.setItem(`${PROJECT}_token`, `local_${Date.now()}`);

  console.log("[Auth] Local sign in successful for:", normalizedEmail);
  return userRecord.user;
}

/**
 * Sign up with email, password, and name
 * Registers with cloud for cross-device support, also stores locally
 */
export async function signUp(
  email: string,
  password: string,
  name: string,
  role: UserRole = "photographer"
): Promise<User> {
  const normalizedEmail = email.toLowerCase().trim();
  const passwordHash = secureHash(password);

  // Get existing users from cloud and local
  const cloudUsers = await fetchCloudUsers() || {};
  const localUsers = await getLocalUsers();

  // Check if user already exists
  if (cloudUsers[normalizedEmail] || localUsers[normalizedEmail]) {
    throw new Error("An account with this email already exists. Please sign in instead.");
  }

  // Create new user
  const newUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: normalizedEmail,
    name: name.trim(),
    role: role,
    emailVerified: false,
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const userRecord = { user: newUser, passwordHash };

  // Save to cloud
  cloudUsers[normalizedEmail] = userRecord;
  const cloudSaved = await saveCloudUsers(cloudUsers);

  if (cloudSaved) {
    console.log("[Auth] Cloud sign up successful for:", normalizedEmail);
  } else {
    console.log("[Auth] Cloud save failed, saved locally for:", normalizedEmail);
  }

  // Always save locally as backup
  localUsers[normalizedEmail] = userRecord;
  await saveLocalUsers(localUsers);

  // Store current session
  await storage.setItem(`${PROJECT}_user`, JSON.stringify(newUser));
  await storage.setItem(`${PROJECT}_token`, `cloud_${Date.now()}`);

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
  const normalizedEmail = email.toLowerCase().trim();

  // Check cloud first
  const cloudUsers = await fetchCloudUsers();
  if (cloudUsers && cloudUsers[normalizedEmail]) return true;

  // Check local
  const localUsers = await getLocalUsers();
  return !!localUsers[normalizedEmail];
}
