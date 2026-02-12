#!/usr/bin/env python3
"""
nav_update.py - Replace tabbed mega-menu with simplified category navigation.

Usage:
    python "Python Scipts/nav_update.py"              # Update all pages
    python "Python Scipts/nav_update.py" --dry-run    # Preview without writing
    python "Python Scipts/nav_update.py" --verbose     # Show detailed progress

Replaces the Discover mega-menu (tabbed, two-panel) with a simple
category list linking to landing pages. Computes correct relative
paths based on each file's depth in the directory tree.
"""

import os
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Directories to skip
EXCLUDE_DIRS = {".claude", "data", "Python Scipts", "glossary_factory",
                "assets", "node_modules", ".git", "__pycache__"}

# Marker to identify already-updated files
NEW_MARKER = 'mega-menu--categories'
OLD_MARKER = 'mega-menu--tabbed'


def find_html_files():
    """Walk project and return all HTML files to process."""
    html_files = []
    for dirpath, dirnames, filenames in os.walk(PROJECT_ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for f in filenames:
            if f.endswith(".html"):
                html_files.append(Path(dirpath) / f)
    return sorted(html_files)


def compute_paths(rel_path):
    """Compute relative path prefixes for learn, modality, and pages."""
    parts = rel_path.parts
    file_dir = rel_path.parent.as_posix()

    # Determine depth-based paths
    if file_dir == '.':
        # Root: index.html
        return {
            'learn': 'learn',
            'learn_index': 'learn/index.html',
            'modality': 'learn/modality',
            'pages': 'pages',
        }
    elif file_dir == 'learn':
        return {
            'learn': '.',
            'learn_index': 'index.html',
            'modality': 'modality',
            'pages': '../pages',
        }
    elif file_dir == 'pages':
        return {
            'learn': '../learn',
            'learn_index': '../learn/index.html',
            'modality': '../learn/modality',
            'pages': '.',
        }
    elif file_dir.startswith('learn/modality') and file_dir != 'learn/modality':
        # learn/modality/code/, learn/modality/image/, etc.
        return {
            'learn': '../..',
            'learn_index': '../../index.html',
            'modality': '..',
            'pages': '../../../pages',
        }
    elif file_dir == 'learn/modality':
        return {
            'learn': '..',
            'learn_index': '../index.html',
            'modality': '.',
            'pages': '../../pages',
        }
    else:
        # All other top-level dirs: tools/, foundations/, neurodivergence/, etc.
        return {
            'learn': '../learn',
            'learn_index': '../learn/index.html',
            'modality': '../learn/modality',
            'pages': '../pages',
        }


def build_new_menu(paths):
    """Build the simplified category menu HTML."""
    learn = paths['learn']
    learn_index = paths['learn_index']
    modality = paths['modality']
    pages = paths['pages']

    return f"""                    <div class="mega-menu mega-menu--categories">
                        <div class="mega-menu-quick-links">
                            <a href="{pages}/glossary.html">Glossary</a>
                            <a href="{learn_index}">Discover</a>
                            <a href="{learn}/prompt-basics.html">Prompt Basics</a>
                            <a href="{learn}/facts-fictions.html">Facts &amp; Fictions</a>
                        </div>
                        <div class="mega-menu-group">
                            <span class="mega-menu-group__label">Techniques</span>
                            <a href="{learn}/structured-frameworks.html" class="mega-menu-group__link">Structured Frameworks</a>
                            <a href="{learn}/in-context-learning.html" class="mega-menu-group__link">In-Context Learning</a>
                            <a href="{learn}/reasoning-cot.html" class="mega-menu-group__link">Reasoning &amp; CoT</a>
                            <a href="{learn}/decomposition.html" class="mega-menu-group__link">Decomposition</a>
                            <a href="{learn}/self-correction.html" class="mega-menu-group__link">Self-Correction</a>
                            <a href="{learn}/ensemble-methods.html" class="mega-menu-group__link">Ensemble Methods</a>
                            <a href="{learn}/prompting-strategies.html" class="mega-menu-group__link">Prompting Strategies</a>
                        </div>
                        <div class="mega-menu-group">
                            <span class="mega-menu-group__label">Modality</span>
                            <a href="{modality}/code/" class="mega-menu-group__link">Code</a>
                            <a href="{modality}/image/" class="mega-menu-group__link">Image</a>
                            <a href="{modality}/audio/" class="mega-menu-group__link">Audio</a>
                            <a href="{modality}/video/" class="mega-menu-group__link">Video</a>
                            <a href="{modality}/3d/" class="mega-menu-group__link">3D</a>
                        </div>
                    </div>"""


def update_file(filepath, dry_run=False, verbose=False):
    """Replace the tabbed mega-menu with the simplified version."""
    rel_path = filepath.relative_to(PROJECT_ROOT)
    content = filepath.read_text(encoding="utf-8")

    # Skip if already updated
    if NEW_MARKER in content and OLD_MARKER not in content:
        if verbose:
            print(f"  SKIP (already updated): {rel_path}")
        return "skipped"

    # Check if file has the old mega-menu
    if OLD_MARKER not in content:
        if verbose:
            print(f"  SKIP (no tabbed menu): {rel_path}")
        return "no_menu"

    # Match the entire mega-menu--tabbed block
    # Pattern: from <div class="mega-menu mega-menu--tabbed"> to its closing </div>
    # The block contains nested divs, so we need to count open/close tags
    start_pattern = r'<div class="mega-menu mega-menu--tabbed">'
    start_match = re.search(start_pattern, content)
    if not start_match:
        if verbose:
            print(f"  SKIP (no match): {rel_path}")
        return "no_match"

    # Find the matching closing </div> by counting nesting
    start_pos = start_match.start()
    search_start = start_match.end()
    depth = 1
    pos = search_start

    while depth > 0 and pos < len(content):
        open_match = re.search(r'<div[\s>]', content[pos:])
        close_match = re.search(r'</div>', content[pos:])

        if close_match is None:
            break

        if open_match and open_match.start() < close_match.start():
            depth += 1
            pos += open_match.end()
        else:
            depth -= 1
            if depth == 0:
                end_pos = pos + close_match.end()
                break
            pos += close_match.end()

    if depth != 0:
        if verbose:
            print(f"  ERROR (unbalanced divs): {rel_path}")
        return "error"

    # Also strip comment markers if present
    # Check for <!-- === TABBED MEGA MENU ... --> before the div
    pre_content = content[max(0, start_pos - 100):start_pos]
    comment_match = re.search(r'<!--\s*=+\s*TABBED MEGA MENU.*?-->\s*$', pre_content)
    if comment_match:
        start_pos = start_pos - (len(pre_content) - comment_match.start())

    # Check for <!-- /TABBED MEGA MENU ... --> after the div
    post_content = content[end_pos:end_pos + 100]
    end_comment = re.search(r'^\s*<!--\s*/TABBED MEGA MENU.*?-->', post_content)
    if end_comment:
        end_pos = end_pos + end_comment.end()

    # Build replacement
    paths = compute_paths(rel_path)
    new_menu = build_new_menu(paths)

    # Replace
    new_content = content[:start_pos] + new_menu + content[end_pos:]

    if dry_run:
        print(f"  DRY-RUN: {rel_path}")
        return "dry_run"

    filepath.write_text(new_content, encoding="utf-8")
    if verbose:
        print(f"  UPDATED: {rel_path}")
    return "updated"


def main():
    dry_run = "--dry-run" in sys.argv
    verbose = "--verbose" in sys.argv or dry_run

    mode = "DRY RUN" if dry_run else "NAV UPDATE"
    print(f"{mode}: {PROJECT_ROOT}")
    print()

    html_files = find_html_files()
    print(f"Found {len(html_files)} HTML files\n")

    stats = {"updated": 0, "skipped": 0, "no_menu": 0, "no_match": 0,
             "error": 0, "dry_run": 0}

    for filepath in html_files:
        result = update_file(filepath, dry_run=dry_run, verbose=verbose)
        stats[result] = stats.get(result, 0) + 1

    print(f"\n{'=' * 50}")
    print(f"Results:")
    print(f"  Updated:   {stats.get('updated', 0)}")
    print(f"  Skipped:   {stats.get('skipped', 0)} (already updated)")
    print(f"  No menu:   {stats.get('no_menu', 0)}")
    print(f"  No match:  {stats.get('no_match', 0)}")
    print(f"  Errors:    {stats.get('error', 0)}")
    if dry_run:
        print(f"  Dry run:   {stats.get('dry_run', 0)}")
    print(f"{'=' * 50}")


if __name__ == "__main__":
    main()
