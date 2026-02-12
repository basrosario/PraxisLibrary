"""
Session 51: Add 3D section to Discover mega-menu across all HTML files.
Inserts after the Video section. Uses tabbed format (data-tab="3d").
This adds a NEW 13th tab to the mega-menu.
"""

import os
import re
import glob

ROOT = r"c:\Users\basro\Music\_public_html"

# 3D section HTML by depth level — uses tabbed format
THREE_D_SECTION = {
    0: """
                        <div class="mega-menu-section" data-tab="3d" role="tabpanel">
                            <h4>3D</h4>
                            <a href="learn/modality/3d/3d-prompting.html">3D Prompting</a>
                            <a href="learn/modality/3d/3d-model-gen.html">3D Model Generation</a>
                            <a href="learn/modality/3d/scene-understanding.html">Scene Understanding</a>
                            <a href="learn/modality/3d/pose-estimation.html">Pose Estimation</a>
                            <a href="learn/modality/3d/point-cloud.html">Point Cloud</a>
                        </div>""",
    1: """
                        <div class="mega-menu-section" data-tab="3d" role="tabpanel">
                            <h4>3D</h4>
                            <a href="../learn/modality/3d/3d-prompting.html">3D Prompting</a>
                            <a href="../learn/modality/3d/3d-model-gen.html">3D Model Generation</a>
                            <a href="../learn/modality/3d/scene-understanding.html">Scene Understanding</a>
                            <a href="../learn/modality/3d/pose-estimation.html">Pose Estimation</a>
                            <a href="../learn/modality/3d/point-cloud.html">Point Cloud</a>
                        </div>""",
    2: """
                        <div class="mega-menu-section" data-tab="3d" role="tabpanel">
                            <h4>3D</h4>
                            <a href="3d/3d-prompting.html">3D Prompting</a>
                            <a href="3d/3d-model-gen.html">3D Model Generation</a>
                            <a href="3d/scene-understanding.html">Scene Understanding</a>
                            <a href="3d/pose-estimation.html">Pose Estimation</a>
                            <a href="3d/point-cloud.html">Point Cloud</a>
                        </div>""",
    3: """
                        <div class="mega-menu-section" data-tab="3d" role="tabpanel">
                            <h4>3D</h4>
                            <a href="../3d/3d-prompting.html">3D Prompting</a>
                            <a href="../3d/3d-model-gen.html">3D Model Generation</a>
                            <a href="../3d/scene-understanding.html">Scene Understanding</a>
                            <a href="../3d/pose-estimation.html">Pose Estimation</a>
                            <a href="../3d/point-cloud.html">Point Cloud</a>
                        </div>""",
}


def get_depth(filepath):
    """Determine depth level relative to root."""
    rel = os.path.relpath(filepath, ROOT).replace("\\", "/")
    parts = rel.split("/")
    return len(parts) - 1


def process_file(filepath):
    """Add 3D section after Video section in the mega-menu."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip files that already have the 3D section
    if 'data-tab="3d"' in content:
        return False

    depth = get_depth(filepath)

    # Find the Video section — it has data-tab="video"
    # We need to insert the 3D section right after the Video section's closing </div>
    video_pattern = r'(<div class="mega-menu-section" data-tab="video" role="tabpanel">.*?</div>)'
    match = re.search(video_pattern, content, re.DOTALL)

    if not match:
        return False

    insert_pos = match.end()
    three_d_html = THREE_D_SECTION[depth]
    new_content = content[:insert_pos] + three_d_html + content[insert_pos:]

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

# Depth 3 (learn/modality/code/*.html, image/*.html, audio/*.html, video/*.html, 3d/*.html)
for d in ["code", "image", "audio", "video", "3d"]:
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
            print(f"  Updated (depth {depth}): {rel}")
        else:
            skipped += 1
    except Exception as e:
        errors.append((f, str(e)))
        print(f"  ERROR: {os.path.relpath(f, ROOT)} - {e}")

print(f"\n=== SUMMARY ===")
print(f"Updated: {updated}")
print(f"Skipped (already has 3D or no Video section): {skipped}")
print(f"Errors: {len(errors)}")
if errors:
    for f, e in errors:
        print(f"  {os.path.relpath(f, ROOT)}: {e}")
