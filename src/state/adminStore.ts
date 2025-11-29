import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Invoice, StaffMember, StaffAssignment, ClockEntry } from "../types/wedding";

interface AdminStore {
  // Invoices
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;

  // Staff Members
  staffMembers: StaffMember[];
  addStaffMember: (staff: StaffMember) => void;
  updateStaffMember: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaffMember: (id: string) => void;

  // Staff Assignments
  staffAssignments: StaffAssignment[];
  assignStaffToWedding: (assignment: StaffAssignment) => void;
  unassignStaffFromWedding: (assignmentId: string) => void;

  // Clock Entries
  clockEntries: ClockEntry[];
  clockIn: (entry: Omit<ClockEntry, "id">) => void;
  clockOut: (entryId: string, clockOutData: { clockOutTime: string; clockOutLocation?: any; totalHours: number }) => void;
  addClockEntry: (entry: ClockEntry) => void;
  updateClockEntry: (id: string, updates: Partial<ClockEntry>) => void;
  deleteClockEntry: (id: string) => void;
}

const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      // Invoices
      invoices: [],
      addInvoice: (invoice) => set((state) => ({ invoices: [...state.invoices, invoice] })),
      updateInvoice: (id, updates) =>
        set((state) => ({
          invoices: state.invoices.map((i) => (i.id === id ? { ...i, ...updates } : i)),
        })),
      deleteInvoice: (id) => set((state) => ({ invoices: state.invoices.filter((i) => i.id !== id) })),

      // Staff Members
      staffMembers: [],
      addStaffMember: (staff) => set((state) => ({ staffMembers: [...state.staffMembers, staff] })),
      updateStaffMember: (id, updates) =>
        set((state) => ({
          staffMembers: state.staffMembers.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
      deleteStaffMember: (id) => set((state) => ({ staffMembers: state.staffMembers.filter((s) => s.id !== id) })),

      // Staff Assignments
      staffAssignments: [],
      assignStaffToWedding: (assignment) =>
        set((state) => ({ staffAssignments: [...state.staffAssignments, assignment] })),
      unassignStaffFromWedding: (assignmentId) =>
        set((state) => ({ staffAssignments: state.staffAssignments.filter((a) => a.id !== assignmentId) })),

      // Clock Entries
      clockEntries: [],
      clockIn: (entry) => {
        const newEntry: ClockEntry = {
          ...entry,
          id: Date.now().toString(),
        };
        set((state) => ({ clockEntries: [...state.clockEntries, newEntry] }));
      },
      clockOut: (entryId, clockOutData) =>
        set((state) => ({
          clockEntries: state.clockEntries.map((e) => (e.id === entryId ? { ...e, ...clockOutData } : e)),
        })),
      addClockEntry: (entry) => set((state) => ({ clockEntries: [...state.clockEntries, entry] })),
      updateClockEntry: (id, updates) =>
        set((state) => ({
          clockEntries: state.clockEntries.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),
      deleteClockEntry: (id) => set((state) => ({ clockEntries: state.clockEntries.filter((e) => e.id !== id) })),
    }),
    {
      name: "admin-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAdminStore;
