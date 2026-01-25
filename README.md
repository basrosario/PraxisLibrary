# 🔒 Security-First Portfolio Template

<div align="center">

![Security Grade](https://img.shields.io/badge/Security-A+-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A security-hardened, privacy-conscious portfolio template with enterprise-grade implementation**

[Live Demo](https://basiliso-rosario.com) · [Quick Start](#-quick-start) · [Security Guide](#-security-implementation) · [Documentation](docs/)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Quick Start](#-quick-start)
- [Features](#-features)
- [Security Implementation](#-security-implementation)
- [Customization Guide](#-customization-guide)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

This is a **production-ready portfolio template** designed with security-first principles. Unlike typical portfolio templates, this achieves **A+ security ratings** across all major testing platforms while maintaining excellent performance and user experience.

### What Makes This Different?

✨ **Zero External Dependencies**
- No CDNs, no third-party scripts, 100% self-hosted
- Reduces supply chain risk and improves privacy

🔒 **Enterprise-Grade Security**
- Strict Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- Comprehensive security headers
- TLS 1.3 with modern cipher suites

📱 **Mobile-First Design**
- 40% reduction in mobile scrolling vs typical portfolios
- Touch-optimized interactions (44px+ tap targets)
- Responsive from 375px to 4K displays

🎨 **Professional Polish**
- Dark gradient sidebar with customizable accent color
- Smooth animations and transitions
- Copy-to-clipboard functionality
- Print-friendly layouts

---

## ⚡ Quick Start

### Prerequisites

- A text editor (VS Code recommended)
- Basic knowledge of HTML/CSS
- A web server for testing (optional: Python's `http.server`, Live Server extension)

### Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/Leafmebe/PROMPTLIBRARY.git
   cd PROMPTLIBRARY
   ```

2. **Customize your content**
   ```bash
   # Replace personal information
   - Edit index.html (name, bio, photo)
   - Edit Security/security.html (domain info)
   - Add your own content to library.html
   ```

3. **Test locally**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or use VS Code Live Server extension
   # Open in browser: http://localhost:8000
   ```

4. **Deploy** (see [Deployment Guide](#-deployment))

---

## ✨ Features

### Core Functionality

| Feature | Description | Use Case |
|---------|-------------|----------|
| **Portfolio Page** | Professional profile with bio and CTA | Personal branding |
| **Security Showcase** | Live security test results | Demonstrate security skills |
| **Content Library** | Organized content with tab navigation | Knowledge sharing, tutorials |
| **Mobile Navigation** | Hamburger menu with smooth animations | Mobile UX |
| **Copy-to-Clipboard** | One-click copy for code/text blocks | User convenience |

### Design Features

- ✅ **Dark gradient sidebar** with professional aesthetics
- ✅ **Red accent theme** (easily customizable to any color)
- ✅ **Responsive grid layouts** (6-column desktop → 1-column mobile)
- ✅ **Tablet-optimized** (dedicated 769px-1024px breakpoint)
- ✅ **SVG icons** (scalable, fast-loading, self-hosted)

### Security Features

| Feature | Implementation | Benefit |
|---------|---------------|---------|
| **Content Security Policy** | `default-src 'none'` | Prevents XSS attacks |
| **HSTS** | 1-year enforcement | Forces HTTPS only |
| **X-Frame-Options** | DENY | Prevents clickjacking |
| **Permissions-Policy** | Restrictive | Limits browser APIs |
| **No Tracking** | Zero analytics/cookies | Privacy-conscious |

---

## 🔒 Security Implementation

This template achieves **A+ ratings** across:
- ✅ Mozilla Observatory
- ✅ SecurityHeaders.com
- ✅ SSL Labs
- ✅ GTmetrix (A grade)

### How It Works

#### 1. Content Security Policy (CSP)

**Location:** `.htaccess` (line 9) and HTML meta tags

```apache
Header set Content-Security-Policy "default-src 'none'; base-uri 'none'; font-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self';"
```

**What this does:**
- `default-src 'none'` - Block everything by default
- Only allow resources from your own domain (`'self'`)
- No inline scripts or styles (prevents XSS)
- No external resources (eliminates CDN supply chain risk)

**To customize:**
```apache
# If you need external fonts (not recommended):
font-src 'self' https://fonts.googleapis.com

# If you need external images:
img-src 'self' https://trusted-domain.com
```

#### 2. HSTS (HTTP Strict Transport Security)

**Location:** `.htaccess` (line 31)

```apache
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

**What this does:**
- Forces HTTPS for 1 year (31536000 seconds)
- Applies to all subdomains
- Eligible for browser preload lists

**⚠️ Important:** Only enable after HTTPS is working!

#### 3. Additional Security Headers

See `.htaccess` for full implementation:
- `X-Frame-Options: DENY` - Prevents iframe embedding
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referer information
- `Permissions-Policy` - Restricts browser features (camera, mic, etc.)

### Testing Your Security

After deployment, test at:
1. https://observatory.mozilla.org
2. https://securityheaders.com
3. https://www.ssllabs.com/ssltest/

**Expected Results:** A+ on all three platforms

---

## 🎨 Customization Guide

### Step 1: Replace Personal Content

#### index.html - Profile Page
```html
<!-- Line 59: Replace profile image -->
<img src="me2.png" alt="Your Name">

<!-- Line 65: Replace name -->
<h1 class="hero-title">HI I'M <span class="text-red">YOUR NAME</span></h1>

<!-- Lines 68-75: Replace bio -->
<span class="quote-highlight">
    <span class="text-red">Your Quote</span> :
    <strong>"Your favorite quote here"</strong>
</span>
<p>Your bio paragraph here...</p>
```

#### Security/security.html - Security Page
```html
<!-- Line 58: Replace domain -->
<span><strong>Domain:</strong> your-domain.com</span>

<!-- Update throughout with your own security test results -->
<!-- Upload your own screenshots to Security/ folder -->
```

### Step 2: Customize Colors

The red accent theme (`#D71920`) is used throughout. Change it globally:

**Find & Replace in styles.css:**
```css
/* Find: #D71920 */
/* Replace with your brand color */

Example colors:
- Professional Blue: #0066CC
- Tech Green: #00AA55
- Creative Purple: #8B5CF6
- Minimal Gray: #4B5563
```

**Locations to update:**
- `.text-red { color: #D71920; }`
- `background: #D71920;` (buttons, highlights)
- `border-left: 4px solid #D71920;` (active nav states)

### Step 3: Add Your Content

#### For a Blog/Tutorial Site:

Edit `library.html`:
```html
<!-- Add your navigation tabs -->
<div class="nav-item" data-tab="your-topic">Your Topic</div>

<!-- Add corresponding content sections -->
<div id="your-topic" class="tab-content">
    <h2>Your Content Title</h2>
    <p>Your content here...</p>
</div>
```

#### For a Project Portfolio:

Replace library.html entirely:
```html
<div class="projects-grid">
    <div class="project-card">
        <img src="project-screenshot.png" alt="Project">
        <h3>Project Name</h3>
        <p>Description of your project...</p>
        <a href="project-link" class="btn-primary">View Project</a>
    </div>
    <!-- Repeat for each project -->
</div>
```

### Step 4: Customize Navigation

**Current structure** (3 simple links):
```html
<a href="#" class="nav-item active">Home / Profile</a>
<a href="Security/security.html" class="nav-item">Security</a>
<a href="library.html" class="nav-item">Prompt Library</a>
```

**Add more pages:**
```html
<a href="about.html" class="nav-item">About</a>
<a href="projects.html" class="nav-item">Projects</a>
<a href="blog.html" class="nav-item">Blog</a>
<a href="contact.html" class="nav-item">Contact</a>
```

---

## 🚀 Deployment

### Option 1: Static Hosting (Easiest)

**Recommended Providers:**

| Provider | Pros | Best For |
|----------|------|----------|
| **Netlify** | Easiest setup, free HTTPS | Beginners |
| **Vercel** | Great DX, instant deploys | Developers |
| **GitHub Pages** | Free for public repos | Open source |
| **Cloudflare Pages** | Best CDN, fastest | Performance |

**Deployment Steps:**
1. Push code to GitHub/GitLab
2. Connect repository to hosting provider
3. Configure build settings (None needed - it's static!)
4. Deploy (usually automatic)
5. Add custom domain (optional)

**Netlify Example:**
```bash
# Install Netlify CLI (optional)
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option 2: Traditional Web Hosting

**Requirements:**
- Web server with HTTPS support
- Apache with `mod_headers` enabled (for `.htaccess`)
- FTP/SFTP access

**Steps:**
1. Upload all files via FTP/SFTP to `public_html` or `www` folder
2. Verify `.htaccess` file uploads (may be hidden)
3. Ensure file permissions are correct (644 for files, 755 for directories)
4. Test security headers at securityheaders.com
5. Clear browser cache and test live site

### Option 3: Docker (Advanced)

```dockerfile
FROM nginx:alpine

# Copy website files
COPY . /usr/share/nginx/html

# Copy nginx config with security headers
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
```

See [docs/DEPLOYMENT-CHECKLIST.md](docs/DEPLOYMENT-CHECKLIST.md) for detailed guides.

---

## 📁 Project Structure

```
portfolio-template/
├── .github/                  # GitHub-specific files
│   └── screenshots/          # Project screenshots
│
├── docs/                     # Documentation
│   ├── README.md             # Documentation index
│   ├── DEPLOYMENT-CHECKLIST.md
│   ├── UX-IMPROVEMENTS.md
│   ├── ACCORDION-REMOVAL-SUMMARY.md
│   ├── FIXES-SUMMARY.md
│   └── [other guides]
│
├── Fonts/                    # Self-hosted fonts
│
├── Icons/SVG/                # SVG icon library
│   ├── arrow-left.svg
│   ├── arrow-right.svg
│   ├── linkedin.svg
│   ├── email.svg
│   └── [28 total icons]
│
├── Security/                 # Security demonstration
│   ├── security.html         # Security overview & policy
│   ├── mozilla-observatory.png
│   ├── securityheaders.png
│   ├── ssl-labs.png
│   └── gtmetrix.png
│
├── .gitignore                # Git ignore rules
├── .htaccess                 # Security headers (Apache)
├── app.js                    # JavaScript functionality (6KB)
├── CONTRIBUTING.md           # Contribution guidelines
├── index.html                # Home/Profile page
├── library.html              # Content library page
├── LICENSE                   # MIT License
├── me2.png                   # Profile image (replace with yours!)
├── README.md                 # This file
└── styles.css                # Master stylesheet (32KB)
```

---

## 🎯 Use Cases

### ✅ This template is perfect for:

- **Security Professionals** - Showcase your security expertise
- **Web Developers** - Portfolio with technical credibility
- **IT Consultants** - Professional online presence
- **Educators/Tutors** - Share knowledge and tutorials
- **Privacy Advocates** - No-tracking alternative to typical portfolios
- **Job Seekers** - Stand out with security knowledge

### ❌ Not suitable for:

- Complex web applications (this is for static content)
- E-commerce sites (needs different architecture)
- High-frequency content updates (consider a CMS)
- Sites requiring user accounts or databases

---

## 🛠️ Development

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/Leafmebe/PROMPTLIBRARY.git
cd PROMPTLIBRARY

# Start local server (choose one method):

# Method 1: Python 3
python -m http.server 8000

# Method 2: Node.js
npx http-server -p 8000

# Method 3: PHP (if installed)
php -S localhost:8000

# Open browser
open http://localhost:8000
```

### Making Changes

1. **HTML changes** - Edit files, save, refresh browser
2. **CSS changes** - Edit `styles.css`, hard refresh (Ctrl+Shift+R)
3. **JS changes** - Edit `app.js`, clear cache if changes don't appear
4. **Test security** - Check DevTools Console for CSP violations

### Browser DevTools Checklist

Before deploying changes:
- [ ] No JavaScript errors in Console
- [ ] No CSP violations in Console
- [ ] All resources load from same origin ('self')
- [ ] Mobile responsive at 375px, 768px, 1024px
- [ ] Touch targets ≥44px on mobile (accessibility)
- [ ] Keyboard navigation works (Tab, Enter, Esc)

---

## 📊 Performance

### Current Metrics (Desktop)
- **Lighthouse Score:** 95-100
- **Page Load Time:** <1 second
- **First Contentful Paint:** <0.5s
- **Total Page Size:** ~50KB (excluding images)
- **HTTP Requests:** ~10 (all from same origin)

### Optimization Tips

**1. Optimize Images:**
```bash
# Profile photo should be <500KB
# Use WebP format for better compression
# Screenshots should be <200KB each

# Online tools:
# - TinyPNG.com
# - Squoosh.app
# - ImageOptim (Mac)
```

**2. Minify CSS (Production):**
```bash
# Install clean-css-cli
npm install -g clean-css-cli

# Minify
clean-css-cli styles.css -o styles.min.css

# Update HTML to reference styles.min.css
```

**3. Minify JavaScript (Production):**
```bash
# Install uglify-js
npm install -g uglify-js

# Minify
uglifyjs app.js -o app.min.js -c -m

# Update HTML to reference app.min.js
```

---

## 🧪 Testing

### Security Testing

**After deployment, test at these platforms:**

1. **Mozilla Observatory**
   - https://observatory.mozilla.org
   - Expected: A+ (100+ score)

2. **SecurityHeaders.com**
   - https://securityheaders.com
   - Expected: A+ rating

3. **SSL Labs**
   - https://www.ssllabs.com/ssltest/
   - Expected: A+ (90+ score)

4. **GTmetrix**
   - https://gtmetrix.com
   - Expected: A grade

### Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (Latest - Chromium)
- ✅ Firefox (Latest)
- ✅ Safari (Latest - Desktop & iOS)
- ✅ Samsung Internet (Android)
- ✅ Brave Browser

### Accessibility Testing

**WCAG 2.1 AA Compliance:**
- [ ] Screen reader navigation (test with NVDA/JAWS)
- [ ] Keyboard-only navigation (no mouse)
- [ ] Color contrast ratios (4.5:1 minimum)
- [ ] Touch target sizes (44x44px minimum)
- [ ] Form labels (if you add forms)
- [ ] Alt text for all images

**Tools:**
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Chrome Lighthouse (Accessibility audit)

---

## 📚 Learning Resources

### Included Documentation

All in the `docs/` folder:
- [Deployment Guide](docs/DEPLOYMENT-CHECKLIST.md) - Step-by-step upload instructions
- [UX Improvements](docs/UX-IMPROVEMENTS.md) - Mobile optimization techniques
- [Accordion Removal](docs/ACCORDION-REMOVAL-SUMMARY.md) - Navigation simplification
- [Fixes Summary](docs/FIXES-SUMMARY.md) - Bug fixes and solutions

### External Learning

**Security Deep Dives:**
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Scott Helme's Security Headers](https://securityheaders.com)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

**Web Performance:**
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals)
- [web.dev](https://web.dev/)

**Accessibility:**
- [A11Y Project](https://www.a11yproject.com/)
- [WebAIM](https://webaim.org/)

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Ways to Contribute:

- 🐛 **Report Bugs** - Open an issue with reproduction steps
- 🔒 **Security Issues** - Email bas.rosario@gmail.com (responsible disclosure)
- 📝 **Documentation** - Improve guides, fix typos
- ✨ **Features** - Suggest security or accessibility improvements
- 🎨 **Design** - Accessibility enhancements

### Quick Contribution Guide:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/improvement`)
3. Make changes (maintain CSP compliance!)
4. Test thoroughly
5. Submit Pull Request with clear description

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

### What This Means:

**✅ You CAN:**
- Use this code for personal or commercial projects
- Modify and customize the code
- Distribute your modified version
- Use this as a template for client work

**✅ You MUST:**
- Include the original copyright notice
- Include the MIT License text
- Replace all personal content (name, photos, bio)
- Replace sample content with your own

**⚠️ Attribution Requirement:**
- If content is used for **non-personal purposes** (educational, commercial, professional, or public presentations), you **MUST** provide proper attribution to **Basiliso Rosario** with a link to [basiliso-rosario.com](https://basiliso-rosario.com)
- Clearly indicate if the original content was modified

**❌ You CANNOT:**
- Hold the author liable for damages
- Use the author's name or personal content
- Claim you created the original template
- Use content for non-personal purposes without proper attribution

---

## 🙏 Acknowledgments

**Created by:** [Basiliso Rosario](https://basiliso-rosario.com)

**Inspired By:**
- OWASP Security Principles
- Mozilla Security Best Practices
- Modern Web Performance Guidelines

**Built With:**
- HTML5, CSS3, Vanilla JavaScript
- Self-designed SVG icons
- System fonts (for performance)
- Security testing: Mozilla Observatory, SecurityHeaders.com, SSL Labs

---

## 📞 Support & Contact

**Need Help? Have Questions?**

- 📧 **Email:** bas.rosario@gmail.com
- 💼 **LinkedIn:** [Basiliso Rosario](https://www.linkedin.com/in/basiliso-rosario/)
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/Leafmebe/PROMPTLIBRARY/issues)
- 💡 **Feature Requests:** [GitHub Discussions](https://github.com/Leafmebe/PROMPTLIBRARY/discussions)

---

<div align="center">

### ⭐ If this template helped you, please star the repository!

**Built with security, performance, and user experience as first priorities** 🚀

---

[⬆ Back to Top](#-security-first-portfolio-template)

</div>
