#!/usr/bin/env python3
"""
inject_nav_links.py — Add Hallucination Spotter + Audit Report to nav across all pages.

Adds:
  1. Hallucination Spotter link after Persona Architect in AI Readiness dropdown
  2. Audit Report link after About Praxis in Resources dropdown

Handles path depth automatically by matching existing link prefixes.

Usage:
    python "Python Scipts/inject_nav_links.py"              # Update all pages
    python "Python Scipts/inject_nav_links.py" --dry-run    # Preview only
"""

import os
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
EXCLUDE_DIRS = {".claude", "data", "Python Scipts", "glossary_factory",
                "assets", "node_modules", ".git", "__pycache__"}


def find_html_files():
    html_files = []
    for dirpath, dirnames, filenames in os.walk(PROJECT_ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for f in filenames:
            if f.endswith(".html"):
                html_files.append(Path(dirpath) / f)
    return sorted(html_files)


def update_file(filepath, dry_run=False, verbose=False):
    rel = filepath.relative_to(PROJECT_ROOT)
    content = filepath.read_text(encoding="utf-8")
    changed = False

    # --- 1. Add Hallucination Spotter after Persona Architect ---
    # Match: <a href="[prefix]tools/persona.html">Persona Architect</a>
    # Insert after: <a href="[prefix]tools/hallucination.html">Hallucination Spotter</a>
    if 'hallucination.html">Hallucination Spotter</a>' not in content:
        pattern = r'(<a href="([^"]*?)tools/persona\.html">Persona Architect</a>)'
        match = re.search(pattern, content)
        if match:
            prefix = match.group(2)  # e.g., "../" or "../../" or ""
            new_link = f'\n                            <a href="{prefix}tools/hallucination.html">Hallucination Spotter</a>'
            content = content[:match.end()] + new_link + content[match.end():]
            changed = True

    # --- 2. Add Audit Report after About Praxis ---
    # Match: <a href="[prefix]pages/about.html">About Praxis</a>
    # Insert after: <a href="[prefix]pages/audit-report.html">Audit Report</a>
    if 'audit-report.html">Audit Report</a>' not in content:
        pattern = r'(<a href="([^"]*?)pages/about\.html">About Praxis</a>)'
        match = re.search(pattern, content)
        if match:
            prefix = match.group(2)
            new_link = f'\n                            <a href="{prefix}pages/audit-report.html">Audit Report</a>'
            content = content[:match.end()] + new_link + content[match.end():]
            changed = True

    if not changed:
        if verbose:
            print(f"  SKIP: {rel}")
        return "skipped"

    if dry_run:
        print(f"  DRY-RUN: {rel}")
        return "dry_run"

    filepath.write_text(content, encoding="utf-8")
    if verbose:
        print(f"  UPDATED: {rel}")
    return "updated"


def main():
    dry_run = "--dry-run" in sys.argv
    verbose = "--verbose" in sys.argv or dry_run

    print(f"NAV LINK INJECTION: {PROJECT_ROOT}")
    print(f"  Adding: Hallucination Spotter (AI Readiness)")
    print(f"  Adding: Audit Report (Resources > About)")
    print()

    html_files = find_html_files()
    print(f"Found {len(html_files)} HTML files\n")

    stats = {"updated": 0, "skipped": 0, "dry_run": 0}
    for fp in html_files:
        result = update_file(fp, dry_run=dry_run, verbose=verbose)
        stats[result] = stats.get(result, 0) + 1

    print(f"\n{'=' * 50}")
    print(f"Updated:  {stats.get('updated', 0)}")
    print(f"Skipped:  {stats.get('skipped', 0)}")
    if dry_run:
        print(f"Dry run:  {stats.get('dry_run', 0)}")
    print(f"{'=' * 50}")


if __name__ == "__main__":
    main()
