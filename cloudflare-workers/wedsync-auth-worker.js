/**
 * WedSync Authentication Worker
 * Handles cross-device user authentication using Cloudflare KV
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Create a new Cloudflare Worker named "wedsync-auth"
 * 2. Create a KV namespace named "WEDSYNC_USERS"
 * 3. Bind the KV namespace to the worker with binding name "USERS"
 * 4. Deploy this code to the worker
 * 5. Update the AUTH_WORKER_URL in sessionManager.ts if needed
 */

// CORS headers for cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Sign Up endpoint
      if (path === "/auth/signup" && request.method === "POST") {
        const { email, passwordHash, name, role } = await request.json();

        if (!email || !passwordHash || !name) {
          return jsonResponse({ success: false, error: "Missing required fields" }, 400);
        }

        // Check if user already exists
        const existingUser = await env.USERS.get(`user:${email}`);
        if (existingUser) {
          return jsonResponse({ success: false, error: "An account with this email already exists" }, 400);
        }

        // Create new user
        const user = {
          id: `cloud_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          email: email.toLowerCase().trim(),
          name: name.trim(),
          role: role || "photographer",
          emailVerified: false,
          image: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Store user with password hash
        await env.USERS.put(`user:${email}`, JSON.stringify({ user, passwordHash }));

        return jsonResponse({ success: true, user });
      }

      // Sign In endpoint
      if (path === "/auth/signin" && request.method === "POST") {
        const { email, passwordHash } = await request.json();

        if (!email || !passwordHash) {
          return jsonResponse({ success: false, error: "Missing email or password" }, 400);
        }

        // Get user from KV
        const userDataStr = await env.USERS.get(`user:${email}`);
        if (!userDataStr) {
          return jsonResponse({ success: false, error: "No account found with this email" }, 401);
        }

        const userData = JSON.parse(userDataStr);

        // Verify password
        if (userData.passwordHash !== passwordHash) {
          return jsonResponse({ success: false, error: "Invalid password" }, 401);
        }

        // Update last login
        userData.user.updatedAt = new Date().toISOString();
        await env.USERS.put(`user:${email}`, JSON.stringify(userData));

        return jsonResponse({ success: true, user: userData.user });
      }

      // Check Email endpoint
      if (path === "/auth/check-email" && request.method === "GET") {
        const email = url.searchParams.get("email");
        if (!email) {
          return jsonResponse({ exists: false });
        }

        const existingUser = await env.USERS.get(`user:${email.toLowerCase().trim()}`);
        return jsonResponse({ exists: !!existingUser });
      }

      // Health check
      if (path === "/" || path === "/health") {
        return jsonResponse({ status: "ok", service: "wedsync-auth" });
      }

      return jsonResponse({ error: "Not found" }, 404);
    } catch (error) {
      console.error("Auth worker error:", error);
      return jsonResponse({ success: false, error: "Internal server error" }, 500);
    }
  },
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}
