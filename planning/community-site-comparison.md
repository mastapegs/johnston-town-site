# Community Resource Directory Sites — Comparison & Analysis

_Research conducted March 2026 to inform the Johnston Community Directory roadmap._

---

## Sites Researched

| Site                                 | Type                              | Scale                                                 | URL                         |
| ------------------------------------ | --------------------------------- | ----------------------------------------------------- | --------------------------- |
| **findhelp.org** (fka Aunt Bertha)   | National social-care network      | Every US ZIP code                                     | findhelp.org                |
| **211 (United Way)**                 | National helpline + web directory | State/county-level (e.g., 211virginia.org, wa211.org) | 211.org                     |
| **James City County Housing Portal** | County resource hub               | Single county (~77k pop.)                             | jamescitycountyva.gov       |
| **Windsor, CO**                      | Municipal website (CivicPlus)     | Single town (~47k pop.)                               | windsorgov.com              |
| **Town of Sherborn, MA**             | Small-town municipal site         | Single town (~4k pop.)                                | sherbornma.org              |
| **Senior Resource Connect MI**       | Niche directory (seniors)         | State-level (Michigan)                                | seniorresourceconnectmi.org |
| **Johnston Community Directory**     | Hyper-local resource guide        | Single town (~30k pop.)                               | _our site_                  |

---

## Feature Comparison Matrix

| Feature                            | findhelp | 211 | James City |       Windsor       | Sherborn | Sr. Resource MI | **Johnston (ours)** |
| ---------------------------------- | :------: | :-: | :--------: | :-----------------: | :------: | :-------------: | :-----------------: |
| **Search / keyword lookup**        |    ✅    | ✅  |     ✅     |         ✅          |    ✅    |       ✅        |         ❌          |
| **Category browsing**              |    ✅    | ✅  |     ✅     |         ✅          |    ✅    |       ✅        |         ✅          |
| **ZIP-code / location filter**     |    ✅    | ✅  |     —      |          —          |    —     |       ✅        |   — (single town)   |
| **Map / geolocation view**         |    ✅    | ✅  |     ✅     |         ✅          |    —     |        —        |         ✅          |
| **Detailed listing cards**         |    ✅    | ✅  |     ✅     |         ✅          |    ✅    |       ✅        |         ✅          |
| **"Next steps" / how-to-access**   |    ✅    |  —  |     —      |          —          |    —     |        —        |         ❌          |
| **Community submission / suggest** |    ✅    | ✅  |     —      |          —          |    —     |        —        |  🔜 (placeholder)   |
| **Claimed / verified badge**       |    ✅    |  —  |     —      |          —          |    —     |        —        |         ❌          |
| **Mobile-responsive**              |    ✅    | ✅  |     ✅     |         ✅          |    ✅    |       ✅        |         ✅          |
| **Accessibility (WCAG)**           |    ✅    | ✅  |     ✅     | ✅ (dyslexia fonts) |    ✅    |       ✅        |         ✅          |
| **Multi-language / translation**   |    ✅    | ✅  |     —      |          —          |    —     |        —        |         ❌          |
| **Event calendar**                 |    —     |  —  |     ✅     |         ✅          |    ✅    |        —        |         ❌          |
| **News / announcements**           |    —     |  —  |     ✅     |         ✅          |    ✅    |        —        |         ❌          |
| **Online forms / bill pay**        |    —     |  —  |     ✅     |         ✅          |    ✅    |        —        |         ❌          |
| **Live chat / 24-7 helpline**      |    —     | ✅  |     —      |          —          |    —     |        —        |         ❌          |
| **Analytics / impact tracking**    |    ✅    | ✅  |     —      |          —          |    —     |        —        |         ❌          |
| **Referral / intake workflow**     |    ✅    | ✅  |     —      |          —          |    —     |        —        |         ❌          |
| **Weather widget**                 |    —     |  —  |     —      |          —          |    —     |        —        |         ✅          |
| **Shareable filtered URLs**        |    ✅    | ✅  |     —      |          —          |    —     |       ✅        |         ✅          |

---

## What These Sites Do Very Well

### 1. Search Is King

Every major community resource site leads with a prominent search bar. findhelp.org and 211 both open with a single input asking "What do you need help with?" or "Enter your ZIP code." This is the #1 gap in Johnston's current UX — users who don't know which category to pick have no fallback.

**Takeaway for Johnston:** Add a simple keyword search that filters listings by name, description, and category. Even a client-side filter over 11 listings would be a big UX win.

### 2. "Next Steps" Reduce Friction

findhelp.org's standout feature is the **"Next Steps" tab** on every listing — it tells you _exactly_ what to do: "Call this number," "Bring these documents," "Walk in Monday–Friday 9–5." This turns a passive directory into an actionable guide.

**Takeaway for Johnston:** Add an optional `nextSteps` field to listings (e.g., "Call ahead to schedule," "No appointment needed," "Bring proof of Johnston residency").

### 3. Verified / Claimed Badges Build Trust

findhelp.org shows a "Claimed" badge when an organization has reviewed its own listing. 211 databases are updated annually by professional content specialists. Both convey **trust signals** that the information is current.

**Takeaway for Johnston:** The About page already emphasizes manual verification — surface that trust _on the listing cards themselves_ (e.g., "Verified March 2026"). This is low-effort, high-impact.

### 4. Maps Make Addresses Tangible

211 and municipal sites like Windsor and James City County embed interactive maps. For a local directory where people need to physically visit services, a map transforms an address string into a visual answer to "How do I get there?"

**Takeaway for Johnston:** Embed a simple map (Google Maps embed or Leaflet with OpenStreetMap) on the ListingDetail page. Even a static Google Maps link per listing would help.

### 5. Accessibility Is Non-Negotiable

Windsor offers dyslexia-friendly fonts and adjustable text sizes. 211 sites support screen readers, ARIA landmarks, and high-contrast modes. WCAG AA compliance is the baseline for government-adjacent sites.

**Takeaway for Johnston:** Audit with Lighthouse and axe. Ensure proper heading hierarchy, alt text, focus indicators, and sufficient color contrast. Consider a font-size toggle.

### 6. Multi-Channel Access Meets People Where They Are

211 offers phone, text, chat, and web. findhelp.org has a mobile app. James City County lets residents pay bills and submit forms online.

**Takeaway for Johnston:** Not all of this is relevant at our scale, but ensuring the site is **fully usable on mobile** (it already is) and adding a "Call 211" prompt for after-hours or emergency needs would extend the site's utility without building new infrastructure.

### 7. Community Submission Pipelines Keep Data Fresh

findhelp.org lets anyone "Suggest a Program" (added within 2 business days). 211 accepts submissions from agencies. Stale data is the #1 killer of community directories.

**Takeaway for Johnston:** The Submit page placeholder is already planned — prioritize it. A simple form (name, category, address, phone, description) that sends an email or creates a GitHub issue would work for the current scale.

### 8. Category Depth vs. Breadth

211 covers 12+ top-level categories with deep subcategories. findhelp.org uses tags for granular filtering. Johnston has 7 categories — appropriate for the curated launch, but some (Healthcare, Mental Health) have zero listings.

**Takeaway for Johnston:** Fill the empty categories before adding new ones. Consider merging Healthcare and Mental Health temporarily if listings remain sparse, or add a "Coming Soon" indicator so users aren't disappointed by empty results.

---

## Where Johnston Already Stands Out

| Strength                                  | Why It Matters                                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Hyper-local focus**                     | National platforms drown small towns in regional results. Johnston's directory is _only_ Johnston — no noise.      |
| **Manually verified listings**            | Every entry is researched by a real person, not scraped. This matches the trust model of 211 without the overhead. |
| **Clean, fast, modern UI**                | React + Vite + Tailwind delivers sub-second loads. Many municipal sites are bloated WordPress installations.       |
| **Category-filtered shareable URLs**      | `?category=Food%20Assistance` is bookmarkable and shareable — a feature some larger sites lack.                    |
| **Community-first mission**               | No ads, no paid placements, no login walls. This aligns with 211's ethos but without the bureaucratic overhead.    |
| **Open-source / version-controlled data** | Listings in TypeScript mean full audit trail via git. No opaque database.                                          |
| **Weather widget**                        | A small but unique local touch that no comparable resource directory offers.                                       |

---

## Prioritized Recommendations

Based on what the best sites do well and where Johnston has gaps:

### High Priority (Next Sprint)

1. **Add keyword search** — Client-side filter across listing name + description + category. Every comparable site has this.
2. **Add "Verified" date badge to listing cards** — Surface the trust that's already built into the curation process.
3. **Fill empty categories** — Healthcare and Mental Health currently show zero results. Add at least 2–3 listings each or add "coming soon" messaging.
4. ~~**Accessibility audit**~~ — ✅ Done. WCAG2AA enforced via pa11y-ci with axe runner in CI. Skip-to-main link, aria-labels, focus outlines, and contrast guidelines all in place.

### Medium Priority (Phase 2)

5. **Add "Next Steps" to listings** — Optional field: what should someone do to access this service?
6. ~~**Embed maps on listing detail pages**~~ — ✅ Done. OpenStreetMap iframe embeds on both listing detail pages and directory map view, with geocoded coordinates.
7. **Build the Submit form** — Simple form → email notification. Keeps data fresh as the community grows.
8. **Add a "Need immediate help?" banner** — Link to 211 and local emergency numbers. Responsible safety net.

### Lower Priority (Phase 3+)

9. **Event calendar** — Municipal sites excel here; consider adding local government meetings, food pantry schedules.
10. **Multi-language support** — Johnston has a growing multilingual population; even Spanish would expand reach.
11. **Analytics / usage tracking** — Understand which categories get the most traffic to guide future content.
12. **PWA / offline support** — Allow the site to work offline for users with unreliable internet.

---

## Sources

- [findhelp.org — Social Care Network](https://company.findhelp.com/)
- [211 Virginia — Community Resources](https://211virginia.org/community-resources/)
- [Washington 211 — Resource Directory](https://search.wa211.org/)
- [CivicPlus — Inspiring City Website Designs](https://www.civicplus.com/blog/ce/six-inspiring-city-website-designs/)
- [ConcreteCMS — Maximizing Municipal Website Impact](https://www.concretecms.com/about/blog/web-design/municipal-web-design-that-engages-and-informs)
- [Town Web Design — Best City Websites](https://townweb.com/blog/best-city-websites/)
- [Seahawk Media — Best Municipal Website Designs 2025](https://seahawkmedia.com/wordpress/best-municipal-and-state-website-designs/)
- [FreshySites — 17 Best Municipal & State Websites](https://freshysites.com/blog/best-municipal-state-websites/)
- [Senior Resource Connect MI](https://seniorresourceconnectmi.org/resource-directory/)
- [UX Magazine — Seven UX Best Practices of Community Design](https://uxmag.com/articles/seven-ux-best-practices-of-community-design)
- [GeoDirectory — How to Build a Neighborhood Directory](https://wpgeodirectory.com/how-to-build-neighborhood-directory-website/)
