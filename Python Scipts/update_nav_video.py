"""
Session 49: Add Video section to Discover mega-menu across all HTML files.
Inserts after the Audio section. Uses tabbed format (data-tab="video").
"""

import os
import re
import glob

ROOT = r"c:\Users\basro\Music\_public_html"

# Video section HTML by depth level — uses tabbed format
VIDEO_SECTION = {
    0: """
                        <div class="mega-menu-section" data-tab="video" role="tabpanel">
                            <h4>Video</h4>
                            <a href="learn/modality/video/video-prompting.html">Video Prompting</a>
                            <a href="learn/modality/video/video-gen.html">Video Generation</a>
                            <a href="learn/modality/video/temporal-reasoning.html">Temporal Reasoning</a>
                            <a href="learn/modality/video/video-qa.html">Video QA</a>
                            <a href="learn/modality/video/video-captioning.html">Video Captioning</a>
                            <a href="learn/modality/video/video-editing.html">Video Editing</a>
                        </div>""",
    1: """
                        <div class="mega-menu-section" data-tab="video" role="tabpanel">
                            <h4>Video</h4>
                            <a href="../learn/modality/video/video-prompting.html">Video Prompting</a>
                            <a href="../learn/modality/video/video-gen.html">Video Generation</a>
                            <a href="../learn/modality/video/temporal-reasoning.html">Temporal Reasoning</a>
                            <a href="../learn/modality/video/video-qa.html">Video QA</a>
                            <a href="../learn/modality/video/video-captioning.html">Video Captioning</a>
                            <a href="../learn/modality/video/video-editing.html">Video Editing</a>
                        </div>""",
    2: """
                        <div class="mega-menu-section" data-tab="video" role="tabpanel">
                            <h4>Video</h4>
                            <a href="video/video-prompting.html">Video Prompting</a>
                            <a href="video/video-gen.html">Video Generation</a>
                            <a href="video/temporal-reasoning.html">Temporal Reasoning</a>
                            <a href="video/video-qa.html">Video QA</a>
                            <a href="video/video-captioning.html">Video Captioning</a>
                            <a href="video/video-editing.html">Video Editing</a>
                        </div>""",
    3: """
                        <div class="mega-menu-section" data-tab="video" role="tabpanel">
                            <h4>Video</h4>
                            <a href="../video/video-prompting.html">Video Prompting</a>
                            <a href="../video/video-gen.html">Video Generation</a>
                            <a href="../video/temporal-reasoning.html">Temporal Reasoning</a>
                            <a href="../video/video-qa.html">Video QA</a>
                            <a href="../video/video-captioning.html">Video Captioning</a>
                            <a href="../video/video-editing.html">Video Editing</a>
                        </div>""",
}


def get_depth(filepath):
    """Determine depth level relative to root."""
    rel = os.path.relpath(filepath, ROOT).replace("\\", "/")
    parts = rel.split("/")
    return len(parts) - 1


def process_file(filepath):
    """Add Video section after Audio section in the mega-menu."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip files that already have the Video section
    if 'data-tab="video"' in content:
        return False

    depth = get_depth(filepath)

    # Find the Audio section — it has data-tab="audio"
    # We need to insert the Video section right after the Audio section's closing </div>
    audio_pattern = r'(<div class="mega-menu-section" data-tab="audio" role="tabpanel">.*?</div>)'
    match = re.search(audio_pattern, content, re.DOTALL)

    if not match:
        return False

    insert_pos = match.end()
    video_html = VIDEO_SECTION[depth]
    new_content = content[:insert_pos] + video_html + content[insert_pos:]

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

# Depth 3 (learn/modality/code/*.html, learn/modality/image/*.html, learn/modality/audio/*.html, learn/modality/video/*.html)
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
            print(f"  Updated (depth {depth}): {rel}")
        else:
            skipped += 1
    except Exception as e:
        errors.append((f, str(e)))
        print(f"  ERROR: {os.path.relpath(f, ROOT)} - {e}")

print(f"\n=== SUMMARY ===")
print(f"Updated: {updated}")
print(f"Skipped (already has Video or no Audio section): {skipped}")
print(f"Errors: {len(errors)}")
if errors:
    for f, e in errors:
        print(f"  {os.path.relpath(f, ROOT)}: {e}")
