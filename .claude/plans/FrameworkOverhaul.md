# Framework Overhaul Master Plan

**Project:** Comprehensive expansion of Praxis Library frameworks based on The Prompt Report
**Source:** arXiv:2406.06608v6 - "The Prompt Report: A Systematic Survey of Prompting Techniques"
**Start Date:** 2026-02-04
**Last Updated:** 2026-02-07 (Session 48)

---

## Table of Contents
1. [Non-Negotiable Standards](#non-negotiable-standards)
2. [Content & Citation Rules](#content--citation-rules)
3. [Design Principles](#design-principles)
4. [Project Scope](#project-scope)
5. [Phase Breakdown](#phase-breakdown)
   - Phase 1: Glossary (33 terms)
   - Phase 2: Text Frameworks (52 pages)
   - Phase 3: Modality Frameworks (37 pages)
   - Phase 4: Site Integration
   - Phase 5: Navigation UX Overhaul
6. [Session Log](#session-log)

---

# NON-NEGOTIABLE STANDARDS

## 1. CSP Compliance (A+ Security Rating)

**Content-Security-Policy Header:**
```
default-src 'none';
connect-src 'self';
form-action 'none';
base-uri 'none';
font-src 'self';
img-src 'self' data:;
style-src 'self';
script-src 'self';
```

### Absolute Rules - NEVER VIOLATE

| Rule | Description | Example of Violation |
|------|-------------|---------------------|
| **NO inline styles** | Never use `style=""` attributes | `<div style="color:red">` |
| **NO inline scripts** | Never use event handlers in HTML | `onclick=""`, `onload=""`, `onmouseover=""` |
| **NO inline `<script>` blocks** | All JS in app.js | `<script>alert('x')</script>` |
| **NO external resources** | No CDNs, external fonts, APIs | `<link href="fonts.googleapis.com">` |
| **NO eval() or similar** | No dynamic code execution | `eval()`, `new Function()`, `setTimeout("code")` |

### Implementation Requirements

```
ALL styles → styles.css (single file)
ALL scripts → app.js (single file, with defer attribute)
ALL fonts → local files in project
ALL images → local files or data: URIs
```

### Pre-Commit Checklist
- [ ] Zero `style=""` attributes in new HTML
- [ ] Zero `onclick`, `onload`, or other event handlers in HTML
- [ ] Zero external resource URLs
- [ ] Browser console shows no CSP violations
- [ ] Security scan maintains A+ rating

---

## 2. Performance Standards (100% Lighthouse Score)

| Metric | Target | Implementation |
|--------|--------|----------------|
| Performance | 100 | No render-blocking, minimal DOM |
| Accessibility | 100 | WCAG AA compliance |
| Best Practices | 100 | Modern standards |
| SEO | 100 | Proper metadata |

### Requirements
- Scripts use `defer` attribute
- CSS is non-blocking
- Images are optimized
- No unused CSS/JS code
- Minimal DOM depth

---

## 3. Accessibility Standards (WCAG AA)

| Requirement | Standard |
|-------------|----------|
| Color contrast | 4.5:1 minimum for text |
| Keyboard navigation | All interactive elements accessible |
| Alt text | Meaningful descriptions for all images |
| Heading hierarchy | Proper h1 → h2 → h3 sequence |
| Focus indicators | Visible focus states |
| Skip links | "Skip to main content" on all pages |

---

## 4. Code Notation Standards

### HTML Notation
```html
<!-- === SECTION NAME === -->
<section>
    <!-- Content here -->
</section>
<!-- /SECTION NAME -->
```

### CSS Notation
```css
/* === SECTION NAME === */

/* Component ---- */
.component-name { }
.component-name__element { }
.component-name--modifier { }
```

### JavaScript Notation
```javascript
// === SECTION NAME ===

/**
 * JSDoc comment for functions
 * @param {string} param - Description
 * @returns {void}
 */
function functionName(param) { }
```

### BEM Naming Convention
```
.block { }           /* Component container */
.block__element { }  /* Child element */
.block--modifier { } /* Variant */
```

---

# CONTENT & CITATION RULES

## Non-Debatable Content Standards

Based on the Facts & Fictions page methodology, ALL factual claims must follow these rules:

### Source Requirements (STRICT)

| Allowed Sources | NOT Allowed |
|-----------------|-------------|
| .EDU domains (universities) | Social media posts |
| .GOV domains (government) | Independent blogs |
| Peer-reviewed journals | News channels (local/national) |
| Accredited institutions | Opinion pieces |
| Official technical standards (W3C, IEEE) | Marketing materials |
| | Freelance articles |
| | Wikipedia (use as starting point only) |

### Approved Source Examples

**Government (.gov):**
- NIST (nist.gov)
- FTC (ftc.gov)
- CISA (cisa.gov)
- NSF (nsf.gov)
- Access Board (access-board.gov)
- Census Bureau (census.gov)

**Academic (.edu):**
- Stanford HAI (hai.stanford.edu)
- MIT CSAIL (csail.mit.edu)
- CMU (cmu.edu)
- UC Berkeley
- Wharton (wharton.upenn.edu)

**Standards Bodies:**
- W3C (w3.org)
- CAST.org
- IEEE

### Citation Format

**In-page citations:**
```html
<span class="myth-fact-card__source">Source Name (Year)</span>
```

**For statistics and claims:**
```html
<p>Claim text here.</p>
<span class="citation">University Name, Department (2025)</span>
```

### Publication Date Requirements
- **Preferred:** 2024-2026
- **Acceptable:** 2022-2026 for foundational research
- **Never:** Pre-2020 for AI/ML statistics

### Citation Rules

**⚠️ USER PREFERENCE (Session 25): NO CITATIONS on framework pages**
- Citations/sources sections have been deferred
- May be added later if requested

~~Original rules (for reference when citations are needed):~~
1. ~~Point of Delivery - Cite at the exact location of the claim~~
2. ~~Verifiable - All sources must be publicly accessible~~
3. ~~No Stacking - One claim, one source (not "multiple studies show")~~
4. ~~Specific - Name the institution, not "researchers found"~~
5. ~~MANDATORY LINKS - Every citation MUST include a direct URL to the source~~
6. ~~NO LINK = NO FACT - If you cannot find a verifiable source with a working URL, DO NOT add the claim to the site~~

### Citation Format (REQUIRED)

**In-text citation:**
```html
<span class="myth-fact-card__source">Institution Name (Year)</span>
```

**Sources section (bottom of page):**
```html
<section class="section citations-section">
    <div class="container">
        <h2>Sources</h2>
        <ul class="citation-list">
            <li class="citation-item">
                <a href="https://actual-url.edu/path" target="_blank" rel="noopener noreferrer">
                    Full Title - Institution Name (Year)
                </a>
            </li>
        </ul>
    </div>
</section>
```

**Example (from Facts & Fictions):**
```html
<!-- In-text -->
<span class="myth-fact-card__source">MIT News (July 2024)</span>

<!-- Sources section -->
<li class="citation-item">
    <a href="https://news.mit.edu/2024/large-language-models-dont-behave-like-people-0723"
       target="_blank" rel="noopener noreferrer">
        Large Language Models Don't Behave Like People - MIT News (July 2024)
    </a>
</li>
```

### Content That Requires Citation

| Always Cite | Never Needs Citation |
|-------------|---------------------|
| Statistics and percentages | General framework descriptions |
| Research findings | How-to instructions |
| Claims about AI capabilities | Code examples |
| Performance benchmarks | UI/UX patterns |
| Historical facts with dates | Best practice recommendations |

---

# DESIGN PRINCIPLES

## Visual Consistency

### Page Structure Template (Updated Session 29)
```html
1. Skip link
2. Header with navigation
3. Hero section (page-hero class)
4. Historical context notice (highlight-box--warning)
5. Concept explanation
6. How It Works (element-timeline)
7. Visual element (comparison panel / technique demo)
8. Examples (3 accordions)
9. When to Use (Perfect For / Skip It When feature lists)
10. Use Cases (6 use-case-showcase items)
11. Framework Positioning (evolution-timeline)
12. Related Frameworks (evolution-callout)
13. CTA (cta-corporate)
14. Back-to-top button
15. Footer
16. Accessibility dialog
17. Scripts (deferred)
```

### Required Components Per Framework Page (Updated Session 29)

| Component | Purpose |
|-----------|---------|
| Hero badge | Category indicator (Foundation, Advanced, etc.) |
| Historical context notice | Framework origin date + modern LLM relevancy status |
| Element timeline | Step-by-step how-it-works process |
| Comparison panel | Before/after, side-by-side demonstrations |
| Accordion examples | 3 expandable prompt/response examples |
| Feature lists | Perfect For / Skip It When checklists |
| Use case showcase | 6 application scenarios |
| Evolution timeline | Framework positioning in prompt engineering history |
| Evolution callout | Related framework links |
| CTA corporate | Call to action with neural background |
| Accessibility dashboard | Dialog with accessibility info |

**Note:** Content badges were removed from all learn pages (Session 29). No citations on framework pages (Session 25).

### CSS Variables (Use These)

```css
/* Colors */
--primary, --secondary, --accent
--text, --text-muted, --text-light
--surface, --surface-alt, --border

/* Spacing */
--space-xs, --space-sm, --space-md, --space-lg, --space-xl, --space-2xl

/* Typography */
--font-sans, --font-mono
--radius, --radius-lg
```

### Existing Reusable Components

| Component | Class | Use For |
|-----------|-------|---------|
| Feature cards | `.feature-card` | Benefits/features grid |
| Icon boxes | `.icon-box` | Clickable framework links |
| Stat cards | `.stat-card` | Key statistics |
| Highlight box | `.highlight-box` | Callouts, warnings |
| Myth/fact cards | `.myth-fact-card` | Research comparisons |
| Accordion | `.accordion` | Expandable content |
| Timeline | `.timeline` | Sequential content |

---

# PROJECT SCOPE

## Summary

| Category | Count |
|----------|-------|
| Glossary terms to add | 33 |
| Text framework pages | 52 |
| Modality framework pages | 37 |
| **Total new pages** | **89** |
| Navigation updates | 48+ files |
| Navigation UX overhaul | Accordion menus + multi-column |

## Current Site Frameworks (11 existing)

1. CRISP Framework (crisp.html)
2. CRISPE Framework (crispe.html)
3. COSTAR Framework (costar.html)
4. ReAct Framework (react.html) ✓ In Prompt Report
5. Flipped Interaction (flipped-interaction.html)
6. Chain-of-Thought (chain-of-thought.html) ✓ In Prompt Report
7. Few-Shot Learning (few-shot-learning.html) ✓ In Prompt Report
8. Role Prompting (role-prompting.html) ✓ In Prompt Report
9. Constrained Output (constrained-output.html)
10. Self-Consistency (self-consistency.html) ✓ In Prompt Report
11. Prompt Chaining (prompt-chaining.html) ✓ In Prompt Report

**6 frameworks overlap with Prompt Report = 52 new text framework pages needed**

---

# PHASE BREAKDOWN

## Phase 1: Glossary Expansion (33 Terms)

**Priority:** HIGH
**Status:** Not Started

Add these prompting vocabulary terms to `pages/glossary.html`:

| Term | Letter | Category Tag |
|------|--------|--------------|
| Answer Engineering | A | Prompting |
| Beam Search | B | Prompting |
| Cloze Prompt | C | Prompting |
| Context Window | C | Prompting |
| Continuous Prompt | C | Prompting |
| Decomposition | D | Prompting |
| Demonstration | D | Prompting |
| Discrete Prompt | D | Prompting |
| Ensemble | E | Prompting |
| Exemplar | E | Prompting |
| Gradient-based Search | G | Prompting |
| Greedy Decoding | G | Prompting |
| In-Context Learning | I | Prompting |
| Jailbreak | J | Prompting |
| Label Space | L | Prompting |
| Prefix Prompt | P | Prompting |
| Prompt Generation | P | Prompting |
| Prompt Injection | P | Prompting |
| Prompt Mining | P | Prompting |
| Prompt Paraphrasing | P | Prompting |
| Prompt Scoring | P | Prompting |
| Prompt Template | P | Prompting |
| Rationale | R | Prompting |
| Reasoning Chain | R | Prompting |
| Refinement | R | Prompting |
| Retrieval-Augmented | R | Prompting |
| Self-Critique | S | Prompting |
| Temperature | T | Prompting |
| Token Budget | T | Prompting |
| Tool Use | T | Prompting |
| Top-k Sampling | T | Prompting |
| Top-p Sampling | T | Prompting |
| Verbalizer | V | Prompting |

---

## Phase 2: Text Framework Pages (52 Pages)

### 2A: Zero-Shot Frameworks (8 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| Zero-Shot | zero-shot.html | HIGH | Not Started |
| Emotion Prompting | emotion-prompting.html | MEDIUM | Not Started |
| Style Prompting | style-prompting.html | MEDIUM | Not Started |
| S2A (System 2 Attention) | s2a.html | LOW | Not Started |
| SimToM | simtom.html | LOW | Not Started |
| RaR (Rephrase and Respond) | rar.html | MEDIUM | Not Started |
| RE2 (Re-Reading) | re2.html | LOW | Not Started |
| Self-Ask | self-ask.html | MEDIUM | Not Started |

### 2B: In-Context Learning Frameworks (10 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| One-Shot | one-shot.html | HIGH | Not Started |
| Many-Shot | many-shot.html | MEDIUM | Not Started |
| Example Selection | example-selection.html | HIGH | Not Started |
| Example Ordering | example-ordering.html | MEDIUM | Not Started |
| KNN Prompting | knn-prompting.html | LOW | Not Started |
| Vote-k | vote-k.html | LOW | Not Started |
| Self-Generated ICL | self-generated-icl.html | MEDIUM | Not Started |
| Demonstration Ensembling | demo-ensembling.html | LOW | Not Started |
| Active Example Selection | active-example.html | LOW | Not Started |
| Prompt Mining | prompt-mining.html | LOW | Not Started |

### 2C: Thought Generation Frameworks (12 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| Zero-Shot CoT | zero-shot-cot.html | HIGH | Not Started |
| Analogical Reasoning | analogical-reasoning.html | MEDIUM | Not Started |
| Step-Back Prompting | step-back.html | MEDIUM | Not Started |
| Thread of Thought | thread-of-thought.html | LOW | Not Started |
| Tab-CoT | tab-cot.html | LOW | Not Started |
| Contrastive CoT | contrastive-cot.html | MEDIUM | Not Started |
| Uncertainty-Routed CoT | uncertainty-cot.html | LOW | Not Started |
| Complexity-Based Prompting | complexity-prompting.html | LOW | Not Started |
| Active Prompting | active-prompting.html | LOW | Not Started |
| Memory-of-Thought | memory-of-thought.html | LOW | Not Started |
| Auto-CoT | auto-cot.html | MEDIUM | Not Started |
| Structured CoT | structured-cot.html | LOW | Not Started |

### 2D: Decomposition Frameworks (8 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| Least-to-Most | least-to-most.html | HIGH | Not Started |
| DECOMP | decomp.html | MEDIUM | Not Started |
| Plan-and-Solve | plan-and-solve.html | HIGH | Not Started |
| Tree of Thought (ToT) | tree-of-thought.html | HIGH | Not Started |
| Graph of Thought (GoT) | graph-of-thought.html | MEDIUM | Not Started |
| Recursion of Thought | recursion-of-thought.html | LOW | Not Started |
| Program of Thought | program-of-thought.html | MEDIUM | Not Started |
| Faithful CoT | faithful-cot.html | LOW | Not Started |

### 2E: Ensembling Frameworks (6 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| COSP | cosp.html | LOW | Not Started |
| DENSE | dense.html | LOW | Not Started |
| Max Mutual Information | max-mutual-info.html | LOW | Not Started |
| Meta-Reasoning | meta-reasoning.html | LOW | Not Started |
| Universal Self-Consistency | universal-self-consistency.html | LOW | Not Started |
| DiVeRSe | diverse.html | LOW | Not Started |

### 2F: Self-Criticism Frameworks (8 pages)

| Framework | File | Priority | Status |
|-----------|------|----------|--------|
| Self-Refine | self-refine.html | HIGH | Not Started |
| Self-Verification | self-verification.html | HIGH | Not Started |
| Chain-of-Verification | chain-of-verification.html | MEDIUM | Not Started |
| CRITIC | critic.html | MEDIUM | Not Started |
| Cumulative Reasoning | cumulative-reasoning.html | LOW | Not Started |
| Reversing CoT | reversing-cot.html | LOW | Not Started |
| Self-Calibration | self-calibration.html | LOW | Not Started |
| Reflexion | reflexion.html | MEDIUM | Not Started |

---

## Phase 3: Modality Frameworks Section (37 Pages)

### Directory Structure

```
learn/
├── modality/
│   ├── index.html (hub page)
│   ├── image/
│   │   └── (12 pages)
│   ├── audio/
│   │   └── (6 pages)
│   ├── video/
│   │   └── (6 pages)
│   ├── code/
│   │   └── (8 pages)
│   └── 3d/
│       └── (5 pages)
```

### 3A: Image Prompting (12 pages)

| Framework | File | Priority |
|-----------|------|----------|
| Image Prompting Basics | image-prompting.html | HIGH |
| Multimodal CoT | multimodal-cot.html | HIGH |
| Visual Chain of Thought | visual-cot.html | MEDIUM |
| Image-as-Text | image-as-text.html | MEDIUM |
| Visual Question Answering | vqa.html | MEDIUM |
| Image Generation Prompting | image-gen-prompting.html | HIGH |
| Negative Prompting | negative-prompting.html | HIGH |
| ControlNet Prompting | controlnet-prompting.html | MEDIUM |
| Inpainting Prompting | inpainting-prompting.html | LOW |
| Style Transfer Prompting | style-transfer.html | LOW |
| Image-to-Image | image-to-image.html | MEDIUM |
| Composition Prompting | composition-prompting.html | LOW |

### 3B: Audio/Speech (6 pages)

| Framework | File | Priority |
|-----------|------|----------|
| Audio Prompting Basics | audio-prompting.html | MEDIUM |
| Speech-to-Text Prompting | stt-prompting.html | MEDIUM |
| Text-to-Speech Prompting | tts-prompting.html | MEDIUM |
| Audio Classification | audio-classification.html | LOW |
| Music Generation Prompting | music-gen.html | LOW |
| Voice Cloning Prompting | voice-cloning.html | LOW |

### 3C: Video (6 pages)

| Framework | File | Priority |
|-----------|------|----------|
| Video Prompting Basics | video-prompting.html | MEDIUM |
| Video Generation Prompting | video-gen.html | MEDIUM |
| Temporal Reasoning | temporal-reasoning.html | LOW |
| Video QA | video-qa.html | LOW |
| Video Captioning | video-captioning.html | LOW |
| Video Editing Prompting | video-editing.html | LOW |

### 3D: Code/Structured (8 pages)

| Framework | File | Priority |
|-----------|------|----------|
| Code Prompting Basics | code-prompting.html | HIGH |
| Program Synthesis | program-synthesis.html | MEDIUM |
| Self-Debugging | self-debugging.html | HIGH |
| Code Explanation | code-explanation.html | MEDIUM |
| Code Review Prompting | code-review.html | MEDIUM |
| Test Generation | test-generation.html | MEDIUM |
| Structured Output | structured-output.html | HIGH |
| SQL Generation | sql-generation.html | MEDIUM |

### 3E: 3D/Spatial (5 pages)

| Framework | File | Priority |
|-----------|------|----------|
| 3D Prompting Basics | 3d-prompting.html | LOW |
| 3D Model Generation | 3d-model-gen.html | LOW |
| Scene Understanding | scene-understanding.html | LOW |
| Pose Estimation Prompting | pose-estimation.html | LOW |
| Point Cloud Prompting | point-cloud.html | LOW |

---

## Phase 4: Site Integration

### 4A: Navigation Updates

Update mega-menu in all 48 HTML files:
- Add "Text Frameworks" submenu
- Add "Modality Frameworks" submenu
- Organize by category

### 4B: Learn Hub Redesign

Update `learn/index.html`:
- Add category filter tabs
- Create framework grid with 89+ frameworks
- Add difficulty indicators
- Add "Modality Frameworks" section

### 4C: Search Index Updates

Update `data/search-index.json`:
- Add entries for all 89 new pages
- Include proper tags and categories

### 4D: Framework Matcher Updates

Update `tools/matcher.html`:
- Include new frameworks in recommendations
- Add modality category

---

## Phase 5: Navigation UX Overhaul

**Priority:** HIGH (Do before Phase 4 navigation updates)
**Status:** ✅ COMPLETE (Session 22)

### 5A: Menu Structure Reorganization

**Move Neurodivergence under Resources:**
- Current: Neurodivergence appears as separate top-level menu item
- Target: Neurodivergence nested under Resources dropdown menu
- Update all 48+ HTML files with navigation

### 5B: Menu Behavior (Implemented)

**Desktop Behavior:**
| Behavior | Description |
|----------|-------------|
| Hover to expand | Hovering over nav-item shows mega-menu |
| Click to navigate | Clicking nav-link navigates to section hub |
| Mouse out | Menu closes when mouse leaves |

**Mobile Behavior:**
| Behavior | Description |
|----------|-------------|
| Always expanded | All mega-menu content visible when hamburger menu open |
| No accordion | Simpler UX - all sections visible at once |
| Full-width | Menus expand to full viewport width |
| Touch-friendly | 44px+ tap targets on all links |

### 5C: Multi-Column Link Layout

**Column Rules (Updated Session 27):**
| Rule | Implementation |
|------|----------------|
| Max 10 links per column | After 10 links, overflow to second column |
| No text wrapping | `white-space: nowrap` on all menu links |
| Heading spans columns | `grid-column: 1 / -1` on h4 headings |
| Column flow | Links fill column top-to-bottom below heading |
| Responsive | Desktop: auto columns; Mobile: 2-column grid |
| Column gap | Use `--space-md` between columns |

**CSS Implementation (Current):**
```css
/* Mega menu sections use CSS Grid for auto-column split */
.mega-menu--multi-column .mega-menu-section {
    flex: 0 0 auto;
    display: grid;
    grid-template-rows: repeat(11, auto); /* h4 + 10 links */
    grid-template-columns: auto auto;
    grid-auto-flow: column;
    gap: 0 var(--space-md);
    align-content: start;
}

/* Heading spans both columns */
.mega-menu--multi-column .mega-menu-section h4 {
    grid-column: 1 / -1;
}

/* No-wrap on links */
.mega-menu-section a {
    white-space: nowrap;
}
```

### 5D: JavaScript Requirements

**New Menu Controller (app.js):**
```javascript
// AccordionNav object structure
const AccordionNav = {
    activeMenu: null,

    // Open menu and track it
    openMenu(menuElement) { },

    // Close menu with animation
    closeMenu(menuElement) { },

    // Check if content overflows viewport (desktop)
    checkOverflow(menuElement) { },

    // Handle scroll events (mobile)
    handleScroll() { },

    // Initialize event listeners
    init() { }
};
```

**Event Listeners:**
- `click` on menu triggers
- `scroll` on window (mobile only - use media query or matchMedia)
- `click` outside menus
- `resize` for responsive behavior updates

### 5E: Implementation Checklist ✅

**HTML Changes:**
- [x] Add `aria-expanded="false"` to `.nav-item.has-dropdown` elements
- [x] Add `mega-menu--multi-column` class to Resources dropdown
- [x] Add `mega-menu-section--featured` class for AI & ND section
- [x] Updated navigation structure in all 48 HTML files

**CSS Changes:**
- [x] Multi-column grid for Resources mega-menu (`.mega-menu--multi-column`)
- [x] Featured section styling (`.mega-menu-section--featured`)
- [x] Smaller heading for featured section (fits on one line)
- [x] Mobile-specific styles for always-expanded menus

**JavaScript Changes:**
- [x] Existing hover/click handlers work with new structure
- [x] No accordion JS needed (simpler always-expanded approach on mobile)

**Accessibility:**
- [x] `aria-expanded` attribute on dropdown triggers
- [x] Proper heading hierarchy in mega-menus

### 5F: Final Navigation Structure (Implemented)

**Learn Menu:**
```
Learn (mega-menu)
├── Getting Started
│   ├── Prompt Basics
│   └── Facts & Fictions
└── Frameworks
    ├── CRISP Framework
    ├── CRISPE Framework
    ├── COSTAR Framework
    ├── ReAct Framework
    ├── Flipped Interaction
    ├── Chain-of-Thought
    ├── Few-Shot Learning
    ├── Role Prompting
    ├── Constrained Output
    ├── Self-Consistency
    └── Prompt Chaining
```

**Resources Menu (mega-menu--multi-column):**
```
Resources (mega-menu)
├── Explore
│   ├── ChatGPT Guide
│   ├── FAQ
│   ├── Glossary
│   ├── Security
│   ├── Performance
│   ├── AI for Everybody
│   ├── Universal Design
│   ├── AI Assisted
│   └── About
└── AI & ND (featured section)
    ├── Overview
    ├── AI for ADHD
    ├── AI for Autism
    ├── AI for Dyslexia
    ├── AI Tools Finder
    └── ND Resources
```

---

# SESSION LOG

## Session 48 (2026-02-07)

**Focus:** Mega-Menu Tabbed Redesign + Phase 3B Audio/Speech (6 pages) + Full Integration
**Status:** COMPLETE — Phase 3B is 100% done (6/6 audio pages), Mega-menu converted to tabbed

**Completed:**
- [x] **Mega-Menu Tabbed Redesign (Steps 2-6)**:
  - Step 2: TabbedMenu JS object in app.js (tab switching, keyboard nav, mobile accordion)
  - Step 3: index.html manual conversion for testing
  - Step 4: `update_nav_tabbed.py` batch conversion script created
  - Step 5: 127 files converted across 4 depth levels, 0 errors
  - Step 6: Documentation updated (SiteFrameworks.md, HANDOFF.md)
  - Fixed Reasoning & CoT unescaped ampersand bug (120 files patched)
  - Mobile styling: headers 0.86rem red, links 0.92rem white, no scrollbars (2-column flow)
- [x] **6 Audio Framework Pages Created** (parallel background agents, 896-906 lines each):
  - audio-prompting, stt-prompting, tts-prompting, audio-classification, music-gen, voice-cloning
  - All 13 sections, zero inline styles/scripts, historical context notices
- [x] **Navigation Updated** — `update_nav_audio.py` added Audio section (data-tab="audio") to 133 files
- [x] **Search Index** — 6 audio entries added to `data/search-index.json`
- [x] **Discover Hub** — Audio filter button + 6 cards in `learn/index.html`
- [x] **Modality Hub** — Audio section added to `learn/modality/index.html`
- [x] **Homepage** — Counter 79+→85+, CTA updated

**Files Created:**
- 6 `learn/modality/audio/*.html` files (896-906 lines each)
- `update_nav_audio.py` (modality nav batch script)
- `update_nav_tabbed.py` (tabbed-menu conversion script)

**Files Modified:**
- 133+ HTML files (tabbed menu conversion + audio nav section)
- `app.js` (TabbedMenu JS object)
- `styles.css` (mobile tabbed overrides, 2-column flow, mobile font sizes)
- `data/search-index.json` (6 new entries)
- `learn/index.html` (6 new cards, audio filter, count updates)
- `learn/modality/index.html` (audio section)
- `index.html` (counter + CTA updates)
- `.claude/HANDOFF.md`, `.claude/COMPLETED.md`, `.claude/SiteFrameworks.md`

**Commit:** `d5cca2a` — Tabbed mega-menu redesign (partial — Phase 3B committed separately)

**Next:** Phase 3C — Video (6 pages under `learn/modality/video/`)

---

## Session 46 (2026-02-07)

**Focus:** Phase 3A Image Prompting (12 pages) + Modality Hub + Full Integration
**Status:** COMPLETE — Phase 3A is 100% done (12/12 image prompting pages)

**Completed:**
- [x] **Session 45 Committed & Pushed** (`4bc69f5`) — All Phase 2 work
- [x] **12 Image Prompting Pages Created** (parallel background agents, 867-892 lines each):
  - image-prompting, multimodal-cot, visual-cot, image-as-text, vqa, image-gen-prompting
  - negative-prompting, controlnet-prompting, inpainting-prompting, style-transfer, image-to-image, composition-prompting
  - All 13 sections, zero inline styles/scripts, historical context notices
- [x] **Modality Hub Page** (`learn/modality/index.html`) — Image (12 cards), Code (3 cards), Coming Soon
- [x] **Navigation Updated** — 127 HTML files via `update_nav_s46.py` (Image section after Code)
- [x] **Search Index** — 13 new entries (12 image + 1 hub)
- [x] **Discover Hub** — 12 new cards, Image (12) filter button, 62+→79+
- [x] **Homepage** — Counter 67+→79+, CTA updated

**Files Created:**
- 12 `learn/modality/image/*.html` files (867-892 lines each)
- `learn/modality/index.html` (modality hub page)

**Files Modified:**
- 127 HTML files (navigation update)
- `data/search-index.json` (13 new entries)
- `learn/index.html` (12 new cards, count updates)
- `index.html` (counter + CTA updates)
- `.claude/HANDOFF.md`

**Commit:** `2b4cec0` — feat: Phase 3A Image Prompting — 12 pages + modality hub + nav update

**Next:** Phase 3B — Audio/Speech (6 pages under `learn/modality/audio/`)

---

## Session 45 (2026-02-07)

**Focus:** Complete Phase 2 Text Frameworks (final 5 pages) + full site integration
**Status:** COMPLETE — Phase 2 is 100% done (52/52 text framework pages)

**Completed:**
- [x] **5 Framework Pages Created** (parallel background agents):
  - `learn/many-shot.html` (891 lines) — Many-Shot Prompting, 2024 by Agarwal et al.
  - `learn/example-ordering.html` (871 lines) — Example Ordering, 2022 by Lu et al.
  - `learn/self-generated-icl.html` (873 lines) — Self-Generated ICL, 2022 by Kim et al.
  - `learn/active-example.html` (873 lines) — Active Example Selection, 2023
  - `learn/uncertainty-cot.html` (907 lines) — Uncertainty-Routed CoT, 2023 by Wang et al.
- [x] **Navigation Updated** — 111 HTML files updated via `update_nav_s45.py` (+4 ICL links, +1 CoT link)
- [x] **Search Index** — 5 new entries added to `data/search-index.json`
- [x] **Discover Hub** — 5 new cards, filter counts updated (ICL 9->13, CoT 14->15)
- [x] **Category Pages** — `in-context-learning.html` (9->13), `reasoning-cot.html` (14->15)
- [x] **Homepage** — Counter 62+->67+, CTA text updated
- [x] Quality: 0 inline styles, 0 inline scripts, 0 external resources, historical context on all pages

**Files Created:**
- 5 learn/*.html files (full 13-section template, 870-907 lines each)

**Files Modified:**
- 111 HTML files (navigation update)
- `data/search-index.json` (5 new entries)
- `learn/index.html` (5 new cards, count updates)
- `learn/in-context-learning.html` (4 new cards, count updates)
- `learn/reasoning-cot.html` (1 new card, count update)
- `index.html` (counter + CTA updates)
- `.claude/HANDOFF.md`, `.claude/plans/FrameworkOverhaul.md`

**Next:** Phase 3 — Modality Frameworks (37 pages, 0% done)

---

## Session 41 (2026-02-07)

**Focus:** Codebase Deep Dive + SiteFrameworks.md Documentation
**Status:** COMPLETE (documentation only — no code changes)

**Completed:**
- [x] **Full Codebase Study** — Deep dive into all major systems:
  - Glossary lazy loading pipeline (JSON fetch → DOM API render → hash scroll)
  - Search system (scoring algorithm, category ordering, result rendering)
  - Search-to-glossary flow (cross-page navigation vs. same-page scroll)
  - URL resolution (`resolveInternalUrl()` depth calculation)
  - Anchor offset pattern (`scroll-margin-top: 100px/160px`)
  - Design token system (CSS custom properties, dark mode)
  - Component library (20+ BEM components)
  - 13-section framework template
  - Navigation architecture (mega-menu grid, mobile behavior)
  - Neural network canvas system (performance optimizations)
  - Accessibility dashboard (ADL panel, localStorage persistence)
- [x] **Created `.claude/SiteFrameworks.md`** (1,041 lines)
  - Comprehensive "soul of the project" document
  - Documents WHY behind every architectural decision
  - Full component reference, design tokens, critical rules
- [x] **Commit:** `c49e78b` — docs: Add SiteFrameworks.md

**Files Created:**
- `.claude/SiteFrameworks.md` (1,041 lines)

**Files Modified:**
- `.claude/HANDOFF.md`, `.claude/COMPLETED.md`, `.claude/plans/FrameworkOverhaul.md`

**Next:** Begin Discover Hub implementation — Phase 1 (batch renames across ~105 files)

---

## Sessions 39-40 (2026-02-07)

**Focus:** Homepage Redesign Implementation + Search Modal Fix + Discover Hub Planning
**Status:** COMPLETE (homepage + modal pushed; Discover Hub plan approved)

**Completed:**
- [x] **Homepage Redesign — Full Implementation** (commit `d5bce3f`)
  - Replaced all `<main id="main-content">` content in `index.html` with 6 new sections
  - Section 1: Library at a Glance — counter-grid (62+, 2,141+, 12, 100%)
  - Section 2: Explore Frameworks by Category — 6 icon-box cards with counts
  - Section 3: Interactive Tools — 6 icon-box cards
  - Section 4: AI Foundations & Glossary — split-section
  - Section 5: Why Praxis — split-section (no emoji)
  - Section 6: Getting Started CTA — cta-corporate--gradient
  - Quality: 0 inline styles, 0 inline scripts, 0 emoji, 0 external resources
- [x] **Search Modal Height Fix** (commit `3cf8860`)
  - Changed: `top: 10%; min-height: 80vh; max-height: 80vh;`
- [x] **Discover Hub + Category Pages Plan** — created `.claude/plans/discover-hub-category-pages.md`
  - User confirmed: "Advanced Techniques" → "Prompting Strategies"
  - User confirmed: "Learn" → "Discover" nav rename (site-wide)
  - User confirmed: All cards visible, flat file structure
  - 5-phase implementation plan approved

**Commits pushed:**
```
3cf8860 fix: Search modal height 80vh
d5bce3f feat: Homepage redesign + site-wide nav update (Sessions 37-39)
```

**Files Modified:**
- `index.html` (homepage redesign)
- `styles.css` (search modal height)
- `.claude/HANDOFF.md`, `.claude/COMPLETED.md`
- `.claude/plans/discover-hub-category-pages.md` (NEW)

**Next:** Begin Discover Hub implementation — Phase 1 (batch renames)

---

## Session 38 (2026-02-07)

**Focus:** Part B — Full Navigation Update (100 files) + Homepage Redesign Plan
**Status:** COMPLETE (Nav update done; Homepage plan approved, not yet implemented)

**Completed:**
- [x] **Part B — Full Navigation Update (ALL 100 HTML files)**
  - Python batch script updated header, footer, and `<head>` across all 100 files
  - Mega-menu expanded from ~47 to 65 links (62 framework + 3 code) in 9 categories
  - Active nav-link per directory, correct relative paths for 3 depth levels
  - `<head>` cleanup: removed all CSP meta, referrer meta, preload links
  - Quality checks: 0 CSP meta, 0 preload, 0 referrer, 0 inline styles
- [x] **Homepage Redesign Plan** — 6-section plan created and approved (not yet implemented)

**Files Modified:**
- 100 HTML files (header, footer, head cleanup)
- `.claude/HANDOFF.md`, `.claude/COMPLETED.md`, `.claude/plans/FrameworkOverhaul.md`

**Next Session:** Implement homepage redesign (replace `<main>` content in index.html) + commit all

---

## Session 37 (2026-02-07)

**Focus:** Part A — 22-Page Redesign (Waves A-D) + HR Content Cleanup
**Status:** COMPLETE — Part B (Nav Update) next

**Completed:**
- [x] **Wave A: Foundation Frameworks (6 pages)**
  - chain-of-thought (827), few-shot-learning (818), zero-shot (816), one-shot (825), role-prompting (818), self-consistency (829)
- [x] **Wave B: Structured Frameworks (6 pages)**
  - crisp (861), crispe (869), costar (892), constrained-output (833), context-structure (875), prompt-chaining (845)
- [x] **Wave C: Advanced Techniques (5 pages)**
  - tree-of-thought (858), plan-and-solve (857), least-to-most (853), example-selection (829), shot-prompting (834)
- [x] **Wave D: Flagship Pages (5 pages)**
  - react (859), flipped-interaction (848), prompt-basics (840), zero-shot-cot (840), facts-fictions (834)
- [x] **HR/Remote Work Content Cleanup** — Removed all HR/remote work examples from ~15 pages, replaced with tech/science/education examples
- [x] **AI For Everybody Update** — Updated "Who Praxis Serves" text per user request
- [x] **Plan stored** — Part B navigation update plan added to FrameworkOverhaul.md

**Quality checks:** 0 inline styles, 0 inline scripts, 0 CSP meta tags, all 13 sections verified across all 22 pages.

**Files Modified:**
- 22 learn/*.html files (full 13-section redesigns)
- ~15 learn/*.html files (HR/remote work content swaps)
- `pages/ai-for-everybody.html` (text update)
- `.claude/HANDOFF.md`, `.claude/plans/FrameworkOverhaul.md`

**Next Session:** Part B — Full Navigation Update across ~100 HTML pages

---

## Session 35 (2026-02-07)

**Focus:** Wave 5 — Example Methods Quality Redesign (7 pages)
**Status:** COMPLETE

**Completed:**
- [x] **Wave 5: Example Methods Quality Redesign (7 pages)**
  - `learn/active-prompting.html` — 290→863 lines (Active Learning, 2023 by Diao et al.)
  - `learn/knn-prompting.html` — 290→845 lines (Example Selection, 2022 by Xu et al.)
  - `learn/vote-k.html` — 290→854 lines (Active Learning, 2022 by Su et al.)
  - `learn/demo-ensembling.html` — 290→856 lines (Ensemble Methods, 2022)
  - `learn/diverse-prompting.html` — 290→849 lines (Ensemble Methods, 2022 by Li et al.)
  - `learn/dense-prompting.html` — 290→846 lines (Prompt Design, 2023)
  - `learn/prompt-mining.html` — 290→844 lines (Prompt Automation, 2022 by Jiang et al.)
  - All 13 sections, zero inline styles/scripts, historical context notices
  - Quality checks: 0 CSP violations, all sections verified

**Files Modified:**
- 7 learn/*.html files (full redesigns)
- `.claude/HANDOFF.md` (session update)
- `.claude/COMPLETED.md` (archived Session 34)
- `.claude/plans/FrameworkOverhaul.md` (this file)

**Next Session:** Wave 6 — Style & Emotion (6 pages: emotion-prompting, style-prompting, s2a, re2, cosp, rar)

---

## Session 34 (2026-02-06)

**Focus:** Wave 4 — Advanced Reasoning Quality Redesign (7 pages)
**Status:** COMPLETE

**Completed:**
- [x] **Wave 4: Advanced Reasoning Quality Redesign (7 pages)**
  - `learn/analogical-reasoning.html` — 290→839 lines (Thought Generation, 2023 by Yasunaga et al.)
  - `learn/meta-reasoning.html` — 290→836 lines (Strategy Selection, 2024 by Xu et al.)
  - `learn/thread-of-thought.html` — 290→850 lines (Long Context Processing, 2023 by Zhou et al.)
  - `learn/memory-of-thought.html` — 290→847 lines (Memory Systems, 2023 by Li et al.)
  - `learn/simtom.html` — 290→849 lines (Perspective Taking, 2023 by Wilf et al.)
  - `learn/max-mutual-info.html` — 290→830 lines (Example Selection, 2022)
  - `learn/universal-self-consistency.html` — 290→846 lines (Ensemble Methods, 2023 by Chen et al.)
  - All 13 sections, zero inline styles/scripts, historical context notices
  - Quality checks: 0 CSP violations, all sections verified

**Files Modified:**
- 7 learn/*.html files (full redesigns)
- `.claude/HANDOFF.md` (session update)
- `.claude/COMPLETED.md` (archived Session 33)
- `.claude/plans/FrameworkOverhaul.md` (this file)

**Next Session:** Wave 5 — Example Methods (7 pages: active-prompting, knn-prompting, vote-k, demo-ensembling, diverse-prompting, dense-prompting, prompt-mining)

---

## Session 33 (2026-02-06)

**Focus:** Critical URL bug fix + Search modal enhancements + Glossary navigation
**Status:** COMPLETE (handoff prepared)

**Completed:**
- [x] **Critical Bug Fix: Universal URL Resolution** (`8fda121`)
  - ALL dynamically generated internal URLs were broken from subdirectory pages
  - Created `resolveInternalUrl(targetPath)` — universal depth-based path resolver
  - Applied to 10 locations in app.js (search results, glossary, recommender, badge lightbox, technique links, quick links, glossary JSON fetch)
  - Replaced all folder-specific if/else logic (was missing foundations/, neurodivergence/)
  - New rule: ALWAYS use `resolveInternalUrl()` for dynamic internal links
- [x] **Search Modal Enhancements** (`0d758a9`)
  - Expanded to 80% viewport width (was 720px max), 88vh height, 5% from top
  - Quick Links section now collapsible (chevron toggle, starts collapsed)
  - Glossary terms appear first in search results (was 3rd)
  - Glossary shows 10 results per search (other categories: 5)
  - Post-lazy-load hash scroll — glossary.html#term-xxx now works
- [x] **Search Modal Close-on-Select** (`32ec056`)
  - Modal closes when clicking/selecting any result
  - Same-page hash links (glossary terms on glossary page) handled with direct scroll
  - Added `navigateToResult()` method for hash detection
- [x] **Wave 3 Comparison Panel Fix** (`390715f`)
  - Updated 3 files to new header/icon/divider/verdict comparison panel structure
  - Dark mode fix for `.era-marker--active`

**Commits:**
```
32ec056 fix: Close search modal when selecting a result on the same page
0d758a9 feat: Enhanced search modal — 80% screen, collapsible Quick Links, Glossary-first results
8fda121 fix: Universal URL resolution for search, glossary, and recommender links
390715f fix: Update comparison panels to new structure + dark mode era-marker fix
```

**Files Modified:**
- `app.js` — resolveInternalUrl, search modal enhancements, glossary hash scroll
- `styles.css` — search modal 80% width, collapsible Quick Links, era-marker dark mode
- `learn/decomp.html`, `learn/graph-of-thought.html`, `learn/recursion-of-thought.html` — comparison panel structure
- `.claude/HANDOFF.md`, `.claude/plans/FrameworkOverhaul.md` — handoff docs

---

## Session 32 (2026-02-06)

**Focus:** Wave 3 — Decomposition Quality Redesign (6 pages)
**Status:** COMPLETE

**Completed:**
- [x] **Wave 3: Decomposition Quality Redesign (6 pages)**
  - `learn/decomp.html` — 323→728 lines
  - `learn/self-ask.html` — 303→855 lines
  - `learn/step-back.html` — 298→832 lines
  - `learn/graph-of-thought.html` — 325→717 lines
  - `learn/program-of-thought.html` — 325→826 lines
  - `learn/recursion-of-thought.html` — 290→833 lines
  - All 13 sections, zero inline styles/scripts, historical context notices

**Commits:**
```
1ee7b83 feat: Redesign Wave 3 (Decomposition family) — 6 pages expanded to 13-section template
```

---

## Session 31 (2026-02-06)

**Focus:** Wave 2 — CoT Variants Quality Redesign (8 pages)
**Status:** COMPLETE

**Completed:**
- [x] **Wave 2: CoT Variants Quality Redesign (8 pages)**
  - `learn/auto-cot.html` — 290→855 lines
  - `learn/contrastive-cot.html` — 296→846 lines
  - `learn/structured-cot.html` — 293→805 lines
  - `learn/faithful-cot.html` — 290→853 lines
  - `learn/complexity-prompting.html` — 286→837 lines
  - `learn/tab-cot.html` — 301→844 lines
  - `learn/reversing-cot.html` — 299→857 lines
  - `learn/cumulative-reasoning.html` — 290→854 lines
  - All 13 sections, zero inline styles/scripts, historical context notices

**Commits:**
```
075d75a feat: Redesign Wave 2 (CoT Variants family) — 8 pages expanded to 13-section template
```

---

## Session 30 (2026-02-05)

**Focus:** Track B — AI Foundations Framework Timeline
**Status:** COMPLETE (handoff prepared)

**Completed:**
- [x] **Track B: AI Foundations Framework Timeline**
  - Added framework directory grids to `foundations/index.html` under Era IV (2020-2022) and Era V (2023-2026)
  - Era IV: 23 frameworks (Few-Shot, Zero-Shot, One-Shot, Role Prompting, Chain-of-Thought, Self-Consistency, Least-to-Most, Zero-Shot CoT, KNN Prompting, Example Selection, Self-Calibration, Vote-k, Complexity-Based Prompting, Decomposed Prompting, Self-Ask, Auto-CoT, ReAct, DiVeRSe, Program of Thought, Prompt Mining, Self-Verification, Prompt Chaining, Constrained Output)
  - Era V: 38 frameworks (Faithful CoT, Active Prompting, Self-Refine, Reflexion, Plan-and-Solve, Tree of Thought, CRITIC, Memory of Thought, Tab-CoT, Structured CoT, COSP, Recursion of Thought, Emotion Prompting, Graph of Thought, Cumulative Reasoning, RE2, Chain-of-Verification, Analogical Reasoning, Step-Back, Contrastive CoT, S2A, SimToM, RaR, Thread of Thought, Universal Self-Consistency, Meta-Reasoning, Style Prompting, Dense Prompting, Max Mutual Information, Demo Ensembling, Reversing CoT, Self-Debugging, CRISP, CRISPE, COSTAR, Flipped Interaction, Code Prompting, Structured Output)
  - Relevancy status badges: "Adopted into LLMs" (blue) for 5 foundational techniques, "Still active technique" (green) for all others
  - New CSS: `.era-frameworks`, `.era-frameworks__grid`, `.era-frameworks__item`, `.framework-status` badges
  - Two-column responsive grid (collapses to single column on mobile)
  - Each framework links to its learn page

**Files Modified:**
- `foundations/index.html` (added ~230 lines of framework directory HTML)
- `styles.css` (added ~80 lines of era-frameworks CSS)
- `.claude/HANDOFF.md`
- `.claude/plans/FrameworkOverhaul.md` (this file)

**Next Session:** Start Wave 2 — CoT Variants (8 pages: auto-cot, contrastive-cot, structured-cot, faithful-cot, complexity-prompting, tab-cot, reversing-cot, cumulative-reasoning)

---

## Session 29 (2026-02-05)

**Focus:** Wave 1 Quality Redesigns + Glossary Expansion + Homepage Hero + AI Foundations planning
**Status:** COMPLETE (handoff prepared)

**Completed:**
- [x] **Wave 1 — Self-Correction Quality Redesigns (6 pages)**
  - Redesigned to match ReAct (1,044 lines), Flipped Interaction (999 lines), COSTAR (828 lines) quality standard
  - `learn/critic.html` — 324→898 lines (5-step CRITIC process, comparison panel, 3 accordion examples)
  - `learn/chain-of-verification.html` — 290→887 lines (4-step CoVe chain, 3 execution modes)
  - `learn/reflexion.html` — 324→881 lines (3-component architecture, 5-step loop)
  - `learn/self-calibration.html` — 290→750 lines (confidence pipeline, calibration comparison)
  - `learn/self-refine.html` — 366→787 lines (draft-critique-revise loop, 3 strategies)
  - `learn/self-verification.html` — 381→790 lines (3 verification strategies, 4-step pipeline)
  - Each page has: concept explanation, how-it-works timeline, comparison panel, 3 accordion examples, Perfect For/Skip It When lists, 6 use cases, framework positioning, related frameworks, CTA, back-to-top, accessibility dashboard
  - Historical context notices added to all 6 pages
- [x] **Content Badges Removed** from ALL learn pages (20+ files) — badges and badge lightboxes removed
- [x] **Homepage Hero Update**
  - Static title: "The Open Standard" / "for AI Literacy" (red gradient)
  - Removed ~120 lines of typing animation JS
  - CTAs: "Explore the Library" + "Search the Glossary"
  - Subtitle: "2,000+ terms, logic frameworks, and cognitive tools"
- [x] **Glossary Expansion (414 → 2,141 terms)**
  - Generated 1,850 new terms across 10+ domains via 6 parallel agents
  - Domains: ML Fundamentals, Neural Networks, NLP, Generative AI, Computer Vision, RL, AI Hardware, Ethics & Safety, History of AI, Prompt Engineering, Evaluation Metrics, Vector Databases
  - Moved ALL terms from inline HTML to `data/glossary.json` (818 KB)
  - `pages/glossary.html` reduced from 19,883→686 lines (mobile-friendly shells)
  - JSON loader rewritten using DOM API (createElement/textContent) — no innerHTML
  - Search index updated to 2,218 entries
  - Added `content-visibility: auto` for lazy rendering
- [x] **Mobile Menu Fix** — AI & ND section reset to normal mobile styling
- [x] **AI Foundations Framework Timeline** — Research and exploration completed; implementation planned but paused for handoff

**Commits:**
```
d0addec feat: Expand glossary to 2,141 terms with JSON lazy loading
359ba01 feat: Update hero to static "The Open Standard for AI Literacy" + fix mobile menu
0715973 feat: Redesign Wave 1 (Self-Correction family) + remove content badges
```

**Files Modified:**
- 29 learn/*.html files (Wave 1 redesigns + badge removal)
- index.html (hero update)
- app.js (removed typing animation, rewrote glossary loader with DOM API)
- styles.css (mobile menu fix, content-visibility for glossary)
- pages/glossary.html (expanded to 19K lines, then stripped to 686 lines)
- data/glossary.json (expanded from 33 to 2,141 terms)
- data/search-index.json (expanded to 2,218 entries)
- .claude/HANDOFF.md

---

## Session 28 (2026-02-05)

**Focus:** Wave 1 Quality Redesign planning
**Status:** COMPLETE (merged into Session 29)

**Completed:**
- [x] Created 40-page redesign plan (Waves 1-6)
- [x] Established 13-section per-page template
- [x] Defined quality standard based on ReAct/COSTAR/Flipped Interaction
- [x] Plan approved and Wave 1 execution began (completed in Session 29)

---

## Session 27 (2026-02-05)

**Focus:** Mega menu CSS fixes + Documentation update
**Status:** COMPLETE

**Completed:**
- [x] Fixed mega menu desktop layout:
  - `white-space: nowrap` on all menu links (no 2-line wrapping)
  - CSS Grid with `grid-template-rows: repeat(11, auto)` + `grid-auto-flow: column` (10 links per column)
  - `grid-column: 1 / -1` on h4 headings (items always below heading line)
  - `width: max-content` on container (auto-sizes to content)
- [x] Mobile overrides preserved (display: contents, white-space: normal)
- [x] Updated FrameworkOverhaul.md with accurate Phase 2 progress (47/52)

**Files Modified:**
- `styles.css` (mega menu grid layout fixes)
- `.claude/plans/FrameworkOverhaul.md` (this file)

---

## Session 26 (2026-02-05)

**Focus:** Phase 2 completion - 35+ MEDIUM/LOW priority pages + mega menu + code folder fix
**Status:** COMPLETE

**Completed:**
- [x] Created 35+ new framework pages (MEDIUM and LOW priority)
- [x] Updated mega menu navigation across 99+ HTML files (5 sections: Getting Started, Frameworks, Advanced, Self-Correction, Code)
- [x] Fixed self-refine.html and self-verification.html (rewritten with correct site template)
- [x] Rewrote learn/modality/code/ pages (code-prompting, self-debugging, structured-output) with correct template
- [x] Removed all stat cards and citation-like content from framework pages
- [x] Updated HANDOFF.md with session progress

**New Pages Created:**
- decomp.html, graph-of-thought.html, program-of-thought.html
- chain-of-verification.html, critic.html, reflexion.html
- s2a.html, simtom.html, re2.html
- knn-prompting.html, vote-k.html, demo-ensembling.html
- active-prompting.html, thread-of-thought.html, tab-cot.html, complexity-prompting.html
- memory-of-thought.html, meta-reasoning.html, self-calibration.html, diverse-prompting.html
- prompt-mining.html, universal-self-consistency.html, cumulative-reasoning.html, reversing-cot.html
- faithful-cot.html, cosp.html, dense-prompting.html, max-mutual-info.html
- structured-cot.html, recursion-of-thought.html
- And more...

**Files Modified:**
- 99+ HTML files (mega menu navigation)
- 3 code folder HTML files (template rewrite)
- styles.css (stat card removal, mega menu updates)
- .claude/HANDOFF.md

---

## Session 25 (2026-02-05)

**Focus:** Phase 2 - Complete remaining HIGH priority pages + Navigation updates
**Status:** ✅ ALL 12 HIGH PRIORITY PAGES COMPLETE

**Completed:**
- [x] Created `learn/self-refine.html` - Iterative improvement technique
  - Three-stage process: Generate → Feedback → Refine
  - Feedback strategies: Criteria-based, Role-based, Comparative, Error-focused
  - Implementation patterns: Fixed iterations, Quality threshold, Diminishing returns
  - Interactive accordion for feedback strategies
  - Comparison tabs for single-pass vs self-refine
- [x] Created `learn/self-verification.html` - Answer validation technique
  - Verification strategies: Backward verification, Constraint checking, Sanity checks
  - Implementation patterns: Single-turn, Two-turn, Verification with regeneration
  - Comparison with related techniques (Self-Refine, Self-Consistency)
  - Interactive comparison tabs and accordion
- [x] Created `learn/modality/code/` directory structure
- [x] Created `learn/modality/code/code-prompting.html` - Code generation strategies
  - Code task types: Generation, Explanation, Transformation, Review
  - Prompt anatomy: Task spec, Technical context, Requirements, Examples
  - Context strategies in accordion
  - Interactive tabbed comparison of task types
- [x] Created `learn/modality/code/self-debugging.html` - AI-assisted debugging
  - Debugging strategies: Error-driven, Trace-based, Explanation, Test-driven
  - Debugging workflow timeline
  - Prompt patterns: Rubber duck, Adversarial reviewer, Hypothesis tester, Minimal fix
- [x] Created `learn/modality/code/structured-output.html` - Format generation
  - Format comparison: JSON, XML, YAML, CSV
  - Prompting strategies: Schema specification, Example-driven, Format enforcement
  - Common issues and fixes
  - Validation strategies
- [x] Updated navigation mega-menu across ALL 48+ HTML files:
  - Added "Advanced" section with 6 links
  - Added "Code" section with 3 links
  - Used correct relative paths for each directory depth

**User Preference Applied:**
- NO CITATIONS on any framework pages (per user request)
- Citations may be added later if needed

**Files Created:**
- `learn/self-refine.html` (NEW)
- `learn/self-verification.html` (NEW)
- `learn/modality/code/code-prompting.html` (NEW)
- `learn/modality/code/self-debugging.html` (NEW)
- `learn/modality/code/structured-output.html` (NEW)

**Files Modified:**
- All 48+ HTML files (navigation mega-menu updated)
- `.claude/HANDOFF.md` (session status updated)
- `.claude/plans/FrameworkOverhaul.md` (this file)

**Phase 2 HIGH Priority Status:** ✅ COMPLETE (12/12 pages)

---

## Session 24 (2026-02-05)

**Focus:** Phase 2 - Text Framework Pages (Starting HIGH priority)
**Status:** PAUSED FOR HANDOFF

**Completed:**
- [x] Created `learn/zero-shot.html` - Foundation technique page
  - Original content (not copy-paste from other pages)
  - CSP compliant (no inline styles/scripts)
  - Verifiable academic sources (arXiv, MIT Press, NAACL)
  - Interactive accordion with examples
  - Related techniques section linking to few-shot, zero-shot-cot, role-prompting
- [x] Created `learn/zero-shot-cot.html` - Reasoning technique page
  - Interactive tabbed before/after comparison (math, logic, analysis)
  - Stat cards showing accuracy improvement (17.7% → 78.7%)
  - Trigger phrases section with pillar cards
  - Advanced techniques in accordion
  - Highlight boxes for warnings/tips
- [x] Added new CSS components to styles.css:
  - `.comparison-tabs` - Tabbed content switching
  - `.comparison-grid` - Two-column layout for before/after
  - `.comparison-card--before/--after` - Styled comparison cards
  - `.pillar-card--interactive` - Hover effect cards
  - `.pillar-card__tag` - Category labels
  - `.use-case-card--success` - Success variant
- [x] Added comparison-tabs JS handler to app.js (lines ~6869-6894)
- [x] Scanned site for duplicate zero-shot content - confirmed no conflicts
  - ai-for-everybody.html: Just mentions in glossary coverage stat
  - foundations/index.html: Historical timeline (different purpose)

**Page Requirements Established:**
- Mix of engagement, information, and interactivity
- No duplicate content from other pages (unless relevant)
- Original content - not copy-paste designs
- Keep FrameworkOverhaul.md updated frequently
- Update navigation/footer AFTER all pages created (Phase 4)

**Files Changed:**
- `learn/zero-shot.html` (NEW)
- `learn/zero-shot-cot.html` (NEW)
- `styles.css` (added ~150 lines of comparison component styles)
- `app.js` (added comparison-tabs handler)
- `.claude/HANDOFF.md` (updated for handoff)
- `.claude/plans/FrameworkOverhaul.md` (this file)

**Remaining HIGH Priority (10 pages):**
1. one-shot.html
2. example-selection.html
3. least-to-most.html
4. plan-and-solve.html
5. tree-of-thought.html
6. self-refine.html
7. self-verification.html
8. code-prompting.html
9. self-debugging.html
10. structured-output.html

**Then:** Update navigation and footer links in all 48+ HTML files

---

## Session 23 (2026-02-04)

**Focus:** Phase 1 Glossary + Mobile Menu Refinement
**Completed:**
- [x] **Phase 1 COMPLETE** - Glossary Expansion (33 terms)
  - [x] Created `data/glossary.json` with 33 new prompting terms from The Prompt Report
  - [x] Added `loadGlossaryFromJSON()` function to app.js (lines 7577-7673)
  - [x] Terms loaded dynamically and inserted alphabetically into existing glossary
  - [x] Updated `data/search-index.json` with all 33 new terms
- [x] **Mobile Menu UX Improvements**
  - [x] Fixed 2-column grid layout for mega-menu links
  - [x] Used `display: contents` on sections so links flow into grid
  - [x] Removed slideDown animation on `.nav.active` (instant open)
  - [x] Disabled all transitions on mobile nav links
  - [x] Disabled hover effects on touch devices (`@media (hover: none)`)
  - [x] Hidden underline animation on mobile nav links

**New Glossary Terms Added:**
Answer Engineering, Beam Search, Cloze Prompt, Context Window, Continuous Prompt, Decomposition, Demonstration, Discrete Prompt, Ensemble, Exemplar, Gradient-based Search, Greedy Decoding, In-Context Learning, Jailbreak, Label Space, Prefix Prompt, Prompt Generation, Prompt Injection, Prompt Mining, Prompt Paraphrasing, Prompt Scoring, Prompt Template, Rationale, Reasoning Chain, Refinement, RAG, Self-Critique, Temperature, Token Budget, Tool Use, Top-k Sampling, Top-p Sampling, Verbalizer

**Files Changed:**
- `data/glossary.json` (NEW)
- `data/search-index.json` (added 33 entries)
- `app.js` (added loadGlossaryFromJSON function)
- `styles.css` (mobile menu 2-column grid, disabled hover effects)

---

## Session 22 (2026-02-04)

**Focus:** Phase 5 - Navigation UX Overhaul (COMPLETED)
**Completed:**
- [x] **Phase 5 COMPLETE** - Navigation UX Overhaul
  - [x] Moved Neurodivergence section under Resources mega-menu
  - [x] Added `mega-menu--multi-column` class for Resources dropdown
  - [x] Added `mega-menu-section--featured` class for AI & ND section
  - [x] Changed "Prompt Basics" section to "Getting Started" in Learn menu
  - [x] Added "Facts & Fictions" link under Getting Started (after Prompt Basics)
  - [x] Removed "Facts & Fictions" from Resources/Guides section
  - [x] Changed `<h4>AI + Neurodivergence</h4>` to `<h4>AI & ND</h4>` (fits on one line)
  - [x] Added CSS for smaller featured section heading (0.65rem, tighter letter-spacing)
  - [x] Added `aria-expanded="false"` to all `.nav-item.has-dropdown` elements
  - [x] Updated all 48 HTML files across:
    - index.html, foundations/, learn/, neurodivergence/, tools/, pages/, quiz/, patterns/
  - [x] Mobile menu: always-expanded submenus (simpler than accordion)

**CSS Changes (styles.css):**
- Added `.mega-menu--multi-column` for Resources dropdown
- Added `.mega-menu-section--featured` for AI & ND highlight
- Added smaller font-size for featured section heading (desktop: 0.65rem, mobile: 0.6rem)
- Added `white-space: nowrap` to prevent heading wrap

**Next Session:**
- [x] Begin Phase 1: Add 33 glossary terms ✅ DONE (Session 23)
- [ ] Create framework page template
- [ ] Start HIGH priority framework pages

---

## Session 21 (2026-02-04)

**Focus:** Project initialization and planning
**Completed:**
- [x] Created FrameworkOverhaul.md master plan document
- [x] Created prompt-report-expansion-plan.md detailed breakdown
- [x] Established non-negotiable standards
- [x] Defined citation rules based on Facts & Fictions methodology
- [x] Cataloged all 89 new pages needed
- [x] Prioritized frameworks (HIGH/MEDIUM/LOW)
- [x] Cleaned .htaccess (removed unused font caching rules)
- [x] Fixed z-index stacking for foundations/index.html timeline animation
- [x] Added Phase 5: Navigation UX Overhaul plan
  - Accordion-style menus with auto-collapse behavior
  - Multi-column link layout (8 links per column max)
  - Neurodivergence section moved under Resources
  - Mobile vs Desktop behavior differences defined

**Next Session:**
- [x] Phase 5: Navigation UX Overhaul ✅ DONE

---

## Batch Progress Tracking

### Phase 1: Glossary (2,141/2,141) ✅ COMPLETE
```
Progress: [████████████████████] 100%
```
- [x] Created data/glossary.json with 33 prompting terms (Session 23)
- [x] Added JS to load and render terms from JSON (Session 23)
- [x] Updated search-index.json with all terms (Session 23)
- [x] Expanded to 2,141 terms across 10+ domains (Session 29)
- [x] Migrated all terms from inline HTML to JSON lazy loading (Session 29)
- [x] Rewrote JSON loader using DOM API — no innerHTML (Session 29)
- [x] Added content-visibility: auto for lazy rendering (Session 29)

### Phase 2: Text Frameworks (52/52) ✅ COMPLETE
```
Progress: [████████████████████] 100%
HIGH Priority: [████████████████████] 100%
MEDIUM Priority: [████████████████████] 100%
LOW Priority: [████████████████████] 100%
```

**2A: Zero-Shot Frameworks (8/8) COMPLETE**
- [x] zero-shot.html (HIGH) ✅
- [x] emotion-prompting.html (MEDIUM) ✅
- [x] style-prompting.html (MEDIUM) ✅
- [x] s2a.html (LOW) ✅
- [x] simtom.html (LOW) ✅
- [x] rar.html (MEDIUM) ✅
- [x] re2.html (LOW) ✅
- [x] self-ask.html (MEDIUM) ✅

**2B: In-Context Learning (10/10) COMPLETE**
- [x] one-shot.html (HIGH) ✅
- [x] many-shot.html (MEDIUM) ✅ Session 45
- [x] example-selection.html (HIGH) ✅
- [x] example-ordering.html (MEDIUM) ✅ Session 45
- [x] knn-prompting.html (LOW) ✅
- [x] vote-k.html (LOW) ✅
- [x] self-generated-icl.html (MEDIUM) ✅ Session 45
- [x] demo-ensembling.html (LOW) ✅
- [x] active-example.html (LOW) ✅ Session 45
- [x] prompt-mining.html (LOW) ✅

**2C: Thought Generation (12/12) COMPLETE**
- [x] zero-shot-cot.html (HIGH) ✅
- [x] analogical-reasoning.html (MEDIUM) ✅
- [x] step-back.html (MEDIUM) ✅
- [x] thread-of-thought.html (LOW) ✅
- [x] tab-cot.html (LOW) ✅
- [x] contrastive-cot.html (MEDIUM) ✅
- [x] uncertainty-cot.html (LOW) ✅ Session 45
- [x] complexity-prompting.html (LOW) ✅
- [x] active-prompting.html (LOW) ✅
- [x] memory-of-thought.html (LOW) ✅
- [x] auto-cot.html (MEDIUM) ✅
- [x] structured-cot.html (LOW) ✅

**2D: Decomposition (8/8) COMPLETE**
- [x] least-to-most.html (HIGH) ✅
- [x] decomp.html (MEDIUM) ✅
- [x] plan-and-solve.html (HIGH) ✅
- [x] tree-of-thought.html (HIGH) ✅
- [x] graph-of-thought.html (MEDIUM) ✅
- [x] recursion-of-thought.html (LOW) ✅
- [x] program-of-thought.html (MEDIUM) ✅
- [x] faithful-cot.html (LOW) ✅

**2E: Ensembling (6/6) COMPLETE**
- [x] cosp.html (LOW) ✅
- [x] dense-prompting.html (LOW) ✅
- [x] max-mutual-info.html (LOW) ✅
- [x] meta-reasoning.html (LOW) ✅
- [x] universal-self-consistency.html (LOW) ✅
- [x] diverse-prompting.html (LOW) ✅

**2F: Self-Criticism (8/8) COMPLETE**
- [x] self-refine.html (HIGH) ✅
- [x] self-verification.html (HIGH) ✅
- [x] chain-of-verification.html (MEDIUM) ✅
- [x] critic.html (MEDIUM) ✅
- [x] cumulative-reasoning.html (LOW) ✅
- [x] reversing-cot.html (LOW) ✅
- [x] self-calibration.html (LOW) ✅
- [x] reflexion.html (MEDIUM) ✅

**Note:** Navigation updated across all 111+ files with all 70 framework links

### Quality Redesign Waves (40/40 pages complete) — Track Started Session 29
```
Progress: [████████████████████] 100%
```
All 40 existing framework pages redesigned to match ReAct/COSTAR/Flipped Interaction quality standard (13-section template, 700-1000+ lines each).

| Wave | Pages | Status |
|------|-------|--------|
| Wave 1 — Self-Correction | 6 pages (critic, chain-of-verification, reflexion, self-calibration, self-refine, self-verification) | ✅ COMPLETE (Session 29) |
| Wave 2 — CoT Variants | 8 pages (auto-cot, contrastive-cot, structured-cot, faithful-cot, complexity-prompting, tab-cot, reversing-cot, cumulative-reasoning) | ✅ COMPLETE (Session 31) |
| Wave 3 — Decomposition | 6 pages (decomp, self-ask, step-back, graph-of-thought, program-of-thought, recursion-of-thought) | ✅ COMPLETE (Session 32) |
| Wave 4 — Advanced Reasoning | 7 pages (analogical-reasoning, meta-reasoning, thread-of-thought, memory-of-thought, simtom, max-mutual-info, universal-self-consistency) | ✅ COMPLETE (Session 34) |
| Wave 5 — Example Methods | 7 pages (active-prompting, knn-prompting, vote-k, demo-ensembling, diverse-prompting, dense-prompting, prompt-mining) | ✅ COMPLETE (Session 35) |
| Wave 6 — Style & Emotion | 6 pages (emotion-prompting, style-prompting, s2a, re2, cosp, rar) | ✅ COMPLETE (Session 36) |

**Reference templates:** `learn/self-ask.html` (855 lines) — canonical 13-section template

---

## NEXT: Phase 2 Remaining — 22-Page Redesign + Full Navigation Update

### Context

Waves 1-6 redesigned 40 learn pages to the 13-section template (700-900 lines each).
22 framework pages STILL use the old template and need the same 13-section redesign.
Additionally, ALL HTML pages across the entire site need their header nav, footer, and
mobile nav updated to a single canonical version.

---

### PART A — 13-Section Content Redesign (22 pages)

Use parallel background Task agents (5-6 per wave) to redesign these pages. Each page
must be rewritten from scratch using the 13-section template from `learn/self-ask.html`.

#### Template: 13-Section Structure (reference: learn/self-ask.html, 855 lines)

Every page MUST include all 13 sections in this exact order:
1. **Hero** — breadcrumb, hero-badge, title, subtitle
2. **Historical Context** — highlight-box--warning with year, authors, modern LLM status
3. **The Concept** — split-section with core insight explanation
4. **How It Works** — element-timeline with 3-4 numbered steps
5. **Comparison Panel** — before/after with VS divider
6. **Examples in Action** — 3 accordion examples with technique-demo
7. **When to Use** — Perfect For (4 items) / Skip It When (3 items) feature lists
8. **Use Cases** — 6 use-case-showcase items
9. **Framework Positioning** — evolution-timeline with 4 era-markers
10. **Related Frameworks** — 3 evolution-callout links
11. **CTA Section** — cta-corporate with canvas
12. **Back-to-Top** button
13. **Accessibility Dashboard** — full dialog panel

#### Critical Rules (CSP A+ Compliance)
- 0 inline styles (`style=""`)
- 0 inline scripts (`onclick=""`, `onload=""`, etc.)
- 0 external resources (no CDNs, Google Fonts, external APIs)
- NO `Content-Security-Policy` meta tags (remove from old pages)
- NO `rel="preload"` hints (remove from old pages)
- Use `&mdash;` `&ldquo;` `&rdquo;` `&rsquo;` for typographic characters
- No citations, no stat cards, no content badges
- Historical context notice required on every framework page

#### Head section format (match self-ask.html exactly):
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="[page-specific description]">
    <title>[Page Name] - Praxis</title>
    <link rel="icon" type="image/svg+xml" href="../favicon.svg">
    <link rel="stylesheet" href="../styles.css">
</head>
```

#### Pages to Redesign (22 total — 4 waves of 5-6 agents each)

**Wave A — Foundation Frameworks (6 pages):**
| File | Current Lines | Category |
|------|--------------|----------|
| learn/chain-of-thought.html | 622 | Reasoning Enhancement |
| learn/few-shot-learning.html | 630 | In-Context Learning |
| learn/zero-shot.html | 757 | Zero-Shot Technique |
| learn/one-shot.html | 909 | In-Context Learning |
| learn/role-prompting.html | 589 | Zero-Shot Technique |
| learn/self-consistency.html | 615 | Ensemble Method |

**Wave B — Structured Frameworks (6 pages):**
| File | Current Lines | Category |
|------|--------------|----------|
| learn/crisp.html | 848 | Structured Framework |
| learn/crispe.html | 849 | Structured Framework |
| learn/costar.html | 815 | Structured Framework |
| learn/constrained-output.html | 587 | Output Control |
| learn/context-structure.html | 587 | Context Optimization |
| learn/prompt-chaining.html | 626 | Multi-Step Prompting |

**Wave C — Advanced Techniques (5 pages):**
| File | Current Lines | Category |
|------|--------------|----------|
| learn/tree-of-thought.html | 759 | Advanced Reasoning |
| learn/plan-and-solve.html | 660 | Decomposition |
| learn/least-to-most.html | 725 | Decomposition |
| learn/example-selection.html | 862 | Few-Shot Optimization |
| learn/shot-prompting.html | 618 | In-Context Learning |

**Wave D — Flagship Pages (5 pages):**
| File | Current Lines | Category |
|------|--------------|----------|
| learn/react.html | 996 | Agentic Framework |
| learn/flipped-interaction.html | 952 | Interactive Framework |
| learn/prompt-basics.html | 934 | Getting Started |
| learn/zero-shot-cot.html | 858 | Reasoning Enhancement |
| learn/facts-fictions.html | 1101 | Getting Started |

#### Agent Instructions
For each agent: Read `learn/self-ask.html` to get the exact header/nav HTML (lines 1-132)
and footer/back-to-top/accessibility HTML (lines 723-855). Use these EXACTLY. Then read
the current version of the page being redesigned to understand its content. Write the
full page with all 13 sections using the Write tool. Each page should be 700-900 lines.

#### Verification After Each Wave
- grep for `style="` → must be 0 in all files
- grep for `onclick|onload|onmouse` → must be 0
- grep for `Content-Security-Policy` → must be 0 (removed from old pages)
- Line count check: all files 700+ lines
- Verify all 13 section comments present

#### Part A Progress
```
Progress: [████████████████████] 100%
```
| Wave | Pages | Status |
|------|-------|--------|
| Wave A — Foundation Frameworks | 6 pages (chain-of-thought, few-shot-learning, zero-shot, one-shot, role-prompting, self-consistency) | ✅ COMPLETE (Session 37) |
| Wave B — Structured Frameworks | 6 pages (crisp, crispe, costar, constrained-output, context-structure, prompt-chaining) | ✅ COMPLETE (Session 37) |
| Wave C — Advanced Techniques | 5 pages (tree-of-thought, plan-and-solve, least-to-most, example-selection, shot-prompting) | ✅ COMPLETE (Session 37) |
| Wave D — Flagship Pages | 5 pages (react, flipped-interaction, prompt-basics, zero-shot-cot, facts-fictions) | ✅ COMPLETE (Session 37) |

---

### PART B — Full Navigation Update (ALL ~100 HTML pages)

After Part A content redesign is complete, update the header nav, footer, and mobile nav
on EVERY HTML page across the entire site to match a single canonical version.

#### Why This Is Needed
The header mega-menu currently lists only ~47 learn pages but there are 62+ framework
pages. Many pages were added in Waves 1-6 but never added to the nav. The footer and
mobile nav also need to be consistent across all pages.

#### Scope — All HTML files grouped by directory depth

**Root level (paths relative to root):** 1 file
- `index.html`

**One level deep (paths use `../` prefix):** ~96 files
- `pages/*.html` (12 files: about, ai-assisted-building, ai-for-everybody, ai-safety,
  animation-features, chatgpt-guide, faq, glossary, performance, resources, security,
  universal-design)
- `tools/*.html` (12 files: index, analyzer, bias, checklist, guidance, hallucination,
  jailbreak, matcher, persona, scorer, specificity, temperature)
- `patterns/index.html` (1 file)
- `foundations/index.html` (1 file)
- `quiz/index.html` (1 file)
- `neurodivergence/*.html` (6 files: index, adhd, autism, dyslexia, resources, tools)
- `learn/*.html` (~63 files — all framework pages + index)

**Two levels deep (paths use `../../` prefix):** 3 files
- `learn/modality/code/*.html` (code-prompting, self-debugging, structured-output)

#### Navigation Update Process
1. Define CANONICAL nav HTML for each directory depth level (root, one-deep, two-deep)
   — the only difference between them is the relative path prefixes
2. Use parallel agents to update files in batches:
   - Agent per directory (pages/, tools/, neurodivergence/, etc.)
   - For learn/*.html, batch into groups of ~10 files per agent
3. Header nav, mega-menu, footer, and mobile menu button are all the same HTML —
   updating header and footer covers desktop AND mobile nav

#### What Specifically Needs Updating
- **Header mega-menu Learn section**: Add all 62+ framework pages organized by category
- **Header mega-menu AI Readiness section**: Verify all tools are listed
- **Header mega-menu Resources section**: Verify all resource pages are listed
- **Footer links**: Update to include key pages from all sections
- **Active state**: Each learn page should have `class="nav-link active"` on the Learn link
- **Consistent structure**: Remove any old CSP meta tags, preload hints from headers

#### Verification After Nav Update
- Spot-check 5 files from different directories to confirm nav matches canonical version
- grep for `Content-Security-Policy` across all HTML → should only appear where intended
- Verify all relative paths resolve correctly (`../` vs `../../` vs `./`)

#### Part B Progress
```
Progress: [████████████████████] 100%
```
- [x] Define canonical nav HTML (root level) ✅
- [x] Define canonical nav HTML (one-deep level) ✅
- [x] Define canonical nav HTML (two-deep level) ✅
- [x] Update root: index.html ✅
- [x] Update pages/*.html (12 files) ✅
- [x] Update tools/*.html (12 files) ✅
- [x] Update patterns/index.html ✅
- [x] Update foundations/index.html ✅
- [x] Update quiz/index.html ✅
- [x] Update neurodivergence/*.html (6 files) ✅
- [x] Update learn/*.html (63 files) ✅
- [x] Update learn/modality/code/*.html (3 files) ✅
- [x] Verification pass ✅

**Completed Session 38** — Python batch script updated all 100 files. Mega-menu expanded from ~47 to 65 links (62 framework + 3 code) organized into 9 categories. Head cleanup removed all CSP meta, preload, and referrer tags.

---

### Phase 3: Modality Frameworks (24/37)
```
Progress: [████████████░░░░░░░░] 65%
```
- [x] 3A: Image Prompting (12/12) ✅ COMPLETE (Session 46)
- [x] 3B: Audio/Speech (6/6) ✅ COMPLETE (Session 48)
- [ ] 3C: Video (0/6) — NOT STARTED
- [ ] 3D: Code/Structured (0/5 new, 3 exist) — NOT STARTED
- [ ] 3E: 3D/Spatial (0/5) — NOT STARTED
- [x] Modality Hub page (`learn/modality/index.html`) ✅ COMPLETE (Session 46, Audio section added Session 48)

### Session 47 Additions
- [x] Glossary Inline Search — COMPLETE (search bar on glossary page, 8-tier scoring, content-visibility scroll fix)
- [x] Mega-Menu Redesign Plan — COMPLETE (tabbed categories chosen, plan at `.claude/plans/valiant-foraging-balloon.md`)
- [x] Mega-Menu Redesign Implementation — COMPLETE (Session 48, all 6 steps, 133+ files converted to tabbed)

### Phase 4: Site Integration (3/4)
```
Progress: [███████████████░░░░░] 75%
```
- [x] 4A: Navigation updates for HIGH priority pages ✅
- [x] 4B: Learn Hub redesign → **"Discover Hub" COMPLETE (see discover-hub-category-pages.md)** ✅
- [x] 4C: Search index updates → **COMPLETE (2,226 entries, all categories renamed)** ✅
- [ ] 4D: Framework Matcher updates

### NEW: Discover Hub + Category Landing Pages (5/5 phases) COMPLETE
```
Progress: [████████████████████] 100%
```
**Plan:** `.claude/plans/discover-hub-category-pages.md`
**Status:** ALL 5 PHASES COMPLETE (Sessions 42-43)
**Architecture Reference:** `.claude/SiteFrameworks.md` (created Session 41, 1,041 lines)

- [x] Phase 1: Batch rename "Advanced Techniques" → "Prompting Strategies" + "Learn" → "Discover" (104 files, commit `32d7351`)
- [x] Phase 2: Redesign learn/index.html as Discover Hub (63 framework cards, 8 categories, commit `4d296ba`)
- [x] Phase 3: Create 7 flat category landing pages (commit `0eb604e`)
- [x] Phase 4: Update homepage cards + mega-menu links to point to category pages (commit `a8f8df0`)
- [x] Phase 5: Search index + metadata updates (8 new entries, 30 renames, commit `b1c922d`)

### Phase 5: Navigation UX Overhaul (6/6) ✅ COMPLETE
```
Progress: [████████████████████] 100%
```
- [x] 5A: Menu structure reorganization (Neurodivergence → Resources)
- [x] 5B: Mobile menu behavior (always-expanded, not accordion)
- [x] 5C: Multi-column link layout (CSS mega-menu--multi-column)
- [x] 5D: Featured section styling (AI & ND)
- [x] 5E: HTML/ARIA updates (aria-expanded on nav-items)
- [x] 5F: Update all 48 navigation files

---

*This document is the single source of truth for the Framework Overhaul project. Update after each session.*
