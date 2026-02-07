# Praxis Project Handoff Document

**Last Updated:** 2026-02-07 (Session 37)
**Last Commit:** (pending) — Session 37 changes not yet committed
**Current Phase:** Part B — Full Navigation Update (next task)

---

## CURRENT SESSION STATUS (Session 37)

### Completed This Session

#### Part A — 22-Page 13-Section Redesign (ALL COMPLETE)

22 framework pages that still used the old template were rewritten from scratch to the 13-section template (self-ask.html reference). Completed in 4 waves of parallel agents:

| Wave | Files | New Lines | Status |
|------|-------|-----------|--------|
| **A — Foundation** | chain-of-thought (827), few-shot-learning (818), zero-shot (816), one-shot (825), role-prompting (818), self-consistency (829) | 4,933 total | ✅ |
| **B — Structured** | crisp (861), crispe (869), costar (892), constrained-output (833), context-structure (875), prompt-chaining (845) | 5,175 total | ✅ |
| **C — Advanced** | tree-of-thought (858), plan-and-solve (857), least-to-most (853), example-selection (829), shot-prompting (834) | 4,231 total | ✅ |
| **D — Flagship** | react (859), flipped-interaction (848), prompt-basics (840), zero-shot-cot (840), facts-fictions (834) | 4,221 total | ✅ |

**Quality checks passed:** 0 inline styles, 0 inline scripts, 0 CSP meta tags, all 13 sections present, all files 700+ lines.

#### HR/Remote Work Content Cleanup

Removed ALL examples referencing remote work, HR, hiring, job postings, etc. from ~15 learn pages. Replaced with technology, science, education, and general business examples.

#### AI For Everybody Text Update

Updated "Who Praxis Serves" section on `pages/ai-for-everybody.html` with user's rewritten text.

### NOT YET COMMITTED

All Session 37 changes are uncommitted and need to be committed before starting Part B.

---

## NEXT TASK: Part B — Full Navigation Update (~100 HTML pages)

### What Needs to Happen

The header mega-menu currently lists only ~47 learn pages but there are now 62+ framework pages. ALL HTML pages across the entire site need their header nav, footer, and mobile nav updated to a single canonical version.

### Approach

1. **Define canonical nav HTML** for 3 depth levels:
   - Root level (index.html) — paths like `learn/foo.html`
   - One-deep (~96 files) — paths like `../learn/foo.html`
   - Two-deep (3 files) — paths like `../../learn/foo.html`

2. **Use parallel agents** to update files in batches by directory

3. **Mega-menu Learn section** must include ALL 62+ framework pages organized by category

### File Inventory (100 total)

| Directory | Files | Depth |
|-----------|-------|-------|
| Root `index.html` | 1 | root |
| `pages/*.html` | 12 | one-deep |
| `tools/*.html` | 12 | one-deep |
| `foundations/index.html` | 1 | one-deep |
| `patterns/index.html` | 1 | one-deep |
| `quiz/index.html` | 1 | one-deep |
| `neurodivergence/*.html` | 6 | one-deep |
| `learn/*.html` | ~63 (excl. temp files) | one-deep |
| `learn/modality/code/*.html` | 3 | two-deep |

**Note:** learn/ contains 4 temp files to ignore: `_mmi_temp.html`, `analogical-reasoning-new.html`, `graph-of-thought-new.html`, `mot_new.html`

### Full Plan Details

See `.claude/plans/FrameworkOverhaul.md` → "PART B — Full Navigation Update" section for complete specifications.

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
