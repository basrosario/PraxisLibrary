# Praxis Project Handoff Document

**Last Updated:** 2026-02-04 (Session 21)
**Last Commit:** d916517 - docs: Framework Overhaul master plan (89 new pages)
**Current Phase:** Framework Overhaul - Ready to Begin Implementation

---

## ACTIVE PROJECT: Framework Overhaul

**Master Plan:** `.claude/plans/FrameworkOverhaul.md`
**Detailed Breakdown:** `.claude/plans/prompt-report-expansion-plan.md`

**Scope:**
- 33 glossary terms to add
- 52 text framework pages (from Prompt Report)
- 37 modality framework pages
- **89 total new pages**

**Status:** ✅ Planning complete, ready to begin implementation

**Uncommitted Changes (from Session 21):**
- `.htaccess` - Removed unused font caching rules (woff2, woff, ttf, otf)
- `styles.css` - Fixed z-index stacking for timeline animation on foundations/index.html
  - `.history-timeline::before`: z-index: 0 (vertical line)
  - `.history-event__content`: z-index: 1 (cards)
  - `.history-event__marker`: z-index: 2 (year pills)
- `.claude/plans/FrameworkOverhaul.md` - Added Phase 5: Navigation UX Overhaul

**Next Steps (for next session):**
1. Commit the uncommitted changes above
2. **Phase 5: Navigation UX Overhaul** (do BEFORE content phases)
   - Move Neurodivergence menu under Resources
   - Implement accordion-style mega-menus
   - Add multi-column link layout (8 links max per column)
   - Mobile: auto-collapse on scroll/click another menu
   - Desktop: collapse only if content hits viewport bottom
3. Begin Phase 1: Add 33 glossary terms
4. Create framework page template

---

## CRITICAL RULES - MUST FOLLOW

### 1. Security & CSP Compliance (A+ Rating Maintained)

**NEVER violate these CSP rules:**

```
Content-Security-Policy:
  default-src 'none';
  connect-src 'self';
  form-action 'none';
  base-uri 'none';
  font-src 'self';
  img-src 'self' data:;
  style-src 'self';
  script-src 'self';
```

| Rule | What It Means |
|------|---------------|
| **NO inline styles** | Never use `style=""` attributes in HTML |
| **NO inline scripts** | Never use `onclick=""`, `onload=""`, or `<script>` with code |
| **NO external resources** | No CDNs, no Google Fonts, no external APIs |
| **NO eval or similar** | No dynamic code execution |
| **All styles in styles.css** | Every style must be in the external stylesheet |
| **All scripts in app.js** | Every script must be in the external JavaScript file |

### 2. Performance Standards (100% Lighthouse Score)

- **No render-blocking resources** - Use `defer` for scripts
- **Minimal DOM depth** - Keep HTML structure clean
- **Efficient selectors** - Avoid overly complex CSS selectors
- **No unused code** - Remove anything not actively used

### 3. Code Quality Standards

| Standard | Description |
|----------|-------------|
| **Clean, readable code** | Self-documenting, logical organization |
| **DRY principle** | Don't Repeat Yourself - reuse components |
| **Consistent naming** | BEM-style CSS (`.block__element--modifier`) |
| **No magic numbers** | Use CSS variables for values |

### 4. Accessibility Standards (WCAG AA)

- All images must have meaningful `alt` text
- Color contrast must meet WCAG AA (4.5:1 for text)
- All interactive elements keyboard accessible
- Proper heading hierarchy (h1 → h2 → h3)

### 5. Code Notation Standards

```
HTML:  <!-- === SECTION === --> ... <!-- /SECTION -->
CSS:   /* === SECTION === */ ... /* Component ---- */
JS:    // === SECTION === ... /** JSDoc comments */
```

### 6. Citation Standards (STRICT)

- .EDU domains only (Stanford, MIT, CMU, etc.)
- .GOV domains only (NIST, access-board.gov, nsf.gov, etc.)
- Publication date: 2024-2026 only
- Citation at point of delivery for ALL facts
- NO blogs, social media, news channels, or opinion pieces
- **MANDATORY LINKS** - Every citation MUST include a direct URL
- **NO LINK = NO FACT** - Cannot find a verifiable source? Don't add the claim.
- See [facts-fictions.html](learn/facts-fictions.html) for citation format example

---

## FILE STRUCTURE

```
_public_html/
├── index.html              # Home page
├── styles.css              # ALL styles (single file)
├── app.js                  # ALL JavaScript (single file)
├── learn/                  # Learning content (framework pages go here)
├── tools/                  # Interactive tools
├── patterns/               # Patterns Library
├── quiz/                   # Readiness Quiz
├── pages/                  # Static pages (about, faq, glossary, etc.)
└── .claude/
    ├── HANDOFF.md          # THIS FILE - Current state
    ├── COMPLETED.md        # Archived completed tasks
    └── plans/              # Planning documents
        ├── FrameworkOverhaul.md           # Master plan for 89 pages
        └── prompt-report-expansion-plan.md # Detailed page breakdown
```

---

## FRAMEWORK OVERHAUL PHASES

### Phase 5: Navigation UX Overhaul (DO FIRST)
**Priority:** HIGH - Complete before adding new pages

| Task | Description |
|------|-------------|
| 5A | Move Neurodivergence menu under Resources |
| 5B | Accordion menu behavior (click to expand/collapse) |
| 5C | Multi-column link layout (8 links max per column) |
| 5D | Mobile: auto-collapse on scroll or click another menu |
| 5E | Desktop: collapse only if content overflows viewport |
| 5F | Update all 48+ navigation files |

### Phase 1: Glossary (33 terms)
Add to pages/glossary.html - terms listed in prompt-report-expansion-plan.md

### Phase 2: Text Framework Pages (52 pages)
**HIGH Priority (12 pages):**
- zero-shot.html, zero-shot-cot.html, one-shot.html
- least-to-most.html, plan-and-solve.html, tree-of-thought.html
- self-refine.html, self-verification.html
- example-selection.html, emotion-prompting.html
- graph-of-thought.html, chain-of-verification.html

**MEDIUM Priority (15 pages)** - See master plan
**LOW Priority (25 pages)** - See master plan

### Phase 3: Modality Framework Pages (37 pages)
New directory structure: `learn/modality/` with subdirectories for image, audio, video, code, 3d

### Phase 4: Site Integration
- Update navigation in all 48+ HTML files
- Update search index
- Cross-link related frameworks

---

## COMPLETED PHASES (Historical)

*See `.claude/COMPLETED.md` for full details on completed work.*

- Phase 0: Prompt Analyzer Fix
- Phase 1: Badge Relocation & Text Updates
- Phase 2: Natural Language Content
- Phase 3: Accordion Content Structure
- Phase 4: Search Tags & Metadata (250+ entries)
- Phase 5: Search UI Implementation
- Phase 7: Full Site Audit (Session 18)
- Resource Pages Enhancement (Sessions 17-18)
- Facts & Fictions Page (Session 19)
- Language Shift: Educational → Informational (Session 20)
- Framework Overhaul Planning (Session 21)

---

## DEFERRED TASKS

| Task | Description | Priority |
|------|-------------|----------|
| 1.9 | Badge lightbox popups (smoked glass effect) | Low |
| 1.10 | Animation term glossary links | Low |
| Phase 6 | Developer Tooling (validators, link checker) | Future |
| Neurodivergence Initiative | AI + Neurodivergence resource center | Future |

---

## REFERENCE DOCUMENTS

| Document | Purpose |
|----------|---------|
| `.claude/HANDOFF.md` | Current state (this file) |
| `.claude/COMPLETED.md` | Archived completed tasks |
| `.claude/plans/FrameworkOverhaul.md` | Framework Overhaul master plan |
| `.claude/plans/prompt-report-expansion-plan.md` | Detailed page breakdown |

---

## CONTACT

- **Founder:** Basiliso Rosario
- **LinkedIn:** linkedin.com/in/basiliso-rosario/
- **Email:** bas.rosario@gmail.com

---

*This document ensures seamless continuity between sessions. Always read this file first when resuming work.*
