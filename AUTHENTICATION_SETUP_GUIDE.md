# Professional Authentication Setup Guide
## Better Auth + Hono Backend + Expo Frontend

This guide will walk you through setting up professional authentication that works across phone, tablet, and web.

---

## Overview

**What we're building:**
- Backend API server (Hono + Bun) with Better Auth
- PostgreSQL database (Supabase) for user data
- Frontend authentication (Expo + React Native) with secure token storage
- Cross-platform login (iOS, Android, Web)

**Tech Stack:**
- **Backend:** Bun + Hono + Better Auth + Prisma
- **Database:** PostgreSQL (Supabase)
- **Frontend:** Expo SDK 53 + React Native
- **Token Storage:** expo-secure-store
- **Hosting:** Render.com

---

## Step 1: Set Up Supabase Database (10 minutes)

### 1.1 Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Choose organization or create new one
4. Fill in:
   - **Project Name:** `wedsync-prod`
   - **Database Password:** (Save this! You'll need it)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free tier works fine to start
5. Click "Create new project" (takes 2-3 minutes)

### 1.2 Get Database Connection String
1. Once project is ready, go to **Settings** > **Database**
2. Scroll to **Connection string** section
3. Select **"Transaction pooler"** (NOT Session pooler)
4. Copy the connection string (looks like):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the password you set earlier
6. **Save this connection string** - you'll need it for the backend

---

## Step 2: Set Up Backend Locally (30 minutes)

### 2.1 Create Backend Directory
```bash
# In your project root (outside of /home/user/workspace/)
mkdir wedsync-backend
cd wedsync-backend
```

### 2.2 Initialize Project
```bash
bun init -y
```

### 2.3 Install Dependencies
```bash
bun add hono @hono/node-server better-auth @better-auth/expo prisma @prisma/client zod
bun add -d @types/node typescript
```

### 2.4 Create Directory Structure
```bash
mkdir -p src
npx prisma init
```

### 2.5 Create Environment File
Create `wedsync-backend/.env`:
```env
PORT=3000
DATABASE_URL=postgresql://postgres.xxxxx:PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
BETTER_AUTH_SECRET=your-32-character-minimum-secret-key-here-change-this
BACKEND_URL=http://localhost:3000
```

**IMPORTANT:**
- Replace `DATABASE_URL` with your Supabase connection string from Step 1.2
- Generate a random secret for `BETTER_AUTH_SECRET` (at least 32 characters)

### 2.6 Create Prisma Schema
Create `wedsync-backend/prisma/schema.prisma` (I'll create this file next)

### 2.7 Create Auth Configuration
Create `wedsync-backend/src/auth.ts` (I'll create this file next)

### 2.8 Create Database Client
Create `wedsync-backend/src/db.ts` (I'll create this file next)

### 2.9 Create Main Server
Create `wedsync-backend/src/index.ts` (I'll create this file next)

### 2.10 Test Backend Locally
```bash
# Generate Prisma client
bunx prisma generate

# Push schema to database
bunx prisma db push

# Start the server
bun run src/index.ts
```

You should see:
```
Server is running on port 3000
```

Test it:
```bash
curl http://localhost:3000/health
# Should return: {"status":"ok"}
```

---

## Step 3: Deploy Backend to Render (20 minutes)

### 3.1 Push Code to GitHub
```bash
# In wedsync-backend directory
git init
git add .
git commit -m "Initial backend setup"

# Create new repo on GitHub called "wedsync-backend"
# Then push:
git remote add origin https://github.com/YOUR-USERNAME/wedsync-backend.git
git branch -M main
git push -u origin main
```

### 3.2 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 3.3 Create New Web Service
1. Click "New +" > "Web Service"
2. Connect your `wedsync-backend` repository
3. Configure:
   - **Name:** `wedsync-api`
   - **Region:** Same as your Supabase database
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `bun install && bunx prisma generate`
   - **Start Command:** `bun run src/index.ts`
   - **Instance Type:** Free

### 3.4 Add Environment Variables
In Render dashboard, go to "Environment" tab and add:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Supabase connection string |
| `BETTER_AUTH_SECRET` | Same secret from your .env file |
| `BACKEND_URL` | `https://YOUR-APP-NAME.onrender.com` |

**Note:** You'll get the actual URL after deployment (step 3.5)

### 3.5 Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for build and deployment
3. Once done, you'll see your URL: `https://wedsync-api.onrender.com`
4. Go back to Environment variables and update `BACKEND_URL` with this URL
5. Redeploy (will happen automatically)

### 3.6 Test Deployment
```bash
curl https://wedsync-api.onrender.com/health
# Should return: {"status":"ok"}
```

---

## Step 4: Update Frontend (Already in your Vibecode workspace)

### 4.1 Install Dependencies
```bash
# Already done in your workspace, but if needed:
bun add expo-secure-store
```

### 4.2 Update Environment Variables
I'll update your `.env` file with:
```env
EXPO_PUBLIC_BACKEND_URL=https://YOUR-RENDER-URL.onrender.com
EXPO_PUBLIC_PROJECT_ID=wedsync-prod
```

### 4.3 Create Auth Files
I'll create these files in your workspace:
- `src/lib/sessionManager.ts` - Handles API calls and token storage
- `src/lib/useAuth.tsx` - React hook with global state
- `src/lib/api.ts` - API client with authentication

### 4.4 Update AuthScreen
I'll update `src/screens/AuthScreen.tsx` to use the new auth system

---

## Step 5: Testing the Complete System (10 minutes)

### 5.1 Test Sign Up
1. Open your Expo app
2. Click "Sign Up"
3. Enter email, password, and name
4. Submit
5. You should be automatically logged in

### 5.2 Test Sign In
1. Sign out from settings
2. Click "Sign In"
3. Enter your credentials
4. You should be logged in

### 5.3 Test Persistence
1. Close the app completely
2. Reopen it
3. You should still be logged in

### 5.4 Check Database
1. Go to Supabase dashboard
2. Click "Table Editor"
3. You should see your user in the `user` table

---

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain in Render
1. Go to your Render service
2. Click "Settings" > "Custom Domain"
3. Add your domain (e.g., `api.wedsync.com`)

### 6.2 Update DNS
In your domain registrar (Cloudflare, GoDaddy, etc.):
1. Add CNAME record:
   - **Name:** `api` (or whatever subdomain you chose)
   - **Value:** The value Render provides
   - **TTL:** Auto or 3600

### 6.3 Wait for SSL
Render automatically provisions SSL certificate (takes 5-10 minutes)

### 6.4 Update Environment Variables
Update in both places:
- Render: `BACKEND_URL` = `https://api.wedsync.com`
- Frontend `.env`: `EXPO_PUBLIC_BACKEND_URL` = `https://api.wedsync.com`

---

## Troubleshooting

### Backend won't start
- Check Render logs for errors
- Verify DATABASE_URL is correct
- Ensure BETTER_AUTH_SECRET is at least 32 characters

### Can't connect from frontend
- Check EXPO_PUBLIC_BACKEND_URL is correct
- Make sure backend is deployed and showing "healthy" in Render
- Test backend health endpoint with curl

### Sign up/sign in fails
- Check Render logs for error messages
- Verify database connection (check Supabase)
- Make sure password is at least 8 characters

### Token not persisting
- Check you're using `expo-secure-store` correctly
- iOS: Make sure you're testing on device, not simulator (for production)
- Web: Tokens work differently, may need to configure cookie settings

---

## Next Steps

Once authentication is working:

1. **Add Password Reset:** Better Auth supports email verification
2. **Add Social Login:** Better Auth supports Google, Apple, GitHub, etc.
3. **Add Role-Based Access:** Extend user table with roles
4. **Add Profile Management:** Create API endpoints for user updates
5. **Add Session Management:** View and revoke active sessions

---

## Security Checklist

- [ ] BETTER_AUTH_SECRET is a strong random string (32+ chars)
- [ ] DATABASE_URL is not committed to git
- [ ] Backend URL uses HTTPS in production
- [ ] Environment variables are set in Render (not hardcoded)
- [ ] Supabase database password is strong
- [ ] Row Level Security (RLS) is enabled in Supabase (advanced)

---

## Cost Estimate

- **Supabase Free Tier:**
  - 500MB database
  - 50,000 monthly active users
  - Good for starting out

- **Render Free Tier:**
  - 750 hours/month (one service = 720 hours)
  - Spins down after 15 minutes of inactivity
  - Spins up in ~30 seconds when accessed

- **Render Paid ($7/month):**
  - No spin down
  - Better performance
  - Recommended for production

---

## Support

If you encounter issues:
1. Check the error messages in Render logs
2. Review the Better Auth documentation: https://www.better-auth.com
3. Check Supabase logs if database errors occur
4. Test each component individually (backend health, database connection, frontend API calls)

---

**You're ready to start! Begin with Step 1.**
