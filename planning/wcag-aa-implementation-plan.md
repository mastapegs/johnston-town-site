# WCAG AA Implementation Plan — Johnston Community Directory

## Overview

This plan outlines the steps to bring the Johnston Community Directory into
WCAG 2.1 Level AA conformance and add automated accessibility checks to CI.

---

## Current State Audit Summary

Audited all pages and components. Key findings:

| Issue                                  | Severity | Count | WCAG Criterion                |
| -------------------------------------- | -------- | ----- | ----------------------------- |
| Missing focus indicators               | CRITICAL | 8+    | 2.4.7 Focus Visible           |
| Missing skip-navigation link           | CRITICAL | 1     | 2.4.1 Bypass Blocks           |
| Color contrast failures                | HIGH     | 3-4   | 1.4.3 Contrast Minimum        |
| External link missing new-window alert | HIGH     | 1     | 2.4.4 Link Purpose In Context |
| Missing `aria-current` on active nav   | MEDIUM   | 1     | 1.3.1 Info and Relationships  |
| Missing `aria-label`s                  | MEDIUM   | 2-3   | 1.3.1 / 2.4.4                 |
| Weather display not labeled            | LOW      | 1     | 1.3.1 Info and Relationships  |

The site already does several things well: semantic HTML (`<nav>`, `<main>`,
`<dl>`), proper heading hierarchy, responsive mobile-first design, and
`lang="en"` on the root element.

---

## Phase 1: Code Fixes (Estimated: ~2-3 hours)

### 1.1 Add Skip Navigation Link

**File:** `src/components/Layout.tsx`
**WCAG:** 2.4.1 Bypass Blocks

Add a visually-hidden skip link as the first child of `<body>`/Layout that
becomes visible on focus, linking to `#main-content`. Add `id="main-content"`
to the `<main>` element.

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
>
  Skip to main content
</a>
```

### 1.2 Add Visible Focus Indicators to All Interactive Elements

**Files:** `Layout.tsx`, `Home.tsx`, `Directory.tsx`, `ListingDetail.tsx`
**WCAG:** 2.4.7 Focus Visible

Add `focus:outline-2 focus:outline-offset-2 focus:outline-blue-600` (or
similar) to every `<Link>`, `<NavLink>`, `<a>`, and `<button>` element.

Specific locations:

- **Layout.tsx**: NavLink elements (3)
- **Home.tsx**: "Browse the Directory" CTA button, category grid links
- **Directory.tsx**: Filter buttons ("All" + category buttons), listing card
  links
- **ListingDetail.tsx**: Back link, phone `tel:` link, website external link

### 1.3 Fix Color Contrast

**WCAG:** 1.4.3 Contrast Minimum (4.5:1 for normal text, 3:1 for large text)

| Element                      | Current         | Fix                            |
| ---------------------------- | --------------- | ------------------------------ |
| Inactive nav links           | `text-gray-600` | `text-gray-700` (ratio ~8.5:1) |
| Weather description text     | `text-gray-500` | `text-gray-600` (ratio ~5.7:1) |
| Active nav link (blue on bg) | `text-blue-600` | `text-blue-700` (ratio ~6.5:1) |

### 1.4 Add `aria-current="page"` to Active NavLink

**File:** `src/components/Layout.tsx`
**WCAG:** 1.3.1 Info and Relationships

React Router's `NavLink` supports `aria-current` natively — it sets
`aria-current="page"` by default when active. **Verify this is working** (it
should be automatic). If using a custom `className` function, ensure
`aria-current` is not being overridden.

### 1.5 Add `aria-label` Attributes

**WCAG:** 1.3.1 / 2.4.4 / 2.4.9

| Element                 | File                | Label                                                          |
| ----------------------- | ------------------- | -------------------------------------------------------------- |
| `<nav>`                 | `Layout.tsx`        | `aria-label="Main navigation"`                                 |
| Weather display `<div>` | `Layout.tsx`        | `aria-label="Current weather in Johnston"`                     |
| Phone `<a href="tel">`  | `ListingDetail.tsx` | `aria-label="Call {listing.name}"`                             |
| External website link   | `ListingDetail.tsx` | `aria-label="Visit {listing.name} website (opens in new tab)"` |

### 1.6 Add External Link Indicator

**File:** `src/pages/ListingDetail.tsx`
**WCAG:** 2.4.4 Link Purpose In Context

For the website link that opens in a new tab (`target="_blank"`):

- Add `rel="noopener noreferrer"` (likely already present, verify)
- Add visually-hidden text: `<span className="sr-only">(opens in new tab)</span>`
- Or use `aria-label` as described in 1.5

### 1.7 Announce Route Changes to Screen Readers

**File:** `src/App.tsx` or new utility
**WCAG:** 2.4.2 Page Titled / 1.3.1 Info and Relationships

React Router client-side navigation does not trigger screen reader
announcements. Options:

- **Option A (simple):** Update `document.title` on each route change using a
  small `useEffect` in each page component or a route-level wrapper.
- **Option B (better):** Add a visually-hidden live region
  (`aria-live="polite"`) that announces the new page title on navigation.

Recommend **Option A** as the minimal approach — each page sets
`document.title` in a `useEffect`.

---

## Phase 2: CI/CD Accessibility Checks

### 2.1 Add `eslint-plugin-jsx-a11y` (Static Analysis)

**What it does:** Catches accessibility issues in JSX at lint time — missing
alt text, invalid ARIA props, missing labels, non-interactive element handlers,
etc. Runs as part of existing `npm run lint`.

**Install:**

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

**Configure** in `eslint.config.js`:

```js
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended, // or .strict for stricter rules
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
```

**CI integration:** Already covered — `ci.yml` runs `npm run lint`, so any
jsx-a11y violations will fail the build automatically.

### 2.2 Add `pa11y-ci` with `axe` runner (Runtime Testing)

**What it does:** Builds the site, serves it locally, then crawls pages with a
headless browser and runs axe-core against the rendered DOM. This catches
issues that static analysis misses (actual color contrast, DOM structure,
ARIA state).

**Install:**

```bash
npm install --save-dev pa11y-ci
```

**Configure** `.pa11yci` in project root:

```json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe"],
    "timeout": 10000,
    "wait": 1000
  },
  "urls": [
    "http://localhost:4173/",
    "http://localhost:4173/directory",
    "http://localhost:4173/directory/johnston-town-hall",
    "http://localhost:4173/about",
    "http://localhost:4173/submit"
  ]
}
```

**Add npm script** to `package.json`:

```json
"a11y": "npm run build && npm run preview -- --host 0.0.0.0 &  sleep 3 && pa11y-ci && kill %1"
```

Or a cleaner approach using `start-server-and-test`:

```bash
npm install --save-dev start-server-and-test
```

```json
"a11y": "start-server-and-test preview http://localhost:4173 pa11y-ci"
```

### 2.3 Add Accessibility Job to CI Workflow

**File:** `.github/workflows/ci.yml`

Add a new job alongside `lint` and `typecheck`:

```yaml
accessibility:
  name: Accessibility (WCAG AA)
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: npm
    - run: npm ci
    - run: npm run build
    - run: npx start-server-and-test preview http://localhost:4173 pa11y-ci
```

This will:

- Run on every PR (via `pull-request.yml` which calls `ci.yml`)
- Run on every push to `main` (via `deploy.yml` which calls `ci.yml`)
- **Fail the build** if any WCAG AA violation is detected

---

## Phase 3: Ongoing / Manual Checks

These items can't be fully automated but should be part of your process:

| Check                           | How                                                             |
| ------------------------------- | --------------------------------------------------------------- |
| Keyboard navigation flow        | Tab through every page, verify logical order                    |
| Screen reader testing           | Test with VoiceOver (Mac) or NVDA (Windows)                     |
| Zoom to 200%                    | Verify no content is clipped or broken                          |
| Touch target size (44x44px min) | Verify buttons/links are large enough on mobile                 |
| Reduced motion                  | If animations are added later, respect `prefers-reduced-motion` |

---

## Implementation Order

| Step | Task                                 | Blocks CI?                          |
| ---- | ------------------------------------ | ----------------------------------- |
| 1    | Add `eslint-plugin-jsx-a11y`         | Yes — will flag issues in lint      |
| 2    | Fix all lint a11y violations         | Unblocks lint                       |
| 3    | Add skip-nav link                    | No                                  |
| 4    | Add focus indicators everywhere      | No                                  |
| 5    | Fix color contrast                   | No                                  |
| 6    | Add aria-labels and aria-current     | No                                  |
| 7    | Add external link indicators         | No                                  |
| 8    | Add route change announcements       | No                                  |
| 9    | Add `pa11y-ci` + CI workflow job     | Yes — will fail on remaining issues |
| 10   | Verify pa11y-ci passes clean         | Unblocks CI                         |
| 11   | Manual keyboard + screen reader test | N/A                                 |

---

## Tools & Resources

- [axe-core](https://github.com/dequelabs/axe-core) — Accessibility engine
  powering pa11y and browser extensions
- [pa11y-ci](https://github.com/pa11y/pa11y) — CLI accessibility testing,
  CI-friendly
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
  — Static JSX accessibility linting
- [CivicActions: GitHub Actions + pa11y-ci](https://accessibility.civicactions.com/posts/automated-accessibility-testing-leveraging-github-actions-and-pa11y-ci-with-axe)
  — Guide on CI integration
- [web.dev: Accessibility auditing React](https://web.dev/articles/accessibility-auditing-react)
  — Google's guide to axe + eslint-plugin-jsx-a11y in React
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1&levels=aaa)
  — Full criteria reference filtered by level
