# ♿ Website Accessibility Features

**Purpose:** Documentation of Universal Design (UD) and Universal Design for Learning (UDL) features implemented in the website.

**Date:** January 2026
**Version:** 1.0
**Compliance Target:** WCAG 2.1 AA

---

## 📋 Table of Contents

- [Overview](#overview)
- [Accessibility Features](#accessibility-features)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Visual Accessibility](#visual-accessibility)
- [ARIA Implementation](#aria-implementation)
- [Testing](#testing)
- [Known Issues](#known-issues)
- [Future Improvements](#future-improvements)

---

## Overview

This website has been built with accessibility as a core principle, following Universal Design (UD) and WCAG 2.1 guidelines. Every user, regardless of ability or assistive technology used, should be able to access and navigate the content.

### Accessibility Goals

✅ **Keyboard Navigation** - Full site functionality without a mouse
✅ **Screen Reader Compatible** - Semantic HTML and ARIA labels
✅ **Visual Accessibility** - High contrast, clear focus indicators
✅ **Cognitive Accessibility** - Clear structure, consistent navigation
✅ **Motor Accessibility** - Large click targets, reduced precision requirements
✅ **Reduced Motion Support** - Respects user preferences

---

## Accessibility Features

### 1. Skip Navigation Link

**Location:** Top of every page (hidden until focused)
**Purpose:** Allows keyboard users to bypass navigation and jump directly to main content

**How it works:**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

**Keyboard access:** Press `Tab` on page load to reveal and activate

**Visual presentation:**
- Hidden by default (positioned off-screen)
- Appears when focused (keyboard navigation)
- High contrast red background (#D71920)
- Clear focus indicator

---

### 2. Semantic HTML Structure

**All pages use proper HTML5 landmarks:**

| Element | Purpose | Screen Reader Announcement |
|---------|---------|---------------------------|
| `<nav>` | Navigation regions | "Navigation" |
| `<main>` | Primary content | "Main" |
| `<header>` | Page header | "Banner" |
| `<section>` | Content sections | "Section" |
| `<button>` | Interactive elements | "Button" |

**Example:**
```html
<nav role="navigation" aria-label="Main navigation">
  <!-- Navigation items -->
</nav>

<main id="main-content" role="main">
  <!-- Main content -->
</main>
```

---

### 3. ARIA Labels & Descriptions

**All interactive elements have appropriate labels:**

**Navigation Buttons:**
```html
<button class="nav-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded="false"
        aria-controls="nav-menu">
```

**Icon Links:**
```html
<a href="https://linkedin.com"
   aria-label="LinkedIn profile (opens in new tab)">
  <img src="linkedin.svg" alt="" aria-hidden="true">
  LinkedIn
</a>
```

**Tab Navigation:**
```html
<button role="tab"
        aria-selected="true"
        aria-controls="foundation">
  Foundation
</button>
```

---

### 4. Image Alt Text

**All images have appropriate alternative text:**

**Decorative images:**
```html
<img src="icon.svg" alt="" aria-hidden="true">
```

**Meaningful images:**
```html
<img src="profile.png"
     alt="Professional portrait of Basiliso Rosario">
```

**Icon with adjacent text:**
```html
<img src="email.svg" alt="" aria-hidden="true"> Contact
```
(Icon is decorative, text provides context)

---

### 5. Focus Indicators

**All interactive elements have visible focus indicators:**

**CSS Implementation:**
```css
a:focus,
button:focus {
    outline: 3px solid #D71920;
    outline-offset: 2px;
}
```

**High Contrast Mode:**
```css
@media (prefers-contrast: high) {
    a:focus,
    button:focus {
        outline: 4px solid currentColor;
        outline-offset: 3px;
    }
}
```

---

### 6. Reduced Motion Support

**Respects user's motion preferences:**

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

**Impact:**
- Disables animations for users with vestibular disorders
- Removes auto-scroll behavior
- Maintains functionality without motion

---

## Keyboard Navigation

### Global Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move to next interactive element |
| `Shift + Tab` | Move to previous interactive element |
| `Enter` | Activate link or button |
| `Space` | Activate button |
| `Escape` | Close mobile menu |

---

### Homepage (index.html)

**Keyboard Flow:**
1. `Tab` - Skip link appears
2. `Tab` - Navigation toggle button (mobile)
3. `Tab` - First navigation item
4. `Tab` - Continue through nav items
5. `Tab` - Main content (Prompt Library button)

**Mobile Menu:**
- `Click toggle` or `Enter` - Opens menu
- `Escape` - Closes menu
- Focus returns to toggle button

---

### Prompt Library (library.html)

**Tab Navigation:**

| Keys | Action |
|------|--------|
| `Arrow Down/Right` | Next tab |
| `Arrow Up/Left` | Previous tab |
| `Home` | First tab |
| `End` | Last tab |
| `Enter/Space` | Activate tab |

**Focus Management:**
- Tab change updates `aria-selected`
- Content updates with `hidden` attribute
- Screen reader announcement on tab change
- Scroll resets to top of content

---

### Navigation Focus Order

**Logical tab order:**
1. Skip link
2. Quick links (edge navigation)
3. Mobile menu toggle
4. Main navigation items
5. Main content
6. Interactive elements within content

---

## Screen Reader Support

### Announcements

**Page Load:**
- Document title announced
- Main landmarks identified
- Navigation regions labeled

**Dynamic Changes:**
- Tab switching announces new section
- Menu open/close states announced
- Form feedback provided

---

### ARIA Live Regions

**Tab Change Announcements:**
```javascript
const announcement = document.createElement('div');
announcement.setAttribute('role', 'status');
announcement.setAttribute('aria-live', 'polite');
announcement.textContent = `${tabName} section loaded`;
```

**Copy Button Feedback:**
- "Copied" announced when successful
- "Failed" announced on error
- Visual feedback + screen reader announcement

---

### Heading Hierarchy

**All pages follow proper heading levels:**

```
h1 - Page Title (one per page)
├── h2 - Major Sections
│   ├── h3 - Subsections
│   │   └── h4 - Detail sections
```

**Example (library.html):**
```
h1 - "Structured Prompt Engineering"
├── h2 - "CRISP Methodology"
│   ├── h3 - Not used (visual badges instead)
├── h2 - "CRISPE Methodology"
├── h2 - "ReAct Methodology"
```

---

### Visually Hidden Content

**For screen readers only:**
```css
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

**Usage:**
```html
<h2 id="bio-heading" class="visually-hidden">About Me</h2>
<section aria-labelledby="bio-heading">
  <!-- Bio content -->
</section>
```

---

## Visual Accessibility

### Color Contrast

**All text meets WCAG AA standards (4.5:1 minimum):**

| Element | Foreground | Background | Ratio |
|---------|-----------|------------|-------|
| Body text | #1A1A1A | #FFFFFF | 16.1:1 ✅ |
| Links | #D71920 | #FFFFFF | 5.9:1 ✅ |
| Nav items | #FFFFFF | #1A1A1A | 16.1:1 ✅ |
| Buttons | #FFFFFF | #D71920 | 5.9:1 ✅ |

**Accent color:** `#D71920` (red) - chosen for sufficient contrast

---

### Focus Indicators

**Visible and clear:**
- 3px solid outline
- Red color (#D71920)
- 2px offset from element
- Never removed or hidden

**High contrast mode:**
- 4px outline
- Uses `currentColor`
- Enhanced offset (3px)

---

### Text Size & Spacing

**Responsive typography:**
- Base: 16px (1rem)
- Line height: 1.6 (optimal readability)
- Heading scale: Clear hierarchy
- No fixed px heights (allows text zoom)

**Spacing:**
- Adequate padding for touch targets
- Minimum 44x44px click areas
- Visual separation between sections

---

### Visual Indicators

**Not relying on color alone:**
- Links have underline on hover
- Active states use multiple cues (color + weight + border)
- Icons supplement text labels
- Status uses both color and text

---

## ARIA Implementation

### Roles

**Navigation:**
```html
<nav role="navigation" aria-label="Main navigation">
```

**Tab Interface:**
```html
<button role="tab" aria-selected="true">Tab 1</button>
<div role="tabpanel" id="panel1">Content</div>
```

**Status Announcements:**
```html
<div role="status" aria-live="polite">Message</div>
```

---

### States

**Toggle Button:**
```html
<button aria-expanded="false" aria-controls="menu">
  Toggle Menu
</button>
```

**Current Page:**
```html
<a href="index.html" aria-current="page">Home</a>
```

**Selected Tab:**
```html
<button role="tab" aria-selected="true">Active Tab</button>
```

---

### Properties

**Controls:**
```html
<button aria-controls="nav-menu">Toggle</button>
<div id="nav-menu">Navigation</div>
```

**Labels:**
```html
<section aria-labelledby="section-heading">
  <h2 id="section-heading">Section Title</h2>
</section>
```

**Described By:**
```html
<button aria-describedby="help-text">Submit</button>
<span id="help-text">This will send your message</span>
```

---

## Testing

### Automated Testing

**Tools used:**
- ✅ axe DevTools - No critical issues
- ✅ WAVE - All passed
- ✅ Lighthouse Accessibility - 100/100

**Regular checks:**
```bash
# Browser DevTools -> Lighthouse
# Run accessibility audit
# Check for violations
```

---

### Manual Testing

**Screen Readers:**
- ✅ NVDA (Windows) - Tested and functional
- ✅ JAWS (Windows) - Compatible
- ✅ VoiceOver (macOS) - Tested and functional

**Keyboard Navigation:**
- ✅ All interactive elements reachable
- ✅ Focus visible at all times
- ✅ No keyboard traps
- ✅ Logical tab order

**Browser Testing:**
- ✅ Chrome + ChromeVox
- ✅ Firefox + NVDA
- ✅ Safari + VoiceOver
- ✅ Edge + Narrator

---

### Test Scenarios

**Homepage:**
1. Navigate with keyboard only
2. Use screen reader to access all content
3. Verify skip link functionality
4. Test mobile menu with keyboard

**Library Page:**
1. Tab through all navigation
2. Use arrow keys to switch tabs
3. Verify tab announcements
4. Test copy button feedback

---

## Known Issues

### Current Limitations

**None critical.** Minor improvements identified:

1. **Tab panel role** - Could add explicit `role="tabpanel"` to content areas
2. **Color names** - Some color variable names not user-facing (technical only)
3. **PDF accessibility** - If PDFs added, ensure proper tagging

---

### Browser Quirks

**Safari:**
- Focus indicators may render slightly differently
- VoiceOver integration excellent

**Internet Explorer:**
- Not supported (modern browsers only)
- CSP headers may not work

---

## Future Improvements

### Planned Enhancements

**High Priority:**
- [ ] Add breadcrumb navigation for sub-pages
- [ ] Implement pagination with ARIA for long content
- [ ] Add print stylesheet for accessibility

**Medium Priority:**
- [ ] Add "dark mode" with high contrast option
- [ ] Implement preference memory (localStorage)
- [ ] Add text resize controls

**Low Priority:**
- [ ] Add language selector (if translated)
- [ ] Implement advanced keyboard shortcuts
- [ ] Add customizable theme options

---

### Community Feedback

**We welcome accessibility feedback:**
- Email: [bas.rosario@gmail.com](mailto:bas.rosario@gmail.com)
- Subject: "Accessibility Feedback"
- Describe the issue and your assistive technology

---

## Accessibility Statement

**Commitment:**
This website is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

**Conformance Status:**
This website is partially conformant with WCAG 2.1 Level AA. "Partially conformant" means that some parts of the content do not fully conform to the accessibility standard.

**Feedback:**
We welcome your feedback on the accessibility of this website. Please contact us if you encounter accessibility barriers:
- Email: [bas.rosario@gmail.com](mailto:bas.rosario@gmail.com)
- We aim to respond within 2 business days

**Assessment:**
- Last evaluated: January 2026
- Method: Self-assessment + automated tools
- Next review: April 2026

---

## Technical Specifications

**Accessibility relies on:**
- HTML5
- CSS3
- JavaScript (vanilla, no frameworks)
- WAI-ARIA 1.2
- Progressive enhancement

**Supported Technologies:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Screen readers (NVDA, JAWS, VoiceOver, Narrator)
- Keyboard navigation
- Voice control software
- Screen magnification

---

## Resources

**Standards & Guidelines:**
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)

**Testing Tools:**
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Screen Readers:**
- [NVDA (Free)](https://www.nvaccess.org/)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/)
- [VoiceOver](https://www.apple.com/accessibility/voiceover/)

---

**Version:** 1.0
**Last Updated:** January 2026
**Maintained by:** Basiliso Rosario ([bas.rosario@gmail.com](mailto:bas.rosario@gmail.com))

**Found an accessibility issue?** Please report it immediately so we can fix it.
