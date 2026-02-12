#!/usr/bin/env python3
"""Update the section-tip lightbulb SVG to include radiating ray lines."""

import os

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

OLD_SVG = '''<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>
                        </svg>'''

NEW_SVG = '''<svg viewBox="-3 -3 30 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>
                            <path d="M12 -1.5v2.5M6.3 2.5L4.5 0.7M17.7 2.5l1.8-1.8M3.2 7.5L1 6.5M20.8 7.5L23 6.5"/>
                        </svg>'''


def main():
    count = 0
    learn_dir = os.path.join(ROOT_DIR, 'learn')
    for dirpath, dirnames, filenames in os.walk(learn_dir):
        for fn in filenames:
            if not fn.endswith('.html'):
                continue
            filepath = os.path.join(dirpath, fn)
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
            if OLD_SVG not in content:
                continue
            modified = content.replace(OLD_SVG, NEW_SVG, 1)
            with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
                f.write(modified)
            count += 1
            print(f"  {os.path.relpath(filepath, ROOT_DIR)}: updated")
    print(f"\nSummary: {count} files updated")


if __name__ == "__main__":
    main()
