# Praxis Corporate Redesign Plan

**Vision:** Transform Praxis into a professional corporate-grade AI education platform with Porto-style design sophistication while maintaining CSP A+ compliance.

**Core Principle:** Professional, polished, and purposeful - every element serves the educational mission.

---

## Design System: Porto-Inspired Components

### Phase 1: New CSS Component Library

#### 1.1 Counter Components (Animated Statistics)
```css
/* Animated number counters that count up on scroll */
.counter-section { }
.counter-box { }
.counter-number { }  /* Large animated number */
.counter-suffix { }  /* "+" or "%" after number */
.counter-label { }   /* Description below */
.counter-icon { }    /* Optional icon above */
```
**Use cases:** Statistics, achievements, impact metrics

#### 1.2 Progress Bars (Skill/Completion Indicators)
```css
.progress-section { }
.progress-item { }
.progress-label { }
.progress-bar { }
.progress-fill { }  /* Animated fill on scroll */
.progress-value { } /* Percentage text */
```
**Use cases:** Learning progress, skill levels, completion rates

#### 1.3 Shape Dividers (Section Separators)
```css
.shape-divider { }
.shape-divider--wave { }
.shape-divider--curve { }
.shape-divider--angle { }
.shape-divider--triangle { }
.shape-divider--tilt { }
.shape-divider--top { }
.shape-divider--bottom { }
.shape-divider--flip { }
```
**Use cases:** Visual transitions between sections

#### 1.4 Word Rotator (Dynamic Text)
```css
.word-rotator { }
.word-rotator__static { }
.word-rotator__dynamic { }
.word-rotator__word { }
.word-rotator__word--active { }
```
**Use cases:** Hero headlines, feature highlights

#### 1.5 Icon Boxes (Feature Cards)
```css
.icon-box { }
.icon-box--style-1 { } /* Icon top, centered */
.icon-box--style-2 { } /* Icon left, horizontal */
.icon-box--style-3 { } /* Icon background, overlay */
.icon-box--style-4 { } /* Bordered with hover */
.icon-box__icon { }
.icon-box__title { }
.icon-box__content { }
.icon-box__link { }
```
**Use cases:** Features, benefits, services grid

#### 1.6 Before/After Comparison
```css
.before-after { }
.before-after__container { }
.before-after__before { }
.before-after__after { }
.before-after__slider { }
.before-after__handle { }
.before-after__label { }
```
**Use cases:** Prompt improvements, technique comparisons

#### 1.7 Testimonial Carousel
```css
.testimonial-carousel { }
.testimonial-slide { }
.testimonial__quote { }
.testimonial__author { }
.testimonial__role { }
.testimonial__image { }
.testimonial__rating { }
.carousel-nav { }
.carousel-dot { }
```
**Use cases:** Success stories, user feedback

#### 1.8 Parallax Sections
```css
.parallax-section { }
.parallax-bg { }
.parallax-content { }
.parallax--light { }
.parallax--dark { }
```
**Use cases:** Hero backgrounds, call-to-action sections

#### 1.9 Animated Cards (Hover Effects)
```css
.animated-card { }
.animated-card--lift { }    /* Lifts on hover */
.animated-card--glow { }    /* Glows on hover */
.animated-card--flip { }    /* 3D flip reveal */
.animated-card--slide { }   /* Content slides in */
.animated-card--zoom { }    /* Image zooms */
.animated-card__overlay { }
```
**Use cases:** Method cards, tool cards, resource cards

#### 1.10 Timeline Component
```css
.timeline { }
.timeline--horizontal { }
.timeline--vertical { }
.timeline__item { }
.timeline__marker { }
.timeline__connector { }
.timeline__content { }
.timeline__date { }
.timeline__title { }
```
**Use cases:** Learning paths, history, process steps

#### 1.11 Tabs (Enhanced)
```css
.tabs-corporate { }
.tabs-corporate__nav { }
.tabs-corporate__btn { }
.tabs-corporate__btn--active { }
.tabs-corporate__indicator { } /* Animated underline */
.tabs-corporate__panel { }
.tabs-corporate__panel--active { }
```
**Use cases:** Content organization, comparisons

#### 1.12 Pricing/Comparison Tables
```css
.comparison-table { }
.comparison-table__header { }
.comparison-table__row { }
.comparison-table__feature { }
.comparison-table__check { }
.comparison-table__highlight { }
.pricing-card { }
.pricing-card--featured { }
```
**Use cases:** Framework comparisons, tool comparisons

#### 1.13 Call to Action Blocks
```css
.cta-corporate { }
.cta-corporate--style-1 { } /* Full-width banner */
.cta-corporate--style-2 { } /* Card with image */
.cta-corporate--style-3 { } /* Split layout */
.cta-corporate__content { }
.cta-corporate__actions { }
.cta-corporate__image { }
```
**Use cases:** Section endings, conversion points

#### 1.14 Feature List
```css
.feature-list { }
.feature-list__item { }
.feature-list__icon { }
.feature-list__content { }
.feature-list--check { }  /* Checkmark style */
.feature-list--number { } /* Numbered style */
.feature-list--arrow { }  /* Arrow style */
```
**Use cases:** Benefits, features, requirements

#### 1.15 Alert/Notice Boxes
```css
.notice { }
.notice--info { }
.notice--success { }
.notice--warning { }
.notice--tip { }
.notice__icon { }
.notice__content { }
.notice__dismiss { }
```
**Use cases:** Tips, warnings, important notes

#### 1.16 Scroll Animations
```css
/* Animation classes triggered on scroll */
.animate-on-scroll { }
.aos-fade-up { }
.aos-fade-down { }
.aos-fade-left { }
.aos-fade-right { }
.aos-zoom-in { }
.aos-zoom-out { }
.aos-flip-up { }
.aos-flip-left { }
[data-aos-delay="100"] { }
[data-aos-delay="200"] { }
[data-aos-delay="300"] { }
```
**Use cases:** Page-wide scroll animations

---

## Phase 2: Hero Section Redesign

### 2.1 Corporate Hero Styles
```css
.hero-corporate { }
.hero-corporate--style-1 { } /* Full-screen with parallax */
.hero-corporate--style-2 { } /* Split with image */
.hero-corporate--style-3 { } /* Video background */
.hero-corporate--style-4 { } /* Animated particles */
.hero-corporate__content { }
.hero-corporate__title { }
.hero-corporate__subtitle { }
.hero-corporate__rotator { } /* Word rotator */
.hero-corporate__actions { }
.hero-corporate__scroll-indicator { }
```

### 2.2 Homepage Hero Content
```
HEADLINE: Master AI Communication
ROTATOR: [Prompting / Reasoning / Creativity / Productivity]
SUBTITLE: The definitive resource for learning how to work effectively with AI.
CTA PRIMARY: Start Learning
CTA SECONDARY: Explore Tools
```

---

## Phase 3: Page Layout Patterns

### 3.1 Section Types
1. **Hero Section** - Full-width, impactful opening
2. **Stats Section** - Counter boxes with key metrics
3. **Features Section** - Icon boxes in grid
4. **Content Section** - Text with supporting visuals
5. **Comparison Section** - Before/after or tables
6. **Testimonial Section** - Carousel of feedback
7. **CTA Section** - Conversion-focused ending
8. **Progress Section** - Learning path visualization

### 3.2 Section Rhythm
```
HERO (full-width, dark/gradient)
  ↓ shape-divider--wave
STATS (light background)
  ↓ shape-divider--curve
FEATURES (alternate background)
  ↓ shape-divider--angle
CONTENT (light background)
  ↓ parallax-section (image break)
COMPARISON (alternate background)
  ↓ shape-divider--tilt
CTA (dark/gradient)
```

---

## Phase 4: Color Refinement

### 4.1 Corporate Color Palette
```css
:root {
  /* Primary - Professional Blue */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;

  /* Secondary - Trust Green */
  --secondary-500: #10b981;
  --secondary-600: #059669;

  /* Accent - Energy Orange */
  --accent-500: #f97316;
  --accent-600: #ea580c;

  /* Neutrals - Sophisticated Grays */
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, var(--primary-700), var(--primary-500));
  --gradient-cta: linear-gradient(135deg, var(--secondary-600), var(--primary-600));
}
```

---

## Phase 5: Typography Enhancement

### 5.1 Type Scale (Corporate)
```css
/* Headlines - Bold and impactful */
.display-1 { font-size: 4.5rem; font-weight: 700; line-height: 1.1; }
.display-2 { font-size: 3.5rem; font-weight: 700; line-height: 1.15; }
.display-3 { font-size: 2.75rem; font-weight: 600; line-height: 1.2; }

/* Section Titles */
.section-heading { font-size: 2.25rem; font-weight: 600; }
.section-subheading { font-size: 1.25rem; font-weight: 400; color: var(--neutral-600); }

/* Body */
.body-large { font-size: 1.125rem; line-height: 1.7; }
.body-regular { font-size: 1rem; line-height: 1.6; }

/* Labels */
.label { font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
```

---

## Phase 6: JavaScript Enhancements

### 6.1 Counter Animation
```javascript
// CounterAnimation class
// - Detect when counter enters viewport
// - Animate from 0 to target value
// - Support suffixes (+, %, k, M)
// - Configurable duration and easing
```

### 6.2 Progress Bar Animation
```javascript
// ProgressAnimation class
// - Animate fill width on scroll
// - Stagger multiple bars
// - Optional percentage display
```

### 6.3 Word Rotator
```javascript
// WordRotator class
// - Cycle through words array
// - Configurable animation (fade, slide, clip)
// - Configurable timing
```

### 6.4 Scroll Animations (AOS-style)
```javascript
// ScrollAnimator class
// - Intersection Observer based
// - Support multiple animation types
// - Configurable delay and offset
// - Reset on scroll out (optional)
```

### 6.5 Before/After Slider
```javascript
// BeforeAfterSlider class
// - Draggable divider
// - Touch support
// - Keyboard accessible
```

### 6.6 Parallax Effect
```javascript
// ParallaxController class
// - Background scroll offset
// - Performance optimized (requestAnimationFrame)
// - Reduced motion support
```

### 6.7 Testimonial Carousel
```javascript
// TestimonialCarousel class
// - Auto-advance (configurable)
// - Dot navigation
// - Swipe support
// - Keyboard accessible
```

---

## Phase 7: Page-by-Page Redesign

### 7.1 Homepage (index.html)
**Design:** Maximum impact landing page

**Sections:**
1. **Hero** - Word rotator, parallax background, neural animation
2. **Stats** - 4 counters (Users learning, Frameworks covered, Tools available, Success rate)
3. **What is Praxis** - Icon boxes explaining value proposition
4. **Learning Paths** - Timeline showing progression
5. **Featured Methods** - Animated cards for top frameworks
6. **Testimonials** - Carousel of success stories
7. **Tools Preview** - Icon boxes for key tools
8. **CTA** - Start learning call to action

### 7.2 Foundations Section
**Design Theme:** Building blocks, solid ground

**Index Page:**
- Progress tracker showing learning journey
- Method cards with completion indicators
- Prerequisites clearly marked

**Individual Pages (CRISP, CRISPE, etc.):**
- Before/after prompt comparisons
- Progress through elements
- Practice exercises with feedback

### 7.3 Techniques Section
**Design Theme:** Workshop, skill-building

**Index Page:**
- Skill matrix with progress bars
- Technique comparison table
- Goal-based navigation

**Individual Pages:**
- Step-by-step animated guides
- Interactive practice tools
- Real-world examples carousel

### 7.4 Modern Methods Section
**Design Theme:** Cutting edge, future-forward

**Index Page:**
- Timeline showing evolution
- "New" badges on recent additions
- Model compatibility indicators

**Individual Pages:**
- Live code examples
- Interactive builders
- Advanced patterns showcase

### 7.5 Applied AI Section
**Design Theme:** Real world, professional

**Index Page:**
- Role-based pathway selector
- Industry case studies grid
- Implementation roadmap

**Individual Pages:**
- Case study carousels
- Decision trees
- Assessment tools

---

## Phase 8: Implementation Order

### Sprint 1: Design System Foundation
1. [ ] Add all new CSS components to styles.css
2. [ ] Add JavaScript animation classes to app.js
3. [ ] Update color variables
4. [ ] Add typography enhancements
5. [ ] Create shape divider SVGs (inline in CSS)

### Sprint 2: Homepage Redesign
1. [ ] Rebuild hero section with word rotator
2. [ ] Add stats section with counters
3. [ ] Redesign feature sections with icon boxes
4. [ ] Add testimonial carousel
5. [ ] Implement CTA sections
6. [ ] Add shape dividers between sections

### Sprint 3: Foundations Section
1. [ ] Redesign foundations/index.html
2. [ ] Update all foundation pages with new components
3. [ ] Add before/after comparisons
4. [ ] Implement progress tracking

### Sprint 4: Techniques Section
1. [ ] Create techniques/index.html
2. [ ] Build technique pages with new design
3. [ ] Add interactive elements
4. [ ] Implement skill progress bars

### Sprint 5: Modern Methods & Applied AI
1. [ ] Complete modern methods section
2. [ ] Complete applied AI section
3. [ ] Add all interactive tools
4. [ ] Final polish and testing

---

## Quality Standards

### Every Page Must Have:
- [ ] At least 3 different component types
- [ ] Scroll animations on key elements
- [ ] Shape dividers between major sections
- [ ] Clear visual hierarchy
- [ ] Mobile-responsive layout
- [ ] Keyboard accessibility
- [ ] CSP A+ compliance (no inline styles/scripts)
- [ ] Lighthouse 100%

### Corporate Feel Checklist:
- [ ] Professional typography
- [ ] Consistent spacing (8px grid)
- [ ] Subtle animations (not distracting)
- [ ] High-quality iconography
- [ ] Sophisticated color usage
- [ ] Clear calls to action
- [ ] Trust indicators (stats, testimonials)

---

## File Impact Summary

### CSS Additions (~1500 lines)
- Counter components
- Progress bars
- Shape dividers
- Word rotator
- Icon boxes
- Before/after
- Testimonial carousel
- Parallax sections
- Animated cards
- Timeline
- Corporate tabs
- Comparison tables
- CTA blocks
- Feature lists
- Notice boxes
- Scroll animations

### JavaScript Additions (~800 lines)
- CounterAnimation class
- ProgressAnimation class
- WordRotator class
- ScrollAnimator class
- BeforeAfterSlider class
- ParallaxController class
- TestimonialCarousel class

### HTML Updates (All pages)
- New component structures
- Shape divider SVGs
- Animation data attributes
- Restructured sections

---

## Notes

- All animations respect `prefers-reduced-motion`
- All components are keyboard accessible
- No external dependencies (pure CSS/JS)
- CSP compliant (no inline styles/scripts)
- Performance optimized (lazy loading, efficient selectors)
