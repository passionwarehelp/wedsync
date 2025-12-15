# Deploy WedSync to wedsync.com - Complete Guide

## Prerequisites
✅ You need to own the domain `wedsync.com` first
✅ If you don't own it yet, buy it from GoDaddy, Cloudflare, or Namecheap (~$10-15/year)

---

## FASTEST WAY: Deploy to Vercel (5 minutes)

### Step 1: Build the App
```bash
cd /home/user/workspace
bun run build:web
```

This creates a `dist` folder with your web app.

### Step 2: Deploy to Vercel

#### Option A: Via GitHub (Recommended for Continuous Deployment)
1. Push your code to GitHub:
```bash
git add .
git commit -m "Add web dashboard"
git push
```

2. Go to [vercel.com](https://vercel.com/signup)
3. Sign up with GitHub
4. Click "Add New Project"
5. Import your repository
6. Vercel auto-detects Expo - just click "Deploy"
7. Wait 2-3 minutes for deployment

#### Option B: Via Vercel CLI (Quick one-time deploy)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Step 3: Get Your Vercel URL
After deployment, Vercel gives you a URL like:
- `https://your-project.vercel.app`

Test it! Open that URL in your browser - you should see the WedSync login screen.

### Step 4: Add Your Custom Domain

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add `wedsync.com`
4. Vercel will show you DNS records to add

### Step 5: Update DNS Records

Go to wherever you bought the domain (GoDaddy, Cloudflare, etc.):

#### If using GoDaddy:
1. Go to GoDaddy DNS Management
2. Add these records:

**A Record:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)
- TTL: 600 seconds

**CNAME Record:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: 600 seconds

#### If using Cloudflare:
1. Go to Cloudflare DNS
2. Add the same records Vercel shows you
3. Make sure "Proxy" is turned ON (orange cloud)

### Step 6: Wait
- DNS propagation takes 5-60 minutes
- Check status: Go to Vercel dashboard to see when DNS is verified
- Once verified, Vercel automatically provisions SSL certificate

### Step 7: Test!
Visit `https://wedsync.com` - you should see your app! 🎉

---

## Environment Variables (IMPORTANT!)

Before your app works properly, add environment variables in Vercel:

1. Go to Vercel dashboard → Settings → Environment Variables
2. Add all your environment variables:

```bash
EXPO_PUBLIC_BACKEND_URL=https://your-backend.render.com
EXPO_PUBLIC_R2_ENDPOINT=https://wedsync-upload.passionwarehelp.workers.dev
EXPO_PUBLIC_R2_PUBLIC_URL=https://media.mywedsync.com
EXPO_PUBLIC_R2_BUCKET_NAME=wedsync-media
EXPO_PUBLIC_VIBECODE_OPENAI_API_KEY=<your-key>
EXPO_PUBLIC_VIBECODE_ANTHROPIC_API_KEY=<your-key>
EXPO_PUBLIC_VIBECODE_GROK_API_KEY=<your-key>
# Add all other EXPO_PUBLIC_* variables
```

3. After adding variables, redeploy:
```bash
vercel --prod
```

---

## Alternative: Deploy to Netlify

### Step 1: Build
```bash
bun run build:web
```

### Step 2: Deploy
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### Step 3: Add Domain
1. Go to Netlify dashboard
2. Site settings → Domain management
3. Add custom domain `wedsync.com`
4. Follow DNS instructions (similar to Vercel)

---

## What Users Will See

Once deployed:

### On Desktop (screen ≥ 1024px):
- Beautiful top navigation bar with WedSync branding
- 2-column grid layout for features
- Large, spacious design
- Professional modal dialogs

### On Tablet (768-1023px):
- Single column layout
- Touch-friendly interface
- Responsive design

### On Mobile Browser:
- Mobile-optimized view
- Same as mobile app experience

---

## Troubleshooting

### "Domain not found" error
- Wait 30-60 minutes for DNS propagation
- Check DNS with: `nslookup wedsync.com`
- Verify DNS records are correct

### App not loading
- Check Vercel deployment logs
- Ensure environment variables are set
- Try the Vercel preview URL first

### Features not working
- Check browser console (F12) for errors
- Verify backend API is running
- Check environment variables are correct

---

## Cost Breakdown

- **Domain**: $10-15/year (one-time annual fee)
- **Vercel Hosting**: FREE (includes custom domains, SSL, unlimited bandwidth)
- **Total**: ~$10-15/year

---

## You're Done! 🎉

Users can now:
1. Visit `https://wedsync.com` from any computer
2. Login with their account (same as mobile app)
3. Manage their wedding from desktop
4. Get the beautiful 2-column layout on large screens

All changes you make to your code will auto-deploy when you push to GitHub!
