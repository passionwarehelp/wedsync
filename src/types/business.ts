// Client/Customer
export interface Client {
  id: string;
  name: string;
  businessName?: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Invoice Line Item
export interface InvoiceItem {
  serviceId?: string;
  serviceName: string;
  quantity: number;
  price: number;
  total: number;
}

// Invoice Status
export type InvoiceStatus = "draft" | "sent" | "viewed" | "paid" | "overdue" | "cancelled";

// Payment Method Type
export type PaymentMethodType = "venmo" | "cashapp" | "paypal" | "zelle" | "stripe" | "square" | "other";

// Invoice
export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g., "INV-0001"
  clientId: string;
  clientName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax?: number;
  total: number;
  status: InvoiceStatus;
  dueDate?: string; // ISO date string
  sentDate?: string;
  paidDate?: string;
  notes?: string;
  acceptedPaymentMethods?: PaymentMethodType[]; // Payment methods accepted for this invoice
  createdAt: string;
  updatedAt: string;
}

// Service Package (for quick invoice creation)
export interface Service {
  id: string;
  name: string;
  description?: string;
  defaultPrice: number;
  duration?: number;
  stripePaymentLink?: string;
  createdAt: string;
}

// Business Settings
export interface BusinessSettings {
  businessName: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  logoUri?: string;
  invoicePrefix?: string; // e.g., "INV"
  defaultHourlyRate?: number;
  taxRate?: number;
  paymentMethods?: {
    stripe?: string; // Stripe payment link
    square?: string; // Square payment link
    venmo?: string; // @username
    venmoLink?: string; // https://venmo.com/u/username
    cashapp?: string; // $username
    cashappLink?: string; // https://cash.app/$username
    paypal?: string; // email
    paypalLink?: string; // https://paypal.me/username
    zelle?: string; // email or phone
    other?: string; // custom instructions
  };
}
