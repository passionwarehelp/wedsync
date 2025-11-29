import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Wedding, Guest, Task, TimelineEvent, Vendor, Photo, SeatingTable } from "../types/wedding";

interface WeddingStore {
  // Current user role
  userRole: "pro" | "client";
  setUserRole: (role: "pro" | "client") => void;

  // Current wedding (for client view or pro editing)
  currentWeddingId: string | null;
  setCurrentWedding: (weddingId: string | null) => void;

  // Weddings
  weddings: Wedding[];
  addWedding: (wedding: Wedding) => void;
  updateWedding: (id: string, updates: Partial<Wedding>) => void;
  deleteWedding: (id: string) => void;
  getWedding: (id: string) => Wedding | undefined;

  // Guests
  guests: Guest[];
  addGuest: (guest: Guest) => void;
  updateGuest: (id: string, updates: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  getGuestsForWedding: (weddingId: string) => Guest[];

  // Tasks
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksForWedding: (weddingId: string) => Task[];

  // Timeline
  timelineEvents: TimelineEvent[];
  addTimelineEvent: (event: TimelineEvent) => void;
  updateTimelineEvent: (id: string, updates: Partial<TimelineEvent>) => void;
  deleteTimelineEvent: (id: string) => void;
  getTimelineForWedding: (weddingId: string) => TimelineEvent[];

  // Vendors
  vendors: Vendor[];
  addVendor: (vendor: Vendor) => void;
  updateVendor: (id: string, updates: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
  getVendorsForWedding: (weddingId: string) => Vendor[];

  // Seating
  seatingTables: SeatingTable[];
  addSeatingTable: (table: SeatingTable) => void;
  updateSeatingTable: (id: string, updates: Partial<SeatingTable>) => void;
  deleteSeatingTable: (id: string) => void;
  getSeatingForWedding: (weddingId: string) => SeatingTable[];
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

      // Weddings
      weddings: [],
      addWedding: (wedding) => set((state) => ({ weddings: [...state.weddings, wedding] })),
      updateWedding: (id, updates) =>
        set((state) => ({
          weddings: state.weddings.map((w) => (w.id === id ? { ...w, ...updates } : w)),
        })),
      deleteWedding: (id) => set((state) => ({ weddings: state.weddings.filter((w) => w.id !== id) })),
      getWedding: (id) => get().weddings.find((w) => w.id === id),

      // Guests
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
    }),
    {
      name: "wedding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useWeddingStore;
