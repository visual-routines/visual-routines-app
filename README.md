# Kids Routine Builder

A mobile-first React application that helps parents create and manage daily routines for their children. Built with React, TypeScript, and Capacitor for native iOS/Android deployment.

## Features

- **Create Custom Routines**: Build personalized morning, evening, or custom routines
- **Activity Library**: 20+ pre-built activities across 6 categories (Morning, Hygiene, Meals, Play, Learning, Evening)
- **Drag & Drop Reordering**: Easily rearrange activities within a routine
- **Progress Tracking**: Track completion of routine activities
- **Templates**: Pre-made routine templates to get started quickly
- **Offline Support**: Works without internet connection
- **Native Mobile**: Deploy as a native iOS or Android app via Capacitor

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Capacitor** - Native mobile deployment
- **@dnd-kit** - Drag and drop functionality
- **React Router** - Navigation
- **Sonner** - Toast notifications

## Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── ActivityCard.tsx       # Displays an activity template
│   ├── MobileLayout.tsx       # Main layout wrapper with header/nav
│   ├── NavLink.tsx           # Navigation link component
│   ├── RoutineActivityItem.tsx # Activity item in routine list
│   ├── RoutineCard.tsx       # Displays a saved routine
│   └── SortableActivity.tsx  # Draggable activity wrapper
├── data/
│   ├── activities.ts         # Activity templates and categories
│   └── templates.ts          # Pre-made routine templates
├── lib/
│   ├── storage.ts            # localStorage utilities
│   └── utils.ts              # Helper functions
├── pages/
│   ├── Index.tsx             # Home page with routine list
│   ├── CreateRoutine.tsx     # Routine builder with drag & drop
│   ├── ViewRoutine.tsx       # View and track routine progress
│   ├── Templates.tsx         # Browse routine templates
│   └── NotFound.tsx          # 404 page
├── types/
│   └── routine.ts            # TypeScript interfaces
└── hooks/
    └── use-mobile.tsx        # Mobile detection hook
```

## Data Storage

### How Storage Works

The app uses **localStorage** for data persistence. This is a browser API that stores data as key-value pairs in the user's browser (or WebView in native apps).

**Why localStorage (not SQLite)?**
- localStorage is simpler and sufficient for this use case
- Works seamlessly in both web browsers and Capacitor WebViews
- Data persists across page refreshes and app restarts
- No setup or database configuration required
- Perfect for small datasets (routines are typically small JSON objects)

**Storage Implementation** (`src/lib/storage.ts`):

```typescript
const STORAGE_KEY = "kids-routines";

// Get all saved routines
getRoutines(): Routine[]

// Save or update a routine
saveRoutine(routine: Routine): void

// Delete a routine by ID
deleteRoutine(id: string): void

// Get a specific routine by ID
getRoutineById(id: string): Routine | undefined
```

**Data Structure:**
```typescript
interface Routine {
  id: string;           // Unique identifier
  name: string;         // Display name
  type: "morning" | "evening" | "custom";
  activities: Activity[];
  createdAt: string;    // ISO date string
  updatedAt: string;    // ISO date string
}

interface Activity {
  id: string;
  templateId: string;
  name: string;
  icon: string;
  category: ActivityCategory;
  duration: number;     // in minutes
  order: number;
  isCompleted?: boolean;
}
```

**Storage Limits:**
- localStorage typically has a 5-10MB limit per origin
- Each routine is ~1-2KB, supporting hundreds of routines
- For larger datasets, consider IndexedDB or SQLite (via Capacitor plugins)

## Development

### Prerequisites
- Node.js 18+
- npm or bun

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Native Mobile Deployment

### Prerequisites for Native Builds
- **iOS**: macOS with Xcode installed
- **Android**: Android Studio installed

### Setup Steps

1. **Export to GitHub**: Click "Export to GitHub" in Lovable
2. **Clone locally**:
   ```bash
   git clone <your-repo-url>
   cd <project-name>
   npm install
   ```

3. **Add native platforms**:
   ```bash
   npx cap add ios      # For iOS
   npx cap add android  # For Android
   ```

4. **Build and sync**:
   ```bash
   npm run build
   npx cap sync
   ```

5. **Run on device/emulator**:
   ```bash
   npx cap run ios      # Opens in Xcode
   npx cap run android  # Opens in Android Studio
   ```

### Hot Reload During Development

The `capacitor.config.ts` is configured to point to the Lovable preview URL for hot reload during development. Before publishing to app stores, update the config to use the local build:

```typescript
// For production, remove or comment out the server block:
// server: {
//   url: '...',
//   cleartext: true
// }
```

### Publishing to App Stores

1. Update `capacitor.config.ts` for production
2. Run `npm run build && npx cap sync`
3. **iOS**: Open in Xcode, archive, and submit to App Store Connect
4. **Android**: Open in Android Studio, generate signed APK/AAB, upload to Play Console

## License

MIT
