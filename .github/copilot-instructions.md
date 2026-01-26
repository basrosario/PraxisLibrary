# Copilot Instructions - Prompt Library Portfolio Site

## Project Overview

A static, security-hardened portfolio website showcasing prompt engineering expertise and education. No frameworks, backend, or external dependencies—vanilla HTML/CSS/JavaScript only.

**Purpose:** Professional branding + educational library of AI prompt engineering methodologies (CRISP, CRISPE, COSTAR, ReAct frameworks for 15+ professional roles).

---

## Architecture & File Roles

| File | Purpose | Key Responsibility |
|------|---------|-------------------|
| `library.html` | Core educational content | Extensive content: CRISP/CRISPE/COSTAR/ReAct methodologies across 15+ roles organized by expertise area |
| `app.js` | Client-side interactivity | Tab navigation, accordion menus, clipboard copy with feedback, event delegation |
| `styles.css` | Design system | Responsive grid layouts, color scheme (#D71920 red accent), typography, mobile breakpoints |
| `index.html` | Landing page | Hero section, profile, navigation hub |
| `Security/security.html` | Security documentation | CSP, HSTS, headers philosophy, site hardening rationale |
| `GitHub/github-insights.html` | Project insights | GitHub metrics and project information |

---

## Code Conventions & Patterns

### CSS & Naming
- **Classes:** kebab-case (`.nav-item`, `.sec-card`, `.framework-grid`, `.text-red`)
- **Layout system:** Sidebar navigation with `.main-wrapper`, `.container`, `.sidebar` pattern
- **Grid layouts:** Responsive using flexbox/grid (`.framework-grid`, `.sec-grid`)
- **Utilities:** `.text-red`, `.text-green`, `.text-white`, `.active`, `.hidden`
- **Responsive breakpoints:** Multiple breakpoints at 1024px, 768px, 480px
- **Brand color:** `#D71920` (red accent throughout)

### HTML Data Attributes & State
- **Tab system:** `data-tab="foundation"` — matches sidebar nav items to tab-content divs in library.html
- **Accordion system:** `.nav-accordion` with `.nav-accordion-header` and `.nav-accordion-content` for collapsible sections
- **Semantic structure:** `.section-divider`, `.sec-section`, `.sec-card` for repeating content blocks
- **Icons:** Local SVG files in `Icons/SVG/` directory, referenced as `<img src="Icons/SVG/[name].svg" />`

### JavaScript Patterns
- **Event delegation:** Single event listener on parent container (see `app.js`)
- **Null checks:** Defensive programming (`if (!targetTab) return;`)
- **DOM manipulation:** `querySelector()`, `classList` for interactivity
- **No frameworks:** Pure DOM APIs only
- **Clipboard API:** `navigator.clipboard.writeText()` for copy-to-clipboard functionality with visual feedback
- **Accordion handling:** Toggle `.expanded` class on accordion containers

---

## Library Structure (Core Content)

The library is organized by **expertise area → role → methodology → examples**:

```
Information Technology
├── IT Engineer
├── IT Manager
└── IT Site Support

Quality & Regulatory
├── Regulatory Affairs Specialist
└── Quality Assurance Manager

Clinical & Medical
├── Medical Science Liaison
├── Clinical Operations Coordinator
└── Pharmacovigilance Analyst

Corporate Services
├── Executive Assistant
├── Human Resources
├── Finance & Planning
└── Training & Development

Operations & Compliance
├── Supply Chain & Procurement
├── Compliance & Legal Affairs
└── Environmental Health & Safety

AI & Innovation
└── AI Training & Curation
```

Each role contains:
- Level 1 (Entry): Basic prompts
- Level 2 (Intermediate): Enhanced techniques
- Level 3 (Advanced): Expert patterns
- ReAct Application: Interactive troubleshooting examples

**Adding new library content:**
1. Add accordion group or nav item in `library.html` sidebar
2. Create corresponding `<div class="tab-content" id="[role-id]">` section
3. Follow existing structure: role intro → four level sections with prompt examples
4. Use `.example-block` divs with `.btn-copy` for copyable content
5. Include ReAct examples with Thought/Action/Observation format

---

## Security & Non-Functional Requirements

**This is a security-first site.** All design decisions reflect defense-in-depth:
- **No external CDNs, trackers, or scripts** — everything is self-hosted
- **Strict Content-Security-Policy:** No inline scripts or styles
- **No eval() or dynamic code execution** — app.js defers-loaded and linted
- **HTTPS/HSTS enforced** — security headers in all pages
- **No external APIs** — social links are navigation only, no data collection

When adding features:
- **Never add external dependencies** without explicit consideration of security implications
- **Never inline script or style content** (CSP violation)
- **Test responsive design** at multiple breakpoints (1024px, 768px, 480px)

---

## Common Development Tasks

### Adding a New Role to Library
1. Add navigation item in appropriate accordion group in `library.html`
2. Create new `tab-content` section with matching `data-tab` ID
3. Add four example blocks (CRISP, CRISPE, COSTAR, ReAct)
4. Include `.btn-copy` buttons for copyable content
5. Use generic labels (Product-A, Site-001, Study-002, etc.)

### Updating Security Page
- Edit `Security/security.html`
- Update test result screenshots in `Security/` directory
- Ensure CSP headers are documented accurately

### Styling Changes
- Modify `styles.css` using existing color variables and breakpoints
- Test at all responsive breakpoints
- Keep `.text-red` (#D71920), `.text-green`, `.text-white` utilities consistent

### Adding Icons
- Place SVG in `Icons/SVG/[descriptive-name].svg`
- Reference: `<img src="Icons/SVG/[descriptive-name].svg" alt="description" class="local-icon" />`
- Ensure SVGs have no embedded scripts (security requirement)

---

## Debugging Tips

**Tab navigation not working?**
- Check `data-tab` attribute matches tab-content `id` exactly
- Ensure corresponding nav-item exists in sidebar
- Verify `app.js` event listener is attached to sidebar container

**Accordion not expanding?**
- Check for `.nav-accordion-header` and `.nav-accordion-content` structure
- Verify `app.js` accordion event handler is working
- Check for CSS `.expanded` class toggle

**Styling not applying?**
- Check class names use kebab-case
- Verify media query breakpoints
- Clear browser cache and reload
- Ensure styles.css is fully loaded

**Copy-to-clipboard not working?**
- Confirm `navigator.clipboard` is available (requires HTTPS in production)
- Check console for CSP violations
- Ensure text node exists in DOM when copy triggered

**Mobile display issues?**
- Test at multiple viewport widths (1024px, 768px, 480px)
- Sidebar should collapse to hamburger menu on mobile
- Accordions should be touch-friendly
- Hero section should stack vertically on small screens
