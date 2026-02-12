#!/usr/bin/env python3
"""
link_modality_hub.py — Add links from mega-menu modality tab headers
(Code, Image, Audio, Video, 3D) to learn/modality/index.html.

Currently these headers are plain <h4>Code</h4> etc. This script
converts them to <h4><a href="...modality/index.html">Code</a></h4>
with the correct depth-prefix for each file.

Usage:
  python "Python Scipts/link_modality_hub.py"
  python "Python Scipts/link_modality_hub.py" --dry-run
"""

import os
import re
import argparse

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EXCLUDE_DIRS = {'.claude', '.git', 'glossary_factory', 'node_modules',
                'Python Scipts', '__pycache__', 'assets', 'data'}

# The 5 modality tab headers to convert
HEADERS = ['Code', 'Image', 'Audio', 'Video', '3D']


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
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        first_500 = f.read(500).lower()
    return '<!doctype' not in first_500 and '<html' not in first_500


def get_depth_prefix(filepath):
    """Determine the correct href to learn/modality/index.html from this file."""
    rel = os.path.relpath(filepath, ROOT_DIR).replace('\\', '/')

    # Depth 0: root (index.html)
    if '/' not in rel:
        return 'learn/modality/index.html'

    parts = rel.split('/')

    # Depth 3: learn/modality/XYZ/*.html
    if len(parts) == 4 and parts[0] == 'learn' and parts[1] == 'modality':
        return '../index.html'

    # Depth 2: learn/modality/index.html
    if len(parts) == 3 and parts[0] == 'learn' and parts[1] == 'modality':
        return 'index.html'

    # Depth 1: learn/*.html, pages/*.html, tools/*.html, etc.
    if len(parts) == 2:
        return '../learn/modality/index.html'

    # Fallback for any other depth
    return '../learn/modality/index.html'


def process_file(filepath, dry_run=False):
    if is_fragment(filepath):
        return 0

    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    # Only process files that have the mega-menu modality tabs
    if '<h4>Code</h4>' not in content:
        return 0

    href = get_depth_prefix(filepath)
    modified = content
    count = 0

    for header in HEADERS:
        old = f'<h4>{header}</h4>'
        new = f'<h4><a href="{href}">{header}</a></h4>'
        if old in modified:
            modified = modified.replace(old, new)
            count += 1

    if count > 0 and not dry_run:
        with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
            f.write(modified)

    return count


def main():
    parser = argparse.ArgumentParser(
        description="Link modality tab headers to modality hub page")
    parser.add_argument('--dry-run', action='store_true',
                        help="Show what would change without modifying files")
    args = parser.parse_args()

    files = discover_html_files()
    total_files = 0
    total_links = 0

    for filepath in files:
        rel = os.path.relpath(filepath, ROOT_DIR)
        count = process_file(filepath, dry_run=args.dry_run)
        if count > 0:
            total_files += 1
            total_links += count
            prefix = "[DRY RUN] " if args.dry_run else ""
            print(f"  {prefix}{rel}: {count} headers linked")

    print(f"\n{'[DRY RUN] ' if args.dry_run else ''}Summary:")
    print(f"  Files modified: {total_files}")
    print(f"  Headers linked: {total_links}")


if __name__ == "__main__":
    main()
