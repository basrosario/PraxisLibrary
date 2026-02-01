# Praxis Site Enhancement Plan

**Created:** 2026-01-31
**Status:** Active
**Supersedes:** All previous plan files

---

## CRITICAL RULES - MUST FOLLOW

### Security & CSP Compliance (A+ Rating)

**CSP Policy (Never Violate):**
```
default-src 'none'; connect-src 'self'; form-action 'none';
base-uri 'none'; font-src 'self'; img-src 'self' data:;
style-src 'self'; script-src 'self';
```

| Rule | Requirement |
|------|-------------|
| **NO inline styles** | Never use `style=""` in HTML |
| **NO inline scripts** | Never use `onclick=""`, `onload=""`, or inline `<script>` |
| **NO external resources** | No CDNs, Google Fonts, or external APIs |
| **All styles in styles.css** | Single external stylesheet |
| **All scripts in app.js** | Single external script file with `defer` |

### Performance Standards (100% Score)

- Efficient, minimal code
- No render-blocking resources
- Clean, shallow DOM structure
- Remove all unused code
- Optimize all images

### Code Quality

- Clean, readable, self-documenting code
- DRY principle (Don't Repeat Yourself)
- BEM-style CSS naming (`.block__element--modifier`)
- Use CSS variables, no magic numbers

### Code Notation Standards

**HTML Structure:**
```html
<!-- =============================================
     SECTION NAME - Brief description
     ============================================= -->

<!-- Component Name -->
<div class="component">
    <!-- Sub-component description if complex -->
</div>

<!-- /SECTION NAME -->
```

**CSS Structure:**
```css
/* ==============================================
   SECTION NAME
   Description of what this section styles
   ============================================== */

/* Component Name
   -------------------------------------------- */
.component { }

/* Component - Modifier description */
.component--modifier { }

/* Component - State description */
.component.is-active { }
```

**JavaScript Structure:**
```javascript
// ==============================================
// SECTION NAME
// Description of functionality
// ==============================================

/**
 * Function description
 * @param {type} paramName - Parameter description
 * @returns {type} - Return description
 */
function functionName(paramName) { }

// --- Sub-section separator ---
```

**Required Notation:**
- Major sections: Block comment with `===` borders
- Sub-sections: Comment with `---` separator
- Complex logic: Inline comments explaining "why"
- Functions: JSDoc-style comments with params/returns
- CSS groups: Section headers with description
- HTML regions: Opening and closing comment markers

### Accessibility (WCAG AA)

- Meaningful alt text on all images
- Color contrast 4.5:1 minimum
- Full keyboard accessibility
- Proper heading hierarchy
- Skip links for main content

---

## Design Decisions (Locked In)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Accordion Default** | All closed | Clean initial view, user opens what they need |
| **Analyzer Scoring** | 5 elements = 100% | Natural language OR labeled prompts score equally if content detected |
| **Pattern Library** | Extensive NL terms | Large library of natural language patterns for each element |
| **Search Scope** | Learn + Tools | Results grouped by category (Learn, Tools, Glossary, etc.) |

---

## Implementation Order

| Phase | Name | Dependency | Effort | Risk |
|-------|------|------------|--------|------|
| **0** | **Fix Analyzer** | None | High | Medium |
| 1 | Badge Relocation & Text | None | Low | Low |
| 2 | Natural Language Content | Phase 0 | Medium | Low |
| 3 | Accordion Structure | None | High | Medium |
| 4 | Search Tags & Metadata | Phase 3 | Medium | Low |
| 5 | Search UI | Phase 3, 4 | High | Medium |
| 6 | Developer Tooling | Phase 4, 5 | Medium | Low |
| **7** | **Full Site Audit** | All Phases | Medium | Low |

---

## Phase 0: Fix Prompt Analyzer (CRITICAL)

**Goal:** Natural language prompts score the same as labeled prompts when content is detected

### Scoring Philosophy
```
5 elements detected = 100% (regardless of format)
4 elements detected = 80%
3 elements detected = 60%
2 elements detected = 40%
1 element detected = 20%
0 elements detected = 0%
```

### Example: Both Should Score ~100%

**Labeled Format:**
```
Role: Professional tenured real estate content writer
Context: Creating content for client website about commercial real estate
Instructions: Write blog posts for the site
Specifics: 10 posts, 500 words each, San Diego 2026, non-biased tone
Parameters: No unverifiable data, follow CA laws, cite sources, fact-check
```

**Natural Language Format:**
```
As a professional tenured real estate content writer, I need you to create
content for my client's commercial real estate website. Write 10 blog posts,
each 500 words, focused on San Diego for 2026. Keep a non-biased tone.
Make sure you don't include unverifiable data, follow California real estate
laws, cite your sources, and fact-check everything.
```

### 0.1 Build Natural Language Pattern Library

Each framework element needs extensive pattern detection:

#### CONTEXT Patterns
```javascript
const CONTEXT_PATTERNS = [
  // Explicit
  /context:/i,
  /background:/i,
  /situation:/i,

  // Natural language - purpose/goal
  /\b(i need|we need|i want|we want) (to|you to)\b/i,
  /\b(help (me|us) (with|to))\b/i,
  /\b(working on|dealing with|facing)\b/i,
  /\bfor (my|our|a|the) (client|project|company|team|business)\b/i,

  // Natural language - domain/field
  /\babout (the |a )?(topic|subject|area|field|industry) of\b/i,
  /\bin (the )?(field|area|domain|industry|sector) of\b/i,
  /\b(commercial|residential|enterprise|startup|small business)\b/i,

  // Natural language - temporal
  /\bfor (20\d{2}|this year|next year|Q[1-4])\b/i,
  /\b(current|upcoming|recent) (project|initiative|campaign)\b/i
];
```

#### ROLE Patterns
```javascript
const ROLE_PATTERNS = [
  // Explicit
  /role:/i,
  /persona:/i,

  // Natural language - identity
  /\b(as a|as an|you are a|you are an|act as|acting as)\b/i,
  /\b(be a|be an|become a|become an)\b/i,
  /\b(expert|specialist|professional|consultant|advisor)\b/i,

  // Natural language - profession titles
  /\b(writer|developer|analyst|manager|engineer|designer)\b/i,
  /\b(doctor|lawyer|teacher|accountant|marketer)\b/i,
  /\b(tenured|senior|junior|lead|chief|head)\b/i,

  // Natural language - expertise level
  /\b(experienced|seasoned|skilled|qualified|certified)\b/i,
  /\bwith (\d+|\w+) years (of )?(experience|expertise)\b/i
];
```

#### INSTRUCTIONS Patterns
```javascript
const INSTRUCTION_PATTERNS = [
  // Explicit
  /instructions?:/i,
  /task:/i,
  /objective:/i,

  // Natural language - imperatives
  /\b(write|create|generate|produce|develop|build|make)\b/i,
  /\b(analyze|review|evaluate|assess|examine|audit)\b/i,
  /\b(explain|describe|summarize|outline|list)\b/i,
  /\b(help|assist|guide|advise|recommend)\b/i,

  // Natural language - requests
  /\b(i need you to|please|could you|would you|can you)\b/i,
  /\b(i('d| would) like (you to)?)\b/i
];
```

#### SPECIFICS Patterns
```javascript
const SPECIFICS_PATTERNS = [
  // Explicit
  /specifics?:/i,
  /details?:/i,
  /requirements?:/i,

  // Natural language - quantities
  /\b(\d+) (words?|pages?|paragraphs?|sentences?|items?|posts?)\b/i,
  /\b(each|every|per) (\d+|\w+)\b/i,

  // Natural language - qualities
  /\b(tone|style|voice|format|structure)\b/i,
  /\b(formal|informal|casual|professional|friendly)\b/i,
  /\b(non-bias(ed)?|objective|neutral|balanced)\b/i,

  // Natural language - targeting
  /\b(focused on|targeting|aimed at|for|about)\b/i,
  /\b(audience|readers|users|customers|clients)\b/i,

  // Natural language - location/scope
  /\b(San Diego|California|CA|USA|global|local|regional)\b/i,
  /\b(city|state|country|region|area|market)\b/i
];
```

#### PARAMETERS Patterns
```javascript
const PARAMETERS_PATTERNS = [
  // Explicit
  /parameters?:/i,
  /constraints?:/i,
  /rules?:/i,
  /guidelines?:/i,

  // Natural language - prohibitions
  /\b(don'?t|do not|never|avoid|exclude|no)\b/i,
  /\b(without|unless|except)\b/i,
  /\b(unverifiable|unconfirmed|speculative)\b/i,

  // Natural language - requirements
  /\b(must|should|need to|have to|required to)\b/i,
  /\b(make sure|ensure|verify|confirm|check)\b/i,
  /\b(always|every time|consistently)\b/i,

  // Natural language - compliance
  /\b(follow|comply|adhere|according to)\b/i,
  /\b(laws?|regulations?|rules?|guidelines?|standards?)\b/i,
  /\b(cite|reference|source|fact-?check)\b/i
];
```

### 0.2 Implement Detection Engine

```javascript
function analyzePrompt(promptText, framework) {
  const elements = getFrameworkElements(framework); // CRISP, COSTAR, etc.
  const results = {};

  elements.forEach(element => {
    const patterns = getPatterns(element);
    const matches = [];

    patterns.forEach(pattern => {
      const match = promptText.match(pattern);
      if (match) {
        matches.push({
          pattern: pattern.toString(),
          matched: match[0],
          index: match.index,
          confidence: getPatternConfidence(pattern)
        });
      }
    });

    results[element] = {
      detected: matches.length > 0,
      confidence: calculateConfidence(matches),
      matches: matches,
      suggestions: matches.length === 0 ? getSuggestions(element) : []
    };
  });

  return {
    elements: results,
    score: calculateScore(results),
    detectedCount: Object.values(results).filter(r => r.detected).length,
    totalElements: elements.length
  };
}

function calculateScore(results) {
  const detected = Object.values(results).filter(r => r.detected).length;
  const total = Object.keys(results).length;
  return Math.round((detected / total) * 100);
}
```

### 0.3 Update Feedback Display

- Show which phrases triggered each element detection
- Highlight detected elements in original prompt
- For missing elements, show specific suggestions with examples
- Display confidence level (high/medium/low) for each detection

### 0.4 Acceptance Criteria

- [ ] "Write me a blog post about cats" scores 0-20% (missing most elements)
- [ ] Real estate example (natural language) scores 100%
- [ ] Real estate example (labeled format) scores 100%
- [ ] User sees exactly which words triggered detections
- [ ] Missing elements show actionable suggestions

---

## Phase 1: Badge Relocation & Text Updates

**Goal:** Move badges from header to content areas; update branding

### 1.1 Badge Relocation
- [ ] Remove badges from header navigation bar
- [ ] Add badge row below "Choose Your Path" on Learn page
- [ ] Add badge row below section titles on other pages
- [ ] Maintain existing badge colors and responsive behavior

### 1.2 Text Updates
- [ ] Change "Built With Claude Code" → "AI Assisted Building"
- [ ] Update any other Claude Code references
- [ ] Review hero subtitle text

### 1.3 Navigation Responsiveness Fix
- [ ] Desktop nav badges should wrap to second line when window shrinks
- [ ] Prevent badge overflow/cutoff on medium-width screens
- [ ] Ensure smooth transition between single-line and two-line layouts

### 1.4 CRISPE Prompt Builder Fix
- [x] Remove "(optional)" from Example field in CRISPE framework
- [x] Make Example a required field like other CRISPE elements

### 1.5 Mobile Menu Fixes
- [ ] Fix mobile menu not collapsing when clicking items
- [ ] Fix submenu text color (currently black, should be visible)

### 1.6 Learning Content Readability
- [ ] Darken background behind learning content sections
- [ ] Improve contrast for white text on lighter areas
- [ ] Subtle adjustments only - maintain existing design aesthetic
- [ ] Focus on learn/*.html pages where thin white text is hard to read

### 1.7 Badge Lightbox Popups
- [ ] Create lightbox component with smoked glass background effect
- [ ] Trigger on badge hover (desktop) / tap (mobile)
- [ ] Add content for each badge:
  - **AI for Everybody**: Accessibility commitment, UD/UDL principles, free resources, safety focus
  - **Built With UD/UDL**: Universal Design explanation, multiple learning paths, inclusive design
  - **Security A+ 100%**: CSP compliance, no tracking, no external dependencies, data privacy
  - **Performance 100%**: Lighthouse scores, optimization techniques, fast load times
  - **AI Assisted Building**: Claude Code workflow, human-AI collaboration, methodology used
- [ ] Smooth fade-in/fade-out animation
- [ ] Keyboard accessible (focus/blur triggers)
- [ ] Mobile-friendly positioning
- [ ] Close on click outside or Escape key

### 1.8 UI Polish
- [ ] Add loading animation to analyzer
- [ ] Improve score visualization
- [ ] Add "Copy improved prompt" button
- [ ] Smooth scroll for anchor links

---

## Phase 2: Natural Language Content Updates

**Goal:** Update learning content to show natural language is equally valid

### 2.1 Update Learning Pages
- [ ] Add "Natural Language" examples to each framework page
- [ ] Show side-by-side: labeled vs natural language (both valid)
- [ ] Add "Both approaches work equally well" messaging

### 2.2 Update Prompt Builder
- [ ] Add toggle: "Labeled Format" vs "Natural Language"
- [ ] Generate prompts in selected format
- [ ] Show preview of both formats

---

## Phase 3: Accordion Content Structure

**Goal:** Convert long-form content to collapsible accordions

### Design Decisions
- **Default state:** All accordions CLOSED
- **Behavior:** Click to open, click again to close
- **Deep links:** URL hash opens specific accordion
- **Keyboard:** Enter/Space to toggle

### 3.1 Create Accordion Component
```css
/* All closed by default */
details.accordion {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: var(--space-sm);
}

details.accordion summary {
  padding: var(--space-md);
  cursor: pointer;
  font-weight: 600;
}

details.accordion[open] summary {
  border-bottom: 1px solid var(--border);
}

details.accordion .accordion-content {
  padding: var(--space-md);
}
```

### 3.2 Pages to Convert
- [ ] learn/crisp.html - C, R, I, S, P sections
- [ ] learn/crispe.html - C, R, I, S, P, E sections
- [ ] learn/costar.html - C, O, S, T, A, R sections
- [ ] learn/advanced.html - Each technique
- [ ] learn/flipped-interaction.html - "Why It Works", "How To Trigger It"
- [ ] pages/glossary.html - Terms grouped by letter
- [ ] pages/faq.html - Already has accordions (verify consistency)
- [ ] patterns/index.html - Pattern categories

### 3.3 Deep Link Support
```javascript
// Open accordion if URL has hash
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target && target.closest('details')) {
      target.closest('details').open = true;
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
```

---

## Phase 4: Search Tags & Metadata

**Goal:** Create searchable index for all content

### Categories for Search Results
- **Learn** - Framework pages, techniques, concepts
- **Tools** - Analyzer, Prompt Builder, Checklist, etc.
- **Glossary** - AI terminology definitions
- **Patterns** - Reusable prompt templates
- **FAQ** - Common questions and answers

### 4.1 Search Index Schema
```javascript
const searchIndex = [
  {
    id: "crisp-context",
    title: "Context (CRISP)",
    category: "Learn",
    subcategory: "CRISP Framework",
    keywords: ["context", "background", "situation", "setting", "scenario"],
    excerpt: "Context provides the background information the AI needs...",
    url: "/learn/crisp.html#context"
  },
  {
    id: "analyzer-tool",
    title: "Prompt Analyzer",
    category: "Tools",
    subcategory: "Analysis",
    keywords: ["analyzer", "score", "evaluate", "check", "test", "prompt"],
    excerpt: "Analyze your prompts against CRISP, COSTAR, and CRISPE frameworks...",
    url: "/tools/analyzer.html"
  }
  // ... more entries
];
```

### 4.2 Index Coverage
- [ ] All glossary terms (~50 entries)
- [ ] All learning page sections (~40 entries)
- [ ] All tools (~5 entries)
- [ ] All patterns (~20 entries)
- [ ] All FAQ questions (~30 entries)
- **Total target: 150+ searchable entries**

---

## Phase 5: Search UI Implementation

**Goal:** Build client-side search with category grouping

### 5.1 Search Modal
- Trigger: Cmd+K / Ctrl+K or click search icon
- Input with placeholder "Search Praxis..."
- Close: Escape, click outside, or X button
- Focus trap for accessibility

### 5.2 Results Display
```
┌─────────────────────────────────┐
│ 🔍 Search Praxis...         [X] │
├─────────────────────────────────┤
│                                 │
│ Learn (3 results)           [▼] │
│ ├─ Context (CRISP)              │
│ ├─ Context (COSTAR)             │
│ └─ Setting Context...           │
│                                 │
│ Tools (1 result)            [▼] │
│ └─ Prompt Analyzer              │
│                                 │
│ Glossary (2 results)        [▼] │
│ ├─ Context Window               │
│ └─ Contextual Learning          │
│                                 │
└─────────────────────────────────┘
```

### 5.3 Features
- Fuzzy matching (typo tolerance)
- Keyboard navigation (arrows, Enter)
- Highlighted matches in excerpts
- Category collapse/expand
- Recent searches cached

---

## Phase 6: Developer Tooling

**Goal:** Scripts to maintain site quality

### 6.1 Search Index Validator
- Check all URLs in search index exist
- Report stale entries (content changed)
- Report coverage percentage

### 6.2 Link Checker
- Verify all internal links
- Check anchor links resolve
- Report 404s

### 6.3 Accessibility Check
- Color contrast validation
- ARIA attribute verification
- Keyboard navigation testing

---

## Phase 7: Full Site Audit (Post-Implementation)

**Goal:** Comprehensive audit after all phases complete

### 7.1 Security Audit
- [ ] CSP headers properly configured
- [ ] No inline styles violating CSP
- [ ] No inline scripts violating CSP
- [ ] XSS prevention (escapeHtml usage)
- [ ] No external dependencies loaded
- [ ] localStorage data validated
- [ ] Form inputs sanitized

### 7.2 Structure Audit
- [ ] All pages follow consistent layout
- [ ] Navigation consistent across all pages
- [ ] Footer links all working
- [ ] Breadcrumbs accurate
- [ ] Mobile responsive on all pages
- [ ] Print styles working

### 7.3 Necessity Audit
- [ ] Remove unused CSS classes
- [ ] Remove unused JavaScript functions
- [ ] Remove commented-out code
- [ ] Remove debug console.log statements
- [ ] Remove unnecessary files
- [ ] Consolidate duplicate styles

### 7.4 Performance Audit
- [ ] Lighthouse performance score >90
- [ ] First Contentful Paint <1.5s
- [ ] Time to Interactive <3s
- [ ] No render-blocking resources
- [ ] Images optimized
- [ ] CSS/JS minified (if applicable)

### 7.5 Accessibility Audit
- [ ] Lighthouse accessibility score >95
- [ ] All images have alt text
- [ ] Color contrast WCAG AA compliant
- [ ] Keyboard navigation works everywhere
- [ ] Screen reader tested
- [ ] Focus indicators visible

### 7.6 Content Audit
- [ ] No broken internal links
- [ ] No broken external links
- [ ] No broken anchor links
- [ ] All examples tested and working
- [ ] Spelling/grammar check
- [ ] Consistent terminology

### 7.7 Cleanup Checklist
- [ ] Delete old/superseded plan files
- [ ] Archive completed todo items
- [ ] Update README if needed
- [ ] Document any new patterns/conventions
- [ ] Create maintenance guide

---

## File Locations Reference

| Component | File | Lines (approx) |
|-----------|------|----------------|
| Analyzer Logic | app.js | 2626-2872 |
| Analyzer UI | tools/analyzer.html | - |
| Pattern Library | app.js (new) | TBD |
| Accordion CSS | styles.css (new) | TBD |
| Search Index | search-index.js (new) | TBD |
| Search Modal | app.js (new) | TBD |

---

## Success Metrics

| Metric | Current | Target | Phase |
|--------|---------|--------|-------|
| Analyzer: NL prompt accuracy | ~40% | 100% | 0 |
| Analyzer: Labeled prompt accuracy | ~80% | 100% | 0 |
| Pages with accordions | 1 | 8+ | 3 |
| Search index entries | 0 | 150+ | 4 |
| Search response time | N/A | <100ms | 5 |
| Lighthouse Performance | TBD | >90 | 7 |
| Lighthouse Accessibility | TBD | >95 | 7 |
| Broken links | TBD | 0 | 7 |

---

## Execution Checklist

### Ready to Start
- [x] Design decisions locked in
- [x] Plan documented
- [ ] Git branch created

### Phase 0
- [x] Pattern library built (extensive NL patterns for all 5 CRISP elements + COSTAR + CRISPE)
- [x] Detection engine updated (same detection logic, better patterns)
- [x] Scoring algorithm updated (simplified: detected/total = score, 5=100%)
- [x] Feedback display updated (removed sentence quality/intent clarity sub-scores)
- [x] Manual verification passing (NL real estate example = 100%, simple prompt = 20%)

### Phase 1
- [ ] Badges relocated
- [ ] Text updated
- [ ] UI polished

### Phase 2
- [ ] Learning pages updated
- [ ] Prompt builder updated

### Phase 3
- [ ] Accordion component created
- [ ] All pages converted
- [ ] Deep links working

### Phase 4
- [ ] Search index schema finalized
- [ ] All content tagged
- [ ] Index file generated

### Phase 5
- [ ] Search modal built
- [ ] Fuzzy matching working
- [ ] Category grouping working

### Phase 6
- [ ] Validator scripts created
- [ ] Link checker working

### Phase 7
- [ ] Security audit complete
- [ ] Structure audit complete
- [ ] Necessity audit complete
- [ ] Performance audit complete
- [ ] Accessibility audit complete
- [ ] Content audit complete
- [ ] Cleanup complete

---

*This is the single source of truth for the Praxis enhancement project.*
