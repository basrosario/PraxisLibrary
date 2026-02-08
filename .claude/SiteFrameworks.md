# Praxis Library - Site Frameworks Document

**The Soul of the Project**

This document explains not just what Praxis does, but WHY every architectural decision was made. Read this before making any changes. It is the single reference for understanding the reasoning, flow, and intention behind the entire site.

---

## Table of Contents

1. [Project Identity](#project-identity)
2. [Architecture Philosophy](#architecture-philosophy)
3. [The Single-File Principle](#the-single-file-principle)
4. [Security Model (CSP A+)](#security-model-csp-a)
5. [The Lazy Loading Strategy](#the-lazy-loading-strategy)
6. [The Glossary System](#the-glossary-system)
7. [The Search System](#the-search-system)
8. [The Search-to-Glossary Flow](#the-search-to-glossary-flow)
9. [URL Resolution — The Depth Problem](#url-resolution--the-depth-problem)
10. [The Anchor Offset Pattern](#the-anchor-offset-pattern)
11. [The Design Token System](#the-design-token-system)
12. [The Component Library](#the-component-library)
13. [The 13-Section Framework Template](#the-13-section-framework-template)
14. [Navigation Architecture](#navigation-architecture)
15. [The Neural Network Canvas System](#the-neural-network-canvas-system)
16. [Accessibility Architecture (ADL)](#accessibility-architecture-adl)
17. [Performance Optimization Patterns](#performance-optimization-patterns)
18. [Framework Categories and Inventory](#framework-categories-and-inventory)
19. [File Structure](#file-structure)
20. [Critical Rules — Never Violate](#critical-rules--never-violate)

---

## Project Identity

**Praxis** is an open, free, educational platform for AI literacy and prompt engineering. It exists to make AI communication theory accessible to everyone — not just developers or researchers. The site teaches 62+ prompt engineering frameworks, provides 2,141+ glossary terms, offers 12 interactive tools, and serves neurodivergent learners with dedicated resources.

The name "Praxis" means the practical application of theory. The site embodies this: every framework page teaches not just what a technique is, but how and when to use it.

**Core values encoded in the architecture:**
- **Accessibility first** — WCAG AA compliance, dedicated accessibility dashboard, neurodivergent-friendly design
- **Zero barriers** — No accounts, no paywalls, no tracking, no external dependencies
- **Security by default** — A+ Content Security Policy rating; nothing can be injected
- **Performance as respect** — Fast load times respect users' time and bandwidth
- **Self-contained** — The site works entirely from its own files; no CDN goes down, no API changes

---

## Architecture Philosophy

Praxis is built on a principle that seems counterintuitive in 2026: **zero dependencies**.

No React. No Tailwind. No Bootstrap. No jQuery. No build tools. No npm. No webpack. No CDNs. No Google Fonts. No external APIs.

This is not minimalism for its own sake. Each omission serves a specific purpose:

| What's Missing | Why It's Missing |
|----------------|------------------|
| JS frameworks | CSP compliance — frameworks inject inline scripts and event handlers |
| CSS frameworks | Bloat — Bootstrap ships 230KB of CSS; Praxis uses only what it needs |
| CDNs | Security — external resources are attack vectors and single points of failure |
| Google Fonts | Privacy + performance — system fonts render instantly, load nothing |
| Build tools | Simplicity — what you edit is what ships; no compilation, no sourcemaps |
| Package managers | Stability — no `node_modules`, no dependency hell, no supply chain risk |

**The result:** The entire site is three files (HTML + one CSS + one JS) per page. Any contributor can open any file, read it, and understand it without learning a build system.

---

## The Single-File Principle

All CSS lives in one file: `styles.css` (27,562 lines).
All JavaScript lives in one file: `app.js` (10,899 lines).

**Why not split them?**

1. **CSP compliance** — The Content-Security-Policy header says `style-src 'self'; script-src 'self'`. One stylesheet, one script. No ambiguity, no whitelist maintenance.

2. **HTTP efficiency** — After the first page load, the CSS and JS are cached. Every subsequent page load fetches only the HTML. With split files, each page might need different CSS/JS bundles, defeating the cache.

3. **Maintainability** — Every component's styles are in one searchable file. There's no "which CSS file handles accordions?" question. The answer is always `styles.css`.

4. **Deployment** — Upload three types of files. No build step. No CI/CD pipeline required. Works on any static host, any .htaccess configuration.

**How they stay organized:**

CSS uses section markers:
```css
/* === SECTION NAME === */
/* Component ---- */
```

JS uses section markers:
```javascript
// === SECTION NAME ===
/** JSDoc comments for functions */
```

HTML uses section markers:
```html
<!-- === SECTION NAME === -->
<!-- /SECTION NAME -->
```

---

## Security Model (CSP A+)

The site maintains an A+ Content Security Policy rating. This is not aspirational — it is a hard constraint that governs every line of code.

**The policy:**
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

**What this means in practice:**

| Rule | What It Prevents | How We Comply |
|------|------------------|---------------|
| No inline styles | XSS via `style=""` injection | All styles in `styles.css` |
| No inline scripts | XSS via `onclick=""`, `onload=""`, inline `<script>` | All JS in `app.js` with `defer` |
| No external resources | Supply chain attacks, privacy leaks | All assets local |
| No `eval()` | Code injection | Never used anywhere |
| No inline event handlers | XSS escalation | All events attached via `addEventListener` in app.js |

**Why this matters:** If an attacker compromises any input that renders on the page, CSP prevents execution. The policy is the last line of defense, and it only works if it has zero exceptions.

**How the code enforces it:**

- `escapeHtml()` function at the top of app.js — uses DOM API (`createElement` + `textContent`) to escape strings before display
- Glossary terms rendered via `document.createElement()` / `appendChild()` — never `innerHTML` with user-sourced data
- Search result highlights use `<mark>` tags injected after `escapeHtml()` processing
- Neural network term links built via DOM API, not string concatenation

---

## The Lazy Loading Strategy

Praxis uses lazy loading for two specific data sources. Understanding WHY is critical.

### What's Lazy Loaded

| Data | File | Size | Entries | When Loaded |
|------|------|------|---------|-------------|
| Glossary terms | `data/glossary.json` | ~818 KB | 2,141 terms | When glossary page loads |
| Search index | `data/search-index.json` | ~350 KB | 2,218 entries | When search modal first opens |

### What's NOT Lazy Loaded

The HTML, CSS, and JS load normally. Framework pages are static HTML — no lazy loading needed. The mega-menu is hardcoded HTML in every page.

### Why Lazy Load the Glossary

The glossary had 2,141 terms. In Session 29, these terms were migrated from inline HTML to JSON. Before migration, `pages/glossary.html` was **19,883 lines** of HTML. After: **686 lines** (empty letter shells).

**The problem with 19,883 lines of HTML:**
- Slow initial parse — browser must build a massive DOM before first paint
- No filtering capability — HTML terms can't be dynamically shown/hidden by category without JS reading all 19,883 lines
- Maintenance nightmare — adding one term means editing a 19K-line file

**The solution:**
- HTML ships with 26 empty containers (`<div class="glossary-section" id="letter-a">...</div>`)
- JavaScript fetches `glossary.json` on page load
- Each term is built using the DOM API and inserted into its letter container
- CSS `content-visibility: auto` means the browser only paints visible letter sections

**Why not use innerHTML?** Two reasons:
1. CSP compliance — `innerHTML` can execute injected scripts in some contexts
2. Safety — DOM API (`createElement`, `textContent`, `appendChild`) is immune to XSS by construction. The text content of a glossary term can never accidentally become executable code.

### Why Lazy Load the Search Index

The search index was originally an inline JS array (281 entries, ~93KB) embedded in app.js. As the glossary expanded to 2,141 terms, the inline array would have bloated app.js by 350+ KB.

**The problem with an inline search index:**
- Every page loads 350KB of search data even if the user never searches
- app.js parse time increases on every page
- The search data duplicates glossary.json content

**The solution:**
- Search index lives in `data/search-index.json`
- Loaded ONLY when the user first opens the search modal (Cmd+K / Ctrl+K)
- Cached in memory after first load — subsequent searches are instant
- Global `window.PraxisSearch` object exposes: `search()`, `getByCategory()`, `getById()`, `loadIndex()`

**The loading state machine:**
```
searchIndexLoaded = false    →  fetch begins  →  searchIndexLoading = true
                                                         ↓
                                               fetch succeeds/fails
                                                         ↓
                                              searchIndexLoaded = true
                                              searchIndexLoading = false
```
If a second search triggers while the first fetch is in-flight, it polls every 50ms until the first load completes. No duplicate fetches.

---

## The Glossary System

### Architecture Overview

```
glossary.json (2,141 terms)
        ↓  fetched on page load
loadGlossaryFromJSON()
        ↓  forEach term
DOM API builds elements
        ↓  appendChild
26 letter containers (#letter-a through #letter-z)
        ↓  CSS
content-visibility: auto (lazy paint)
        ↓  user interaction
Filter/Sort system (category buttons + A-Z/Z-A toggle)
```

### JSON Schema

```json
{
  "metadata": {
    "version": "2.0",
    "lastUpdated": "2026-02-05",
    "totalTerms": 2141
  },
  "terms": [
    {
      "id": "term-zero-shot-cot",
      "term": "Zero-Shot Chain-of-Thought",
      "definition": "Adding 'Let's think step by step' to a prompt...",
      "tags": ["Prompting", "Reasoning"],
      "link": "optional/url/to/learn/page"
    }
  ]
}
```

**Key fields:**
- `id` — Becomes the DOM element's `id` attribute, used for anchor targeting from search results
- `term` — Display name, rendered as `<h3>` via `textContent` (XSS-safe)
- `definition` — Rendered as `<p>` via `textContent`
- `tags` — Array of category strings for filter matching
- `link` — Optional URL, rendered as a "Learn more" anchor

### The Rendering Pipeline (app.js:7495-7568)

1. **Detection:** `document.querySelector('.glossary-filter-bar')` — only runs on the glossary page
2. **Fetch:** `fetch(resolveInternalUrl('data/glossary.json'))` — path-resolved for any page depth
3. **Iteration:** For each of the 2,141 terms:
   - Extract first letter, find container `#letter-{x}`
   - Create `div.glossary-term` with `id` from JSON
   - Create `h3` with term name
   - Create `p` with definition
   - Optionally create `a.term-link` if `link` field exists
   - Optionally create `div.term-tags` with `span.term-tag` per tag
   - Append to container
4. **Count update:** Query all `.glossary-term` elements, update `#glossary-visible-count`
5. **Subtitle update:** Replace placeholder count in subtitle text

### Post-Load: Hash Scroll (app.js:7571-7585)

After terms load, the system checks `window.location.hash`. If the URL is `glossary.html#term-zero-shot-cot`, it:
1. Extracts `term-zero-shot-cot` from the hash
2. Finds the element via `document.getElementById()`
3. Calls `scrollIntoView({ behavior: 'smooth', block: 'start' })` inside `requestAnimationFrame`

**Why `requestAnimationFrame`?** The DOM may not have finished layout after appending 2,141 elements. RAF ensures the scroll happens after the browser's next paint, so the target position is correct.

**Why this matters:** When a user clicks a glossary term in search results, the browser navigates to `pages/glossary.html#term-xxx`. The page loads, JSON loads, terms render, then this code scrolls to the exact term. Without this post-load scroll, the anchor would fail because the target element didn't exist when the page first parsed the HTML (it only exists after JS creates it from JSON).

### The Filter System (app.js:7587-7756)

**Category mappings** map filter button values to arrays of tag strings:
```javascript
{
  'all': null,
  'fundamentals': ['Fundamentals', 'Core Concept', 'Concept', 'Field', ...],
  'architecture': ['Architecture', 'Neural Networks', 'Transformers', ...],
  'training': ['Training', 'Optimization', 'Process', ...],
  'prompting': ['Prompting', 'Technique', 'Reasoning', ...],
  'safety': ['Safety', 'Ethics', 'Alignment', ...],
  'products': ['Product', 'Company', 'LLM Provider', ...],
  'technical': ['Technical', 'API', 'NLP', ...]
}
```

**Filter logic:** For each term, check if any of its `.term-tag` text values appear in the selected filter's tag array. Show/hide via `.hidden` class (`display: none`).

**Sort logic:** A-Z or Z-A reorders the letter section containers in the DOM via `container.appendChild()`.

**Empty section handling:** If all terms in a letter section are hidden, the section itself gets `.hidden`.

---

## The Glossary Inline Search

### Purpose

A dedicated search bar embedded on the glossary page that searches ONLY glossary terms. This is separate from the site-wide Cmd+K search modal. It lives between the filter bar and the sticky A-Z navigation, and it floats with the user as they scroll (sticky positioning).

### Architecture Overview

```
User types in glossary search input
        |  150ms debounce
searchGlossaryTerms(query)
        |  queries all .glossary-term DOM elements
Score each term (name + acronym + definition)
        |  sort by score, then name length, then alpha
Render top 15 results in dropdown
        |  user clicks a result
selectResult(termId)
        |  disable content-visibility on all sections
        |  double-rAF for layout reflow
        |  getBoundingClientRect() for accurate position
        |  window.scrollTo with 220px offset
Term scrolls into view with highlight pulse
```

### Data Source

The search operates entirely against the rendered DOM, not the JSON file. After `loadGlossaryFromJSON()` creates all 2,141+ term elements, the search queries `document.querySelectorAll('.glossary-term')` and reads each element's `h3` (term name) and `p` (definition) via `textContent`. This means:

- No duplicate data fetching
- Search automatically reflects whatever terms are in the DOM
- Works with any future glossary expansions without code changes

### Scoring Algorithm (app.js: `searchGlossaryTerms`)

The scoring system uses 8 tiers with two helper functions:

**`extractAcronym(name)`** -- Extracts parenthetical text: "Large Language Model (LLM)" returns "llm"

**`normalizeForMatch(str)`** -- Collapses hyphens, underscores, and spaces: "LLM-as-Judge" becomes "llm as judge"

| Priority | Score | Match Type | Example |
|----------|-------|------------|---------|
| 1 | 200 | Exact full name match | "Temperature" matches "Temperature" |
| 2 | 190 | Exact acronym match | "LLM" matches "Large Language Model (LLM)" |
| 3 | 170 | Normalized exact match | "LLM As Judge" matches "LLM-as-Judge" |
| 4 | 150 | Name starts with query | "Chain" matches "Chain-of-Thought" |
| 5 | 120 | Acronym starts with query | "LL" matches "Large Language Model (LLM)" |
| 6 | 100 | Name contains query (whole word) | "Shot" matches "Zero-Shot Learning" |
| 7 | 80 | Name contains query (substring) | "trans" matches "Transformers" |
| 8 | 30 | Definition contains query | "multimodal" found in a term's definition text |

**Tiebreaker sort:** Score descending, then name length ascending (shorter = more precise match), then alphabetical.

Results are capped at 15 entries.

### The content-visibility Scroll Problem

**The problem:** Glossary sections use `content-visibility: auto` with `contain-intrinsic-size: auto 500px` for performance. When the browser hasn't rendered a section, it uses the 500px placeholder height instead of the real height (which varies per section). If the target term is in a distant section, all the unrendered sections between the viewport and the target have wrong heights, causing `getBoundingClientRect()` to return an inaccurate position.

**The solution (`selectResult`):**

1. Set `contentVisibility = 'visible'` on ALL 26 glossary sections (forces full layout)
2. Double `requestAnimationFrame` (first triggers reflow, second waits for paint)
3. Read `getBoundingClientRect()` -- now accurate because all sections have real heights
4. Calculate scroll position: `window.pageYOffset + rect.top - 220` (220px = header + search + A-Z nav)
5. `window.scrollTo({ top: targetY, behavior: 'smooth' })`
6. After 1.5s (scroll animation complete), restore `contentVisibility = ''` on all sections
7. Add `glossary-term--highlighted` class for 2.5s visual pulse

**Why not `scrollIntoView()`?** It delegates positioning to the browser, which still uses the placeholder heights internally. Manual calculation after forcing real layout is the only reliable approach with `content-visibility: auto`.

### Sticky Positioning

Both the search bar and A-Z nav use `position: sticky`:

| Element | `top` value | `z-index` | Purpose |
|---------|-------------|-----------|---------|
| `.glossary-nav` | `70px` | `100` | Below header, above search bar |
| `.glossary-search-container` | `128px` | `500` | Below header + A-Z nav |
| `.glossary-search-results` (dropdown) | auto (absolute) | `9000` | Above everything including header |

Both have `background: var(--bg-secondary)` so content doesn't show through when sticky.

### Scroll Offset

With three stacked sticky elements, glossary anchors use `scroll-margin-top: 220px`:

```
Header:     70px
A-Z nav:    ~58px
Search bar: ~56px
Breathing:  ~36px
Total:      220px
```

### HTML Structure (glossary.html)

```html
<!-- Between filter bar and A-Z nav -->
<div class="glossary-search-container fade-in-up">
    <div class="glossary-search-wrapper">
        <svg class="glossary-search-icon">...</svg>
        <input type="text" class="glossary-search-input" id="glossary-search-input"
               placeholder="Search 2145+ glossary terms..." autocomplete="off">
        <button class="glossary-search-clear hidden" id="glossary-search-clear">...</button>
    </div>
    <div class="glossary-search-results hidden" id="glossary-search-results" role="listbox">
    </div>
</div>
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Arrow Down | Move to next result |
| Arrow Up | Move to previous result |
| Enter | Select highlighted result (scroll to term) |
| Escape | Close dropdown, blur input |

### CSP Compliance

- All styles in `styles.css` (no inline)
- All event listeners attached via `addEventListener` in `app.js` (no inline handlers)
- Search results use `escapeHtml()` before `<mark>` tag insertion (XSS-safe)
- The temporary `element.style.contentVisibility` in JS is a runtime property, not an HTML attribute -- CSP `style-src` only blocks `style=""` in markup

---

## The Search System

### Architecture Overview

```
User types query (Cmd+K / Ctrl+K)
        ↓  150ms debounce
searchPraxis(query)
        ↓  await loadSearchIndex()
Score all 2,218 entries
        ↓  sort by score
Group by category (Glossary first)
        ↓  limit per category
renderSearchResults()
        ↓  resolveInternalUrl() on each result URL
Display grouped results with highlighted matches
```

### Search Index Schema (data/search-index.json)

```json
{
  "id": "term-zero-shot-cot",
  "title": "Zero-Shot Chain-of-Thought",
  "category": "Glossary",
  "subcategory": "Prompting",
  "keywords": ["zero-shot", "cot", "step", "reasoning"],
  "excerpt": "Adding 'Let's think step by step' to a prompt...",
  "url": "pages/glossary.html#term-zero-shot-cot"
}
```

**Categories in the index:** Glossary, Learn, Tools, Patterns, FAQ, Resources

**URL format matters:**
- Glossary entries: `pages/glossary.html#term-xxx` (anchor-based, one page)
- Framework entries: `learn/chain-of-thought.html` (separate pages)
- Tool entries: `tools/analyzer.html` (separate pages)
- All URLs are root-relative (no `../` prefix) — `resolveInternalUrl()` adds the prefix at render time

### Scoring Algorithm (app.js:8259-8328)

For each entry, each search term gets scored:

| Match Type | Points | Example |
|------------|--------|---------|
| Exact title match | 100 | Query "CRISP" matches title "CRISP" |
| Partial title match | 50 | Query "chain" matches title "Chain-of-Thought" |
| Keyword match | 30 | Query "reasoning" found in keywords array |
| Category match | 15 | Query "glossary" matches category "Glossary" |
| Subcategory match | 15 | Query "prompting" matches subcategory "Prompting" |
| Excerpt match | 10 | Query "step" found in excerpt text |

Results are sorted by total score (highest first), then grouped by category.

### Why Glossary Results Appear First

The category ordering is hardcoded:
```javascript
const categoryOrder = ['Glossary', 'Learn', 'Tools', 'Patterns', 'FAQ', 'Resources'];
```

**Why?** The glossary has 2,141 entries — the largest category by far. When someone searches a term like "temperature" or "token", the glossary definition is almost always what they want first. Framework pages are deeper dives; the glossary gives the quick answer.

**Glossary also gets more results:** 10 per search vs. 5 for other categories. This is because with 2,141+ terms, a broad search like "neural" might match dozens of glossary entries. Showing only 5 would feel incomplete.

### The Search Modal Lifecycle

1. **Creation:** `createSearchModal()` injects modal HTML into `document.body` via `insertAdjacentHTML` (called once on DOMContentLoaded)
2. **Trigger injection:** `createSearchTrigger()` adds a search button to the header
3. **Open:** Sets `.active` class, locks body scroll, lazy-loads search index, focuses input
4. **Input:** 150ms debounced, calls `searchPraxis()`, renders results
5. **Navigation:** Arrow keys move selection, Enter opens selected result, Escape closes
6. **Close:** Removes `.active`, unlocks body scroll, clears input, resets state

---

## The Search-to-Glossary Flow

This is the most complex cross-system interaction in the site. Here's every step:

### Scenario: User on `learn/chain-of-thought.html` searches "temperature"

1. User presses Cmd+K — search modal opens
2. User types "temperature" — 150ms debounce fires
3. `searchPraxis("temperature")` loads index (if not cached), scores all 2,218 entries
4. "Temperature" glossary entry scores highest (exact title match: 100 + keyword: 30 = 130)
5. Results grouped: Glossary section first, showing up to 10 matches
6. Each result URL passes through `resolveInternalUrl()`:
   - Input: `pages/glossary.html#term-temperature`
   - Current page: `learn/chain-of-thought.html` (depth = 1)
   - Output: `../pages/glossary.html#term-temperature`
7. Result rendered as clickable `<a>` with resolved href

### User clicks the "Temperature" result

8. Click handler calls `e.preventDefault()`, then `searchModal.close()`, then `navigateToResult(href)`
9. `navigateToResult("../pages/glossary.html#term-temperature")`:
   - Extracts hash: `term-temperature`
   - Calls `document.getElementById("term-temperature")` — returns `null` (we're on chain-of-thought.html, not glossary.html)
   - Falls through to `window.location.href = "../pages/glossary.html#term-temperature"`
10. Browser navigates to glossary page

### Glossary page loads

11. HTML parses: 686 lines, 26 empty letter containers
12. `app.js` runs, `DOMContentLoaded` fires
13. `loadGlossaryFromJSON()` fetches `data/glossary.json`
14. 2,141 terms built via DOM API and inserted into letter containers
15. Post-load hash check: `window.location.hash` = `#term-temperature`
16. `document.getElementById("term-temperature")` — now exists (was just created from JSON)
17. `requestAnimationFrame` then `scrollIntoView({ behavior: 'smooth', block: 'start' })`
18. CSS `[id^="term-"] { scroll-margin-top: 160px; }` offsets the scroll position below sticky elements
19. User sees "Temperature" term with the sticky A-Z nav and header above it

### Alternative: User already on glossary page

If the user is ALREADY on `glossary.html` when they search:

- Step 9 changes: `document.getElementById("term-temperature")` returns the element (it exists on this page)
- Instead of full navigation, does same-page scroll: `window.location.hash = '#term-temperature'` + `scrollIntoView()`
- No page reload — instant smooth scroll

**This same-page detection is why `navigateToResult()` checks `document.getElementById()` before falling through to `window.location.href`.**

---

## URL Resolution — The Depth Problem

### The Problem

Pages exist at three directory depths:

| Depth | Example | Path to glossary |
|-------|---------|------------------|
| 0 (root) | `index.html` | `pages/glossary.html` |
| 1 | `learn/crisp.html` | `../pages/glossary.html` |
| 1 | `pages/about.html` | `glossary.html` (same dir) |
| 2 | `learn/modality/code/code-prompting.html` | `../../pages/glossary.html` |

When JavaScript generates a link dynamically (search results, glossary term links, neural network term clicks), it can't hardcode the prefix. The same JS runs on ALL pages.

### The Solution: `resolveInternalUrl()` (app.js:471)

```javascript
function resolveInternalUrl(targetPath) {
    if (!targetPath || targetPath.startsWith('http') ||
        targetPath.startsWith('/') || targetPath.startsWith('#') ||
        targetPath.startsWith('mailto:')) {
        return targetPath;  // Skip absolute, anchor-only, external
    }
    const pathname = window.location.pathname;
    const segments = pathname.replace(/^\//, '').split('/');
    const depth = Math.max(0, segments.length - 1);  // -1 for filename
    if (depth === 0) return targetPath;
    return '../'.repeat(depth) + targetPath;
}
```

**How it works:**
1. Read current page's path segments
2. Count directory depth (subtract 1 for the filename itself)
3. Prepend that many `../` prefixes

**The rule for callers:** Always pass root-relative paths. Never include `../` yourself.
- Correct: `resolveInternalUrl('pages/glossary.html#term-foo')`
- Wrong: `resolveInternalUrl('../pages/glossary.html#term-foo')`

### Where It's Used

Every dynamically generated internal link passes through this function:
- Search result URLs
- Glossary JSON fetch path
- Search index fetch paths
- Neural network term click targets
- Glossary "Learn more" links
- Search modal quick links
- Framework recommender links

**This function was created in Session 33 to fix a critical bug** where ALL dynamically generated links were broken from subdirectory pages. Before it existed, there was folder-specific if/else logic that missed `foundations/` and `neurodivergence/` directories entirely.

---

## The Anchor Offset Pattern

### The Problem

The site has a sticky header (~70px). The glossary page also has a sticky A-Z navigation bar (~56px). When the browser navigates to an anchor like `#term-temperature`, it scrolls the element to the very top of the viewport — hidden behind the sticky elements.

### The Solution (styles.css:128-144)

```css
/* Standard anchor targets */
:target {
    scroll-margin-top: 100px;
}

[id^="section-"] {
    scroll-margin-top: 100px;
}

/* Glossary-specific anchors (header + sticky A-Z nav) */
[id^="letter-"] {
    scroll-margin-top: 160px;
}

[id^="term-"] {
    scroll-margin-top: 160px;
}
```

**Why 100px for standard pages:** Header height (70px) + 30px breathing room.

**Why 160px for glossary:** Header (70px) + sticky A-Z nav (~56px) + 34px breathing room.

**Why attribute selectors `[id^="term-"]`?** The glossary terms don't exist in HTML at parse time — they're created dynamically from JSON. CSS attribute selectors work on dynamically created elements because CSS matches against the live DOM, not the initial HTML.

### ID Naming Conventions

| Pattern | Used For | Example |
|---------|----------|---------|
| `id="letter-x"` | Glossary letter sections | `id="letter-a"` |
| `id="term-x"` | Individual glossary terms | `id="term-temperature"` |
| `id="section-x"` | Page content sections | `id="section-overview"` |

---

## The Design Token System

All visual properties flow from CSS custom properties defined on `:root`. This means changing one variable propagates everywhere — no search-and-replace needed.

### Color Tokens

```css
:root {
    /* Brand */
    --primary: #DC3545;          /* Red — accent, CTAs, active states */
    --primary-dark: #A71D2A;     /* Hover/pressed states */
    --primary-light: #F8D7DA;    /* Light backgrounds, badges */

    /* Text hierarchy */
    --text-primary: #111827;     /* Headings, primary content */
    --text-secondary: #374151;   /* Body text */
    --text-muted: #4B5563;       /* Secondary labels, captions */

    /* Surfaces */
    --bg-primary: #FFFFFF;       /* Main background */
    --bg-secondary: #F3F4F6;     /* Alternate sections */
    --bg-dark: #0D1117;          /* Dark sections (footer, CTA) */
    --bg-card: #FFFFFF;          /* Card backgrounds */

    /* Borders */
    --border-color: #D1D5DB;     /* Standard borders */
    --border-light: #E5E7EB;     /* Subtle borders */
}
```

### Dark Mode

A single `[data-theme="dark"]` block overrides the tokens:

```css
[data-theme="dark"] {
    --text-primary: #F9FAFB;
    --text-secondary: #D1D5DB;
    --bg-primary: #0D1117;
    --bg-secondary: #161B22;
    --bg-card: #1C2128;
}
```

No JS color logic needed. Components use the same variable names regardless of theme.

### Spacing Scale

```css
--space-xs: 4px;      /* Tight gaps (icon padding) */
--space-sm: 8px;      /* Small gaps (between tags) */
--space-md: 16px;     /* Standard gap (between elements) */
--space-lg: 24px;     /* Section padding (mobile) */
--space-xl: 32px;     /* Section padding (tablet) */
--space-2xl: 48px;    /* Large spacing (desktop sections) */
--space-3xl: 64px;    /* Maximum spacing (hero sections) */
```

### Other Tokens

```css
/* Border radius */
--radius-sm: 6px;     --radius-md: 12px;
--radius-lg: 16px;    --radius-xl: 24px;
--radius-full: 9999px; /* Pill shapes */

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);    /* Cards at rest */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);     /* Elevated cards */
--shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.15);   /* Modals, popovers */
--shadow-glow: 0 0 30px rgba(220, 53, 69, 0.3); /* Brand accent glow */

/* Transitions */
--transition-fast: 0.15s ease;       /* Micro-interactions (hover) */
--transition-normal: 0.3s ease;      /* Standard transitions */
--transition-slow: 0.5s ease;        /* Large element transitions */
--transition-spring: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bounce effect */

/* Typography */
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'SF Mono', 'Fira Code', monospace;
--text-scale: 1;  /* Modified by accessibility dashboard */
```

**Why system fonts?** Zero network requests for fonts. Instant rendering. Each OS shows its native font, which users already read fastest.

---

## The Component Library

Components follow BEM naming: `.block`, `.block__element`, `.block--modifier`.

### Core Layout Components

| Component | Class | Purpose |
|-----------|-------|---------|
| **Container** | `.container` | Max-width centered content wrapper |
| **Section** | `.section` | Vertical section with padding |
| **Split Section** | `.split-section` | Two-column layout (content + visual) |

### Interactive Components

| Component | Classes | Purpose | Used In |
|-----------|---------|---------|---------|
| **Accordion** | `.accordion-item`, `.accordion-header`, `.accordion-content` | Expandable sections | Framework examples |
| **Comparison Panel** | `.comparison-panel`, `.comparison-panel__side--before`, `--after` | Before/after with VS divider | Framework demos |
| **Scenario Tabs** | `.scenario-tabs-container`, `.scenario-tab` | Flip-through examples | Various |
| **Comparison Tabs** | `.comparison-tabs`, `.comparison-grid` | Tabbed before/after | Zero-Shot CoT page |

### Card Components

| Component | Classes | Purpose | Used In |
|-----------|---------|---------|---------|
| **Icon Box** | `.icon-box`, `.icon-box--bordered`, `.icon-box--lifted` | Clickable card with icon | Homepage categories, tools grid |
| **Pillar Card** | `.pillar-card`, `.pillar-card--featured` | Framework card | Learn hub, category pages |
| **Counter Box** | `.counter-box`, `.counter-number`, `.counter-label` | Animated stat counter | Homepage "Library at a Glance" |

### Content Components

| Component | Classes | Purpose | Used In |
|-----------|---------|---------|---------|
| **Highlight Box** | `.highlight-box`, `--warning`, `--info`, `--tip` | Callout boxes | Historical context notices, tips |
| **Feature List** | `.feature-list`, `.feature-list__item--positive` | Checklist with icons | "Perfect For / Skip It When" |
| **Use Case Showcase** | `.use-case-showcase`, `.use-case-showcase__item` | Application scenario cards | 6 use cases per framework |
| **Technique Demo** | `.technique-demo`, `.technique-demo__prompt`, `__response` | Code/prompt examples | Framework examples |

### Timeline Components

| Component | Classes | Purpose | Used In |
|-----------|---------|---------|---------|
| **Element Timeline** | `.element-timeline`, `.element-timeline__item` | Numbered step-by-step process | "How It Works" sections |
| **Evolution Timeline** | `.evolution-timeline`, `.era-marker`, `.era-marker--active` | Framework positioning in history | Framework positioning section |
| **Evolution Callout** | `.evolution-callout`, `.evolution-callout__content` | Related framework link | Related frameworks section |

### CTA Components

| Component | Classes | Purpose | Used In |
|-----------|---------|---------|---------|
| **CTA Corporate** | `.cta-corporate`, `--dark`, `--gradient` | Call-to-action with neural canvas | Bottom of every framework page |
| **CTA Corporate Canvas** | `.cta-corporate__canvas` | Neural network background | Visual depth in CTA sections |

### Status Components

| Component | Classes | Purpose | Used In |
|-----------|---------|---------|---------|
| **Framework Status** | `.framework-status--active`, `--adopted`, `--historical` | Relevancy badges | Foundations page, future category pages |
| **Era Frameworks Grid** | `.era-frameworks`, `.era-frameworks__grid` | Framework directory grids | Foundations timeline |

---

## The 13-Section Framework Template

Every framework page follows the same structure. This is not optional — it ensures consistency across 62+ pages and allows users to build navigation habits.

**Canonical template: `learn/self-ask.html` (895 lines)**

| # | Section | HTML Comment | Key Components | Purpose |
|---|---------|--------------|----------------|---------|
| 1 | **Hero** | `<!-- === HERO === -->` | Page-hero canvas, breadcrumb, hero-badge, h1, subtitle | First impression, framework identity |
| 2 | **Historical Context** | `<!-- === HISTORICAL CONTEXT === -->` | `.highlight-box--warning` | When it was created, by whom, current LLM relevancy |
| 3 | **The Concept** | `<!-- === THE CONCEPT === -->` | `.split-section` | Core idea in plain language |
| 4 | **How It Works** | `<!-- === HOW IT WORKS === -->` | `.element-timeline` (3-4 steps) | Step-by-step process |
| 5 | **Visual Comparison** | `<!-- === COMPARISON === -->` | `.comparison-panel` (before/after) | Direct vs. technique approach |
| 6 | **Examples in Action** | `<!-- === EXAMPLES === -->` | 3x `.accordion-item` with `.technique-demo` | Real prompt/response examples |
| 7 | **When to Use** | `<!-- === WHEN TO USE === -->` | `.split-section` with `.feature-list` (4 positive, 3 negative) | "Perfect For" and "Skip It When" |
| 8 | **Use Cases** | `<!-- === USE CASES === -->` | 6x `.use-case-showcase__item` | Application scenarios across domains |
| 9 | **Framework Positioning** | `<!-- === FRAMEWORK POSITIONING === -->` | `.evolution-timeline` with 4 `.era-marker` | Where this technique sits in history |
| 10 | **Related Frameworks** | `<!-- === RELATED FRAMEWORKS === -->` | 3x `.evolution-callout` links | Complementary techniques |
| 11 | **CTA** | `<!-- === CTA SECTION === -->` | `.cta-corporate--dark` with canvas | Action buttons (Prompt Builder, Foundations) |
| 12 | **Back-to-Top** | (after `</main>`) | `.back-to-top-bar` button | Quick return to top |
| 13 | **Accessibility Dashboard** | (after back-to-top) | `.adl-panel` dialog | Text size, contrast, read-aloud, dimming |

### Page Structure (outside the 13 sections)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="...">
    <title>[Framework Name] - Praxis</title>
    <link rel="icon" type="image/svg+xml" href="../favicon.svg">
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <!-- Header with mega-menu navigation -->
    <main id="main-content">
        <!-- 13 sections here -->
    </main>
    <!-- Footer -->
    <!-- Back-to-top button -->
    <!-- Accessibility dashboard -->
    <script src="../app.js" defer></script>
</body>
</html>
```

### What Must NOT Appear on Framework Pages

| Excluded | Reason | Session |
|----------|--------|---------|
| Citations / Sources | User preference — deferred for later | Session 25 |
| Stat cards | Replaced by highlight-box components | Session 26 |
| Content badges | Removed from all learn pages | Session 29 |
| HR/remote work examples | Replaced with tech/science/education examples | Session 37 |
| CSP meta tags | Handled by server headers, not HTML | Session 38 |

---

## Navigation Architecture

### The Mega-Menu System

Every page has the same header navigation with three mega-menu dropdowns:

1. **AI Foundations** — Single link (no dropdown)
2. **Discover** — Tabbed mega-menu with 10 category tabs, 79+ links (progressive disclosure)
3. **AI Readiness** — Mega-menu with 8 tool links
4. **Resources** — Multi-column mega-menu (Guides + AI & ND sections)

### Discover Menu: Tabbed Progressive Disclosure (Session 48)

The Discover mega-menu uses `mega-menu--tabbed` class with a left tab column + right content panel layout. Tab buttons are generated at runtime by `TabbedMenu` JS from each section's `<h4>` text.

**HTML structure:**
```html
<div class="mega-menu mega-menu--tabbed">
    <div class="mega-menu-tabs" role="tablist" aria-label="Framework categories"></div>
    <div class="mega-menu-section" data-tab="getting-started" role="tabpanel">
        <h4>Getting Started</h4>
        <a href="learn/prompt-basics.html">Prompt Basics</a>
        ...
    </div>
    <!-- 9 more sections with data-tab slugs -->
</div>
```

**Tab slug mapping:**

| Category | Slug |
|----------|------|
| Getting Started | `getting-started` |
| Structured Frameworks | `structured-frameworks` |
| In-Context Learning | `in-context-learning` |
| Reasoning & CoT | `reasoning-cot` |
| Decomposition | `decomposition` |
| Self-Correction | `self-correction` |
| Ensemble Methods | `ensemble-methods` |
| Prompting Strategies | `prompting-strategies` |
| Code | `code` |
| Image | `image` |

**CSS layout (desktop):**
```css
.mega-menu--tabbed {
    display: flex;
    width: 680px;
}
.mega-menu-tabs {
    flex: 0 0 190px;         /* Left: tab buttons */
    border-right: 1px solid var(--border-color);
}
.mega-menu--tabbed .mega-menu-section[data-tab] {
    flex: 1;
    display: none;           /* Hidden by default */
}
.mega-menu--tabbed .mega-menu-section[data-tab].is-active {
    display: block;          /* Only active panel shown */
}
```

**JS (`TabbedMenu` object in app.js):**
- Reads `<h4>` text from each `[data-tab]` section to generate tab `<button>` elements
- Desktop: `mouseenter` on tabs switches active panel
- Mobile: h4 click toggles `.is-expanded` class (single-expand accordion)
- Keyboard: Arrow keys between tabs (roving tabindex pattern)

### Resources Menu: Multi-Column (Unchanged)

The Resources mega-menu retains `mega-menu--multi-column` with auto-split grid.

### Mobile Navigation

**Discover menu (tabbed):** Accordion layout. Tab column hidden; each category h4 is a tappable accordion header with +/- indicator. Links hidden until section is expanded. Single-expand mode (opening one closes others).

**Resources menu (multi-column):** 2-column CSS grid with `display: contents` on section wrappers. All links visible (no accordion).

### Batch Conversion Scripts

- `update_nav_tabbed.py` — Converts all HTML files from multi-column to tabbed (Discover menu only)
- `update_nav_s46.py` — Reference for adding new sections to mega-menu

### Active State

Each page's directory determines which nav-link gets `class="nav-link active"`:
- All `learn/*.html` pages: Learn link is active
- All `tools/*.html` pages: AI Readiness link is active
- All `pages/*.html` pages: Resources link is active

### Path Prefixes by Depth

| Depth | Example Page | Prefix |
|-------|-------------|--------|
| Root | `index.html` | None (`learn/crisp.html`) |
| 1-deep | `learn/crisp.html` | `../` (`../learn/crisp.html`) |
| 2-deep | `learn/modality/code/code-prompting.html` | `../../` |

Navigation HTML is identical across pages except for these path prefixes and the active state class.

---

## The Neural Network Canvas System

### Purpose

The animated neural network backgrounds serve both branding and education — they visually reinforce that Praxis is about AI while providing ambient visual depth.

### Canvas Locations

| Canvas ID | Location | Purpose |
|-----------|----------|---------|
| `hero-neural-bg` | Homepage hero | Large animated network with rotating AI names |
| `page-hero-neural-bg` | Framework page heroes | Smaller ambient network |
| `cta-neural-bg` | CTA sections | Neural depth behind call-to-action |
| `footer-neural-bg` | Footer | Subtle ambient animation |

### Performance Optimizations

| Technique | Purpose |
|-----------|---------|
| Frame throttling: 16ms desktop, 33ms mobile | Reduce GPU load on mobile |
| Connection caching (100ms interval) | O(n^2) calculations don't run every frame |
| Tab visibility handler | Pauses animation when tab is hidden |
| Delta time capping | Prevents animation jumps after tab switch |
| Fewer nodes on mobile | Reduced rendering complexity |
| Reduced pulse count on mobile | Fewer particles drawn per frame |

### Interactive Terms

On the homepage, floating AI terminology words (CRISP, Context, Chain-of-Thought, etc.) are rendered on the canvas. They are clickable — clicking one navigates to its glossary entry via `resolveInternalUrl()` and the `TERM_GLOSSARY_MAP` lookup table.

---

## Accessibility Architecture (ADL)

### The Accessibility Dashboard

A floating panel (`.adl-panel`) on every page provides:

| Feature | Implementation | Persistence |
|---------|----------------|-------------|
| **Text scaling** | CSS `--text-scale` variable (1x, 2x, 3x) | localStorage |
| **High contrast** | Toggle class on `<body>` | localStorage |
| **Read aloud** | Web Speech API (`speechSynthesis`) with Slow/Normal/Fast | Session only |
| **Screen dimming** | Overlay element with `opacity: 0-50%` via range slider | localStorage |
| **Reset** | Restores all settings to defaults | Clears localStorage keys |

### WCAG AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Skip link | `<a href="#main-content" class="skip-link">` on every page |
| Touch targets | Minimum 44x44px on all interactive elements |
| Color contrast | 4.5:1 minimum for text (checked against `--primary` red) |
| Heading hierarchy | h1 then h2 then h3, no skipped levels |
| ARIA attributes | `aria-expanded`, `aria-label`, `aria-controls`, `role="dialog"` |
| Keyboard navigation | Tab, Escape, Arrow keys, Enter all handled |
| Focus indicators | Visible focus rings on all interactive elements |
| Semantic HTML | `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` |

---

## Performance Optimization Patterns

### Why Performance Matters

Praxis serves everyone — including users on slow connections, old devices, and assistive technology. A 100% Lighthouse score is not vanity; it's accessibility.

### Optimization Inventory

| Technique | Where | Why |
|-----------|-------|-----|
| `content-visibility: auto` | Glossary sections | Only paint visible letter sections of 2,141 terms |
| `contain-intrinsic-size: auto 500px` | Glossary sections | Placeholder height prevents scrollbar jumps |
| `defer` on `<script>` | Every page | JS doesn't block HTML parsing |
| System fonts | Global | Zero font network requests |
| Lazy-load JSON | Glossary, search index | Don't load 1.2MB of data until needed |
| Single CSS/JS file | Global | One cache entry, loaded on first page, reused everywhere |
| `requestAnimationFrame` throttling | Canvas animations | Smooth 60fps without overworking GPU |
| Tab visibility detection | Canvas animations | Stop rendering when tab is hidden |
| Connection caching | Neural network | Cache O(n^2) calculations, update every 100ms |
| CSS transitions (not JS) | Hover effects, menus | GPU-accelerated, off main thread |
| Debounced search input | Search modal | Don't search on every keystroke (150ms wait) |
| Event delegation | Menu links, search results | One listener on parent instead of many on children |

---

## Framework Categories and Inventory

### The 9 Categories (65 frameworks)

| Category | Count | Description |
|----------|-------|-------------|
| **Getting Started** | 2 | Entry points for beginners |
| **Structured Frameworks** | 5 | Template-based prompt construction (CRISP, CRISPE, COSTAR) |
| **Reasoning & CoT** | 14 | Chain-of-thought and reasoning enhancement |
| **Decomposition** | 7 | Breaking complex problems into sub-problems |
| **Self-Correction** | 7 | AI self-critique and verification loops |
| **In-Context Learning** | 9 | Example-based learning (few-shot, zero-shot) |
| **Ensemble Methods** | 7 | Multiple reasoning paths combined |
| **Prompting Strategies** | 11 | Formerly "Advanced Techniques" — mixed strategies |
| **Code** | 3 | Code-specific prompting techniques |

### Pending Rename (Phase 1 of Discover Hub plan)

"Advanced Techniques" will become **"Prompting Strategies"** — because the category contains Role Prompting (basic) alongside ReAct (complex). "Advanced" was misleading.

### Full Inventory

See `.claude/plans/discover-hub-category-pages.md` for the complete framework-to-file mapping with all 65 entries.

---

## File Structure

```
_public_html/
├── index.html                          # Homepage (6-section redesign)
├── styles.css                          # ALL CSS (27,562 lines)
├── app.js                              # ALL JavaScript (10,899 lines)
├── favicon.svg                         # Site icon
│
├── data/
│   ├── glossary.json                   # 2,141 AI terms (lazy-loaded)
│   └── search-index.json              # 2,218 searchable entries (lazy-loaded)
│
├── foundations/
│   └── index.html                     # AI Foundations timeline (5 eras)
│
├── learn/                             # 62+ Framework pages
│   ├── index.html                     # Learn hub (soon: Discover hub)
│   ├── [62 framework pages]           # All follow 13-section template
│   └── modality/code/                 # Code-specific frameworks
│       ├── code-prompting.html
│       ├── self-debugging.html
│       └── structured-output.html
│
├── pages/                             # 12 Content pages
│   ├── glossary.html                  # 2,141-term interactive glossary
│   ├── about.html
│   ├── ai-for-everybody.html
│   ├── ai-assisted-building.html
│   ├── ai-safety.html
│   ├── animation-features.html
│   ├── chatgpt-guide.html
│   ├── faq.html
│   ├── performance.html
│   ├── resources.html
│   ├── security.html
│   └── universal-design.html
│
├── tools/                             # 12 Interactive tools
│   ├── index.html
│   ├── analyzer.html
│   ├── bias.html
│   ├── checklist.html
│   ├── guidance.html
│   ├── hallucination.html
│   ├── jailbreak.html
│   ├── matcher.html
│   ├── persona.html
│   ├── scorer.html
│   ├── specificity.html
│   └── temperature.html
│
├── neurodivergence/                   # 6 ND-focused pages
│   ├── index.html
│   ├── adhd.html
│   ├── autism.html
│   ├── dyslexia.html
│   ├── tools.html
│   └── resources.html
│
├── patterns/
│   └── index.html                     # Patterns Library
│
├── quiz/
│   └── index.html                     # AI Readiness Quiz
│
└── .claude/                           # Project documentation
    ├── HANDOFF.md                     # Current state + active tasks
    ├── COMPLETED.md                   # Archive of completed work
    ├── SiteFrameworks.md              # THIS FILE
    └── plans/
        ├── FrameworkOverhaul.md        # Master plan (40 sessions of work)
        └── discover-hub-category-pages.md  # Active: Discover Hub plan
```

---

## Critical Rules — Never Violate

These rules exist because violations were caught, debugged, and fixed during development. They are battle-tested constraints.

### Security (Non-Negotiable)

| Rule | Why |
|------|-----|
| No `style=""` attributes | CSP `style-src 'self'` blocks inline styles |
| No `onclick=""`, `onload=""`, or any inline event handlers | CSP `script-src 'self'` blocks inline scripts |
| No inline `<script>` blocks | Same as above |
| No external resources (CDNs, fonts, APIs) | CSP `default-src 'none'` + security isolation |
| No `eval()`, `new Function()`, `setTimeout("string")` | Code injection vectors |
| Use `escapeHtml()` before displaying any user-sourced content | XSS prevention |
| Use DOM API (`createElement`/`textContent`) for dynamic content, not `innerHTML` with untrusted data | XSS prevention |

### Architecture (Non-Negotiable)

| Rule | Why |
|------|-----|
| All styles in `styles.css` | Single-file principle, CSP compliance |
| All scripts in `app.js` with `defer` | Single-file principle, non-blocking load |
| Use `resolveInternalUrl()` for ALL dynamic internal links | Multi-depth directory structure |
| Pass root-relative paths to `resolveInternalUrl()` | Function calculates prefix itself |
| Use `<!-- === SECTION === -->` notation in HTML | Maintainability, section identification |
| Use `/* === SECTION === */` notation in CSS | Same |
| Use `// === SECTION ===` notation in JS | Same |

### Content (User Preferences)

| Rule | Why | Session |
|------|-----|---------|
| No citations on framework pages | User preference — may add later | 25 |
| No stat cards | Replaced by highlight-box components | 26 |
| No content badges on learn pages | Removed for cleaner design | 29 |
| No HR/remote work examples | Replaced with tech/science/education | 37 |
| No CSP meta tags in HTML | Handled by server .htaccess headers | 38 |
| No emoji in code or content | User preference | All |
| Historical context notice on every framework page | Required for academic integrity | 29 |

### Quality (Standards)

| Rule | Why |
|------|-----|
| WCAG AA accessibility compliance | Inclusive by design |
| 4.5:1 color contrast ratio minimum | Readability for all users |
| Full keyboard navigation | Users without mice |
| Proper heading hierarchy (h1 then h2 then h3) | Screen readers, SEO |
| Meaningful alt text on all images | Screen readers |
| 44px minimum touch targets | Mobile usability (iOS HIG) |
| All factual claims verified from .edu or .gov sources | Academic integrity |

---

*This document is the soul of Praxis. Every rule here was learned through building. Update it when the project evolves, but never violate its principles.*
