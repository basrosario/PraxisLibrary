# Praxis Project Handoff Document

**Last Updated:** 2026-02-06 (Session 31)
**Last Commit:** 1182d5e - feat: Add framework timeline directories to AI Foundations page
**Current Phase:** Framework Quality Redesign (Wave 2 complete, Wave 3 next)

---

## CURRENT SESSION STATUS (Session 31)

### Completed This Session

#### Wave 2: CoT Variants Quality Redesign — COMPLETE (8 pages)
Redesigned all 8 CoT variant pages from ~290 lines to 800-857 lines using the 13-section template.

| # | File | Before | After | Status |
|---|------|--------|-------|--------|
| 1 | `learn/auto-cot.html` | 290 | 855 | ✅ |
| 2 | `learn/contrastive-cot.html` | 296 | 846 | ✅ |
| 3 | `learn/structured-cot.html` | 293 | 805 | ✅ |
| 4 | `learn/faithful-cot.html` | 290 | 853 | ✅ |
| 5 | `learn/complexity-prompting.html` | 286 | 837 | ✅ |
| 6 | `learn/tab-cot.html` | 301 | 844 | ✅ |
| 7 | `learn/reversing-cot.html` | 299 | 857 | ✅ |
| 8 | `learn/cumulative-reasoning.html` | 290 | 854 | ✅ |

**Each page now has all 13 sections:**
1. Hero section with badge + breadcrumb
2. Historical context notice (highlight-box--warning) with framework date + modern LLM relevance
3. Concept explanation (split-section with highlight boxes)
4. How It Works (element-timeline with 4-5 numbered steps + examples)
5. Visual element (comparison-panel or pillar-card grid)
6. Examples — 3 accordion items with technique-demo prompt/response pairs
7. When to Use — Perfect For (4 items) / Skip It When (3 items) feature-lists
8. Use Cases — 6 use-case-showcase items with SVG icons
9. Framework Positioning (evolution-timeline with 4 era-markers)
10. Related Frameworks (3 evolution-callout links)
11. CTA (cta-corporate with neural bg canvas)
12. Back-to-top button
13. Accessibility dashboard dialog (full adl-panel)

**Quality verified:**
- Zero inline styles (`style=""`) across all 8 files
- Zero inline scripts (`onclick=""`, `onload=""`, etc.)
- All styles in styles.css, all scripts via app.js defer
- Historical context notices on all pages
- No citations, no stat cards, no content badges
- Proper HTML comment notation throughout

**Files Modified:**
- `learn/auto-cot.html` — 290→855 lines
- `learn/contrastive-cot.html` — 296→846 lines
- `learn/structured-cot.html` — 293→805 lines
- `learn/faithful-cot.html` — 290→853 lines
- `learn/complexity-prompting.html` — 286→837 lines
- `learn/tab-cot.html` — 301→844 lines
- `learn/reversing-cot.html` — 299→857 lines
- `learn/cumulative-reasoning.html` — 290→854 lines
- `.claude/HANDOFF.md` — this file

---

## NEXT UP: Wave 3 — Decomposition (6 pages)

Each page must be redesigned from ~290 lines to 700-1000+ lines using the 13-section template.

**Reference template:** `learn/critic.html` (898 lines, 13 sections)

| # | File | Current Lines | Target |
|---|------|--------------|--------|
| 1 | `learn/decomp.html` | ~290 | 700-1000+ |
| 2 | `learn/self-ask.html` | ~290 | 700-1000+ |
| 3 | `learn/step-back.html` | ~290 | 700-1000+ |
| 4 | `learn/graph-of-thought.html` | ~290 | 700-1000+ |
| 5 | `learn/program-of-thought.html` | ~290 | 700-1000+ |
| 6 | `learn/recursion-of-thought.html` | ~290 | 700-1000+ |

### Remaining Waves

| Wave | Pages | Status |
|------|-------|--------|
| Wave 1 — Self-Correction | 6 pages | ✅ COMPLETE |
| Wave 2 — CoT Variants | 8 pages | ✅ COMPLETE |
| Wave 3 — Decomposition | 6 pages | ⬜ START HERE |
| Wave 4 — Advanced Reasoning | 7 pages (analogical-reasoning, meta-reasoning, thread-of-thought, memory-of-thought, simtom, max-mutual-info, universal-self-consistency) | ⬜ PENDING |
| Wave 5 — Example Methods | 7 pages (active-prompting, knn-prompting, vote-k, demo-ensembling, diverse-prompting, dense-prompting, prompt-mining) | ⬜ PENDING |
| Wave 6 — Style & Emotion | 6 pages (emotion-prompting, style-prompting, s2a, re2, cosp, rar) | ⬜ PENDING |

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

### 4. Information Accuracy
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

---

*Always read this file first when resuming work. Follow the critical rules exactly.*
