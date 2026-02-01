# Praxis Project Instructions

**This file is automatically read at the start of every Claude Code session.**

---

## Required Reading

Before making ANY changes, read these files:
1. `.claude/HANDOFF.md` - Current state, rules, and progress
2. `.claude/plans/praxis-enhancement-plan.md` - Master plan with all phases

---

## Critical Rules (Always Follow)

### Security (A+ CSP Compliance)
- **NO inline styles** - Never use `style=""` in HTML
- **NO inline scripts** - Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** - No CDNs, Google Fonts, or external APIs
- **All styles in styles.css** - Single external stylesheet
- **All scripts in app.js** - Single external script with `defer`

### Performance (100% Score)
- Efficient, minimal code
- No render-blocking resources
- Remove all unused code

### Code Notation (Required)

**Policy: No Surprise Code**
All code must be labeled and documented. Unlabeled code is unacceptable. Every code block must clearly communicate its purpose to any reader.

**Format Standards:**
```
HTML:  <!-- === SECTION === --> ... <!-- /SECTION -->
CSS:   /* === SECTION === */ ... /* Component ---- */
JS:    // === SECTION === ... /** JSDoc comments */
```

**Required Documentation Elements:**

1. **What the code does** - Clear description of functionality
   - Purpose of the section/component
   - Expected behavior
   - Any dependencies or relationships

2. **Security compliance reference** - How code aligns with standards
   - CSP compliance notes (why no inline styles/scripts)
   - OWASP alignment (input validation, output encoding, etc.)
   - Data handling practices

3. **No Surprise Code principle**
   - No undocumented functionality
   - No hidden side effects
   - No magic numbers without explanation
   - All external interactions clearly noted

**Example - Properly Documented Code:**
```javascript
// === NEURAL NETWORK ANIMATION ===
// Purpose: Renders animated neural network visualization
// Security: CSP-compliant (no eval, no inline handlers)
// OWASP: No user input processed, read-only canvas rendering

/**
 * Draws neural network nodes and connections
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @returns {void}
 */
function drawNetwork(ctx) { ... }
```

```css
/* === CONTENT BADGES ===
   Purpose: Inline badge display for content areas
   Security: External stylesheet only (CSP compliant)
   -------------------------------------------- */
.content-badges { ... }
```

### Accessibility (WCAG AA)
- Meaningful alt text
- 4.5:1 color contrast
- Full keyboard navigation
- Proper heading hierarchy

---

## Prompt Management Rules


### Context Preservation Priority
1. Current task status and progress
2. Uncommitted code changes
3. Active file modifications
4. Recent error/debugging context
5. Session-specific decisions

---

## Workflow

1. Read HANDOFF.md for current task status
2. Confirm understanding before proceeding
3. Follow notation standards in all code
4. Update HANDOFF.md when completing tasks
5. Monitor prompt capacity and compact proactively

---

## Quick Reference

| File | Purpose |
|------|---------|
| `.claude/HANDOFF.md` | Session continuity & rules |
| `.claude/plans/praxis-enhancement-plan.md` | Full phase details |
| `styles.css` | ALL CSS (single file) |
| `app.js` | ALL JavaScript (single file) |
