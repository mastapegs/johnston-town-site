# Johnston Community Directory — Codebase Review & Scalability Plan

_Created: March 2026_\
_Last updated: March 2026_

## Purpose

This document captures the results of a comprehensive code review performed before the next phase of growth. The goal: identify technical debt, scalability bottlenecks, and gaps with industry standards so that further development builds on a solid foundation.

> **See also:** [growth-roadmap.md](./growth-roadmap.md) for feature planning, [vision.md](./vision.md) for project direction, [government-readiness.md](./government-readiness.md) for institutional requirements.

---

## Current State (Snapshot)

| Metric | Value |
| --- | --- |
| **Source lines** | ~2,000 (excluding data) |
| **Listings** | 71 across 9 categories |
| **Largest file** | `listings.ts` — 794 lines |
| **Largest component** | `Home.tsx` — 205 lines |
| **Dependencies** | React 19, React Router 7, Vite 8, Tailwind v4, TypeScript 5.9 |
| **CI checks** | Lint, format, type check, WCAG2AA (pa11y-ci) |
| **Deployment** | Netlify via GitHub Actions (production + PR previews) |

---

## Strengths (Maintain These)

These patterns are strong and should be preserved as the codebase grows:

- **Zero `any` types** — Excellent TypeScript discipline across the entire codebase. Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`.
- **WCAG2AA enforcement in CI** — pa11y-ci with axe runner tests 7 routes on every build. Skip links, aria-labels, semantic HTML, focus outlines (`outline-2 outline-offset-2 outline-blue-600`) all present.
- **Graceful degradation** — Weather widget fails silently (non-essential). Geolocation denial handled cleanly. Missing coordinates produce a console warning, not a crash.
- **Proper hook cleanup** — `AbortController` for fetch cancellation, intervals cleared on unmount, localStorage writes wrapped in try/catch.
- **iframe-based maps** — Avoids Leaflet/MapLibre CSS conflicts with Tailwind. Correct architectural decision per WCAG guidance.
- **Mobile-first responsive design** — Tailwind breakpoints (`sm:`, `lg:`) used consistently.
- **Clean CI/CD pipeline** — Reusable `ci.yml` workflow, production deploys on main, preview deploys on PRs with automatic URL comments.
- **Decoupled geocoding** — Addresses are source of truth. Nominatim API only re-geocodes changed addresses. Caching in `coordinates.generated.json` prevents redundant API calls.

---

## Code Review Findings

### 1. Data Layer & Scalability

**File:** `src/data/listings.ts` (794 lines)

| Issue | Impact | Threshold |
| --- | --- | --- |
| All 71 listings in a single TypeScript array | Hard to navigate, edit, review diffs | Painful at ~150 listings |
| No runtime data validation | Malformed phone, duplicate ID, bad category slip through silently | Risk grows with each new listing |
| No search indexing | `Directory.tsx` does 4× `toLowerCase().includes()` per listing per keystroke | Noticeable lag at ~300 listings |
| Coordinates default to `(0, 0)` if missing | Maps silently render at null island instead of failing visibly | Any missing geocode result |

**Current search pattern** (`Directory.tsx` lines 18–35):

```typescript
results = results.filter(
  (l) =>
    l.name.toLowerCase().includes(query) ||
    l.description.toLowerCase().includes(query) ||
    l.address.toLowerCase().includes(query) ||
    l.category.toLowerCase().includes(query),
);
```

This is fine for 71 listings but creates O(n × fields) work on every keystroke. The `useMemo` prevents redundant renders but not redundant string operations.

---

### 2. DRY Violations & Hardcoded Values

No app-wide constants file exists. Several values are repeated across multiple files:

| Value | Locations | Risk |
| --- | --- | --- |
| `mastapegs01@gmail.com` | Layout, About, Privacy, Terms, ListingDetail (5+ files) | Email change requires 5+ edits |
| Population `"30,000"` | Home.tsx (2 occurrences) | Stale data if population changes |
| Johnston coordinates `41.824, -71.516` | WeatherDisplay.tsx | Inconsistency if reused elsewhere |
| Route paths (`/directory`, `/about`, etc.) | Layout nav, Home links, Directory links | Route rename requires multi-file update |
| Focus outline classes | Every interactive element across all pages | Style change requires global find/replace |

**Fix:** A single `src/config.ts` exporting app-wide constants eliminates all of these.

---

### 3. Component Architecture

| Component | Lines | Concern |
| --- | --- | --- |
| **Home.tsx** | 205 | Mixes 6 responsibilities: hero/search, stats cards, category grid, about section, mission banner, emergency help. Should extract reusable sections. |
| **ListingMap.tsx** | 149 | Builds Leaflet HTML as concatenated template literal strings (lines 42–68). Works correctly but hard to read/maintain. Script tag splitting (`"<" + "/script"`) is a maintenance smell. |
| **Directory.tsx** | 172 | View toggle button styles duplicated in className conditionals (lines 54–69). Map vs. list rendering is a single large conditional block. |
| **ListingDetail.tsx** | 121 | Well-structured. Phone regex `replace(/[^\d+]/g, "")` is fragile for formatted numbers like `(401) 944-3343`. |

**Positive patterns to keep:**
- Layout.tsx is clean and properly sized (95 LOC)
- WeatherDisplay.tsx has excellent API integration patterns (AbortController, interval cleanup, role="status")
- useUserLocation.ts is a clean, well-scoped custom hook

---

### 4. Error Handling & Resilience

| Gap | Impact | Severity |
| --- | --- | --- |
| No React error boundary | Child component crash = blank white screen | High |
| No 404 catch-all route | `/unknown-path` renders nothing | High |
| No coordinate validation at build time | Silent `(0, 0)` fallback breaks maps | Medium |
| Phone regex doesn't normalize | Invalid `tel:` links for some formats | Low |
| Leaflet CDN failure | Map iframe shows nothing, no fallback | Low |

---

### 5. Routing & Navigation

**File:** `src/App.tsx` (29 lines)

- Missing `<Route path="*">` catch-all for 404 pages
- No lazy loading — all 7 page components imported eagerly at top level
- Document titles set manually via `useEffect` in each page — if a developer forgets, the title shows the previous page's title
- Route paths are string literals scattered across components — no centralized route map

---

### 6. Performance

At current scale (~71 listings, ~30KB bundle), performance is not a problem. These become relevant as the app grows:

| Area | Current | At Scale |
| --- | --- | --- |
| Search | O(n) string matching, 4 fields | Add pre-built search index at ~200 listings |
| Bundle | All pages eager-loaded | Add `React.lazy()` code splitting at ~15 routes |
| Map rendering | `useMemo` rebuilds HTML on listing/location change | Fine for <100 markers; consider clustering at 200+ |
| Data loading | Static import of all listings | Consider chunked loading or API at 500+ listings |

---

### 7. Build & Infrastructure

| Area | Status | Gap |
| --- | --- | --- |
| ESLint | Flat config, jsx-a11y, react-hooks | Good |
| Prettier | Double quotes, semis, trailing commas | Good |
| TypeScript | Strict mode, all strict flags | Excellent |
| pa11y-ci | WCAG2AA, axe runner, 7 URLs | Good |
| Pre-commit hooks | None | No local enforcement of lint/format |
| Bundle analysis | None | No visibility into bundle size growth |
| Dependency updates | Manual | No Dependabot or Renovate configured |

---

## Industry Comparison

### How Johnston Compares to Leading Community Directories

| Feature | Johnston | findhelp.org | 211 Systems | Open Referral |
| --- | --- | --- | --- | --- |
| Search-first UX | Category grid first, search secondary | Keyword search is primary entry | Varies by state | N/A (data standard) |
| "Next Steps" guidance | Not present | Standout feature (what to bring, who to call) | Some implementations | Supported in HSDS |
| Data freshness signals | "Last Updated" site-wide date | Per-listing "verified" badges | Varies | `last_verified_on` field |
| Community submissions | Placeholder (Submit page) | Full pipeline with review | Phone/web intake | Spec supports it |
| Data model | Flat `Listing` interface | Organization → Services → Locations | HSDS-based | HSDS standard |
| Accessibility | WCAG2AA in CI | WCAG2AA | Varies | N/A |
| Maps | OpenStreetMap iframe embeds | Google Maps integration | Varies | N/A |
| Multi-language | Not present | Spanish + others | Phone interpretation | Spec supports it |

### Key Takeaways

1. **Johnston's accessibility posture is stronger than most 211 implementations** — WCAG2AA enforcement in CI is uncommon even among professional sites.
2. **"Next Steps" guidance is the biggest feature gap** — findhelp.org's competitive advantage. Adding per-listing actionable instructions (documents needed, eligibility, intake process) would significantly improve user outcomes.
3. **The flat data model works for now** — but the industry standard (Open Referral HSDS) uses Organization → Services → Locations. Planning for this structure avoids a painful migration later.
4. **Data freshness is the #1 trust killer** — "Last verified" dates per listing, not just site-wide, are what government webmasters and users look for.

---

## High-Level TODO List

### Tier 1: Foundation (Before Further Feature Growth)

_These address immediate technical debt and prevent bugs during expansion._

- [ ] **Create `src/config.ts` constants file** — Extract contact email, population, coordinates, route paths, and reusable Tailwind class strings. Update all 5+ files that reference hardcoded email.
- [ ] **Add React error boundary** — Wrap routes in `App.tsx` with an error boundary component that shows a user-friendly fallback instead of a blank screen.
- [ ] **Add 404 catch-all route** — Add `<Route path="*" element={<NotFound />} />` in `App.tsx`. Create a simple `NotFound.tsx` page.
- [ ] **Extract listing data to JSON** — Move the `listingData` array from `listings.ts` to a separate `listings.json` (or per-category JSON files). Keep types and coordinate-merging logic in `listings.ts`. This makes data editable without touching TypeScript and enables future migration to a CMS or API.
- [ ] **Split `Home.tsx` into sections** — Extract `HeroSearch`, `StatsSection`, `CategoryGrid`, and `MissionBanner` components. Keep `Home.tsx` as the composition root.
- [ ] **Normalize phone numbers at data load time** — Add a `normalizePhone()` utility that runs when listings are loaded, producing a clean `tel:` href. Prevents fragile regex in JSX.

### Tier 2: Scalability (Before Listings Exceed ~150)

_These prevent performance and maintainability problems as the directory grows._

- [ ] **Add data validation script** — Build-time script (like `geocode.ts`) that validates: unique IDs, valid categories, non-empty required fields, phone format, and coordinate existence. Run in CI alongside lint.
- [ ] **Add search indexing** — Pre-compute lowercase searchable strings at data load time (not on every keystroke). At 200+ listings, consider a lightweight client-side search library (e.g., Fuse.js or FlexSearch).
- [ ] **Add `React.lazy()` code splitting** — Lazy-load page components in `App.tsx` with `Suspense` fallback. Low effort, reduces initial bundle as pages are added.
- [ ] **Centralize document title management** — Create a `usePageTitle(title)` hook or use route-level metadata to set `document.title` consistently. Remove manual `useEffect` title-setting from each page.
- [ ] **Add pre-commit hooks** — Set up `husky` + `lint-staged` to run `eslint --fix` and `prettier --write` on staged files. Prevents CI failures from local commits.
- [ ] **Add coordinate build-time validation** — Fail the build (or emit a visible warning) if any listing has `(0, 0)` coordinates after geocoding. Prevents silent map failures.

### Tier 3: Feature Parity (Align with Industry Best Practices)

_These bring Johnston closer to findhelp.org / 211 quality and support government adoption._

- [ ] **Add "last verified" date per listing** — New optional field `lastVerified: string` on the `Listing` interface. Display on listing detail pages. Critical trust signal for government webmasters and users.
- [ ] **Add "Next Steps" guidance per listing** — New optional field `nextSteps: string[]` (e.g., "Bring photo ID", "Call to schedule intake"). This is findhelp.org's standout feature and the biggest UX gap.
- [ ] **Plan HSDS-compatible data model** — Design (don't implement yet) an Organization → Services → Locations structure that could replace the flat `Listing` model. Enables future interoperability with 211, Open Referral, and state resource databases.
- [ ] **Build community submission pipeline** — Replace the Submit page placeholder with a real form that creates review-pending entries. Include human review step before publishing. Stale data is the #1 risk for community directories.
- [ ] **Add bundle size monitoring** — Integrate `vite-plugin-bundle-analyzer` or `bundlesize` in CI to track and alert on bundle growth.
- [ ] **Explore multi-language support** — Research i18n approach (react-i18next or similar). Spanish is the priority second language for Johnston's demographics. Required for broader government adoption.

---

## Priority Sequencing

```
Tier 1 (Foundation)          Tier 2 (Scalability)         Tier 3 (Feature Parity)
─────────────────────        ────────────────────         ──────────────────────
config.ts constants    ──►   Data validation script  ──►  "Last verified" dates
Error boundary         ──►   Search indexing          ──►  "Next Steps" guidance
404 route              ──►   React.lazy() splitting   ──►  HSDS data model plan
Extract data to JSON   ──►   usePageTitle hook        ──►  Submission pipeline
Split Home.tsx         ──►   Pre-commit hooks         ──►  Bundle monitoring
Normalize phones       ──►   Coordinate validation    ──►  Multi-language
```

Tier 1 items are independent of each other and can be tackled in any order. Tier 2 items build on Tier 1 (e.g., data validation assumes data is in JSON). Tier 3 items are feature work that benefits from the clean foundation.

---

## Appendix: File Impact Map

Which files are affected by the most TODO items:

| File | Tier 1 | Tier 2 | Tier 3 | Total |
| --- | --- | --- | --- | --- |
| `src/data/listings.ts` | 2 | 2 | 2 | 6 |
| `src/App.tsx` | 2 | 1 | 0 | 3 |
| `src/pages/Home.tsx` | 1 | 1 | 0 | 2 |
| `src/pages/ListingDetail.tsx` | 1 | 0 | 2 | 3 |
| `src/components/Layout.tsx` | 1 | 0 | 0 | 1 |
| `package.json` | 0 | 1 | 2 | 3 |
| New: `src/config.ts` | 1 | 0 | 0 | 1 |
| New: `src/components/ErrorBoundary.tsx` | 1 | 0 | 0 | 1 |
| New: `src/pages/NotFound.tsx` | 1 | 0 | 0 | 1 |
