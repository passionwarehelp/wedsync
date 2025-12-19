import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOutUser } from "../lib/auth";

export type UserRole = "photographer" | "couple";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  coupleWeddingId?: string; // For couples - the wedding they're linked to
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;

  // Actions
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,

      signUp: async (email, password, name, role) => {
        // In a real app, this would call an API
        // For now, we simulate account creation
        const newUser: User = {
          id: Date.now().toString(),
          email: email.toLowerCase().trim(),
          name: name.trim(),
          role,
          createdAt: new Date().toISOString(),
        };

        set({
          isAuthenticated: true,
          user: newUser,
        });
      },

      signIn: async (email, password) => {
        // In a real app, this would validate against an API
        // For now, we simulate a successful login
        const existingUser = get().user;

        if (existingUser && existingUser.email === email.toLowerCase().trim()) {
          set({ isAuthenticated: true });
        } else {
          // Create a temporary user for demo purposes
          const tempUser: User = {
            id: Date.now().toString(),
            email: email.toLowerCase().trim(),
            name: email.split("@")[0],
            role: "photographer",
            createdAt: new Date().toISOString(),
          };
          set({
            isAuthenticated: true,
            user: tempUser,
          });
        }
      },

      signOut: async () => {
        // Sign out from backend
        await signOutUser();

        // Clear weddings store (import dynamically to avoid circular deps)
        const { default: useWeddingStore } = await import("./weddingStore");
        useWeddingStore.getState().clearWeddings();

        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      skipHydration: false,
      onRehydrateStorage: () => (state) => {
        console.log("[AuthStore] Hydration finished - isAuthenticated:", state?.isAuthenticated, "user:", state?.user?.id, "role:", state?.user?.role, "email:", state?.user?.email);
      },
    }
  )
);

export default useAuthStore;
