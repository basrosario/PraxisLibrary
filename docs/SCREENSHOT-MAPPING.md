# Security Test Screenshots - File Naming Guide

## Your Test Results → Screenshot Filenames

I've updated the security-tests.html page to match your actual test results. Here's how to save each screenshot:

---

### Screenshot 1: GTmetrix Performance Report
**What it shows:**
- GTmetrix Grade: A
- Performance: 100%
- Structure: 99%
- Web Vitals: LCP 446ms, TBT 0ms, CLS 0

**Save this screenshot as:**
```
gtmetrix.png
```

**Save to directory:**
```
test-screenshots/gtmetrix.png
```

---

### Screenshot 2: Security Headers (by Snyk)
**What it shows:**
- Green A+ grade badge
- Site: https://basiliso-rosario.com/
- All security headers passing:
  - ✓ Content-Security-Policy
  - ✓ X-Frame-Options
  - ✓ X-Content-Type-Options
  - ✓ Referrer-Policy
  - ✓ Permissions-Policy
  - ✓ Strict-Transport-Security

**Save this screenshot as:**
```
securityheaders.png
```

**Save to directory:**
```
test-screenshots/securityheaders.png
```

---

### Screenshot 3: Mozilla HTTP Observatory
**What it shows:**
- Dark theme interface
- "Scan results" header
- Grade: A+
- Performance trends graph showing current grade vs historical data
- Tabs: Scoring, CSP analysis, Cookies, Raw server headers, etc.

**Save this screenshot as:**
```
mozilla-observatory.png
```

**Save to directory:**
```
test-screenshots/mozilla-observatory.png
```

---

### Screenshot 4: Qualys SSL Labs
**What it shows:**
- Qualys SSL Labs header (red bar at top)
- Site: basiliso-rosario.com
- Multiple server entries all showing A+ grade
- Server IP addresses
- Test times and durations
- All servers showing "Ready" status

**Save this screenshot as:**
```
ssl-labs.png
```

**Save to directory:**
```
test-screenshots/ssl-labs.png
```

---

## Quick Reference Table

| Screenshot Number | Test Platform | Grade | Filename |
|------------------|---------------|-------|----------|
| 1 | GTmetrix | A | `gtmetrix.png` |
| 2 | Security Headers (Snyk) | A+ | `securityheaders.png` |
| 3 | Mozilla HTTP Observatory | A+ | `mozilla-observatory.png` |
| 4 | Qualys SSL Labs | A+ | `ssl-labs.png` |

## Step-by-Step Upload Process

### 1. Save Screenshots from Chat
Right-click each screenshot image I provided → Save Image As → Use the filename from the table above

### 2. Verify Filenames
Make sure filenames are **exactly** as shown:
- All lowercase
- Use hyphens (not underscores or spaces)
- `.png` extension

### 3. Upload to Server
Upload all 4 files to:
```
test-screenshots/
├── gtmetrix.png
├── mozilla-observatory.png
├── securityheaders.png
└── ssl-labs.png
```

### 4. Set Permissions
If on Linux server, set file permissions:
```bash
chmod 644 test-screenshots/*.png
```

### 5. Test the Page
1. Clear browser cache (Ctrl + Shift + Delete)
2. Visit: https://basiliso-rosario.com/security-tests.html
3. Verify all 4 screenshots display correctly
4. Check on mobile view too

## Expected Result

When done correctly, you'll see:
- ✓ Achievement banner with trophy icon
- ✓ 4 test result cards with your actual screenshots
- ✓ Grade badges (3× A+, 1× A)
- ✓ Key achievements listed under each
- ✓ No placeholder text or broken images

## Troubleshooting

### Screenshots not showing?
- Verify filenames match EXACTLY (case-sensitive)
- Check files are in `test-screenshots/` directory
- Verify file permissions (644)
- Clear browser cache completely
- Check browser console for errors (F12)

### Showing placeholder instead of image?
- Filename might be wrong (check spelling, hyphens, lowercase)
- File might not be uploaded yet
- Path might be incorrect (should be in test-screenshots/)

### Images appear distorted?
- Save original screenshots at higher resolution
- Recommended: 1200-1600px width
- Use PNG format for best quality

## File Size Tips

Optimize your screenshots for web:
- Target: Under 200KB per image
- Tools: TinyPNG, ImageOptim, Squoosh
- Format: PNG for text clarity
- Quality: 85-95% if using JPG

## Questions?

The security-tests.html page has been updated with:
- ✓ GTmetrix instead of ImmuniWeb
- ✓ Correct grade displays (A+ and A)
- ✓ Performance metrics from your actual tests
- ✓ Updated instructions matching your platforms

Just save and upload the 4 screenshots with the filenames above, and you're all set!
