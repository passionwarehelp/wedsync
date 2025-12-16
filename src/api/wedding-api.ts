import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { Wedding } from "../types/wedding";

const BACKEND_URL = "https://wedsync-backend.onrender.com";
const TOKEN_KEY = "better-auth.session_token";

async function getToken(): Promise<string | null> {
  if (Platform.OS === "web") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

async function authFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || error.message || "Request failed");
  }

  return response.json();
}

export interface BackendWedding {
  id: string;
  userId: string;
  coupleName: string;
  partnerOneName: string;
  partnerTwoName: string;
  weddingDate: string;
  venue: string;
  primaryColor: string | null;
  logoUri: string | null;
  status: string;
  qrCode: string;
  qrCodeEnabled: boolean;
  photoAlbumLive: boolean;
  photoFrameEnabled: boolean;
  guestCount: number;
  rsvpCount: number;
  tasksCompleted: number;
  totalTasks: number;
  createdAt: string;
  updatedAt: string;
}

// Convert backend wedding to frontend format
function toFrontendWedding(backend: BackendWedding): Wedding {
  return {
    id: backend.id,
    coupleName: backend.coupleName,
    partnerOneName: backend.partnerOneName,
    partnerTwoName: backend.partnerTwoName,
    weddingDate: backend.weddingDate,
    venue: backend.venue,
    primaryColor: backend.primaryColor || undefined,
    logoUri: backend.logoUri || undefined,
    status: backend.status as Wedding["status"],
    qrCode: backend.qrCode,
    qrCodeEnabled: backend.qrCodeEnabled,
    photoAlbumLive: backend.photoAlbumLive,
    photoFrameEnabled: backend.photoFrameEnabled,
    guestCount: backend.guestCount,
    rsvpCount: backend.rsvpCount,
    tasksCompleted: backend.tasksCompleted,
    totalTasks: backend.totalTasks,
    createdAt: backend.createdAt,
    createdBy: backend.userId,
  };
}

// Convert frontend wedding to backend format
function toBackendWedding(wedding: Partial<Wedding>): Partial<BackendWedding> {
  return {
    coupleName: wedding.coupleName,
    partnerOneName: wedding.partnerOneName,
    partnerTwoName: wedding.partnerTwoName,
    weddingDate: wedding.weddingDate,
    venue: wedding.venue,
    primaryColor: wedding.primaryColor || null,
    logoUri: wedding.logoUri || null,
    status: wedding.status,
    qrCode: wedding.qrCode,
    qrCodeEnabled: wedding.qrCodeEnabled,
    photoAlbumLive: wedding.photoAlbumLive,
    photoFrameEnabled: wedding.photoFrameEnabled,
    guestCount: wedding.guestCount,
    rsvpCount: wedding.rsvpCount,
    tasksCompleted: wedding.tasksCompleted,
    totalTasks: wedding.totalTasks,
  };
}

export async function fetchWeddings(): Promise<Wedding[]> {
  try {
    const data = await authFetch("/api/weddings");
    return (data.weddings || []).map(toFrontendWedding);
  } catch (error) {
    console.error("[WeddingAPI] Error fetching weddings:", error);
    return [];
  }
}

export async function fetchWedding(id: string): Promise<Wedding | null> {
  try {
    const data = await authFetch(`/api/weddings/${id}`);
    return data.wedding ? toFrontendWedding(data.wedding) : null;
  } catch (error) {
    console.error("[WeddingAPI] Error fetching wedding:", error);
    return null;
  }
}

export async function createWedding(wedding: Omit<Wedding, "id" | "createdAt" | "createdBy">): Promise<Wedding | null> {
  try {
    const data = await authFetch("/api/weddings", {
      method: "POST",
      body: JSON.stringify(toBackendWedding(wedding)),
    });
    return data.wedding ? toFrontendWedding(data.wedding) : null;
  } catch (error) {
    console.error("[WeddingAPI] Error creating wedding:", error);
    throw error;
  }
}

export async function updateWedding(id: string, updates: Partial<Wedding>): Promise<Wedding | null> {
  try {
    const data = await authFetch(`/api/weddings/${id}`, {
      method: "PUT",
      body: JSON.stringify(toBackendWedding(updates)),
    });
    return data.wedding ? toFrontendWedding(data.wedding) : null;
  } catch (error) {
    console.error("[WeddingAPI] Error updating wedding:", error);
    throw error;
  }
}

export async function deleteWedding(id: string): Promise<boolean> {
  try {
    await authFetch(`/api/weddings/${id}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error("[WeddingAPI] Error deleting wedding:", error);
    return false;
  }
}
