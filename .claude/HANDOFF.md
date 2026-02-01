# Praxis Project Handoff Document

**Last Updated:** 2026-01-31
**Last Commit:** `8327e5e` - feat: Phase 1 badge relocation + workflow automation system
**Current Phase:** Phase 1 (In Progress)

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
- **Optimized images** - Use appropriate formats and sizes

### 3. Code Quality Standards

| Standard | Description |
|----------|-------------|
| **Clean, readable code** | Self-documenting, logical organization |
| **DRY principle** | Don't Repeat Yourself - reuse components |
| **Consistent naming** | BEM-style CSS (`.block__element--modifier`) |
| **No magic numbers** | Use CSS variables for values |
| **Comments only when needed** | Code should be self-explanatory |

### 4. Accessibility Standards (WCAG AA)

- All images must have meaningful `alt` text
- Color contrast must meet WCAG AA (4.5:1 for text)
- All interactive elements keyboard accessible
- Proper heading hierarchy (h1 → h2 → h3)
- Skip links for main content
- ARIA labels where semantic HTML insufficient

### 5. Code Notation Standards (NO SURPRISES)

**All code must be well-documented with clear section markers.**

#### HTML Notation:
```html
<!-- =============================================
     SECTION NAME - Brief description
     ============================================= -->
<section class="section-name">
    <!-- Component description if needed -->
    <div class="component">...</div>
</section>
<!-- /SECTION NAME -->
```

#### CSS Notation:
```css
/* ==============================================
   SECTION NAME
   Description of what styles are in this section
   ============================================== */

/* Component Name
   -------------------------------------------- */
.component {
    property: value;  /* Explanation if non-obvious */
}

/* Component - Variant/State Description */
.component--variant { }
```

#### JavaScript Notation:
```javascript
// ==============================================
// SECTION NAME
// What this code section does
// ==============================================

/**
 * Clear function description
 * @param {string} inputName - What this parameter is
 * @returns {boolean} - What gets returned
 */
function doSomething(inputName) {
    // Why we're doing this (not what)
    return result;
}

// --- Sub-section Name ---
```

#### Notation Requirements:

| Element | Notation Style |
|---------|----------------|
| **Major sections** | `===` block borders |
| **Sub-sections** | `---` line separators |
| **Functions** | JSDoc with @param/@returns |
| **Complex logic** | Inline "why" comments |
| **CSS groups** | Section header + description |
| **HTML regions** | Opening + closing markers |

**Goal:** Anyone reading the code should immediately understand:
1. What section they're in
2. What the code does
3. Why non-obvious decisions were made

---

## FILE STRUCTURE

```
_public_html/
├── index.html              # Home page
├── styles.css              # ALL styles (single file)
├── app.js                  # ALL JavaScript (single file)
├── learn/
│   ├── index.html          # Learning hub
│   ├── crisp.html          # CRISP methodology
│   ├── crispe.html         # CRISPE methodology
│   ├── costar.html         # COSTAR methodology
│   ├── react.html          # ReAct methodology
│   ├── advanced.html       # Advanced techniques
│   ├── flipped-interaction.html
│   └── prompt-basics.html  # Prompt fundamentals
├── tools/
│   ├── index.html          # Tools hub
│   ├── analyzer.html       # Prompt Analyzer
│   ├── guidance.html       # Prompt Builder
│   ├── checklist.html      # Preflight Checklist
│   └── hallucination.html  # Hallucination Spotter
├── patterns/
│   └── index.html          # Patterns Library
├── quiz/
│   └── index.html          # Readiness Quiz
├── pages/
│   ├── about.html
│   ├── ai-safety.html
│   ├── faq.html
│   └── glossary.html
└── .claude/
    ├── HANDOFF.md          # THIS FILE
    ├── settings.local.json
    └── plans/
        └── praxis-enhancement-plan.md  # Master plan
```

---

## CURRENT PROGRESS

### Phase 0: Fix Prompt Analyzer - COMPLETED ✅
- [x] Natural language pattern library built
- [x] Detection engine updated
- [x] Scoring algorithm simplified (detected/total = score)
- [x] Feedback display updated
- [x] Manual verification passing

### Phase 1: Badge Relocation & Text Updates - IN PROGRESS 🔄

| Task | Status | Notes |
|------|--------|-------|
| 1.1 Remove header badges (desktop) | ✅ Done | All HTML files updated |
| 1.2 Remove mobile accordion badges | ✅ Done | All HTML files updated |
| 1.3 Add content badges to Home page | ✅ Done | Between title and subtitle |
| 1.4 Add content badges to Learn page | ✅ Done | In dark page-hero section |
| 1.5 Add content badges to other pages | ✅ Done | All 18 pages updated |
| 1.6 Text: "AI Assisted Building" | ✅ Done | Badge text corrected |
| 1.7 Hero text update | ✅ Done | "Master the Art of AI Interactions" |
| 1.8 Darken learning content backgrounds | ⏳ Pending | Improve readability |
| 1.9 Badge lightbox popups | ⏳ Pending | Smoked glass effect |
| CRISPE Builder fix | ✅ Done | Example field now required |
| Animation stability fix | ✅ Done | Delta time capping + visibility handler |

### Phase 2: Natural Language Content - PENDING
- Update learning pages with NL examples
- First task: Update prompt-basics.html with email example
  - Example: Professional email with friendly tone
  - Context: Casual conversation to colleague
  - Content: Process instructions

### Phases 3-7: PENDING

---

## KEY IMPLEMENTATION DETAILS

### Content Badges (Already Implemented)

**HTML Structure:**
```html
<div class="content-badges fade-in">
    <span class="content-badge content-badge--ai">
        <span class="badge-label">AI for</span>
        <span class="badge-value">Everybody</span>
    </span>
    <span class="content-badge content-badge--udl">
        <span class="badge-label">Built With</span>
        <span class="badge-value">UD/UDL</span>
    </span>
    <span class="content-badge content-badge--security">
        <span class="badge-label">Security</span>
        <span class="badge-value">A+ 100%</span>
    </span>
    <span class="content-badge content-badge--performance">
        <span class="badge-label">Performance</span>
        <span class="badge-value">100%</span>
    </span>
    <span class="content-badge content-badge--claude">
        <span class="badge-label">AI Assisted Building</span>
        <span class="badge-value">Claude Code</span>
    </span>
</div>
```

**CSS Location:** styles.css (around line 506, after mobile-badge section)

**Badge Placement Pattern:**
- Home page: Between hero title and hero subtitle (in hero section)
- All other pages: In dark `.page-hero` section, after `page-subtitle`

### Hero Section (Home Page)

```html
<h1 class="hero-title fade-in">Master the Art of<br><span class="text-gradient">AI Interactions</span></h1>
<div class="content-badges fade-in">...</div>
<p class="hero-subtitle fade-in">Learn proven prompting methodologies that build the AI skills that matter. No fluff, just practical, applicable techniques.</p>
```

### CSS Variables (Reference)

Key variables used throughout (defined in styles.css):
- `--primary`, `--primary-light`, `--primary-dark`
- `--secondary`, `--accent`
- `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`
- `--radius`, `--border`
- `--text`, `--text-muted`, `--background`

---

## IMPORTANT CONTEXT

### What Was Removed
- Header badges from all HTML files
- Mobile accordion with badges
- Old "Built With Claude Code" text (replaced with "AI Assisted Building" as label)

### What Was Added
- Content badges component (`.content-badges`)
- Badge placement on home page
- Updated hero text and subtitle
- Widened hero subtitle container (420px mobile, 600px desktop)

### Files Modified This Session
1. `index.html` - Hero section updated, badges added
2. `styles.css` - Content badges CSS added, subtitle width updated
3. `app.js` - Animation stability fix (delta time capping + visibility handler)
4. All HTML files - Header/mobile badges removed, content badges added (20+ files)

**Pages with content badges:**
- Home: `index.html`
- Learn hub: `learn/index.html`
- Learn pages: `prompt-basics.html`, `crisp.html`, `crispe.html`, `costar.html`, `react.html`, `advanced.html`, `flipped-interaction.html`
- Tools hub: `tools/index.html`
- Tool pages: `analyzer.html`, `guidance.html`, `checklist.html`, `hallucination.html`
- Resources: `patterns/index.html`, `quiz/index.html`
- Pages: `about.html`, `ai-safety.html`, `faq.html`, `glossary.html`

---

## NEXT STEPS (In Order)

1. **Task 1.8:** Darken learning content backgrounds
   - Improve readability (white on light skinny font is hard to read)

2. **Task 1.9:** Badge lightbox popups
   - Smoked glass type background
   - Information regarding each badge focus

3. **Phase 2:** Update `prompt-basics.html`
   - Add email example (professional, friendly tone, colleague context)

---

## TESTING CHECKLIST

Before committing any changes, verify:

- [ ] No CSP violations in browser console
- [ ] No JavaScript errors in browser console
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] Keyboard navigation works
- [ ] Security scan passes (A+ rating maintained)
- [ ] Lighthouse Performance 100%
- [ ] All links work

---

## REFERENCE DOCUMENTS

| Document | Location | Purpose |
|----------|----------|---------|
| Master Plan | `.claude/plans/praxis-enhancement-plan.md` | Full phase details |
| Roadmap | `ToDo.md` | Extended roadmap with all phases |
| This Handoff | `.claude/HANDOFF.md` | Session continuity |

---

## CONTACT POINTS

- **Founder:** Basiliso Rosario
- **LinkedIn:** linkedin.com/in/basiliso-rosario/
- **Email:** bas.rosario@gmail.com

---

*This document ensures seamless continuity between chat sessions. Always read this file first when resuming work.*
