"""
Batch update: Add 4 emerging framework pages to mega-menu navigation.

Adds to Prompting Strategies tab (after RE2):
  - System Prompting
  - RAG
  - Agentic Prompting

Adds to Decomposition tab (after Program of Thought):
  - Skeleton-of-Thought

Handles 4 depth variants (depth 0, 1, 2, 3) with appropriate relative paths.
"""

import os
import re

root = '.'
updated = 0
skipped = 0
errors = []

# New links to add — keyed by the last existing link text to insert after
NEW_PROMPTING = [
    ('system-prompting.html', 'System Prompting'),
    ('rag.html', 'RAG'),
    ('agentic-prompting.html', 'Agentic Prompting'),
]
NEW_DECOMPOSITION = [
    ('skeleton-of-thought.html', 'Skeleton-of-Thought'),
]

def get_depth(filepath):
    """Calculate depth from project root."""
    rel = os.path.relpath(filepath, root).replace('\\', '/')
    parts = rel.split('/')
    return max(0, len(parts) - 1)

def get_prefix(depth):
    """Get the path prefix for learn/ directory links at a given depth."""
    if depth == 0:
        return ''
    return '../' * depth

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

        # Only process files with the tabbed mega-menu
        if 'mega-menu--tabbed' not in content:
            skipped += 1
            continue

        # Skip files that already have the new links
        if 'system-prompting.html' in content and 'skeleton-of-thought.html' in content:
            skipped += 1
            continue

        depth = get_depth(filepath)
        prefix = get_prefix(depth)
        modified = False

        # --- Add to Prompting Strategies section (after RE2 link) ---
        if 'system-prompting.html' not in content:
            # Find the RE2 link line within the prompting-strategies section
            re2_pattern = r'(<a href="[^"]*re2\.html">RE2</a>)'
            re2_match = re.search(re2_pattern, content)
            if re2_match:
                re2_line = re2_match.group(1)
                # Build the new links with same indentation
                # Find the indentation of the RE2 line
                line_start = content.rfind('\n', 0, re2_match.start()) + 1
                indent = ''
                for ch in content[line_start:re2_match.start()]:
                    if ch in ' \t':
                        indent += ch
                    else:
                        break

                new_links = ''
                for slug, label in NEW_PROMPTING:
                    new_links += f'\n{indent}<a href="{prefix}learn/{slug}">{label}</a>'

                content = content.replace(
                    re2_line,
                    re2_line + new_links,
                    1
                )
                modified = True
            else:
                errors.append(f"  WARN: Could not find RE2 link in {filepath}")

        # --- Add to Decomposition section (after Program of Thought link) ---
        if 'skeleton-of-thought.html' not in content:
            pot_pattern = r'(<a href="[^"]*program-of-thought\.html">Program of Thought</a>)'
            pot_match = re.search(pot_pattern, content)
            if pot_match:
                pot_line = pot_match.group(1)
                line_start = content.rfind('\n', 0, pot_match.start()) + 1
                indent = ''
                for ch in content[line_start:pot_match.start()]:
                    if ch in ' \t':
                        indent += ch
                    else:
                        break

                new_links = ''
                for slug, label in NEW_DECOMPOSITION:
                    new_links += f'\n{indent}<a href="{prefix}learn/{slug}">{label}</a>'

                content = content.replace(
                    pot_line,
                    pot_line + new_links,
                    1
                )
                modified = True
            else:
                errors.append(f"  WARN: Could not find Program of Thought link in {filepath}")

        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated += 1
        else:
            skipped += 1

print(f"Updated: {updated} files")
print(f"Skipped: {skipped} files")
if errors:
    print("Errors/warnings:")
    for e in errors:
        print(e)
