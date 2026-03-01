

# Kazakhstan National ICH Registry — MVP Implementation Plan

## Overview
A multilingual web platform to document and showcase Kazakhstan's intangible cultural heritage elements and their bearers, built with React + TypeScript + Appwrite.

---

## Phase 1: Foundation & Layout

### Project Setup
- Install and configure `appwrite` SDK, `i18next`, `react-i18next`, `leaflet`, `react-leaflet`
- Set up Appwrite client connection (endpoint: `https://leqalo.com/appwrite/v1`)
- Configure i18next with Kazakh (primary), Russian, and English translations for all UI strings

### Global Layout
- **Header**: Logo, navigation links (Home, Catalog, Bearers, News), language switcher (KK/RU/EN), admin login link
- **Footer**: Contact info, links to UNESCO resources, copyright
- **Mobile**: Responsive hamburger menu
- Cultural color palette: Blue (#0066CC), Gold (#D4AF37), Turquoise (#40E0D0)

---

## Phase 2: Public Pages

### Home Page
- Hero section with welcome text and cultural heritage imagery (placeholder images initially)
- Latest 6 news items section
- Prominent search bar
- Interactive map of Kazakhstan (Leaflet + OpenStreetMap) showing ICH element markers with popups
- Photo gallery grid (12 featured ICH elements)
- Links to international ICH resources

### ICH Elements Catalog
- Card grid layout showing element photo, name, region, UNESCO domain, brief description
- Sidebar filters: by region (17 regions), by UNESCO domain (5 categories), keyword search
- Pagination (20 items/page), sort by name/date/region

### ICH Element Detail Page
- Full-width hero image, breadcrumbs, multilingual name
- Content sections: descriptions, region, domain, protection status, date added
- Media gallery with lightbox for photos, embedded video player, audio player
- Related bearers cards, location on map, share buttons

### Bearers Page
- Card grid: photo, name, region, practiced ICH elements
- Filter by region, search by name

### Bearer Detail Page
- Photo, biography, linked ICH elements, video interviews, awards

### News Page
- Blog-style listing with featured image, title, date, category, excerpt
- Filter by category (6 categories), search, pagination

### Search Page
- Unified search across ICH elements, bearers, and news
- Results grouped by type with filters

---

## Phase 3: Interactive Map

- Leaflet.js with OpenStreetMap tiles, centered on Kazakhstan (48.02°N, 66.92°E)
- Custom colored markers by UNESCO domain category
- Marker clustering when zoomed out
- Click popup showing element thumbnail, name, region, and "View details" link
- Filter markers by region and domain
- Fullscreen and reset view controls

---

## Phase 4: Basic Admin Panel

### Authentication
- Email/password login via Appwrite Auth
- Session management, auto-logout after 24h inactivity
- Two initial roles: Admin (full CRUD) and Editor (edit only)

### Admin Dashboard
- Statistics overview: total elements, bearers, news items
- Recent activity summary
- Quick action buttons

### ICH Elements Management
- List view with search and filters
- Add/edit form: multilingual name & descriptions, region dropdown, UNESCO domain, coordinates (with map picker), status (draft/published), photo/video/audio uploads via Appwrite Storage
- Delete with confirmation

### News Management
- List view with filters
- Add/edit form: multilingual title & content (rich text editor), featured image, category, publication date, status

### Bearers Management
- List view with search
- Add/edit form: name, photo, biography, region, linked ICH elements (multi-select), video uploads

---

## Phase 5: Data & Seed Content

### Database Collections (Appwrite)
- `ich_elements`, `bearers`, `bearer_elements`, `regions`, `unesco_domains`, `news`, `users`
- All with proper attributes matching the schema spec

### Seed Data
- 17 regions with KK/RU/EN names and coordinates
- 5 UNESCO domains with KK/RU/EN names and descriptions
- 6 sample ICH elements for testing (yurt construction, Nauryz, Dombra, etc.)

---

## Phase 6: Polish & Quality

- Loading skeletons for all data-driven pages
- Empty states with helpful messages
- Error states with retry
- Toast notifications for admin actions
- Smooth page transitions and animations
- SEO meta tags and Open Graph tags
- Print-friendly CSS for detail pages
- Responsive testing across mobile/tablet/desktop

---

## Deferred to Later Iterations
- Advanced roles (Super Admin, Moderator, Source) with approval workflows
- Email notifications for content workflow
- Audit logging
- Export to Excel
- Social sharing with QR codes
- Offline support (service worker)
- Google Analytics integration
- Advanced search with fuzzy matching and autocomplete
- Media library management in admin
- User management UI

