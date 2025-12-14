import { fetch as expoFetch } from "expo/fetch";
import * as SecureStore from "expo-secure-store";

const PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID || "wedsync";
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000";

/**
 * Authenticated API client
 * Automatically includes auth token in requests
 */
const fetchFn = async <T,>(
  path: string,
  options: { method: string; body?: object }
): Promise<T> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Get token from secure storage and send as Cookie header
  const token = await SecureStore.getItemAsync(`${PROJECT_ID}_token`);
  if (token) {
    // Better Auth expects token in cookie format
    headers["Cookie"] = `__Secure-better-auth.session_token=${token}`;
  }

  const response = await expoFetch(`${BACKEND_URL}${path}`, {
    method: options.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "omit", // Don't send cookies automatically (we handle manually)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
};

/**
 * API client with authentication
 *
 * Usage:
 * ```ts
 * const data = await api.get('/api/me');
 * const result = await api.post('/api/weddings', { name: 'My Wedding' });
 * ```
 */
export const api = {
  get: <T,>(path: string) => fetchFn<T>(path, { method: "GET" }),
  post: <T,>(path: string, body?: object) =>
    fetchFn<T>(path, { method: "POST", body }),
  put: <T,>(path: string, body?: object) =>
    fetchFn<T>(path, { method: "PUT", body }),
  delete: <T,>(path: string) => fetchFn<T>(path, { method: "DELETE" }),
};
