#!/usr/bin/env python3
"""
generate_sitemap.py - Generate sitemap.xml for all HTML pages.

Usage:
    python "Python Scipts/generate_sitemap.py"

Output: sitemap.xml in project root
"""

import os
from pathlib import Path
from datetime import date

DOMAIN = "https://praxislibrary.com"
PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_FILE = PROJECT_ROOT / "sitemap.xml"

EXCLUDE_DIRS = {".claude", "data", "Python Scipts", "glossary_factory",
                "assets", "node_modules", ".git", "__pycache__"}

# Priority and change frequency by directory
PRIORITY_MAP = {
    "root":             ("1.0",  "weekly"),
    "learn":            ("0.8",  "monthly"),
    "tools":            ("0.9",  "monthly"),
    "foundations":      ("0.7",  "monthly"),
    "pages":            ("0.6",  "monthly"),
    "quiz":             ("0.7",  "monthly"),
    "neurodivergence":  ("0.8",  "monthly"),
    "patterns":         ("0.7",  "monthly"),
}


def find_html_files():
    """Walk project and return all HTML files."""
    html_files = []
    for dirpath, dirnames, filenames in os.walk(PROJECT_ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for f in filenames:
            if f.endswith(".html"):
                html_files.append(Path(dirpath) / f)
    return sorted(html_files)


def get_canonical_url(rel_path):
    """Build canonical URL from relative path."""
    path_str = rel_path.as_posix()
    if path_str.endswith("/index.html"):
        path_str = path_str[:-10]
    elif path_str == "index.html":
        path_str = ""
    return f"{DOMAIN}/{path_str}"


def get_page_type(rel_path):
    """Determine page type from relative path."""
    parts = rel_path.parts
    if len(parts) == 1:
        return "root"
    return parts[0]


def generate_sitemap():
    """Generate sitemap.xml content."""
    today = date.today().isoformat()
    html_files = find_html_files()

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]

    for filepath in html_files:
        rel_path = filepath.relative_to(PROJECT_ROOT)
        url = get_canonical_url(rel_path)
        page_type = get_page_type(rel_path)
        priority, changefreq = PRIORITY_MAP.get(page_type, ("0.5", "monthly"))

        lines.append("  <url>")
        lines.append(f"    <loc>{url}</loc>")
        lines.append(f"    <lastmod>{today}</lastmod>")
        lines.append(f"    <changefreq>{changefreq}</changefreq>")
        lines.append(f"    <priority>{priority}</priority>")
        lines.append("  </url>")

    lines.append("</urlset>")
    return "\n".join(lines)


def main():
    sitemap = generate_sitemap()
    OUTPUT_FILE.write_text(sitemap, encoding="utf-8")

    # Count URLs
    url_count = sitemap.count("<url>")
    print(f"Generated sitemap.xml with {url_count} URLs")
    print(f"Output: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
