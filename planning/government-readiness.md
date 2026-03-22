# Johnston Community Directory — Government & Institutional Readiness

_Created: March 2026_

## Purpose

This document tracks what's needed for the Johnston Community Directory to be **linkable from official government and institutional websites** — such as the Town of Johnston website, Rhode Island state resource pages, or partner nonprofits.

Government webmasters evaluate external links on criteria that go beyond features and content. They care about **legitimacy, liability, accuracy guarantees, and operational reliability**. This document addresses those concerns directly.

> **See also:** [growth-roadmap.md](./growth-roadmap.md) for feature development, [vision.md](./vision.md) for project direction.

---

## Current State

The site is technically strong (WCAG2AA, fast, mobile-responsive, well-organized) but lacks the **legal and operational infrastructure** a government entity would expect before linking to it.

| Requirement                             | Status  | Risk Level |
| --------------------------------------- | ------- | ---------- |
| Privacy Policy                          | Missing | High       |
| Terms of Service / Disclaimer           | Missing | High       |
| Data accuracy disclaimer                | Missing | High       |
| "Not an official government site" label | Missing | Medium     |
| Error reporting mechanism               | Missing | Medium     |
| Webmaster contact information           | Missing | Medium     |
| Multi-language support                  | Planned | Medium     |
| Data freshness commitment               | Planned | Medium     |
| Continuity / succession plan            | Missing | Low        |
| Uptime / hosting reliability            | Netlify | Low        |
| WCAG2AA accessibility                   | ✅ Done | Low        |
| Mobile responsiveness                   | ✅ Done | Low        |

---

## How a Government Webmaster Would Evaluate This Site

Government websites follow link policies that generally require external links to be:

1. **Relevant** — Directly useful to constituents ✅
2. **Accurate** — Information is current and verifiable ⚠️ (no freshness dates yet)
3. **Non-commercial** — Not primarily an advertising or revenue vehicle ✅
4. **Accessible** — Meets WCAG standards ✅
5. **Legally safe** — Won't create liability for the linking agency ❌ (no disclaimers)
6. **Maintained** — Evidence of active upkeep ⚠️ (no public update history)
7. **Transparent** — Clear about who runs it and what it is ⚠️ (partial)

---

## Deliverables

### Tier 1 — Blockers (Must-Have Before Requesting Government Links)

- [ ] **Add a Privacy Policy page**
  - Even if the site collects nothing, this must be stated explicitly
  - Content: No cookies, no analytics (until Plausible/Fathom is added), no personal data collection, no tracking, no data sold to third parties
  - If analytics are added later (Phase 2C), update the policy to describe what's collected (aggregate page views only, no PII)
  - Add as a route (`/privacy`) and link from the footer
  - Notes:

- [ ] **Add a Terms of Service / Disclaimer page**
  - Key points to cover:
    - Site is provided "as-is" without warranty
    - Listings are manually verified but may become outdated
    - Users should contact services directly to confirm hours, eligibility, and availability before visiting
    - Site owner is not liable for actions taken based on listing information
    - Site is not an official government service
  - Add as a route (`/terms`) and link from the footer
  - Notes:

- [ ] **Add a visible "community project" disclaimer**
  - Footer text: "This is an independent community project. It is not affiliated with or endorsed by the Town of Johnston or any government agency."
  - Must be visible on every page (footer placement is fine)
  - Notes:

- [ ] **Add webmaster contact information**
  - At minimum, an email address on the About page and footer
  - Government webmasters need a person to contact if a listing is wrong or the site goes down
  - Consider a simple `mailto:` link — no contact form required
  - Notes:

### Tier 2 — Strongly Recommended (Builds Confidence)

- [ ] **Add an error reporting mechanism**
  - "Report an issue with this listing" link on each `ListingDetail` page
  - Can be as simple as a `mailto:` link with a pre-filled subject line (`?subject=Issue with [Listing Name]`)
  - Or a lightweight form (Netlify Forms / GitHub Issue, similar to Submit form)
  - This is the single biggest trust signal for data accuracy — it shows you have a correction pipeline
  - Notes:

- [ ] **Add a "Last Updated" date to the site footer**
  - Shows the site is actively maintained
  - Can be auto-generated from the last git commit date, or manually updated
  - Example: "Last updated March 2026"
  - Notes:

- [ ] **Document a data freshness commitment**
  - State on the About page how often listings are reviewed (e.g., "All listings are reviewed at least every 6 months")
  - This pairs with the "Verified" badge work in the growth roadmap (Phase 2A)
  - Government webmasters periodically re-audit links; a stated commitment gives them confidence
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

| Target                                | Contact Point                    | Link Placement                           |
| ------------------------------------- | -------------------------------- | ---------------------------------------- |
| Town of Johnston website              | Webmaster / Town Manager's office | "Community Resources" or "Helpful Links" |
| Johnston Senior Center                | Director                         | Resource handout / website               |
| Johnston Public Library               | Library Director                 | Community bulletin / website links       |
| Johnston School Department            | Communications office            | Parent resource page                     |
| RI Secretary of State (civic engagement) | Digital team                  | Community resources section              |
| United Way of Rhode Island / 211 RI   | Partner relations                | Complementary local resource             |
| Local nonprofits (food banks, shelters) | Program directors              | Cross-linking                            |

**Pitch framing:** "We're a free, accessible, ad-free community directory for Johnston. We'd like to be listed as a community resource on your site. Here's a suggested description you can use."

---

## Review Schedule

- Review this document before any government outreach
- Update the requirements table as items are completed
- Re-evaluate after analytics are added (Phase 2C) — usage data strengthens the case

---

_See also: [growth-roadmap.md](./growth-roadmap.md) | [vision.md](./vision.md) | [community-site-comparison.md](./community-site-comparison.md)_
