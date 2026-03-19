# Fungus Infection Cream

## Current State
Full-stack promotional website for Fungus Killer Cream with order management, admin panel (password: 741571), Telegram notifications, customer order blocking, and before/after results section.

## Requested Changes (Diff)

### Add
- Logo splash/loading screen that shows on every page load with animated logo and loading indicator
- PWA (Progressive Web App) support: manifest.json, service worker, installable app meta tags so users can add website to home screen like a native app
- Auto-refresh polling every 5 seconds in admin panel so new orders appear immediately without manual refresh
- Notification badge/indicator in admin panel showing new orders count

### Modify
- `useGetAllOrders` hook: add `refetchInterval: 5000` so admin sees orders in real-time
- `index.html`: add PWA meta tags (theme-color, apple-touch-icon, manifest link)
- `App.tsx`: wrap with SplashScreen component that shows logo + spinner for ~2 seconds on load

### Remove
- Nothing removed

## Implementation Plan
1. Add `SplashScreen` component with Fungus Killer logo animation and loading spinner (2-3 second display)
2. Update `useGetAllOrders` with `refetchInterval: 5000` for real-time admin updates
3. Create `public/manifest.json` with app name, icons, theme colors for PWA
4. Create `public/sw.js` service worker for PWA caching
5. Update `index.html` with full PWA meta tags
6. Integrate SplashScreen in App.tsx with useState for loading state
