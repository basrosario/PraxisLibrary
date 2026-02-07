# Praxis Project Handoff Document

**Last Updated:** 2026-02-06 (Session 34)
**Last Commit:** (pending — Wave 4 complete, awaiting commit)
**Current Phase:** Framework Quality Redesign (Waves 1-4 complete, Wave 5 next)

---

## CURRENT SESSION STATUS (Session 34)

### Completed This Session

#### Wave 4 — Advanced Reasoning: Full Redesign (7 pages)

All 7 pages redesigned from ~290 lines to 830-850 lines using the 13-section template (self-ask.html reference).

| # | File | Lines | Framework Category | Year/Authors |
|---|------|-------|--------------------|--------------|
| 1 | `learn/analogical-reasoning.html` | 839 | Thought Generation | 2023, Yasunaga et al. |
| 2 | `learn/meta-reasoning.html` | 836 | Strategy Selection | 2024, Xu et al. |
| 3 | `learn/thread-of-thought.html` | 850 | Long Context Processing | 2023, Zhou et al. |
| 4 | `learn/memory-of-thought.html` | 847 | Memory Systems | 2023, Li et al. |
| 5 | `learn/simtom.html` | 849 | Perspective Taking | 2023, Wilf et al. |
| 6 | `learn/max-mutual-info.html` | 830 | Example Selection | 2022 |
| 7 | `learn/universal-self-consistency.html` | 846 | Ensemble Methods | 2023, Chen et al. |

**Quality checks passed:** 0 inline styles, 0 inline scripts, 0 external resources, all 13 sections present in every file, accessibility dashboard included.

---

## NEXT UP: Wave 5 — Example Methods (7 pages)

Each page must be redesigned from ~290 lines to 700-1000+ lines using the 13-section template.

**Reference template:** `learn/self-ask.html` (855 lines, 13 sections)

| # | File | Current Lines | Target |
|---|------|--------------|--------|
| 1 | `learn/active-prompting.html` | ~290 | 700-1000+ |
| 2 | `learn/knn-prompting.html` | ~290 | 700-1000+ |
| 3 | `learn/vote-k.html` | ~290 | 700-1000+ |
| 4 | `learn/demo-ensembling.html` | ~290 | 700-1000+ |
| 5 | `learn/diverse-prompting.html` | ~290 | 700-1000+ |
| 6 | `learn/dense-prompting.html` | ~290 | 700-1000+ |
| 7 | `learn/prompt-mining.html` | ~290 | 700-1000+ |

### Remaining Waves

| Wave | Pages | Status |
|------|-------|--------|
| Wave 1 — Self-Correction | 6 pages | ✅ COMPLETE |
| Wave 2 — CoT Variants | 8 pages | ✅ COMPLETE |
| Wave 3 — Decomposition | 6 pages | ✅ COMPLETE |
| Wave 4 — Advanced Reasoning | 7 pages | ✅ COMPLETE |
| Wave 5 — Example Methods | 7 pages (active-prompting, knn-prompting, vote-k, demo-ensembling, diverse-prompting, dense-prompting, prompt-mining) | ⬜ START HERE |
| Wave 6 — Style & Emotion | 6 pages (emotion-prompting, style-prompting, s2a, re2, cosp, rar) | ⬜ PENDING |

---

## ARCHITECTURAL NOTES

### resolveInternalUrl() — Universal Path Resolver (app.js ~471)
```javascript
function resolveInternalUrl(targetPath) {
    // Skip absolute, anchor-only, or already-resolved paths
    if (!targetPath || targetPath.startsWith('http') || targetPath.startsWith('/') ||
        targetPath.startsWith('#') || targetPath.startsWith('mailto:')) {
        return targetPath;
    }
    const pathname = window.location.pathname;
    const segments = pathname.replace(/^\//, '').split('/');
    const depth = Math.max(0, segments.length - 1); // -1 for filename
    if (depth === 0) return targetPath;
    return '../'.repeat(depth) + targetPath;
}
```
**Usage:** `resolveInternalUrl('pages/glossary.html#term-foo')` — always pass root-relative paths (no `../` prefix). The function calculates the correct prefix based on current page depth.

### Search Modal Architecture (app.js ~8394-8810)
- `createSearchModal()` — generates HTML, injected into DOM
- `searchModal.init()` — attaches all event listeners
- `searchModal.open()` / `.close()` — toggle visibility + body overflow
- `searchModal.navigateToResult(href)` — handles same-page hash vs. full navigation
- `searchPraxis(query)` — searches index, returns grouped results (Glossary first)
- `renderSearchResults(grouped, query)` — renders result HTML with highlight marks

---

## CRITICAL RULES - MUST FOLLOW

### 1. Security & CSP Compliance (A+ Rating)
- **NO inline styles** — Never use `style=""` attributes
- **NO inline scripts** — Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** — No CDNs, Google Fonts, external APIs
- **All styles → styles.css** (single file)
- **All scripts → app.js** (single file with `defer`)

### 2. Content Rules
- **NO citations on framework pages** (per user request, Session 25)
- **NO stat cards** — Use highlight-box components instead
- **NO content badges** — Removed from all learn pages (Session 29)
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
- Never hardcode `../` prefixes for dynamic links — the function handles all depths

### 5. Information Accuracy
- All historical/factual claims must be verified from .edu or .gov sources
- No fake, made up, or misleading information
- Framework dates and relevancy status must be academically verified

---

## FILE STRUCTURE

```
_public_html/
├── index.html              # Home page (updated hero)
├── styles.css              # ALL CSS (single file)
├── app.js                  # ALL JavaScript (single file)
├── foundations/
│   └── index.html          # AI Foundations timeline (5 eras + framework directories)
├── learn/                  # Framework pages (40+)
│   ├── [all framework pages]
│   └── modality/code/      # Code frameworks (3 pages)
├── data/
│   ├── glossary.json       # 2,141 AI terms (lazy loaded)
│   └── search-index.json   # 2,218 searchable entries
├── pages/
│   └── glossary.html       # Glossary page (686 lines, shells only)
└── .claude/
    ├── HANDOFF.md           # THIS FILE
    ├── COMPLETED.md         # Archive of completed work
    └── plans/
        └── FrameworkOverhaul.md   # Master plan + 40-page redesign waves
```

---

## INTERACTIVE COMPONENTS AVAILABLE

| Component | CSS Class | Use For |
|-----------|-----------|---------|
| Accordions | `.accordion-item`, `.accordion-header`, `.accordion-content` | Expandable sections |
| Comparison panels | `.comparison-panel` | Before/after, side-by-side |
| Element timelines | `.element-timeline` | Step-by-step processes |
| Feature lists | `.feature-list` | Perfect For / Skip It When |
| Pillar cards | `.pillar-card`, `.pillar-card--featured` | Card grids |
| Evolution timeline | `.evolution-timeline`, `.era-marker` | Framework positioning |
| Evolution callout | `.evolution-callout` | Related framework links |
| Use case showcase | `.use-case-showcase` | Application scenarios |
| Technique demo | `.technique-demo` | Interactive demonstrations |
| Scenario timeline | `.scenario-timeline` | Multi-step examples |
| Conversation timeline | `.conversation-timeline` | Dialogue examples |
| Highlight boxes | `.highlight-box`, `.highlight-box--warning` | Callouts, notices |
| Split sections | `.split-section` | Two-column layouts |
| History events | `.history-event`, `.history-event--landmark` | Timeline events |
| Era headers | `.era-header` | Timeline era sections |
| Era frameworks | `.era-frameworks`, `.era-frameworks__grid` | Framework directory grids |
| Framework status | `.framework-status--active`, `--adopted`, `--historical` | Relevancy badges |
| CTA corporate | `.cta-corporate` | Call to action with neural bg |

---

## REFERENCE

| Document | Purpose |
|----------|---------|
| `.claude/HANDOFF.md` | Current state (this file) |
| `.claude/COMPLETED.md` | Archived completed work |
| `.claude/plans/FrameworkOverhaul.md` | Master plan with session logs + 40-page redesign waves |
| `learn/critic.html` | Reference template for quality redesign (898 lines, 13 sections) |
| `learn/auto-cot.html` | Alternate reference template (855 lines, 13 sections) |

---

*Always read this file first when resuming work. Follow the critical rules exactly.*
