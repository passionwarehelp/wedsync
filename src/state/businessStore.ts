import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Client,
  Invoice,
  Service,
  BusinessSettings,
  InvoiceStatus,
} from "../types/business";

interface BusinessStore {
  clients: Client[];
  invoices: Invoice[];
  services: Service[];
  settings: BusinessSettings;

  // Client actions
  addClient: (client: Omit<Client, "id" | "createdAt" | "updatedAt">) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClient: (id: string) => Client | undefined;

  // Invoice actions
  addInvoice: (invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt" | "invoiceNumber">) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  markInvoicePaid: (id: string) => void;
  getClientInvoices: (clientId: string) => Invoice[];
  getOverdueInvoices: () => Invoice[];

  // Service actions
  addService: (service: Omit<Service, "id" | "createdAt">) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Analytics
  getTotalOwed: () => number;
  getTotalPaid: () => number;
  generateInvoiceNumber: () => string;

  // Settings
  updateSettings: (settings: Partial<BusinessSettings>) => void;
}

const useBusinessStore = create<BusinessStore>()(
  persist(
    (set, get) => ({
      clients: [],
      invoices: [],
      services: [],
      settings: {
        businessName: "My Business",
        invoicePrefix: "INV",
        taxRate: 0,
      },

      // Client actions
      addClient: (client) => {
        const now = new Date().toISOString();
        const newClient: Client = {
          ...client,
          id: Date.now().toString(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ clients: [...state.clients, newClient] }));
      },

      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
          ),
        }));
      },

      deleteClient: (id) => {
        set((state) => ({ clients: state.clients.filter((c) => c.id !== id) }));
      },

      getClient: (id) => {
        return get().clients.find((c) => c.id === id);
      },

      // Invoice actions
      addInvoice: (invoice) => {
        const now = new Date().toISOString();
        const invoiceNumber = get().generateInvoiceNumber();
        const newInvoice: Invoice = {
          ...invoice,
          id: Date.now().toString(),
          invoiceNumber,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ invoices: [...state.invoices, newInvoice] }));
      },

      updateInvoice: (id, updates) => {
        set((state) => ({
          invoices: state.invoices.map((i) =>
            i.id === id ? { ...i, ...updates, updatedAt: new Date().toISOString() } : i
          ),
        }));
      },

      deleteInvoice: (id) => {
        set((state) => ({ invoices: state.invoices.filter((i) => i.id !== id) }));
      },

      markInvoicePaid: (id) => {
        const now = new Date().toISOString();
        set((state) => ({
          invoices: state.invoices.map((i) =>
            i.id === id
              ? { ...i, status: "paid" as InvoiceStatus, paidDate: now, updatedAt: now }
              : i
          ),
        }));
      },

      getClientInvoices: (clientId) => {
        return get().invoices.filter((i) => i.clientId === clientId);
      },

      getOverdueInvoices: () => {
        const now = new Date();
        return get().invoices.filter((i) => {
          return (
            i.status !== "paid" &&
            i.status !== "cancelled" &&
            i.dueDate &&
            new Date(i.dueDate) < now
          );
        });
      },

      // Service actions
      addService: (service) => {
        const now = new Date().toISOString();
        const newService: Service = {
          ...service,
          id: Date.now().toString(),
          createdAt: now,
        };
        set((state) => ({ services: [...state.services, newService] }));
      },

      updateService: (id, updates) => {
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        }));
      },

      deleteService: (id) => {
        set((state) => ({ services: state.services.filter((s) => s.id !== id) }));
      },

      // Analytics
      getTotalOwed: () => {
        return get()
          .invoices.filter((i) => i.status !== "paid" && i.status !== "cancelled")
          .reduce((sum, i) => sum + i.total, 0);
      },

      getTotalPaid: () => {
        return get()
          .invoices.filter((i) => i.status === "paid")
          .reduce((sum, i) => sum + i.total, 0);
      },

      generateInvoiceNumber: () => {
        const prefix = get().settings.invoicePrefix || "INV";
        const count = get().invoices.length + 1;
        return `${prefix}-${count.toString().padStart(4, "0")}`;
      },

      // Settings
      updateSettings: (settings) => {
        set((state) => ({
          settings: { ...state.settings, ...settings },
        }));
      },
    }),
    {
      name: "business-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useBusinessStore;
