# JavaScript Navigation Log

**Project:** Praxis Library
**File:** `app.js` (~479KB)
**Last Updated:** 2026-02-03
**Session:** Autonomous Refactoring Phase 1

---

## Overview

This document catalogs all functions, objects, and logical blocks in `app.js` for maintainability and onboarding purposes. The file is wrapped in a single `DOMContentLoaded` event listener using 'use strict' mode.

---

## Architecture Summary

The codebase follows a **monolithic single-file architecture** with:
- All JavaScript in one file (`app.js`)
- CSP-compliant design (no inline scripts/styles)
- Mobile-first responsive approach
- Heavy use of canvas animations

---

## Function Registry

### Security Utilities
| Line Range | Function/Block Name | Trigger | Dependencies (DOM ID/Class) | Logic Description |
|:-----------|:--------------------|:--------|:----------------------------|:------------------|
| 14-19 | `escapeHtml()` | Called internally | None | Escapes HTML to prevent XSS when displaying user content |

### Navigation & Menu
| Line Range | Function/Block Name | Trigger | Dependencies (DOM ID/Class) | Logic Description |
|:-----------|:--------------------|:--------|:----------------------------|:------------------|
| 24-55 | Mobile Menu Toggle | Click/Keydown | `#menuToggle`, `#nav`, `#header` | Toggles mobile menu open/close state, closes on ESC key |
| 56-75 | Header Scroll Handler | Scroll | `.header` | Adds 'scrolled' class to header when page is scrolled |

### Neural Network Animation System
| Line Range | Function/Block Name | Trigger | Dependencies (DOM ID/Class) | Logic Description |
|:-----------|:--------------------|:--------|:----------------------------|:------------------|
| ~1700-1799 | `AI_TERMS` | Static data | None | Array of AI terminology displayed in neural background |
| ~1800-2469 | `NeuralNode` class | Animation frame | Canvas | Represents a node in the neural network with term display |
| 2035-2062 | `initParticleExplosion()` | Animation phase | None | Creates particles for spotlight explosion effect |
| 2067-2081 | `updateParticles()` | Animation frame | None | Updates particle positions with gravity and friction |
| 2083-2189 | `draw()` | Animation frame | Canvas context | Draws the neural node with spotlight effects |
| 2191-2272 | `drawTerm()` | Animation frame | Canvas context | Draws the term text attached to a node |
| 2281-2468 | `drawSpotlightTerm()` | Animation phase | Canvas context | Complex multi-phase spotlight animation |
| 2472-2506 | `DataPulse` class | Animation frame | Canvas | Data pulse traveling along connections |
| 2509-2581 | `FloatingTerm` class | Animation frame | Canvas | Floating AI terms that act as connectable nodes |
| 2585-3107 | `HeroNeuralBackground` class | DOMReady | `#hero-neural-bg`, `.hero` | Main neural background animation system |
| 2750-2761 | `handleTermClick()` | Canvas click | Canvas | Navigates to glossary when clicking a term |
| 2768-2779 | `handleTermHover()` | Canvas mousemove | Canvas | Shows pointer cursor over clickable terms |
| 3109-3163 | Neural Background Init | DOMReady | Various canvas IDs | Initializes hero, page-hero, footer, and CTA neural backgrounds |

### Scroll & Animation Utilities
| Line Range | Function/Block Name | Trigger | Dependencies (DOM ID/Class) | Logic Description |
|:-----------|:--------------------|:--------|:----------------------------|:------------------|
| 3165-3192 | `revealObserver` | Intersection | `.fade-in`, `.card`, etc. | Adds 'visible' class when elements enter viewport |
| 3197-3231 | `animateCounter()` | Intersection | `[data-count]` | Animates numeric counters with easeOutCubic |
| 3237-3252 | Smooth Scroll | Click | `a[href^="#"]` | Smooth scrolls to anchor targets |
| 3259-3315 | Back to Top Bar | Scroll/Click | `.back-to-top-bar` | Shows/hides back-to-top bar on scroll, scrolls to top on click |

### Notifications & Theme
| Line Range | Function/Block Name | Trigger | Dependencies (DOM ID/Class) | Logic Description |
|:-----------|:--------------------|:--------|:----------------------------|:------------------|
| 3320-3337 | `showToast()` | Called internally | `.toast-container` | Creates and displays toast notifications |
| 3342-3361 | Theme Toggle | Click | `.theme-toggle` | Toggles dark/light mode, saves to localStorage |

### Prompt Scorer Tool
| Line Range | Function/Block Name | Trigger | Dependencies (DOM ID/Class) | Logic Description |
|:-----------|:--------------------|:--------|:----------------------------|:------------------|
| 3369-3777 | `FRAMEWORKS` object | Static data | None | Framework definitions (CRISP, COSTAR, CRISPE) with patterns |
| 3779-3816 | `GUIDED_QUESTIONS` object | Static data | None | Question prompts for guided mode |
| 3823-3902 | `STRUCTURAL_BONUSES` object | Static data | None | Bonus patterns for exceptional prompts |
| 3905-3911 | `ScorerState` object | State management | None | Manages scorer mode, methodology, answers |
| 3914-3950 | `detectFrameworkElements()` | Analysis | None | Detects framework elements in a prompt |
| 3953-3978 | `detectStructuralBonuses()` | Analysis | None | Detects structural bonuses for scores above 100% |
| 3982-3992 | `calculateElementQuality()` | Analysis | None | Calculates quality score based on pattern match depth |
| 3999-4039 | `analyzePrompt()` | Form submit | None | Main prompt analysis function |
| 4042-4084 | `generateFrameworkFeedback()` | Analysis | None | Generates feedback based on framework elements |
| 4087-4220 | `displayScores()` | Analysis complete | `#score-display` | Renders score UI with framework elements |
| 4223-4256 | `generateFrameworkElementsHTML()` | UI render | None | Generates HTML for framework elements display |
| 4259-4276 | `initFrameworkTabs()` | UI init | `.framework-tab` | Initializes framework tab switching |
| 4279-4306 | `updateFrameworkElements()` | Tab switch | `#elements-display` | Updates elements display when switching tabs |
| 4309-4336 | `toggleGuidedMode()` | Button click | `#guided-mode-toggle`, `#guided-mode-panel` | Toggles between guided and standard mode |
| 4339-4376 | `renderGuidedQuestions()` | Mode/methodology change | `#guided-questions` | Renders guided questions for selected methodology |
| 4378-4433 | `combineGuidedAnswers()` | Button click | `#prompt-input` | Combines guided answers into a single prompt |
| 4436-4491 | `initScorerEnhancements()` | DOMReady | Various | Initializes guided mode, methodology selector |
| 4494-4514 | Scorer Form Handler | Form submit | `#scorer-form`, `#prompt-input` | Handles form submission for prompt analysis |
| 4516-4522 | `getScoreClass()` | Score display | None | Returns CSS class based on score level |

### Prompt Analyzer Tool (Smart Analyzer)
| Line Range | Function/Block Name | Trigger | Dependencies (DOM ID/Class) | Logic Description |
|:-----------|:--------------------|:--------|:----------------------------|:------------------|
| 4528-4538 | `ELEMENT_TYPES` object | Static data | None | Element type definitions with position weights |
| 4541-4668 | `TECHNIQUE_PATTERNS` object | Static data | None | Detection patterns for advanced prompting methods |
| 4675-4790 | `CONTENT_INDICATORS` object | Static data | None | Multi-signal content indicators for each element type |
| 4797-5000+ | `PromptAnalyzer` class | Analysis | None | Main analyzer class with ML-like signal detection |
| 4803-4826 | `analyze()` | Method | None | Main analysis method |
| 4828-4839 | `segmentPrompt()` | Method | None | Segments prompt into sentences/clauses |
| 4842-4857 | `analyzeSentence()` | Method | None | Analyzes a single sentence for elements |
| 4859-4884 | `analyzeSentenceStructure()` | Method | None | Determines sentence structure (imperative, declarative, etc.) |
| 4886-4946 | `scoreForElement()` | Method | None | Scores a sentence for a specific element |
| 4949-5000+ | `aggregateElementScores()` | Method | None | Aggregates scores across all sentences |

---

## Objects & Classes

| Name | Line Range | Purpose |
|:-----|:-----------|:--------|
| `AI_TERMS` | ~1700-1799 | Static array of AI terminology |
| `NeuralNode` | ~1800-2469 | Node in neural network with spotlight animation |
| `DataPulse` | 2472-2506 | Traveling pulse along network connections |
| `FloatingTerm` | 2509-2581 | Floating text term in network |
| `HeroNeuralBackground` | 2585-3107 | Main neural background controller |
| `FRAMEWORKS` | 3369-3777 | Framework definitions (CRISP, COSTAR, CRISPE) |
| `GUIDED_QUESTIONS` | 3779-3816 | Guided mode question definitions |
| `STRUCTURAL_BONUSES` | 3823-3902 | Structural bonus patterns |
| `ScorerState` | 3905-3911 | Scorer state management |
| `ELEMENT_TYPES` | 4528-4538 | Element type definitions |
| `TECHNIQUE_PATTERNS` | 4541-4668 | Technique detection patterns |
| `CONTENT_INDICATORS` | 4675-4790 | Content indicator signals |
| `PromptAnalyzer` | 4797-5000+ | Smart prompt analyzer class |

---

## Event Listeners

| Event Type | Target | Handler | Line |
|:-----------|:-------|:--------|:-----|
| `click` | `#menuToggle` | Toggle mobile menu | ~29 |
| `click` | `nav a` | Close mobile menu | ~36 |
| `keydown` | `document` | Close menu on ESC | ~47 |
| `scroll` | `window` | Header scroll state | ~60 |
| `scroll` | `window` | Back-to-top visibility | ~3307 |
| `click` | `.back-to-top-bar` | Scroll to top | ~3261 |
| `click` | `.theme-toggle` | Toggle theme | ~3350 |
| `submit` | `#scorer-form` | Analyze prompt | ~4498 |
| `click` | `#guided-mode-toggle` | Toggle guided mode | ~4465 |
| `click` | `.methodology-btn` | Switch methodology | ~4472 |
| `click` | `#combine-prompt-btn` | Combine answers | ~4489 |
| `click` | `.framework-tab` | Switch framework view | ~4262 |
| `click` | Neural canvas | Handle term click | ~2683 |
| `mousemove` | Neural canvas | Handle term hover | ~2684 |

---

## Global Variables

| Name | Type | Purpose | Line |
|:-----|:-----|:--------|:-----|
| `isMainPage` | Boolean | Detects if on main index page | ~1695 |
| `neuralBackgrounds` | Array | Stores neural background instances | 3110 |
| `isMobileForAnimations` | Boolean | Mobile detection for performance | 3113 |
| `revealObserver` | IntersectionObserver | Scroll reveal animations | 3168 |
| `counterObserver` | IntersectionObserver | Counter animations | 3218 |
| `toastContainer` | Element | Toast notification container | 3320 |

---

## Notes

### Architecture Observations
1. **Well-organized sections** with clear comment headers
2. **CSP-compliant** - no inline event handlers or styles
3. **Mobile-first** - touch detection and performance optimizations
4. **Canvas-heavy** - Neural network animations use HTML5 Canvas

### Potential Improvements Identified
1. **Consider namespace encapsulation** - Some globals could be wrapped in objects
2. **Event delegation** - Already using some, but could be expanded
3. **Lazy loading** - Neural backgrounds only init on desktop (good)

### File Size Concern
- At 479KB, the file is large but well-commented
- Consider splitting in future if it grows further

---

*Document created during Phase 1 autonomous refactoring*
*Will be updated as more analysis is completed*
