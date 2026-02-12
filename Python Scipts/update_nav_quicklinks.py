"""
Batch update: Add 2 new quick links to mega-menu sidebar.

Adds after existing Prompt Basics + Facts & Fictions:
- Glossary (pages/glossary.html)
- AI Foundations (foundations/index.html)

Handles 4 depth variants (0, 1, 2, 3) by computing root prefix from file path.
"""

import os
import re

root = '.'
updated = 0
skipped = 0
errors = []

for dirpath, dirnames, filenames in os.walk(root):
    # Skip non-content directories
    if any(skip in dirpath for skip in ['.claude', '.git', 'data', 'assets', 'node_modules', '__pycache__']):
        continue
    for filename in filenames:
        if not filename.endswith('.html'):
            continue
        filepath = os.path.join(dirpath, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Only process files with quick links
        if 'mega-menu-quick-links' not in content:
            skipped += 1
            continue

        # Skip files already updated (have Glossary in quick links)
        ql_match = re.search(
            r'mega-menu-quick-links.*?</div>',
            content,
            re.DOTALL
        )
        if ql_match and 'Glossary</a>' in ql_match.group(0):
            skipped += 1
            continue

        # Compute depth from file path for root prefix
        rel = os.path.relpath(dirpath, root).replace('\\', '/')
        if rel == '.':
            depth = 0
        else:
            depth = len(rel.split('/'))
        root_prefix = '../' * depth

        # Build new link hrefs
        glossary_href = root_prefix + 'pages/glossary.html'
        foundations_href = root_prefix + 'foundations/index.html'

        # Find the Facts & Fictions link line (handle both & and &amp;)
        ff_pattern = re.compile(
            r'(\s*)<a href="([^"]+)">Facts (?:&amp;|&) Fictions</a>'
        )
        ff_match = ff_pattern.search(content)
        if not ff_match:
            errors.append(f"  WARN: Could not find Facts & Fictions link in {filepath}")
            continue

        indent = ff_match.group(1)
        old_line = ff_match.group(0)

        new_lines = (
            old_line +
            f'{indent}<a href="{glossary_href}">Glossary</a>' +
            f'{indent}<a href="{foundations_href}">AI Foundations</a>'
        )

        content = content.replace(old_line, new_lines, 1)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        updated += 1
        print(f"  Updated: {filepath} (depth {depth})")

print(f"\nTotal updated: {updated} files")
print(f"Skipped: {skipped} files")
if errors:
    print("Errors/warnings:")
    for e in errors:
        print(e)
