#!/usr/bin/env python3
"""
add_missing_components.py — Batch-add badge lightbox and back-to-top
to all HTML pages that are missing them.

Usage:
  python "Python Scipts/add_missing_components.py"
  python "Python Scipts/add_missing_components.py" --dry-run
"""

import os
import re
import sys
import argparse

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# The badge lightbox HTML block
BADGE_LIGHTBOX = """
    <!-- =============================================
         BADGE LIGHTBOX - Modal popup for badge info
         ============================================= -->
    <div class="badge-lightbox-overlay" aria-hidden="true"></div>
    <div class="badge-lightbox" role="dialog" aria-modal="true" aria-labelledby="badge-lightbox-title">
        <header class="badge-lightbox-header">
            <h2 class="badge-lightbox-title" id="badge-lightbox-title"></h2>
            <button class="badge-lightbox-close" aria-label="Close dialog">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </header>
        <div class="badge-lightbox-content"></div>
    </div>
    <!-- /BADGE LIGHTBOX -->"""

# The back-to-top HTML block
BACK_TO_TOP = """
    <!-- Back to Top Bar -->
    <button class="back-to-top-bar" aria-label="Back to top">
        <span class="back-to-top-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 15l-6-6-6 6"/>
            </svg>
        </span>
        <span class="back-to-top-text">Back to Top</span>
    </button>"""

EXCLUDE_DIRS = {'.claude', '.git', 'glossary_factory', 'node_modules',
                'Python Scipts', '__pycache__', 'assets'}


def discover_html_files():
    result = []
    for dirpath, dirnames, filenames in os.walk(ROOT_DIR):
        dirnames[:] = [d for d in dirnames
                       if d not in EXCLUDE_DIRS and not d.startswith('.')]
        for fn in filenames:
            if fn.endswith('.html'):
                result.append(os.path.join(dirpath, fn))
    return sorted(result)


def is_fragment(filepath):
    """Check if file is a fragment (no DOCTYPE)."""
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        first_500 = f.read(500).lower()
    return '<!doctype' not in first_500 and '<html' not in first_500


def process_file(filepath, dry_run=False):
    """Add missing components to a file. Returns list of changes made."""
    if is_fragment(filepath):
        return []

    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    changes = []
    has_back_to_top = 'back-to-top-bar' in content
    has_badge_lightbox = 'badge-lightbox' in content
    has_adl = 'adl-dim-overlay' in content

    if has_back_to_top and has_badge_lightbox:
        return []  # Nothing to add

    modified = content

    # Strategy: Insert missing components before the ADL section
    # ADL is always present, so we use it as the anchor point
    if has_adl:
        adl_marker = '    <div class="adl-dim-overlay"'
        adl_pos = modified.find(adl_marker)

        if adl_pos == -1:
            return []

        insert_block = ""

        if not has_back_to_top:
            insert_block += BACK_TO_TOP + "\n"
            changes.append("Added back-to-top button")

        if not has_badge_lightbox:
            insert_block += BADGE_LIGHTBOX + "\n"
            changes.append("Added badge lightbox")

        if insert_block:
            modified = modified[:adl_pos] + insert_block + "\n" + modified[adl_pos:]

    if changes and not dry_run:
        with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
            f.write(modified)

    return changes


def main():
    parser = argparse.ArgumentParser(description="Add missing badge lightbox + back-to-top")
    parser.add_argument('--dry-run', action='store_true', help="Show what would change without modifying files")
    args = parser.parse_args()

    files = discover_html_files()
    total_modified = 0
    total_lightbox = 0
    total_backtotop = 0

    for filepath in files:
        rel = os.path.relpath(filepath, ROOT_DIR)
        changes = process_file(filepath, dry_run=args.dry_run)
        if changes:
            total_modified += 1
            for c in changes:
                if 'lightbox' in c:
                    total_lightbox += 1
                if 'back-to-top' in c:
                    total_backtotop += 1
                prefix = "[DRY RUN] " if args.dry_run else ""
                print(f"  {prefix}{rel}: {c}")

    print(f"\n{'[DRY RUN] ' if args.dry_run else ''}Summary:")
    print(f"  Files modified: {total_modified}")
    print(f"  Badge lightboxes added: {total_lightbox}")
    print(f"  Back-to-top buttons added: {total_backtotop}")


if __name__ == "__main__":
    main()
