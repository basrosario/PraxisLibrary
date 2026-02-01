# Praxis Project Handoff Document

**Last Updated:** 2026-02-01 (Session 6)
**Last Commit:** `1131dae` - docs: Update About page purpose statement + README header
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

### 4a. Anchor Link Standards (Content Visibility)

**Rule:** Anchor-linked content must always be visible below sticky headers/navigation.

| Context | scroll-margin-top | Use Case |
|---------|-------------------|----------|
| Standard pages | `100px` | Header clearance |
| Glossary/sub-nav pages | `160px` | Header + sticky nav clearance |

**ID Naming Conventions:**
- `id="letter-X"` - Glossary letter sections (A, B, C...)
- `id="term-X"` - Glossary term definitions
- `id="section-X"` - Generic page sections

**CSS Implementation (in styles.css):**
```css
:target { scroll-margin-top: 100px; }
[id^="letter-"], [id^="term-"] { scroll-margin-top: 160px; }
```

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

### Latest Session Work (2026-02-01 - Session 6)

**Completed Tasks:**
- About page "Why Praxis?" section refined with personal purpose statement
- README.md header updated: "Praxis Educational Interactive AI Training & Tool Library"
- README.md subtitle updated: Added "and practices" to methodology description

**Files Modified:**
- pages/about.html (Why Praxis? section content)
- README.md (header and subtitle text)

**Pushed:** commit `1131dae`

### Previous Session Work (2026-02-01 - Session 5)

**Completed Tasks:**
- Task 1.11: Acronym card accent styling ✅
- Task 1.12: Method comparison text styling ✅
- Task 1.13: Method use-case guidance for CRISP/CRISPE ✅
- Task 1.14: Site messaging audit (growth mindset language) ✅
- Neural animation terms: Replaced AI_TERMS with prompting technique terms ✅

**Growth Mindset Language Changes:**
- "Weak Prompt" → "Basic Prompt"
- "Strong Prompt" → "Enhanced Prompt"
- "Strong X Example" → "Effective X Example"
- "Best Use Cases" → "Better Use Cases"
- "Not as strong at" → "Better suited for"

**Files Modified:**
- app.js (AI_TERMS array, TERM_GLOSSARY_MAP)
- learn/crisp.html, crispe.html, costar.html, react.html
- learn/prompt-basics.html
- tools/analyzer.html

**Pushed:** commit `28184e5`

### Previous Session Work (2026-01-31 - Session 4)

**Task Documentation & Planning:**
- Documented 8 new tasks from user's .docx file (Tasks 1.9-1.16)
- Created comprehensive MAJOR INITIATIVE: Neurodivergence + AI Resource Center
- Fixed border/line between back-to-top bar and badges bar (seamless connection)
- Reduced back-to-top bar height by 20% (0.6rem → 0.48rem padding)
- Added new resource pages: ChatGPT Guide, Replit Guide, IDE Guide
- Pushed all changes to GitHub (commit `0c0ff1f`)

**New Tasks Documented:**
- Task 1.11: Acronym card accent styling (thicker borders)
- Task 1.12: Method comparison text styling (bold + red keywords)
- Task 1.13: Method use-case guidance for CRISP/CRISPE
- Task 1.14: Site messaging audit (growth mindset language)
- Task 1.15: Visual consistency audit (align with badge aesthetic)
- Task 1.16: GitHub badge for all badge bars

**MAJOR INITIATIVE Added:**
- Neurodivergence + AI Resource Center (dedicated section)
- 4 content pillars defined
- Strict source requirements (.EDU/.GOV only, 2024-2026)
- Accessibility audit framework
- Research methodology outlined
- Proposed file structure for `/neurodivergence/` directory

**Previous Session Work (Session 3):**
- Footer gap fix (seamless connection between elements)
- Anatomy cards, build-step, scenario tabs enhancements

**Files Updated This Session:**
- `.claude/HANDOFF.md` - Comprehensive task documentation
- `styles.css` - Back-to-top bar height reduction, border fixes
- New pages: `pages/chatgpt-guide.html`, `pages/replit-guide.html`, `pages/ide-guide.html`

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

1. **Task 1.9:** Badge lightbox popups ✅ COMPLETED
   - Smoked glass type background
   - Information regarding each badge focus
   - Added to all 23 HTML pages

2. **Task 1.10:** Animation term glossary links ✅ COMPLETED
   - Link floating AI terms to glossary
   - Added IDs to all glossary terms (term-ai, term-llm, term-hallucination, etc.)
   - Created TERM_GLOSSARY_MAP object mapping AI_TERMS to glossary anchors
   - Added click detection for NeuralNetwork and HeroNeuralBackground classes
   - Cursor changes to pointer on hover over clickable terms
   - Click navigates to glossary page with anchor to specific term

2a. **Task 1.10a:** Navigation menu reorganization ✅ COMPLETED
   - Moved Patterns Library, Readiness Quiz, AI Safety from Resources to AI Readiness
   - Updated header navigation in all 23 HTML pages
   - Updated footer links in all 23 HTML pages
   - Resources now links to ChatGPT Guide as primary destination
   - AI Readiness menu order: Prompt Analyzer, Prompt Builder, Preflight Checklist, Hallucination Spotter, Readiness Quiz, Patterns Library, AI Safety

3. **Task 1.11:** Acronym card accent styling ✅ COMPLETED
   - Thickened left-side accents from 5px to 7-8px
   - Updated regular cards, flip cards, and variant accents

4. **Task 1.12:** Method comparison text styling ✅ COMPLETED
   - Added bold + red keyword styling in tip callouts
   - Updated CRISP, CRISPE, COSTAR, ReAct pages

5. **Task 1.13:** Method use-case guidance text ✅ COMPLETED
   - Added "Better Use Cases for CRISP" callout
   - Added "When to Use CRISPE" callout with emphasis on examples

6. **Task 1.14:** Site messaging audit - Growth mindset language ✅ COMPLETED
   - "Weak Prompt" → "Basic Prompt"
   - "Strong Prompt" → "Enhanced Prompt"
   - "Strong X Example" → "Effective X Example"
   - "Best Use Cases" → "Better Use Cases"
   - Updated "better suited/better fit" language
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

9. **Task 1.17:** ADL Accessibility Dashboard (Floating)
   - **Purpose:** User-controlled accommodations for UD/UDL compliance
   - **Features:**
     - **Text Size Control:** 1x (default), 2x, 3x scaling for headers, paragraphs, labels, badges
     - **Contrast Mode:** Toggle between dark-on-light and light-on-dark
     - **Dimming Control:** Adjustable brightness/dimming for light sensitivity
   - **UI Design:**
     - Floating dashboard button (fixed position)
     - Expandable panel with controls
     - Persist user preferences (localStorage)
   - **Files:**
     - styles.css (dashboard styles + accessibility CSS variables)
     - app.js (dashboard logic, preference storage)
     - All HTML files (add dashboard element)
   - **Plan:**
     1. Design dashboard UI (floating button + expandable panel)
     2. Create CSS variables for text scaling (--text-scale: 1/2/3)
     3. Create CSS for contrast modes (data-contrast="light"|"dark")
     4. Create CSS for dimming (--dim-level: 0-100%)
     5. Build JavaScript for toggle controls and localStorage persistence
     6. Add dashboard HTML to all pages
     7. Test across all pages and devices
   - **Accessibility:**
     - Dashboard itself must be keyboard navigable
     - ARIA labels for all controls
     - Preferences remembered across sessions

10. **Task 1.18:** Prompt Analyzer Enhancement - Granular Methodology Scoring
   - **Purpose:** Improve scoring accuracy with natural language structure analysis
   - **Reference benchmark:** Detailed, structured prompts = 100% base score
   - **Scoring model:**
     - **100% (Reference):** Prompt includes: clear context, explicit role, step-by-step instructions, specific constraints, defined parameters, and concrete examples
     - **105-120%:** Exceeds reference with: multiple methodology elements, detailed formatting specs, edge case handling, output validation criteria
     - **Below 100%:** Lacks key elements from reference structure
   - **Reference prompt structure (100% example):**
     ```
     You are an expert in [specific domain].

     Context: [Detailed background and situation]

     Task: [Clear, specific instructions with numbered steps]
     1. First step
     2. Second step
     3. Third step

     Constraints:
     - Constraint 1
     - Constraint 2

     Output format: [Specific structure required]

     Example: [Concrete example of expected output]
     ```
   - **Implementation:**
     1. Create granular natural language pattern library in app.js
     2. Score each methodology element independently
     3. Calculate composite score with weighting
     4. Provide specific feedback on missing/present elements
     5. Allow scores to exceed 100% for exceptional prompts
   - **Files:** app.js (PROMPT ANALYZER section), tools/analyzer.html (scoring display)

11. **Task 1.19:** Site-Wide Visual Continuity Audit
   - **Purpose:** Ensure consistent fonts, colors, themes, and sizes across all site content
   - **Scope Areas:**
     - **Fonts:** Consistent font families, weights, and styles across all pages
     - **Colors:** Unified color palette usage (primary red, secondary colors, grays)
     - **Themes:** Dark/light section consistency, background treatments
     - **Sizes:** Consistent heading sizes, text sizes, spacing, and component dimensions
   - **Audit Checklist:**
     - [ ] Font family consistency (headings vs body text)
     - [ ] Heading hierarchy sizes (h1, h2, h3, h4)
     - [ ] Body text sizes and line heights
     - [ ] Badge/label text sizes
     - [ ] Color usage follows established palette
     - [ ] Background color consistency between sections
     - [ ] Spacing/padding consistency (cards, sections, containers)
     - [ ] Component sizes match across similar elements
   - **Standards to enforce:**
     - CSS variables for all colors and sizes
     - No magic numbers - use defined spacing scale
     - Badge aesthetic (red/white/black) as reference
     - WCAG AA color contrast maintained
   - **Files:** styles.css (CSS variables, component styles), all HTML pages (structural consistency)
   - **Plan:**
     1. Document current CSS variable usage
     2. Audit all pages for inconsistent styling
     3. Identify elements not using CSS variables
     4. Create missing CSS variables where needed
     5. Update inconsistent components
     6. Test across all pages and screen sizes

12. **Phase 2:** Update `prompt-basics.html`
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
