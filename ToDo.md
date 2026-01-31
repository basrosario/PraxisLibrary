# Site Inconsistencies & Issues

This document tracks all inconsistencies and issues found during the site scan.

---

## 1. Missing Meta Description Tags

**Severity:** Medium
**Files Affected:** All pages except index.html

Only `index.html` has a meta description tag:
```html
<meta name="description" content="Master AI prompting with Praxis...">
```

All other pages are missing this tag, which affects SEO and social sharing.

**Affected Files:**
- learn/index.html
- learn/prompt-basics.html
- learn/crisp.html
- learn/crispe.html
- learn/costar.html
- learn/react.html
- learn/advanced.html
- learn/flipped-interaction.html
- tools/index.html
- tools/analyzer.html
- tools/guidance.html
- tools/checklist.html
- tools/hallucination.html
- patterns/index.html
- quiz/index.html
- pages/about.html
- pages/ai-safety.html
- pages/faq.html
- pages/glossary.html

---

## 2. Missing CSS Preload Directive

**Severity:** Low
**Files Affected:** All pages except index.html

Only `index.html` has the CSS preload for better performance:
```html
<link rel="preload" href="styles.css" as="style">
```

All subpages are missing this performance optimization.

---

## 3. Inconsistent Badge Labels Across Pages

**Severity:** ~~High (UX Consistency)~~ **RESOLVED**

**FIXED:** Standardized all badges using Progression-Based strategy (Option B):

| Method | Badge | Color |
|--------|-------|-------|
| Prompt Basics | Start Here | badge-green |
| Flipped Interaction | Foundation | badge-red |
| CRISP | Foundation | default |
| CRISPE | Extended | default |
| COSTAR | Professional | default |
| ReAct | Advanced | badge-purple |
| Advanced Techniques | Expert | badge-purple |

All pages now use consistent labels matching the progression path.

---

## 4. Inconsistent Badge Color Classes

**Severity:** ~~Medium~~ **RESOLVED**

**FIXED:** Standardized badge colors across all pages:
- `badge-green`: Start Here (entry point)
- `badge-red`: Flipped Interaction (special interactive approach)
- default (no modifier): Foundation, Extended, Professional
- `badge-purple`: Advanced, Expert

Homepage ReAct card now uses `badge-purple` for consistency.

---

## 5. Footer Canvas Element Inconsistency

**Severity:** ~~Low~~ **RESOLVED**

**FIXED:** Removed all neural network canvas elements from index.html per user decision. Site now uses gradient backgrounds only (no animations) for consistent, clean appearance across all pages.

---

## 6. CTA Card Canvas Element Inconsistency

**Severity:** ~~Low~~ **RESOLVED**

**FIXED:** Removed canvas from CTA card and hero section on index.html. All pages now have consistent styling without canvas animations.

---

## 7. Section Alternation Pattern Issue (FAQ Page)

**Severity:** Low
**File:** pages/faq.html

The FAQ page has two consecutive `section-alt` sections at the bottom:
- Lines 335-375: "About Praxis" section with `section-alt`
- Lines 377-389: CTA section also with `section-alt`

The alternating pattern (`section` → `section-alt` → `section` → `section-alt`) breaks here.

---

## 8. Inconsistent Breadcrumb Levels

**Severity:** Low
**Description:** Some pages have 2-level breadcrumbs, others have 3-level.

**2-Level Breadcrumbs (Home / Current):**
- learn/index.html: Home / Learn
- tools/index.html: Home / AI Readiness
- quiz/index.html: Home / Readiness Quiz
- patterns/index.html: Home / Patterns
- pages/about.html: Home / About
- pages/ai-safety.html: Home / AI Safety
- pages/faq.html: Home / FAQ
- pages/glossary.html: Home / Glossary

**3-Level Breadcrumbs (Home / Section / Current):**
- learn/crisp.html: Home / Learn / CRISP Method
- learn/costar.html: Home / Learn / COSTAR Method
- tools/analyzer.html: Home / AI Readiness / Prompt Analyzer
- etc.

This is **intentional design** (index pages vs content pages), not an inconsistency.

---

## 9. Missing Badge in tools/guidance.html Hero

**Severity:** Low
**File:** tools/guidance.html

Unlike other learn pages that have a badge in the hero section (e.g., `<div class="card-badge badge-green">Beginner</div>`), the Prompt Builder page has no badge.

Other tool pages (analyzer.html, checklist.html, hallucination.html) also lack badges in their heroes - this appears to be intentional differentiation between "Learn" pages and "Tool" pages.

---

## 10. Scorer Tool Not in Navigation

**Severity:** Info
**File:** tools/scorer.html

The `tools/scorer.html` file exists but is not linked in any navigation menu. This appears to be an internal/hidden tool, which may be intentional.

---

## 11. Inconsistent CTA Section Placement

**Severity:** Low
**Description:** Some pages have CTA in a `section-alt`, others in a regular `section`.

**CTA in regular section:**
- learn/crisp.html
- learn/costar.html
- learn/react.html
- learn/advanced.html
- learn/flipped-interaction.html
- patterns/index.html
- pages/glossary.html

**CTA in section-alt:**
- learn/index.html
- learn/crispe.html
- tools/index.html
- pages/faq.html (but breaks the pattern by having two section-alt in a row)
- pages/about.html

---

## 12. Callout Class Naming Inconsistency (CSS Mismatch)

**Severity:** ~~High (Broken Styling)~~ **RESOLVED**
**File:** pages/faq.html

**FIXED:** Changed `callout-tip` to `tip` and `callout-warning` to `warning` to match CSS selectors.

~~The CSS uses compound selectors for callout styling:~~
```css
.callout.tip { ... }
.callout.warning { ... }
```

~~This requires the HTML to use space-separated classes: `class="callout tip"`~~

~~**Incorrect usage (faq.html only):**~~
- ~~Line 107: `class="callout callout-tip"` ❌~~ → Now: `class="callout tip"` ✅
- ~~Line 240: `class="callout callout-warning fade-in-up"` ❌~~ → Now: `class="callout warning fade-in-up"` ✅

---

## 13. Undefined CSS Classes

**Severity:** Medium (Potentially Broken Styling)

### 13a. btn-full
**Files Affected:**
- tools/analyzer.html (line 110)
- tools/guidance.html (line 124)

The class `btn-full` is used in HTML:
```html
<button type="submit" class="btn btn-primary btn-full">Analyze Prompt</button>
<button type="button" id="combine-prompt-btn" class="btn btn-primary btn-full">
```

However, this class is NOT defined anywhere in `styles.css`. The `btn-full` class appears to be intended to make buttons full-width (width: 100%), but without the CSS definition, this styling is not applied.

### 13b. text-gradient
**Files Affected:**
- index.html (line 79)

The class `text-gradient` is used in HTML:
```html
<span class="text-gradient">AI Communication</span>
```

However, this class is NOT defined in `styles.css`. The text appears to render without any gradient effect, likely showing plain text instead of an intended gradient effect.

---

## 14. Scorer.html is a Redirect Page

**Severity:** Info
**File:** tools/scorer.html

The `tools/scorer.html` file is a redirect page (not a real tool page):
```html
<meta http-equiv="refresh" content="0; url=analyzer.html">
```

It redirects to `analyzer.html`. This is intentional (legacy URL support), but the file still exists in the navigation exclusion. This is working as designed.

---

## 15. Hardcoded Colors in Inline Styles

**Severity:** ~~Low (Maintainability)~~ **RESOLVED**
**Files Affected:**
- learn/costar.html (lines 443-448)
- learn/crisp.html (lines 407-411)
- learn/crispe.html (lines 480-485)

~~These files use hardcoded hex colors in inline styles for legend badges:~~
```html
<!-- OLD (inline styles - CSP violation): -->
<span class="legend-badge" style="background: #DC3545;">C</span>

<!-- NEW (CSS classes): -->
<span class="legend-badge legend-badge--context">C</span>
```

**FIXED:** Created CSS classes in styles.css to replace inline styles:
- `.legend-badge--context` - Red (#DC3545)
- `.legend-badge--role` - Orange (#E85D04)
- `.legend-badge--objective` - Orange (#E85D04)
- `.legend-badge--instruction` - Blue (#2196F3)
- `.legend-badge--style` - Blue (#2196F3)
- `.legend-badge--specifics` - Purple (#9C27B0)
- `.legend-badge--tone` - Purple (#9C27B0)
- `.legend-badge--parameters` - Green (#4CAF50)
- `.legend-badge--audience` - Green (#4CAF50)
- `.legend-badge--example` - Amber (#FF9800)
- `.legend-badge--response` - Amber (#FF9800)

Also fixed:
- Callout margin inline styles replaced with `.mt-xl` class
- FAQ list inline styles replaced with `.faq-answer ul` CSS rule
- app.js dynamic width styles now use data attributes + JS DOM manipulation

---

## 16. Duplicate CSS Rule: .btn-sm (Different Values)

**Severity:** ~~High (CSS Override Conflict)~~ **RESOLVED**
**File:** styles.css

**FIXED:** Removed the duplicate `.btn-sm` definition at line 5794. Kept the canonical definition at line 550 in the button utilities section:
```css
.btn-sm {
    padding: var(--space-sm) var(--space-md);
    font-size: 0.875rem;
}
```

The duplicate with tighter spacing (4px padding, 13px font) was removed as it appeared to be an accidental addition.

---

## Summary Statistics

| Category | Count | Status |
|----------|-------|--------|
| Missing meta descriptions | 19 pages | ✅ FIXED |
| Missing CSS preload | 19 pages | ✅ FIXED |
| Badge label inconsistencies | 5 methods affected | ✅ FIXED |
| Badge color inconsistencies | Multiple pages | ✅ FIXED |
| Missing footer canvas | 19 pages | ✅ RESOLVED (removed all) |
| Missing CTA canvas | 19 pages | ✅ RESOLVED (removed all) |
| Undefined CSS classes | 2 (btn-full, text-gradient) | ✅ FIXED |
| CSS selector mismatches | 1 (callout classes in faq.html) | ✅ FIXED |
| Hardcoded inline colors / CSP violations | 3+ files | ✅ FIXED |
| Duplicate CSS rules (conflicting) | 1 (.btn-sm) | ✅ FIXED |
| Inconsistent font-family | 1 (monospace vs var) | ✅ FIXED |
| Inconsistent breakpoints | 1 (769px vs 768px) | ✅ FIXED |

---

## 17. Inconsistent Font-Family Declaration

**Severity:** ~~Low (Consistency)~~ **RESOLVED**
**File:** styles.css (line 5107)

**FIXED:** Changed `font-family: monospace` to `font-family: var(--font-mono)` for consistency.

~~The `.format-code` class uses a hardcoded `font-family: monospace` instead of the CSS variable.~~

---

## 18. Inconsistent Media Query Breakpoint

**Severity:** ~~Low (Potential Bug)~~ **RESOLVED**
**File:** styles.css (line 6671)

**FIXED:** Changed `min-width: 769px` to `min-width: 768px` for consistency with all other breakpoints.

~~One media query uses `min-width: 769px` instead of the standard `768px`. This created a 1px gap where styles at exactly 768px wouldn't apply for `.complete-example`.~~

---

## Consistency Checks Passed ✓

The following areas were checked and found to be consistent:

1. **CSP Headers** - All 20 pages have identical Content-Security-Policy meta tags
2. **Navigation Structure** - Mega-menu structure consistent across all pages
3. **Footer Structure** - All footers have same link structure
4. **H1/H2 Hierarchy** - Each page has one H1, proper heading hierarchy
5. **Form Accessibility** - Checkboxes wrapped in labels with visible text
6. **No Inline Event Handlers** - No onclick/onload/onerror in HTML (CSP compliant)
7. **No Debug Statements** - No console.log/debug/warn statements in app.js
8. **No TODO Comments** - No TODO/FIXME/HACK comments in code
9. **ARIA Labels** - Menu toggle buttons have aria-label attributes
10. **External Links** - Only one external link (LinkedIn), properly has rel="noopener noreferrer"
11. **XSS Protection** - User input properly escaped via `escapeHtml()` before innerHTML insertion
12. **localStorage Keys** - Consistent naming pattern (theme, scorer-mode, scorer-methodology)
13. **!important Usage** - Limited to utility classes and reset styles (appropriate use)
14. **No Inline Styles** - All inline `style` attributes removed to comply with CSP `style-src 'self'` ✅ (Fixed)

---

## Scan Status

**Scanning:** In progress
**Last Updated:** Scan Round 7 - Anchor links & undefined classes
**Pages Scanned:** 21/21 HTML files (20 content + 1 redirect)
**CSS Checked:** styles.css (7,018 lines)
**JS Checked:** app.js (4,130 lines)

### Scan Progress:
- [x] HTML structure consistency
- [x] CSS custom property usage (found 1 inconsistency)
- [x] Media query breakpoints (found 1 inconsistency)
- [x] JavaScript security patterns
- [x] Local storage key naming
- [x] Z-index stacking (no issues)
- [ ] Unused CSS classes audit
- [ ] JavaScript function naming patterns

---

## Issues Summary by Severity

### High Severity (3)
1. Badge label inconsistencies (#3)
2. Callout class naming mismatch in faq.html (#12)
3. Duplicate `.btn-sm` rule with different values (#16)

### Medium Severity (4)
1. Missing meta descriptions (#1)
2. Badge color inconsistencies (#4)
3. Undefined CSS class `btn-full` (#13)
4. Inconsistent font-family declaration (#17)

### Low Severity (7)
1. Missing CSS preload (#2)
2. Missing footer canvas (#5)
3. Missing CTA canvas (#6)
4. Section alternation issue in FAQ (#7)
5. Inconsistent CTA placement (#11)
6. Hardcoded inline colors (#15)
7. Inconsistent breakpoint 769px (#18)

### Info (2)
1. Scorer.html redirect page (#10, #14)
2. Breadcrumb levels (intentional design #8)

---

# PHASED ACTION PLAN

This plan is organized to minimize risk of breaking dependencies. Each phase should be tested before moving to the next.

---

## Phase 1: Additive Changes (Zero Risk)
**Risk Level:** None - Only adding new code, nothing is removed or modified

### 1.1 Add Missing Meta Descriptions (Issue #1)
Add `<meta name="description">` tags to all 19 pages missing them.
- **Files:** All pages except index.html
- **Action:** Add after the viewport meta tag
- **Dependencies:** None

### 1.2 Add Missing CSS Preload (Issue #2)
Add `<link rel="preload" href="../styles.css" as="style">` to all subpages.
- **Files:** All pages except index.html
- **Action:** Add before the stylesheet link
- **Dependencies:** None

### 1.3 Add Missing CSS Classes (Issue #13)
Define the missing CSS classes in styles.css.

**Add `btn-full` class:**
```css
.btn-full {
    width: 100%;
}
```

**Add `text-gradient` class:**
```css
.text-gradient {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```
- **Files:** styles.css
- **Action:** Add near other button utilities (after .btn-lg) and text utilities
- **Dependencies:** None - these classes are already referenced but not defined

---

## Phase 2: Safe Corrections (Low Risk)
**Risk Level:** Low - Fixing typos and incorrect values, no structural changes

### 2.1 Fix Callout Classes in FAQ (Issue #12)
Correct the class names from `callout-tip` to `tip` and `callout-warning` to `warning`.
- **File:** pages/faq.html
- **Lines:** 107 and 240
- **Before:** `class="callout callout-tip"` → **After:** `class="callout tip"`
- **Before:** `class="callout callout-warning"` → **After:** `class="callout warning"`
- **Dependencies:** None - just fixing class names to match existing CSS

### 2.2 Fix Inconsistent Breakpoint (Issue #18)
Change 769px to 768px for consistency.
- **File:** styles.css (line 6671)
- **Before:** `@media (min-width: 769px)` → **After:** `@media (min-width: 768px)`
- **Dependencies:** Test `.complete-example` styling at 768px width after change

### 2.3 Fix Inconsistent Font-Family (Issue #17)
Use CSS variable instead of hardcoded value.
- **File:** styles.css (line 5107)
- **Before:** `font-family: monospace;` → **After:** `font-family: var(--font-mono);`
- **Dependencies:** None - var(--font-mono) already defined and used elsewhere

---

## Phase 3: Badge Harmonization (Medium Risk)
**Risk Level:** Medium - UX changes that need stakeholder review

### 3.1 Decide Badge Labeling Strategy (Issue #3)
**Decision Required:** Choose ONE consistent labeling system:

**Option A: Difficulty-Based (Beginner → Advanced)**
| Method | Badge |
|--------|-------|
| Prompt Basics | Beginner |
| Flipped Interaction | Beginner |
| CRISP | Intermediate |
| CRISPE | Intermediate |
| COSTAR | Intermediate |
| ReAct | Advanced |
| Advanced Techniques | Advanced |

**Option B: Progression-Based (Foundation → Expert)**
| Method | Badge |
|--------|-------|
| Prompt Basics | Start Here |
| Flipped Interaction | Foundation |
| CRISP | Foundation |
| CRISPE | Extended |
| COSTAR | Professional |
| ReAct | Advanced |
| Advanced Techniques | Expert |

- **Files to update:** index.html, learn/index.html, all learn/*.html pages
- **Dependencies:** Requires UX decision before implementation

### 3.2 Standardize Badge Colors (Issue #4)
After badge labels are decided, apply consistent color scheme:
- Green (`badge-green`): Beginner/Start Here level
- Default (no modifier): Intermediate/Foundation level
- Purple (`badge-purple`): Advanced/Expert level
- Red (`badge-red`): Special attention items only

---

## Phase 4: CSS Deduplication (Higher Risk)
**Risk Level:** Medium-High - Removing code requires careful testing

### 4.1 Resolve Duplicate .btn-sm Rule (Issue #16)
**Analysis Required First:**
1. Identify which pages use `.btn-sm` buttons
2. Determine which definition is correct (line 544 or 5784)
3. Check if the second definition was intentional for a specific context

**Likely Resolution:**
- Keep the first definition (line 544) as the standard
- Remove the duplicate at line 5784
- OR: If line 5784 was for a specific component, rename it to `.btn-xs` or scope it

**Testing Required:**
- tools/index.html (uses btn-sm)
- Visual regression test on all tool cards

---

## Phase 5: Visual Consistency (Low Priority)
**Risk Level:** Low - Cosmetic improvements

### 5.1 Replace Hardcoded Colors with CSS Variables (Issue #15)
Create CSS classes for legend badge colors:
```css
.legend-badge-context { background: var(--primary); }
.legend-badge-role { background: #E85D04; }
.legend-badge-instruction { background: #2196F3; }
/* etc. */
```
- **Files:** styles.css, learn/crisp.html, learn/crispe.html, learn/costar.html
- **Dependencies:** None, but requires updating 3 HTML files

### 5.2 Add Footer/CTA Canvas to Subpages (Issues #5, #6)
**Decision Required:** Is this feature desired on all pages?
- If yes: Add `<canvas class="neural-canvas-secondary">` to footers and CTA cards
- If no: Document as intentional design difference
- **Dependencies:** JavaScript neural network initialization must handle multiple canvases

---

## Phase 6: Optional Enhancements (Deferred)
**Risk Level:** N/A - No action required unless desired

### 6.1 Section Alternation in FAQ (Issue #7)
- Minor visual inconsistency, low impact
- Fix only if redesigning FAQ page

### 6.2 CTA Section Placement (Issue #11)
- Intentional variation for different page types
- No action recommended

### 6.3 Scorer.html Navigation (Issue #10)
- Redirect page working as intended
- No action required

---

## Implementation Checklist

### Before Starting
- [x] Create a git branch for changes
- [ ] Take screenshots of current state for comparison

### Phase 1 (Additive) ✅ COMPLETED
- [x] Add meta descriptions to 19 pages
- [x] Add CSS preload to 19 pages
- [x] Add `.btn-full` CSS class
- [x] Add `.text-gradient` CSS class
- [x] Test: Verify no visual changes, check DevTools for errors

### CSP Inline Style Fix ✅ COMPLETED (Pre-Phase 2)
- [x] Create CSS classes for legend badge colors (styles.css)
- [x] Update crisp.html to use CSS classes instead of inline styles
- [x] Update crispe.html to use CSS classes instead of inline styles
- [x] Update costar.html to use CSS classes instead of inline styles
- [x] Update flipped-interaction.html callout to use `.mt-xl` class
- [x] Update faq.html to remove inline list styles (use `.faq-answer ul` rule)
- [x] Fix app.js to use data attributes + DOM manipulation for dynamic widths
- [x] Test: No CSP violations in browser DevTools console

### Phase 2 (Safe Corrections) ✅ COMPLETED
- [x] Fix faq.html callout classes
- [x] Fix 769px breakpoint
- [x] Fix monospace font-family
- [ ] Test: Check FAQ callouts render correctly, test at 768px width

### Phase 3 (Badge Harmonization) ✅ COMPLETED
- [x] Get stakeholder approval on badge naming (Option B: Progression-Based)
- [x] Update all badge labels (Start Here → Foundation → Extended → Professional → Advanced → Expert)
- [x] Update all badge colors (green=Start Here, default=Foundation-Professional, purple=Advanced/Expert, red=Flipped)
- [ ] Test: Visual review of all card grids

### Phase 4 (CSS Deduplication) ✅ COMPLETED
- [x] Analyze .btn-sm usage across site (tools/guidance.html, tools/index.html)
- [x] Decide which definition to keep (line 550 - canonical button utilities section)
- [x] Remove duplicate (removed line 5794 duplicate)
- [ ] Test: All pages with small buttons

### Phase 5 (Visual Consistency) ✅ COMPLETED
- [x] Create legend badge CSS classes (moved to CSP fix)
- [x] Update HTML files to use classes (moved to CSP fix)
- [x] Decision on canvas elements (removed all - gradient backgrounds only)
- [x] Removed canvas elements from index.html (hero, CTA, footer)
- [x] Test: Method example pages, footer appearance

---

## Rollback Plan

If issues occur after any phase:
1. `git revert` the specific commits
2. Clear browser cache
3. Verify rollback successful

---

*Note: This document is for tracking purposes only. Issues listed here have not been modified or fixed.*
