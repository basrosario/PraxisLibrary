# Praxis AI - Prompt Engineering Example Library

<div align="center">

**Human Knowledge + AI Capability = Superior Results**

*A blend of hands-on development and AI-powered refinement*

![Security Grade](https://img.shields.io/badge/Security-A+_100%25-success?style=for-the-badge&labelColor=0891b2)
![Performance](https://img.shields.io/badge/Performance-100%25-success?style=for-the-badge&labelColor=0891b2)
![Built With](https://img.shields.io/badge/Built_With-Claude_Code-06b6d4?style=for-the-badge)
![UD/UDL](https://img.shields.io/badge/Built_With-UD%2FUDL_in_Mind-8b5cf6?style=for-the-badge)

**&lt;/OpenBas&gt;**

</div>

---

## The Story: Perfection Through AI Adoption

This project didn't start as a blank canvas. The foundation—the knowledge, the vision, the domain expertise—already existed. What AI brought was the ability to **perfect** that foundation into something far superior than either human or machine could have created alone.

**The key insight:** AI adoption isn't about replacement. It's about combining your existing knowledge with AI's capabilities to create products that exceed what either could achieve independently.

### What This Repository Demonstrates

- How AI can elevate existing work to production-quality standards
- The workflow of iterative refinement through human-AI collaboration
- Enterprise-grade security achieved through AI-assisted implementation
- A complete, vendor-agnostic approach to working with AI

---

## Setting Up Your AI Development Environment

This guide walks you through setting up the tools and resources needed to work with AI the same way this project was created—**without vendor lock-in**.

### Phase 1: Core Development Tools

These are the foundational tools you need regardless of which AI you choose.

#### Code Editor
Choose any modern code editor with extension support:

| Editor | Platform | Notes |
|--------|----------|-------|
| [VS Code](https://code.visualstudio.com/) | All | Most popular, extensive extensions |
| [Cursor](https://cursor.sh/) | All | AI-native editor with built-in assistance |
| [Zed](https://zed.dev/) | Mac/Linux | Fast, collaborative, AI-ready |
| [Sublime Text](https://www.sublimetext.com/) | All | Lightweight, fast |
| [Neovim](https://neovim.io/) | All | Terminal-based, highly customizable |

**Recommended Extensions (VS Code):**
- Live Server (local development)
- GitLens (version control visualization)
- Prettier (code formatting)
- HTML CSS Support

#### Version Control

```bash
# Install Git (if not already installed)
# Windows: Download from https://git-scm.com/
# Mac: xcode-select --install
# Linux: sudo apt install git

# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Create a new repository
git init
git add .
git commit -m "Initial commit"
```

### Phase 2: AI Assistant Options

Choose the AI assistant that fits your workflow. This project uses Claude Code, but the principles apply to any AI.

#### Option A: Claude Code (Used in This Project)

```bash
# Install via npm
npm install -g @anthropic-ai/claude-code

# Or via Homebrew (Mac)
brew install claude-code

# Run in your project directory
cd your-project
claude
```

**Strengths:** Deep code understanding, security-aware, excellent at iteration

#### Option B: GitHub Copilot

```bash
# Install via VS Code extension marketplace
# Search: "GitHub Copilot"
# Requires GitHub account and subscription
```

**Strengths:** Inline completions, IDE integration, code suggestions

#### Option C: Cursor AI

```bash
# Download Cursor editor from https://cursor.sh/
# AI features built directly into the editor
# Uses multiple AI models (GPT-4, Claude)
```

**Strengths:** All-in-one solution, natural language commands

#### Option D: Open Source / Self-Hosted

```bash
# Ollama - Run local models
curl -fsSL https://ollama.com/install.sh | sh
ollama pull codellama
ollama pull mistral

# Continue.dev - Open source IDE extension
# Install from VS Code marketplace
```

**Strengths:** Privacy, no API costs, offline capability

### Phase 3: Project Structure

Organize your project for AI collaboration:

```
project/
├── index.html              # Entry point
├── styles.css              # Centralized styles
├── app.js                  # Application logic
├── .htaccess               # Server configuration
├── README.md               # Project documentation
├── LICENSE                 # Usage terms
├── assets/
│   ├── fonts/              # Self-hosted typography
│   ├── icons/SVG/          # Vector icons
│   └── images/             # Optimized media
├── pages/                  # Additional views
└── .claude/                # AI configuration (if using Claude Code)
    └── settings.json       # Project-specific settings
```

### Phase 4: Security Configuration

Implement security from the start—AI can help you get this right:

```apache
# .htaccess - Security Headers
<IfModule mod_headers.c>
    # Content Security Policy
    Header set Content-Security-Policy "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; form-action 'none'; base-uri 'none';"

    # Force HTTPS
    Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

    # Prevent clickjacking
    Header set X-Frame-Options "DENY"

    # Prevent MIME sniffing
    Header set X-Content-Type-Options "nosniff"

    # Referrer policy
    Header set Referrer-Policy "strict-origin-when-cross-origin"

    # Permissions policy
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
```

### Phase 5: Hosting Options (Vendor Agnostic)

Deploy anywhere—this project has no vendor dependencies:

#### Static Hosting (Simplest)
| Provider | Free Tier | Custom Domain | SSL |
|----------|-----------|---------------|-----|
| GitHub Pages | Yes | Yes | Yes |
| Netlify | Yes | Yes | Yes |
| Vercel | Yes | Yes | Yes |
| Cloudflare Pages | Yes | Yes | Yes |
| Render | Yes | Yes | Yes |

#### Traditional Hosting
| Type | Examples | Best For |
|------|----------|----------|
| Shared | Any web host | Simple sites |
| VPS | DigitalOcean, Linode, Vultr | Full control |
| Cloud | AWS S3, Google Cloud, Azure | Scale |

#### Deployment Commands

```bash
# GitHub Pages
git push origin main
# Configure in repo Settings > Pages

# Netlify (CLI)
npm install -g netlify-cli
netlify deploy --prod

# Vercel (CLI)
npm install -g vercel
vercel --prod

# Manual FTP/SFTP
# Use FileZilla or any FTP client
# Upload all files to public_html or www
```

---

## The Praxis Workflow

How we perfected this project through AI adoption:

### 1. Start With What You Know

You don't need AI to have ideas. You need AI to execute them at a higher level than you could alone.

```
Human: "I have a website with prompt examples. It works, but it's not
        polished. Security could be better. Design is inconsistent."

AI: "Let me analyze what you have and suggest improvements..."
```

### 2. Iterate Toward Perfection

The magic happens in the back-and-forth:

```
Human: "The charts don't animate smoothly."
AI: [Proposes CSS transition changes]
Human: "Better, but they violate our Content Security Policy."
AI: [Refactors to use data attributes instead of inline styles]
Human: "Now they work. Apply this pattern everywhere."
AI: [Updates all chart implementations site-wide]
```

### 3. Maintain Your Standards

AI learns your project's standards and enforces them:

```
Human: "Every page needs the same CSP header, same branding, same
        security posture."
AI: [Audits all files, identifies inconsistencies, applies fixes]
```

### 4. Document As You Go

AI can explain what it's doing and why:

```
Human: "Generate a security report for what we've implemented."
AI: [Creates comprehensive SECURITY-REPORT.md with all findings]
```

---

## Technical Architecture

### What We Achieved

| Aspect | Implementation | Result |
|--------|----------------|--------|
| Security | Strict CSP, no inline scripts/styles | A+ rating |
| Performance | Zero external dependencies | 100% score |
| Accessibility | Semantic HTML, skip links, ARIA | WCAG compliant |
| Maintainability | CSS utility classes, organized structure | Easy updates |

### Design Principles

1. **No External Dependencies** - Everything self-hosted
2. **Security First** - CSP before features
3. **Mobile First** - Responsive from the start
4. **Accessibility Always** - Semantic, navigable, readable

### Browser Support

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- Mobile browsers (iOS Safari, Chrome Android)

---

## Getting Started With This Repository

### Clone and Explore

```bash
git clone https://github.com/basrosario/PROMPTLIBRARY.git
cd PROMPTLIBRARY
```

### Run Locally

```bash
# Option 1: VS Code Live Server
# Right-click index.html > "Open with Live Server"

# Option 2: Python simple server
python -m http.server 8000

# Option 3: Node http-server
npx http-server
```

### Make It Your Own

1. Fork this repository
2. Replace content with your own
3. Update branding (colors in `styles.css` CSS variables)
4. Deploy to your preferred host

---

## Key Takeaways

### For Individuals
- AI doesn't replace your expertise—it amplifies it
- Start with what you know, let AI help you perfect it
- The iteration loop is where quality emerges

### For Teams
- Establish standards early, let AI enforce them
- Document decisions as you make them
- Use AI to maintain consistency across large codebases

### For Organizations
- AI adoption is about augmentation, not replacement
- The human brings vision and judgment; AI brings execution speed
- Superior results require both human insight and AI capability

---

## Resources

### AI Development Tools
- [Claude Code](https://claude.ai/claude-code) - AI coding assistant
- [GitHub Copilot](https://github.com/features/copilot) - AI pair programmer
- [Cursor](https://cursor.sh/) - AI-native code editor
- [Continue.dev](https://continue.dev/) - Open source AI assistant

### Testing & Verification
- [Mozilla Observatory](https://observatory.mozilla.org) - Security testing
- [SecurityHeaders.com](https://securityheaders.com) - Header verification
- [GTmetrix](https://gtmetrix.com) - Performance analysis
- [WAVE](https://wave.webaim.org/) - Accessibility testing

### Learning
- [MDN Web Docs](https://developer.mozilla.org) - Web standards
- [web.dev](https://web.dev) - Modern best practices
- [Anthropic Docs](https://docs.anthropic.com) - Claude documentation

---

## License

**Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**

You may:
- Use this as a learning resource
- Build your own version
- Share with attribution

You must:
- Give appropriate credit
- Not use commercially without permission

See [LICENSE](LICENSE) for full terms.

---

<div align="center">

**Praxis AI - Prompt Engineering Example Library**

*We didn't build this from nothing. We perfected what we knew with what AI could do.*

*The future belongs to those who combine human insight with AI capability.*

</div>
