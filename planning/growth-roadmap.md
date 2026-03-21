# Johnston Community Directory — Growth Roadmap

_Last reviewed: March 2026_

## Current State (Baseline)

| Metric              | Value                                |
| ------------------- | ------------------------------------ |
| **Total listings**  | ~65                                  |
| **Categories**      | 9 (all populated)                    |
| **Tech stack**      | React 19, Vite 8, Tailwind v4, TS   |
| **Accessibility**   | WCAG2AA enforced via pa11y-ci in CI  |
| **Deployment**      | Netlify via GitHub Actions           |
| **Search**          | Client-side keyword + category filter with shareable URLs |
| **Maps**            | OpenStreetMap iframe embeds (directory + detail pages)    |
| **Community input** | Not yet (Submit page is placeholder) |

### Listings by Category

| Category                   | Count | Status     |
| -------------------------- | ----- | ---------- |
| Childcare                  | 15    | Strong     |
| Schools                    | 10    | Strong     |
| Parks & Recreation         | 9     | Good       |
| Food Assistance            | 7     | Good       |
| Healthcare & Mental Health | 7     | Good       |
| Municipal Services         | 7     | Good       |
| Senior Services            | 6     | Good       |
| Shelters                   | 4     | Adequate   |
| Entertainment              | 3     | Needs work |

---

## Strengths (What's Working)

- **Sub-second load times** — React + Vite outperforms WordPress/CivicPlus municipal sites
- **Automated WCAG2AA enforcement** — More rigorous than most professional municipal sites
- **Shareable filtered URLs** — `?q=food&category=Healthcare` is bookmarkable; some 211 sites lack this
- **Hyper-local focus** — No regional noise; Johnston-only is the moat
- **"Built by a Neighbor" trust signal** — Authentic, not corporate
- **Infrastructure ahead of content** — Platform is ready for 500+ listings
- **211 emergency banner** — Responsible safety net on the homepage
- **All 9 categories populated** — Phase 1 goal of no empty categories is met

---

## Deliverables Checklist

Instructions for LLM agents: Mark items `[x]` when the deliverable is fully implemented, tested, and merged. Add the completion date in the Notes column. Do not mark partial work as complete.

### Phase 2A — Trust & Utility (High Impact, Low Effort)

- [ ] **Add "Verified" date badge to listing cards**
  - Display "Verified [month] [year]" on each listing card in the directory and detail views
  - Add a `verified` or `lastVerified` date field to the `Listing` interface
  - Populate for all existing listings with the current date as baseline
  - Notes:

- [ ] **Add "Next Steps" field to key listings**
  - Add optional `nextSteps` string field to the `Listing` interface
  - Display on `ListingDetail` page when present
  - Populate for at least 15 essential-services listings (food banks, shelters, healthcare, senior services)
  - Examples: "Call ahead to schedule", "No appointment needed", "Bring photo ID and proof of Johnston residency"
  - Notes:

- [ ] **Build the Submit form**
  - Replace the placeholder `Submit.tsx` with a working form
  - Fields: name, category (dropdown), address, phone, website (optional), hours (optional), description, submitter email
  - Form should create a GitHub issue via the GitHub API, or send an email notification, or use Netlify Forms
  - Include a confirmation message after submission
  - Does NOT auto-publish — submissions are reviewed before being added
  - Notes:

### Phase 2B — Content Depth (Medium Effort, High Value)

- [ ] **Expand Entertainment category to 8+ listings**
  - Add restaurants, local shops, arts venues, movie theaters, bowling alleys, etc.
  - Consider renaming to "Dining & Entertainment" or splitting into separate categories if content justifies it
  - Notes:

- [ ] **Audit and add hours of operation**
  - Review all ~65 listings for missing `hours` field
  - Research and add hours for at least 80% of listings
  - Notes:

- [ ] **Add "Need Immediate Help?" banner to directory page**
  - Similar to homepage 211 banner — link to 211 and local emergency numbers
  - Should be visible but not intrusive (e.g., a subtle banner at top of directory)
  - Notes:

### Phase 2C — Reach & Discovery (Medium Effort)

- [ ] **Add basic privacy-respecting analytics**
  - Integrate Plausible, Fathom, or Netlify Analytics
  - Track: page views, top categories, search queries, most-viewed listings
  - No cookies, no personal data collection — aligns with "no data collection" principle
  - Notes:

- [ ] **Add Spanish language support for UI chrome**
  - Translate navigation, labels, category names, button text, and placeholder text
  - Add a language toggle (EN/ES) in the header
  - Listing content remains English-only initially; UI chrome is the priority
  - Notes:

- [ ] **SEO and meta tags**
  - Add meta descriptions, Open Graph tags, and structured data (LocalBusiness schema) for listings
  - Ensure each listing detail page has unique, descriptive `<title>` and `<meta description>`
  - Notes:

### Phase 3 — Community Engagement (Higher Effort)

- [ ] **Event calendar**
  - Add a calendar page showing local government meetings, food pantry schedules, community events
  - Could be a simple list view sorted by date, or a month/week calendar component
  - Consider sourcing from the town's existing calendar if available
  - Notes:

- [ ] **Listing "freshness" tracking**
  - Track when each listing was last verified
  - Flag listings older than 6 months for re-verification
  - Display freshness indicator on cards (e.g., green = <3 months, yellow = 3-6 months, red = >6 months)
  - Notes:

- [ ] **PWA / offline support**
  - Add service worker for offline access to cached listing data
  - Useful for users with unreliable internet accessing the directory on mobile
  - Notes:

- [ ] **"Claimed" badge for business-verified listings**
  - Allow organizations to claim their listing and confirm details are accurate
  - Requires an authentication or verification flow (email-based is simplest)
  - Displays a distinct badge separate from the editor-verified badge
  - Notes:

---

## Competitive Benchmarks

How Johnston stacks up against comparable sites. Update as features ship.

| Feature                       | findhelp.org | 211  | Windsor, CO | SACRD (San Antonio) | **Johnston** |
| ----------------------------- | :----------: | :--: | :---------: | :-----------------: | :----------: |
| Keyword search                |      ✅      |  ✅  |     ✅      |         ✅          |      ✅      |
| Category browsing             |      ✅      |  ✅  |     ✅      |         ✅          |      ✅      |
| Map view                      |      ✅      |  ✅  |     ✅      |         ✅          |      ✅      |
| Detailed listing pages        |      ✅      |  ✅  |     ✅      |         ✅          |      ✅      |
| Shareable filtered URLs       |      ✅      |  ✅  |      —      |          —          |      ✅      |
| Mobile-responsive             |      ✅      |  ✅  |     ✅      |         ✅          |      ✅      |
| WCAG accessibility (CI)       |      ✅      |  ✅  |     ✅      |          —          |      ✅      |
| Weather widget                |      —       |  —   |      —      |          —          |      ✅      |
| 211 emergency link            |      —       |  ✅  |      —      |          —          |      ✅      |
| "Verified" badge              |      ✅      |  —   |      —      |          —          |      ❌      |
| "Next steps" / how-to-access  |      ✅      |  —   |      —      |          —          |      ❌      |
| Community submission form     |      ✅      |  ✅  |      —      |         ✅          |      ❌      |
| Multi-language                |      ✅      |  ✅  |      —      |         ✅          |      ❌      |
| Event calendar                |      —       |  —   |     ✅      |          —          |      ❌      |
| Analytics                     |      ✅      |  ✅  |      —      |          —          |      ❌      |
| "Claimed" org badge           |      ✅      |  —   |      —      |          —          |      ❌      |
| SEO / structured data         |      ✅      |  ✅  |     ✅      |         ✅          |      ❌      |

_Update the Johnston column from ❌ to ✅ as deliverables are completed._

---

## Growth Targets

| Milestone                         | Target    | Status  |
| --------------------------------- | --------- | ------- |
| All categories populated          | Phase 1   | ✅ Done |
| 50+ verified listings             | Phase 1   | ✅ Done (65) |
| Keyword search                    | Phase 1   | ✅ Done |
| Map views                         | Phase 1   | ✅ Done |
| WCAG2AA CI enforcement            | Phase 1   | ✅ Done |
| 100+ verified listings            | Phase 2   | Pending |
| Community submission form live    | Phase 2   | Pending |
| "Verified" badges on all listings | Phase 2   | Pending |
| Spanish UI translation            | Phase 2   | Pending |
| Analytics integrated              | Phase 2   | Pending |
| Event calendar                    | Phase 3   | Pending |
| 200+ verified listings            | Phase 3   | Pending |
| PWA / offline support             | Phase 3   | Pending |

---

## Review Schedule

This roadmap should be reviewed and updated:
- After each phase milestone is reached
- When a new competitive feature is observed in comparable sites
- Quarterly at minimum to reassess priorities

---

_See also: [vision.md](./vision.md) | [community-site-comparison.md](./community-site-comparison.md)_
