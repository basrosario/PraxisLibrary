#!/usr/bin/env python3
"""
inject_section_tip.py — Insert a full-width NLP tip banner after
the "Comparison" section on all learn pages.

Injection point: immediately after <!-- /THE COMPARISON -->

Usage:
  python "Python Scipts/inject_section_tip.py"
  python "Python Scipts/inject_section_tip.py" --dry-run
"""

import os
import re
import argparse

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EXCLUDE_DIRS = {'.claude', '.git', 'glossary_factory', 'node_modules',
                'Python Scipts', '__pycache__', 'assets', 'data'}

# The marker we inject after
MARKER = '<!-- /THE COMPARISON -->'

# The HTML to inject (indented to match learn page structure)
TIP_HTML = """
        <!-- === NLP TIP === -->
        <section class="section-tip fade-in-up">
            <div class="container">
                <div class="section-tip__content">
                    <div class="section-tip__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>
                        </svg>
                    </div>
                    <div class="section-tip__text">
                        <h3 class="section-tip__title">Natural Language Works Too</h3>
                        <p>While structured frameworks and contextual labels are powerful tools, <strong>LLMs are exceptionally good at understanding natural language.</strong> As long as your prompt contains the actual contextual information needed to create, answer, or deliver the response you&rsquo;re looking for &mdash; the who, what, why, and constraints &mdash; the AI can produce complete and accurate results whether you use a formal framework or plain conversational language. But even in 2026, with the best prompts, <strong>verifying AI output is always a necessary step.</strong></p>
                    </div>
                </div>
            </div>
        </section>
        <!-- /NLP TIP -->
"""


def discover_html_files():
    """Find all HTML files under ROOT_DIR/learn/."""
    result = []
    learn_dir = os.path.join(ROOT_DIR, 'learn')
    for dirpath, dirnames, filenames in os.walk(learn_dir):
        dirnames[:] = [d for d in dirnames
                       if d not in EXCLUDE_DIRS and not d.startswith('.')]
        for fn in filenames:
            if fn.endswith('.html'):
                result.append(os.path.join(dirpath, fn))
    return sorted(result)


def process_file(filepath, dry_run=False):
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    # Only process files that have the comparison marker
    if MARKER not in content:
        return False

    # Check if already injected
    if '<!-- === NLP TIP === -->' in content:
        return False

    # Inject tip HTML immediately after the comparison closing marker
    modified = content.replace(MARKER, MARKER + TIP_HTML, 1)

    if modified == content:
        return False

    if not dry_run:
        with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
            f.write(modified)

    return True


def main():
    parser = argparse.ArgumentParser(
        description="Inject NLP tip banner between Comparison and In Action sections")
    parser.add_argument('--dry-run', action='store_true',
                        help="Show what would change without modifying files")
    args = parser.parse_args()

    files = discover_html_files()
    modified_count = 0

    for filepath in files:
        rel = os.path.relpath(filepath, ROOT_DIR)
        result = process_file(filepath, dry_run=args.dry_run)
        if result:
            modified_count += 1
            prefix = "[DRY RUN] " if args.dry_run else ""
            print(f"  {prefix}{rel}: tip injected")

    print(f"\n{'[DRY RUN] ' if args.dry_run else ''}Summary:")
    print(f"  Files scanned: {len(files)}")
    print(f"  Files modified: {modified_count}")


if __name__ == "__main__":
    main()
