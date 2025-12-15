# 🚀 Final Steps to Deploy WedSync to wedsync.com

Your app is built and ready! Follow these exact steps to get it live.

---

## ✅ What's Already Done:
- ✅ Web app built successfully
- ✅ GitHub repository created: `passionwarehelp/wedsync`
- ✅ Domain purchased: `wedsync.com`
- ✅ Code ready to push

---

## 📋 Steps You Need to Complete:

### **STEP 1: Push Code to GitHub** (2 minutes)

Open your terminal/command prompt on your computer and run:

```bash
# Navigate to your workspace
cd /home/user/workspace

# Add GitHub remote
git remote add github https://github.com/passionwarehelp/wedsync.git

# Push to GitHub
git push -u github main
```

**You'll be asked to login** - use your GitHub username and password (or personal access token).

After pushing, verify it worked: Visit https://github.com/passionwarehelp/wedsync - you should see all your code!

---

### **STEP 2: Deploy to Vercel** (5 minutes)

1. **Go to [vercel.com](https://vercel.com)**
2. Click **"Sign Up"** → Choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub
4. Click **"Add New..."** → **"Project"**
5. Find **"passionwarehelp/wedsync"** in the list
6. Click **"Import"**
7. Vercel will auto-detect settings:
   - Framework Preset: **Expo**
   - Build Command: `bun run build:web` (should auto-fill)
   - Output Directory: `dist` (should auto-fill)
   - Install Command: Auto
8. Click **"Deploy"**

Wait 2-3 minutes for the build to complete.

**You'll get a URL like:** `https://wedsync-xyz.vercel.app`

**TEST IT!** Open that URL - you should see the WedSync login screen!

---

### **STEP 3: Add Environment Variables** (3 minutes)

Your app needs environment variables to work properly:

1. In Vercel, go to your project dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the sidebar
4. Add each of these variables (get values from your `.env` file):

**Required Variables:**
```
EXPO_PUBLIC_BACKEND_URL = https://wedsync-backend-xyz.onrender.com
EXPO_PUBLIC_R2_ENDPOINT = https://wedsync-upload.passionwarehelp.workers.dev
EXPO_PUBLIC_R2_PUBLIC_URL = https://media.mywedsync.com
EXPO_PUBLIC_R2_BUCKET_NAME = wedsync-media
EXPO_PUBLIC_R2_ACCESS_KEY_ID = (your value)
EXPO_PUBLIC_R2_SECRET_ACCESS_KEY = (your value)
```

**Optional API Keys** (add if you're using them):
```
EXPO_PUBLIC_VIBECODE_OPENAI_API_KEY = (your key)
EXPO_PUBLIC_VIBECODE_ANTHROPIC_API_KEY = (your key)
EXPO_PUBLIC_VIBECODE_GROK_API_KEY = (your key)
EXPO_PUBLIC_VIBECODE_ELEVENLABS_API_KEY = (your key)
EXPO_PUBLIC_VIBECODE_GOOGLE_API_KEY = (your key)
```

5. After adding all variables, go to **"Deployments"** tab
6. Click **"..."** on the latest deployment → **"Redeploy"**
7. Wait for redeployment to complete

**TEST AGAIN!** Your Vercel URL should now have full functionality.

---

### **STEP 4: Connect wedsync.com Domain** (10 minutes)

1. In Vercel project, click **"Settings"** → **"Domains"**
2. In the input box, type: `wedsync.com`
3. Click **"Add"**
4. Vercel will show **DNS records** you need to add

**Now go to GoDaddy:**

5. Login to [GoDaddy](https://godaddy.com)
6. Go to **"My Products"** → Click **"DNS"** next to `wedsync.com`
7. You'll see your DNS records

**Add A Record:**
- Click **"Add"** button
- Type: **A**
- Name: **@**
- Value: **76.76.21.21** (Vercel's IP - confirm this from Vercel dashboard)
- TTL: **600 seconds**
- Click **"Save"**

**Add CNAME Record:**
- Click **"Add"** button
- Type: **CNAME**
- Name: **www**
- Value: **cname.vercel-dns.com** (confirm from Vercel dashboard)
- TTL: **600 seconds**
- Click **"Save"**

8. **Wait 30-60 minutes** for DNS to propagate

**Check DNS Status:**
- Go back to Vercel → Settings → Domains
- You'll see status change from "Pending" to "Valid"
- Vercel automatically provisions SSL certificate

---

### **STEP 5: Test Your Live Site!** 🎉

After DNS propagates (usually 30-60 minutes):

1. Visit **https://wedsync.com** in your browser
2. You should see the WedSync login screen!
3. Create an account and test it out
4. Open it on a large screen (laptop/desktop) to see the 2-column layout
5. Test on mobile to see responsive design
6. Try all features: guest list, RSVP, tasks, seating chart, photos

---

## 🎯 What You'll Have When Done:

✅ **Mobile App** - Works in Vibecode on iOS/Android
✅ **Web App** - Live at `https://wedsync.com`
✅ **Desktop Dashboard** - Beautiful 2-column layout on large screens
✅ **Responsive Design** - Works on all devices
✅ **Custom Domain** - Professional domain with HTTPS
✅ **Auto-Deploy** - Every push to GitHub auto-deploys

---

## 🔧 Troubleshooting

### "Can't push to GitHub"
- Make sure you're logged into GitHub
- You may need a Personal Access Token instead of password
- Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token

### "Vercel build failing"
- Check build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Environment variables should start with `EXPO_PUBLIC_`

### "Domain not working"
- DNS takes 30-60 minutes to propagate
- Check with: `nslookup wedsync.com` (should show Vercel's IP)
- Make sure DNS records in GoDaddy match what Vercel shows

### "App loads but features don't work"
- Check browser console (F12) for errors
- Verify environment variables are set correctly in Vercel
- Make sure backend API is running

---

## 📞 Need Help?

If you get stuck on any step, let me know which step number and what error you're seeing!

---

## 🎊 You're Almost There!

Just 5 steps to go:
1. Push to GitHub ← **START HERE**
2. Deploy to Vercel
3. Add environment variables
4. Connect domain
5. Test and celebrate! 🚀
