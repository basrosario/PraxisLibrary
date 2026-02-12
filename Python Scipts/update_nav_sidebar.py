"""
Batch update: Convert Getting Started tab into sidebar quick links.

Changes per file:
1. Remove the data-tab="getting-started" section (extract its href values first)
2. Wrap .mega-menu-tabs in a .mega-menu-sidebar div
3. Add .mega-menu-quick-links with Prompt Basics + Facts & Fictions before tabs

Handles 4 depth variants (depth 0, 1, 2, 3) by extracting existing href values.
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

        # Only process files with the tabbed mega-menu
        if 'mega-menu--tabbed' not in content:
            skipped += 1
            continue

        # Skip files already converted (have mega-menu-sidebar)
        if 'mega-menu-sidebar' in content:
            skipped += 1
            continue

        # Extract href values from getting-started section
        gs_match = re.search(
            r'<div class="mega-menu-section" data-tab="getting-started" role="tabpanel">\s*'
            r'<h4>Getting Started</h4>\s*'
            r'<a href="([^"]+)">Prompt Basics</a>\s*'
            r'<a href="([^"]+)">Facts (?:&amp;|&) Fictions</a>\s*'
            r'</div>',
            content
        )
        if not gs_match:
            errors.append(f"  WARN: Could not find getting-started section in {filepath}")
            continue

        pb_href = gs_match.group(1)
        ff_href = gs_match.group(2)

        # Determine the ampersand encoding used in this file
        fictions_amp = '&amp;' if '&amp; Fictions' in gs_match.group(0) else '&'

        # 1. Remove the getting-started section (including surrounding whitespace)
        content = re.sub(
            r'\n\s*<div class="mega-menu-section" data-tab="getting-started" role="tabpanel">.*?</div>',
            '',
            content,
            flags=re.DOTALL,
            count=1
        )

        # 2. Replace bare mega-menu-tabs with sidebar-wrapped version
        # Match the tabs div with its exact indentation
        tabs_match = re.search(
            r'(\s*)<div class="mega-menu-tabs" role="tablist" aria-label="Framework categories"></div>',
            content
        )
        if not tabs_match:
            errors.append(f"  WARN: Could not find mega-menu-tabs in {filepath}")
            continue

        indent = tabs_match.group(1)  # Whitespace before the div
        # Build inner indent (one level deeper)
        inner = indent + '    '

        old_tabs = tabs_match.group(0)
        new_sidebar = (
            f'{indent}<div class="mega-menu-sidebar">'
            f'{inner}<div class="mega-menu-quick-links">'
            f'{inner}    <a href="{pb_href}">Prompt Basics</a>'
            f'{inner}    <a href="{ff_href}">Facts {fictions_amp} Fictions</a>'
            f'{inner}</div>'
            f'{inner}<div class="mega-menu-tabs" role="tablist" aria-label="Framework categories"></div>'
            f'{indent}</div>'
        )

        content = content.replace(old_tabs, new_sidebar, 1)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        updated += 1

print(f"Updated: {updated} files")
print(f"Skipped: {skipped} files")
if errors:
    print("Errors/warnings:")
    for e in errors:
        print(e)
