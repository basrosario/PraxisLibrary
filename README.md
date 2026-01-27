# Praxis AI Prompt Library

<div align="center">

**A Human-AI Collaboration Example Project**

*How we built a complete web application together—humans and AI working side by side*

![Security Grade](https://img.shields.io/badge/Security-A+_100%25-success?style=for-the-badge&labelColor=2196F3)
![Performance](https://img.shields.io/badge/Performance-100%25-success?style=for-the-badge&labelColor=2196F3)
![Built With](https://img.shields.io/badge/Built_With-Claude_Code-7C3AED?style=for-the-badge)

</div>

---

## What This Project Demonstrates

This repository serves as a **working example** of what happens when humans and AI collaborate on a real project. It's not about the content itself—it's about the process, the tools, and the possibilities.

**What you'll find here:**
- A complete, production-ready web application
- Zero external dependencies (no CDNs, no tracking, no frameworks)
- Enterprise-grade security (A+ ratings across all testing platforms)
- Responsive, accessible design
- And most importantly: **documentation of how we built it together**

---

## The Human-AI Partnership

This entire project was built through conversation. A human with ideas and goals. An AI assistant (Claude Code) with technical capabilities. Together, we:

- Designed the architecture
- Wrote every line of HTML, CSS, and JavaScript
- Implemented security headers
- Debugged responsive layouts
- Managed Git commits
- Created this documentation

**The goal isn't to replace human creativity—it's to amplify it.**

---

## What You Can Learn From This

### 1. Setting Up Your Environment

Before we wrote any code, we set up the right tools:

| Tool | Purpose |
|------|---------|
| VS Code | Code editor with great extensions |
| Git | Version control |
| Claude Code | AI development assistant (`npm install -g @anthropic-ai/claude-code`) |
| Live Server | Local development with auto-reload |

### 2. Project Structure

We organized files logically from the start:

```
project/
├── index.html              # Entry point
├── styles.css              # All styles in one file
├── app.js                  # All JavaScript in one file
├── .htaccess               # Security headers (Apache)
├── assets/
│   ├── fonts/              # Self-hosted fonts
│   ├── icons/SVG/          # Self-hosted icons
│   └── images/             # Optimized images
└── pages/                  # Additional pages
```

### 3. Security-First Approach

We implemented security headers before writing content:

```apache
# Content Security Policy - Be strict
Header set Content-Security-Policy "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self';"

# Force HTTPS
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# Prevent common attacks
Header set X-Frame-Options "DENY"
Header set X-Content-Type-Options "nosniff"
```

### 4. No External Dependencies

We made a deliberate choice: **no CDNs, no external scripts, no tracking.**

Why?
- Faster load times (no DNS lookups)
- Better privacy (no third-party requests)
- Works offline
- Full control over our codebase

### 5. Mobile-First Responsive Design

We designed for mobile first, then enhanced for larger screens:

```css
/* Mobile base styles */
.container { padding: 15px; }

/* Tablet and up */
@media (min-width: 768px) {
    .container { padding: 30px; }
}

/* Desktop */
@media (min-width: 1024px) {
    .container { padding: 40px; }
}
```

---

## How to Build Something Similar

### Step 1: Start with Conversation

Don't start by writing code. Start by describing what you want to build:

> "I want to create a website that helps people learn about AI prompts. It should be fast, secure, and work on mobile devices."

### Step 2: Plan Together

Work with your AI assistant to create a roadmap:

1. Set up development environment
2. Create basic file structure
3. Build core HTML templates
4. Add styling
5. Implement interactivity
6. Add security headers
7. Test and refine
8. Deploy

### Step 3: Iterate

The best results come from back-and-forth:

> Human: "The sidebar doesn't look right on mobile."
> AI: *Proposes CSS changes*
> Human: "Better, but the animation is too slow."
> AI: *Adjusts timing*
> Human: "Perfect."

### Step 4: Learn Along the Way

Every interaction is an opportunity to understand:

- Ask "why" when the AI suggests something
- Request explanations of complex code
- Build mental models of how things work

---

## Technical Specifications

### What We Built

| Feature | Implementation |
|---------|----------------|
| Responsive sidebar | CSS transitions + JavaScript toggle |
| Copy-to-clipboard | Vanilla JS Clipboard API |
| Animated charts | CSS transitions triggered by JS |
| Particle animation | Canvas API |
| Dark mode | CSS custom properties |

### Performance Targets (Achieved)

| Metric | Target | Actual |
|--------|--------|--------|
| Performance | 90%+ | 100% |
| Security | A+ | A+ |
| Accessibility | High | WCAG compliant |
| Mobile | Optimized | Responsive |

### Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

---

## Getting Started

### Clone This Repository

```bash
git clone https://github.com/basrosario/PROMPTLIBRARY.git
cd PROMPTLIBRARY
```

### Run Locally

1. Open the folder in VS Code
2. Install the "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"

### Deploy Your Own

1. Get a domain and hosting (Hostinger, Netlify, etc.)
2. Upload all files to your web root
3. Ensure SSL is enabled
4. Verify `.htaccess` is working (check security headers)

---

## Lessons We Learned

### What Worked Well

- **Starting simple** - We built core features first, then enhanced
- **Testing early** - We caught issues before they compounded
- **Clear communication** - Specific requests got better results
- **Iterating quickly** - Small changes, frequent commits

### What We'd Do Differently

- **Plan mobile navigation earlier** - We refactored this twice
- **Establish naming conventions first** - Consistency matters
- **Set up CI/CD sooner** - Manual uploads are tedious

---

## Contributing

This project is open for learning. If you build something inspired by this:

1. **Share what you learned** - Write about your process
2. **Credit the collaboration** - Mention human-AI partnership
3. **Pass it forward** - Help others learn too

---

## A Note on Attribution

This project represents collaborative work. When referencing it:

> "Built through human-AI collaboration using Claude Code"

No single person "owns" what emerges from genuine collaboration. We're all learning together.

---

## Resources

### Tools We Used

- [VS Code](https://code.visualstudio.com/) - Code editor
- [Claude Code](https://claude.ai/claude-code) - AI development assistant
- [Git](https://git-scm.com/) - Version control

### Testing Platforms

- [Mozilla Observatory](https://observatory.mozilla.org) - Security headers
- [SecurityHeaders.com](https://securityheaders.com) - Header verification
- [GTmetrix](https://gtmetrix.com) - Performance testing

### Learning Resources

- [MDN Web Docs](https://developer.mozilla.org) - Web standards reference
- [CSS-Tricks](https://css-tricks.com) - CSS techniques
- [web.dev](https://web.dev) - Modern web best practices

---

## License

**Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**

You're free to:
- Use this as a learning resource
- Build your own version
- Share with attribution

You must:
- Give appropriate credit
- Not use commercially without permission

See [LICENSE](LICENSE) for details.

---

<div align="center">

**Built by humans, with AI, for everyone**

*The future isn't human vs. AI—it's human + AI*

</div>
