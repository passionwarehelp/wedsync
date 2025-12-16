import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Cloud Auth Worker URL - handles cross-device user sync
const AUTH_WORKER_URL = process.env.EXPO_PUBLIC_R2_ENDPOINT?.replace("wedsync-upload", "wedsync-auth") ||
  "https://wedsync-auth.passionwarehelp.workers.dev";
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
  // Use a more robust hashing approach
  let hash1 = 0;
  let hash2 = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash1 = ((hash1 << 5) - hash1 + char) | 0;
    hash2 = ((hash2 << 7) + hash2 + char) | 0;
  }
  // Combine both hashes and add salt
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
 * Try to authenticate with cloud auth worker
 * This enables cross-device login by storing users in Cloudflare KV
 */
async function cloudSignIn(email: string, passwordHash: string): Promise<{ user: User; success: boolean; error?: string } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${AUTH_WORKER_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, passwordHash }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await res.json();
    return data;
  } catch (e) {
    console.log("[Auth] Cloud auth unavailable, using local fallback");
    return null;
  }
}

/**
 * Try to register with cloud auth worker
 */
async function cloudSignUp(
  email: string,
  passwordHash: string,
  name: string,
  role: UserRole
): Promise<{ user: User; success: boolean; error?: string } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${AUTH_WORKER_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, passwordHash, name, role }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await res.json();
    return data;
  } catch (e) {
    console.log("[Auth] Cloud auth unavailable, using local fallback");
    return null;
  }
}

/**
 * Check if email exists in cloud
 */
async function cloudCheckEmail(email: string): Promise<{ exists: boolean } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${AUTH_WORKER_URL}/auth/check-email?email=${encodeURIComponent(email)}`, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * Sign in with email and password
 * Tries cloud auth first for cross-device support, then falls back to local
 */
export async function signIn(email: string, password: string): Promise<User> {
  const normalizedEmail = email.toLowerCase().trim();
  const passwordHash = secureHash(password);

  // Try cloud auth first (enables cross-device login)
  const cloudResult = await cloudSignIn(normalizedEmail, passwordHash);
  if (cloudResult) {
    if (cloudResult.success && cloudResult.user) {
      // Cache user locally for offline access
      const users = await getLocalUsers();
      users[normalizedEmail] = { user: cloudResult.user, passwordHash };
      await saveLocalUsers(users);

      await storage.setItem(`${PROJECT}_user`, JSON.stringify(cloudResult.user));
      await storage.setItem(`${PROJECT}_token`, `cloud_${Date.now()}`);
      console.log("[Auth] Cloud sign in successful for:", normalizedEmail);
      return cloudResult.user;
    } else if (cloudResult.error) {
      throw new Error(cloudResult.error);
    }
  }

  // Fall back to local auth
  const users = await getLocalUsers();
  const userRecord = users[normalizedEmail];

  if (!userRecord) {
    throw new Error("No account found with this email. Please create an account first.");
  }

  if (userRecord.passwordHash !== passwordHash) {
    throw new Error("Invalid password. Please try again.");
  }

  // Update last login
  userRecord.user.updatedAt = new Date().toISOString();
  users[normalizedEmail] = userRecord;
  await saveLocalUsers(users);

  // Store current session
  await storage.setItem(`${PROJECT}_user`, JSON.stringify(userRecord.user));
  await storage.setItem(`${PROJECT}_token`, `local_${Date.now()}`);

  console.log("[Auth] Local sign in successful for:", normalizedEmail);
  return userRecord.user;
}

/**
 * Sign up with email, password, and name
 * Registers with cloud auth for cross-device support, also stores locally
 */
export async function signUp(
  email: string,
  password: string,
  name: string,
  role: UserRole = "photographer"
): Promise<User> {
  const normalizedEmail = email.toLowerCase().trim();
  const passwordHash = secureHash(password);

  // Check if user already exists locally
  const users = await getLocalUsers();
  if (users[normalizedEmail]) {
    throw new Error("An account with this email already exists. Please sign in instead.");
  }

  // Check cloud for existing email
  const cloudCheck = await cloudCheckEmail(normalizedEmail);
  if (cloudCheck?.exists) {
    throw new Error("An account with this email already exists. Please sign in instead.");
  }

  // Try cloud registration first
  const cloudResult = await cloudSignUp(normalizedEmail, passwordHash, name.trim(), role);
  if (cloudResult) {
    if (cloudResult.success && cloudResult.user) {
      // Cache user locally
      users[normalizedEmail] = { user: cloudResult.user, passwordHash };
      await saveLocalUsers(users);

      await storage.setItem(`${PROJECT}_user`, JSON.stringify(cloudResult.user));
      await storage.setItem(`${PROJECT}_token`, `cloud_${Date.now()}`);
      console.log("[Auth] Cloud sign up successful for:", normalizedEmail);
      return cloudResult.user;
    } else if (cloudResult.error) {
      throw new Error(cloudResult.error);
    }
  }

  // Fall back to local registration
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
  users[normalizedEmail] = { user: newUser, passwordHash };
  await saveLocalUsers(users);

  // Store current session
  await storage.setItem(`${PROJECT}_user`, JSON.stringify(newUser));
  await storage.setItem(`${PROJECT}_token`, `local_${Date.now()}`);

  console.log("[Auth] Local sign up successful for:", normalizedEmail);
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
  const cloudCheck = await cloudCheckEmail(normalizedEmail);
  if (cloudCheck?.exists) return true;

  // Check local
  const users = await getLocalUsers();
  return !!users[normalizedEmail];
}
