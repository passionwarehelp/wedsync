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
- **Elegant UI** - Premium gold gradient design with clean iOS aesthetics

### Wedding Detail View
- **Client Information** - Partner names, wedding date, venue details
- **Quick Navigation** - Access all wedding management tools from one screen
- **Progress Overview** - Visual indicators for completion status
- **Beautiful Design** - Cohesive gold and white theme throughout

### Guest List Management ✅
- **Full Guest Database** - Store complete guest information
- **RSVP Tracking** - Monitor attendance status (attending/declined/pending)
- **Plus Ones** - Handle guest partners and additional attendees
- **Guest Categories** - Organize by family, friends, bridal party, VIP, other
- **Search & Filter** - Find guests instantly with real-time filtering
- **Status Filters** - View all, attending, declined, or pending guests
- **Contact Information** - Store emails and phone numbers
- **Add Guests** - Beautiful modal form with all necessary fields

### Wedding Creation
- **Quick Setup** - Create new wedding projects in seconds
- **Client Details** - Store partner names and wedding date
- **Venue Information** - Track location details
- **Unique QR Codes** - Auto-generated for each wedding

## 🚧 Features In Development

### Tasks & Timeline System
- Task management with categories (venue, catering, photography, etc.)
- Priority levels and due dates
- Timeline builder for day-of schedule
- Ceremony, reception, photos scheduling

### Seating Chart Builder
- Visual drag-and-drop table layout
- Assign guests to tables
- Table capacity management
- Print/export functionality

### Vendor Management
- Contract tracking
- Payment status monitoring
- Vendor contact information
- Document storage

### SnapSync - Guest Photo Upload Portal
- QR code scanning for guests
- Real-time photo uploads
- Moderated gallery
- Download and sharing capabilities

### Client Portal
- Beautiful branded experience for couples
- View-only access to their wedding details
- RSVP management
- Photo gallery access
- Timeline viewing

## 🏗️ Technical Architecture

### State Management
- **Zustand** for global state with AsyncStorage persistence
- Separate stores for weddings and photos
- Individual selectors to prevent re-render loops

### Navigation
- **React Navigation** native stack for performance
- Modal presentations for creation flows
- Deep linking support for QR codes

### Design System
- **NativeWind** (Tailwind for React Native) for styling
- **Gold (#C9A961) & White** color scheme
- **Ionicons** for consistent iconography
- **Linear Gradients** for premium feel

### Data Models
- Weddings
- Guests (with RSVP tracking)
- Tasks & Timeline Events
- Vendors & Payments
- Photos & Gallery
- Seating Tables

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
├── screens/          # Main app screens
│   ├── ProDashboardScreen.tsx      ✅ Complete
│   ├── WeddingDetailScreen.tsx     ✅ Complete
│   ├── GuestListScreen.tsx         ✅ Complete
│   ├── AddGuestScreen.tsx          ✅ Complete
│   ├── CreateWeddingScreen.tsx     ✅ Complete
│   ├── TasksScreen.tsx             🚧 In Progress
│   ├── TimelineScreen.tsx          🚧 In Progress
│   ├── VendorsScreen.tsx           🚧 In Progress
│   ├── SeatingChartScreen.tsx      🚧 In Progress
│   ├── PhotoGalleryScreen.tsx      🚧 In Progress
│   └── GuestUploadScreen.tsx       🚧 In Progress
├── navigation/       # Navigation configuration
├── state/           # Zustand stores
│   ├── weddingStore.ts  ✅ Complete
│   └── photoStore.ts    ✅ Complete
├── types/           # TypeScript definitions
│   └── wedding.ts       ✅ Complete
└── utils/           # Helper functions

## 🎨 Design Philosophy

**Black-Tie Tech Experience**
- Think Airtable meets Pinterest, dressed in Vera Wang
- Clean, modern, intuitive
- Built to impress clients while empowering professionals
- Mobile-first with iOS Human Interface Guidelines
- Premium materials: gradients, shadows, smooth animations

**Color Palette**
- Primary: Gold (#C9A961)
- Secondary: Light Gold (#F4E8D0)
- Background: Neutral 50
- Text: Neutral 800
- Accents: Emerald (success), Red (declined), Amber (pending)

## 📱 User Flow

1. **Pro creates wedding** → Partners' names, date, venue
2. **Add guests** → Names, contacts, categories, RSVP status
3. **Manage tasks** → Track vendor bookings, dress fittings, etc.
4. **Build timeline** → Ceremony, cocktails, reception schedule
5. **Track vendors** → Contracts, payments, contacts
6. **Create seating chart** → Drag-and-drop table assignments
7. **Share QR code** → Guests upload photos during event
8. **Deliver excellence** → Stress-free wedding day with everything organized

## 🔄 Current Status

**Phase 1: Foundation** ✅ Complete
- Data models and types
- State management
- Navigation structure
- Pro dashboard
- Wedding creation
- Guest list management (full CRUD)

**Phase 2: Core Features** 🚧 In Progress
- Tasks and timeline system
- Vendor tracking
- Seating chart builder
- Photo gallery (SnapSync)

**Phase 3: Client Experience** 📋 Planned
- Client portal
- Branded invitations
- RSVP forms
- Client photo viewing

**Phase 4: Polish** 📋 Planned
- Animations and transitions
- Haptic feedback
- Advanced search
- Data export
- Print layouts

## 🚀 Getting Started

The app is running in the Vibecode environment. Simply:
1. View the app through the Vibecode mobile app
2. Create your first wedding from the Pro Dashboard
3. Add guests, tasks, vendors, and more
4. Everything auto-saves to device storage

## 💡 Next Steps

1. Complete Tasks & Timeline screens
2. Implement Vendor tracking
3. Build Seating Chart with drag-and-drop
4. Create SnapSync guest upload portal
5. Polish UI with animations
6. Add client portal view

---

**Built with love using:** React Native 0.76.7, Expo SDK 53, TypeScript, Zustand, React Navigation, NativeWind

**For:** Wedding professionals who demand excellence
