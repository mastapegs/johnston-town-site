# CLAUDE.md — Johnston Community Directory

## Project Overview

A React web application that serves as a centralized community directory for Johnston, RI residents (~30,000 population). It helps residents discover local services, resources, and businesses. Currently in a "curated launch" phase focusing on essential services (food assistance, healthcare, childcare, senior services, mental health, municipal services, shelters).

## Tech Stack

- **Framework**: React 19 + React Router 7 (client-side routing)
- **Build Tool**: Vite 8
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (via Vite plugin)
- **Code Quality**: ESLint 9 (flat config) + Prettier
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
```

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx           # Header/footer/nav wrapper (used on all pages)
│   └── WeatherDisplay.tsx   # Live weather widget (Open Meteo API, no auth needed)
├── pages/
│   ├── Home.tsx             # Landing page with category grid
│   ├── Directory.tsx        # Browse/filter listings by category
│   ├── ListingDetail.tsx    # Single listing detail view
│   ├── About.tsx            # Project information
│   └── Submit.tsx           # Placeholder for future submission form
├── data/
│   └── listings.ts          # Listing data, types, and categories
├── App.tsx                  # Route definitions
├── main.tsx                 # Entry point
└── index.css                # Tailwind import
```

### Key Files

- `src/data/listings.ts` — All listings are hardcoded here. Contains the `Listing` interface, the `categories` tuple, and the `listings` array.
- `src/App.tsx` — React Router configuration with all routes.
- `src/components/Layout.tsx` — Shared layout wrapper with navigation and footer.
- `src/components/WeatherDisplay.tsx` — Real-time weather widget using Open Meteo API (Johnston coords: 41.824, -71.516). Refreshes every 30 minutes, fails silently.
- `.pa11yci` — Accessibility test configuration (URLs and WCAG standard).
- `planning/vision.md` — Product vision and roadmap document.

## Routes

| Path             | Component     | Description                                                                     |
| ---------------- | ------------- | ------------------------------------------------------------------------------- |
| `/`              | Home          | Category overview grid                                                          |
| `/directory`     | Directory     | Browsable listing directory with category filter (via `?category=` query param) |
| `/directory/:id` | ListingDetail | Detail page for a single listing                                                |
| `/about`         | About         | Project information                                                             |
| `/submit`        | Submit        | Placeholder for community submissions                                           |

## Data Model

```typescript
interface Listing {
  id: string; // Unique, kebab-case identifier
  name: string;
  category: string; // Must be one of the predefined categories
  address: string;
  phone: string;
  website?: string;
  hours?: string;
  description: string;
}
```

Categories are defined as a constant tuple in `src/data/listings.ts` and reused across components.

## Code Style & Conventions

- **Formatting**: Prettier — double quotes, semicolons, trailing commas, 2-space indent, 80 char line width
- **Components**: Functional components with hooks only
- **Styling**: Tailwind utility classes inline (no separate CSS files per component)
- **Routing**: React Router v7 — uses `NavLink`, `useSearchParams`, `useParams`, `Link`
- **TypeScript**: Strict mode with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- **Accessibility**: WCAG2AA compliance — skip-to-main links, aria-labels, semantic HTML, focus outlines (`outline-2 outline-offset-2 outline-blue-600`)
- **Responsive design**: Mobile-first with Tailwind breakpoints (`sm:`, `lg:`)

## CI/CD

Three GitHub Actions workflows in `.github/workflows/`:

1. **ci.yml** — Reusable workflow: runs lint, format check, TypeScript type checking, and accessibility tests (Node 22)
2. **deploy.yml** — Runs on push to `main`: CI checks → build → deploy to Netlify production
3. **pull-request.yml** — Runs on PRs: CI checks → build → deploy preview to Netlify (alias `pr-{number}`, comments URL on PR)

## Adding a New Listing

1. Edit `src/data/listings.ts`
2. Add a new object to the `listings` array following the `Listing` interface
3. Use an existing category from the `categories` tuple, or add a new one if needed
4. Ensure the `id` is unique and kebab-case

## Adding a New Page

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Add a nav link in `src/components/Layout.tsx` if it should appear in the navigation
