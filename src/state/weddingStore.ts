import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Wedding, Guest, Task, TimelineEvent, Vendor, Photo, SeatingTable } from "../types/wedding";
import * as weddingApi from "../api/wedding-api";

interface WeddingStore {
  // Current user role
  userRole: "pro" | "client";
  setUserRole: (role: "pro" | "client") => void;

  // Current wedding (for client view or pro editing)
  currentWeddingId: string | null;
  setCurrentWedding: (weddingId: string | null) => void;

  // Weddings - synced with backend
  weddings: Wedding[];
  isLoadingWeddings: boolean;
  weddingsError: string | null;
  fetchWeddings: () => Promise<void>;
  addWedding: (wedding: Omit<Wedding, "id" | "createdAt" | "createdBy">) => Promise<Wedding | null>;
  updateWedding: (id: string, updates: Partial<Wedding>) => Promise<void>;
  deleteWedding: (id: string) => Promise<void>;
  getWedding: (id: string) => Wedding | undefined;
  clearWeddings: () => void;

  // Guests - local storage (will sync later)
  guests: Guest[];
  addGuest: (guest: Guest) => void;
  updateGuest: (id: string, updates: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  getGuestsForWedding: (weddingId: string) => Guest[];

  // Tasks - local storage (will sync later)
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksForWedding: (weddingId: string) => Task[];

  // Timeline - local storage
  timelineEvents: TimelineEvent[];
  addTimelineEvent: (event: TimelineEvent) => void;
  updateTimelineEvent: (id: string, updates: Partial<TimelineEvent>) => void;
  deleteTimelineEvent: (id: string) => void;
  getTimelineForWedding: (weddingId: string) => TimelineEvent[];

  // Vendors - local storage
  vendors: Vendor[];
  addVendor: (vendor: Vendor) => void;
  updateVendor: (id: string, updates: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
  getVendorsForWedding: (weddingId: string) => Vendor[];

  // Seating - local storage
  seatingTables: SeatingTable[];
  addSeatingTable: (table: SeatingTable) => void;
  updateSeatingTable: (id: string, updates: Partial<SeatingTable>) => void;
  deleteSeatingTable: (id: string) => void;
  getSeatingForWedding: (weddingId: string) => SeatingTable[];

  // Photos - local storage
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
  deletePhoto: (id: string) => void;
  getPhotosForWedding: (weddingId: string) => Photo[];
}

const useWeddingStore = create<WeddingStore>()(
  persist(
    (set, get) => ({
      // User role
      userRole: "pro",
      setUserRole: (role) => set({ userRole: role }),

      // Current wedding
      currentWeddingId: null,
      setCurrentWedding: (weddingId) => set({ currentWeddingId: weddingId }),

      // Weddings - synced with backend
      weddings: [],
      isLoadingWeddings: false,
      weddingsError: null,

      fetchWeddings: async () => {
        set({ isLoadingWeddings: true, weddingsError: null });
        try {
          const weddings = await weddingApi.fetchWeddings();
          set({ weddings, isLoadingWeddings: false });
        } catch (error: any) {
          console.error("[WeddingStore] Error fetching weddings:", error);
          set({ weddingsError: error.message, isLoadingWeddings: false });
        }
      },

      addWedding: async (weddingData) => {
        try {
          const newWedding = await weddingApi.createWedding(weddingData);
          if (newWedding) {
            set((state) => ({ weddings: [newWedding, ...state.weddings] }));
            return newWedding;
          }
          return null;
        } catch (error: any) {
          console.error("[WeddingStore] Error adding wedding:", error);
          throw error;
        }
      },

      updateWedding: async (id, updates) => {
        try {
          const updatedWedding = await weddingApi.updateWedding(id, updates);
          if (updatedWedding) {
            set((state) => ({
              weddings: state.weddings.map((w) => (w.id === id ? updatedWedding : w)),
            }));
          }
        } catch (error: any) {
          console.error("[WeddingStore] Error updating wedding:", error);
          throw error;
        }
      },

      deleteWedding: async (id) => {
        try {
          const success = await weddingApi.deleteWedding(id);
          if (success) {
            set((state) => ({
              weddings: state.weddings.filter((w) => w.id !== id),
              // Also clear current wedding if it was deleted
              currentWeddingId: state.currentWeddingId === id ? null : state.currentWeddingId,
            }));
          }
        } catch (error: any) {
          console.error("[WeddingStore] Error deleting wedding:", error);
          throw error;
        }
      },

      getWedding: (id) => get().weddings.find((w) => w.id === id),

      clearWeddings: () => set({ weddings: [], currentWeddingId: null }),

      // Guests - still local (for now)
      guests: [],
      addGuest: (guest) => set((state) => ({ guests: [...state.guests, guest] })),
      updateGuest: (id, updates) =>
        set((state) => ({
          guests: state.guests.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        })),
      deleteGuest: (id) => set((state) => ({ guests: state.guests.filter((g) => g.id !== id) })),
      getGuestsForWedding: (weddingId) => get().guests.filter((g) => g.weddingId === weddingId),

      // Tasks
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      getTasksForWedding: (weddingId) => get().tasks.filter((t) => t.weddingId === weddingId),

      // Timeline
      timelineEvents: [],
      addTimelineEvent: (event) => set((state) => ({ timelineEvents: [...state.timelineEvents, event] })),
      updateTimelineEvent: (id, updates) =>
        set((state) => ({
          timelineEvents: state.timelineEvents.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),
      deleteTimelineEvent: (id) => set((state) => ({ timelineEvents: state.timelineEvents.filter((e) => e.id !== id) })),
      getTimelineForWedding: (weddingId) => get().timelineEvents.filter((e) => e.weddingId === weddingId),

      // Vendors
      vendors: [],
      addVendor: (vendor) => set((state) => ({ vendors: [...state.vendors, vendor] })),
      updateVendor: (id, updates) =>
        set((state) => ({
          vendors: state.vendors.map((v) => (v.id === id ? { ...v, ...updates } : v)),
        })),
      deleteVendor: (id) => set((state) => ({ vendors: state.vendors.filter((v) => v.id !== id) })),
      getVendorsForWedding: (weddingId) => get().vendors.filter((v) => v.weddingId === weddingId),

      // Seating
      seatingTables: [],
      addSeatingTable: (table) => set((state) => ({ seatingTables: [...state.seatingTables, table] })),
      updateSeatingTable: (id, updates) =>
        set((state) => ({
          seatingTables: state.seatingTables.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteSeatingTable: (id) => set((state) => ({ seatingTables: state.seatingTables.filter((t) => t.id !== id) })),
      getSeatingForWedding: (weddingId) => get().seatingTables.filter((t) => t.weddingId === weddingId),

      // Photos
      photos: [],
      addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
      deletePhoto: (id) => set((state) => ({ photos: state.photos.filter((p) => p.id !== id) })),
      getPhotosForWedding: (weddingId) => get().photos.filter((p) => p.weddingId === weddingId),
    }),
    {
      name: "wedding-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Don't persist weddings - they come from the server
      partialize: (state) => ({
        userRole: state.userRole,
        currentWeddingId: state.currentWeddingId,
        // Keep local data for guests, tasks, etc.
        guests: state.guests,
        tasks: state.tasks,
        timelineEvents: state.timelineEvents,
        vendors: state.vendors,
        seatingTables: state.seatingTables,
        photos: state.photos,
      }),
    }
  )
);

export default useWeddingStore;
