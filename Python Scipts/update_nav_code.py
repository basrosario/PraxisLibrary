"""
Session 50: Add 5 new Code links to existing Code section in Discover mega-menu.
Inserts after the existing 3 Code links (Code Prompting, Self-Debugging, Structured Output).
"""

import os
import re
import glob

ROOT = r"c:\Users\basro\Music\_public_html"

# New code links by depth level — appended inside existing code section
NEW_CODE_LINKS = {
    0: """
                            <a href="learn/modality/code/program-synthesis.html">Program Synthesis</a>
                            <a href="learn/modality/code/code-explanation.html">Code Explanation</a>
                            <a href="learn/modality/code/code-review.html">Code Review</a>
                            <a href="learn/modality/code/test-generation.html">Test Generation</a>
                            <a href="learn/modality/code/sql-generation.html">SQL Generation</a>""",
    1: """
                            <a href="../learn/modality/code/program-synthesis.html">Program Synthesis</a>
                            <a href="../learn/modality/code/code-explanation.html">Code Explanation</a>
                            <a href="../learn/modality/code/code-review.html">Code Review</a>
                            <a href="../learn/modality/code/test-generation.html">Test Generation</a>
                            <a href="../learn/modality/code/sql-generation.html">SQL Generation</a>""",
    2: """
                            <a href="code/program-synthesis.html">Program Synthesis</a>
                            <a href="code/code-explanation.html">Code Explanation</a>
                            <a href="code/code-review.html">Code Review</a>
                            <a href="code/test-generation.html">Test Generation</a>
                            <a href="code/sql-generation.html">SQL Generation</a>""",
    3: """
                            <a href="../code/program-synthesis.html">Program Synthesis</a>
                            <a href="../code/code-explanation.html">Code Explanation</a>
                            <a href="../code/code-review.html">Code Review</a>
                            <a href="../code/test-generation.html">Test Generation</a>
                            <a href="../code/sql-generation.html">SQL Generation</a>""",
}

# Special case: files IN the code directory use different relative paths
CODE_DIR_LINKS = """
                            <a href="../../modality/code/program-synthesis.html">Program Synthesis</a>
                            <a href="../../modality/code/code-explanation.html">Code Explanation</a>
                            <a href="../../modality/code/code-review.html">Code Review</a>
                            <a href="../../modality/code/test-generation.html">Test Generation</a>
                            <a href="../../modality/code/sql-generation.html">SQL Generation</a>"""


def get_depth(filepath):
    """Determine depth level relative to root."""
    rel = os.path.relpath(filepath, ROOT).replace("\\", "/")
    parts = rel.split("/")
    return len(parts) - 1


def is_in_code_dir(filepath):
    """Check if file is inside learn/modality/code/."""
    rel = os.path.relpath(filepath, ROOT).replace("\\", "/")
    return rel.startswith("learn/modality/code/")


def process_file(filepath):
    """Add 5 new links to existing Code section in the mega-menu."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip files that already have program-synthesis link
    if "program-synthesis.html" in content:
        return False

    # Must have existing code section
    if 'data-tab="code"' not in content:
        return False

    depth = get_depth(filepath)

    # Find the last existing link in the Code section (Structured Output)
    # Pattern: find "Structured Output</a>" inside the code section
    # We insert new links after this line
    code_section_pattern = r'(<div class="mega-menu-section" data-tab="code" role="tabpanel">.*?)(</div>)'
    match = re.search(code_section_pattern, content, re.DOTALL)

    if not match:
        return False

    # Find the position right before the closing </div> of the code section
    section_content = match.group(1)
    section_end = match.start(2)

    # Choose the right links based on whether file is in code dir
    if is_in_code_dir(filepath):
        new_links = CODE_DIR_LINKS
    else:
        new_links = NEW_CODE_LINKS[depth]

    new_content = content[:section_end] + new_links + "\n                        " + content[section_end:]

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    return True


# Collect all HTML files
html_files = []

# Root level (depth 0)
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

# Depth 3 (learn/modality/code/*.html, image/*.html, audio/*.html, video/*.html)
for d in ["code", "image", "audio", "video"]:
    pattern = os.path.join(ROOT, "learn", "modality", d, "*.html")
    html_files.extend(glob.glob(pattern))

# Remove duplicates
html_files = list(set(html_files))

updated = 0
skipped = 0
errors = []

for f in sorted(html_files):
    try:
        if process_file(f):
            updated += 1
            rel = os.path.relpath(f, ROOT)
            depth = get_depth(f)
            in_code = " [code-dir]" if is_in_code_dir(f) else ""
            print(f"  Updated (depth {depth}{in_code}): {rel}")
        else:
            skipped += 1
    except Exception as e:
        errors.append((f, str(e)))
        print(f"  ERROR: {os.path.relpath(f, ROOT)} - {e}")

print(f"\n=== SUMMARY ===")
print(f"Updated: {updated}")
print(f"Skipped (already has new links or no code section): {skipped}")
print(f"Errors: {len(errors)}")
if errors:
    for f, e in errors:
        print(f"  {os.path.relpath(f, ROOT)}: {e}")
