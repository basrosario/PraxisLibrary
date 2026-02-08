# Praxis Project Handoff Document

**Last Updated:** 2026-02-07 (Session 48)
**Last Commit:** `d5cca2a` — Tabbed mega-menu redesign
**Current Phase:** Phase 3C Video NEXT (3A Image + 3B Audio COMPLETE)

---

## CURRENT STATE

- **Phase 1: Glossary** — COMPLETE (2,141 terms)
- **Phase 2: Text Frameworks** — COMPLETE (52/52 pages, all 13-section template)
- **Phase 3: Modality Frameworks** — IN PROGRESS (24/37 pages)
  - 3A Image Prompting: COMPLETE (12/12) — Session 46
  - 3B Audio/Speech: COMPLETE (6/6) — Session 48
  - 3C Video: NOT STARTED (0/6)
  - 3D Code/Structured: NOT STARTED (0/5 new, 3 existing pages)
  - 3E 3D/Spatial: NOT STARTED (0/5)
- **Phase 4: Site Integration** — 75% (4D Framework Matcher still pending)
- **Phase 5: Navigation UX** — COMPLETE
- **Discover Hub** — COMPLETE (5/5 phases)
- **Glossary Inline Search** — COMPLETE (Session 47)
- **Mega-Menu Redesign** — COMPLETE (Session 48, tabbed progressive disclosure, 133+ files)
- **Site totals:** 85+ frameworks, 2,141+ glossary terms, 133+ HTML files with current nav

---

## NEXT TASKS

### Priority 1: Phase 3C — Video (6 pages)

**Directory:** `learn/modality/video/`

| Framework | File | Priority |
|-----------|------|----------|
| Video Prompting Basics | video-prompting.html | MEDIUM |
| Video Generation Prompting | video-gen.html | MEDIUM |
| Temporal Reasoning | temporal-reasoning.html | LOW |
| Video QA | video-qa.html | LOW |
| Video Captioning | video-captioning.html | LOW |
| Video Editing Prompting | video-editing.html | LOW |

**Approach:**
- Same 13-section template as all framework pages (`learn/self-ask.html` is canonical)
- Use depth-3 path prefixes (`../../../` for root) — same as `learn/modality/image/*.html`
- Parallel background agents (all 6 in one batch)
- After pages built: run post-page-creation checklist below
- **NOTE:** When adding Video section to mega-menu, use `data-tab="video" role="tabpanel"` attributes (tabbed format)
- **Nav script pattern:** Clone `update_nav_audio.py`, change "audio" to "video", find last section (currently Audio `data-tab="audio"`) and insert after it

### Priority 2: Phase 3D — Code/Structured (5 new pages)

**Directory:** `learn/modality/code/` (3 pages already exist)

| Framework | File | Priority |
|-----------|------|----------|
| Program Synthesis | program-synthesis.html | MEDIUM |
| Code Explanation | code-explanation.html | MEDIUM |
| Code Review Prompting | code-review.html | MEDIUM |
| Test Generation | test-generation.html | MEDIUM |
| SQL Generation | sql-generation.html | MEDIUM |

### Priority 3: Phase 3E — 3D/Spatial (5 pages)

**Directory:** `learn/modality/3d/`

| Framework | File | Priority |
|-----------|------|----------|
| 3D Prompting Basics | 3d-prompting.html | LOW |
| 3D Model Generation | 3d-model-gen.html | LOW |
| Scene Understanding | scene-understanding.html | LOW |
| Pose Estimation Prompting | pose-estimation.html | LOW |
| Point Cloud Prompting | point-cloud.html | LOW |

### Priority 4: Phase 4D — Framework Matcher Updates

---

## POST-PAGE-CREATION CHECKLIST (for each sub-phase)

After creating pages in a new modality sub-phase:

1. **Mega-Menu Navigation** — Python batch script to add new section after last modality section in all HTML files (4 depth levels: 0, 1, 2, 3). **Include `data-tab="slug" role="tabpanel"` on the new section** (tabbed menu format). Currently the last modality section is Audio (`data-tab="audio"`).
2. **Search Index** — Add entries to `data/search-index.json` (category: "Discover", subcategory: modality name)
3. **Discover Hub** — Add cards + filter button to `learn/index.html`
4. **Modality Hub** — Add card section to `learn/modality/index.html` (replace "Coming Soon" placeholder)
5. **Homepage Counter** — Update `data-counter` and CTA text in `index.html`
6. **HANDOFF.md** — Update state and counters

---

## PYTHON BATCH SCRIPT PATTERN

Sessions 38/45/46/48 used Python scripts to batch-update navigation across all HTML files.

**Pattern for adding a new modality section to mega-menu:**
1. Find the last modality `<div class="mega-menu-section"` (currently Audio: `data-tab="audio"`)
2. Insert new section after its closing `</div>`
3. 4 depth variants needed (depths 0, 1, 2, 3 with appropriate relative paths)
4. Skip files that already contain the new section
5. See `update_nav_audio.py` for reference implementation (adds Audio after Image)
6. See `update_nav_tabbed.py` for tabbed-menu conversion script

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

**Tab Slug Mapping (11 categories):**
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
| `update_nav_audio.py` | Reference for mega-menu batch update scripts (modality) | 143 |
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
+-- index.html              # Home page (85+ frameworks counter)
+-- styles.css              # ALL CSS (~27,700 lines)
+-- app.js                  # ALL JavaScript (~10,900 lines)
+-- foundations/
|   +-- index.html          # AI Foundations timeline
+-- learn/                  # Framework pages (85+) + category pages (7)
|   +-- index.html          # Discover hub (85 framework cards, 11 categories)
|   +-- [7 category pages]  # structured-frameworks, reasoning-cot, etc.
|   +-- [67 text framework pages]
|   +-- modality/
|       +-- index.html      # Modality hub page
|       +-- code/           # Code frameworks (3 pages)
|       +-- image/          # Image frameworks (12 pages)
|       +-- audio/          # Audio frameworks (6 pages)
|       +-- video/          # Video frameworks (0 pages) -- NEXT
|       +-- 3d/             # 3D frameworks (0 pages)
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

## 11 FRAMEWORK CATEGORIES (85 frameworks)

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
| Code | 3 | -- | Uses `learn/modality/code/` hub |
| Image | 12 | -- | Uses `learn/modality/image/` via modality hub |
| Audio | 6 | -- | Uses `learn/modality/audio/` via modality hub |

---

*Always read this file first when resuming work. Follow the critical rules exactly. Read SiteFrameworks.md for deep architectural understanding.*
