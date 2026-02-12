"""
Session 48: Add Audio section to Discover mega-menu across all HTML files.
Inserts after the Image section. Uses tabbed format (data-tab="audio").
"""

import os
import re
import glob

ROOT = r"c:\Users\basro\Music\_public_html"

# Audio section HTML by depth level — uses tabbed format
AUDIO_SECTION = {
    0: """
                        <div class="mega-menu-section" data-tab="audio" role="tabpanel">
                            <h4>Audio</h4>
                            <a href="learn/modality/audio/audio-prompting.html">Audio Prompting</a>
                            <a href="learn/modality/audio/stt-prompting.html">Speech-to-Text</a>
                            <a href="learn/modality/audio/tts-prompting.html">Text-to-Speech</a>
                            <a href="learn/modality/audio/audio-classification.html">Audio Classification</a>
                            <a href="learn/modality/audio/music-gen.html">Music Generation</a>
                            <a href="learn/modality/audio/voice-cloning.html">Voice Cloning</a>
                        </div>""",
    1: """
                        <div class="mega-menu-section" data-tab="audio" role="tabpanel">
                            <h4>Audio</h4>
                            <a href="../learn/modality/audio/audio-prompting.html">Audio Prompting</a>
                            <a href="../learn/modality/audio/stt-prompting.html">Speech-to-Text</a>
                            <a href="../learn/modality/audio/tts-prompting.html">Text-to-Speech</a>
                            <a href="../learn/modality/audio/audio-classification.html">Audio Classification</a>
                            <a href="../learn/modality/audio/music-gen.html">Music Generation</a>
                            <a href="../learn/modality/audio/voice-cloning.html">Voice Cloning</a>
                        </div>""",
    2: """
                        <div class="mega-menu-section" data-tab="audio" role="tabpanel">
                            <h4>Audio</h4>
                            <a href="audio/audio-prompting.html">Audio Prompting</a>
                            <a href="audio/stt-prompting.html">Speech-to-Text</a>
                            <a href="audio/tts-prompting.html">Text-to-Speech</a>
                            <a href="audio/audio-classification.html">Audio Classification</a>
                            <a href="audio/music-gen.html">Music Generation</a>
                            <a href="audio/voice-cloning.html">Voice Cloning</a>
                        </div>""",
    3: """
                        <div class="mega-menu-section" data-tab="audio" role="tabpanel">
                            <h4>Audio</h4>
                            <a href="../audio/audio-prompting.html">Audio Prompting</a>
                            <a href="../audio/stt-prompting.html">Speech-to-Text</a>
                            <a href="../audio/tts-prompting.html">Text-to-Speech</a>
                            <a href="../audio/audio-classification.html">Audio Classification</a>
                            <a href="../audio/music-gen.html">Music Generation</a>
                            <a href="../audio/voice-cloning.html">Voice Cloning</a>
                        </div>""",
}


def get_depth(filepath):
    """Determine depth level relative to root."""
    rel = os.path.relpath(filepath, ROOT).replace("\\", "/")
    parts = rel.split("/")
    return len(parts) - 1


def process_file(filepath):
    """Add Audio section after Image section in the mega-menu."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip files that already have the Audio section
    if 'data-tab="audio"' in content:
        return False

    depth = get_depth(filepath)

    # Find the Image section — it has data-tab="image"
    # We need to insert the Audio section right after the Image section's closing </div>
    image_pattern = r'(<div class="mega-menu-section" data-tab="image" role="tabpanel">.*?</div>)'
    match = re.search(image_pattern, content, re.DOTALL)

    if not match:
        return False

    insert_pos = match.end()
    audio_html = AUDIO_SECTION[depth]
    new_content = content[:insert_pos] + audio_html + content[insert_pos:]

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

# Depth 3 (learn/modality/code/*.html, learn/modality/image/*.html, learn/modality/audio/*.html)
for d in ["code", "image", "audio"]:
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
print(f"Skipped (already has Audio or no Image section): {skipped}")
print(f"Errors: {len(errors)}")
if errors:
    for f, e in errors:
        print(f"  {os.path.relpath(f, ROOT)}: {e}")
