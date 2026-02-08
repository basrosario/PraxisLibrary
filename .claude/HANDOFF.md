# Praxis Project Handoff Document

**Last Updated:** 2026-02-07 (Session 52)
**Last Commit:** `cfeab8a` — Phase 4D Framework Matcher COMPLETE
**Current Phase:** Phase 4 COMPLETE (4/4), all planned phases done

---

## CURRENT STATE

- **Phase 1: Glossary** — COMPLETE (2,141 terms)
- **Phase 2: Text Frameworks** — COMPLETE (52/52 pages, all 13-section template)
- **Phase 3: Modality Frameworks** — COMPLETE (37/37 pages)
  - 3A Image Prompting: COMPLETE (12/12) — Session 46
  - 3B Audio/Speech: COMPLETE (6/6) — Session 48
  - 3C Video: COMPLETE (6/6) — Session 49
  - 3D Code/Structured: COMPLETE (5/5 new + 3 existing = 8 pages) — Session 50
  - 3E 3D/Spatial: COMPLETE (5/5) — Session 51
- **Phase 4: Site Integration** — COMPLETE (4/4)
- **Phase 5: Navigation UX** — COMPLETE
- **Discover Hub** — COMPLETE (5/5 phases)
- **Glossary Inline Search** — COMPLETE (Session 47)
- **Mega-Menu Redesign** — COMPLETE (Session 48, tabbed progressive disclosure, 133+ files)
- **Site totals:** 101+ frameworks, 2,141+ glossary terms, 149+ HTML files with current nav

---

## NEXT TASKS

All planned phases (1-5) are now complete. Potential future work:
- Additional framework pages for emerging techniques
- Performance optimization / code splitting
- User analytics or feedback mechanisms

---

## POST-PAGE-CREATION CHECKLIST (for each sub-phase)

After creating pages in a new modality sub-phase:

1. **Mega-Menu Navigation** — Python batch script to add new section after last modality section in all HTML files (4 depth levels: 0, 1, 2, 3). **Include `data-tab="slug" role="tabpanel"` on the new section** (tabbed menu format). Currently the last modality section is Video (`data-tab="video"`).
2. **Search Index** — Add entries to `data/search-index.json` (category: "Discover", subcategory: modality name)
3. **Discover Hub** — Add cards + filter button to `learn/index.html`
4. **Modality Hub** — Add card section to `learn/modality/index.html` (replace "Coming Soon" placeholder)
5. **Homepage Counter** — Update `data-counter` and CTA text in `index.html`
6. **HANDOFF.md** — Update state and counters

---

## PYTHON BATCH SCRIPT PATTERN

Sessions 38/45/46/48 used Python scripts to batch-update navigation across all HTML files.

**Pattern for adding a new modality section to mega-menu:**
1. Find the last modality `<div class="mega-menu-section"` (currently Video: `data-tab="video"`)
2. Insert new section after its closing `</div>`
3. 4 depth variants needed (depths 0, 1, 2, 3 with appropriate relative paths)
4. Skip files that already contain the new section
5. See `update_nav_video.py` for reference implementation (adds Video after Audio)
6. See `update_nav_code.py` for reference implementation (adds links within existing Code tab)
7. See `update_nav_tabbed.py` for tabbed-menu conversion script

---

## MEGA-MENU TABBED ARCHITECTURE (Session 48)

**Layout:** Tabbed progressive disclosure (replaced flat multi-column)

```css
/* Desktop: 680px, left tabs + right content panels with 2-column flow */
.mega-menu--tabbed { display: flex; width: 680px; }
.mega-menu-tabs { flex: 0 0 190px; }
.mega-menu--tabbed .mega-menu-section[data-tab] { flex: 1; display: none; columns: 2; }
.mega-menu--tabbed .mega-menu-section[data-tab].is-active { display: block; }

/* Mobile: accordion with collapsible headers */
@media (max-width: 767px) {
    .mega-menu-tabs { display: none; }
    .mega-menu--tabbed .mega-menu-section[data-tab] h4 { /* tappable accordion header */ }
    .mega-menu--tabbed .mega-menu-section.is-expanded a { display: block; }
}
```

**Mobile styling:** Headers 0.86rem, links 0.92rem. Non-clickable headers: `var(--primary)` (red). Clickable headers/links: `#fff`.

**Tab Slug Mapping (13 categories):**
| Category | Slug |
|----------|------|
| Getting Started | `getting-started` |
| Structured Frameworks | `structured-frameworks` |
| In-Context Learning | `in-context-learning` |
| Reasoning & CoT | `reasoning-cot` |
| Decomposition | `decomposition` |
| Self-Correction | `self-correction` |
| Ensemble Methods | `ensemble-methods` |
| Prompting Strategies | `prompting-strategies` |
| Code | `code` |
| Image | `image` |
| Audio | `audio` |
| Video | `video` |
| 3D | `3d` |

**JS:** `TabbedMenu` object in `app.js` — runtime tab button generation from `[data-tab]` section h4 text, mouseenter switching (desktop), h4 click accordion (mobile), roving tabindex keyboard nav.

**Resources menu** still uses `mega-menu--multi-column` (unchanged).

---

## KEY REFERENCE DOCUMENTS

| Document | Purpose | Lines |
|----------|---------|-------|
| `.claude/SiteFrameworks.md` | **Architecture bible** — WHY behind every decision | 1,100+ |
| `.claude/HANDOFF.md` | Current state (this file) | -- |
| `.claude/COMPLETED.md` | Archived completed work | -- |
| `.claude/plans/FrameworkOverhaul.md` | Master plan -- Phases 1-5 + session log | ~1,800 |
| `learn/self-ask.html` | Canonical 13-section template (depth 1) | 899 |
| `learn/modality/image/image-prompting.html` | Reference for depth 3 modality pages | 883 |
| `update_nav_video.py` | Reference for mega-menu batch update scripts (new tab) | 143 |
| `update_nav_code.py` | Reference for adding links within existing mega-menu tab | 131 |
| `update_nav_3d.py` | Reference for adding 3D tab (13th mega-menu tab) | 131 |
| `update_nav_tabbed.py` | Reference for tabbed-menu conversion script | 157 |

---

## ARCHITECTURAL NOTES

### resolveInternalUrl() -- Universal Path Resolver (app.js ~471)
```javascript
function resolveInternalUrl(targetPath) {
    if (!targetPath || targetPath.startsWith('http') || targetPath.startsWith('/') ||
        targetPath.startsWith('#') || targetPath.startsWith('mailto:')) {
        return targetPath;
    }
    const pathname = window.location.pathname;
    const segments = pathname.replace(/^\//, '').split('/');
    const depth = Math.max(0, segments.length - 1);
    if (depth === 0) return targetPath;
    return '../'.repeat(depth) + targetPath;
}
```
**Usage:** `resolveInternalUrl('pages/glossary.html#term-foo')` -- always pass root-relative paths.

### Path Depth Reference
| Depth | Directory | Root prefix | Example file |
|-------|-----------|-------------|--------------|
| 0 | Root | (none) | `index.html` |
| 1 | One-deep | `../` | `learn/self-ask.html` |
| 2 | Two-deep | `../../` | `learn/modality/index.html` |
| 3 | Three-deep | `../../../` | `learn/modality/image/image-prompting.html` |

---

## CRITICAL RULES - MUST FOLLOW

### 1. Security & CSP Compliance (A+ Rating)
- **NO inline styles** -- Never use `style=""` attributes
- **NO inline scripts** -- Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** -- No CDNs, Google Fonts, external APIs
- **All styles -> styles.css** (single file, ~27,700 lines)
- **All scripts -> app.js** (single file with `defer`, ~10,900 lines)

### 2. Content Rules
- **NO citations on framework pages** (per user request, Session 25)
- **NO stat cards** -- Use highlight-box components instead
- **NO content badges** -- Removed from all learn pages (Session 29)
- **NO HR or remote work examples** -- Removed site-wide (Session 37)
- **NO emoji** in code or content (user preference)
- **Historical context notices required** on all framework pages

### 3. Code Notation
```
HTML:  <!-- === SECTION === --> ... <!-- /SECTION -->
CSS:   /* === SECTION === */ ... /* Component ---- */
JS:    // === SECTION === ... /** JSDoc comments */
```

### 4. URL Construction
- **ALWAYS use `resolveInternalUrl()`** for any dynamically generated internal links
- Pass root-relative paths: `resolveInternalUrl('pages/glossary.html#term-foo')`

### 5. Information Accuracy
- All historical/factual claims must be verified from .edu or .gov sources
- No fake, made up, or misleading information

---

## FILE STRUCTURE

```
_public_html/
+-- index.html              # Home page (101+ frameworks counter)
+-- styles.css              # ALL CSS (~27,700 lines)
+-- app.js                  # ALL JavaScript (~10,900 lines)
+-- foundations/
|   +-- index.html          # AI Foundations timeline
+-- learn/                  # Framework pages (85+) + category pages (7)
|   +-- index.html          # Discover hub (101 framework cards, 13 categories)
|   +-- [7 category pages]  # structured-frameworks, reasoning-cot, etc.
|   +-- [67 text framework pages]
|   +-- modality/
|       +-- index.html      # Modality hub page
|       +-- code/           # Code frameworks (8 pages)
|       +-- image/          # Image frameworks (12 pages)
|       +-- audio/          # Audio frameworks (6 pages)
|       +-- video/          # Video frameworks (6 pages)
|       +-- 3d/             # 3D frameworks (5 pages)
+-- data/
|   +-- glossary.json       # 2,141 AI terms
|   +-- search-index.json   # Search entries (85 frameworks + glossary + pages)
+-- pages/                  # 12 content pages (incl. glossary with inline search)
+-- tools/                  # 12 AI readiness tools
+-- neurodivergence/        # 6 ND pages
+-- patterns/               # 1 page
+-- quiz/                   # 1 page
+-- .claude/
    +-- HANDOFF.md           # THIS FILE
    +-- COMPLETED.md         # Archive of completed work
    +-- SiteFrameworks.md    # Architecture bible (1,100+ lines)
    +-- plans/
        +-- FrameworkOverhaul.md          # Master plan (Phases 1-5)
        +-- discover-hub-category-pages.md # Discover Hub plan (COMPLETE)
```

---

## 13 FRAMEWORK CATEGORIES (101 frameworks)

| Category | Count | Category Page | Status |
|----------|-------|---------------|--------|
| Getting Started | 2 | -- | No category page needed |
| Structured Frameworks | 5 | `learn/structured-frameworks.html` | DONE |
| Reasoning & CoT | 15 | `learn/reasoning-cot.html` | DONE |
| Decomposition | 7 | `learn/decomposition.html` | DONE |
| Self-Correction | 7 | `learn/self-correction.html` | DONE |
| In-Context Learning | 13 | `learn/in-context-learning.html` | DONE |
| Ensemble Methods | 7 | `learn/ensemble-methods.html` | DONE |
| Prompting Strategies | 11 | `learn/prompting-strategies.html` | DONE |
| Code | 8 | -- | Uses `learn/modality/code/` hub |
| Image | 12 | -- | Uses `learn/modality/image/` via modality hub |
| Audio | 6 | -- | Uses `learn/modality/audio/` via modality hub |
| Video | 6 | -- | Uses `learn/modality/video/` via modality hub |
| 3D | 5 | -- | Uses `learn/modality/3d/` via modality hub |

---

*Always read this file first when resuming work. Follow the critical rules exactly. Read SiteFrameworks.md for deep architectural understanding.*
