export type UserRole = "pro" | "client";

export interface Wedding {
  id: string;
  // Wedding Details
  coupleName: string;
  partnerOneName: string;
  partnerTwoName: string;
  weddingDate: string;
  venue: string;

  // Branding
  primaryColor?: string;
  logoUri?: string;

  // Status
  status: "planning" | "upcoming" | "completed";
  createdAt: string;

  // QR Code for guest uploads
  qrCode: string;

  // Stats
  guestCount: number;
  rsvpCount: number;
  tasksCompleted: number;
  totalTasks: number;
}

export interface Guest {
  id: string;
  weddingId: string;

  // Personal Info
  name: string;
  email?: string;
  phone?: string;

  // RSVP
  rsvpStatus: "pending" | "attending" | "declined";
  plusOne: boolean;
  plusOneName?: string;

  // Event Details
  mealType?: "standard" | "vegetarian" | "vegan" | "glutenFree" | "other";
  dietaryRestrictions?: string;

  // Seating
  tableNumber?: number;
  seatPosition?: number;

  // Categories
  category: "family" | "friends" | "bridal-party" | "vip" | "other";

  // Metadata
  addedAt: string;
}

export interface Task {
  id: string;
  weddingId: string;

  title: string;
  description?: string;
  category: "venue" | "catering" | "photography" | "florals" | "attire" | "music" | "decor" | "other";

  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";

  dueDate?: string;
  completedAt?: string;

  assignedTo?: "pro" | "client";

  notes?: string;
  attachments?: string[];
}

export interface TimelineEvent {
  id: string;
  weddingId: string;

  title: string;
  description?: string;

  startTime: string;
  endTime?: string;
  duration?: number; // in minutes

  type: "ceremony" | "cocktails" | "reception" | "photos" | "first-look" | "speeches" | "cake" | "other";

  location?: string;
  notes?: string;
}

export interface Vendor {
  id: string;
  weddingId: string;

  name: string;
  type: "photographer" | "videographer" | "caterer" | "florist" | "dj" | "band" | "venue" | "planner" | "other";

  contactName?: string;
  email?: string;
  phone?: string;

  // Contract & Payment
  contractAmount?: number;
  paidAmount?: number;
  dueDate?: string;
  contractUri?: string;

  status: "pending" | "booked" | "paid" | "completed";

  notes?: string;
}

export interface Photo {
  id: string;
  weddingId: string;

  uri: string;
  uploadedBy: "guest" | "pro" | "client";
  uploadedByName?: string;

  uploadedAt: string;

  isFavorite: boolean;
  isApproved: boolean;

  tags?: string[];
}

export interface SeatingTable {
  id: string;
  weddingId: string;

  tableNumber: number;
  tableName?: string;
  capacity: number;

  // Position on layout (for drag-and-drop)
  x?: number;
  y?: number;

  shape: "round" | "rectangle" | "square";

  guestIds: string[];
}

export interface WeddingInvite {
  id: string;
  weddingId: string;

  recipientEmail: string;
  recipientName: string;
  role: "client" | "vendor";

  status: "sent" | "opened" | "accepted";
  sentAt: string;

  inviteCode: string;
}
