"""
Session 48: Convert Discover mega-menu from multi-column to tabbed layout.
Converts the FIRST mega-menu--multi-column (Discover) in each HTML file to
mega-menu--tabbed with data-tab/role attributes and a tablist container.
Resources menu (second mega-menu--multi-column) is left unchanged.
"""

import os
import re
import glob

ROOT = r"c:\Users\basro\Music\_public_html"

# Map h4 text (as raw HTML source) to data-tab slug
SLUG_MAP = {
    'Getting Started': 'getting-started',
    'Structured Frameworks': 'structured-frameworks',
    'In-Context Learning': 'in-context-learning',
    'Reasoning &amp; CoT': 'reasoning-cot',
    'Reasoning & CoT': 'reasoning-cot',
    'Decomposition': 'decomposition',
    'Self-Correction': 'self-correction',
    'Ensemble Methods': 'ensemble-methods',
    'Prompting Strategies': 'prompting-strategies',
    'Code': 'code',
    'Image': 'image',
}

TABLIST_HTML = '<div class="mega-menu-tabs" role="tablist" aria-label="Framework categories"></div>'


def get_depth(filepath):
    """Determine depth level relative to root."""
    rel = os.path.relpath(filepath, ROOT).replace("\\", "/")
    parts = rel.split("/")
    return len(parts) - 1


def process_file(filepath):
    """Convert the Discover mega-menu to tabbed format."""
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    content = "".join(lines)

    # Skip if already converted
    if "mega-menu--tabbed" in content:
        return "skip_already"

    # Skip if no multi-column menu
    if "mega-menu--multi-column" not in content:
        return "skip_no_menu"

    new_lines = []
    first_multi_replaced = False

    i = 0
    while i < len(lines):
        line = lines[i]

        # Step 1: Replace first mega-menu--multi-column with mega-menu--tabbed
        if not first_multi_replaced and "mega-menu--multi-column" in line:
            line = line.replace("mega-menu--multi-column", "mega-menu--tabbed", 1)
            first_multi_replaced = True
            new_lines.append(line)

            # Step 2: Insert tablist div on the next line (same indentation as sections)
            # Detect indentation from the current line
            indent_match = re.match(r"(\s*)", line)
            indent = indent_match.group(1) if indent_match else ""
            # Sections use one more level of indent (typically 24 spaces)
            section_indent = indent + "    "
            new_lines.append(section_indent + TABLIST_HTML + "\n")
            i += 1
            continue

        # Step 3: Add data-tab to mega-menu-section divs within Discover menu
        # Only process after we've found and replaced the first multi-column
        if first_multi_replaced and '<div class="mega-menu-section">' in line:
            # Look ahead at the next line for h4 text
            if i + 1 < len(lines):
                next_line = lines[i + 1]
                h4_match = re.search(r"<h4>(?:<a[^>]*>)?([^<]+)", next_line)
                if h4_match:
                    h4_text = h4_match.group(1).strip()
                    if h4_text in SLUG_MAP:
                        slug = SLUG_MAP[h4_text]
                        line = line.replace(
                            '<div class="mega-menu-section">',
                            f'<div class="mega-menu-section" data-tab="{slug}" role="tabpanel">',
                        )

        new_lines.append(line)
        i += 1

    with open(filepath, "w", encoding="utf-8") as f:
        f.writelines(new_lines)

    return "updated"


# Collect all HTML files
html_files = []

# Root level (depth 0) — index.html
root_index = os.path.join(ROOT, "index.html")
if os.path.exists(root_index):
    html_files.append(root_index)

# Depth 1
for d in ["learn", "pages", "tools", "foundations", "neurodivergence", "quiz", "patterns"]:
    pattern = os.path.join(ROOT, d, "*.html")
    html_files.extend(glob.glob(pattern))

# Depth 2 (learn/modality/index.html)
modality_index = os.path.join(ROOT, "learn", "modality", "index.html")
if os.path.exists(modality_index):
    html_files.append(modality_index)

# Depth 3 (learn/modality/code/*.html, learn/modality/image/*.html)
for d in ["code", "image"]:
    pattern = os.path.join(ROOT, "learn", "modality", d, "*.html")
    html_files.extend(glob.glob(pattern))

# Remove duplicates
html_files = list(set(html_files))

updated = 0
skipped_already = 0
skipped_no_menu = 0
errors = []

for f in sorted(html_files):
    try:
        result = process_file(f)
        rel = os.path.relpath(f, ROOT)
        if result == "updated":
            updated += 1
            depth = get_depth(f)
            print(f"  Updated (depth {depth}): {rel}")
        elif result == "skip_already":
            skipped_already += 1
        elif result == "skip_no_menu":
            skipped_no_menu += 1
    except Exception as e:
        errors.append((f, str(e)))
        print(f"  ERROR: {os.path.relpath(f, ROOT)} - {e}")

print(f"\n=== SUMMARY ===")
print(f"Updated: {updated}")
print(f"Skipped (already tabbed): {skipped_already}")
print(f"Skipped (no mega-menu): {skipped_no_menu}")
print(f"Errors: {len(errors)}")
if errors:
    for f, e in errors:
        print(f"  {os.path.relpath(f, ROOT)}: {e}")
