# Praxis Project Handoff Document

**Last Updated:** 2026-02-05 (Session 30)
**Last Commit:** (pending — Track B foundations timeline)
**Current Phase:** Framework Quality Redesign (Wave 2 next) + AI Foundations Timeline (complete)

---

## CURRENT SESSION STATUS (Session 30)

### Completed This Session

#### 1. Track B: AI Foundations Framework Timeline — COMPLETE
Added framework directory grids to `foundations/index.html` under Era IV and Era V:
- **Era IV (2020-2022):** 23 frameworks in two-column grid with relevancy status badges
  - 5 tagged "Adopted into LLMs" (Few-Shot, Zero-Shot, One-Shot, Role Prompting, Zero-Shot CoT)
  - 18 tagged "Still active technique" (Chain-of-Thought, Self-Consistency, ReAct, etc.)
- **Era V (2023-2026):** 38 frameworks in two-column grid with relevancy status badges
  - All tagged "Still active technique" (Self-Refine, Tree of Thought, CRITIC, CRISP, CRISPE, COSTAR, etc.)
- **New CSS added to styles.css:** `.era-frameworks`, `.era-frameworks__grid`, `.era-frameworks__item`, `.era-frameworks__link`, `.framework-status` badges (--active green, --adopted blue, --historical gray)
- Responsive: two columns on desktop, single column on mobile
- Each framework name links to its learn page
- Eras I-III correctly have no frameworks (pre-prompting era)

**Files Modified:**
- `foundations/index.html` — added framework directory grids to Era IV and Era V
- `styles.css` — added era-frameworks CSS (~80 lines after history-event section)
- `.claude/HANDOFF.md` — this file

### Commits This Session
```
(pending)
```

---

## NEXT UP: Track A — Framework Quality Redesign

### Wave 2: CoT Variants (8 pages) — START HERE
Each page must be redesigned from ~290 lines to 700-1000+ lines using the 13-section template.

**Reference template:** `learn/critic.html` (898 lines, 13 sections)

| # | File | Current Lines | Target |
|---|------|--------------|--------|
| 1 | `learn/auto-cot.html` | ~290 | 700-1000+ |
| 2 | `learn/contrastive-cot.html` | ~290 | 700-1000+ |
| 3 | `learn/structured-cot.html` | ~290 | 700-1000+ |
| 4 | `learn/faithful-cot.html` | ~290 | 700-1000+ |
| 5 | `learn/complexity-prompting.html` | ~290 | 700-1000+ |
| 6 | `learn/tab-cot.html` | ~290 | 700-1000+ |
| 7 | `learn/reversing-cot.html` | ~290 | 700-1000+ |
| 8 | `learn/cumulative-reasoning.html` | ~290 | 700-1000+ |

**Per-page template (13 sections):**
1. Hero section with badge
2. Historical context notice (highlight-box--warning) — framework date + modern relevance
3. Concept explanation
4. How It Works (element-timeline with numbered steps)
5. Visual element (comparison panel or technique demo)
6. Examples — 3 accordion items with real prompt/response scenarios
7. When to Use — Perfect For / Skip It When (feature-list)
8. Use Cases — 6 use-case-showcase items
9. Framework Positioning (evolution-timeline)
10. Related Frameworks (evolution-callout)
11. CTA (cta-corporate with neural bg)
12. Back-to-top button
13. Accessibility dashboard dialog

### Remaining Waves After Wave 2

| Wave | Pages | Status |
|------|-------|--------|
| Wave 1 — Self-Correction | 6 pages | ✅ COMPLETE |
| Wave 2 — CoT Variants | 8 pages | ⬜ START HERE |
| Wave 3 — Decomposition | 6 pages (decomp, self-ask, step-back, graph-of-thought, program-of-thought, recursion-of-thought) | ⬜ PENDING |
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
