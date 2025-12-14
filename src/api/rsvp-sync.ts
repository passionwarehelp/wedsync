/**
 * RSVP Sync API
 * Fetches RSVPs from Cloudflare Worker and syncs to local store
 */

const RSVP_API_URL = "https://rsvp.mywedsync.com";

export interface CloudflareRSVP {
  attending: boolean;
  name: string;
  email: string;
  phone: string;
  plusOne: boolean;
  plusOneName: string;
  mealType: "standard" | "vegetarian" | "vegan" | "glutenFree" | "other";
  dietaryRestrictions: string;
  message: string;
  rsvpCode: string;
  submittedAt: string;
}

export async function fetchRSVPsFromCloud(rsvpCode: string): Promise<CloudflareRSVP[]> {
  try {
    const response = await fetch(`${RSVP_API_URL}/api/rsvps/${rsvpCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSVPs: ${response.status}`);
    }

    const data = await response.json();
    return data as CloudflareRSVP[];
  } catch (error) {
    console.error("Error fetching RSVPs from cloud:", error);
    throw error;
  }
}
