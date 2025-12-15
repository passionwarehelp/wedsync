# WedSync Web Deployment Guide

This guide shows you how to deploy WedSync to `wedsync.com` (or any custom domain) so users can access it from their computers.

## Quick Start - Vercel (Recommended)

Vercel is the easiest way to deploy and supports custom domains out of the box.

### Step 1: Build the Web Version
```bash
bun run build:web
```

This creates a `dist` folder with all the web files.

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Connect your GitHub repository
5. Vercel auto-detects Expo and builds it
6. Click "Deploy"

### Step 3: Add Custom Domain
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add `wedsync.com`
4. Follow DNS instructions to point your domain to Vercel

**Done!** Users can now access at `https://wedsync.com`

---

## Alternative: Netlify

### Step 1: Build
```bash
bun run build:web
```

### Step 2: Deploy to Netlify

#### Using Netlify CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### Using Netlify Dashboard
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import from Git"
4. Connect GitHub repo
5. Build command: `bun run build:web`
6. Publish directory: `dist`
7. Click "Deploy"

### Step 3: Add Custom Domain
1. Go to Site settings → Domain management
2. Add custom domain `wedsync.com`
3. Follow DNS setup instructions

---

## Alternative: AWS/DigitalOcean/Your Server

### Step 1: Build
```bash
bun run build:web
```

### Step 2: Upload Files
Upload everything in the `dist` folder to your web server.

### Step 3: Configure Server
Make sure your web server:
- Serves `index.html` for all routes (SPA routing)
- Has HTTPS enabled
- Points `wedsync.com` to the server

#### Example Nginx Config
```nginx
server {
    listen 80;
    server_name wedsync.com;
    root /var/www/wedsync/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## What Users See

When users go to `https://wedsync.com`:

1. **On Desktop/Laptop** (screen ≥ 1024px):
   - See `ClientDashboardScreen.web.tsx` with 2-column layout
   - Professional top navigation bar
   - Large, spacious cards
   - Desktop-optimized modals

2. **On Tablet** (screen 768px-1023px):
   - Responsive single-column layout
   - Touch-friendly interface

3. **On Mobile Browser**:
   - Mobile-optimized view (same as app)
   - Can add to home screen (PWA-like)

---

## Authentication

The web version uses the same authentication system as the mobile app:
- Backend API: Uses `EXPO_PUBLIC_BACKEND_URL` from environment
- Secure storage: Uses browser localStorage for web
- Same user accounts work across mobile app and web

---

## Environment Variables

Make sure to set these in your deployment platform:

```bash
EXPO_PUBLIC_BACKEND_URL=https://your-backend.com
EXPO_PUBLIC_R2_ENDPOINT=https://wedsync-upload.passionwarehelp.workers.dev
EXPO_PUBLIC_R2_PUBLIC_URL=https://media.mywedsync.com
EXPO_PUBLIC_R2_BUCKET_NAME=wedsync-media
# Add other API keys as needed
```

---

## Testing Locally

To test the web build locally:

```bash
# Build
bun run build:web

# Serve locally
npx serve dist

# Or start dev server
bun run web
```

Then open `http://localhost:3000` in your browser.

---

## Domain Setup

### If you don't own `wedsync.com` yet:

1. **Buy the domain** from:
   - Namecheap
   - GoDaddy
   - Google Domains
   - Cloudflare Registrar

2. **Point DNS to deployment**:
   - For Vercel: Add A record to Vercel's IP
   - For Netlify: Add A record to Netlify's IP
   - Follow platform-specific instructions

3. **Enable HTTPS**:
   - Both Vercel and Netlify automatically provision SSL certificates
   - Your site will be secure at `https://wedsync.com`

---

## Continuous Deployment

Once set up, any push to your main branch automatically:
1. Triggers a new build
2. Deploys to production
3. Users see updates immediately

---

## Cost

- **Vercel**: Free tier supports custom domains
- **Netlify**: Free tier supports custom domains
- **AWS/DigitalOcean**: $5-10/month for basic server

---

## Support

If you run into issues:
- Check build logs in Vercel/Netlify dashboard
- Ensure all environment variables are set
- Test locally with `bun run web` first
- Check browser console for errors
