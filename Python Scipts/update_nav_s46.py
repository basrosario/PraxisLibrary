"""
Session 46: Update mega-menu navigation across all HTML files.
Adds Image section to the Discover mega-menu after the Code section.
"""

import os
import re
import glob

ROOT = r"c:\Users\basro\Music\_public_html"

# The Image section HTML to insert — we need 4 variants by depth level
# Depth 0: root (index.html)
# Depth 1: one-deep (learn/*.html, pages/*.html, tools/*.html, etc.)
# Depth 2: two-deep (learn/modality/index.html)
# Depth 3: three-deep (learn/modality/code/*.html, learn/modality/image/*.html)

IMAGE_SECTION = {
    0: """                        <div class="mega-menu-section">
                            <h4>Image</h4>
                            <a href="learn/modality/image/image-prompting.html">Image Prompting</a>
                            <a href="learn/modality/image/multimodal-cot.html">Multimodal CoT</a>
                            <a href="learn/modality/image/visual-cot.html">Visual CoT</a>
                            <a href="learn/modality/image/image-as-text.html">Image-as-Text</a>
                            <a href="learn/modality/image/vqa.html">Visual QA</a>
                            <a href="learn/modality/image/image-gen-prompting.html">Image Generation</a>
                            <a href="learn/modality/image/negative-prompting.html">Negative Prompting</a>
                            <a href="learn/modality/image/controlnet-prompting.html">ControlNet</a>
                            <a href="learn/modality/image/inpainting-prompting.html">Inpainting</a>
                            <a href="learn/modality/image/style-transfer.html">Style Transfer</a>
                            <a href="learn/modality/image/image-to-image.html">Image-to-Image</a>
                            <a href="learn/modality/image/composition-prompting.html">Composition</a>
                        </div>""",
    1: """                        <div class="mega-menu-section">
                            <h4>Image</h4>
                            <a href="../learn/modality/image/image-prompting.html">Image Prompting</a>
                            <a href="../learn/modality/image/multimodal-cot.html">Multimodal CoT</a>
                            <a href="../learn/modality/image/visual-cot.html">Visual CoT</a>
                            <a href="../learn/modality/image/image-as-text.html">Image-as-Text</a>
                            <a href="../learn/modality/image/vqa.html">Visual QA</a>
                            <a href="../learn/modality/image/image-gen-prompting.html">Image Generation</a>
                            <a href="../learn/modality/image/negative-prompting.html">Negative Prompting</a>
                            <a href="../learn/modality/image/controlnet-prompting.html">ControlNet</a>
                            <a href="../learn/modality/image/inpainting-prompting.html">Inpainting</a>
                            <a href="../learn/modality/image/style-transfer.html">Style Transfer</a>
                            <a href="../learn/modality/image/image-to-image.html">Image-to-Image</a>
                            <a href="../learn/modality/image/composition-prompting.html">Composition</a>
                        </div>""",
    2: """                        <div class="mega-menu-section">
                            <h4>Image</h4>
                            <a href="image/image-prompting.html">Image Prompting</a>
                            <a href="image/multimodal-cot.html">Multimodal CoT</a>
                            <a href="image/visual-cot.html">Visual CoT</a>
                            <a href="image/image-as-text.html">Image-as-Text</a>
                            <a href="image/vqa.html">Visual QA</a>
                            <a href="image/image-gen-prompting.html">Image Generation</a>
                            <a href="image/negative-prompting.html">Negative Prompting</a>
                            <a href="image/controlnet-prompting.html">ControlNet</a>
                            <a href="image/inpainting-prompting.html">Inpainting</a>
                            <a href="image/style-transfer.html">Style Transfer</a>
                            <a href="image/image-to-image.html">Image-to-Image</a>
                            <a href="image/composition-prompting.html">Composition</a>
                        </div>""",
    3: """                        <div class="mega-menu-section">
                            <h4>Image</h4>
                            <a href="../image/image-prompting.html">Image Prompting</a>
                            <a href="../image/multimodal-cot.html">Multimodal CoT</a>
                            <a href="../image/visual-cot.html">Visual CoT</a>
                            <a href="../image/image-as-text.html">Image-as-Text</a>
                            <a href="../image/vqa.html">Visual QA</a>
                            <a href="../image/image-gen-prompting.html">Image Generation</a>
                            <a href="../image/negative-prompting.html">Negative Prompting</a>
                            <a href="../image/controlnet-prompting.html">ControlNet</a>
                            <a href="../image/inpainting-prompting.html">Inpainting</a>
                            <a href="../image/style-transfer.html">Style Transfer</a>
                            <a href="../image/image-to-image.html">Image-to-Image</a>
                            <a href="../image/composition-prompting.html">Composition</a>
                        </div>""",
}

def get_depth(filepath):
    """Determine depth level relative to root."""
    rel = os.path.relpath(filepath, ROOT).replace("\\", "/")
    parts = rel.split("/")
    # Depth = number of directory parts (excluding filename)
    return len(parts) - 1

def process_file(filepath):
    """Add Image section after Code section in the mega-menu."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip files that already have the Image section
    if "<h4>Image</h4>" in content:
        return False

    # Find the Code section closing </div> and insert Image section after it
    # Pattern: the Code mega-menu-section ends with </div> followed by the closing
    # of the mega-menu--multi-column div
    # We look for the Code section and insert after its closing </div>

    depth = get_depth(filepath)

    # Find the Code section — it's a mega-menu-section containing <h4>Code</h4>
    # We need to insert the Image section right after the Code section's closing </div>
    code_pattern = r'(<div class="mega-menu-section">\s*<h4>Code</h4>.*?</div>)'
    match = re.search(code_pattern, content, re.DOTALL)

    if not match:
        return False

    insert_pos = match.end()
    image_html = "\n" + IMAGE_SECTION[depth]
    new_content = content[:insert_pos] + image_html + content[insert_pos:]

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    return True

# Collect all HTML files
html_files = []

# Root level (depth 0)
html_files.append(os.path.join(ROOT, "index.html"))

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
skipped = 0
errors = []

for f in sorted(html_files):
    try:
        if process_file(f):
            updated += 1
            rel = os.path.relpath(f, ROOT)
            print(f"  Updated: {rel}")
        else:
            skipped += 1
    except Exception as e:
        errors.append((f, str(e)))
        print(f"  ERROR: {os.path.relpath(f, ROOT)} - {e}")

print(f"\n=== SUMMARY ===")
print(f"Updated: {updated}")
print(f"Skipped (already has Image or no Code section): {skipped}")
print(f"Errors: {len(errors)}")
if errors:
    for f, e in errors:
        print(f"  {os.path.relpath(f, ROOT)}: {e}")
