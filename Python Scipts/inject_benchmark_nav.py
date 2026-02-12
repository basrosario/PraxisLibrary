"""
inject_benchmark_nav.py
Adds the AI Benchmarks dropdown nav item to all existing HTML files.
Inserts after the AI Foundations link in the nav bar.
Skips files that already have the benchmark nav.
Skips files in benchmarks/ directory (they already have it).
"""

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# The nav block template with {prefix} placeholder
BENCHMARK_NAV_TEMPLATE = """                <div class="nav-item has-dropdown">
                    <a href="{prefix}benchmarks/index.html" class="nav-link" aria-expanded="false">AI Benchmarks</a>
                    <div class="mega-menu">
                        <div class="mega-menu-section">
                            <h4>AI Benchmarks</h4>
                            <a href="{prefix}benchmarks/index.html">Benchmark Hub</a>
                            <a href="{prefix}benchmarks/anthropic.html">Anthropic</a>
                            <a href="{prefix}benchmarks/openai.html">OpenAI</a>
                            <a href="{prefix}benchmarks/google.html">Google DeepMind</a>
                            <a href="{prefix}benchmarks/meta.html">Meta AI</a>
                            <a href="{prefix}benchmarks/xai.html">xAI</a>
                            <a href="{prefix}benchmarks/deepseek.html">DeepSeek</a>
                            <a href="{prefix}benchmarks/mistral.html">Mistral AI</a>
                            <a href="{prefix}benchmarks/alibaba.html">Alibaba Cloud</a>
                            <a href="{prefix}benchmarks/cohere.html">Cohere</a>
                        </div>
                    </div>
                </div>"""


def get_prefix_from_foundations_link(line):
    """Extract the path prefix from the AI Foundations link."""
    # Match href="(prefix)foundations/index.html"
    match = re.search(r'href="([^"]*?)foundations/index\.html"', line)
    if match:
        return match.group(1)
    return None


def process_file(filepath):
    """Add benchmark nav to a single HTML file."""
    rel_path = os.path.relpath(filepath, ROOT)

    # Skip benchmarks/ directory
    if rel_path.startswith('benchmarks'):
        return 'skipped-benchmarks'

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already has benchmark nav
    if 'AI Benchmarks' in content:
        return 'skipped-exists'

    # Find the AI Foundations nav link
    lines = content.split('\n')
    insert_index = None
    prefix = None

    for i, line in enumerate(lines):
        if 'class="nav-link">AI Foundations</a>' in line:
            insert_index = i
            prefix = get_prefix_from_foundations_link(line)
            break

    if insert_index is None or prefix is None:
        return 'skipped-no-foundations'

    # Build the nav block with the correct prefix
    nav_block = BENCHMARK_NAV_TEMPLATE.replace('{prefix}', prefix)

    # Insert the block after the AI Foundations line
    lines.insert(insert_index + 1, nav_block)

    # Write back
    with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(lines))

    return 'updated'


def main():
    dry_run = '--dry-run' in sys.argv
    verbose = '--verbose' in sys.argv or '-v' in sys.argv

    counts = {'updated': 0, 'skipped-exists': 0, 'skipped-benchmarks': 0,
              'skipped-no-foundations': 0, 'error': 0}

    html_files = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        # Skip hidden dirs, node_modules, .git, etc.
        dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'node_modules']
        for fn in filenames:
            if fn.endswith('.html'):
                html_files.append(os.path.join(dirpath, fn))

    html_files.sort()
    print(f"Found {len(html_files)} HTML files")

    for filepath in html_files:
        rel = os.path.relpath(filepath, ROOT)
        try:
            if dry_run:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                if 'AI Benchmarks' in content:
                    result = 'skipped-exists'
                elif rel.startswith('benchmarks'):
                    result = 'skipped-benchmarks'
                else:
                    result = 'would-update'
            else:
                result = process_file(filepath)

            counts[result] = counts.get(result, 0) + 1
            if verbose or result in ('updated', 'would-update', 'error'):
                print(f"  [{result}] {rel}")
        except Exception as e:
            counts['error'] += 1
            print(f"  [ERROR] {rel}: {e}")

    print(f"\nResults:")
    for key, val in counts.items():
        if val > 0:
            print(f"  {key}: {val}")


if __name__ == '__main__':
    main()
