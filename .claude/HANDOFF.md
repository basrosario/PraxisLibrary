# Praxis Project Handoff Document

**Last Updated:** 2026-02-07 (Session 57)
**Last Commit:** Session 57 (Code page upgrades + 4 emerging frameworks + mobile nav fixes)
**Current Phase:** Post-build. Emerging frameworks + page upgrades.

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
- **Site Audit System** — COMPLETE (Session 53, `.claude/testing-procedures.md`)
- **First Full Audit** — EXECUTED Session 54, ALL items resolved Session 55
- **Emerging Frameworks** — COMPLETE (Session 57, 4 new pages + 3 Code upgrades)
- **Site totals:** 108 framework pages (all 13-section), 2,141+ glossary terms, 149 HTML files, 2,328 search entries

---

## SESSION 57 — Code Upgrades + Emerging Frameworks (2026-02-07)

### Completed This Session

1. **3 Code page 13-section upgrades** — Rebuilt `code-prompting.html`, `self-debugging.html`, and `structured-output.html` with full rich content: enhanced hero subtitles, 3-paragraph concept sections, element-timeline How It Works, proper comparison panels, 3 detailed accordion examples each, 6 use cases each, evolution-callout Related Frameworks cards, full CTA with canvas. These pages previously had thin content (8-10 sections with basic content) and now match the quality of the Session 50 new Code pages.

2. **System Prompting page** (`learn/system-prompting.html`) — New Prompting Strategies page. Covers system-level instruction design: role definition, behavioral constraints, output format specification, and context/examples. Three accordion demos: Customer Support Agent, Code Review Assistant, Educational Tutor. Framework positioning: Direct Prompting → System Prompting → Constitutional AI → Agentic Systems.

3. **RAG page** (`learn/rag.html`) — New Prompting Strategies page. Covers Retrieval-Augmented Generation: query processing, document retrieval, prompt augmentation, grounded response generation. Three accordion demos: Enterprise Knowledge Base, Legal Research Assistant, Medical Information System. Framework positioning: Parametric Models → RAG → Agentic RAG → Self-RAG.

4. **Agentic Prompting page** (`learn/agentic-prompting.html`) — New Prompting Strategies page. Covers autonomous AI agents: goal/tool definition, approach planning, tool execution, observe/reflect loops, result delivery. Three accordion demos: Automated Research Agent, Code Development Agent, Multi-Agent Collaboration. Framework positioning: Single Prompts → Prompt Chaining → ReAct → Agentic Prompting.

5. **Skeleton-of-Thought page** (`learn/skeleton-of-thought.html`) — New Decomposition page. Covers parallel generation via outline-first approach: skeleton generation, parallel point expansion, final assembly. Three accordion demos: Technical Documentation, Educational Content, Product Comparison. Framework positioning: Standard Generation → Chain-of-Thought → Skeleton-of-Thought → Speculative Decoding.

6. **Mega-menu batch update** — `update_nav_emerging.py` added 4 new links across all 149 HTML files: 3 in Prompting Strategies tab (after RE2), 1 in Decomposition tab (after Program of Thought). Handles 4 depth variants correctly.

7. **Search index** — 4 new entries added to `data/search-index.json` (2,328 total entries).

8. **Discover hub** — 4 new cards added to `learn/index.html`. Prompting Strategies count: 11→14. Decomposition count: 7→8.

9. **Category pages** — Updated `learn/prompting-strategies.html` (3 new cards + 3 comparison table rows, count 11→14) and `learn/decomposition.html` (1 new card + 1 comparison table row, count 7→8).

10. **Homepage counter** — Updated `index.html` from 101+ to 108+ frameworks (counter, subtitle, CTA button).

11. **Parking lot** — Created `.claude/parkinglot.md` with deferred items: (1) Performance optimization/minification branching strategy, (2) User analytics/feedback mechanisms.

12. **Mobile nav scroll fix (longstanding bug)** — Fixed `.nav.active` (position:fixed) disappearing when page was scrolled. Root cause: `.header.scrolled` applied `backdrop-filter: blur(10px)` which per CSS spec creates a new containing block, causing the nav's `position:fixed` to become relative to the ~60px header instead of viewport. Fix: `body.menu-open .header { backdrop-filter: none; }` in `styles.css`.

13. **Mobile nav expanded by default** — Changed mobile mega-menu accordion from all-collapsed to all-expanded on init. In `app.js` `TabbedMenu.setup()`, added `is-expanded` class to all sections when mobile. Changed `toggleAccordion` from single-expand to independent toggle (users can collapse/expand individual sections).

14. **Mobile nav Resources formatting fix** — Resources dropdown had desktop centering (`transform: translateX(-50%); left: 50%`) that wasn't reset on mobile, causing misalignment at bottom of mobile menu. Added mobile override to reset transform and position.

15. **Mobile nav scrolled color inversion fix** — `.header.scrolled` styles applied light-mode colors (white backgrounds, dark text) to the mega-menu, overriding the dark mobile menu panel. Links became invisible (white text on white background). Fix: added `body.menu-open .header` overrides to force dark background, white logo/nav-link/toggle/search-trigger colors, and `@media (max-width: 767px)` overrides for `.header.scrolled .mega-menu`, `.mega-menu-section a/h4`, `.mega-menu-sidebar`, `.mega-menu-quick-links a`, and `.mega-menu--tabbed` to maintain dark theme on mobile regardless of scroll state.

16. **Mega-menu quick links expansion** — Added 2 new quick links to `.mega-menu-quick-links` across all 149 HTML files: Glossary (`pages/glossary.html`) and AI Foundations (`foundations/index.html`). Reordered to: Glossary, AI Foundations, Prompt Basics, Facts & Fictions. Mobile CSS updated with `flex-wrap: wrap` and `flex: 1 1 calc(50%)` for 2x2 grid layout. Batch scripts: `update_nav_quicklinks.py` (add links), `update_nav_reorder.py` (reorder).

### Updated Counters
| Counter | Old | New |
|---------|-----|-----|
| Framework pages | 104 | 108 |
| HTML files | 145 | 149 |
| Search entries | 2,324 | 2,328 |
| Prompting Strategies | 11 | 14 |
| Decomposition | 7 | 8 |

---

## SESSION 56 — Search + Navigation UX (2026-02-07)

### Completed This Session

1. **Main search 8-tier glossary scoring** (`8ec2558`) — `searchPraxis()` now uses the same scoring algorithm as `searchGlossaryTerms()` for Glossary category entries: exact name (200), acronym (190), normalized (170), starts-with (150), acronym starts-with (120), whole word (100), substring (80), definition (30). Three helper functions added: `extractSearchAcronym()`, `normalizeSearchMatch()`, `scoreGlossaryEntry()`. Non-Glossary entries keep existing term-by-term scoring.

2. **Glossary hash scroll fix** (`6cbe34f`) — Clicking glossary terms from main search was scrolling to wrong positions because `content-visibility: auto` on `.glossary-section` uses 500px placeholder heights. Fixed by mirroring the `selectResult()` pattern: disable content-visibility on all 26 sections, double-rAF for layout reflow, `getBoundingClientRect()` for accurate position, manual `window.scrollTo()` with 220px offset, restore content-visibility after 1.5s, highlight pulse on target term. `scrollIntoView()` does NOT work with `content-visibility: auto`.

3. **Mega-menu sidebar redesign** (`c94a43e`) — Getting Started removed as a tab (only had 2 links). Prompt Basics + Facts & Fictions now pinned as direct quick links at top of sidebar, always visible without clicking a tab. New `.mega-menu-sidebar` wrapper contains `.mega-menu-quick-links` + `.mega-menu-tabs`. Removed the paired 50%/50% Getting Started + ICL tab CSS. In-Context Learning is now a normal full-width tab. 145 HTML files + CSS updated via `update_nav_sidebar.py`. Mobile: quick links show as horizontal row at top of dropdown.

### Mega-Menu Tab Slug Mapping (12 categories, was 13)

| Category | Slug |
|----------|------|
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

**Quick links** (Glossary, AI Foundations, Prompt Basics, Facts & Fictions) live in `.mega-menu-quick-links` inside `.mega-menu-sidebar`.

#### INFO — Optional/Advisory (unchanged)

- CSS ~612KB / JS 533KB — consider minification for production
- Ghost reference to `learn/advanced.html` in app.js (doesn't exist)
- Hero badge inconsistency: 54/67 text pages use descriptive labels vs 37/37 modality pages using category names (design decision)
- 4 tools not in mega-menu (bias, jailbreak, specificity, temperature) — linked from tools/index.html
- `build_meta.py` is a no-op (9 bytes, `print(42)`)
- Glossary offset uses 220px vs 160px in CLAUDE.md spec (justified — actual sticky stack is taller)
- Files pending user decision: `2406.06608v6.pdf` (3.1MB), `assets/images/praxishome.png` (707KB), `build_meta.py`

---

## AUDIT RESULTS SUMMARY (Session 54, fully resolved Session 55)

| Phase | Result |
|-------|--------|
| 1. Orphaned Files | 9 DELETED (8 S55 + _mmi_temp), 3 REVIEW remain |
| 2. Structural Integrity | 145/145 pass |
| 3. Format Consistency | ALL FIXED — 6 h2s, 3 Code pages rebuilt, 2 comparison panels added, 3 pillar-grids added |
| 4. Navigation & Links | ALL FIXED — 4 dead links (S54), 58 search entries (S55) |
| 5. Content Continuity | All counters accurate, zero banned content |
| 6. Security & CSP | ALL FIXED — 0 inline styles, 0 inline scripts, 0 external resources |
| 7. Accessibility | ALL FIXED — 296 aria-labels, 36 heading hierarchy fixes, 5 ADL dashboards, focus-visible, img dimensions |
| 8. Performance | Scripts all deferred, DOM depth OK, img dimensions specified |

**Passed cleanly:** Mega-menu consistency (146/146), glossary JSON valid, counters accurate, zero banned content, CSP headers A+, no inline scripts, no external resources, no dangerous JS, DOM depth OK, all scripts deferred, image alt text, skip links, path depth validation.

---

## FUTURE WORK

- Performance optimization / CSS+JS minification (see `.claude/parkinglot.md`)
- User analytics or feedback mechanisms (see `.claude/parkinglot.md`)
- Additional framework pages for further emerging techniques

---

## POST-PAGE-CREATION CHECKLIST (for each sub-phase)

After creating pages in a new modality sub-phase:

1. **Mega-Menu Navigation** — Python batch script to add new section after last modality section in all HTML files (4 depth levels: 0, 1, 2, 3). **Include `data-tab="slug" role="tabpanel"` on the new section** (tabbed menu format). Currently the last modality section is 3D (`data-tab="3d"`).
2. **Search Index** — Add entries to `data/search-index.json` (category: "Discover", subcategory: modality name)
3. **Discover Hub** — Add cards + filter button to `learn/index.html`
4. **Modality Hub** — Add card section to `learn/modality/index.html`
5. **Homepage Counter** — Update `data-counter` and CTA text in `index.html`
6. **HANDOFF.md** — Update state and counters

---

## PYTHON BATCH SCRIPT PATTERN

Sessions 38/45/46/48 used Python scripts to batch-update navigation across all HTML files.

**Pattern for adding a new modality section to mega-menu:**
1. Find the last modality `<div class="mega-menu-section"` (currently 3D: `data-tab="3d"`)
2. Insert new section after its closing `</div>`
3. 4 depth variants needed (depths 0, 1, 2, 3 with appropriate relative paths)
4. Skip files that already contain the new section
5. See `update_nav_video.py` for reference implementation (adds Video after Audio)
6. See `update_nav_code.py` for reference implementation (adds links within existing Code tab)
7. See `update_nav_tabbed.py` for tabbed-menu conversion script

---

## MEGA-MENU TABBED ARCHITECTURE (Session 48, updated Session 56)

**Layout:** Sidebar + tabbed progressive disclosure

```css
/* Desktop: 680px, sidebar (quick links + tabs) + right content panels */
.mega-menu--tabbed { display: flex; width: 680px; }
.mega-menu-sidebar { flex: 0 0 190px; display: flex; flex-direction: column; }
.mega-menu-quick-links { /* Glossary, AI Foundations, Prompt Basics, Facts & Fictions — always visible */ }
.mega-menu-tabs { /* Tab buttons generated by JS */ }
.mega-menu--tabbed .mega-menu-section[data-tab] { flex: 1; display: none; columns: 2; }
.mega-menu--tabbed .mega-menu-section[data-tab].is-active { display: block; }

/* Mobile: quick links visible, tabs hidden, sections as accordion */
@media (max-width: 767px) {
    .mega-menu-sidebar { border-right: none; }
    .mega-menu-quick-links { flex-direction: row; flex-wrap: wrap; } /* 2x2 grid */
    .mega-menu-tabs { display: none; }
    .mega-menu--tabbed .mega-menu-section[data-tab] h4 { /* tappable accordion header */ }
    .mega-menu--tabbed .mega-menu-section.is-expanded a { display: block; }
}
```

**HTML structure (all 145 files):**
```html
<div class="mega-menu mega-menu--tabbed">
    <div class="mega-menu-sidebar">
        <div class="mega-menu-quick-links">
            <a href="pages/glossary.html">Glossary</a>
            <a href="foundations/index.html">AI Foundations</a>
            <a href="learn/prompt-basics.html">Prompt Basics</a>
            <a href="learn/facts-fictions.html">Facts & Fictions</a>
        </div>
        <div class="mega-menu-tabs" role="tablist"></div>
    </div>
    <div class="mega-menu-section" data-tab="structured-frameworks">...</div>
    <!-- 11 more data-tab sections -->
</div>
```

**Mobile styling:** Headers 0.86rem, links 0.92rem. Non-clickable headers: `var(--primary)` (red). Clickable headers/links: `#fff`.

**JS:** `TabbedMenu` object in `app.js` — runtime tab button generation from `[data-tab]` section h4 text, mouseenter switching (desktop), h4 click accordion (mobile, all expanded by default, independent toggle), roving tabindex keyboard nav. Mobile menu requires `body.menu-open .header { backdrop-filter: none; }` to prevent CSS containing block from breaking `position: fixed` on `.nav.active`.

**Resources menu** still uses `mega-menu--multi-column` (unchanged).

---

## KEY REFERENCE DOCUMENTS

| Document | Purpose | Lines |
|----------|---------|-------|
| `.claude/SiteFrameworks.md` | **Architecture bible** — WHY behind every decision | 1,200+ |
| `.claude/HANDOFF.md` | Current state (this file) | -- |
| `.claude/COMPLETED.md` | Archived completed work | -- |
| `.claude/testing-procedures.md` | **Site Audit playbook** — 9-phase repeatable audit | ~560 |
| `.claude/plans/FrameworkOverhaul.md` | Master plan -- Phases 1-5 + session log | ~1,950 |
| `learn/self-ask.html` | Canonical 13-section template (depth 1) | 899 |
| `learn/modality/image/image-prompting.html` | Reference for depth 3 modality pages | 883 |
| `update_nav_video.py` | Reference for mega-menu batch update scripts (new tab) | 143 |
| `update_nav_code.py` | Reference for adding links within existing mega-menu tab | 131 |
| `update_nav_3d.py` | Reference for adding 3D tab (13th mega-menu tab) | 131 |
| `update_nav_tabbed.py` | Reference for tabbed-menu conversion script | 157 |
| `update_nav_sidebar.py` | Reference for sidebar quick links conversion (S56) | ~90 |
| `update_nav_emerging.py` | Reference for adding links within existing tabs (S57) | ~100 |
| `update_nav_quicklinks.py` | Reference for adding quick links to sidebar (S57) | ~88 |
| `update_nav_reorder.py` | Reference for reordering quick links (S57) | ~88 |

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
+-- learn/                  # Framework pages (108) + category pages (8) + hub (1)
|   +-- index.html          # Discover hub (108 framework cards, 13 categories)
|   +-- [7 category pages]  # structured-frameworks, reasoning-cot, etc.
|   +-- [71 text framework pages]
|   +-- modality/
|       +-- index.html      # Modality hub page
|       +-- code/           # Code frameworks (8 pages)
|       +-- image/          # Image frameworks (12 pages)
|       +-- audio/          # Audio frameworks (6 pages)
|       +-- video/          # Video frameworks (6 pages)
|       +-- 3d/             # 3D frameworks (5 pages)
+-- data/
|   +-- glossary.json       # 2,141 AI terms
|   +-- search-index.json   # 2,324 search entries
+-- pages/                  # 12 content pages (incl. glossary with inline search)
+-- tools/                  # 12 AI readiness tools
+-- neurodivergence/        # 6 ND pages
+-- patterns/               # 1 page
+-- quiz/                   # 1 page
+-- .claude/
    +-- HANDOFF.md           # THIS FILE
    +-- COMPLETED.md         # Archive of completed work
    +-- SiteFrameworks.md    # Architecture bible (1,200+ lines)
    +-- testing-procedures.md # Site Audit playbook (9 phases)
    +-- plans/
        +-- FrameworkOverhaul.md          # Master plan (Phases 1-5)
        +-- discover-hub-category-pages.md # Discover Hub plan (COMPLETE)
```

---

## 13 FRAMEWORK CATEGORIES (108 framework pages)

| Category | Count | Category Page | Status |
|----------|-------|---------------|--------|
| Getting Started | 2 | -- | No category page needed |
| Structured Frameworks | 5 | `learn/structured-frameworks.html` | DONE |
| Reasoning & CoT | 15 | `learn/reasoning-cot.html` | DONE |
| Decomposition | 8 | `learn/decomposition.html` | DONE |
| Self-Correction | 7 | `learn/self-correction.html` | DONE |
| In-Context Learning | 13 | `learn/in-context-learning.html` | DONE |
| Ensemble Methods | 7 | `learn/ensemble-methods.html` | DONE |
| Prompting Strategies | 14 | `learn/prompting-strategies.html` | DONE |
| Code | 8 | -- | Uses `learn/modality/code/` hub |
| Image | 12 | -- | Uses `learn/modality/image/` via modality hub |
| Audio | 6 | -- | Uses `learn/modality/audio/` via modality hub |
| Video | 6 | -- | Uses `learn/modality/video/` via modality hub |
| 3D | 5 | -- | Uses `learn/modality/3d/` via modality hub |

---

*Always read this file first when resuming work. Follow the critical rules exactly. Read SiteFrameworks.md for deep architectural understanding.*
