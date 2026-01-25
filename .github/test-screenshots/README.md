# Security Test Screenshots Directory

This directory contains screenshots of security testing results from various security testing platforms.

## Required Screenshots

To display your test results on the Security Test Results page, place the following screenshot files in this directory:

1. **mozilla-observatory.png** - Screenshot from [Mozilla Observatory](https://observatory.mozilla.org/)
2. **securityheaders.png** - Screenshot from [Security Headers](https://securityheaders.com/)
3. **ssl-labs.png** - Screenshot from [SSL Labs](https://www.ssllabs.com/ssltest/)
4. **gtmetrix.png** - Screenshot from [GTmetrix](https://gtmetrix.com/)

## Screenshot Guidelines

### Format
- **File format:** PNG or JPG (PNG recommended for better quality)
- **Naming:** Use exact filenames listed above (lowercase, with hyphens)

### Recommended Dimensions
- **Width:** 1200-1600px for optimal display quality
- **Aspect ratio:** 16:9 or similar (landscape orientation)

### What to Capture
Capture the full test results page showing:
- Overall grade/score (A+)
- Test name and date
- Key security metrics
- Detailed findings (if space allows)

### Screenshot Tips
1. Use full-page screenshot tools for best results
2. Ensure text is readable and not blurry
3. Include the testing site's branding/header
4. Crop out browser UI elements
5. Ensure screenshots show passing grades prominently

## How They Display

Screenshots will appear in test result cards on the Security Test Results page (`security-tests.html`). If a screenshot file is missing, a placeholder will be shown instead.

## Testing Sites

### Mozilla Observatory
- URL: https://observatory.mozilla.org/
- Tests: Security headers, CSP, cookies, subresource integrity
- Grading: 0-100 scale with letter grades

### Security Headers
- URL: https://securityheaders.com/
- Tests: HTTP security headers implementation
- Grading: A+ to F scale

### SSL Labs
- URL: https://www.ssllabs.com/ssltest/
- Tests: SSL/TLS configuration, certificate validity, protocol support
- Grading: A+ to F scale with detailed breakdown

### GTmetrix
- URL: https://gtmetrix.com/
- Tests: Website performance, Core Web Vitals, page speed
- Grading: A to F scale with performance percentages

## Upload Instructions

1. Save your screenshots with the exact filenames listed above
2. Upload them to this `test-screenshots` directory on your web server
3. Verify file permissions are set to 644 (readable by web server)
4. Clear browser cache and refresh the Security Test Results page
5. Screenshots should display automatically

## CSP Compatibility

All screenshots must be served from your own domain ('self') to comply with the Content Security Policy. External image URLs will be blocked.

## File Size Optimization

For faster page loads, optimize your screenshots:
- Use PNG compression tools (like TinyPNG or ImageOptim)
- Or save as JPG with 85-90% quality
- Target file size: Under 200KB per screenshot

## Troubleshooting

**Screenshots not displaying?**
- Verify filenames match exactly (case-sensitive on Linux servers)
- Check file permissions (should be 644)
- Clear browser cache
- Check browser console for CSP errors
- Verify images are in the correct directory

**Images appear broken or pixelated?**
- Use higher resolution source images (1200px+ width)
- Save as PNG instead of JPG for text-heavy screenshots
- Avoid excessive compression
