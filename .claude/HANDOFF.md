# Praxis Project Handoff Document

**Last Updated:** 2026-02-07 (Session 39)
**Last Commit:** (pending) — Session 37+38+39 changes ready to commit
**Current Phase:** Homepage Redesign Complete — ready for commit

---

## CURRENT SESSION STATUS (Session 39)

### Completed This Session

#### Homepage Redesign — IMPLEMENTED

Replaced all `<main id="main-content">` content in `index.html` (old lines 196-479) with 6 new sections:

1. **Library at a Glance** — Updated counter-grid: 62+ Frameworks, 2,141+ Glossary Terms, 12 Interactive Tools, 100% Free & Accessible
2. **Explore Frameworks by Category** — 6 icon-box cards (Structured 5, Reasoning 14, Decomposition 7, Self-Correction 7, ICL 9, Advanced 11) + CTA to learn/index.html
3. **Interactive Tools** — 6 icon-box cards (Analyzer, Builder, Matcher, Checklist, Persona, Quiz) + CTA to tools/index.html
4. **AI Foundations & Glossary** — split-section with feature-list (5 eras, 61 frameworks, Turing to LLMs) + highlight-box about 2,141+ glossary terms
5. **Why Praxis** — split-section with feature-list--check (Free, Accessible, ND-inclusive) + highlight-box about ND resources (NO emoji)
6. **Getting Started CTA** — cta-corporate--gradient with quiz + prompt basics buttons

**Quality checks passed:** 0 inline styles, 0 inline scripts, 0 emoji, 0 external resources, all root-level paths, `<!-- === SECTION === -->` notation throughout.

### NOT YET COMMITTED

All Session 37 + Session 38 + Session 39 changes are uncommitted (~100 HTML files + homepage redesign).

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
- **NO HR or remote work examples** — Removed site-wide (Session 37)
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
├── learn/                  # Framework pages (62+)
│   ├── index.html          # Learn hub
│   ├── [62 framework pages] # All redesigned to 13-section template
│   └── modality/code/      # Code frameworks (3 pages)
├── data/
│   ├── glossary.json       # 2,141 AI terms (lazy loaded)
│   └── search-index.json   # 2,218 searchable entries
├── pages/                  # 12 content pages
├── tools/                  # 12 AI readiness tools
├── neurodivergence/        # 6 ND pages
├── patterns/               # 1 page
├── quiz/                   # 1 page
└── .claude/
    ├── HANDOFF.md           # THIS FILE
    ├── COMPLETED.md         # Archive of completed work
    └── plans/
        └── FrameworkOverhaul.md   # Master plan with all phases
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
| `.claude/plans/FrameworkOverhaul.md` | Master plan — see "PART B" section for nav update specs |
| `learn/self-ask.html` | Canonical 13-section template (855 lines) |

---

*Always read this file first when resuming work. Follow the critical rules exactly.*
