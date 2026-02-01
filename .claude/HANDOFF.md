# Praxis Project Handoff Document

**Last Updated:** 2026-01-31 (Session 2)
**Last Commit:** `330e125` - fix: Improve acronym card layout to fit content in single row
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
| 1.8 Darken learning content backgrounds | ✅ Done | Text colors darkened, CTA text lightened |
| 1.9 Badge lightbox popups | ⏳ Pending | Smoked glass effect |
| 1.10 Animation term glossary links | ⏳ Pending | Link floating AI terms to glossary |
| Neural CTA backgrounds | ✅ Done | Added to 12 pages |
| Hero title enlargement | ✅ Done | 2.5/3.5/4rem responsive sizes |
| CRISPE Builder fix | ✅ Done | Example field now required |
| Animation stability fix | ✅ Done | Delta time capping + visibility handler |
| Back-to-top bar | ✅ Done | Full-width white bar, black text, arrow icon |
| Site badges bar (footer) | ✅ Done | Full-width dark bar with all badges |
| Reference text styling | ✅ Done | `<em>` in disclaimers now bold, blue, larger |
| Footer gap fix | ✅ Done | Explicit margin/padding/border resets |
| Anatomy cards enhancement | ✅ Done | Colored borders, shadows, hover effects |
| Build-step enhancement | ✅ Done | Added shadows, improved hover states |
| Scenario tabs enhancement | ✅ Done | Card wrapper with border and shadow |

### Latest Session Work (2026-01-31 - Session 3)

**Footer Gap Fix:**
- Fixed persistent gaps between footer, back-to-top bar, and badges bar
- Added explicit margin/padding/border resets to footer, footer-bottom, back-to-top-bar, and body
- Ensured seamless visual connection between all bottom-of-page elements

**Prompt Basics Visual Enhancements:**
- Enhanced `.anatomy-card` styling with:
  - Colored left border (primary color accent)
  - Subtle shadow for depth
  - Larger, gradient-filled number circles with glow effect
  - Smooth hover animation with lift effect
- Enhanced `.build-step` styling with:
  - Added shadow for visual depth
  - Improved hover state with stronger shadow
- Enhanced `.scenario-tabs-container` with:
  - Card-style wrapper with border and shadow
  - Better spacing and visual containment

**Previous Session Work (Session 2):**
- Created full-width static "Back to Top" bar between footer and badges bar
- Created site badges bar at very bottom with all 5 badges
- Added to ALL 22 HTML pages across the site
- `<em>` tags in disclaimer sections styled: bold, blue, 1.05rem

**Files Updated This Session:**
- `styles.css` - Footer gap fixes, anatomy card enhancements, build-step improvements

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
- All other pages: In white content area, at start of first `.section` container (above first h2 or content element)

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

1. **Task 1.9:** Badge lightbox popups
   - Smoked glass type background
   - Information regarding each badge focus

2. **Task 1.10:** Animation term glossary links
   - Link floating AI terms to glossary

3. **Task 1.11:** Acronym card accent styling
   - **Red cards:** Add thicker left-side accent (10% black, cap-style)
   - **White cards:** Add white version of the accent
   - **Black cards:** Increase red accent by ~30%
   - **Files:** styles.css (`.acronym-card` variants)
   - **Plan:**
     1. Locate `.acronym-card` CSS in styles.css
     2. Add/modify `border-left` or `::before` pseudo-element for cap accent
     3. Red variant: 10% black accent on left
     4. White variant: white accent on left
     5. Black variant: increase existing red accent width by 30%
     6. Test on CRISP, CRISPE, COSTAR, ReAct pages

4. **Task 1.12:** Method comparison text styling
   - Style "vs. Other Methods" sections on methodology pages
   - **Main concepts:** Bold text
   - **Important keywords:** Thermo Fisher Scientific Red (site's primary red)
   - **Files:** crisp.html, crispe.html, costar.html, react.html + styles.css
   - **Plan:**
     1. Add CSS class for red keyword highlighting (`.keyword-highlight`)
     2. Locate comparison sections in methodology HTML files
     3. Wrap main concepts in `<strong>` tags
     4. Wrap important keywords in `<span class="keyword-highlight">`
     5. Test across all methodology pages

5. **Task 1.13:** Method use-case guidance text
   - Add guidance on when to use each method
   - **CRISP page:** "Great for quick emails and general tasks. Not strong at duplicating exact structure. Use when specific structured output is not required."
   - **CRISPE page:** "CRISPE Provides Example output, ideal for accurately duplicating structure (e.g., SOPs). The 'E' gives AI an exact example to be as accurate, efficient, and effective as possible."
   - **Files:** learn/crisp.html, learn/crispe.html
   - **Plan:**
     1. Locate appropriate section in each page (likely near "vs. Other Methods")
     2. Add guidance callout or tip box with use-case info
     3. Style consistently with existing callout components

6. **Task 1.14:** Site messaging audit - Growth mindset language
   - **Philosophy:** "No Bad Ideas" vibe - positive outlook, growth-focused
   - **Not:** Ignoring challenges | **Yes:** "Because challenges exist, I will overcome them"
   - **Language changes:**
     - "Strong" → "Stronger"
     - "Weak" → "Weaker"
     - Add: "Better Use", "Better Fit"
     - Avoid finite/absolute terms
   - **Scope:** Site-wide content audit
   - **Tone:** Subtle but consistent throughout
   - **Core reason:** This is why the resource was built
   - **Files:** All HTML pages, especially:
     - Prompt examples (prompt-basics.html, methodology pages)
     - Tool feedback text (analyzer.html, etc.)
     - Comparison sections
   - **Plan:**
     1. Grep for finite terms: "strong prompt", "weak prompt", "bad prompt", "wrong"
     2. Create replacement guidelines document
     3. Update prompt-basics.html as template
     4. Apply changes to all methodology pages
     5. Update tool feedback messages
     6. Review CTA and instructional text
     7. Final audit for consistency

7. **Task 1.15:** Visual consistency audit - Align plain sections with badge aesthetic
   - **Problem:** Some sections feel flat/unengaging (light grey on light grey, washed out)
   - **Goal:** Match the polished red/white/black badge aesthetic throughout
   - **Target areas identified:**
     - "See How a Prompt Evolves" tabs and content area
     - Build step progression cards (START, +CONTEXT, +SPECIFICS, etc.)
     - Light grey background sections that lack contrast
     - Headers with insufficient contrast (light grey on light grey)
     - Any red-on-light-red or green elements that don't fit
   - **Design direction:**
     - Strong visual hierarchy like the badge section
     - Red, white, off-white, and black on white backgrounds
     - Clear contrast that "sets a tone"
     - Engaging, not plain
   - **Files:** styles.css, prompt-basics.html (primary), potentially other learn pages
   - **Plan:**
     1. Audit all sections on prompt-basics.html for contrast issues
     2. Document specific elements needing updates
     3. Define color/contrast rules matching badge aesthetic
     4. Update CSS for build-step progression cards
     5. Update CSS for scenario tabs section
     6. Review and update any light-grey-on-light-grey headers
     7. Eliminate washed-out color combinations
     8. Test across all pages using these components
     9. Ensure consistency site-wide

8. **Task 1.16:** Add GitHub badge to all badge bars
   - **Badge design:**
     - Style 1: Grey background with white text
     - Style 2: Black background with white text (alternate/hover)
     - Text: "Visit our" (label) / "GitHub" (value)
     - Links to: https://github.com/basrosario/PROMPTLIBRARY
   - **Placement:** All badge bars site-wide (content-badges AND site-badges-bar)
   - **Files:**
     - styles.css (new `.content-badge--github` class)
     - All 22+ HTML files (add badge to both locations)
   - **Plan:**
     1. Create CSS for `.content-badge--github` (grey/white variant)
     2. Create hover state (black/white variant)
     3. Add to index.html as template
     4. Add to all content-badges sections (22 pages)
     5. Add to all site-badges-bar sections (22 pages)
     6. Test links on all pages

9. **Phase 2:** Update `prompt-basics.html`
   - Add email example (professional, friendly tone, colleague context)

---

## MAJOR INITIATIVE: Neurodivergence + AI Resource Center

### Vision & Philosophy
**Goal:** Become the single source of truth for neurodivergence and AI education
**Approach:** Thorough, accurate, caring, thoughtful presentation
**Scope:** Dedicated area of the site - current site remains unaltered

### Source Requirements (STRICT)
| Requirement | Standard |
|-------------|----------|
| **Source types** | .EDU, .GOV, officially accredited institutions ONLY |
| **Publication date** | 2024-2026 (verified publication dates) |
| **Citation** | At point of delivery for EVERY stat, fact, measurable, opinion |
| **Exclusions** | NO social media, NO memes, NO freelance, NO independent sites |
| **Verification** | All sources must be published and independently verifiable |

### Content Pillars

**Pillar 1: Understanding Neurodivergence**
- What neurodivergence is (clinical, educational, workplace perspectives)
- Types of neurodivergence (ADHD, Autism, Dyslexia, Dyspraxia, etc.)
- Neurodivergent strengths and cognitive differences
- Dispelling myths with cited research

**Pillar 2: AI as an Assistive Tool**
- How AI can enhance neurodivergent capabilities
- Specific AI tools and their applications
- Workplace accommodations powered by AI
- Home/personal life enhancements
- Learning and education support

**Pillar 3: Community & Leadership Education**
- How managers can support neurodivergent team members
- Creating inclusive AI adoption strategies
- Organizational best practices
- Ally education and awareness

**Pillar 4: Practical Implementation**
- Step-by-step guides for common scenarios
- Tool recommendations with accessibility focus
- Prompt templates designed for neurodivergent users
- Success stories and case studies (from verified sources)

### Accessibility Audit & Action

**Phase A: Comprehensive Audit**
1. WCAG 2.1 AA/AAA compliance review
2. Screen reader testing (NVDA, JAWS, VoiceOver)
3. Keyboard navigation verification
4. Color contrast analysis
5. Cognitive load assessment
6. Motion/animation sensitivity review
7. Reading level analysis

**Phase B: Action Plan**
- Document all findings
- Prioritize by impact and severity
- Create remediation timeline
- Test with assistive technologies
- Validate with neurodivergent user feedback (if available)

**Phase C: Design Considerations**
- If aesthetic changes needed: create NEW support experience from scratch
- Current site aesthetic remains unchanged
- New section may have its own optimized design language
- Focus on clarity, reduced cognitive load, sensory-friendly options

### Research Methodology

**Step 1: Source Identification**
- Search .edu and .gov domains specifically
- Academic databases (peer-reviewed journals)
- Government health/education agencies (NIH, CDC, Dept of Education)
- University research centers specializing in neurodivergence
- Official organizational publications (verified nonprofits with academic backing)

**Step 2: Source Verification**
- Confirm publication date within 2024-2026
- Verify author credentials
- Check institutional affiliation
- Cross-reference claims with multiple sources
- Document full citation for each source

**Step 3: Content Compilation**
- Organize by pillar
- Create citation database
- Write in accessible, clear language
- Include glossary of terms
- Provide multiple formats where possible

**Step 4: Review & Validation**
- Fact-check all statistics
- Verify all links are active and official
- Ensure balanced, non-stigmatizing language
- Align with site's growth mindset philosophy

### File Structure (Proposed)
```
_public_html/
├── neurodivergence/
│   ├── index.html              # Hub page
│   ├── understanding.html      # Pillar 1
│   ├── ai-tools.html           # Pillar 2
│   ├── leadership.html         # Pillar 3
│   ├── implementation.html     # Pillar 4
│   ├── resources.html          # Curated external resources
│   └── glossary.html           # ND-specific glossary
```

### Implementation Notes
- This is a research-first initiative - gather sources before writing content
- Quality over speed - accuracy is paramount
- Respectful, person-first OR identity-first language (acknowledge both preferences)
- Avoid medical model language unless quoting clinical sources
- Celebrate neurodivergent strengths while acknowledging real challenges
- Align with site's "No Bad Ideas" growth mindset philosophy

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
