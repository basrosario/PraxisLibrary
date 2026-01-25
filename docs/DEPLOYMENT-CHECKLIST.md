# Website Deployment Checklist

## Files to Upload to Server

Upload ALL of the following files and directories to your web server:

### Core Files
- ✓ `index.html`
- ✓ `library.html`
- ✓ `security.html`
- ✓ `styles.css` **(CRITICAL - Make sure this uploads completely!)**
- ✓ `app.js`
- ✓ `.htaccess`
- ✓ `me2.png`

### Icons Directory (NEW)
- ✓ `Icons/README.md`
- ✓ `Icons/SVG/linkedin.svg`
- ✓ `Icons/SVG/email.svg`
- ✓ `Icons/SVG/arrow-right.svg`
- ✓ `Icons/SVG/arrow-left.svg`
- ✓ `Icons/SVG/home.svg`

## After Upload - Testing Checklist

### 1. Clear Browser Cache
```
Chrome/Edge: Ctrl + Shift + Delete → Clear cached images and files
Firefox: Ctrl + Shift + Delete → Cached Web Content
Safari: Cmd + Option + E
```

### 2. Force Refresh the Page
```
Windows: Ctrl + F5 or Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### 3. Desktop Version Tests
- [ ] Sidebar has dark gradient background (black to dark gray)
- [ ] Brand area shows "< /BASILISOROSARIO >" in white text with red accent
- [ ] Navigation items are light gray and turn red on hover
- [ ] Hero section shows profile image on left, content on right
- [ ] Hero content text is BLACK (not white/invisible)
- [ ] Red accent elements are visible throughout

### 4. Mobile Version Tests (Screen < 768px)
- [ ] Hamburger menu button visible in top-left (three red horizontal lines)
- [ ] Sidebar collapses to thin top bar (60px height)
- [ ] Clicking hamburger opens full-screen menu
- [ ] Menu slides down smoothly with dark backdrop
- [ ] Clicking menu items closes the menu
- [ ] Clicking backdrop (dark area) closes the menu

### 5. Check Browser Console
Open Developer Tools (F12) and check for:
- [ ] No 404 errors for styles.css
- [ ] No 404 errors for SVG icons
- [ ] No CSP violations

## Common Issues & Solutions

### Issue: Styles Not Loading
**Symptoms:** White sidebar, black text, no formatting
**Solutions:**
1. Verify `styles.css` uploaded completely (should be ~1002 lines, ~20KB)
2. Clear browser cache and hard refresh (Ctrl + Shift + R)
3. Check file permissions on server (should be 644)
4. Verify MIME type is set to `text/css`

### Issue: Mobile Menu Not Working
**Symptoms:** Hamburger button doesn't respond or menu doesn't open
**Solutions:**
1. Verify `app.js` uploaded completely
2. Check browser console for JavaScript errors
3. Clear cache and hard refresh

### Issue: Icons Not Showing
**Symptoms:** Broken image icons or missing graphics
**Solutions:**
1. Verify entire `Icons/` directory uploaded
2. Check that subdirectory `Icons/SVG/` exists
3. Verify all 5 SVG files are present

## File Sizes Reference
- styles.css: ~20 KB
- app.js: ~4.6 KB
- index.html: ~3.6 KB
- library.html: ~38 KB
- security.html: ~13 KB

## Changes Made (Latest Update)

1. **Fixed mobile menu positioning and z-index conflicts**
2. **Fixed hamburger button animation for proper X formation**
3. **Fixed hero-content text color** (was white on white, now black)
4. **Created missing Icons directory with all required SVG files**
5. **Improved mobile menu backdrop coverage and opacity**

## Support

If issues persist after uploading and clearing cache:
1. Check server error logs
2. Verify .htaccess is being processed (mod_headers enabled)
3. Test in multiple browsers
4. Use browser dev tools Network tab to verify all files load with 200 status
