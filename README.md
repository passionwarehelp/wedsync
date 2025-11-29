# WedSync - Premium Wedding Planning App

**Tagline:** "Sync the chaos. Celebrate the love."

WedSync is a black-tie tech experience for wedding professionals - an elegant, modern platform that brings order to wedding planning while impressing your clients.

## 🎯 Overview

WedSync is designed for **wedding professionals** (planners, videographers, photographers, venue coordinators) to manage their clients' weddings with style and efficiency. It's not for couples directly - it's your secret weapon to deliver an exceptional, stress-free experience.

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
│   ├── ProDashboardScreen.tsx      ✅ Black Theme
│   ├── WeddingDetailScreen.tsx     ✅ Black Theme
│   ├── GuestListScreen.tsx         ✅ Black Theme
│   ├── AddGuestScreen.tsx          ✅ Black Theme
│   ├── TasksScreen.tsx             ✅ Black Theme
│   ├── CreateWeddingScreen.tsx     ✅ Black Theme
│   ├── TimelineScreen.tsx          🚧 To be styled
│   ├── VendorsScreen.tsx           🚧 To be styled
│   ├── SeatingChartScreen.tsx      🚧 To be styled
│   ├── PhotoGalleryScreen.tsx      🚧 To be styled
│   └── GuestUploadScreen.tsx       🚧 To be styled
├── navigation/       # Navigation configuration
├── state/           # Zustand stores
│   ├── weddingStore.ts  ✅ Complete
│   └── photoStore.ts    ✅ Complete
├── types/           # TypeScript definitions
│   └── wedding.ts       ✅ Complete
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
- ✅ **Full Black Theme** - Luxurious dark design throughout
- ✅ **Splash Screen** - Gold heart logo on black background
- ✅ **Fixed Calendar** - Dark theme picker, no more white-on-white
- ✅ **Gold Button Accents** - Premium feel on all interactive elements
- ✅ **Improved Contrast** - Readable text on dark backgrounds
- ✅ **Border Styling** - Elegant card separation with neutral borders

## 💡 Next Steps

1. Complete Timeline view with black theme
2. Implement Vendor tracking with dark styling
3. Build Seating Chart with black theme
4. Create SnapSync guest upload portal
5. Add more animations and haptics
6. Implement client portal view

---

**Built with love using:** React Native 0.76.7, Expo SDK 53, TypeScript, Zustand, React Navigation, NativeWind

**For:** Wedding professionals who demand excellence

**Theme:** Black & Gold Luxury
