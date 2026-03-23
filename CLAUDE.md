# CLAUDE.md — Johnston Community Directory

## Project Overview

A React web application that serves as a centralized community directory for Johnston, RI residents (~30,000 population). It helps residents discover local services, resources, and businesses. Categories include: Food Assistance, Healthcare & Mental Health, Childcare, Senior Services, Municipal Services, Shelters, Parks & Recreation, Entertainment, and Schools.

## Tech Stack

- **Framework**: React 19 + React Router 7 (client-side routing)
- **Build Tool**: Vite 8
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (via Vite plugin)
- **Validation**: Zod 4 (runtime schema validation for listing data)
- **Code Quality**: ESLint 9 (flat config, with jsx-a11y plugin) + Prettier
- **Accessibility Testing**: pa11y-ci (WCAG2AA standard)
- **Deployment**: Netlify (via GitHub Actions)

## Commands

```bash
npm run dev            # Start Vite dev server
npm run build          # TypeScript check + Vite production build
npm run preview        # Preview production build locally
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
npm run format:check   # Check formatting without modifying files
npm run a11y           # Run WCAG2AA accessibility tests via pa11y-ci
npm run geocode        # Resolve listing addresses to lat/lng coordinates
```

### Environment Setup (Claude Code on the Web)

When running in a web/cloud environment, `node_modules` may be missing or incomplete. Before running lint, format, or build commands:

1. **Install dependencies first** with `npm install --ignore-scripts`. The `--ignore-scripts` flag is required because `puppeteer` (a pa11y-ci dependency) runs a postinstall script that downloads Chrome, which fails in sandboxed environments. Skipping scripts is safe — puppeteer is only needed for `npm run a11y`, not for lint/format/build.
2. **Run `npm run format` before committing** (not just `format:check`). Prettier may reformat code that passes ESLint but doesn't match Prettier's style. Running `format` auto-fixes everything.
3. **`npm run a11y` will not work** in environments without Chrome/Chromium installed. This is expected — a11y tests run in GitHub Actions CI where Chrome is available. Don't try to fix this locally; just ensure lint, format, and build pass.

**Recommended pre-commit check order:**

```bash
npm install --ignore-scripts   # Only needed once per session
npm run lint                   # ESLint (zero-config, fast)
npm run format                 # Auto-fix formatting
npm run build                  # TypeScript check + production build
```

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx           # Header/footer/nav wrapper (used on all pages)
│   ├── ErrorBoundary.tsx    # React error boundary wrapper
│   ├── DataError.tsx        # Data validation error display (shown when Zod fails)
│   ├── HeroSearch.tsx       # Hero section with search input on landing page
│   ├── CategoryGrid.tsx     # Home page category card grid
│   ├── MissionBanner.tsx    # Mission statement banner component
│   ├── StatsSection.tsx     # Directory statistics display (listing/category counts)
│   ├── ListingMap.tsx       # OpenStreetMap iframe embed for listing locations
│   └── WeatherDisplay.tsx   # Live weather widget (Open Meteo API, no auth needed)
├── pages/
│   ├── Home.tsx             # Landing page with hero search, stats, categories, mission
│   ├── Directory.tsx        # Browse/filter listings by category + keyword search (list + map views)
│   ├── ListingDetail.tsx    # Single listing detail view with map
│   ├── About.tsx            # Project information and contact
│   ├── Submit.tsx           # Placeholder for future submission form
│   ├── Privacy.tsx          # Privacy policy page
│   ├── Terms.tsx            # Terms of service page
│   └── NotFound.tsx         # 404 error page
├── data/
│   ├── listings.json            # Raw listing data (source of truth)
│   ├── listings.ts              # Validates & hydrates listings with coordinates
│   ├── schemas.ts               # Zod schemas for listing validation
│   ├── categories.ts            # Category tuple and Category type
│   └── coordinates.generated.json  # Auto-generated lat/lng from addresses
├── config.ts                # Site-wide constants (CONTACT_EMAIL, SITE_NAME, JOHNSTON_COORDS)
├── useUserLocation.ts       # Custom hook for browser geolocation with localStorage cache
├── App.tsx                  # Route definitions with ErrorBoundary
├── main.tsx                 # Entry point
└── index.css                # Tailwind import
scripts/
└── geocode.ts               # Build-time address → coordinates via Nominatim API
public/
└── _redirects               # Netlify SPA routing (/* → /index.html)
planning/
├── vision.md                # Product vision and roadmap
├── community-site-comparison.md  # Comparison with other community resource sites
├── growth-roadmap.md        # Feature roadmap with deliverables checklist
├── government-readiness.md  # Tier 1 & 2 government linkage checklist
└── codebase-review.md       # Code quality and scalability analysis
```

### Key Files

- `src/data/listings.json` — Raw listing data (addresses are the source of truth). Each entry has `id`, `name`, `category`, `address`, `phone`, `website?`, `hours?`, `description`.
- `src/data/listings.ts` — Validates `listings.json` via Zod, hydrates entries with coordinates, and exports the `Listing` interface and `listingsResult` (a success/error discriminated union).
- `src/data/schemas.ts` — Zod schemas: validates listing fields (including US phone regex), transforms `phone` → `phoneHref` (digits-only for `tel:` links).
- `src/data/categories.ts` — Categories defined as a `const` tuple with derived `Category` type. Reused by schemas and components.
- `src/data/coordinates.generated.json` — Auto-generated lat/lng coordinates. Regenerate with `npm run geocode` after changing addresses.
- `src/config.ts` — Extracted site-wide constants: `CONTACT_EMAIL` (Zod-validated), `SITE_NAME`, `JOHNSTON_COORDS`.
- `src/useUserLocation.ts` — Browser geolocation hook with localStorage caching and graceful error handling.
- `scripts/geocode.ts` — Build-time script that resolves listing addresses to coordinates via the OpenStreetMap Nominatim API (free, no API key). Reads from `listings.json`, caches results, only re-geocodes when an address changes.
- `src/components/ListingMap.tsx` — Map component using OpenStreetMap iframe embeds. Used on listing detail pages and the directory map view.
- `src/components/ErrorBoundary.tsx` — React error boundary that catches render errors gracefully.
- `src/components/DataError.tsx` — Displays Zod validation errors when listing data fails to parse.
- `src/App.tsx` — React Router configuration. Validates listing data before rendering routes; shows `DataError` on validation failure.
- `src/components/Layout.tsx` — Shared layout wrapper with navigation and footer. Footer displays `__LAST_UPDATED__` date (auto-generated from git commit timestamp via Vite define).
- `src/components/WeatherDisplay.tsx` — Real-time weather widget using Open Meteo API (Johnston coords from `config.ts`). Refreshes every 30 minutes, fails silently.
- `.pa11yci` — Accessibility test configuration (URLs for all routes, WCAG standard, and ignored rules).
- `vite.config.ts` — Vite config with `__LAST_UPDATED__` global (git commit date) and Tailwind/React plugins.
- `public/_redirects` — Netlify SPA routing config (rewrites all paths to `/index.html`).

## Routes

| Path             | Component     | Description                                                                                |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------ |
| `/`              | Home          | Landing page with hero search, stats, category grid, mission banner                        |
| `/directory`     | Directory     | Browsable listing directory with keyword search (`?q=`) and category filter (`?category=`) |
| `/directory/:id` | ListingDetail | Detail page for a single listing with map                                                  |
| `/about`         | About         | Project information, principles, and contact                                               |
| `/submit`        | Submit        | Placeholder for community submissions                                                      |
| `/privacy`       | Privacy       | Privacy policy (no tracking, third-party service disclosures)                              |
| `/terms`         | Terms         | Terms of service, disclaimer, accuracy notice                                              |
| `/*`             | NotFound      | 404 error page                                                                             |

## Data Model

```typescript
// src/data/categories.ts
const categories = [
  "Food Assistance",
  "Healthcare & Mental Health",
  "Childcare",
  "Senior Services",
  "Municipal Services",
  "Shelters",
  "Parks & Recreation",
  "Entertainment",
  "Schools",
] as const;

type Category = (typeof categories)[number];

// src/data/listings.ts
interface Listing {
  id: string; // Unique, kebab-case identifier
  name: string;
  category: Category; // Must be one of the predefined categories
  address: string; // Source of truth for location — used to generate lat/lng
  phone: string;
  phoneHref: string; // Auto-computed: digits-only version of phone (for tel: links)
  website?: string;
  hours?: string;
  description: string;
  lat: number; // Auto-populated from coordinates.generated.json
  lng: number; // Auto-populated from coordinates.generated.json
}
```

### Data Flow

1. Raw data lives in `src/data/listings.json`
2. On import, `listings.ts` validates via Zod schemas in `schemas.ts`
3. The schema transforms `phone` → `phoneHref` (strips non-digits for `tel:` links)
4. Valid entries are hydrated with lat/lng from `coordinates.generated.json`
5. `App.tsx` checks `listingsResult.success` — renders `DataError` on failure, routes on success

## Code Style & Conventions

- **Formatting**: Prettier — double quotes, semicolons, trailing commas, 2-space indent, 80 char line width
- **Components**: Functional components with hooks only
- **Styling**: Tailwind utility classes inline (no separate CSS files per component)
- **Routing**: React Router v7 — uses `NavLink`, `useSearchParams`, `useParams`, `Link`
- **TypeScript**: Strict mode with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- **Validation**: Zod schemas for runtime data validation; `safeParse` for error handling
- **Accessibility**: WCAG2AA compliance — skip-to-main links, aria-labels, semantic HTML, focus outlines (`outline-2 outline-offset-2 outline-blue-600`). See "WCAG & Accessibility Guidelines" below.
- **Responsive design**: Mobile-first with Tailwind breakpoints (`sm:`, `lg:`)

## CI/CD

Three GitHub Actions workflows in `.github/workflows/`:

1. **ci.yml** — Reusable workflow: runs lint, format check, TypeScript type checking, and accessibility tests (Node 22)
2. **deploy.yml** — Runs on push to `main`: CI checks → build → deploy to Netlify production
3. **pull-request.yml** — Runs on PRs: CI checks → build → deploy preview to Netlify (alias `pr-{number}`, comments URL on PR)

## Adding a New Listing

1. Edit `src/data/listings.json`
2. Add a new object to the array (no lat/lng needed — just the address)
3. Use an existing category from the `categories` tuple in `src/data/categories.ts`, or add a new one if needed
4. Ensure the `id` is unique and kebab-case
5. The `phone` field must match the US phone regex in `schemas.ts`
6. Run `npm run geocode` to generate coordinates from the address

## WCAG & Accessibility Guidelines

This project enforces WCAG2AA via pa11y-ci with the axe runner. Key lessons learned:

### Color Contrast

- **Use `text-gray-700` (not `text-gray-600`) for labels at small text sizes** (`text-sm`, `text-xs`). Tailwind's `gray-600` is borderline for WCAG2AA at 14px and below.
- **Use `text-blue-700` (not `text-blue-600`) for links at small text sizes.** `blue-600` (~4.6:1 contrast on white) fails at `text-sm`.
- As a rule of thumb: at `text-sm` or smaller, prefer `-700` variants for both gray and blue text.

### Maps and Third-Party Libraries

- **Avoid importing CSS from interactive map libraries** (Leaflet, MapLibre, etc.). Their stylesheets inject low-contrast elements (attribution links, zoom controls, branding) that fail axe color-contrast checks and conflict with Tailwind's base styles.
- **Prefer iframe-based embeds** for third-party map content. The iframe boundary completely isolates external CSS from Tailwind, preventing style conflicts.
- The `frame-tested` axe rule is ignored in `.pa11yci` because axe cannot scan inside cross-origin iframes. This is expected — the iframe has a descriptive `title` attribute per WCAG best practices.
- **Static map images** (`<img>` with alt text, linked to interactive map) are the most accessible option if interactivity isn't needed. Zero CSS conflicts, zero library dependencies.

### Geocoding

- Addresses are the source of truth for listing locations. Coordinates are generated via `npm run geocode` using the OpenStreetMap Nominatim API (free, no API key, 1 req/sec rate limit).
- The geocode script caches results in `src/data/coordinates.generated.json` and only re-geocodes when an address changes.

## Adding a New Page

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Add a nav link in `src/components/Layout.tsx` if it should appear in the navigation
4. Add the URL to `.pa11yci` for accessibility testing
