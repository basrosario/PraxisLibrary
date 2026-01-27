<div align="center"><h1># Praxis Interactive AI Library</h1></div>

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

## The Mission

I created this Interactive AI Library because I believe that true innovation in AI isn't just about companies adopting AI as a new technology—it's about **people** learning about, adapting to, and adopting Artificial Intelligence into their daily lives to empower and unlock their own human potential.

> **"The best way to predict the future is to create it."**

My mission is to demystify AI use and drive personal adoption, with the goal of creating collaborative environments where technology and human creativity combine to solve complex problems and build a better tomorrow.

### What This Project Represents

This isn't just a prompt library—it's a demonstration of what happens when human expertise meets AI capability:

- **50+ carefully crafted prompts** across education, business, and service industries
- **Enterprise-grade security** achieved through human-AI collaboration
- **Accessible design** built with Universal Design principles
- **A reproducible workflow** that anyone can follow

---

## Getting Started: Your AI Development Environment

This guide walks you through setting up the same tools and workflow used to create this project. No vendor lock-in—choose what works for you.

### Step 1: Choose Your Code Editor

| Editor | Platform | Why Choose It |
|--------|----------|---------------|
| [VS Code](https://code.visualstudio.com/) | All | Most popular, extensive extensions |
| [Cursor](https://cursor.sh/) | All | AI-native with built-in assistance |
| [Zed](https://zed.dev/) | Mac/Linux | Fast, collaborative, AI-ready |
| [Sublime Text](https://www.sublimetext.com/) | All | Lightweight, fast |
| [Neovim](https://neovim.io/) | All | Terminal-based, customizable |

**Recommended VS Code Extensions:**
- Live Server (local preview)
- GitLens (version control)
- Prettier (formatting)
- HTML CSS Support

### Step 2: Set Up Version Control

```bash
# Install Git
# Windows: Download from https://git-scm.com/
# Mac: xcode-select --install
# Linux: sudo apt install git

# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Initialize a new project
git init
git add .
git commit -m "Initial commit"
```

### Step 3: Choose Your AI Assistant

Pick the AI that fits your workflow. This project uses Claude Code, but the principles apply universally.

#### Option A: Claude Code (Used Here)

```bash
# Install via npm
npm install -g @anthropic-ai/claude-code

# Or via Homebrew (Mac)
brew install claude-code

# Run in your project directory
cd your-project
claude
```

**Best for:** Deep code understanding, security-aware refactoring, iterative improvement

#### Option B: GitHub Copilot

```bash
# Install via VS Code extension marketplace
# Search: "GitHub Copilot"
# Requires GitHub account and subscription
```

**Best for:** Inline completions, quick suggestions, IDE integration

#### Option C: Cursor AI

```bash
# Download from https://cursor.sh/
# AI features built directly into the editor
```

**Best for:** All-in-one solution, natural language commands

#### Option D: Self-Hosted / Open Source

```bash
# Ollama - Run local models
curl -fsSL https://ollama.com/install.sh | sh
ollama pull codellama
ollama pull mistral

# Continue.dev - Open source IDE extension
# Install from VS Code marketplace
```

**Best for:** Privacy, no API costs, offline capability

### Step 4: Organize Your Project

```
project/
├── index.html              # Entry point
├── styles.css              # Centralized styles
├── app.js                  # Application logic
├── .htaccess               # Server configuration
├── README.md               # Documentation
├── LICENSE                 # Usage terms
├── assets/
│   ├── fonts/              # Self-hosted typography
│   ├── icons/SVG/          # Vector icons
│   └── images/             # Optimized media
├── pages/                  # Additional views
└── .claude/                # AI configuration (optional)
    └── settings.json
```

### Step 5: Implement Security From the Start

Add this to your `.htaccess` file:

```apache
<IfModule mod_headers.c>
    # Content Security Policy - Block unsafe resources
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

### Step 6: Deploy Your Project

#### Static Hosting (Free Options)

| Provider | Custom Domain | SSL | Deploy Method |
|----------|---------------|-----|---------------|
| GitHub Pages | Yes | Yes | `git push` |
| Netlify | Yes | Yes | `netlify deploy` |
| Vercel | Yes | Yes | `vercel --prod` |
| Cloudflare Pages | Yes | Yes | Git integration |
| Render | Yes | Yes | Git integration |

#### Quick Deploy Commands

```bash
# GitHub Pages
git push origin main
# Then enable in repo Settings > Pages

# Netlify
npm install -g netlify-cli
netlify deploy --prod

# Vercel
npm install -g vercel
vercel --prod
```

---

## The Human-AI Workflow

This is how the collaboration actually works:

### 1. You Bring the Vision

AI doesn't have your ideas. You set the direction.

```
Human: "I want to create a prompt library that helps people
        across different industries adopt AI in their work."

AI: "I can help structure that. What industries are you
     thinking about?"
```

### 2. Iterate Together

The magic is in the back-and-forth:

```
Human: "The education section needs prompts for teachers."
AI: [Creates initial prompts]
Human: "Good, but they need to address grading and feedback too."
AI: [Expands and refines]
Human: "Now make sure they follow our design system."
AI: [Applies consistent styling]
```

### 3. Let AI Handle the Details

You focus on what matters; AI handles the tedious parts:

```
Human: "Apply this same security header to all 26 pages."
AI: [Updates every file, maintains consistency]
```

### 4. Review and Refine

AI proposes, you decide:

```
Human: "Generate a security audit report."
AI: [Creates comprehensive SECURITY-REPORT.md]
Human: "Fix these three issues you found."
AI: [Implements fixes across all affected files]
```

---

## What We Built Together

| Aspect | Human Contribution | AI Contribution |
|--------|-------------------|-----------------|
| **Vision** | Industry selection, user needs | Structure and organization |
| **Content** | Prompt concepts, domain knowledge | Writing, formatting, consistency |
| **Design** | Color choices, branding direction | CSS implementation, responsiveness |
| **Security** | Requirements and standards | Implementation, auditing, fixes |
| **Accessibility** | UD/UDL principles | ARIA labels, semantic HTML |

### Technical Achievements

| Metric | Result |
|--------|--------|
| Security Grade | A+ (100%) |
| Performance | 100% |
| Inline Scripts | 0 |
| Inline Styles | 0 |
| External Dependencies | 0 |
| Pages | 26+ |
| Prompts | 50+ |

---

## Clone and Explore

```bash
git clone https://github.com/basrosario/PROMPTLIBRARY.git
cd PROMPTLIBRARY

# Run locally
# Option 1: VS Code Live Server extension
# Option 2: Python
python -m http.server 8000
# Option 3: Node
npx http-server
```

---

## Key Takeaways

### For Individuals
- AI amplifies your expertise—it doesn't replace it
- Start with what you know; let AI help you execute better
- The iteration loop is where quality emerges

### For Teams
- Establish standards early; let AI enforce them
- Document decisions as you make them
- Use AI to maintain consistency at scale

### For Everyone
- AI adoption is about empowerment, not replacement
- The human brings judgment and creativity; AI brings speed and consistency
- Together, we build things neither could build alone

---

## Resources

### AI Development
- [Claude Code](https://claude.ai/claude-code)
- [GitHub Copilot](https://github.com/features/copilot)
- [Cursor](https://cursor.sh/)
- [Continue.dev](https://continue.dev/)

### Testing & Verification
- [Mozilla Observatory](https://observatory.mozilla.org) - Security
- [SecurityHeaders.com](https://securityheaders.com) - Headers
- [GTmetrix](https://gtmetrix.com) - Performance
- [WAVE](https://wave.webaim.org/) - Accessibility

### Learning
- [MDN Web Docs](https://developer.mozilla.org)
- [web.dev](https://web.dev)
- [Anthropic Docs](https://docs.anthropic.com)

---

## License

**Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**

You may use this as a learning resource, build your own version, and share with attribution. Commercial use requires permission.

See [LICENSE](LICENSE) for full terms.

---

<div align="center">

**Praxis Interactive AI Library**

*Human creativity. AI capability. Better outcomes.*

*The future belongs to those who learn to work alongside AI.*

</div>
