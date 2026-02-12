"""
Batch update: Reorder quick links in mega-menu sidebar.

New order: Glossary, AI Foundations, Prompt Basics, Facts & Fictions
(Was: Prompt Basics, Facts & Fictions, Glossary, AI Foundations)
"""

import os
import re

root = '.'
updated = 0
skipped = 0
errors = []

for dirpath, dirnames, filenames in os.walk(root):
    if any(skip in dirpath for skip in ['.claude', '.git', 'data', 'assets', 'node_modules', '__pycache__']):
        continue
    for filename in filenames:
        if not filename.endswith('.html'):
            continue
        filepath = os.path.join(dirpath, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if 'mega-menu-quick-links' not in content:
            skipped += 1
            continue

        # Match the entire quick-links block with all 4 links
        ql_pattern = re.compile(
            r'(<div class="mega-menu-quick-links">)\s*'
            r'<a href="([^"]+)">Prompt Basics</a>\s*'
            r'<a href="([^"]+)">Facts (?:&amp;|&) Fictions</a>\s*'
            r'<a href="([^"]+)">Glossary</a>\s*'
            r'<a href="([^"]+)">AI Foundations</a>\s*'
            r'(</div>)',
            re.DOTALL
        )

        match = ql_pattern.search(content)
        if not match:
            errors.append(f"  WARN: Could not match quick-links block in {filepath}")
            continue

        open_div = match.group(1)
        pb_href = match.group(2)
        ff_href = match.group(3)
        gl_href = match.group(4)
        af_href = match.group(5)
        close_div = match.group(6)

        # Detect ampersand encoding
        amp = '&amp;' if '&amp; Fictions' in match.group(0) else '&'

        # Detect indentation from original
        full_match = match.group(0)
        # Find the indent of the <a> tags
        a_indent_match = re.search(r'\n(\s+)<a href="', full_match)
        if a_indent_match:
            a_indent = '\n' + a_indent_match.group(1)
        else:
            a_indent = '\n                                '

        # Find indent of closing div
        close_indent_match = re.search(r'\n(\s+)</div>', full_match)
        if close_indent_match:
            close_indent = '\n' + close_indent_match.group(1)
        else:
            close_indent = '\n                            '

        # Build reordered block: Glossary, AI Foundations, Prompt Basics, Facts & Fictions
        new_block = (
            f'{open_div}'
            f'{a_indent}<a href="{gl_href}">Glossary</a>'
            f'{a_indent}<a href="{af_href}">AI Foundations</a>'
            f'{a_indent}<a href="{pb_href}">Prompt Basics</a>'
            f'{a_indent}<a href="{ff_href}">Facts {amp} Fictions</a>'
            f'{close_indent}{close_div}'
        )

        content = content[:match.start()] + new_block + content[match.end():]

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        updated += 1

print(f"Reordered: {updated} files")
print(f"Skipped: {skipped} files")
if errors:
    print("Errors/warnings:")
    for e in errors:
        print(e)
