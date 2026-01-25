# 🤝 Contributing to Security-First Portfolio

**Thank you for your interest in contributing!**

This project serves as both a personal portfolio and an educational resource for security-first web development. We welcome contributions that improve security, accessibility, performance, and documentation.

**Accessibility Note:** This guide uses clear headings, step-by-step instructions, checklists, and visual indicators to help all contributors.

---

## 📋 Table of Contents

- [Quick Start](#-quick-start-for-contributors)
- [Ways to Contribute](#-ways-to-contribute)
- [Pull Request Process](#-pull-request-process)
- [Code Standards](#-code-standards)
- [Testing Requirements](#-testing-requirements)
- [Getting Help](#-getting-help)

---

## ⚡ Quick Start for Contributors

**New to contributing? Follow these 3 steps:**

### 1️⃣ Setup Your Environment

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR-USERNAME/PROMPTLIBRARY.git
cd PROMPTLIBRARY
```

### 2️⃣ Create a Branch

```bash
# Choose a descriptive name
git checkout -b feature/your-improvement
```

### 3️⃣ Read the Git Guide

📖 **See our accessible Git workflow guide:** [docs/GIT-WORKFLOW-GUIDE.md](docs/GIT-WORKFLOW-GUIDE.md)
- Step-by-step instructions
- Troubleshooting tips
- Best practices

---

## 🎯 Ways to Contribute

### 🔒 Security Enhancements (Priority)

**We especially welcome:**
- Additional security headers
- Content Security Policy (CSP) improvements
- Security test automation
- Vulnerability fixes

**How to contribute:**
1. Test the security improvement locally
2. Verify A+ rating maintained on all security tests
3. Document the security benefit clearly

---

### ♿ Accessibility Improvements (High Priority)

**Areas we value:**
- WCAG 2.1 AA/AAA compliance enhancements
- Screen reader optimization
- Keyboard navigation improvements
- Color contrast fixes
- Alternative text for images
- ARIA label improvements

**How to contribute:**
1. Test with screen readers (NVDA, JAWS, VoiceOver)
2. Verify keyboard-only navigation
3. Test with accessibility tools (axe, WAVE, Lighthouse)

**Resources:**
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist)

---

### ⚡ Performance Optimizations

**Welcome improvements:**
- Loading time reductions
- Mobile performance enhancements
- CSS/JS optimization (while maintaining readability)
- Image optimization strategies

**How to contribute:**
1. Test with Lighthouse/PageSpeed Insights
2. Provide before/after metrics
3. Ensure changes don't break functionality

---

### 📚 Documentation

**Highly valued contributions:**
- Setup guides for different platforms
- Security implementation tutorials
- Deployment guides (Netlify, Vercel, traditional hosting)
- Accessibility documentation
- Code comments for complex sections
- Translation to other languages

**How to contribute:**
1. Follow Universal Design for Learning (UDL) principles
2. Include step-by-step instructions
3. Add visual aids where helpful
4. Test instructions with fresh perspective

---

### 🚫 What NOT to Contribute

**Please avoid:**
- ❌ Personal content changes (name, bio, photos, contact info)
- ❌ Prompt engineering examples (personal intellectual property)
- ❌ Major branding/color scheme changes (fork instead)
- ❌ External dependencies or frameworks
- ❌ Changes that violate Content Security Policy

**Why:** This maintains the project's security-first philosophy and template nature.

---

## 🔄 Pull Request Process

### Step-by-Step Guide

#### 1️⃣ Fork & Clone

**On GitHub:**
- Click "Fork" button (top right)
- Clone your fork to your computer

```bash
git clone https://github.com/YOUR-USERNAME/PROMPTLIBRARY.git
cd PROMPTLIBRARY
```

---

#### 2️⃣ Create Feature Branch

**Use descriptive branch names:**

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/add-dark-mode` |
| Bug Fix | `fix/description` | `fix/mobile-menu-overlap` |
| Documentation | `docs/description` | `docs/setup-guide-windows` |
| Security | `security/description` | `security/improve-csp` |
| Accessibility | `a11y/description` | `a11y/screen-reader-labels` |

```bash
git checkout -b feature/your-improvement
```

---

#### 3️⃣ Make Your Changes

**Follow these guidelines:**

✅ **DO:**
- Follow existing code style (see [Code Standards](#-code-standards))
- Maintain CSP compliance (no inline styles/scripts)
- Test across browsers (Chrome, Firefox, Safari)
- Add comments for complex logic
- Update documentation if needed

❌ **DON'T:**
- Break existing functionality
- Add external dependencies
- Use inline styles or scripts
- Ignore accessibility requirements

---

#### 4️⃣ Test Thoroughly

**Use the testing checklist below** → [Testing Requirements](#-testing-requirements)

---

#### 5️⃣ Commit Your Changes

**Write clear commit messages:**

```bash
# Good examples
git commit -m "feat: Add keyboard shortcuts for navigation"
git commit -m "fix: Resolve mobile menu overlap on iPad"
git commit -m "docs: Add Windows setup guide"
git commit -m "a11y: Improve screen reader labels for forms"

# Poor examples (avoid these)
git commit -m "changes"
git commit -m "fixed stuff"
git commit -m "update"
```

**Commit message format:**
```
[type]: Brief description (50 chars max)

Detailed explanation if needed (wrap at 72 chars)

- List specific changes
- Include issue number if applicable (#123)
```

---

#### 6️⃣ Push to Your Fork

```bash
git push origin feature/your-improvement
```

---

#### 7️⃣ Create Pull Request

**On GitHub:**

1. Go to your fork
2. Click "Compare & pull request"
3. Fill out the PR template:

**Required information:**
- **Title:** Clear, concise description
- **Problem:** What issue does this solve?
- **Solution:** How did you solve it?
- **Testing:** How did you test it?
- **Screenshots:** If UI changes (before/after)
- **Checklist:** Complete the testing checklist

**Example PR description:**
```markdown
## Problem
Mobile menu overlaps content on iPad viewport (768px - 1024px)

## Solution
- Adjusted z-index for mobile menu
- Added proper media query for tablet range
- Tested across multiple devices

## Testing
- ✅ Tested on iPad Air (Safari)
- ✅ Tested Chrome DevTools responsive mode
- ✅ Verified no CSP violations
- ✅ Keyboard navigation still works

## Screenshots
[Before] [After]
```

---

#### 8️⃣ Respond to Feedback

- **Be open to suggestions** - reviewers help improve the code
- **Ask questions** if feedback is unclear
- **Make requested changes** in your branch
- **Push updates** - PR updates automatically

---

#### 9️⃣ After Merge

```bash
# Switch back to master
git checkout master

# Pull the updated code
git pull origin master

# Delete your feature branch (optional)
git branch -d feature/your-improvement
```

---

## 📏 Code Standards

### HTML

**Requirements:**
- ✅ Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`)
- ✅ Accessible markup (proper heading hierarchy, alt text, ARIA labels)
- ✅ Valid HTML (test with [W3C Validator](https://validator.w3.org/))
- ❌ No inline styles (CSP violation)
- ❌ No inline scripts (CSP violation)

**Example:**
```html
<!-- Good -->
<nav aria-label="Main navigation">
  <a href="index.html">Home</a>
</nav>

<!-- Bad -->
<div onclick="doSomething()" style="color: red;">Click me</div>
```

---

### CSS

**Requirements:**
- ✅ External stylesheet only (CSP compliance)
- ✅ Mobile-first responsive design
- ✅ Consistent naming conventions (kebab-case)
- ✅ Comments for complex selectors
- ❌ No !important unless absolutely necessary
- ❌ No inline styles

**Example:**
```css
/* Good */
.nav-item {
    display: block;
    padding: 0.5rem 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
    .nav-item {
        display: inline-block;
    }
}

/* Bad */
.navItem { /* Use kebab-case, not camelCase */
    color: red !important; /* Avoid !important */
}
```

---

### JavaScript

**Requirements:**
- ✅ Vanilla JavaScript (no jQuery, React, etc.)
- ✅ External .js files only (CSP compliance)
- ✅ Clear variable/function names
- ✅ Comments for complex logic
- ✅ ES6+ syntax where supported
- ❌ No inline event handlers
- ❌ No eval() or similar

**Example:**
```javascript
// Good
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', handleCopyClick);
    });
}

// Bad
// <button onclick="copy()"> - inline handler violates CSP
```

---

### Security

**Critical requirements:**
- 🔒 Maintain A+ security ratings on all tests
- 🔒 No inline styles or scripts (CSP)
- 🔒 No external CDNs or third-party scripts
- 🔒 No hardcoded credentials or API keys
- 🔒 Validate and sanitize any user input

**Test security:**
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [SecurityHeaders.com](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

---

## ✅ Testing Requirements

### Pre-Submission Checklist

**Before submitting your PR, verify:**

#### Security
- [ ] No Content Security Policy (CSP) violations in browser console
- [ ] All security headers still return A+ rating
- [ ] No inline styles or scripts added
- [ ] No external dependencies introduced

#### Browser Compatibility
- [ ] Works in Chrome (latest)
- [ ] Works in Firefox (latest)
- [ ] Works in Safari (latest)
- [ ] Works in Edge (latest)

#### Responsive Design
- [ ] Mobile (375px width) - iPhone SE
- [ ] Tablet (768px width) - iPad
- [ ] Desktop (1024px width) - Laptop
- [ ] Large Desktop (1920px width) - Desktop monitor

#### Accessibility
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader tested (NVDA, JAWS, or VoiceOver)
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Focus indicators visible

#### Functionality
- [ ] No JavaScript errors in console
- [ ] All links work correctly
- [ ] Forms submit/validate properly
- [ ] Copy buttons function
- [ ] Mobile menu opens/closes

#### Performance
- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score 100 (Accessibility)
- [ ] Lighthouse score 100 (Best Practices)
- [ ] Lighthouse score 100 (SEO)

---

### Testing Tools

**Recommended tools:**

**Browser DevTools:**
- Press F12 to open
- Check Console for errors
- Use Responsive Design Mode
- Run Lighthouse audit

**Accessibility:**
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Security:**
- Browser console for CSP violations
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [SecurityHeaders.com](https://securityheaders.com/)

---

## 🆘 Getting Help

### Before Asking

**Try these first:**
1. ✅ Read [docs/GIT-WORKFLOW-GUIDE.md](docs/GIT-WORKFLOW-GUIDE.md)
2. ✅ Check [docs/](docs/) folder for relevant guides
3. ✅ Search existing [GitHub Issues](https://github.com/Leafmebe/PROMPTLIBRARY/issues)
4. ✅ Review [README.md](README.md) and [SETUP.md](SETUP.md)

---

### How to Ask

**When you need help:**

**Option 1 - Open an Issue:**
- Go to [GitHub Issues](https://github.com/Leafmebe/PROMPTLIBRARY/issues)
- Click "New Issue"
- Provide:
  - Clear description of the problem
  - Steps to reproduce
  - Expected vs actual behavior
  - Your environment (OS, browser, etc.)
  - Screenshots if applicable

**Option 2 - Email:**
- Send to: [bas.rosario@gmail.com](mailto:bas.rosario@gmail.com)
- Include same information as above
- For security issues: Use "SECURITY:" in subject line

---

### Reporting Security Vulnerabilities

**⚠️ IMPORTANT: Responsible Disclosure**

If you find a security vulnerability:

1. **DO NOT** open a public issue
2. **Email** [bas.rosario@gmail.com](mailto:bas.rosario@gmail.com) with:
   - Subject: "SECURITY: [Brief Description]"
   - Detailed description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if you have one)

3. **Wait for response** before public disclosure
4. **We will:**
   - Acknowledge within 48 hours
   - Provide timeline for fix
   - Credit you (if desired) once patched

---

## 🏆 Recognition

**Contributors will be:**
- Listed in project credits
- Mentioned in release notes
- Credited in commit messages

**Top contributors may be asked to become maintainers!**

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

Your contributions must:
- ✅ Be your original work
- ✅ Not violate any third-party rights
- ✅ Be licensed under MIT

---

## 🙏 Thank You

Every contribution helps make this project better for everyone. Whether you fix a typo, improve documentation, or add a major feature, your effort is appreciated!

**Questions?** Open an issue or email [bas.rosario@gmail.com](mailto:bas.rosario@gmail.com)

---

**Version:** 2.0 (Accessibility Enhanced)
**Last Updated:** January 2026
**Maintained by:** Basiliso Rosario
