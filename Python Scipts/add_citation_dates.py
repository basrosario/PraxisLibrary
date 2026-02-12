#!/usr/bin/env python3
"""
add_citation_dates.py — Add data-added="YYYY-MM-DD" to external citation links.

Scans citation-bearing pages (neurodivergence/, pages/) for external <a> tags
and stamps them with a data-added attribute for freshness tracking.

Usage:
  python "Python Scipts/add_citation_dates.py"              # Stamp with today's date
  python "Python Scipts/add_citation_dates.py" --date 2026-02-05   # Custom date
  python "Python Scipts/add_citation_dates.py" --dry-run    # Preview without writing

Session 81 — Praxis Library Project
"""

import os
import re
import sys
import argparse
from datetime import datetime


# Directories containing citation-bearing pages
CITATION_DIRS = ['neurodivergence', 'pages']

# External links to skip (not citations)
SKIP_DOMAINS = [
    'github.com', 'linkedin.com', 'twitter.com',
    'x.com', 'facebook.com', 'youtube.com',
]

# Match <a href="https://..." ...> that does NOT already have data-added
RE_EXTERNAL_LINK = re.compile(
    r'(<a\s+href\s*=\s*["\']https?://[^"\']+["\'][^>]*?)(\s*>)',
    re.IGNORECASE
)


def should_skip_url(tag: str) -> bool:
    """Check if the link is a non-citation URL (social, GitHub, etc.)."""
    for domain in SKIP_DOMAINS:
        if domain in tag:
            return True
    return False


def process_file(filepath: str, stamp_date: str, dry_run: bool = False) -> int:
    """Add data-added to external links in a single file. Returns count stamped."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    count = 0

    def replacer(match):
        nonlocal count
        tag_start = match.group(1)
        tag_end = match.group(2)

        # Skip if already stamped
        if 'data-added' in tag_start:
            return match.group(0)

        # Skip non-citation links
        if should_skip_url(tag_start):
            return match.group(0)

        count += 1
        return f'{tag_start} data-added="{stamp_date}"{tag_end}'

    new_content = RE_EXTERNAL_LINK.sub(replacer, content)

    if count > 0 and not dry_run:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

    return count


def main():
    parser = argparse.ArgumentParser(
        description='Add data-added timestamps to external citation links.'
    )
    parser.add_argument(
        '--date', type=str, default=datetime.now().strftime('%Y-%m-%d'),
        help='Date stamp to apply (default: today, format: YYYY-MM-DD)'
    )
    parser.add_argument(
        '--dry-run', action='store_true',
        help='Preview changes without writing files'
    )
    args = parser.parse_args()

    # Validate date format
    try:
        datetime.strptime(args.date, '%Y-%m-%d')
    except ValueError:
        print(f"ERROR: Invalid date format '{args.date}'. Use YYYY-MM-DD.")
        sys.exit(1)

    # Find project root (parent of "Python Scipts" directory)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(script_dir)

    total_files = 0
    total_links = 0

    print(f"{'DRY RUN — ' if args.dry_run else ''}Stamping citation links with data-added=\"{args.date}\"")
    print(f"Root: {root_dir}\n")

    for dir_name in CITATION_DIRS:
        dir_path = os.path.join(root_dir, dir_name)
        if not os.path.isdir(dir_path):
            print(f"  Skipping {dir_name}/ (not found)")
            continue

        for fn in sorted(os.listdir(dir_path)):
            if not fn.endswith('.html'):
                continue
            filepath = os.path.join(dir_path, fn)
            stamped = process_file(filepath, args.date, args.dry_run)
            if stamped > 0:
                total_files += 1
                total_links += stamped
                print(f"  {dir_name}/{fn}: {stamped} link(s) stamped")

    print(f"\nTotal: {total_links} links stamped across {total_files} files")
    if args.dry_run:
        print("(Dry run — no files were modified)")


if __name__ == '__main__':
    main()
