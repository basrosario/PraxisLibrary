<div align="center"><h1>< / OpenBas > PROMPTLIBRARY  <br> AI Engineering Prompting Library</h1></div>

<div align="center">

![</OpenBas>](https://img.shields.io/badge/%3C%2FOpenBas%3E-FFFFFF?style=for-the-badge&logoColor=black)![This Website Was](https://img.shields.io/badge/This_Website_Was-D71920?style=for-the-badge)![Created](https://img.shields.io/badge/CREATED-FF6600?style=for-the-badge)![With](https://img.shields.io/badge/WITH-FFD700?style=for-the-badge)![UD](https://img.shields.io/badge/UD-4CAF50?style=for-the-badge)![In](https://img.shields.io/badge/IN-2196F3?style=for-the-badge)![Mind](https://img.shields.io/badge/MIND-9C27B0?style=for-the-badge)

![Security Grade](https://img.shields.io/badge/Security-A+_100%25-success?style=for-the-badge&labelColor=2196F3)
![Performance](https://img.shields.io/badge/Performance-100%25-success?style=for-the-badge&labelColor=2196F3)
![Structure](https://img.shields.io/badge/Structure-100%25-success?style=for-the-badge&labelColor=2196F3)
![Mobile Optimized](https://img.shields.io/badge/Mobile-Optimized-success?style=for-the-badge&labelColor=2196F3)

**An AI engineering prompting library showcasing security-first design and enterprise-grade implementation**

</div>

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Implementation Roadmap](#implementation-roadmap)
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
- [Customization Guide](#customization-guide)
- [License](#license)

---

## Overview

This project is a **security-hardened portfolio and prompt engineering library** that demonstrates:

- Enterprise-grade security implementation (A+ ratings across all testing platforms)
- Mobile-first responsive design with desktop-like UX
- Professional UI/UX with zero external dependencies
- Comprehensive prompt engineering library with real-world examples across 15+ professional roles
- Privacy-conscious architecture (no tracking, no analytics, no cookies)
- CRISP, CRISPE, COSTAR, and ReAct prompt methodologies

This README serves as a **complete implementation guide** documenting every tool, technology, and step needed to build, secure, and deploy this website from scratch.

---

## Quick Start

### Clone and Customize

```bash
# Clone the repository
git clone https://github.com/basrosario/PROMPTLIBRARY.git
cd PROMPTLIBRARY

# Open in VS Code
code .

# Start local development server (using Live Server extension)
# Right-click index.html → "Open with Live Server"
```

### Customization Checklist

Before deploying, update these files with your information:

1. **index.html** - Replace profile name, bio, and contact links
2. **library.html** - Customize or expand prompt examples for your use case
3. **Security/site-use-policy.html** - Update legal information
4. **styles.css** - Modify brand colors if desired (#D71920 is the accent color)
5. **.htaccess** - Update domain-specific settings

---

## Implementation Roadmap

This section documents the chronological journey of building this project. Each phase builds on the previous one.

---

### Phase 1: Prerequisites & Setup

**Complete these BEFORE you begin development.**

#### 1.1 Domain Name

| Item | Details |
|------|---------|
| **What** | Register a domain name |
| **Example Providers** | Hostinger, Namecheap, GoDaddy, Cloudflare |
| **Your Domain** | `yourdomain.com` |
| **Why First** | You need a domain before you can configure hosting, SSL, or DNS |

#### 1.2 Web Hosting Account

| Item | Details |
|------|---------|
| **What** | Web hosting with file storage and server access |
| **Example Providers** | Hostinger, DigitalOcean, AWS, Netlify |
| **Features Needed** | SSL certificates, .htaccess support (Apache), File Manager |
| **Why First** | You need hosting before you can upload files or configure security headers |

#### 1.3 SSL Certificate

| Item | Details |
|------|---------|
| **What** | SSL/TLS certificate for HTTPS |
| **Options** | Let's Encrypt (free), Provider-included SSL |
| **Type** | Let's Encrypt (auto-renewal recommended) |
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
mkdir Security Icons GitHub Fonts
mkdir Icons/SVG
```

#### 3.2 Core Files

| File | Purpose |
|------|---------|
| `index.html` | Home/Profile page with personal bio and CTA |
| `library.html` | Prompt engineering library with categorized prompts |
| `styles.css` | Master stylesheet with responsive breakpoints |
| `app.js` | JavaScript for navigation, copy functionality, accordions |
| `Security/security.html` | Security posture and test results showcase |
| `Security/site-use-policy.html` | Legal framework and privacy policy |
| `GitHub/github-insights.html` | GitHub project insights and metrics |

#### 3.3 Design Principles

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

#### 4.2 Security Headers

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

#### 4.3 Browser Caching

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
git remote add origin https://github.com/basrosario/PROMPTLIBRARY.git

# Stage all files
git add -A

# Initial commit
git commit -m "Initial commit: Portfolio and prompt library"

# Push to GitHub
git push -u origin main
```

#### 5.4 Git Workflow

```bash
# Check status before changes
git status

# Stage specific files
git add filename.html

# Or stage all changes
git add -A

# Commit with descriptive message
git commit -m "feat: Add new feature description"

# Push to remote
git push origin main
```

---

### Phase 6: Hosting & Deployment

**Upload files to your hosting provider.**

#### 6.1 Manual Deployment (Initial)

1. Log into your hosting control panel
2. Go to **Files** → **File Manager**
3. Navigate to `public_html` (or your web root)
4. Upload all project files maintaining directory structure

#### 6.2 Verify Deployment

- Visit your domain (e.g., `https://yourdomain.com`)
- Hard refresh: `Ctrl + Shift + R`
- Check browser console for errors (F12 → Console)

#### 6.3 DNS Configuration (if needed)

| Record Type | Name | Value |
|-------------|------|-------|
| A | @ | Your hosting IP address |
| CNAME | www | yourdomain.com |

---

### Phase 7: CI/CD & Auto-Deployment

**Set up automatic deployment from GitHub to your hosting.**

#### 7.1 Why Auto-Deployment?

- Push to GitHub → Automatically updates live site
- No manual file uploads needed
- Version history maintained
- Rollback capability

#### 7.2 Setup Steps (Hostinger Example)

1. **Generate SSH Key in Hosting Panel**
   - Go to **Advanced** → **Git**
   - Click **Create** or **Manage**
   - Copy the generated SSH public key

2. **Add Deploy Key to GitHub**
   - Go to your GitHub repository → **Settings** → **Deploy keys**
   - Click **Add deploy key**
   - Paste the SSH key from your hosting
   - Click **Add key**

3. **Configure Git Repository in Hosting**
   - Repository URL: `git@github.com:basrosario/PROMPTLIBRARY.git`
   - Branch: `main`
   - Directory: `public_html`
   - Enable **Auto deployment**

#### 7.3 Deployment Workflow (After Setup)

```bash
# Local: Make changes and commit
git add -A
git commit -m "Update: New feature added"
git push origin main

# Hosting automatically pulls changes
# Live site updates within seconds
```

---

### Phase 8: Performance Optimization

**Achieve high performance scores.**

#### 8.1 Image Optimization

**Tools for Image Optimization:**
- [TinyPNG](https://tinypng.com) - PNG/JPEG compression
- [Squoosh](https://squoosh.app) - Advanced compression with preview
- ImageMagick (CLI) - Batch processing

**Target:** Reduce images by 50-99% without visible quality loss

#### 8.2 Browser Caching

Add 1-year cache headers for static assets (see Phase 4).

#### 8.3 Performance Targets

| Metric | Target |
|--------|--------|
| Performance | 90%+ |
| Structure | 90%+ |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |

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
| Web Hosting (Apache) | Server with .htaccess support |
| GitHub | Code repository |
| Let's Encrypt | SSL certificates |

---

## Security Posture

### Test Results (Achievable)

| Platform | Target Grade | Focus Area |
|----------|--------------|------------|
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
├── README.md                   # This documentation
├── LICENSE                     # Project license
│
├── assets/
│   ├── fonts/                  # Self-hosted web fonts
│   ├── icons/                  # SVG icons
│   │   └── SVG/
│   └── images/
│       ├── profile/            # Profile pictures
│       └── screenshots/
│           ├── github/         # GitHub insights screenshots
│           └── security/       # Security test screenshots
│
├── pages/
│   ├── github-insights.html    # GitHub project insights
│   ├── security.html           # Security posture & test results
│   └── site-use-policy.html    # Terms of use policy
│
└── .github/
    └── copilot-instructions.md # AI assistant context
```

---

## Customization Guide

### Changing Brand Colors

The primary accent color is `#D71920` (red). To change it:

1. Open `styles.css`
2. Search for `#D71920` and replace with your color
3. Update the `.text-red` utility class

### Adding New Roles to the Library

1. Add a new navigation item in `library.html` sidebar
2. Create a new `tab-content` section with matching `data-tab` ID
3. Follow the existing structure for CRISP/CRISPE/COSTAR/ReAct examples

### Updating Security Information

1. Run security tests on your deployed site
2. Take screenshots of results
3. Place in `Security/` directory
4. Update `Security/security.html` with your results

---

## License

This project is released under the **MIT License**.

**You MAY:**
- Use this code as a template for your own portfolio
- Modify and customize the design and functionality
- Learn from the security implementation
- Reference the prompt engineering structure

**You MUST:**
- Replace all personal information (name, photo, bio, contact info)
- Replace or customize prompt engineering examples
- Update the domain and hosting information
- Customize the branding and color scheme

See [LICENSE](LICENSE) for full details.

---

<div align="center">

**Built with security, performance, and accessibility in mind**

[Back to Top](#promptlibrary---ai-engineering-prompting-library)

</div>
