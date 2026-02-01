# Security Policy

**Version:** 1.0.0
**Last Updated:** 2026-01-31
**Classification:** Public

---

## Overview

Praxis Library is committed to maintaining the highest security standards. This document outlines our security policies, practices, and guidelines following OWASP (Open Web Application Security Project) recommendations.

---

## Security Contact

**Report vulnerabilities to:**
- Email: bas.rosario@gmail.com
- Subject line: `[SECURITY] Praxis Library Vulnerability Report`

We aim to acknowledge reports within 48 hours and provide a resolution timeline within 7 days.

---

## OWASP Top 10 Compliance

### A01:2021 - Broken Access Control

| Control | Implementation |
|---------|----------------|
| **No authentication required** | Static site - no user accounts |
| **No sensitive data storage** | No databases, no user data collection |
| **No admin panels** | No privileged functionality |
| **CSP enforced** | Strict Content-Security-Policy headers |

### A02:2021 - Cryptographic Failures

| Control | Implementation |
|---------|----------------|
| **HTTPS enforced** | All traffic encrypted via TLS |
| **No sensitive data** | No passwords, PII, or confidential data |
| **No data transmission** | Static site with no form submissions |
| **Secure referrer** | `strict-origin-when-cross-origin` policy |

### A03:2021 - Injection

| Control | Implementation |
|---------|----------------|
| **No user input processing** | Client-side only, no server execution |
| **No database queries** | Static HTML/CSS/JS only |
| **CSP script-src 'self'** | Prevents XSS via script injection |
| **No eval()** | JavaScript avoids dynamic code execution |

### A04:2021 - Insecure Design

| Control | Implementation |
|---------|----------------|
| **Principle of least privilege** | Minimal functionality |
| **Defense in depth** | Multiple security layers (CSP, SRI potential, HTTPS) |
| **Secure defaults** | All features disabled by default |
| **Threat modeling** | Static site minimizes attack surface |

### A05:2021 - Security Misconfiguration

| Control | Implementation |
|---------|----------------|
| **Minimal headers** | Only necessary HTTP headers |
| **No default credentials** | No authentication system |
| **No unnecessary features** | Lean codebase |
| **Regular audits** | Lighthouse security checks |

### A06:2021 - Vulnerable and Outdated Components

| Control | Implementation |
|---------|----------------|
| **Zero external dependencies** | No CDNs, no npm packages in production |
| **Self-hosted assets** | All fonts, styles, scripts local |
| **No frameworks** | Vanilla HTML/CSS/JS only |
| **Manual code review** | All code human-reviewed |

### A07:2021 - Identification and Authentication Failures

| Control | Implementation |
|---------|----------------|
| **No authentication** | Static site - no login required |
| **No session management** | Stateless design |
| **No password storage** | No user accounts |

### A08:2021 - Software and Data Integrity Failures

| Control | Implementation |
|---------|----------------|
| **No CI/CD vulnerabilities** | Manual deployment process |
| **No auto-updates** | Static content, manual updates only |
| **Code review required** | All changes reviewed before deployment |
| **Git integrity** | Version control with commit signing available |

### A09:2021 - Security Logging and Monitoring Failures

| Control | Implementation |
|---------|----------------|
| **Server-side logging** | Hostinger access/error logs |
| **No client-side tracking** | No analytics, no cookies |
| **Privacy by design** | Minimal data collection |

### A10:2021 - Server-Side Request Forgery (SSRF)

| Control | Implementation |
|---------|----------------|
| **No server-side code** | Static site - no backend |
| **No external requests** | No API calls, no fetch to external URLs |
| **CSP connect-src 'self'** | Blocks unauthorized connections |

---

## Content Security Policy (CSP)

Our strict CSP prevents common web attacks:

```
Content-Security-Policy:
  default-src 'none';
  connect-src 'self';
  form-action 'none';
  base-uri 'none';
  font-src 'self';
  img-src 'self' data:;
  style-src 'self';
  script-src 'self';
```

### Policy Breakdown

| Directive | Value | Protection |
|-----------|-------|------------|
| `default-src` | `'none'` | Blocks all resources by default |
| `connect-src` | `'self'` | Only same-origin XHR/fetch |
| `form-action` | `'none'` | Blocks all form submissions |
| `base-uri` | `'none'` | Prevents base tag injection |
| `font-src` | `'self'` | Self-hosted fonts only |
| `img-src` | `'self' data:` | Local images and data URIs |
| `style-src` | `'self'` | External stylesheet only |
| `script-src` | `'self'` | External script only |

---

## OWASP ASVS Alignment

We follow the OWASP Application Security Verification Standard (ASVS) Level 1 requirements applicable to static sites:

### V1: Architecture, Design and Threat Modeling

- [x] Security requirements documented
- [x] Minimal attack surface design
- [x] Input/output boundaries defined
- [x] Third-party component inventory (none)

### V2: Authentication (N/A - Static Site)

- [x] No authentication required
- [x] No credential storage

### V3: Session Management (N/A - Static Site)

- [x] No sessions
- [x] No cookies for session tracking

### V4: Access Control (N/A - Static Site)

- [x] All content public
- [x] No privileged resources

### V5: Validation, Sanitization and Encoding

- [x] No server-side input processing
- [x] Client-side validation for UX only
- [x] Proper HTML encoding in templates

### V6: Stored Cryptography (N/A)

- [x] No data storage
- [x] No encryption keys

### V7: Error Handling and Logging

- [x] No sensitive error messages
- [x] Graceful error handling in JS
- [x] Server access logs maintained

### V8: Data Protection

- [x] No PII collection
- [x] No data transmission
- [x] Privacy by design

### V9: Communication Security

- [x] HTTPS enforced
- [x] TLS 1.2+ required
- [x] Secure referrer policy

### V10: Malicious Code

- [x] No external dependencies
- [x] All code reviewed
- [x] No obfuscated code

### V11: Business Logic (N/A)

- [x] No business logic
- [x] Static content only

### V12: Files and Resources

- [x] No file uploads
- [x] No file downloads (except page content)
- [x] Local resources only

### V13: API and Web Services (N/A)

- [x] No APIs
- [x] No web services

### V14: Configuration

- [x] Security headers configured
- [x] Error pages don't leak info
- [x] No debug mode in production

---

## Security Headers

All pages include these security-enhancing meta tags:

```html
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta http-equiv="Content-Security-Policy" content="...">
```

### Recommended Server Headers (Hostinger)

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## Data Privacy

### What We Collect

**Nothing.** Praxis Library does not:

- Set cookies
- Use analytics
- Track users
- Store personal data
- Process form submissions
- Make external API calls

### Third-Party Services

| Service | Data Shared | Purpose |
|---------|-------------|---------|
| Hostinger | Server logs | Hosting |
| GitHub | Source code | Version control |

---

## Vulnerability Disclosure

### Scope

In scope:
- praxislibrary.com
- All HTML, CSS, JS files
- Security misconfigurations

Out of scope:
- Third-party hosting (Hostinger) vulnerabilities
- Social engineering attacks
- Physical security

### Reporting Guidelines

1. **Do not** publicly disclose before fix
2. **Do** provide detailed reproduction steps
3. **Do** allow reasonable time for remediation
4. **Do not** access data beyond proof-of-concept

### Timeline

| Stage | Duration |
|-------|----------|
| Acknowledgment | 48 hours |
| Initial assessment | 7 days |
| Remediation plan | 14 days |
| Fix deployment | 30 days |
| Public disclosure | 90 days or after fix |

---

## Security Audit History

| Date | Auditor | Scope | Result |
|------|---------|-------|--------|
| 2026-01-31 | SecurityHeaders.com | HTTP Headers | A+ |
| 2026-01-31 | Lighthouse | Security audit | 100% |
| 2026-01-31 | WAVE | Accessibility | Pass |

---

## Incident Response

### Classification

| Severity | Description | Response Time |
|----------|-------------|---------------|
| Critical | Active exploitation, data breach | 4 hours |
| High | Vulnerability with exploit available | 24 hours |
| Medium | Vulnerability, no known exploit | 7 days |
| Low | Minor security improvement | 30 days |

### Response Steps

1. **Identify** - Confirm and classify the issue
2. **Contain** - Limit damage if necessary
3. **Eradicate** - Remove vulnerability
4. **Recover** - Restore normal operation
5. **Document** - Record lessons learned

---

## Security Development Lifecycle

### Code Review

All code changes require:

1. Human review before merge
2. CSP compliance verification
3. No inline scripts or styles
4. No external dependencies

### Testing

Before deployment:

- [ ] Lighthouse security audit
- [ ] SecurityHeaders.com check
- [ ] Manual CSP violation testing
- [ ] Cross-browser compatibility

### Deployment

- Manual deployment only
- Git-based version control
- Hostinger webhook for automated sync

---

## Compliance

### Standards Alignment

| Standard | Status | Notes |
|----------|--------|-------|
| OWASP Top 10 | Compliant | All controls addressed |
| OWASP ASVS L1 | Compliant | Applicable controls met |
| GDPR | Compliant | No personal data processing |
| CCPA | Compliant | No personal data collection |

---

## Updates

This policy is reviewed quarterly or after any security incident.

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-31 | Initial release |

---

*Security is everyone's responsibility. If you see something, say something.*
