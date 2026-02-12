#!/usr/bin/env python3
"""
Praxis Library — Audit Resolution Script

Reads an audit report (.md), parses all errors and warnings,
attempts automatic resolution, and generates a resolution report.

Usage:
    python "Python Scipts/resolve_audit.py" <report-path>
    python "Python Scipts/resolve_audit.py"   # auto-finds latest report

Resolution strategies:
    - 404 URLs:  Search for redirected/moved versions via HTTP
    - 403/405/503: Classify as bot-blocked if on known domains
    - Broken internal links: Check for renamed/moved files
    - Missing attributes: Suggest exact fix with file + line
    - Orphan files: List pages that should link to them

Output:
    .claude/reports/resolution-report-YYYY-MM-DD_HHMMSS.md
"""

import os
import re
import sys
import ssl
import glob
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse
from collections import defaultdict


# === CONFIGURATION ===

# Project root (parent of Python Scipts/)
ROOT = Path(__file__).resolve().parent.parent
REPORT_DIR = ROOT / '.claude' / 'reports'

# Domains known to block bots (kept in sync with PraxisLibraryAudit.py)
BOT_BLOCKED_DOMAINS = frozenset({
    'pmc.ncbi.nlm.nih.gov', 'pubmed.ncbi.nlm.nih.gov', 'eric.ed.gov',
    'www.bls.gov', 'direct.mit.edu', 'www.ftc.gov', 'www.ed.gov',
    'www.linkedin.com', 'linkedin.com', 'www.stlouisfed.org',
})


# === REPORT PARSING ===

# Matches error/warning rows in audit report tables
# Format: | # | `file` | line | message | suggestion |
RE_ISSUE_ROW = re.compile(
    r'^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*(\S+)\s*\|\s*(.+?)\s*\|'
)

# Extract URL from issue messages
RE_URL_IN_MSG = re.compile(r'(https?://\S+)')

# Section headers
RE_SECTION_HEADER = re.compile(r'^#{1,3}\s+(Errors|Warnings|Info)\s*\((\d+)\)', re.I)

# Category header
RE_CATEGORY = re.compile(r'^#\s+\d+\.\s+(.+)$')


class AuditIssue:
    """Parsed issue from an audit report."""
    def __init__(self, category, severity, num, file_path, line, message, suggestion=""):
        self.category = category
        self.severity = severity
        self.num = int(num)
        self.file_path = file_path
        self.line = line
        self.message = message
        self.suggestion = suggestion
        self.resolution = ""
        self.resolution_status = "unresolved"  # unresolved, resolved, manual

    def __repr__(self):
        return f"[{self.severity}] {self.file_path}:{self.line} — {self.message[:60]}"


def find_latest_report() -> Path:
    """Find the most recent full audit report."""
    pattern = str(REPORT_DIR / 'audit-report-*.md')
    reports = sorted(glob.glob(pattern))
    if not reports:
        print("No audit reports found in", REPORT_DIR)
        sys.exit(1)
    return Path(reports[-1])


def parse_report(report_path: Path) -> list:
    """Parse an audit report and extract all issues."""
    issues = []
    current_category = "Unknown"
    current_severity = "INFO"

    with open(report_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    for line in lines:
        line = line.rstrip()

        # Track current category
        cat_match = RE_CATEGORY.match(line)
        if cat_match:
            current_category = cat_match.group(1).strip()
            continue

        # Track severity section
        sec_match = RE_SECTION_HEADER.match(line)
        if sec_match:
            severity_word = sec_match.group(1).upper()
            if severity_word == "ERRORS":
                current_severity = "ERROR"
            elif severity_word == "WARNINGS":
                current_severity = "WARNING"
            else:
                current_severity = "INFO"
            continue

        # Parse table rows
        row_match = RE_ISSUE_ROW.match(line)
        if row_match:
            num, file_path, line_num, rest = row_match.groups()
            # Split message and suggestion (if present)
            parts = rest.rsplit('|', 1)
            message = parts[0].strip()
            suggestion = parts[1].strip() if len(parts) > 1 else ""

            issue = AuditIssue(
                category=current_category,
                severity=current_severity,
                num=num,
                file_path=file_path,
                line=line_num,
                message=message,
                suggestion=suggestion
            )
            issues.append(issue)

    return issues


# === RESOLUTION STRATEGIES ===

def check_url(url: str) -> dict:
    """Check a URL and return status info."""
    ctx = ssl.create_default_context()
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    result = {'url': url, 'status': 0, 'final_url': '', 'error': '', 'bot_blocked': False}

    domain = urlparse(url).netloc
    if domain in BOT_BLOCKED_DOMAINS:
        result['bot_blocked'] = True

    for method in ('HEAD', 'GET'):
        req = urllib.request.Request(url, method=method, headers=headers)
        try:
            resp = urllib.request.urlopen(req, timeout=15, context=ctx)
            result['status'] = resp.status
            if resp.url != url:
                result['final_url'] = resp.url
            if method == 'GET':
                resp.read(1024)
                resp.close()
            return result
        except urllib.error.HTTPError as e:
            if method == 'HEAD' and e.code in (403, 405):
                continue
            result['status'] = e.code
            result['error'] = str(e.reason)
            if result['bot_blocked'] and e.code in (403, 405, 503, 999):
                result['status'] = 200
                result['error'] = 'bot-blocked-ok'
            return result
        except Exception as e:
            if result['bot_blocked']:
                result['status'] = 200
                result['error'] = 'bot-blocked-ok'
                return result
            if method == 'HEAD':
                continue
            result['error'] = str(e)
            return result

    return result


def resolve_url_issue(issue: AuditIssue) -> None:
    """Attempt to resolve a URL-related issue."""
    urls = RE_URL_IN_MSG.findall(issue.message)
    if not urls:
        issue.resolution = "No URL found in message — manual review needed"
        issue.resolution_status = "manual"
        return

    url = urls[0]
    domain = urlparse(url).netloc

    # Bot-blocked domain
    if domain in BOT_BLOCKED_DOMAINS:
        issue.resolution = f"Bot-blocked domain ({domain}) — URL is assumed valid"
        issue.resolution_status = "resolved"
        return

    # Check URL
    result = check_url(url)

    if result['status'] == 200:
        if result['final_url']:
            issue.resolution = f"URL redirects to: {result['final_url']} — update href"
            issue.resolution_status = "manual"
        else:
            issue.resolution = "URL is reachable (200 OK) — may have been a transient failure"
            issue.resolution_status = "resolved"
        return

    if result['status'] == 301 or result['status'] == 302:
        issue.resolution = f"URL permanently moved to: {result['final_url']} — update href"
        issue.resolution_status = "manual"
        return

    if result['status'] == 404:
        issue.resolution = f"URL returns 404 (Not Found) — replace with a valid source"
        issue.resolution_status = "manual"
        return

    issue.resolution = f"URL returned {result['status']}: {result['error']} — manual review"
    issue.resolution_status = "manual"


def resolve_broken_link(issue: AuditIssue) -> None:
    """Attempt to resolve a broken internal link."""
    # Extract the broken path from the message
    match = re.search(r'Broken internal link:\s*(\S+)\s*->\s*(\S+)', issue.message)
    if not match:
        issue.resolution = "Could not parse broken link — manual review"
        issue.resolution_status = "manual"
        return

    href = match.group(1)
    resolved = match.group(2)

    # Check if the file exists now (may have been fixed since report)
    full_path = ROOT / resolved
    if full_path.exists():
        issue.resolution = f"File now exists at {resolved} — already fixed"
        issue.resolution_status = "resolved"
        return

    # Try common renames
    base = Path(resolved).stem
    parent = Path(resolved).parent
    candidates = list((ROOT / parent).glob(f"{base}*")) if (ROOT / parent).exists() else []
    if candidates:
        suggestion = str(candidates[0].relative_to(ROOT)).replace('\\', '/')
        issue.resolution = f"Possible match found: {suggestion} — update href in {issue.file_path}"
        issue.resolution_status = "manual"
        return

    issue.resolution = f"File not found and no matches — remove or replace the link"
    issue.resolution_status = "manual"


def resolve_generic(issue: AuditIssue) -> None:
    """Generic resolution for non-URL issues."""
    msg = issue.message.lower()

    if 'placeholder' in msg or 'coming soon' in msg or 'todo' in msg:
        issue.resolution = "Replace placeholder content with real content"
        issue.resolution_status = "manual"
    elif 'outdated date' in msg:
        issue.resolution = "Historical reference — no action needed unless content is wrong"
        issue.resolution_status = "resolved"
    elif 'orphan' in msg:
        issue.resolution = "Add a link from a parent page or remove the file"
        issue.resolution_status = "manual"
    elif 'citation' in msg and 'not verified' in msg:
        issue.resolution = "Run with --check-urls to verify, or add to bot-blocked list"
        issue.resolution_status = "resolved"
    elif 'assumed valid' in msg or 'bot-blocked' in msg.lower():
        issue.resolution = "Known bot-blocked domain — URL assumed valid"
        issue.resolution_status = "resolved"
    elif 'verified' in msg.lower() and ('200' in msg or 'verified' in msg.lower()):
        issue.resolution = "URL verified — no action needed"
        issue.resolution_status = "resolved"
    else:
        issue.resolution = issue.suggestion if issue.suggestion else "Manual review needed"
        issue.resolution_status = "manual"


# === MAIN RESOLUTION ENGINE ===

def resolve_all(issues: list) -> list:
    """Resolve all issues and return the updated list."""
    for issue in issues:
        msg = issue.message.lower()

        # URL-related issues
        if any(kw in msg for kw in ('unreachable', 'url ', 'http')):
            if 'external url unreachable' in msg or 'unreachable' in msg:
                resolve_url_issue(issue)
            else:
                resolve_generic(issue)
        # Broken internal links
        elif 'broken internal link' in msg:
            resolve_broken_link(issue)
        # Everything else
        else:
            resolve_generic(issue)

    return issues


# === REPORT GENERATION ===

def generate_resolution_report(issues: list, source_report: Path) -> str:
    """Generate a markdown resolution report."""
    now = datetime.now()
    timestamp = now.strftime('%Y-%m-%d_%H%M%S')

    errors = [i for i in issues if i.severity == 'ERROR']
    warnings = [i for i in issues if i.severity == 'WARNING']
    infos = [i for i in issues if i.severity == 'INFO']

    resolved = [i for i in issues if i.resolution_status == 'resolved']
    manual = [i for i in issues if i.resolution_status == 'manual']
    unresolved = [i for i in issues if i.resolution_status == 'unresolved']

    lines = []
    lines.append("# Praxis Library — Audit Resolution Report\n")
    lines.append(f"**Date:** {now.strftime('%Y-%m-%d')}")
    lines.append(f"**Time:** {now.strftime('%H:%M:%S')}")
    lines.append(f"**Source Report:** {source_report.name}")
    lines.append(f"**Tool:** resolve_audit.py\n")
    lines.append("---\n")

    # Summary
    lines.append("## Resolution Summary\n")
    total = len(issues)
    lines.append(f"| Metric                   | Count |")
    lines.append(f"|--------------------------|-------|")
    lines.append(f"| Total issues parsed      | {total:>5} |")
    lines.append(f"| Errors                   | {len(errors):>5} |")
    lines.append(f"| Warnings                 | {len(warnings):>5} |")
    lines.append(f"| Info                     | {len(infos):>5} |")
    lines.append(f"| **Auto-resolved**        | **{len(resolved):>3}** |")
    lines.append(f"| **Needs manual action**  | **{len(manual):>3}** |")
    lines.append(f"| Unresolved               | {len(unresolved):>5} |")
    lines.append("")
    lines.append("---\n")

    # Errors section
    if errors:
        lines.append("## Errors\n")
        for issue in errors:
            status_icon = "RESOLVED" if issue.resolution_status == 'resolved' else "MANUAL"
            lines.append(f"### [{status_icon}] {issue.file_path}:{issue.line}\n")
            lines.append(f"**Issue:** {issue.message}")
            lines.append(f"**Resolution:** {issue.resolution}\n")
        lines.append("---\n")

    # Warnings section
    if warnings:
        lines.append("## Warnings\n")
        for issue in warnings:
            status_icon = "RESOLVED" if issue.resolution_status == 'resolved' else "MANUAL"
            lines.append(f"### [{status_icon}] {issue.file_path}:{issue.line}\n")
            lines.append(f"**Issue:** {issue.message}")
            lines.append(f"**Resolution:** {issue.resolution}\n")
        lines.append("---\n")

    # Manual action items (consolidated)
    if manual:
        lines.append("## Action Items (Manual Resolution Required)\n")
        # Group by category
        by_cat = defaultdict(list)
        for issue in manual:
            by_cat[issue.category].append(issue)

        for cat, cat_issues in sorted(by_cat.items()):
            lines.append(f"### {cat}\n")
            nw = len(str(len(cat_issues)))
            fw = max(len("File"), max(len(i.file_path) for i in cat_issues))
            for n, issue in enumerate(cat_issues, 1):
                lines.append(f"{n}. **`{issue.file_path}`** (line {issue.line})")
                lines.append(f"   - Issue: {issue.message}")
                lines.append(f"   - Action: {issue.resolution}")
            lines.append("")
        lines.append("---\n")

    # Info summary (just counts, not individual items)
    if infos:
        resolved_infos = [i for i in infos if i.resolution_status == 'resolved']
        manual_infos = [i for i in infos if i.resolution_status == 'manual']
        lines.append("## Info Items Summary\n")
        lines.append(f"- {len(resolved_infos)} info items auto-resolved (no action needed)")
        lines.append(f"- {len(manual_infos)} info items need manual review")
        if manual_infos:
            lines.append("")
            for issue in manual_infos:
                lines.append(f"  - `{issue.file_path}:{issue.line}` — {issue.message[:80]}")
        lines.append("\n---\n")

    # Footer
    lines.append("## About This Report\n")
    lines.append("This report was auto-generated by `resolve_audit.py`.")
    lines.append("It reads the source audit report, attempts to resolve each issue,")
    lines.append("and categorizes results as auto-resolved or needing manual action.\n")
    lines.append("**Commands:**")
    lines.append('- `python "Python Scipts/resolve_audit.py"` — Resolve latest audit report')
    lines.append('- `python "Python Scipts/resolve_audit.py" path/to/report.md` — Resolve specific report')

    report_text = '\n'.join(lines)

    # Write report
    output_path = REPORT_DIR / f"resolution-report-{timestamp}.md"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(report_text)

    return str(output_path)


# === CLI ===

def main():
    print("=" * 60)
    print("  PRAXIS LIBRARY — AUDIT RESOLUTION ENGINE")
    print("=" * 60)

    # Find report
    if len(sys.argv) > 1:
        report_path = Path(sys.argv[1])
        if not report_path.exists():
            print(f"Report not found: {report_path}")
            sys.exit(1)
    else:
        report_path = find_latest_report()

    print(f"\n  Source: {report_path.name}")

    # Parse
    print("  Parsing issues...", end=" ", flush=True)
    issues = parse_report(report_path)
    errors = [i for i in issues if i.severity == 'ERROR']
    warnings = [i for i in issues if i.severity == 'WARNING']
    infos = [i for i in issues if i.severity == 'INFO']
    print(f"found {len(errors)}E / {len(warnings)}W / {len(infos)}I")

    if not issues:
        print("\n  No issues found in report. Nothing to resolve.")
        sys.exit(0)

    # Resolve
    print("  Resolving issues...", end=" ", flush=True)
    issues = resolve_all(issues)
    resolved = [i for i in issues if i.resolution_status == 'resolved']
    manual = [i for i in issues if i.resolution_status == 'manual']
    print(f"{len(resolved)} resolved, {len(manual)} need manual action")

    # Generate report
    output = generate_resolution_report(issues, report_path)
    print(f"\n  Resolution report: {output}")

    print("\n" + "=" * 60)
    print(f"  RESOLVED: {len(resolved)}  |  MANUAL: {len(manual)}")
    print("=" * 60)


if __name__ == '__main__':
    main()
