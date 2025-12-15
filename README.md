# WedSync - Premium Wedding Planning App

**Tagline:** "Sync the chaos. Celebrate the love."

WedSync is a black-tie tech experience for wedding professionals - an elegant, modern platform that brings order to wedding planning while impressing your clients.

## 🎯 Overview

WedSync is designed for **wedding professionals** (planners, videographers, photographers, venue coordinators) to manage their clients' weddings with style and efficiency. It's not for couples directly - it's your secret weapon to deliver an exceptional, stress-free experience.

## 🔐 Authentication System

**Professional-Grade Authentication** using Better Auth v1.3.24 with Bun + Hono backend:
- **Cross-Platform Login** - Works on phone, tablet, and web
- **Secure Token Storage** - Uses expo-secure-store for iOS/Android
- **Email & Password Auth** - Simple, secure authentication
- **Session Management** - Automatic token refresh and persistence
- **Backend API** - Separate Hono server deployed on Render
- **PostgreSQL Database** - Supabase for user data storage
- **Web Dashboard Ready** - Same backend will power future web dashboard for photographers

**Architecture:**
- 📱 **Mobile App** (Current) - Photographers manage weddings on the go
- 🌐 **Web Dashboard** (Future) - Photographers manage from desktop/laptop
- 🔄 **Shared Backend** - Same API serves both mobile and web
- 💾 **Synced Data** - Login from any device, access all wedding data

**Setup Status:**
- ✅ Backend infrastructure created (in `/backend` folder)
- ✅ Frontend auth hooks implemented (`/src/lib/useAuth.tsx`)
- ✅ AuthScreen updated to use new auth system
- ⏳ Backend needs to be deployed to Render (see deployment guide)
- ⏳ Environment variable needs backend URL after deployment
- 🔮 Web dashboard to be built later (will use same backend)

**Deployment Guides:**
- See `AUTHENTICATION_SETUP_GUIDE.md` for detailed setup instructions (includes web dashboard info)
- See `QUICK_START.md` for quick deployment checklist

## ✨ Current Features (Implemented)

### Professional Dashboard
- **Wedding Portfolio Management** - View all active weddings at a glance
- **Search & Filter** - Quickly find any wedding
- **Status Tracking** - Track planning status and upcoming events
- **Quick Stats** - See guest counts and task progress at a glance
- **Premium Black & Gold UI** - Luxurious dark theme with gold accents

### Wedding Detail View
- **Client Information** - Partner names, wedding date, venue details
- **Quick Navigation** - Access all wedding management tools from one screen
- **Progress Overview** - Visual indicators for completion status
- **Elegant Design** - Black background with gold (#C9A961) highlights

### Guest List Management ✅
- **Full Guest Database** - Store complete guest information
- **RSVP Tracking** - Monitor attendance status (attending/declined/pending)
- **Plus Ones** - Handle guest partners and additional attendees
- **Guest Categories** - Organize by family, friends, bridal party, VIP, other
- **Search & Filter** - Find guests instantly with real-time filtering
- **Status Filters** - View all, attending, declined, or pending guests
- **Contact Information** - Store emails and phone numbers
- **Add Guests** - Beautiful modal form with all necessary fields
- **Invite Button** - Quick access to send RSVP invites directly from guest list

### RSVP Link System ✅ (NEW)
- **Shareable RSVP Links** - Send a link to guests for web-based RSVP
- **No App Required** - Guests can RSVP directly from their browser
- **Complete RSVP Form** - Name, email, phone, attendance, +1, meal preferences
- **Meal Selection** - Standard, vegetarian, vegan, gluten-free options
- **Dietary Restrictions** - Text field for allergies and special requirements
- **QR Code Generation** - Printable QR code linking to RSVP form
- **RSVP Statistics** - Live tracking of attending, declined, pending counts
- **Message to Couple** - Optional well-wishes field
- **Automatic Guest Creation** - RSVPs automatically added to guest list
- **Beautiful Confirmation** - Elegant thank you screen after submission

### Task Management ✅
- **Complete Task System** - Create and track wedding tasks
- **Interactive Status** - Tap to toggle between pending → in-progress → completed
- **Category Icons** - Visual indicators for venue, catering, photography, etc.
- **Priority Levels** - High, medium, low with color coding
- **Due Dates** - Track deadlines
- **Filter by Status** - View all, pending, in-progress, or completed tasks
- **Strike-through Completed** - Visual completion feedback

### Wedding Creation
- **Quick Setup** - Create new wedding projects in seconds
- **Client Details** - Store partner names and wedding date
- **Venue Information** - Track location details
- **Dark Calendar Picker** - Fixed readability with dark theme
- **Unique QR Codes** - Auto-generated for each wedding

### Photo Management ✅
- **Photographer Upload** - Upload multiple photos and videos from device library
- **Photo Gallery** - Beautiful grid view with 3-column layout
- **Video Support** - Full video upload and playback with expo-video
- **Favorites System** - Mark and filter favorite photos
- **Media Filters** - Filter by All/Photos/Videos/Favorites
- **Full-Screen View** - Tap any photo or video for detailed view
- **Upload Metadata** - Track who uploaded and when
- **QR Code Integration** - Unique QR codes per wedding for guest uploads
- **Guest Upload Portal** - Beautiful guest-facing upload page with R2 cloud storage
- **Progress Tracking** - Visual upload progress with percentage and count
- **Cloudflare R2 Storage** - Photos and videos stored in cloud via Worker
- **Batch Upload** - Select and upload multiple photos/videos at once
- **Media Type Detection** - Automatic detection of photos vs videos

## 🎨 Design Excellence

### Black & Gold Premium Theme
- **Deep Black Background** (#000000) for sophistication
- **Gold Accents** (#C9A961) for luxury and elegance
- **Subtle Gradients** for depth and dimension
- **Clean Typography** with optimal contrast
- **Professional Feel** - Like a high-end wedding invitation

### Status Color System
- **Emerald** for attending/success
- **Red** for declined/high priority
- **Amber** for pending/medium priority
- **Blue** for in-progress/low priority

### iOS Native Excellence
- **Dark Mode** optimized throughout
- **Smooth interactions** with proper active states
- **Calendar with themeVariant="dark"** - readable date picker
- **Gold splash screen** with beautiful heart logo
- **Border accents** instead of heavy shadows

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
├── screens/          # Main app screens
│   ├── ProDashboardScreen.tsx          ✅ Black Theme
│   ├── ClientDashboardScreen.tsx       ✅ Black Theme (Mobile)
│   ├── ClientDashboardScreen.web.tsx   ✅ Black Theme (Desktop/Web)
│   ├── WeddingDetailScreen.tsx         ✅ Black Theme
│   ├── GuestListScreen.tsx             ✅ Black Theme
│   ├── AddGuestScreen.tsx              ✅ Black Theme
│   ├── TasksScreen.tsx                 ✅ Black Theme
│   ├── CreateWeddingScreen.tsx         ✅ Black Theme
│   ├── PhotoGalleryScreen.tsx          ✅ Black Theme + Videos
│   ├── PhotographerUploadScreen.tsx    ✅ Black Theme + Videos
│   ├── QRCodeScreen.tsx                ✅ Black Theme + Production URL
│   ├── GuestUploadScreen.tsx           ✅ Black Theme + R2 Upload + Videos
│   ├── GuestRSVPScreen.tsx             ✅ Black Theme + Web RSVP Form
│   ├── RSVPLinkScreen.tsx              ✅ Black Theme + Share RSVP Link
│   ├── TimelineScreen.tsx              🚧 To be styled
│   ├── VendorsScreen.tsx               🚧 To be styled
│   ├── SeatingChartScreen.tsx          ✅ Black Theme + Drag & Drop
│   └── AdminDashboardScreen.tsx        ✅ Black Theme
├── navigation/       # Navigation configuration
├── state/           # Zustand stores
│   ├── weddingStore.ts  ✅ Complete
│   └── photoStore.ts    ✅ Complete
├── types/           # TypeScript definitions
│   └── wedding.ts       ✅ Complete
├── api/             # API utilities
│   └── r2-upload.ts     ✅ R2/local storage
└── utils/           # Helper functions
```

## 🎨 Design Philosophy

**Black-Tie Tech Experience**
- Luxurious black background with gold accents
- Think high-end wedding invitation meets modern app
- Clean, modern, intuitive
- Built to impress clients while empowering professionals
- Mobile-first with iOS Human Interface Guidelines
- Premium materials: gradients, borders, smooth animations

**Color Palette**
- Primary: Gold (#C9A961)
- Background: Pure Black (#000000)
- Cards: Neutral 900
- Text: Neutral 100 (headings), Neutral 300-400 (body)
- Accents: Emerald (success), Red (declined), Amber (pending), Blue (in-progress)
- Borders: Neutral 800

## 🚀 Getting Started

The app is running in the Vibecode environment. Simply:
1. View the app through the Vibecode mobile app
2. Beautiful gold heart splash screen on launch
3. Create your first wedding from the Pro Dashboard
4. Add guests, tasks, vendors, and more
5. Everything auto-saves to device storage

## 📱 What's New

### Latest Updates
- ✅ **Web Dashboard for Couples** - Desktop-optimized dashboard with 2-column grid layout for larger screens
- ✅ **Responsive Design** - Automatically adapts to screen size (mobile, tablet, desktop)
- ✅ **Invite Button on Guest List** - Quick access to send RSVP invites directly from guest list screen
- ✅ **RSVP Link System** - Guests can RSVP via shareable web link without downloading the app
- ✅ **Web-Based RSVP Form** - Complete form with attendance, +1s, meal preferences, dietary restrictions
- ✅ **RSVP QR Code** - Printable QR code for RSVP (separate from photo upload QR)
- ✅ **RSVP Statistics Dashboard** - Live tracking of attending, declined, pending, and +1 counts
- ✅ **Create Wedding Payment Flow** - $50 one-time purchase to create a wedding (payment shown before form)
- ✅ **Direct QR Access for Paid Users** - QR code button goes directly to design screen without paywall
- ✅ **Updated Sales Page** - New paywall shows all features included (guests, seating, tasks, calendar, notes, QR)
- ✅ **Seating Chart with Drag & Drop** - Add tables (round, square, rectangle), drag to position, assign guests
- ✅ **Add Guest Screen Redesign** - Clean black theme with category/RSVP chips
- ✅ **Full QR Code System** - Unique codes per wedding with production URL
- ✅ **Guest Upload Portal** - Beautiful upload page with R2 cloud storage
- ✅ **Video Support** - Full video upload and playback throughout app
- ✅ **Upload Progress** - Real-time progress bars with percentage and count
- ✅ **Cloudflare Worker Integration** - Seamless R2 uploads via authenticated Worker
- ✅ **Media Type Detection** - Automatic photo vs video classification
- ✅ **Full Black Theme** - Luxurious dark design throughout
- ✅ **Splash Screen** - Gold heart logo on black background
- ✅ **Fixed Calendar** - Dark theme picker, no more white-on-white
- ✅ **Gold Button Accents** - Premium feel on all interactive elements
- ✅ **Improved Contrast** - Readable text on dark backgrounds
- ✅ **Border Styling** - Elegant card separation with neutral borders

## 💡 Next Steps

1. Complete Timeline view with black theme
2. Implement Vendor tracking with dark styling
3. Add more animations and haptics
4. Add photo/video download functionality
5. Implement guest name capture on upload
6. Enhance web dashboard with more features

---

## 📸 Photo & Video Upload System

### Current Implementation
- **Cloud Storage**: Photos and videos uploaded to Cloudflare R2 via authenticated Worker
- **Guest Uploads**: QR code system with unique codes per wedding
- **Photographer Uploads**: Professional upload interface with batch support
- **Media Organization**: Organized by `wedding_<id>/photos/` and `wedding_<id>/videos/`
- **Progress Tracking**: Real-time upload progress with percentage
- **Video Support**: Full video upload and playback with expo-video

### Cloudflare R2 Setup (Production)

**Status: ✅ Complete and Working**

1. **Cloudflare Configuration**:
   - R2 bucket: `wedsync-media`
   - Custom domain: `media.mywedsync.com`
   - CORS configured for web uploads
   - API tokens generated

2. **Environment Variables** (in Vibecode ENV tab):
   ```
   R2_ENDPOINT=https://wedsync-upload.passionwarehelp.workers.dev
   R2_PUBLIC_URL=https://media.mywedsync.com
   R2_BUCKET_NAME=wedsync-media
   ```

3. **Cloudflare Worker**:
   - URL: `https://wedsync-upload.passionwarehelp.workers.dev`
   - Handles authenticated uploads to R2
   - Bound to WEDSYNC_BUCKET
   - CORS enabled for app uploads

### How It Works Now
- Photographers and guests select photos/videos from device
- Media automatically uploads to R2 via Worker
- Organized by wedding ID and media type
- Public URLs generated for viewing
- Photo metadata stored in Zustand
- Video playback with expo-video
- Progress tracking during upload

---

**Built with love using:** React Native 0.76.7, Expo SDK 53, TypeScript, Zustand, React Navigation, NativeWind

**For:** Wedding professionals who demand excellence

**Theme:** Black & Gold Luxury
