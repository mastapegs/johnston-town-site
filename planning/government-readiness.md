# Johnston Community Directory — Government & Institutional Readiness

_Created: March 2026_\
_Last updated: March 2026_

## Purpose

This document tracks what's needed for the Johnston Community Directory to be **linkable from official government and institutional websites** — such as the Town of Johnston website, Rhode Island state resource pages, or partner nonprofits.

Government webmasters evaluate external links on criteria that go beyond features and content. They care about **legitimacy, liability, accuracy guarantees, and operational reliability**. This document addresses those concerns directly.

> **See also:** [growth-roadmap.md](./growth-roadmap.md) for feature development, [vision.md](./vision.md) for project direction.

---

## Current State

**Tier 1 and Tier 2 deliverables are complete.** The site now has the legal and operational infrastructure needed to request government links, plus trust-building signals like error reporting, a "Last Updated" date, and a data freshness commitment. Tier 3 items remain for further professional polish.

| Requirement                             | Status  | Risk Level |
| --------------------------------------- | ------- | ---------- |
| Privacy Policy                          | ✅ Done | —          |
| Terms of Service / Disclaimer           | ✅ Done | —          |
| Data accuracy disclaimer                | ✅ Done | —          |
| "Not an official government site" label | ✅ Done | —          |
| Error reporting mechanism               | ✅ Done | —          |
| Webmaster contact information           | ✅ Done | —          |
| Multi-language support                  | Planned | Medium     |
| Data freshness commitment               | ✅ Done | —          |
| Continuity / succession plan            | Missing | Low        |
| Uptime / hosting reliability            | Netlify | Low        |
| WCAG2AA accessibility                   | ✅ Done | —          |
| Mobile responsiveness                   | ✅ Done | —          |

---

## How a Government Webmaster Would Evaluate This Site

Government websites follow link policies that generally require external links to be:

1. **Relevant** — Directly useful to constituents ✅
2. **Accurate** — Information is current and verifiable ✅ (freshness commitment + error reporting added)
3. **Non-commercial** — Not primarily an advertising or revenue vehicle ✅
4. **Accessible** — Meets WCAG standards ✅
5. **Legally safe** — Won't create liability for the linking agency ✅ (Privacy Policy, Terms of Service, disclaimers added)
6. **Maintained** — Evidence of active upkeep ✅ ("Last updated" date in footer)
7. **Transparent** — Clear about who runs it and what it is ✅ (community project disclaimer, contact email added)

---

## Deliverables

### Tier 1 — Blockers (Must-Have Before Requesting Government Links)

- [x] **Add a Privacy Policy page** _(Done — PR #21)_
  - Route: `/privacy`, linked from footer
  - States: no cookies, no analytics, no personal data collection, no tracking
  - Discloses third-party services (OpenStreetMap, Open Meteo)
  - Notes future analytics policy update if Plausible/Fathom is added

- [x] **Add a Terms of Service / Disclaimer page** _(Done — PR #21)_
  - Route: `/terms`, linked from footer
  - Covers: "as-is" disclaimer, listing accuracy caveats, "contact services directly" guidance, limitation of liability, not a government service

- [x] **Add a visible "community project" disclaimer** _(Done — PR #21)_
  - Footer text on every page: _"This is an independent community project. It is not affiliated with or endorsed by the Town of Johnston or any government agency."_

- [x] **Add webmaster contact information** _(Done — PR #21)_
  - Email (`mastapegs01@gmail.com`) added to footer and About page via `mailto:` link

### Tier 2 — Strongly Recommended (Builds Confidence)

- [x] **Add an error reporting mechanism** _(Done)_
  - "Report an issue" link on each `ListingDetail` page
  - Links to GitHub Issues with pre-filled title, listing name, and page URL
  - Uses `listing-correction` label for easy triage
  - Notes:

- [x] **Add a "Last Updated" date to the site footer** _(Done)_
  - Shows the site is actively maintained
  - Auto-generated from the last git commit date at build time via Vite `define`
  - Displays in footer on every page (e.g., "Last updated March 22, 2026")
  - Notes:

- [x] **Document a data freshness commitment** _(Done)_
  - "Data Freshness" section added to the About page
  - States: "All listings are reviewed at least every 6 months"
  - References the "Report an issue" link for community-driven corrections
  - Notes:

### Tier 3 — Nice to Have (Professional Polish)

- [ ] **Document a continuity plan**
  - Not necessarily public-facing, but worth having internally
  - What happens to the site if the creator is unavailable for an extended period?
  - Options: open-source the repo, hand off to a trusted community member, set up auto-renewal on domain/hosting
  - A government partner may ask about this informally
  - Notes:

- [ ] **Add a "suggested disclaimer" for linking sites**
  - Provide ready-made text that government webmasters can copy-paste alongside their link:
  - Example: _"The Johnston Community Directory is a community resource built and maintained by a resident volunteer. It is not an official Town of Johnston service. Listings are verified at the time of inclusion but may become outdated. Always contact services directly to confirm hours and availability."_
  - Could live on the About page or in a separate "For Partners" section
  - Notes:

---

## What the Site Already Does Well (Government Perspective)

These are strengths to highlight when making the case for linking:

- **Hyper-local focus** — Johnston-only; no regional noise or irrelevant results
- **No ads, no tracking, no data collection** — Zero conflict of interest
- **WCAG2AA enforced in CI** — More rigorous accessibility testing than most .gov sites
- **Prominent 211 link** — Responsible safety net for emergencies
- **Manually curated** — Every listing hand-researched, not algorithmic scraping
- **Free forever** — No paywall, no premium tiers for residents
- **Fast and mobile-friendly** — Sub-second loads, works on any device
- **Transparent about scope** — "Built by a neighbor" framing sets honest expectations

---

## Outreach Strategy (After Deliverables Are Complete)

Once Tier 1 items are done, the site is ready for outreach. Potential government and institutional partners:

| Target                                   | Contact Point                     | Link Placement                           |
| ---------------------------------------- | --------------------------------- | ---------------------------------------- |
| Town of Johnston website                 | Webmaster / Town Manager's office | "Community Resources" or "Helpful Links" |
| Johnston Senior Center                   | Director                          | Resource handout / website               |
| Johnston Public Library                  | Library Director                  | Community bulletin / website links       |
| Johnston School Department               | Communications office             | Parent resource page                     |
| RI Secretary of State (civic engagement) | Digital team                      | Community resources section              |
| United Way of Rhode Island / 211 RI      | Partner relations                 | Complementary local resource             |
| Local nonprofits (food banks, shelters)  | Program directors                 | Cross-linking                            |

**Pitch framing:** "We're a free, accessible, ad-free community directory for Johnston. We'd like to be listed as a community resource on your site. Here's a suggested description you can use."

---

## Review Schedule

- Review this document before any government outreach
- Update the requirements table as items are completed
- Re-evaluate after analytics are added (Phase 2C) — usage data strengthens the case

---

_See also: [growth-roadmap.md](./growth-roadmap.md) | [vision.md](./vision.md) | [community-site-comparison.md](./community-site-comparison.md)_
