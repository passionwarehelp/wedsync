# Quick Start Checklist: Professional Authentication Setup

Follow these steps in order. Refer to `AUTHENTICATION_SETUP_GUIDE.md` for detailed instructions.

---

## ☐ Step 1: Set Up Database (10 minutes)

1. Go to https://supabase.com
2. Create new project: `wedsync-prod`
3. Save your database password
4. Get connection string:
   - Settings > Database > Connection string
   - Select "Transaction pooler"
   - Copy and replace `[YOUR-PASSWORD]` with your password
   - Save this string

---

## ☐ Step 2: Set Up Backend Locally (30 minutes)

1. Navigate to the backend directory:
   ```bash
   cd /home/user/workspace/backend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create `.env` file with:
   ```env
   PORT=3000
   DATABASE_URL=your-supabase-connection-string-here
   BETTER_AUTH_SECRET=your-random-32-character-secret-here
   BACKEND_URL=http://localhost:3000
   ```

4. Set up database:
   ```bash
   bunx prisma generate
   bunx prisma db push
   ```

5. Start server:
   ```bash
   bun run src/index.ts
   ```

6. Test health endpoint:
   ```bash
   curl http://localhost:3000/health
   # Should return: {"status":"ok"}
   ```

---

## ☐ Step 3: Deploy Backend to Render (20 minutes)

1. **Push to GitHub:**
   ```bash
   cd /home/user/workspace/backend
   git init
   git add .
   git commit -m "Initial backend setup"
   # Create repo on GitHub called "wedsync-backend"
   git remote add origin https://github.com/YOUR-USERNAME/wedsync-backend.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to https://render.com
   - Sign up with GitHub
   - New > Web Service
   - Connect `wedsync-backend` repo
   - Configure:
     - Name: `wedsync-api`
     - Runtime: `Node`
     - Build: `bun install && bunx prisma generate`
     - Start: `bun run src/index.ts`
     - Instance: Free

3. **Add Environment Variables:**
   - `DATABASE_URL`: Your Supabase connection string
   - `BETTER_AUTH_SECRET`: Same secret from local .env
   - `BACKEND_URL`: Leave blank for now

4. **Create Web Service**
   - Wait 5-10 minutes for deployment
   - Copy your URL: `https://wedsync-api.onrender.com`
   - Update `BACKEND_URL` environment variable with this URL
   - Save (will auto-redeploy)

5. **Test deployment:**
   ```bash
   curl https://your-app-name.onrender.com/health
   ```

---

## ☐ Step 4: Update Frontend Environment Variables

1. In Vibecode ENV tab, add:
   ```
   EXPO_PUBLIC_BACKEND_URL=https://your-render-url.onrender.com
   EXPO_PUBLIC_PROJECT_ID=wedsync-prod
   ```

2. Or manually update `.env` file:
   ```env
   EXPO_PUBLIC_BACKEND_URL=https://your-render-url.onrender.com
   EXPO_PUBLIC_PROJECT_ID=wedsync-prod
   ```

---

## ☐ Step 5: Test Authentication (10 minutes)

1. **Test Sign Up:**
   - Open your app
   - Go to sign up screen
   - Enter email, password (8+ chars), and name
   - Submit
   - Should auto-login

2. **Test Sign In:**
   - Sign out from settings
   - Go to sign in screen
   - Enter credentials
   - Should log in successfully

3. **Test Persistence:**
   - Close app completely
   - Reopen
   - Should still be logged in

4. **Check Database:**
   - Go to Supabase dashboard
   - Table Editor
   - Should see user in `user` table

---

## ☐ Step 6: Update Auth Screen (Optional)

Update `src/screens/AuthScreen.tsx` to use new auth system:

```typescript
import { useAuth } from "../lib/useAuth";

export default function AuthScreen() {
  const { signIn, signUp, isPending, error } = useAuth();

  // Use signIn(email, password) and signUp(email, password, name)
  // Display error if present
  // Show loading state when isPending
}
```

---

## Troubleshooting

### Backend won't start locally
- Check DATABASE_URL is correct
- Verify BETTER_AUTH_SECRET is at least 32 characters
- Try `bunx prisma db push` again

### Can't connect from frontend
- Verify EXPO_PUBLIC_BACKEND_URL in .env
- Check backend is "Healthy" in Render dashboard
- Test: `curl https://your-url.onrender.com/health`

### Sign up/sign in fails
- Check Render logs for errors
- Password must be 8+ characters
- Verify database connection in Supabase

### Render app slow to respond
- Free tier spins down after 15 minutes
- First request takes ~30 seconds (cold start)
- Consider paid plan ($7/month) for production

---

## What's Next?

Once authentication is working:

- [ ] Add password reset functionality
- [ ] Add social login (Google, Apple)
- [ ] Add role-based access control
- [ ] Create user profile management
- [ ] Add session management (view/revoke sessions)

---

## Need Help?

1. Check detailed instructions in `AUTHENTICATION_SETUP_GUIDE.md`
2. Review Render logs for backend errors
3. Check Better Auth docs: https://www.better-auth.com
4. Check Supabase logs for database issues

---

**Total Setup Time: ~1 hour**

**Costs:**
- Supabase Free: 500MB database, 50K MAU
- Render Free: 750 hours/month (spins down after 15 min)
- Render Paid: $7/month (no spin down, better performance)
