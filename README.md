<div align="center"> # PROMPTLIBRARY - </ OpenBas > </div>

<div align="center">

![This Website Was](https://img.shields.io/badge/This_Website_Was-555555?style=for-the-badge) ![Created](https://img.shields.io/badge/CREATED-D71920?style=for-the-badge) ![With](https://img.shields.io/badge/WITH-4CAF50?style=for-the-badge) ![UD](https://img.shields.io/badge/UD-2196F3?style=for-the-badge) ![In](https://img.shields.io/badge/IN-FFD700?style=for-the-badge) ![Mind](https://img.shields.io/badge/MIND-9C27B0?style=for-the-badge)

![Security Grade](https://img.shields.io/badge/Security-A+_100%25-success?style=for-the-badge)
![Performance](https://img.shields.io/badge/Performance-100%25-success?style=for-the-badge)
![Structure](https://img.shields.io/badge/Structure-100%25-success?style=for-the-badge)
![Mobile Optimized](https://img.shields.io/badge/Mobile-Optimized-blue?style=for-the-badge)

**A professional portfolio and prompt engineering library showcasing security-first design and enterprise-grade implementation**

[Live Demo](https://basiliso-rosario.com) | [Security Report](https://basiliso-rosario.com/Security/security.html) | [Documentation](#table-of-contents)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Project Roadmap](#project-roadmap)
  - [Phase 1: Prerequisites & Setup](#phase-1-prerequisites--setup)
  - [Phase 2: Development Environment](#phase-2-development-environment)
  - [Phase 3: Website Development](#phase-3-website-development)
  - [Phase 4: Security Implementation](#phase-4-security-implementation)
  - [Phase 5: Version Control & GitHub](#phase-5-version-control--github)
  - [Phase 6: Hosting & Deployment](#phase-6-hosting--deployment)
  - [Phase 7: CI/CD & Auto-Deployment](#phase-7-cicd--auto-deployment)
  - [Phase 8: Performance Optimization](#phase-8-performance-optimization)
- [Technology Stack](#technology-stack)
- [Security Posture](#security-posture)
- [Project Structure](#project-structure)
- [License](#license)
- [Author](#author)

---

## Overview

This project is a **security-hardened personal portfolio and prompt engineering library** that demonstrates:

- Enterprise-grade security implementation (A+ ratings across all testing platforms)
- Mobile-first responsive design with desktop-like UX
- Professional UI/UX with zero external dependencies
- Comprehensive prompt engineering library with real-world examples
- Privacy-conscious architecture (no tracking, no analytics, no cookies)

This README serves as a **complete roadmap** documenting every tool, technology, and step used to build, secure, and deploy this website from scratch.

---

## Project Roadmap

This section documents the chronological journey of building this project. Each phase builds on the previous one - you must complete earlier phases before moving to later ones.

---

### Phase 1: Prerequisites & Setup

**You need these BEFORE you can begin development.**

#### 1.1 Domain Name

| Item | Details |
|------|---------|
| **What** | Register a domain name |
| **Provider Used** | Hostinger |
| **Domain** | basiliso-rosario.com |
| **Why First** | You need a domain before you can configure hosting, SSL, or DNS |

#### 1.2 Web Hosting Account

| Item | Details |
|------|---------|
| **What** | Web hosting with file storage and server access |
| **Provider Used** | Hostinger (Premium Web Hosting) |
| **Features Needed** | PHP support (optional), SSL certificates, .htaccess support, File Manager |
| **Why First** | You need hosting before you can upload files or configure security headers |

#### 1.3 SSL Certificate

| Item | Details |
|------|---------|
| **What** | SSL/TLS certificate for HTTPS |
| **Provider Used** | Hostinger (Free SSL with hosting) |
| **Type** | Let's Encrypt (auto-renewal) |
| **Why First** | Security headers like HSTS require HTTPS to function |

---

### Phase 2: Development Environment

**Set up your local development tools.**

#### 2.1 Visual Studio Code (VS Code)

| Item | Details |
|------|---------|
| **What** | Code editor for writing HTML, CSS, JavaScript |
| **Download** | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Why** | Industry-standard editor with excellent extensions and Git integration |

**Recommended VS Code Extensions:**
- Live Server - Local development server with auto-reload
- Prettier - Code formatting
- GitLens - Enhanced Git integration
- HTML CSS Support - Autocomplete for HTML/CSS

#### 2.2 Git

| Item | Details |
|------|---------|
| **What** | Version control system |
| **Download** | [git-scm.com](https://git-scm.com/) |
| **Why** | Track changes, collaborate, and deploy via GitHub |

**Basic Git Configuration:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 2.3 Claude Code (AI Development Assistant)

| Item | Details |
|------|---------|
| **What** | AI-powered coding assistant CLI tool by Anthropic |
| **Install** | `npm install -g @anthropic-ai/claude-code` |
| **Requires** | Node.js 18+, Anthropic API key |
| **Why** | Accelerates development with AI assistance for coding, debugging, and refactoring |

**How Claude Code Was Used in This Project:**
- Writing and refactoring HTML/CSS/JavaScript
- Implementing security headers in .htaccess
- Debugging responsive design issues
- Creating documentation
- Git commit management
- Performance optimization recommendations

#### 2.4 Web Browser with DevTools

| Item | Details |
|------|---------|
| **What** | Modern browser for testing |
| **Recommended** | Chrome, Firefox, or Edge |
| **Why** | DevTools for debugging, network inspection, responsive testing |

---

### Phase 3: Website Development

**Build the actual website files.**

#### 3.1 Project Initialization

```bash
# Create project directory
mkdir PROMPTLIBRARY
cd PROMPTLIBRARY

# Initialize Git repository
git init

# Create initial file structure
mkdir Security Icons Fonts
mkdir Icons/SVG
```

#### 3.2 Core Files Created

| File | Purpose |
|------|---------|
| `index.html` | Home/Profile page with personal bio and CTA |
| `library.html` | Prompt engineering library with categorized prompts |
| `styles.css` | Master stylesheet with responsive breakpoints |
| `app.js` | JavaScript for navigation, copy functionality, accordions |
| `Security/security.html` | Security posture and test results showcase |
| `Security/site-use-policy.html` | Legal framework and privacy policy |

#### 3.3 Design Principles Applied

- **Mobile-First**: Design for mobile, then enhance for larger screens
- **No External Dependencies**: All fonts, icons, and scripts self-hosted
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **CSS Grid/Flexbox**: Modern layout techniques
- **Progressive Enhancement**: Core functionality works without JavaScript

#### 3.4 Responsive Breakpoints

| Breakpoint | Target | Grid Columns |
|------------|--------|--------------|
| 1025px+ | Desktop | 5-6 columns |
| 769px - 1024px | Tablet | 2 columns |
| 481px - 768px | Mobile | 1 column |
| ≤480px | Small Mobile | 1 column (compressed) |

---

### Phase 4: Security Implementation

**Implement enterprise-grade security headers.**

#### 4.1 Understanding .htaccess

The `.htaccess` file configures Apache server behavior. This is where security headers are implemented.

#### 4.2 Security Headers Implemented

```apache
# Content Security Policy - Strict allowlists
Header set Content-Security-Policy "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none';"

# HTTP Strict Transport Security - Force HTTPS for 1 year
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# Prevent clickjacking
Header set X-Frame-Options "DENY"

# Prevent MIME type sniffing
Header set X-Content-Type-Options "nosniff"

# Referrer Policy - Privacy protection
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Permissions Policy - Restrict browser APIs
Header set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
```

#### 4.3 Browser Caching for Performance

```apache
# Cache static assets for 1 year
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

#### 4.4 Security Testing

| Platform | URL | What It Tests |
|----------|-----|---------------|
| Mozilla Observatory | [observatory.mozilla.org](https://observatory.mozilla.org) | Security headers, CSP |
| SecurityHeaders.com | [securityheaders.com](https://securityheaders.com) | Header implementation |
| SSL Labs | [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/) | TLS/SSL configuration |
| GTmetrix | [gtmetrix.com](https://gtmetrix.com) | Performance, caching |

---

### Phase 5: Version Control & GitHub

**Set up GitHub for code hosting and collaboration.**

#### 5.1 Create GitHub Account

| Item | Details |
|------|---------|
| **URL** | [github.com](https://github.com) |
| **Account Type** | Free (sufficient for this project) |

#### 5.2 Create Repository

1. Go to GitHub → Click "New repository"
2. Repository name: `PROMPTLIBRARY`
3. Set to Public or Private
4. Do NOT initialize with README (we have local files)

#### 5.3 Connect Local Repository to GitHub

```bash
# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/PROMPTLIBRARY.git

# Stage all files
git add -A

# Initial commit
git commit -m "Initial commit: Portfolio and prompt library"

# Push to GitHub
git push -u origin main
```

#### 5.4 Git Workflow Used

```bash
# Check status before changes
git status

# Stage specific files
git add filename.html

# Or stage all changes
git add -A

# Commit with descriptive message
git commit -m "fix: Update security headers for A+ rating"

# Push to remote
git push origin main
```

---

### Phase 6: Hosting & Deployment

**Upload files to Hostinger and configure the live site.**

#### 6.1 Manual Deployment (Initial)

1. Log into **Hostinger hPanel**
2. Go to **Files** → **File Manager**
3. Navigate to `public_html`
4. Upload all project files maintaining directory structure

#### 6.2 Verify Deployment

- Visit your domain (e.g., https://basiliso-rosario.com)
- Hard refresh: `Ctrl + Shift + R`
- Check browser console for errors (F12 → Console)

#### 6.3 DNS Configuration (if needed)

| Record Type | Name | Value |
|-------------|------|-------|
| A | @ | Hostinger IP address |
| CNAME | www | yourdomain.com |

---

### Phase 7: CI/CD & Auto-Deployment

**Set up automatic deployment from GitHub to Hostinger.**

#### 7.1 Why Auto-Deployment?

- Push to GitHub → Automatically updates live site
- No manual file uploads needed
- Version history maintained
- Rollback capability

#### 7.2 Generate SSH Key in Hostinger

1. Log into **Hostinger hPanel**
2. Go to **Advanced** → **Git**
3. Click **Create** or **Manage**
4. Hostinger generates an SSH public key
5. Copy the SSH key (starts with `ssh-rsa`)

#### 7.3 Add Deploy Key to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Deploy keys**
3. Click **Add deploy key**
4. Title: `Hostinger Auto Deploy`
5. Paste the SSH key from Hostinger
6. Check "Allow write access" (optional)
7. Click **Add key**

#### 7.4 Configure Git Repository in Hostinger

1. In Hostinger hPanel → **Git**
2. Repository URL: `git@github.com:YOUR_USERNAME/PROMPTLIBRARY.git`
3. Branch: `main`
4. Directory: `public_html`
5. Click **Create**
6. Enable **Auto deployment**

#### 7.5 Deployment Workflow (After Setup)

```bash
# Local: Make changes and commit
git add -A
git commit -m "Update: New feature added"
git push origin main

# Hostinger automatically pulls changes
# Live site updates within seconds
```

---

### Phase 8: Performance Optimization

**Achieve high performance scores.**

#### 8.1 Image Optimization

| Image | Original Size | Optimized Size | Savings |
|-------|---------------|----------------|---------|
| me2.png | 4.4 MB | ~40 KB | 99% |
| Screenshots | 200-500 KB | 70-350 KB | 30-50% |

**Tools for Image Optimization:**
- [TinyPNG](https://tinypng.com) - PNG/JPEG compression
- [Squoosh](https://squoosh.app) - Advanced compression with preview
- ImageMagick (CLI) - Batch processing

#### 8.2 Browser Caching

Added 1-year cache headers for static assets (see Phase 4).

#### 8.3 Performance Results (GTmetrix)

| Metric | Score |
|--------|-------|
| Performance | 100% |
| Structure | 100% |
| Largest Contentful Paint | 628ms |
| Total Blocking Time | 0ms |
| Cumulative Layout Shift | 0 |

---

## Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup |
| CSS3 | Responsive design, Grid/Flexbox |
| Vanilla JavaScript | DOM manipulation, no frameworks |
| SVG Icons | Scalable, self-hosted graphics |

### Development Tools
| Tool | Purpose |
|------|---------|
| VS Code | Code editor |
| Claude Code | AI development assistant |
| Git | Version control |
| Chrome DevTools | Debugging and testing |

### Hosting & Infrastructure
| Service | Purpose |
|---------|---------|
| Hostinger | Web hosting |
| GitHub | Code repository |
| Let's Encrypt | SSL certificates |
| Apache | Web server (.htaccess) |

---

## Security Posture

### Test Results

| Platform | Grade | Focus Area |
|----------|-------|------------|
| Mozilla Observatory | A+ | Security Headers |
| SecurityHeaders.com | A+ | Header Implementation |
| SSL Labs | A+ | TLS Configuration |
| GTmetrix | A | Performance & Structure |

### Security Philosophy

1. **Least Privilege** - Only minimum required browser capabilities permitted
2. **Defense in Depth** - Multiple overlapping security controls
3. **Predictability** - Explicit configuration and deterministic behavior
4. **Visibility** - Security posture openly documented and verifiable

---

## Project Structure

```
PROMPTLIBRARY/
├── index.html                  # Home/Profile page
├── library.html                # Prompt engineering library
├── styles.css                  # Master stylesheet
├── app.js                      # JavaScript functionality
├── .htaccess                   # Security headers & caching
├── me2.png                     # Profile image (optimized)
├── README.md                   # This documentation
├── LICENSE                     # Project license
│
├── Security/
│   ├── security.html           # Security posture & test results
│   ├── site-use-policy.html    # Legal framework
│   ├── mozilla-observatory.png # Test screenshot
│   ├── securityheaders.png     # Test screenshot
│   ├── ssl-labs.png            # Test screenshot
│   └── gtmetrixscan.png        # Test screenshot
│
├── Icons/SVG/                  # Self-hosted SVG icons
│   ├── arrow-left.svg
│   ├── chevron-right.svg
│   ├── linkedin.svg
│   ├── email.svg
│   └── [additional icons]
│
└── .github/
    └── copilot-instructions.md # AI assistant context
```

---

## Quick Start Guide

### For New Developers

1. **Prerequisites**: Get hosting account, domain, and SSL certificate
2. **Development**: Install VS Code and Git
3. **Clone**: `git clone https://github.com/basrosario/PROMPTLIBRARY.git`
4. **Local Development**: Open with Live Server extension in VS Code
5. **Deploy**: Push to GitHub → Auto-deploys to Hostinger

### For Existing Developers

```bash
# Clone the repository
git clone https://github.com/basrosario/PROMPTLIBRARY.git
cd PROMPTLIBRARY

# Make changes
# ...

# Commit and push
git add -A
git commit -m "Your commit message"
git push origin main
```

---

## License

This project is released under the **MIT License** with additional terms for personal content.

**You MAY:**
- Use this code as a template for your own portfolio
- Modify and customize the design and functionality
- Learn from the security implementation
- Reference the prompt engineering structure

**You MUST:**
- Replace all personal information (name, photo, bio, LinkedIn, email)
- Replace prompt engineering examples with your own content
- Update the domain and hosting information
- Customize the branding and color scheme

**Attribution Requirement:**
- If any content from this project is used for purposes other than personal use (including educational, commercial, professional, or public presentation contexts), you MUST provide proper attribution to Basiliso Rosario and link to https://basiliso-rosario.com
- Attribution must clearly indicate if the original content was modified

**You SHOULD NOT:**
- Copy the personal content or prompt examples verbatim
- Use Basiliso Rosario's name, image, or professional information
- Claim this specific portfolio as your own work
- Use content for non-personal purposes without proper attribution

See [LICENSE](LICENSE) for full details.

---

## Author

**Basiliso Rosario** - Creator & Developer

- Domain: A domain name is your URL (e.g., `website.com`). You need this BEFORE you can begin development. See [Phase 1: Prerequisites](#phase-1-prerequisites--setup) for details.
- LinkedIn: [linkedin.com/in/basiliso-rosario](https://www.linkedin.com/in/basiliso-rosario/)
- Email: bas.rosario@gmail.com

This project was designed, developed, and implemented by Basiliso Rosario. All HTML, CSS, JavaScript, security configurations, and architectural decisions were authored by the creator.

---

## Acknowledgments

- **Claude Code** by Anthropic - AI assistance for code refinement and documentation
- **Hostinger** - Web hosting and deployment
- **GitHub** - Version control and repository hosting
- **Security Testing Platforms** - Mozilla Observatory, SecurityHeaders.com, SSL Labs, GTmetrix

---

<div align="center">

**Built with security, performance, and documentation in mind**

[Back to Top](#promptlibrary---prompt-engineering-library----openbas-)

</div>
