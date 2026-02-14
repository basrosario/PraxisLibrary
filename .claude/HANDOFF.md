# Praxis Project Handoff Document

**Last Updated:** 2026-02-13 (Session 110)
**Last Commit:** `pending` (session 110)
**Uncommitted:** NO
**Working Directory:** `C:\Users\basro\Music\PraxisLibrary`
**Repository:** `https://github.com/PowerOfPraxis/PraxisLibrary`
**Audit:** 8/11 passed, 178E/0W/30I/5V (Source Verification cascade -> Data Integrity)

---

## SITE TOTALS

177 pages (144 techniques + 33 frameworks) across 140 text + 37 modality | 14 hub/index pages + **10 benchmark pages** | 5,324 glossary terms (27 shards) | **235 HTML files total** | 253 site search entries | 7 interactive tools | 22 builder frameworks | styles.css: **~31,000 lines** | app.js: **~15,700 lines**

---

## SESSION 110 — Audit Hardening & Category Rename (COMPLETE)

### What Was Done

#### 1. Integrity Cascade: Source Verification -> Data Integrity
- If Source Verification has errors, Data Integrity automatically fails
- Cascade injects a single ERROR issue: "Source Verification failed with N error(s) — Data Integrity cannot pass when source integrity is compromised"
- Implemented in `AuditRunner.run()` after all checkers complete

#### 2. INFO Text Fix (Misleading "all verified")
- Changed per-page citation count INFO text from "all verified" to "all reachable (HTTP 200)"
- Changed "some failed verification" to "some unreachable"
- Changed "not verified" to "not checked"
- Reason: "verified" now exclusively means human-verified with screenshot proof

#### 3. Category Rename (6 of 11 renamed)

| # | Old Name | New Name | Reason |
|---|----------|----------|--------|
| 1 | Security | Security | unchanged |
| 2 | Continuity | **Template Compliance** | checks page template elements |
| 3 | Broken Links | **Link Integrity** | more professional |
| 4 | Relevancy | **Content Readiness** | checks placeholders, stale dates |
| 5 | Accuracy | **Content Consistency** | checks counts, templates, sync |
| 6 | Bias/Inclusivity | Bias/Inclusivity | unchanged |
| 7 | Accessibility | Accessibility | unchanged |
| 8 | Citation Accuracy | **Source Verification** | checks sources, freshness |
| 9 | Data Accuracy | **Data Integrity** | checks JSON, charts, anchors |
| 10 | Structural | **Site Architecture** | orphans, dups, sitemap |
| 11 | Documentation | Documentation | unchanged |

Updated in: Category enum, CATEGORY_MAP keys, CATEGORY_CHECKS descriptions, section header comments, cascade messages, `Audit/verified-items.json` sig strings.

#### 4. Maintenance Banner (Site-Wide)
- JS-injected IIFE after header (like ethics ticker pattern)
- Fixed positioning, syncs with header scroll state
- Frosted yellow background with `backdrop-filter: blur(12px)`
- Yellow border-top and border-bottom lines
- White text on dark backgrounds, black text when scrolled
- Centered text: "Maintenance — Link verification in progress. External citations are pending review & verification."
- Positions below sticky sub-navs on foundations/glossary/discover pages
- z-index: 89 (below sub-navs)

#### 5. Unverified Severity Upgrade (WARNING -> ERROR)
- All unverified external links are now ERROR-level (was WARNING)
- 3 places in audit tool: bot-blocked broken links, bot-blocked citations, reachable citations
- Rationale: unverified = content integrity violation per site's own standards

### Files Modified
- `styles.css` — maintenance banner CSS (~60 new lines)
- `app.js` — maintenance banner IIFE, `updateHeader()` banner positioning (~95 new lines)
- `Audit/audit-report.json` — regenerated with new category names (178E/0W/30I/5V)
- `Audit/verified-items.json` — updated sigs: "Broken Links" -> "Link Integrity", "Citation Accuracy" -> "Source Verification"
- `Python Scipts/PraxisLibraryAudit.py` — NOT tracked (cascade, INFO text, renames, severity upgrade)

---

## NEXT SESSION: Phase 11 — Audit Expansion (2 Parts)

### Part A: Add 22 New Checks (Python Audit Tool)

**New Category: Performance (12th category)**
- Oversized images (>500KB in assets/)
- Page weight (HTML files >200KB)
- Fixed pixel widths in CSS without max-width
- Tables without responsive wrappers
- Missing image dimensions (width/height attributes — CLS)

**Security (+2 checks)**
- External domain inventory (all unique external domains)
- Accidental resource loads (<link>, <img>, <script> to external domains)

**Content Readiness (+2 checks)**
- Content staleness (files not modified in 90+ days via mtime)
- Copyright year validation (footer copyright matches current year)

**Content Consistency (+3 checks)**
- Navigation link consistency (compare nav links across all pages)
- Footer content drift (detect different footer structures)
- Breadcrumb path accuracy (trail matches actual file location)

**Accessibility (+2 checks)**
- SVG accessibility (<svg> without role="img" or aria-label)
- Decorative image audit (large images with empty alt="" that may need real text)

**Site Architecture (+3 checks)**
- Duplicate meta descriptions (same description on multiple pages)
- Duplicate titles (same <title> on multiple pages)
- Canonical URL conflicts (two pages with same canonical)

**Total after expansion: 12 categories, ~65 checks**

### Part B: Audit Pillar Grouping (Public-Facing UX)

New "Audit Pillars" section between summary and category accordion on audit report page:

| Pillar | Categories | Focus |
|--------|-----------|-------|
| Trust & Security | Security, Source Verification, Link Integrity | "Can users trust this site?" |
| Quality & Readiness | Content Readiness, Content Consistency, Data Integrity | "Is the content accurate and current?" |
| Access & Inclusion | Accessibility, Bias/Inclusivity, Performance | "Can everyone use this site?" |
| Architecture & Docs | Template Compliance, Site Architecture, Documentation | "Is the site well-built?" |

Each pillar card: name, pass ratio (e.g. 2/3), combined error count, click to jump to accordion.

---

## PENDING TASKS

### 1. Continue Human Verification
User (Bas) has verified 5 of 182+ external links via screenshot proof. Continue verifying links through `Audit/citation-verify.html` to reduce the 178 errors.

### 2. Sourcing Standards Rewrite
User wants to update `.claude/sourcingstandards.md` with tiered domain policy (.gov/.edu preferred > .org accepted > .com if verified).

### 3. Glossary Expansion (Phase 7 — Lower Priority)
5,324 terms across 27 shards, goal 15,000+

### 4. Prompt Infographic Rollout (Phase 6 — PAUSED)
2/177 done (costar.html + crisp.html)

---

## MASTER PLAN STATUS

| Phase | Status | Details |
|-------|--------|---------|
| Phase 1: Glossary (33 terms) | COMPLETE | 2,141 initial terms (Session 23-29) |
| Phase 2: Text Frameworks (52 pages) | COMPLETE | All 52 pages + quality redesign waves |
| Phase 3: Modality Frameworks | COMPLETE | All modality hubs and technique pages |
| Phase 4: Site Integration | COMPLETE | Nav, Discover Hub, search, matcher |
| Phase 5: Navigation UX | COMPLETE | Mega-menu, restructured to 4 items |
| Phase 6: Prompt Infographic | PAUSED | 2/177 done, hand-crafted approach |
| Phase 7: Glossary 15K+ | PAUSED | 5,324/15,000 terms |
| Phase 8: AI Benchmarks | COMPLETE | 10-page system, 9 providers, 53 models |
| Phase 9: Discovery Expansion | COMPLETE | 67 pages built, integrated, audit 0E |
| Phase 10: Audit Verification | COMPLETE | 4-severity model, human oversight, category renames |
| **Phase 11: Audit Expansion** | **PLANNED** | **Performance category, 22 new checks, pillar UX** |

---

## CRITICAL RULES

### 1. Security (A+ CSP)
- **NO inline styles** — Never use `style=""` attributes
- **NO inline scripts** — Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** — No CDNs, Google Fonts, external APIs
- **All styles -> styles.css** (single file)
- **All scripts -> app.js** (single file with `defer`)

### 2. Content
- **NO citations** on framework pages (`learn/`)
- **Historical context notices required** on all framework pages
- **ALL cited sources must be 2024-2026** — Pre-2024 = ERROR
- **ALL external citation links must have `data-added="YYYY-MM-DD"`**
- **ALL external links require human verification** — unverified = ERROR (content integrity violation)
- **Benchmark citation exception:** Public company sources allowed (not limited to .gov/.edu)

### 3. Design
- **Dark Section Standard:** `linear-gradient(to right, #2a1015 0%, #150a0d 40%, #000000 100%)` + neural canvas with mask
- **Brand colors:** red (#DC3545), black, gray, dark-red (#A71D2A)
- **Audit portal palette:** mid-tone charcoal (#1f2937 bg, #374151 borders, #f3f4f6 text)
- **Audit severity colors:** Error red, Warning amber (#fbbf24), Info blue (#60a5fa), Verified green (#34d399)
- **Hero backgrounds:** Pure black right side (`#000000`, no blue tint)

### 4. Code Notation
```
HTML:  <!-- === SECTION === --> ... <!-- /SECTION -->
CSS:   /* === SECTION === */ ... /* Component ---- */
JS:    // === SECTION === ... /** JSDoc comments */
```

### 5. Benchmark Provider Colors
Anthropic #D97757, OpenAI #10A37F, Google #4285F4, Meta #0668E1, xAI #6366F1, DeepSeek #4D6BFE, Mistral #FF7000, Alibaba #FF6A00, Cohere #39594D

### 6. Chart Types
- **Hub:** Donut, Radar, Bar, Lollipop, VerticalBar
- **Company pages:** 9 charts each (donut + bar + radar + 6 per-category)
- **Audit portal:** Custom `drawAuditChart()` — log-scale, per-category colors, gradient+glow

### 7. Navigation Architecture
- **4 nav items:** History | Discover | Readiness | Resources
- **History** — Single link (no dropdown)
- **Discover** — `mega-menu--categories` (3-column: DISCOVER | TECHNIQUES | MODALITY)
- **Readiness** — Mega-menu with 7 tools + Patterns + AI Safety
- **Resources** — `mega-menu-quick-links` (flat 8-link dropdown)

### 8. Audit Categories (12 — renamed Session 110)
| # | Category | What It Checks |
|---|----------|---------------|
| 1 | Security | CSP compliance, inline code, CDNs, dangerous JS |
| 2 | Template Compliance | Page template elements: meta, nav, footer, ethics, SEO |
| 3 | Link Integrity | Internal path resolution + external URL reachability |
| 4 | Content Readiness | Placeholder text + outdated dates |
| 5 | Content Consistency | Glossary sync, search index, counters, templates, footer tools |
| 6 | Bias/Inclusivity | Exclusionary language, profanity, slurs |
| 7 | Accessibility | WCAG AA: lang, alt text, headings, forms, tab order |
| 8 | Source Verification | .gov/.edu sources, freshness, data-added stamps |
| 9 | Data Integrity | JSON parsing, chart values, anchors, glossary fields |
| 10 | Site Architecture | Orphans, duplicate IDs, meta quality, sitemap, titles |
| 11 | Documentation | .claude/ docs exist, count accuracy, session staleness |
| 12 | Performance | PLANNED — images, page weight, responsive, CLS |

### 9. Audit Portal States
- Categories with 0E/0W show **"Clean"** badge (green)
- **4 severity cards:** Errors (red), Warnings (yellow), Info (blue), Verified Repository (green)
- Unverified external links = **ERROR** (red) — content integrity violation
- Human Verified items = **Verified Repository** (green) — screenshot proof required
- Info items = **inventory/informational** (blue)
- **Integrity cascade:** Source Verification FAIL -> Data Integrity FAIL
- `Audit/verified-items.json` — registry mapping URLs to screenshot proof files

### 10. Human Verification Workflow
1. User reviews link at `Audit/citation-verify.html` (standalone checklist)
2. Takes screenshot proving the link is valid
3. Saves screenshot to `assets/Citation images/`
4. Adds entry to `Audit/verified-items.json` with `sig`, `proof`, `verified_by`, `verified_date`
5. Re-run audit -> item moves from ERROR to Verified Repository (green)

### 11. RAI Mailto
- `data-rai-mailto` attribute on `pages/responsible-ai.html`
- JS handler builds mailto with auto date/time subject + structured body

### 12. Discovery Catalog Schema
Each entry in `.claude/research/discovery-catalog.json` has:
`canonical_name`, `acronym`, `full_expansion`, `category`, `type`, `year_introduced`, `origin_source`, `origin_type`, `primary_reference_link`, `description_short`, `description_detailed`, `related_methods[]`, `alternate_names[]`, `possible_duplicates_of_existing_110[]`, `in_praxis`, `praxis_path`

---

## KEY REFERENCES

| Document | Purpose |
|----------|---------|
| `.claude/HANDOFF.md` | **THIS FILE** — Current state (read first) |
| `.claude/archive/COMPLETED.md` | All completed work (full details) |
| `.claude/reference/SiteFrameworks.md` | Architecture bible |
| `.claude/sourcingstandards.md` | **SOURCE OF TRUTH** — Citation & sourcing standards |
| `.claude/plans/FrameworkOverhaul.md` | Master plan — Phases 1-11 + session log |
| `.claude/reference/benchmark-sources.md` | VERIFIED benchmark source URLs |
| `.claude/research/discovery-catalog.json` | 184-entry discovery catalog |
| `Python Scipts/PraxisLibraryAudit.py` | 12-category site audit tool (NOT tracked) |
| `Python Scipts/build_citation_page.py` | Citation verification page generator (NOT tracked) |
| `Audit/verified-items.json` | Human verification registry (5 entries) |
| `Audit/citation-verify.html` | Standalone verification checklist (generated) |
| `learn/self-ask.html` | Canonical 13-section template |

---

*Read this file first when resuming work. Follow critical rules exactly. User prefers to be called Bas.*
