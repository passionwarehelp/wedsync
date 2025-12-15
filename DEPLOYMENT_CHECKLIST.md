# Quick Deployment Checklist

Follow these steps to get WedSync live at `wedsync.com` (or your domain):

## ✅ Pre-Deployment

- [ ] Buy domain name (e.g., `wedsync.com`) from Namecheap, GoDaddy, or Cloudflare
- [ ] Have backend API deployed and URL ready (`EXPO_PUBLIC_BACKEND_URL`)
- [ ] Have all environment variables ready
- [ ] Test web app locally with `bun run web`

## ✅ Deployment to Vercel (Recommended)

### Step 1: Build
```bash
bun run build:web
```

### Step 2: Deploy
```bash
# Install Vercel CLI if not already
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Step 3: Configure
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all `EXPO_PUBLIC_*` variables
5. Redeploy if needed

### Step 4: Custom Domain
1. Go to Settings → Domains
2. Add `wedsync.com`
3. Update DNS records (Vercel shows you what to add):
   - Type: `A` Record
   - Name: `@`
   - Value: Vercel's IP (shown in dashboard)
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

### Step 5: Wait
- DNS propagation takes 5-60 minutes
- Vercel automatically provisions SSL certificate
- Done! Your site is live at `https://wedsync.com`

## ✅ Deployment to Netlify (Alternative)

### Step 1: Build
```bash
bun run build:web
```

### Step 2: Deploy
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### Step 3: Custom Domain
1. Go to Netlify dashboard
2. Site settings → Domain management
3. Add custom domain `wedsync.com`
4. Follow DNS instructions

## ✅ GitHub Auto-Deploy Setup

### For Vercel:
1. Push code to GitHub
2. Import project from GitHub in Vercel
3. Every push to `main` auto-deploys

### For Netlify:
1. Push code to GitHub
2. Import project from GitHub in Netlify
3. Build command: `bun run build:web`
4. Publish directory: `dist`
5. Every push to `main` auto-deploys

## ✅ Post-Deployment Testing

- [ ] Visit `https://wedsync.com`
- [ ] Test login flow
- [ ] Create test wedding
- [ ] Test on desktop (>1024px wide)
- [ ] Test on tablet (768-1023px)
- [ ] Test on mobile browser
- [ ] Check all features work
- [ ] Verify photos upload correctly
- [ ] Test RSVP flow

## ✅ Environment Variables to Set

```bash
EXPO_PUBLIC_BACKEND_URL=https://your-backend.render.com
EXPO_PUBLIC_R2_ENDPOINT=https://wedsync-upload.passionwarehelp.workers.dev
EXPO_PUBLIC_R2_PUBLIC_URL=https://media.mywedsync.com
EXPO_PUBLIC_R2_BUCKET_NAME=wedsync-media
EXPO_PUBLIC_VIBECODE_OPENAI_API_KEY=your-key-here
EXPO_PUBLIC_VIBECODE_ANTHROPIC_API_KEY=your-key-here
EXPO_PUBLIC_VIBECODE_GROK_API_KEY=your-key-here
# Add any other API keys
```

## 🎉 Success!

Once deployed:
- ✅ Desktop users get optimized 2-column layout
- ✅ Mobile users get touch-friendly interface
- ✅ All authentication syncs across devices
- ✅ Photos/videos work seamlessly
- ✅ Automatic HTTPS and SSL

## 🔧 Troubleshooting

**Site not loading?**
- Check DNS propagation: `nslookup wedsync.com`
- Wait 30-60 minutes for DNS to update

**Build failing?**
- Check build logs in Vercel/Netlify dashboard
- Ensure all dependencies are in `package.json`
- Try building locally first: `bun run build:web`

**Features not working?**
- Check browser console for errors
- Verify environment variables are set
- Check backend API is running

**Need help?**
See full guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
