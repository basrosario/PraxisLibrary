# 🚀 Quick Setup Guide

**Get your secure portfolio running in under 10 minutes**

**Accessibility Note:** This guide provides step-by-step instructions with visual progress indicators, multiple deployment options, and troubleshooting help. Each step includes verification checkpoints.

---

## 📋 Table of Contents

- [Before You Begin](#-before-you-begin)
- [Quick Start](#-quick-start-checklist)
- [Step 1: Get the Code](#-step-1-get-the-code)
- [Step 2: Customize Content](#-step-2-customize-content)
- [Step 3: Customize Colors](#-step-3-customize-colors-optional)
- [Step 4: Test Locally](#-step-4-test-locally)
- [Step 5: Deploy](#-step-5-deploy)
- [Step 6: Verify Security](#-step-6-verify-security)
- [Troubleshooting](#-troubleshooting)
- [Next Steps](#-next-steps)

---

## ✅ Before You Begin

**What You'll Need:**

**Required:**
- ✓ Text editor ([VS Code](https://code.visualstudio.com/) recommended)
- ✓ Git installed ([Download here](https://git-scm.com/downloads))
- ✓ Basic HTML/CSS knowledge (beginner-friendly)

**Optional:**
- ✓ GitHub account (for easy deployment)
- ✓ FTP client (for traditional hosting)

**Estimated Time:** 5-10 minutes for basic setup

---

## 🎯 Quick Start Checklist

**Track your progress as you go:**

- [ ] **Step 1:** Clone repository
- [ ] **Step 2:** Replace personal info (name, photo, bio)
- [ ] **Step 3:** Change brand color (optional)
- [ ] **Step 4:** Test locally on your computer
- [ ] **Step 5:** Deploy to hosting platform
- [ ] **Step 6:** Verify A+ security ratings

**Current Progress:** 0/6 steps complete

---

## 📥 Step 1: Get the Code

**Goal:** Download the template to your computer

### Option A: Command Line (Recommended)

**Open your terminal/command prompt and run:**

```bash
# Clone the repository
git clone https://github.com/Leafmebe/PROMPTLIBRARY.git

# Navigate into the folder
cd PROMPTLIBRARY
```

### Option B: GitHub Website

1. Go to [github.com/Leafmebe/PROMPTLIBRARY](https://github.com/Leafmebe/PROMPTLIBRARY)
2. Click green "Code" button
3. Click "Download ZIP"
4. Extract the ZIP file to a folder

---

### ✅ Verify Step 1

**Check that you have:**
- [ ] A folder named `PROMPTLIBRARY` on your computer
- [ ] Files inside: `index.html`, `styles.css`, `app.js`
- [ ] Folders: `Security/`, `Icons/`, `Fonts/`

**Having trouble?** See [Troubleshooting](#-troubleshooting) section below.

**Progress:** ✅ 1/6 steps complete

---

## ✏️ Step 2: Customize Content

**Goal:** Replace template content with your information

**Time Estimate:** 5 minutes

---

### A. Personal Information

**File to edit:** `index.html`

**Open in your text editor and find these lines:**

#### 1. Profile Image (Line 59)

**Find this:**
```html
<img src="me2.png" alt="Profile Photo">
```

**Change to:**
- Replace `me2.png` with your photo file
- **Recommended specs:** 800x800px, under 500KB
- **Supported formats:** JPG, PNG, WebP

**Example:**
```html
<img src="my-photo.jpg" alt="Your Name">
```

---

#### 2. Your Name (Line 65)

**Find this:**
```html
<h1>HI I'M <span class="text-red">YOUR NAME</span></h1>
```

**Change to your name:**
```html
<h1>HI I'M <span class="text-red">JANE DOE</span></h1>
```

---

#### 3. Bio Section (Lines 68-75)

**Find this:**
```html
<span class="quote-highlight">
    <span class="text-red">Favorite Quote</span> :
    <strong>"Your quote here"</strong>
</span>
<p>Your bio paragraph...</p>
```

**Customize with:**
- Your favorite quote
- 2-3 sentence bio describing your professional background

**Example:**
```html
<span class="quote-highlight">
    <span class="text-red">Favorite Quote</span> :
    <strong>"Code is poetry"</strong>
</span>
<p>Full-stack developer with 5 years experience in web security
and modern JavaScript frameworks.</p>
```

---

#### 4. Contact Links (Lines 43-47)

**Find this:**
```html
<a href="https://linkedin.com/in/your-profile">LinkedIn</a>
<a href="mailto:your@email.com">Contact</a>
```

**Change to your links:**
```html
<a href="https://linkedin.com/in/janedoe">LinkedIn</a>
<a href="mailto:jane@example.com">Contact</a>
```

---

### B. Security Page Details

**File to edit:** `Security/security.html`

#### 1. Domain Name (Line 58)

**Find this:**
```html
<span><strong>Domain:</strong> your-domain.com</span>
```

**Change to your domain:**
```html
<span><strong>Domain:</strong> janedoe.com</span>
```

---

#### 2. Review Date (Lines 60-61)

**Find this:**
```html
<span><strong>Last Reviewed:</strong> January 2026</span>
```

**Update to current month/year:**
```html
<span><strong>Last Reviewed:</strong> March 2026</span>
```

---

### ✅ Verify Step 2

**Check that you changed:**
- [ ] Profile image filename and alt text
- [ ] Your name in the heading
- [ ] Bio and quote
- [ ] LinkedIn and email links
- [ ] Domain name in security page
- [ ] Review date

**Save all files** (Ctrl+S or Cmd+S)

**Progress:** ✅ 2/6 steps complete

---

## 🎨 Step 3: Customize Colors (Optional)

**Goal:** Change the red accent color to match your brand

**Time Estimate:** 2 minutes

**File to edit:** `styles.css`

---

### Color Change Instructions

**Use your editor's Find & Replace:**

1. Open `styles.css`
2. Press `Ctrl+H` (Windows) or `Cmd+H` (Mac)
3. **Find:** `#D71920`
4. **Replace with:** Your brand color

---

### Popular Brand Colors

| Color | Hex Code | Preview |
|-------|----------|---------|
| **Red** (default) | `#D71920` | 🔴 Current |
| **Blue** | `#0066CC` | 🔵 Professional |
| **Green** | `#00AA55` | 🟢 Fresh |
| **Purple** | `#8B5CF6` | 🟣 Creative |
| **Orange** | `#FF6B35` | 🟠 Energetic |
| **Teal** | `#14B8A6` | 🔷 Modern |

**Example:**
```css
/* Before */
color: #D71920;

/* After (blue) */
color: #0066CC;
```

---

### ✅ Verify Step 3

**Check that:**
- [ ] All 20+ instances of `#D71920` were replaced
- [ ] File saved successfully
- [ ] New color looks good to you

**Tip:** You can always change it back!

**Progress:** ✅ 3/6 steps complete

---

## 🧪 Step 4: Test Locally

**Goal:** View your site on your computer before deploying

**Time Estimate:** 2 minutes

**Choose one method below** (all work the same):

---

### Option A: Python (Easiest - No Installation)

**Works on:** Windows, Mac, Linux

**Steps:**
1. Open terminal in your project folder
2. Run this command:
   ```bash
   python -m http.server 8000
   ```
3. Open browser to: [http://localhost:8000](http://localhost:8000)

**Stop server:** Press `Ctrl+C` in terminal

---

### Option B: VS Code Live Server (Recommended for Beginners)

**Steps:**
1. Open VS Code
2. Install "Live Server" extension (one-time setup)
3. Right-click `index.html`
4. Select "Open with Live Server"
5. Site opens automatically in your default browser

**Benefit:** Auto-refreshes when you save changes!

---

### Option C: Node.js http-server

**Requires:** Node.js installed

**Steps:**
1. Open terminal in project folder
2. Run:
   ```bash
   npx http-server -p 8000
   ```
3. Open browser to: [http://localhost:8000](http://localhost:8000)

---

### ✅ Verify Step 4

**Test these things:**

- [ ] Homepage loads without errors
- [ ] Your name and photo appear correctly
- [ ] Navigation links work (Home, Security, Library)
- [ ] Security page loads and shows your domain
- [ ] Colors look correct
- [ ] No console errors (press F12 → Console tab)

**Found an issue?** See [Troubleshooting](#-troubleshooting)

**Progress:** ✅ 4/6 steps complete

---

## 🚀 Step 5: Deploy

**Goal:** Publish your site to the internet

**Time Estimate:** 5-15 minutes (varies by platform)

**Choose your deployment method:**

---

### Method A: Netlify (Recommended - Easiest)

**Pros:** Free HTTPS, automatic deploys, beginner-friendly

**Steps:**

1. **Push to GitHub** (if you haven't already)
   ```bash
   git add .
   git commit -m "Initial setup with my content"
   git push origin master
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select "GitHub" and authorize
   - Choose your repository
   - Click "Deploy site"
   - **Done!** Your site is live in ~30 seconds

3. **Optional - Custom Domain:**
   - Netlify provides: `random-name.netlify.app`
   - Add custom domain in Site Settings → Domain Management

**Total time:** 5 minutes

---

### Method B: Vercel (Great for Developers)

**Pros:** Excellent performance, free HTTPS, Git integration

**Steps:**

1. **Push to GitHub** (see Method A step 1)

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - **Done!** Site live in ~1 minute

3. **Add Custom Domain:**
   - Go to Project Settings → Domains
   - Add your domain and follow DNS instructions

**Total time:** 5 minutes

---

### Method C: Traditional Hosting (cPanel/FTP)

**Pros:** Full control, works with any web host

**Requirements:**
- Web hosting account
- FTP credentials (from your host)
- FTP client ([FileZilla](https://filezilla-project.org/) recommended)

**Steps:**

1. **Connect via FTP:**
   - Open FileZilla
   - Enter: Host, Username, Password, Port
   - Click "Connect"

2. **Upload Files:**
   - Navigate to `public_html` or `www` folder (varies by host)
   - Upload ALL project files and folders
   - **Important:** Ensure `.htaccess` uploads (it's hidden!)

3. **Verify Upload:**
   - Check that `index.html` is in the root
   - Verify all folders uploaded (Security, Icons, Fonts)

4. **Enable mod_headers (Apache only):**
   - Contact your host or use cPanel
   - Ensure `mod_headers` module is enabled
   - Needed for security headers to work

**Total time:** 10-15 minutes

---

### ✅ Verify Step 5

**Test your live site:**

- [ ] Site loads at your domain
- [ ] All pages accessible (Home, Security, Library)
- [ ] Images display correctly
- [ ] Links work (internal and external)
- [ ] No broken resources (check browser console)
- [ ] Mobile view works (test on phone)

**Progress:** ✅ 5/6 steps complete

---

## 🔐 Step 6: Verify Security

**Goal:** Confirm A+ security ratings

**Time Estimate:** 3 minutes

**Why this matters:** The template's security features only work if configured correctly. These tests verify everything is set up properly.

---

### Run These 3 Tests

**Replace `your-domain.com` with your actual domain:**

#### Test 1: Mozilla Observatory

**URL:** [https://observatory.mozilla.org](https://observatory.mozilla.org)

**Steps:**
1. Enter your domain
2. Click "Scan Me"
3. Wait 30 seconds for results

**Expected:** A+ grade
**What it checks:** Security headers, CSP, HSTS

---

#### Test 2: SecurityHeaders.com

**URL:** [https://securityheaders.com](https://securityheaders.com)

**Steps:**
1. Enter: `https://your-domain.com`
2. Click "Scan"
3. Review results

**Expected:** A+ grade
**What it checks:** All security headers present

---

#### Test 3: SSL Labs

**URL:** [https://www.ssllabs.com/ssltest/](https://www.ssllabs.com/ssltest/)

**Steps:**
1. Enter your domain
2. Click "Submit"
3. Wait 2-3 minutes for detailed scan

**Expected:** A+ grade
**What it checks:** TLS configuration, certificate, cipher suites

---

### ✅ Verify Step 6

**Security checklist:**

- [ ] Mozilla Observatory: A+ ✅
- [ ] SecurityHeaders.com: A+ ✅
- [ ] SSL Labs: A+ ✅
- [ ] No warnings about missing headers
- [ ] CSP working (no violations in console)

**All green?** Congratulations! You have an enterprise-grade secure site! 🎉

**Seeing errors?** See [Troubleshooting](#-troubleshooting) below.

**Progress:** ✅ 6/6 steps complete! 🎊

---

## 🆘 Troubleshooting

**Common issues and solutions:**

---

### Issue: Security Headers Not Working

**Symptom:** Security tests show missing headers

**Possible Causes:**
- `.htaccess` file not uploaded (it's hidden!)
- Server doesn't support `.htaccess` (Nginx servers)
- Apache `mod_headers` module not enabled

**Solutions:**

**For Apache Servers:**
1. Verify `.htaccess` exists in root directory
2. Check file permissions: `644` (rw-r--r--)
3. Contact host to enable `mod_headers` module
4. Test with: `curl -I https://your-domain.com`

**For Nginx Servers:**
1. `.htaccess` won't work (Apache only)
2. Add security headers to Nginx config
3. See [docs/SECURITY-TESTS-SETUP.md](docs/SECURITY-TESTS-SETUP.md) for Nginx configuration

---

### Issue: Styles Not Loading

**Symptom:** Site appears unstyled/plain HTML

**Possible Causes:**
- File path incorrect
- Browser cache showing old version
- CSS file didn't upload

**Solutions:**

1. **Hard Refresh:**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Check File Path:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for 404 errors
   - Verify `<link rel="stylesheet" href="styles.css">` is correct

3. **Verify Upload:**
   - Check `styles.css` exists in root folder
   - File size should be ~32KB
   - Re-upload if missing

---

### Issue: Images Not Displaying

**Symptom:** Broken image icons or alt text shown

**Possible Causes:**
- Image file not uploaded
- Incorrect file path
- Case sensitivity (Linux servers)

**Solutions:**

1. **Check File Names:**
   - Use exact case: `me2.png` not `Me2.PNG`
   - No spaces in filenames
   - Use only: letters, numbers, dash, underscore

2. **Verify Upload:**
   - Confirm image file in correct folder
   - Check file size (should be visible, not 0KB)

3. **Check HTML:**
   - Verify `src="filename.jpg"` matches actual file
   - Check alt text exists: `alt="Description"`

---

### Issue: CSP Violations in Console

**Symptom:** Browser console shows Content Security Policy errors

**Possible Causes:**
- Added inline styles (`style="..."`)
- Added inline scripts (`onclick="..."`)
- Loading external resources (CDNs)

**Solutions:**

**Rule 1:** No inline styles
```html
<!-- Bad -->
<div style="color: red;">Text</div>

<!-- Good -->
<div class="text-red">Text</div>
```

**Rule 2:** No inline scripts
```html
<!-- Bad -->
<button onclick="doSomething()">Click</button>

<!-- Good -->
<button class="my-button">Click</button>
<!-- Add event listener in app.js -->
```

**Rule 3:** No external resources
```html
<!-- Bad -->
<script src="https://cdn.example.com/library.js"></script>

<!-- Good -->
<!-- Download library and host it yourself in your project -->
<script src="js/library.js"></script>
```

---

### Issue: Mobile Menu Not Working

**Symptom:** Menu doesn't open when clicking hamburger icon

**Possible Causes:**
- JavaScript file not loaded
- Console errors blocking execution

**Solutions:**

1. **Check JavaScript Loads:**
   - View page source
   - Confirm `<script src="app.js"></script>` exists
   - Verify `app.js` uploaded successfully

2. **Check Console:**
   - Press F12 → Console
   - Look for JavaScript errors (red text)
   - Fix any errors shown

---

### Issue: Local Server Won't Start

**Symptom:** "Port already in use" or similar error

**Solutions:**

1. **Different Port:**
   ```bash
   # Try port 8001 instead
   python -m http.server 8001
   ```

2. **Stop Existing Server:**
   - Close other terminal windows
   - Or press `Ctrl+C` in terminal running server

---

### Still Stuck?

**Get help:**

📧 **Email:** [bas.rosario@gmail.com](mailto:bas.rosario@gmail.com)
- Include: What you're trying to do, error messages, screenshots

🐛 **GitHub Issues:** [github.com/Leafmebe/PROMPTLIBRARY/issues](https://github.com/Leafmebe/PROMPTLIBRARY/issues)
- Search existing issues first
- Provide detailed description

📚 **Documentation:** [docs/](docs/)
- Check relevant guide files
- See [GIT-WORKFLOW-GUIDE.md](docs/GIT-WORKFLOW-GUIDE.md) for Git help

---

## 🎯 Next Steps

**Your site is live! Consider these enhancements:**

### Immediate Actions
- [ ] **Custom Domain:** Add your own domain name
- [ ] **Email Setup:** Configure email forwarding (contact@yourdomain.com)
- [ ] **Analytics:** Add privacy-friendly analytics if needed (must maintain CSP)
- [ ] **Lighthouse Audit:** Run performance test (aim for 90+ score)

### Content Expansion
- [ ] **About Page:** Add dedicated about/resume page
- [ ] **Projects Page:** Showcase your work/portfolio items
- [ ] **Blog:** Add articles or case studies
- [ ] **Contact Form:** Implement secure contact functionality

### Technical Improvements
- [ ] **Image Optimization:** Compress images (<500KB each recommended)
- [ ] **CDN:** Consider Cloudflare for performance (optional)
- [ ] **HSTS Preload:** Submit domain to [hstspreload.org](https://hstspreload.org)
- [ ] **Monitoring:** Set up uptime monitoring
- [ ] **Backups:** Implement automated backups

### SEO & Discoverability
- [ ] **Meta Tags:** Add OpenGraph/Twitter card metadata
- [ ] **Sitemap:** Generate and submit XML sitemap
- [ ] **Google Search Console:** Verify and monitor site
- [ ] **Structured Data:** Add JSON-LD schema markup

---

## 📚 Additional Resources

**Official Guides:**
- [README.md](README.md) - Complete project documentation
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute improvements
- [docs/GIT-WORKFLOW-GUIDE.md](docs/GIT-WORKFLOW-GUIDE.md) - Git workflow help
- [docs/SECURITY-TESTS-SETUP.md](docs/SECURITY-TESTS-SETUP.md) - Security testing details

**External Resources:**
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/) - Security best practices
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security) - Mozilla security docs
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards

---

## ✅ Completion Checklist

**Verify you completed everything:**

- [ ] Repository cloned or downloaded
- [ ] Personal info customized (name, photo, bio, links)
- [ ] Security page updated (domain, dates)
- [ ] Colors changed (if desired)
- [ ] Tested locally successfully
- [ ] Deployed to hosting platform
- [ ] A+ security ratings achieved on all 3 tests
- [ ] Mobile view tested and working
- [ ] No console errors

**All checked?** You're done! Share your secure portfolio with the world! 🌟

---

**Setup Time:** 5-10 minutes for basic setup, 15-20 with deployment

**Questions?** Email [bas.rosario@gmail.com](mailto:bas.rosario@gmail.com)

[← Back to Main README](README.md)

---

**Version:** 2.0 (Accessibility Enhanced)
**Last Updated:** January 2026
**Follows:** Universal Design for Learning (UDL) principles
