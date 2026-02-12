#!/usr/bin/env python3
"""
PraxisLibraryAudit.py — Comprehensive Praxis Library Site Audit Tool

DYNAMIC: Auto-detects site structure, tool counts, file counts, glossary terms,
policy pages, and active/deactivated tools from the actual site. No hardcoded
values — add tools, pages, or restructure freely and the audit adapts.

Runs 12 audit categories across all HTML, data, and documentation files,
generating a detailed Markdown report with executive summary and granular findings.

Usage (from project root):
  python "Python Scipts/PraxisLibraryAudit.py"                     # Full audit (URLs verified)
  python "Python Scipts/PraxisLibraryAudit.py" --skip-urls         # Offline mode (no HTTP)
  python "Python Scipts/PraxisLibraryAudit.py" --verbose           # Show progress
  python "Python Scipts/PraxisLibraryAudit.py" -c security         # Single category
  python "Python Scipts/PraxisLibraryAudit.py" -o custom.md        # Custom output

Session 79 — Praxis Library Project
"""

import os
import sys
import re
import json
import time
import argparse
import urllib.request
import urllib.error
import urllib.parse
import ssl
import concurrent.futures
from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional, Any, Dict, Set, Tuple
from datetime import datetime
from collections import defaultdict


# ============================================================
# DATA CLASSES
# ============================================================

class Severity(Enum):
    ERROR = "error"
    WARNING = "warning"
    INFO = "info"


class Category(Enum):
    SECURITY = "Security"
    CONTINUITY = "Continuity"
    BROKEN_LINKS = "Broken Links"
    RELEVANCY = "Relevancy"
    ACCURACY = "Accuracy"
    BIAS = "Bias/Inclusivity"
    ACCESSIBILITY = "Accessibility"
    CITATION = "Citation Accuracy"
    DATA_ACCURACY = "Data Accuracy"
    STRUCTURAL = "Structural"
    DOCUMENTATION = "Documentation"


@dataclass
class Issue:
    category: Category
    severity: Severity
    file_path: str
    line_number: int
    message: str
    context: str = ""
    suggestion: str = ""


@dataclass
class AuditResult:
    category: Category
    issues: List[Issue] = field(default_factory=list)
    files_scanned: int = 0
    checks_run: int = 0

    @property
    def error_count(self) -> int:
        return sum(1 for i in self.issues if i.severity == Severity.ERROR)

    @property
    def warning_count(self) -> int:
        return sum(1 for i in self.issues if i.severity == Severity.WARNING)

    @property
    def info_count(self) -> int:
        return sum(1 for i in self.issues if i.severity == Severity.INFO)

    @property
    def passed(self) -> bool:
        return self.error_count == 0


# ============================================================
# FILE LOADER — Caches all reads
# ============================================================

class FileLoader:
    """Caches file reads. All HTML files loaded once, reused by all checkers."""

    EXCLUDE_DIRS = {'.claude', '.git', 'glossary_factory', 'node_modules',
                    'Python Scipts', '__pycache__', 'assets'}

    def __init__(self, root_dir: str):
        self.root_dir = root_dir
        self._html_cache: Dict[str, List[str]] = {}
        self._json_cache: Dict[str, Any] = {}
        self._all_html: Optional[List[str]] = None

    def discover_html_files(self) -> List[str]:
        """Walk project tree, return relative paths for all .html files."""
        if self._all_html is not None:
            return self._all_html

        result = []
        for dirpath, dirnames, filenames in os.walk(self.root_dir):
            dirnames[:] = [d for d in dirnames
                           if d not in self.EXCLUDE_DIRS and not d.startswith('.')]
            for fn in filenames:
                if fn.endswith('.html'):
                    full = os.path.join(dirpath, fn)
                    rel = os.path.relpath(full, self.root_dir).replace('\\', '/')
                    result.append(rel)
        self._all_html = sorted(result)
        return self._all_html

    def read_html(self, rel_path: str) -> List[str]:
        """Return file lines. Cached."""
        if rel_path in self._html_cache:
            return self._html_cache[rel_path]
        full = os.path.join(self.root_dir, rel_path.replace('/', os.sep))
        try:
            with open(full, 'r', encoding='utf-8', errors='replace') as f:
                lines = f.readlines()
        except FileNotFoundError:
            lines = []
        self._html_cache[rel_path] = lines
        return lines

    def read_html_text(self, rel_path: str) -> str:
        """Return full file text. Cached via lines."""
        return ''.join(self.read_html(rel_path))

    def read_json(self, rel_path: str) -> Any:
        """Return parsed JSON. Cached."""
        if rel_path in self._json_cache:
            return self._json_cache[rel_path]
        full = os.path.join(self.root_dir, rel_path.replace('/', os.sep))
        try:
            with open(full, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            data = None
        self._json_cache[rel_path] = data
        return data

    def file_exists(self, rel_path: str) -> bool:
        """Check if file exists relative to root."""
        full = os.path.join(self.root_dir, rel_path.replace('/', os.sep))
        return os.path.isfile(full)


# ============================================================
# PATH RESOLVER — Resolves relative paths across depth levels
# ============================================================

class PathResolver:
    """Resolve relative paths from any HTML file's perspective."""

    def __init__(self, root_dir: str):
        self.root_dir = root_dir

    def resolve(self, from_file: str, href: str) -> Optional[str]:
        """
        Resolve href relative to from_file's directory.
        Returns path relative to project root, or None for external/fragment/special.
        """
        if not href or href.startswith(('#', 'mailto:', 'tel:', 'javascript:', 'data:')):
            return None
        if href.startswith(('http://', 'https://')):
            return None

        href = href.split('#')[0]
        if not href:
            return None
        href = href.split('?')[0]
        if not href:
            return None

        from_dir = os.path.dirname(from_file)
        joined = os.path.normpath(os.path.join(from_dir, href))
        resolved = joined.replace('\\', '/')

        if resolved.startswith('..'):
            return None

        return resolved

    def exists(self, resolved_path: str) -> bool:
        """Check if resolved relative path exists on disk."""
        if resolved_path is None:
            return False
        full = os.path.join(self.root_dir, resolved_path.replace('/', os.sep))
        if os.path.isfile(full):
            return True
        # Resolve directory paths to index.html (e.g. modality/code/ -> modality/code/index.html)
        index_path = os.path.join(full, 'index.html')
        return os.path.isfile(index_path)


# ============================================================
# SITE DISCOVERY — Auto-detect structure from actual site
# ============================================================

class SiteDiscovery:
    """
    Dynamically discovers site structure from the actual files.
    No hardcoded values — adapts to any changes in the site.
    """

    def __init__(self, loader: FileLoader):
        self.loader = loader
        self._cache: Dict[str, Any] = {}

    def get_glossary_term_count(self) -> int:
        """Read actual term count from manifest.json."""
        manifest = self.loader.read_json('data/glossary/manifest.json')
        if manifest:
            return manifest.get('totalTerms', 0)
        return 0

    def get_active_tools(self) -> List[Dict[str, str]]:
        """
        Auto-detect active tools by reading the footer of index.html.
        Returns list of {name, href} for each tool in the AI Readiness Tools column.
        """
        if 'active_tools' in self._cache:
            return self._cache['active_tools']

        tools = []
        text = self.loader.read_html_text('index.html')
        # Find the AI Readiness Tools footer column
        marker = text.find('AI Readiness Tools')
        if marker != -1:
            # Extract section until next </div>
            section_end = text.find('</div>', marker)
            section = text[marker:section_end] if section_end > 0 else text[marker:marker + 2000]
            # Extract all links
            for m in re.finditer(r'<a\s+href="([^"]+)"[^>]*>([^<]+)</a>', section):
                tools.append({'href': m.group(1), 'name': m.group(2).strip()})

        self._cache['active_tools'] = tools
        return tools

    def get_tool_filenames(self) -> Set[str]:
        """Return set of active tool filenames (e.g., 'analyzer.html')."""
        tools = self.get_active_tools()
        filenames = set()
        for t in tools:
            # Extract just the filename from path like 'tools/analyzer.html' or '../tools/analyzer.html'
            parts = t['href'].replace('\\', '/').split('/')
            filenames.add(parts[-1])
        return filenames

    def get_deactivated_tools(self) -> List[str]:
        """
        Auto-detect deactivated tools: .html files in tools/ that are NOT
        linked from the footer AND are NOT index.html AND are full pages (not fragments).
        """
        if 'deactivated' in self._cache:
            return self._cache['deactivated']

        active_filenames = self.get_tool_filenames()
        fragments = self.get_fragment_files()
        all_tool_files = [f for f in self.loader.discover_html_files()
                          if f.startswith('tools/') and f != 'tools/index.html']

        deactivated = []
        for f in all_tool_files:
            if f in fragments:
                continue  # Skip fragments — they're not tools
            filename = f.split('/')[-1]
            if filename not in active_filenames:
                deactivated.append(f)

        self._cache['deactivated'] = deactivated
        return deactivated

    def get_policy_pages(self) -> List[str]:
        """Auto-detect policy pages from footer-policies section on index.html."""
        if 'policies' in self._cache:
            return self._cache['policies']

        policies = []
        text = self.loader.read_html_text('index.html')
        marker = text.find('footer-policies')
        if marker != -1:
            section_end = text.find('</div>', marker)
            section = text[marker:section_end] if section_end > 0 else text[marker:marker + 1000]
            for m in re.finditer(r'href="([^"]+)"', section):
                href = m.group(1)
                filename = href.split('/')[-1]
                policies.append(filename)

        self._cache['policies'] = policies
        return policies

    def get_framework_count(self) -> int:
        """
        Auto-detect framework/technique page count from learn/ directory.
        Excludes: index files, facts-fictions (not a framework), fragments,
        and category hub pages (those with FRAMEWORK GRID section markers).
        """
        if 'framework_count' in self._cache:
            return self._cache['framework_count']

        NON_FRAMEWORK = {'index.html', 'facts-fictions.html'}
        fragments = self.get_fragment_files()
        count = 0
        for rel_path in self.loader.discover_html_files():
            if not rel_path.startswith('learn/'):
                continue
            if rel_path.split('/')[-1] in NON_FRAMEWORK:
                continue
            if rel_path in fragments:
                continue
            # Skip category hub pages (contain framework grids listing other techniques)
            text = self.loader.read_html_text(rel_path)
            if 'FRAMEWORK GRID' in text or 'category-browser' in text:
                continue
            count += 1

        self._cache['framework_count'] = count
        return count

    def get_fragment_files(self) -> Set[str]:
        """
        Auto-detect fragment files (partial HTML, not full pages).
        A fragment lacks <!DOCTYPE or <html> tag.
        """
        if 'fragments' in self._cache:
            return self._cache['fragments']

        fragments = set()
        for rel_path in self.loader.discover_html_files():
            text = self.loader.read_html_text(rel_path)
            first_500 = text[:500].lower()
            if '<!doctype' not in first_500 and '<html' not in first_500:
                fragments.add(rel_path)

        self._cache['fragments'] = fragments
        return fragments

    def summary(self) -> Dict[str, Any]:
        """Return a summary dict of auto-discovered values."""
        return {
            'total_html_files': len(self.loader.discover_html_files()),
            'glossary_terms': self.get_glossary_term_count(),
            'active_tools': len(self.get_active_tools()),
            'active_tool_names': [t['name'] for t in self.get_active_tools()],
            'deactivated_tools': self.get_deactivated_tools(),
            'policy_pages': self.get_policy_pages(),
            'fragment_files': list(self.get_fragment_files()),
            'framework_count': self.get_framework_count(),
        }


# ============================================================
# BASE CHECKER
# ============================================================

class AuditChecker:
    """Base class for all audit categories."""

    category: Category = None

    def __init__(self, loader: FileLoader, resolver: PathResolver,
                 discovery: SiteDiscovery, config: dict):
        self.loader = loader
        self.resolver = resolver
        self.discovery = discovery
        self.config = config
        self.issues: List[Issue] = []
        self.files_scanned = 0
        self.checks_run = 0

    def add(self, severity: Severity, file_path: str, line_number: int,
            message: str, context: str = "", suggestion: str = ""):
        ctx = context[:120] if context else ""
        self.issues.append(Issue(
            self.category, severity, file_path, line_number, message, ctx, suggestion
        ))

    def run(self) -> AuditResult:
        raise NotImplementedError

    def _result(self) -> AuditResult:
        return AuditResult(
            category=self.category,
            issues=self.issues,
            files_scanned=self.files_scanned,
            checks_run=self.checks_run
        )


# ============================================================
# 1. SECURITY CHECKER
# ============================================================

RE_INLINE_STYLE = re.compile(r'\bstyle\s*=\s*["\']', re.IGNORECASE)
RE_INLINE_SCRIPT = re.compile(
    r'<script(?![^>]*\bsrc\s*=)(?![^>]*type\s*=\s*["\']application/ld\+json["\'])[^>]*>',
    re.IGNORECASE)
RE_INLINE_HANDLER = re.compile(
    r'\bon(?:click|dblclick|load|error|mouseover|mouseout|mouseenter|mouseleave|'
    r'submit|change|keydown|keyup|keypress|focus|blur|input|touchstart|touchend|'
    r'resize|scroll|'
    # Drag events
    r'drag|dragstart|dragend|dragover|dragenter|dragleave|drop|'
    # Pointer events
    r'pointerdown|pointerup|pointermove|pointerenter|pointerleave|pointerover|pointerout|pointercancel|'
    # Clipboard events
    r'cut|copy|paste|'
    # Animation/transition events
    r'animationstart|animationend|animationiteration|transitionend|'
    # Other
    r'contextmenu|wheel|select|toggle|reset|invalid'
    r')\s*=',
    re.IGNORECASE
)
RE_EXTERNAL_CDN = re.compile(
    r'(?:href|src)\s*=\s*["\']https?://(?:cdn\.|fonts\.google|googleapis|'
    r'cloudflare|unpkg|jsdelivr|maxcdn|bootstrapcdn|cdnjs)[^"\']*["\']',
    re.IGNORECASE
)
RE_EXTERNAL_LINK_TAG = re.compile(
    r'<a\s([^>]*href\s*=\s*["\']https?://[^"\']+["\'][^>]*)>',
    re.IGNORECASE
)


class SecurityChecker(AuditChecker):
    category = Category.SECURITY

    # Dangerous JS patterns to scan for in app.js
    RE_EVAL = re.compile(r'\beval\s*\(', re.IGNORECASE)
    RE_NEW_FUNCTION = re.compile(r'\bnew\s+Function\s*\(')
    RE_DOCUMENT_WRITE = re.compile(r'\bdocument\.write(?:ln)?\s*\(')
    RE_SETTIMEOUT_STRING = re.compile(r'\bsetTimeout\s*\(\s*["\']')
    RE_SETINTERVAL_STRING = re.compile(r'\bsetInterval\s*\(\s*["\']')

    def run(self) -> AuditResult:
        in_comment = False

        for rel_path in self.loader.discover_html_files():
            lines = self.loader.read_html(rel_path)
            self.files_scanned += 1
            in_comment = False  # Reset per file

            for i, line in enumerate(lines, 1):
                self.checks_run += 1
                stripped = line.strip()

                # Track multi-line HTML comment state
                if '<!--' in line and '-->' not in line:
                    in_comment = True
                if '-->' in line:
                    in_comment = False
                    continue  # Skip comment-closing lines too
                if in_comment or stripped.startswith('<!--'):
                    continue

                # Inline styles
                if RE_INLINE_STYLE.search(line):
                    self.add(Severity.ERROR, rel_path, i,
                             "Inline style attribute found",
                             stripped)

                # Inline event handlers
                if RE_INLINE_HANDLER.search(line):
                    self.add(Severity.ERROR, rel_path, i,
                             "Inline event handler found",
                             stripped)

                # Inline script blocks
                if RE_INLINE_SCRIPT.search(line):
                    self.add(Severity.ERROR, rel_path, i,
                             "Inline <script> block (no src attribute)",
                             stripped)

                # External CDN references
                if RE_EXTERNAL_CDN.search(line):
                    self.add(Severity.ERROR, rel_path, i,
                             "External CDN resource reference",
                             stripped)

                # External links missing security attributes
                for m in RE_EXTERNAL_LINK_TAG.finditer(line):
                    tag = m.group(1)
                    has_blank = 'target="_blank"' in tag or "target='_blank'" in tag
                    has_noopener = 'noopener' in tag and 'noreferrer' in tag

                    if has_blank and not has_noopener:
                        self.add(Severity.WARNING, rel_path, i,
                                 "External link with target=_blank missing rel='noopener noreferrer'",
                                 stripped,
                                 "Add rel='noopener noreferrer' to external links")

        # Dangerous JS pattern scan in app.js
        self._check_js_dangerous_patterns()

        return self._result()

    def _check_js_dangerous_patterns(self):
        """Scan app.js for dangerous JavaScript patterns (eval, document.write, etc.)."""
        app_js_path = os.path.join(self.loader.root_dir, 'app.js')
        if not os.path.isfile(app_js_path):
            return

        self.files_scanned += 1
        try:
            with open(app_js_path, 'r', encoding='utf-8', errors='replace') as f:
                js_lines = f.readlines()
        except Exception:
            return

        patterns = [
            (self.RE_EVAL, "eval() call found — use DOM API instead"),
            (self.RE_NEW_FUNCTION, "new Function() found — equivalent to eval()"),
            (self.RE_DOCUMENT_WRITE, "document.write() found — use DOM API (createElement/textContent)"),
            (self.RE_SETTIMEOUT_STRING, "setTimeout() with string argument — use a function reference"),
            (self.RE_SETINTERVAL_STRING, "setInterval() with string argument — use a function reference"),
        ]

        in_block_comment = False
        for i, line in enumerate(js_lines, 1):
            stripped = line.strip()

            # Track JS block comments
            if '/*' in line and '*/' not in line:
                in_block_comment = True
            if '*/' in line:
                in_block_comment = False
                continue
            if in_block_comment or stripped.startswith('//'):
                continue

            for pattern, message in patterns:
                if pattern.search(line):
                    self.checks_run += 1
                    self.add(Severity.ERROR, "app.js", i,
                             message,
                             stripped[:120],
                             "Refactor to use safe DOM APIs")


# ============================================================
# 2. CONTINUITY CHECKER
# ============================================================

TEMPLATE_CHECKS = [
    # --- Core HTML ---
    ('html_lang',    re.compile(r'<html\s[^>]*lang\s*=\s*["\']en', re.I),         Severity.ERROR,   "Missing <html lang='en'>"),
    ('meta_charset', re.compile(r'<meta\s[^>]*charset\s*=\s*["\']?UTF-8', re.I),  Severity.ERROR,   "Missing <meta charset='UTF-8'>"),
    ('meta_viewport',re.compile(r'<meta\s[^>]*name\s*=\s*["\']viewport', re.I),   Severity.ERROR,   "Missing viewport meta tag"),
    ('meta_desc',    re.compile(r'<meta\s[^>]*name\s*=\s*["\']description', re.I),Severity.WARNING, "Missing meta description"),
    ('favicon',      re.compile(r'<link\s[^>]*rel\s*=\s*["\']icon', re.I),        Severity.WARNING, "Missing favicon link"),
    ('styles_css',   re.compile(r'<link\s[^>]*href\s*=\s*["\'][^"\']*styles\.css', re.I),  Severity.ERROR, "Missing styles.css link"),
    ('app_js',       re.compile(r'<script\s[^>]*src\s*=\s*["\'][^"\']*app\.js["\'][^>]*\bdefer\b', re.I), Severity.ERROR, "Missing app.js script with defer attribute"),
    # --- Accessibility ---
    ('skip_link',    re.compile(r'class\s*=\s*["\'][^"\']*skip-link', re.I),       Severity.ERROR,   "Missing skip-to-content link"),
    # --- Layout ---
    ('header',       re.compile(r'<header\s[^>]*class\s*=\s*["\'][^"\']*header', re.I),  Severity.ERROR, "Missing <header>"),
    ('main_content', re.compile(r'<main\s[^>]*id\s*=\s*["\']main-content', re.I), Severity.ERROR,   "Missing <main id='main-content'>"),
    ('footer',       re.compile(r'<footer\s[^>]*class\s*=\s*["\'][^"\']*footer', re.I),  Severity.ERROR, "Missing <footer>"),
    ('back_to_top',  re.compile(r'class\s*=\s*["\'][^"\']*back-to-top-bar', re.I),Severity.WARNING, "Missing back-to-top button"),
    ('adl_panel',    re.compile(r'id\s*=\s*["\']adl-panel["\']', re.I),           Severity.WARNING, "Missing Accessibility Dashboard (ADL) panel"),
    ('badge_lightbox',re.compile(r'class\s*=\s*["\'][^"\']*badge-lightbox["\']', re.I), Severity.WARNING, "Missing badge lightbox"),
    # --- SEO (injected by seo_inject.py) ---
    ('seo_marker',   re.compile(r'<!-- SEO Meta -->', re.I),                       Severity.ERROR,   "Missing SEO meta block (run seo_inject.py)"),
    ('canonical_url', re.compile(r'<link\s[^>]*rel\s*=\s*["\']canonical', re.I),  Severity.ERROR,   "Missing canonical URL"),
    ('og_title',     re.compile(r'<meta\s[^>]*property\s*=\s*["\']og:title', re.I), Severity.ERROR, "Missing Open Graph og:title"),
    ('og_desc',      re.compile(r'<meta\s[^>]*property\s*=\s*["\']og:description', re.I), Severity.ERROR, "Missing Open Graph og:description"),
    ('og_image',     re.compile(r'<meta\s[^>]*property\s*=\s*["\']og:image', re.I), Severity.ERROR, "Missing Open Graph og:image"),
    ('og_url',       re.compile(r'<meta\s[^>]*property\s*=\s*["\']og:url', re.I), Severity.ERROR,   "Missing Open Graph og:url"),
    ('json_ld',      re.compile(r'application/ld\+json', re.I),                    Severity.ERROR,   "Missing JSON-LD structured data"),
    ('twitter_card',  re.compile(r'<meta\s[^>]*name\s*=\s*["\']twitter:card', re.I), Severity.WARNING, "Missing Twitter/X card meta tag"),
    # --- Navigation ---
    ('nav_menu',     re.compile(r'mega-menu--categories', re.I),                   Severity.ERROR,   "Missing Discover navigation menu (mega-menu--categories)"),
    ('nav_resources',re.compile(r'mega-menu--multi-column', re.I),                 Severity.ERROR,   "Missing Resources/AI Readiness navigation menu (mega-menu--multi-column)"),
]


class ContinuityChecker(AuditChecker):
    category = Category.CONTINUITY

    def run(self) -> AuditResult:
        fragments = self.discovery.get_fragment_files()
        active_tools = self.discovery.get_active_tools()
        policy_pages = self.discovery.get_policy_pages()

        for rel_path in self.loader.discover_html_files():
            # Skip fragment files (not full pages)
            if rel_path in fragments:
                continue
            self.files_scanned += 1
            text = self.loader.read_html_text(rel_path)

            # Template element checks
            for name, pattern, severity, message in TEMPLATE_CHECKS:
                self.checks_run += 1
                if not pattern.search(text):
                    self.add(severity, rel_path, 0, message)

            # Breadcrumb navigation (all pages except root index.html)
            if rel_path != 'index.html':
                self.checks_run += 1
                if 'class="breadcrumb' not in text and "class='breadcrumb" not in text:
                    self.add(Severity.WARNING, rel_path, 0,
                             "Missing breadcrumb navigation",
                             suggestion="Add <nav class=\"breadcrumb\"> for wayfinding")

            # Policy links in footer (dynamic — checks whatever policies exist)
            self.checks_run += 1
            footer_pos = text.find('footer-policies')
            if footer_pos == -1:
                if policy_pages:  # Only flag if policies exist on the reference page
                    self.add(Severity.ERROR, rel_path, 0,
                             "Missing footer-policies section")
            else:
                footer_section = text[footer_pos:footer_pos + 3000]
                for policy in policy_pages:
                    if policy not in footer_section:
                        self.add(Severity.ERROR, rel_path, 0,
                                 f"Missing policy link in footer: {policy}")

            # Tools in footer column (dynamic — checks against auto-detected tools)
            self.checks_run += 1
            tools_header = text.find('AI Readiness Tools')
            if tools_header == -1:
                if active_tools:
                    self.add(Severity.ERROR, rel_path, 0,
                             "Missing 'AI Readiness Tools' footer column")
            else:
                # Find the closing </div> for the column — scan up to 3000 chars
                # to handle nested divs within the tools section
                section_end = text.find('</div>', tools_header)
                tools_section = text[tools_header:section_end] if section_end > 0 else text[tools_header:tools_header + 3000]
                tool_links = re.findall(r'href\s*=\s*["\']([^"\']+)["\']', tools_section)

                for tool in active_tools:
                    tool_filename = tool['href'].split('/')[-1]
                    found = any(tool_filename in link for link in tool_links)
                    if not found:
                        self.add(Severity.ERROR, rel_path, 0,
                                 f"Missing tool link in footer: {tool['name']} ({tool_filename})")

        # Ethics ticker presence (one-time check — ticker is created by app.js, not in HTML)
        self.checks_run += 1
        app_js_path = os.path.join(self.loader.root_dir, 'app.js')
        if os.path.isfile(app_js_path):
            with open(app_js_path, 'r', encoding='utf-8', errors='replace') as f:
                app_text = f.read()
            if 'ethics-ticker' not in app_text:
                self.add(Severity.ERROR, "app.js", 0,
                         "Ethics ticker code missing from app.js",
                         suggestion="Add ethics ticker IIFE to app.js")
        else:
            self.add(Severity.ERROR, "app.js", 0,
                     "app.js file not found")

        # Styles.css has ticker styles (one-time check)
        self.checks_run += 1
        css_path = os.path.join(self.loader.root_dir, 'styles.css')
        if os.path.isfile(css_path):
            with open(css_path, 'r', encoding='utf-8', errors='replace') as f:
                css_text = f.read()
            if '.ethics-ticker' not in css_text:
                self.add(Severity.ERROR, "styles.css", 0,
                         "Ethics ticker styles missing from styles.css",
                         suggestion="Add .ethics-ticker CSS rules to styles.css")

        return self._result()


# ============================================================
# 3. BROKEN LINKS CHECKER
# ============================================================

RE_HREF_SRC = re.compile(r'(?:href|src)\s*=\s*["\']([^"\']*)["\']', re.IGNORECASE)
# Multi-line safe: matches <a ...href="https://..."...> across line breaks
RE_ANCHOR_EXTERNAL_HREF = re.compile(
    r'<a\s[^>]*href\s*=\s*["\']((https?://[^"\']+))["\']',
    re.IGNORECASE | re.DOTALL
)


class BrokenLinksChecker(AuditChecker):
    category = Category.BROKEN_LINKS

    def run(self) -> AuditResult:
        external_urls: Dict[str, List[Tuple[str, int]]] = defaultdict(list)
        check_urls = self.config.get('check_urls', False)

        for rel_path in self.loader.discover_html_files():
            lines = self.loader.read_html(rel_path)
            self.files_scanned += 1

            # --- Internal link checks (per-line) ---
            for i, line in enumerate(lines, 1):
                for m in RE_HREF_SRC.finditer(line):
                    href = m.group(1).strip()
                    self.checks_run += 1

                    if not href or href == '#' or href.startswith(('#', 'mailto:', 'tel:', 'javascript:', 'data:')):
                        continue

                    # Skip external URLs here — collected separately below
                    if href.startswith(('http://', 'https://')):
                        continue

                    # Internal link — resolve and check
                    resolved = self.resolver.resolve(rel_path, href)
                    if resolved is None:
                        continue

                    if not self.resolver.exists(resolved):
                        self.add(Severity.ERROR, rel_path, i,
                                 f"Broken internal link: {href} -> {resolved}",
                                 line.strip(),
                                 "Fix the href path or create the missing file")

            # --- External URL collection (full-text, multi-line safe) ---
            # Uses a dedicated regex that specifically matches <a> tags with
            # external hrefs — won't match <link>, <meta>, or other non-anchor tags
            if check_urls:
                full_text = ''.join(lines)
                line_offsets = []
                offset = 0
                for line in lines:
                    line_offsets.append(offset)
                    offset += len(line)

                for m in RE_ANCHOR_EXTERNAL_HREF.finditer(full_text):
                    url = m.group(1)
                    # Find line number from char position
                    pos = m.start()
                    line_num = 1
                    for idx, lo in enumerate(line_offsets):
                        if lo > pos:
                            break
                        line_num = idx + 1
                    external_urls[url].append((rel_path, line_num))
                    self.checks_run += 1

        # External URL checks (optional)
        if check_urls and external_urls:
            self._check_external_urls(external_urls)

        return self._result()

    def _check_external_urls(self, url_map: Dict[str, List[Tuple[str, int]]]):
        """HTTP HEAD->GET check for unique external URLs.
        ALL links must be bot-reachable — skips known bot-blocked domains."""
        ctx = ssl.create_default_context()

        # Filter out known bot-blocked domains — emit INFO instead of checking
        checkable = {}
        for url in url_map:
            try:
                domain = urllib.parse.urlparse(url).hostname or ''
            except Exception:
                domain = ''
            if domain in BOT_BLOCKED_ALLOWLIST:
                for file_path, line_num in url_map[url]:
                    self.add(Severity.INFO, file_path, line_num,
                             f"BOT-BLOCKED DOMAIN (manual verify): {url}",
                             suggestion=f"Domain '{domain}' blocks bots — verify manually in browser")
                continue
            checkable[url] = url_map[url]

        def check_one(url: str) -> Tuple[str, int, str]:
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
            for method in ('HEAD', 'GET'):
                req = urllib.request.Request(url, method=method, headers=headers)
                try:
                    resp = urllib.request.urlopen(req, timeout=15, context=ctx)
                    if method == 'GET':
                        resp.read(1024)
                        resp.close()
                    return (url, resp.status, "")
                except urllib.error.HTTPError as e:
                    if method == 'HEAD' and e.code in (403, 405):
                        continue  # retry with GET
                    return (url, e.code, str(e.reason))
                except Exception as e:
                    if method == 'HEAD':
                        continue
                    return (url, 0, str(e))
            return (url, 0, "All methods failed")

        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
            futures = {pool.submit(check_one, url): url for url in checkable}
            for future in concurrent.futures.as_completed(futures):
                url, status, error = future.result()
                if status == 0 or status >= 400:
                    for file_path, line_num in url_map[url]:
                        self.add(Severity.WARNING, file_path, line_num,
                                 f"External URL unreachable ({status}): {url}",
                                 error,
                                 "Verify the URL is still valid")


# ============================================================
# 4. RELEVANCY CHECKER
# ============================================================

RE_PLACEHOLDER = re.compile(
    r'\b(coming soon|TODO|TBD|FIXME|lorem ipsum|WIP|HACK|XXX|TEMP)\b',
    re.IGNORECASE
)
# Separate pattern for "placeholder" that excludes HTML placeholder= attributes
# We only use the lookahead (fixed-width); the caller strips HTML attributes before matching
RE_PLACEHOLDER_WORD = re.compile(
    r'\bplaceholder\b(?!\s*=)',
    re.IGNORECASE
)
RE_OLD_DATE = re.compile(r'\b(20[01]\d|202[0-3])\b')
RE_HISTORICAL_CONTEXT = re.compile(
    r'\b(founded|published|established|invented|created|introduced|released|launched|'
    r'proposed|developed|born|died|patent|history|historical|timeline|era|'
    r'origin|pioneered|breakthrough|milestone|seminal|formed|merged|'
    r'announced|debuted|coined|evolved|since|version|predecessor|'
    r'copyright|emerged|emergence|conceived|designed|architected|'
    r'NeurIPS|ICLR|ICML|AAAI|CVPR|EMNLP|ACL)\b|'
    r'\u00a9|\bet\s+al\b|Framework\s+Context',
    re.IGNORECASE
)


class RelevancyChecker(AuditChecker):
    category = Category.RELEVANCY

    def run(self) -> AuditResult:
        # Component classes whose content legitimately contains dates.
        # Dates inside these components are educational examples, metadata,
        # or historical context — not stale content.
        DATE_SAFE_COMPONENTS = (
            'benchmark-stat', 'model-timeline',
            'discover-card__year', 'discover-card__header',
            'framework-status', 'highlight-box',
            'technique-demo', 'comparison-panel',
            'element-timeline__example',
            'era-', 'history-event', 'timeline-',
            'poem-author', 'section-eyebrow', 'section-subtitle',
        )

        for rel_path in self.loader.discover_html_files():
            lines = self.loader.read_html(rel_path)
            self.files_scanned += 1
            # Track nesting depth inside date-safe components.
            # When > 0, all dates are considered legitimate context.
            safe_depth = 0
            in_comment = False  # Track multi-line HTML comments

            for i, line in enumerate(lines, 1):
                self.checks_run += 1

                # Track multi-line HTML comment state
                if '<!--' in line and '-->' not in line:
                    in_comment = True
                if '-->' in line:
                    in_comment = False
                    continue  # Skip comment-closing lines
                if in_comment:
                    continue

                stripped = line.strip()
                if stripped.startswith('<!--'):
                    continue

                # Track entry/exit of date-safe components
                if any(marker in line for marker in DATE_SAFE_COMPONENTS):
                    # Count opening/closing tags on this line
                    opens = line.count('<div') + line.count('<section') + line.count('<span')
                    closes = line.count('</div') + line.count('</section') + line.count('</span')
                    safe_depth += opens - closes
                    if safe_depth < 0:
                        safe_depth = 0
                elif safe_depth > 0:
                    # Inside a safe component — track tag nesting
                    opens = line.count('<div') + line.count('<section') + line.count('<span')
                    closes = line.count('</div') + line.count('</section') + line.count('</span')
                    safe_depth += opens - closes
                    if safe_depth < 0:
                        safe_depth = 0

                # Placeholder content
                has_placeholder = RE_PLACEHOLDER.search(line)
                has_placeholder_word = (RE_PLACEHOLDER_WORD.search(line) and
                                        'placeholder=' not in line.lower())
                if has_placeholder or has_placeholder_word:
                    self.add(Severity.WARNING, rel_path, i,
                             "Placeholder content detected",
                             stripped)

                # Outdated dates
                match = RE_OLD_DATE.search(line)
                if match:
                    if 'href=' in line or 'src=' in line or 'http' in line:
                        continue
                    if RE_HISTORICAL_CONTEXT.search(line):
                        continue
                    # Inside a date-safe component — all dates are legitimate
                    if safe_depth > 0:
                        continue
                    # Check current line for date-safe component markers
                    if any(marker in line for marker in DATE_SAFE_COMPONENTS):
                        continue
                    # Skip bare table cells with just a year (comparison tables)
                    s = stripped.lower()
                    if s.startswith('<td>') and s.endswith('</td>') and len(s) < 15:
                        continue
                    # Skip citation metadata attributes
                    if 'data-added=' in line:
                        continue
                    self.add(Severity.INFO, rel_path, i,
                             f"Potentially outdated date: {match.group(1)}",
                             line.strip())

        # NOTE: Orphan file detection is handled by StructuralChecker (Category 10)
        # to avoid duplicate warnings. Relevancy focuses on content freshness only.

        return self._result()


# ============================================================
# 5. ACCURACY CHECKER
# ============================================================

class AccuracyChecker(AuditChecker):
    category = Category.ACCURACY

    # Regex patterns for page-wide checks
    RE_COMPARISON_PANEL = re.compile(r'class\s*=\s*["\'][^"\']*\bcomparison-panel\b(?!__)', re.I)
    RE_COMPARISON_DIVIDER = re.compile(r'comparison-panel__divider', re.I)
    RE_DEPRECATED_FEATURE_LIST = re.compile(
        r'class\s*=\s*["\'][^"\']*\bfeature-list--(check|cross)\b', re.I)
    RE_SECTION_COMMENT = re.compile(r'<!--\s*={2,}\s*(.+?)\s*={2,}\s*-->', re.I)
    RE_FOOTER_TOOLS_HEADER = re.compile(r'>\s*AI Readiness Tools\s*<', re.I)
    RE_FOOTER_LINK = re.compile(r'<a\s[^>]*href\s*=\s*["\']([^"\']+)["\']', re.I)

    # Required sections for learn/ framework pages (searched in comment markers)
    REQUIRED_SECTIONS = [
        'HERO',
        'CONCEPT',        # matches "THE CONCEPT"
        'HOW IT WORKS',
        'COMPARISON',     # matches "COMPARISON PANEL", "THE COMPARISON", "VISUAL: THE COMPARISON"
        'EXAMPLE',        # matches "EXAMPLES", "EXAMPLES IN ACTION"
        'WHEN TO USE',
        'USE CASE',       # matches "USE CASES"
        'RELATED',        # matches "RELATED FRAMEWORKS"
        'CTA',            # matches "CTA SECTION"
    ]

    def run(self) -> AuditResult:
        # Check 1: Report actual HTML file count
        self.checks_run += 1
        actual_count = len(self.loader.discover_html_files())
        self.files_scanned += 1
        # Inventory only — no INFO emission (visible in Site Snapshot section)

        # Check 2: Glossary integrity
        self._check_glossary_integrity()

        # Check 3: Search index
        self._check_search_index()

        # Check 4: data-counter values on index.html
        self._check_index_counters()

        # Check 5: Glossary count consistency
        self._check_glossary_page_counts()

        # Check 6-9: Page-wide content accuracy (all 154 pages)
        self._check_all_pages()

        return self._result()

    def _check_all_pages(self):
        """Run content accuracy checks across all HTML pages."""
        fragments = self.discovery.get_fragment_files()
        deactivated = set(self.discovery.get_deactivated_tools())
        active_tool_count = len(self.discovery.get_active_tools())

        for rel_path in self.loader.discover_html_files():
            if rel_path in fragments:
                continue

            lines = self.loader.read_html(rel_path)
            text = self.loader.read_html_text(rel_path)
            self.files_scanned += 1

            # Check 6: Comparison panel structure
            self._check_comparison_panels(rel_path, text)

            # Check 7: Deprecated component classes
            self._check_deprecated_classes(rel_path, lines)

            # Check 8: Framework template completeness (learn/ pages only)
            self._check_framework_template(rel_path, text)

            # Check 9: Footer tool count consistency
            if rel_path not in deactivated:
                self._check_footer_tool_count(rel_path, lines, active_tool_count)

    def _check_comparison_panels(self, rel_path: str, text: str):
        """Verify every comparison-panel contains a comparison-panel__divider."""
        panels = self.RE_COMPARISON_PANEL.findall(text)
        if not panels:
            return

        self.checks_run += 1
        dividers = self.RE_COMPARISON_DIVIDER.findall(text)
        panel_count = len(panels)
        divider_count = len(dividers)

        if divider_count < panel_count:
            self.add(Severity.WARNING, rel_path, 0,
                     f"Comparison panel missing divider: {panel_count} panel(s) but only {divider_count} divider(s)",
                     suggestion="Add <div class=\"comparison-panel__divider\"><span>VS</span></div> between before/after sides")

    def _check_deprecated_classes(self, rel_path: str, lines: List[str]):
        """Flag old feature-list--check/--cross format."""
        in_comment = False
        for i, line in enumerate(lines, 1):
            # Track multi-line HTML comment state
            if '<!--' in line and '-->' not in line:
                in_comment = True
            if '-->' in line:
                in_comment = False
                continue
            if in_comment:
                continue
            if line.strip().startswith('<!--'):
                continue

            m = self.RE_DEPRECATED_FEATURE_LIST.search(line)
            if m:
                self.checks_run += 1
                variant = m.group(1)
                replacement = 'feature-list__item--positive' if variant == 'check' else 'feature-list__item--neutral'
                self.add(Severity.WARNING, rel_path, i,
                         f"Deprecated class: feature-list--{variant} (old UL format)",
                         line.strip()[:120],
                         f"Convert to card format with {replacement}")

    def _check_framework_template(self, rel_path: str, text: str):
        """Check learn/ framework pages have all required section markers."""
        # Only applies to learn/ pages (depth 1 framework pages)
        if not rel_path.startswith('learn/'):
            return
        # Skip hub/index pages and special pages
        basename = rel_path.split('/')[-1]
        if basename == 'index.html' or basename == 'facts-fictions.html':
            return
        # Skip modality hub pages
        if '/modality/' in rel_path and basename == 'index.html':
            return
        # Skip category hub pages (they have FRAMEWORK GRID or category-browser)
        if 'category-browser' in text or 'FRAMEWORK GRID' in text:
            return

        # Collect all section comment markers
        found_markers = []
        for m in self.RE_SECTION_COMMENT.finditer(text):
            found_markers.append(m.group(1).upper().strip())

        self.checks_run += 1
        missing = []
        for section in self.REQUIRED_SECTIONS:
            if not any(section in marker for marker in found_markers):
                missing.append(section)

        if missing:
            self.add(Severity.WARNING, rel_path, 0,
                     f"Framework page missing section(s): {', '.join(missing)}",
                     suggestion="Add missing sections to match the standard framework template")

    def _check_footer_tool_count(self, rel_path: str, lines: List[str],
                                  expected_count: int):
        """Check footer AI Readiness Tools section has correct number of links."""
        in_tools_section = False
        tool_links = 0
        tools_section_found = False
        div_depth = 0

        for line in lines:
            if self.RE_FOOTER_TOOLS_HEADER.search(line):
                in_tools_section = True
                tools_section_found = True
                div_depth = 1  # We're inside the parent <div>
                continue
            if in_tools_section:
                div_depth += line.count('<div')
                div_depth -= line.count('</div')
                if div_depth <= 0:
                    break  # Exited the tools section container
                for _ in self.RE_FOOTER_LINK.finditer(line):
                    tool_links += 1

        if not tools_section_found:
            return  # Continuity checker handles missing footer sections

        self.checks_run += 1
        if tool_links != expected_count:
            self.add(Severity.WARNING, rel_path, 0,
                     f"Footer tool count mismatch: {tool_links} links but {expected_count} active tools",
                     suggestion=f"Update footer AI Readiness Tools section to list all {expected_count} tools")

    def _check_glossary_integrity(self):
        manifest = self.loader.read_json('data/glossary/manifest.json')
        if manifest is None:
            self.add(Severity.ERROR, "data/glossary/manifest.json", 0,
                     "Manifest file missing or invalid JSON")
            return

        self.files_scanned += 1
        self.checks_run += 1

        manifest_total = manifest.get('totalTerms', 0)
        manifest_letters = manifest.get('letters', {})

        actual_total = 0
        for letter_key, info in manifest_letters.items():
            shard_path = f"data/glossary/{letter_key}.json"
            shard = self.loader.read_json(shard_path)
            if shard is None:
                self.add(Severity.ERROR, shard_path, 0,
                         f"Shard file missing: {shard_path}")
                continue

            self.files_scanned += 1
            shard_terms = len(shard.get('terms', []))
            manifest_count = info.get('count', 0)
            actual_total += shard_terms

            self.checks_run += 1
            if shard_terms != manifest_count:
                self.add(Severity.ERROR, shard_path, 0,
                         f"Shard count mismatch: manifest says {manifest_count}, actual has {shard_terms}")

        self.checks_run += 1
        if actual_total != manifest_total:
            self.add(Severity.ERROR, "data/glossary/manifest.json", 0,
                     f"Total terms mismatch: manifest says {manifest_total}, sum of shards = {actual_total}")
        # Glossary integrity verified — no INFO emission (visible in Site Snapshot)

    def _check_search_index(self):
        search_data = self.loader.read_json('data/search-index.json')
        if search_data is None:
            self.add(Severity.ERROR, "data/search-index.json", 0,
                     "Search index file missing or invalid JSON")
            return

        self.files_scanned += 1
        self.checks_run += 1

        if not isinstance(search_data, list):
            self.add(Severity.ERROR, "data/search-index.json", 0,
                     f"Search index must be a JSON array, got {type(search_data).__name__}")
            return

        if len(search_data) == 0:
            self.add(Severity.WARNING, "data/search-index.json", 0,
                     "Search index is empty — site search will return no results")
            return

        # Validate that entries have minimum required fields
        self.checks_run += 1
        missing_fields = 0
        for idx, entry in enumerate(search_data):
            if not isinstance(entry, dict):
                missing_fields += 1
                continue
            if 'title' not in entry or 'url' not in entry:
                missing_fields += 1

        if missing_fields > 0:
            self.add(Severity.WARNING, "data/search-index.json", 0,
                     f"{missing_fields} search index entries missing required title/url fields")
        # Search index validated — count visible in Site Snapshot

    def _check_index_counters(self):
        """Check data-counter values on index.html against actual site state."""
        lines = self.loader.read_html('index.html')
        if not lines:
            return

        self.files_scanned += 1
        counter_re = re.compile(r'data-counter\s*=\s*["\'](\d+)["\']')
        label_re = re.compile(r'counter-label["\'][^>]*>([^<]+)')

        active_tool_count = len(self.discovery.get_active_tools())
        glossary_terms = self.discovery.get_glossary_term_count()
        framework_count = self.discovery.get_framework_count()

        counters_found = []
        for i, line in enumerate(lines, 1):
            m = counter_re.search(line)
            if m:
                val = int(m.group(1))
                label = ""
                for j in range(i, min(i + 3, len(lines) + 1)):
                    label_m = label_re.search(lines[j - 1])
                    if label_m:
                        label = label_m.group(1).strip()
                        break
                counters_found.append((val, label, i))
                self.checks_run += 1

        for val, label, line_num in counters_found:
            # Counter inventory — no INFO emission, only warn on mismatches
            label_lower = label.lower()
            if 'tool' in label_lower:
                if val != active_tool_count:
                    self.add(Severity.WARNING, "index.html", line_num,
                             f"Tools counter shows {val} but {active_tool_count} active tools detected",
                             suggestion=f"Update data-counter to {active_tool_count}")

            if 'glossary' in label_lower or 'term' in label_lower:
                if val != glossary_terms:
                    self.add(Severity.WARNING, "index.html", line_num,
                             f"Glossary counter shows {val} but manifest has {glossary_terms} terms",
                             suggestion=f"Update data-counter to {glossary_terms}")

            if 'framework' in label_lower:
                if val != framework_count:
                    self.add(Severity.WARNING, "index.html", line_num,
                             f"Frameworks counter shows {val} but {framework_count} framework pages detected",
                             suggestion=f"Update data-counter to {framework_count}")

    def _check_glossary_page_counts(self):
        lines = self.loader.read_html('pages/glossary.html')
        if not lines:
            return

        self.files_scanned += 1
        term_count = self.discovery.get_glossary_term_count()
        if term_count == 0:
            return

        # Check for the count appearing in the page
        patterns = [str(term_count), f"{term_count:,}"]
        text = ''.join(lines)
        occurrences = sum(text.count(p) for p in patterns)

        self.checks_run += 1
        if occurrences < 3:
            self.add(Severity.WARNING, "pages/glossary.html", 0,
                     f"Glossary term count ({term_count:,}) found only {occurrences} times, expected 3+",
                     suggestion="Update term count in meta, title, subtitle, visible-count, and search placeholder")
        # Glossary count sync verified — no INFO emission (inventory data)


# ============================================================
# 6. BIAS / INCLUSIVITY CHECKER
# ============================================================

RE_STRIP_TAGS = re.compile(r'<[^>]+>')


SEVERITY_MAP = {'ERROR': Severity.ERROR, 'WARNING': Severity.WARNING, 'INFO': Severity.INFO}


def _load_bias_terms(script_dir: str) -> list:
    """Load content quality patterns from bias-terms.json alongside this script."""
    json_path = os.path.join(script_dir, 'bias-terms.json')
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        patterns = []
        for entry in data.get('terms', []):
            if '_comment' in entry:
                continue  # Skip section comment markers
            compiled = re.compile(entry['pattern'], re.IGNORECASE)
            severity = SEVERITY_MAP.get(entry.get('severity', 'INFO'), Severity.INFO)
            patterns.append((compiled, entry['suggestion'], entry.get('category', ''), severity))
        return patterns
    except (FileNotFoundError, json.JSONDecodeError, KeyError) as e:
        print(f"  WARNING: Could not load bias-terms.json: {e}")
        return []


class BiasInclusivityChecker(AuditChecker):
    category = Category.BIAS

    def run(self) -> AuditResult:
        # Load terms from external JSON (editable without touching Python code)
        script_dir = os.path.dirname(os.path.abspath(__file__))
        bias_patterns = _load_bias_terms(script_dir)

        if not bias_patterns:
            self.add(Severity.WARNING, "bias-terms.json", 0,
                     "Content quality term list could not be loaded — checks skipped",
                     suggestion="Ensure bias-terms.json exists alongside PraxisLibraryAudit.py")
            return self._result()

        for rel_path in self.loader.discover_html_files():
            lines = self.loader.read_html(rel_path)
            self.files_scanned += 1

            for i, line in enumerate(lines, 1):
                stripped = line.strip()
                if stripped.startswith('<!--'):
                    continue
                # Extract visible text only (strip HTML tags to avoid
                # false positives from class names and attributes)
                visible = RE_STRIP_TAGS.sub('', stripped)
                if not visible.strip():
                    continue

                self.checks_run += 1
                for pattern, suggestion, cat, severity in bias_patterns:
                    if pattern.search(visible):
                        label = "Profanity" if cat in ('profanity', 'slur') else "Potential bias"
                        self.add(severity, rel_path, i,
                                 f"{label} ({cat}): {suggestion}",
                                 stripped[:120],
                                 suggestion)

        return self._result()


# ============================================================
# 7. ACCESSIBILITY CHECKER
# ============================================================

RE_IMG_TAG = re.compile(r'<img\s[^>]*>', re.IGNORECASE | re.DOTALL)
RE_IMG_HAS_ALT = re.compile(r'\balt\s*=', re.IGNORECASE)
RE_IMG_EMPTY_ALT = re.compile(r'\balt\s*=\s*["\']["\']', re.IGNORECASE)
RE_HEADING = re.compile(r'<h([1-6])\b', re.IGNORECASE)
RE_NAV_FOOTER_CONTEXT = re.compile(
    r'mega-menu|footer-links|footer-brand|nav-link|mega-menu-section|footer-grid',
    re.IGNORECASE
)
RE_VAGUE_LINK = re.compile(
    r'<a\s[^>]*>\s*(?:click\s+here|read\s+more|learn\s+more|more|here|link)\s*</a>',
    re.IGNORECASE
)
RE_FORM_INPUT = re.compile(
    r'<(?:input|select|textarea)\s[^>]*>', re.IGNORECASE
)
RE_HAS_LABEL = re.compile(
    r'\baria-label(?:ledby)?\s*=|\bid\s*=\s*["\']([^"\']+)["\']', re.IGNORECASE
)
RE_INPUT_TYPE_HIDDEN = re.compile(r'type\s*=\s*["\'](?:hidden|submit|button|reset|image)["\']', re.IGNORECASE)
RE_TABINDEX = re.compile(r'tabindex\s*=\s*["\'](\d+)["\']', re.IGNORECASE)


class AccessibilityChecker(AuditChecker):
    category = Category.ACCESSIBILITY

    def run(self) -> AuditResult:
        fragments = self.discovery.get_fragment_files()

        for rel_path in self.loader.discover_html_files():
            if rel_path in fragments:
                continue
            lines = self.loader.read_html(rel_path)
            text = self.loader.read_html_text(rel_path)
            self.files_scanned += 1

            # Check 1: html lang attribute
            self.checks_run += 1
            if not re.search(r'<html\s[^>]*lang\s*=', text, re.IGNORECASE):
                self.add(Severity.ERROR, rel_path, 1,
                         "Missing lang attribute on <html>")

            # Check 2: img alt attributes (multi-line safe)
            self._check_img_alts(rel_path, text)

            # Check 3: Heading hierarchy + h1 presence
            self._check_heading_hierarchy(rel_path, lines)

            # Check 4: Vague link text
            self._check_vague_links(rel_path, lines)

            # Check 5: Form label association
            self._check_form_labels(rel_path, text, lines)

            # Check 6: Positive tabindex
            self._check_tabindex(rel_path, lines)

        return self._result()

    def _check_img_alts(self, rel_path: str, text: str):
        """Check all <img> tags for alt attributes (multi-line safe)."""
        for m in RE_IMG_TAG.finditer(text):
            self.checks_run += 1
            tag = m.group(0)
            # Find line number from char offset
            line_num = text[:m.start()].count('\n') + 1
            if not RE_IMG_HAS_ALT.search(tag):
                self.add(Severity.ERROR, rel_path, line_num,
                         "Image missing alt attribute",
                         tag.replace('\n', ' ').strip()[:120])
            elif RE_IMG_EMPTY_ALT.search(tag):
                self.add(Severity.INFO, rel_path, line_num,
                         "Image with empty alt (decorative?)",
                         tag.replace('\n', ' ').strip()[:120])

    def _check_heading_hierarchy(self, rel_path: str, lines: List[str]):
        """Check heading levels don't skip AND that h1 exists."""
        headings = []
        in_nav_footer = False

        for i, line in enumerate(lines, 1):
            if re.search(r'<(?:nav|footer)\b|mega-menu|footer-links', line, re.IGNORECASE):
                in_nav_footer = True
            if re.search(r'</(?:nav|footer)>', line, re.IGNORECASE):
                in_nav_footer = False

            for m in RE_HEADING.finditer(line):
                level = int(m.group(1))
                if in_nav_footer:
                    continue
                context_start = max(0, i - 4)
                context_end = min(len(lines), i + 2)
                context = ''.join(lines[context_start:context_end])
                if RE_NAV_FOOTER_CONTEXT.search(context):
                    continue
                headings.append((i, level))

        # Check hierarchy sequence
        self.checks_run += 1
        prev_level = 0
        for line_num, level in headings:
            if prev_level > 0 and level > prev_level + 1:
                self.add(Severity.WARNING, rel_path, line_num,
                         f"Heading hierarchy skip: h{prev_level} -> h{level}",
                         suggestion=f"Add an h{prev_level + 1} before this h{level}")
            prev_level = level

        # Check h1 presence
        self.checks_run += 1
        h1_count = sum(1 for _, level in headings if level == 1)
        if h1_count == 0:
            self.add(Severity.WARNING, rel_path, 0,
                     "Page has no <h1> element",
                     suggestion="Every page should have exactly one <h1> for accessibility and SEO")

    def _check_vague_links(self, rel_path: str, lines: List[str]):
        """Flag links with vague text like 'click here' or 'read more'."""
        for i, line in enumerate(lines, 1):
            if '<a ' in line.lower():
                self.checks_run += 1
                if RE_VAGUE_LINK.search(line):
                    self.add(Severity.WARNING, rel_path, i,
                             "Vague link text (inaccessible to screen readers)",
                             line.strip()[:120],
                             "Use descriptive link text that makes sense out of context")

    def _check_form_labels(self, rel_path: str, text: str, lines: List[str]):
        """Check form inputs have associated labels or aria-label."""
        # Collect all label[for] targets on the page
        label_targets = set()
        for m in re.finditer(r'<label\s[^>]*for\s*=\s*["\']([^"\']+)["\']', text, re.IGNORECASE):
            label_targets.add(m.group(1))

        for m in RE_FORM_INPUT.finditer(text):
            tag = m.group(0)
            # Skip hidden, submit, button, reset, image inputs
            if RE_INPUT_TYPE_HIDDEN.search(tag):
                continue
            self.checks_run += 1
            line_num = text[:m.start()].count('\n') + 1

            # Check for aria-label/aria-labelledby
            if re.search(r'\baria-label(?:ledby)?\s*=', tag, re.IGNORECASE):
                continue
            # Check for id that matches a label[for]
            id_m = re.search(r'\bid\s*=\s*["\']([^"\']+)["\']', tag, re.IGNORECASE)
            if id_m and id_m.group(1) in label_targets:
                continue
            # Check if wrapped in a <label> (compare last open vs last close)
            ctx_start = max(0, m.start() - 500)
            ctx_before = text[ctx_start:m.start()].lower()
            last_label_open = ctx_before.rfind('<label')
            last_label_close = ctx_before.rfind('</label>')
            if last_label_open > last_label_close:
                continue  # Inside a wrapping <label>

            self.add(Severity.WARNING, rel_path, line_num,
                     "Form input without associated label",
                     tag.strip()[:120],
                     "Add <label for=\"id\">, aria-label, or wrap in <label>")

    def _check_tabindex(self, rel_path: str, lines: List[str]):
        """Flag positive tabindex values (anti-pattern)."""
        for i, line in enumerate(lines, 1):
            m = RE_TABINDEX.search(line)
            if m:
                val = int(m.group(1))
                if val > 0:
                    self.checks_run += 1
                    self.add(Severity.WARNING, rel_path, i,
                             f"Positive tabindex={val} overrides natural tab order",
                             line.strip()[:120],
                             "Use tabindex=\"0\" or tabindex=\"-1\" instead")


# ============================================================
# 8. CITATION CHECKER
# ============================================================

# Extract anchor text from a link that contains a .gov/.edu href
RE_GOV_EDU_LINK = re.compile(
    r'<a\s[^>]*href\s*=\s*["\']((https?://[^"\']*\.(?:gov|edu)[^"\']*))["\'][^>]*>'
    r'(.*?)</a>', re.IGNORECASE | re.DOTALL
)
RE_HIGHLIGHT_BOX = re.compile(
    r'class\s*=\s*["\'][^"\']*\bhighlight-box\b(?!__)[^"\']*["\']', re.IGNORECASE
)
RE_HIGHLIGHT_SOURCE = re.compile(r'highlight-box__source', re.IGNORECASE)
RE_STAT_CARD = re.compile(
    r'class\s*=\s*["\'][^"\']*research-stat-card["\']', re.IGNORECASE
)
RE_STAT_SOURCE = re.compile(r'research-stat-card__source', re.IGNORECASE)

# Citation freshness — full <a>...</a> extraction (multi-line safe)
RE_CITATION_LINK = re.compile(
    r'<a\s[^>]*href\s*=\s*["\'](https?://[^"\']+)["\'][^>]*>(.*?)</a>',
    re.IGNORECASE | re.DOTALL
)
# Year in anchor text: (2021), (April 2021), — 2021, etc.
RE_TEXT_YEAR = re.compile(r'\b(20[0-3]\d)\b')
# Year in URL path segment: /2021/, /2021., /releases/2021/
RE_URL_YEAR = re.compile(r'/20([0-3]\d)/')
# data-added attribute: data-added="YYYY-MM-DD"
RE_DATA_ADDED = re.compile(r'data-added\s*=\s*["\'](\d{4}-\d{2}-\d{2})["\']', re.IGNORECASE)

# Freshness policy: all cited sources must be within this window
CITATION_FRESHNESS_CUTOFF = 2024  # Minimum acceptable year

# Domains known to bot-block (return 999, 403, or timeout) — skip in URL checks.
# Used by both Category 3 (Broken Links) and Category 8 (Citation Accuracy).
# All URLs manually verified in browser before adding here.
BOT_BLOCKED_ALLOWLIST = {
    # .gov/.edu domains
    'nvlpubs.nist.gov',
    'mitpress.mit.edu',
    'digitalcollections.library.cmu.edu',
    # External domains (403/999/timeout — verified manually 2026-02-11)
    'openai.com',
    'x.ai',
    'dl.acm.org',
    'doi.org',
    'www.linkedin.com',
    'www.stlouisfed.org',
}


class CitationChecker(AuditChecker):
    category = Category.CITATION

    def run(self) -> AuditResult:
        # url -> list of (file, line, anchor_text)
        external_urls: Dict[str, List[Tuple[str, int, str]]] = defaultdict(list)
        # file -> list of (url, line, anchor_text)
        per_file_links: Dict[str, List[Tuple[str, int, str]]] = defaultdict(list)
        check_urls = self.config.get('check_urls', False)

        for rel_path in self.loader.discover_html_files():
            lines = self.loader.read_html(rel_path)
            self.files_scanned += 1

            # Join lines to catch multi-line <a> tags
            full_text = '\n'.join(lines)
            line_offsets = []
            offset = 0
            for line in lines:
                line_offsets.append(offset)
                offset += len(line) + 1  # +1 for \n

            for m in RE_GOV_EDU_LINK.finditer(full_text):
                url = m.group(1)
                raw_anchor = m.group(3)
                # Strip HTML tags from anchor text
                anchor = re.sub(r'<[^>]+>', '', raw_anchor).strip()
                if not anchor:
                    anchor = "(no text)"
                # Find line number from char position
                pos = m.start()
                line_num = 1
                for idx, lo in enumerate(line_offsets):
                    if lo > pos:
                        break
                    line_num = idx + 1

                per_file_links[rel_path].append((url, line_num, anchor))
                if check_urls:
                    external_urls[url].append((rel_path, line_num, anchor))
                self.checks_run += 1

            # Source attribution checks
            self._check_highlight_sources(rel_path, lines)
            self._check_stat_card_sources(rel_path, lines)

            # Citation freshness checks (multi-line safe — uses full_text)
            self._check_citation_freshness(rel_path, full_text)

        # External URL checks + per-file status reporting
        failed_files: set = set()
        if check_urls and external_urls:
            failed_files = self._check_citation_urls(external_urls)

        # Emit per-file citation info with clear good/bad labeling
        for rel_path in sorted(per_file_links.keys()):
            links = per_file_links[rel_path]
            count = len(links)
            if check_urls:
                if rel_path in failed_files:
                    self.add(Severity.INFO, rel_path, 0,
                             f"{count} .gov/.edu citation(s) — some failed verification (see errors above)")
                else:
                    self.add(Severity.INFO, rel_path, 0,
                             f"{count} .gov/.edu citation(s) — all verified")
            else:
                self.add(Severity.INFO, rel_path, 0,
                         f"{count} .gov/.edu citation(s) — not verified (--skip-urls active)")

        return self._result()

    def _check_highlight_sources(self, rel_path: str, lines: List[str]):
        # Skip framework pages (no-citations rule) and tool pages (example content)
        if rel_path.startswith(('learn/', 'tools/')):
            return

        # More targeted data pattern:
        #   - Specific percentages: 73%, 17.7%
        #   - Dollar amounts: $1,500, $4.5 billion
        #   - Numeric + scale: 2.4 million, 500 billion
        # Excludes vague "millions of", "a trillion", "billions of"
        DATA_RE = re.compile(
            r'\d+\.?\d*\s*%'
            r'|\$[\d,.]+(?:\s*(?:billion|million|trillion))?'
            r'|\d[\d,.]*\s+(?:billion|million|trillion)\b',
            re.I
        )

        i = 0
        while i < len(lines):
            line = lines[i]
            if RE_HIGHLIGHT_BOX.search(line):
                # Skip historical-context boxes (--warning variant)
                if 'highlight-box--warning' in line:
                    i += 1
                    continue

                has_source = False
                search_end = min(i + 15, len(lines))
                block = ''.join(lines[i:search_end])
                if RE_HIGHLIGHT_SOURCE.search(block):
                    has_source = True

                if not has_source:
                    if DATA_RE.search(block):
                        self.checks_run += 1
                        self.add(Severity.WARNING, rel_path, i + 1,
                                 "Highlight box contains data but no source attribution",
                                 suggestion="Add highlight-box__source with citation link")
            i += 1

    def _check_citation_freshness(self, rel_path: str, text: str):
        """Enforce citation freshness: all cited sources must be 2024+.

        Uses full-text regex (multi-line safe) to extract complete <a>...</a> blocks.
        Checks URL paths and anchor text for year patterns. data-added checked
        within each tag (not the whole line) to avoid false negatives.
        """
        # Only check pages that carry current-state citations
        # Skip framework pages (historical context), foundations (AI timeline),
        # and tools (example content)
        if rel_path.startswith(('learn/', 'tools/', 'foundations/')):
            return

        # Skip non-citation pages (github badges, social links)
        # Only scan neurodivergence/, pages/, and root-level pages
        CITATION_DIRS = ('neurodivergence/', 'pages/')
        is_root = '/' not in rel_path
        if not (rel_path.startswith(CITATION_DIRS) or is_root):
            return

        # Track already-flagged URLs to avoid duplicate errors
        flagged_urls = set()

        for m in RE_CITATION_LINK.finditer(text):
            url = m.group(1)
            raw_anchor = m.group(2)
            full_tag = m.group(0)

            # Skip GitHub, LinkedIn, and other non-citation links
            if any(skip in url for skip in (
                'github.com', 'linkedin.com', 'twitter.com',
                'x.com', 'facebook.com', 'youtube.com'
            )):
                continue

            if url in flagged_urls:
                continue

            self.checks_run += 1
            line_num = text[:m.start()].count('\n') + 1

            # Strategy 1: Check URL path for year pattern /YYYY/
            detected_year = None
            url_year_match = RE_URL_YEAR.search(url)
            if url_year_match:
                detected_year = 2000 + int(url_year_match.group(1))

            # Strategy 2: Check this link's anchor text for year
            anchor_text = re.sub(r'<[^>]+>', '', raw_anchor).strip()
            for year_match in RE_TEXT_YEAR.finditer(anchor_text):
                y = int(year_match.group(1))
                if 2000 <= y <= 2099:
                    if detected_year is None:
                        detected_year = y
                    else:
                        detected_year = min(detected_year, y)

            # Strategy 3: Check highlight-box__source text nearby
            if detected_year is None:
                ctx_start = max(0, m.start() - 300)
                ctx_end = min(len(text), m.end() + 300)
                context = text[ctx_start:ctx_end]
                if 'highlight-box__source' in context:
                    for year_match in RE_TEXT_YEAR.finditer(context):
                        y = int(year_match.group(1))
                        if 2000 <= y <= 2099:
                            detected_year = y
                            break

            # Flag stale citations
            if detected_year is not None and detected_year < CITATION_FRESHNESS_CUTOFF:
                flagged_urls.add(url)
                display_url = url if len(url) <= 80 else url[:77] + '...'
                self.add(Severity.ERROR, rel_path, line_num,
                         f"Stale citation ({detected_year}) — policy requires {CITATION_FRESHNESS_CUTOFF}+: {display_url}",
                         suggestion=f"Replace with a current ({CITATION_FRESHNESS_CUTOFF}–{datetime.now().year}) source or remove")

            # Check for data-added timestamp within this <a> tag (not the whole line)
            if not RE_DATA_ADDED.search(full_tag):
                self.checks_run += 1
                display_url = url if len(url) <= 60 else url[:57] + '...'
                self.add(Severity.WARNING, rel_path, line_num,
                         f"External link missing data-added timestamp: {display_url}",
                         suggestion='Add data-added="YYYY-MM-DD" attribute to track when this citation was added')

    def _check_stat_card_sources(self, rel_path: str, lines: List[str]):
        i = 0
        while i < len(lines):
            line = lines[i]
            if RE_STAT_CARD.search(line):
                has_source = False
                search_end = min(i + 10, len(lines))
                block = ''.join(lines[i:search_end])
                if RE_STAT_SOURCE.search(block):
                    has_source = True
                self.checks_run += 1
                if not has_source:
                    self.add(Severity.WARNING, rel_path, i + 1,
                             "Stat card without source attribution",
                             suggestion="Add research-stat-card__source with citation")
            i += 1

    @staticmethod
    def _clean_anchor(raw: str) -> str:
        """Clean anchor text: decode HTML entities, collapse whitespace, truncate."""
        text = raw.replace('&mdash;', '-').replace('&ndash;', '-')
        text = text.replace('&amp;', '&').replace('&rarr;', '').replace('&larr;', '')
        text = re.sub(r'&\w+;', '', text)  # strip remaining entities
        text = re.sub(r'\s+', ' ', text).strip()
        if len(text) > 80:
            text = text[:77] + '...'
        return text

    def _check_citation_urls(self, url_map: Dict[str, List[Tuple[str, int, str]]]) -> set:
        """Check .gov/.edu URLs and return set of files with failures."""
        ctx = ssl.create_default_context()
        failed_files: set = set()

        # Filter out known bot-blocked domains — emit INFO instead of checking
        checkable = {}
        for url in url_map:
            try:
                domain = urllib.parse.urlparse(url).hostname or ''
            except Exception:
                domain = ''
            if domain in BOT_BLOCKED_ALLOWLIST:
                for file_path, line_num, raw_anchor in url_map[url]:
                    anchor = self._clean_anchor(raw_anchor)
                    self.add(Severity.INFO, file_path, line_num,
                             f"BOT-BLOCKED DOMAIN (manual verify): \"{anchor}\" -> {url}",
                             suggestion=f"Domain '{domain}' blocks bots — verify manually in browser")
                continue
            checkable[url] = url_map[url]

        def check_one(url: str) -> Tuple[str, int, str, str]:
            """Returns (url, status_code, final_url, error_detail).
            Tries HEAD first; falls back to GET on 403/405."""
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
            for method in ('HEAD', 'GET'):
                req = urllib.request.Request(url, method=method, headers=headers)
                try:
                    resp = urllib.request.urlopen(req, timeout=15, context=ctx)
                    final_url = resp.url if resp.url != url else ""
                    if method == 'GET':
                        resp.read(1024)
                        resp.close()
                    return (url, resp.status, final_url, "")
                except urllib.error.HTTPError as e:
                    if method == 'HEAD' and e.code in (403, 405):
                        continue
                    return (url, e.code, "", str(e.reason))
                except Exception as e:
                    if method == 'HEAD':
                        continue
                    return (url, 0, "", str(e))
            return (url, 0, "", "All methods failed")

        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
            futures = {pool.submit(check_one, url): url for url in checkable}
            for future in concurrent.futures.as_completed(futures):
                url, status, final_url, error = future.result()
                self.checks_run += 1
                # Use the first anchor for this URL (they should be similar)
                first_anchor = self._clean_anchor(url_map[url][0][2])
                for file_path, line_num, raw_anchor in url_map[url]:
                    anchor = self._clean_anchor(raw_anchor)
                    if status == 0 or status >= 400:
                        failed_files.add(file_path)
                        self.add(Severity.ERROR, file_path, line_num,
                                 f"UNREACHABLE ({status}): \"{anchor}\" -> {url}",
                                 error,
                                 "Verify the .gov/.edu URL is still valid")
                    else:
                        redirect_note = f" (redirects to {final_url})" if final_url else ""
                        self.add(Severity.INFO, file_path, line_num,
                                 f"VERIFIED ({status}): \"{anchor}\" -> {url}{redirect_note}")

        return failed_files


# ============================================================
# 9. DATA ACCURACY CHECKER
# ============================================================

class DataAccuracyChecker(AuditChecker):
    category = Category.DATA_ACCURACY

    RE_FRAGMENT_HREF = re.compile(r'href\s*=\s*["\']#([^"\']+)["\']', re.I)

    def run(self) -> AuditResult:
        # Existing checks (charts, gauges, glossary sync)
        self._check_bar_charts()
        self._check_gauge_values()
        self._check_glossary_count_sync()

        # New checks: JSON integrity, anchors, glossary fields, search index
        self._check_json_data_integrity()
        self._check_same_page_anchors()
        self._check_glossary_shard_fields()
        self._check_search_index_entries()

        return self._result()

    def _check_bar_charts(self):
        """Validate bar chart data-width values are within 0-100 range."""
        re_width = re.compile(r'data-width\s*=\s*["\'](\d+)["\']')

        for rel_path in self.loader.discover_html_files():
            lines = self.loader.read_html(rel_path)
            has_charts = False

            for i, line in enumerate(lines, 1):
                w_m = re_width.search(line)
                if w_m:
                    if not has_charts:
                        has_charts = True
                        self.files_scanned += 1
                    self.checks_run += 1
                    val = int(w_m.group(1))
                    if val < 0 or val > 100:
                        self.add(Severity.WARNING, rel_path, i,
                                 f"Bar chart data-width={val} out of range (must be 0-100)",
                                 line.strip()[:120],
                                 "data-width represents a percentage — value must be 0-100")

    def _check_gauge_values(self):
        """Check each gauge's data-value matches its own displayed text (positional)."""
        # Captures entire gauge-circle block: data-value and inner gauge-value text
        re_gauge_block = re.compile(
            r'<div\s[^>]*gauge-circle[^>]*data-value\s*=\s*["\'](\d+)["\'][^>]*>'
            r'(.*?)</div>',
            re.IGNORECASE | re.DOTALL
        )
        re_gauge_text = re.compile(r'gauge-value["\'][^>]*>([^<]+)', re.IGNORECASE)

        for rel_path in self.loader.discover_html_files():
            text = self.loader.read_html_text(rel_path)
            matches = list(re_gauge_block.finditer(text))
            if not matches:
                continue

            self.files_scanned += 1
            for m in matches:
                self.checks_run += 1
                data_val = m.group(1)
                inner = m.group(2)
                line_num = text[:m.start()].count('\n') + 1

                text_m = re_gauge_text.search(inner)
                if not text_m:
                    self.add(Severity.WARNING, rel_path, line_num,
                             f"Gauge data-value={data_val} has no gauge-value text inside it",
                             suggestion="Add <span class=\"gauge-value\">N%</span> inside the gauge-circle")
                else:
                    display = text_m.group(1).strip()
                    # Extract numeric part from display (e.g., "95%" -> "95")
                    display_num = re.sub(r'[^\d]', '', display)
                    if display_num != data_val:
                        self.add(Severity.WARNING, rel_path, line_num,
                                 f"Gauge mismatch: data-value={data_val} but displays '{display}'",
                                 suggestion=f"Change gauge-value text to match data-value={data_val}")

    def _check_glossary_count_sync(self):
        """Check glossary count is consistent between index.html and glossary.html."""
        term_count = self.discovery.get_glossary_term_count()
        if term_count == 0:
            return

        patterns = [str(term_count), f"{term_count:,}"]
        check_files = ['index.html', 'pages/glossary.html']

        for rel_path in check_files:
            text = self.loader.read_html_text(rel_path)
            if not text:
                continue

            self.files_scanned += 1
            self.checks_run += 1
            found = sum(text.count(p) for p in patterns)

            if rel_path == 'index.html' and found < 2:
                self.add(Severity.WARNING, rel_path, 0,
                         f"Glossary count ({term_count:,}) found {found} time(s), expected 2+",
                         suggestion="Update data-counter and highlight-box with current count")
            elif rel_path == 'pages/glossary.html' and found < 3:
                self.add(Severity.WARNING, rel_path, 0,
                         f"Glossary count ({term_count:,}) found {found} time(s), expected 3+",
                         suggestion="Update meta, title, subtitle, visible-count, placeholder")

    def _check_json_data_integrity(self):
        """Validate ALL .json files in data/ directory parse without error."""
        data_dir = os.path.join(self.loader.root_dir, 'data')
        if not os.path.isdir(data_dir):
            return

        for dirpath, _dirnames, filenames in os.walk(data_dir):
            for fname in sorted(filenames):
                if not fname.endswith('.json'):
                    continue
                full_path = os.path.join(dirpath, fname)
                rel_path = os.path.relpath(full_path, self.loader.root_dir).replace('\\', '/')

                self.files_scanned += 1
                self.checks_run += 1
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        json.load(f)
                except json.JSONDecodeError as e:
                    self.add(Severity.ERROR, rel_path, 0,
                             f"Invalid JSON: {e}",
                             suggestion="Fix JSON syntax error — this will break runtime features")
                except Exception as e:
                    self.add(Severity.ERROR, rel_path, 0,
                             f"Cannot read JSON file: {e}")

    def _check_same_page_anchors(self):
        """Verify fragment-only links (href='#id') have matching id on same page."""
        fragments = self.discovery.get_fragment_files()

        for rel_path in self.loader.discover_html_files():
            if rel_path in fragments:
                continue

            lines = self.loader.read_html(rel_path)
            text = self.loader.read_html_text(rel_path)
            self.files_scanned += 1

            # Collect all IDs on this page
            page_ids = set()
            for m in RE_ID_ATTR.finditer(text):
                page_ids.add(m.group(1))

            # Check each fragment-only href
            for i, line in enumerate(lines, 1):
                for m in self.RE_FRAGMENT_HREF.finditer(line):
                    target_id = m.group(1)
                    # Skip common JS-managed targets (accordion, tab panels, etc.)
                    if target_id == '' or target_id.startswith('!'):
                        continue
                    self.checks_run += 1
                    if target_id not in page_ids:
                        self.add(Severity.WARNING, rel_path, i,
                                 f"Broken same-page anchor: #{target_id} — no matching id found",
                                 line.strip()[:120],
                                 f"Add id=\"{target_id}\" to the target element or fix the href")

    def _check_glossary_shard_fields(self):
        """Validate each glossary term has required fields: term, definition."""
        manifest = self.loader.read_json('data/glossary/manifest.json')
        if manifest is None:
            return

        letters = manifest.get('letters', {})
        for letter_key in sorted(letters.keys()):
            shard_path = f"data/glossary/{letter_key}.json"
            shard = self.loader.read_json(shard_path)
            if shard is None:
                continue

            self.files_scanned += 1
            terms = shard.get('terms', [])
            for idx, term_obj in enumerate(terms):
                self.checks_run += 1
                missing_fields = []
                if not term_obj.get('term'):
                    missing_fields.append('term')
                if not term_obj.get('definition'):
                    missing_fields.append('definition')
                if missing_fields:
                    term_name = term_obj.get('term', f'entry #{idx}')
                    self.add(Severity.ERROR, shard_path, 0,
                             f"Glossary term '{term_name}' missing field(s): {', '.join(missing_fields)}",
                             suggestion="Each glossary term must have both 'term' and 'definition' fields")

    def _check_search_index_entries(self):
        """Validate search-index.json entries have required fields and valid URLs."""
        search_data = self.loader.read_json('data/search-index.json')
        if not search_data or not isinstance(search_data, list):
            return

        self.files_scanned += 1
        for idx, entry in enumerate(search_data):
            self.checks_run += 1
            missing = []
            if not entry.get('title'):
                missing.append('title')
            if not entry.get('url'):
                missing.append('url')

            if missing:
                title = entry.get('title', f'entry #{idx}')
                self.add(Severity.ERROR, "data/search-index.json", 0,
                         f"Search entry '{title}' missing field(s): {', '.join(missing)}",
                         suggestion="Each search entry must have 'title' and 'url' fields")
            elif entry.get('url'):
                # Verify the URL resolves to an existing file
                url = entry['url']
                # Strip leading slashes and anchors
                clean_url = url.lstrip('/')
                if '#' in clean_url:
                    clean_url = clean_url.split('#')[0]
                if clean_url and not self.loader.file_exists(clean_url):
                    self.checks_run += 1
                    self.add(Severity.WARNING, "data/search-index.json", 0,
                             f"Search entry '{entry['title']}' points to missing file: {url}",
                             suggestion="Update URL or remove stale search entry")


# ============================================================
# 10. STRUCTURAL CHECKER
# ============================================================

RE_ID_ATTR = re.compile(r'\bid\s*=\s*["\']([^"\']+)["\']', re.IGNORECASE)


class StructuralChecker(AuditChecker):
    category = Category.STRUCTURAL

    def run(self) -> AuditResult:
        all_files = set(self.loader.discover_html_files())
        referenced: Set[str] = set()
        deactivated = self.discovery.get_deactivated_tools()
        deactivated_set = set(deactivated)
        fragments = self.discovery.get_fragment_files()

        # Build regex for deactivated tool filenames dynamically
        deactivated_filenames = [f.split('/')[-1].replace('.html', '')
                                 for f in deactivated]
        if deactivated_filenames:
            deactivated_re = re.compile(
                r'href\s*=\s*["\'][^"\']*(?:' +
                '|'.join(re.escape(name) for name in deactivated_filenames) +
                r')\.html',
                re.IGNORECASE
            )
        else:
            deactivated_re = None

        for rel_path in self.loader.discover_html_files():
            lines = self.loader.read_html(rel_path)
            self.files_scanned += 1

            # Duplicate IDs
            self._check_duplicate_ids(rel_path, lines)

            # Meta description quality
            if rel_path not in fragments:
                self._check_meta_description(rel_path, lines)

            # Deactivated tool links (skip deactivated files and fragments)
            if (deactivated_re and
                    rel_path not in deactivated_set and
                    rel_path not in fragments):
                self._check_deactivated_links(rel_path, lines, deactivated_re)

            # Collect internal references
            for line in lines:
                for m in RE_HREF_SRC.finditer(line):
                    href = m.group(1).strip()
                    resolved = self.resolver.resolve(rel_path, href)
                    if resolved:
                        referenced.add(resolved)
                        # Resolve directory links to index.html
                        index_variant = resolved.rstrip('/') + '/index.html'
                        referenced.add(index_variant)

        # Orphan files (exclude fragments — they're loaded by JS, not linked via href)
        self.checks_run += 1
        orphans = all_files - referenced - fragments - {'index.html'}
        for orphan in sorted(orphans):
            self.add(Severity.WARNING, orphan, 0,
                     "Orphan file: not linked from any other page",
                     suggestion="Link from a parent page or consider removal")

        # Report fragments
        for frag in sorted(fragments):
            self.add(Severity.INFO, frag, 0,
                     "Fragment file (no DOCTYPE/html — not a full page)")

        # Report deactivated tools
        for deact in sorted(deactivated):
            self.add(Severity.INFO, deact, 0,
                     "Deactivated tool (file exists but not linked from footer)")

        # Sitemap validation
        self._check_sitemap(all_files, fragments)

        # Title tag quality
        self._check_title_tags(fragments)

        return self._result()

    def _check_duplicate_ids(self, rel_path: str, lines: List[str]):
        seen_ids: Dict[str, int] = {}
        for i, line in enumerate(lines, 1):
            for m in RE_ID_ATTR.finditer(line):
                id_val = m.group(1)
                if id_val in seen_ids:
                    self.checks_run += 1
                    self.add(Severity.WARNING, rel_path, i,
                             f"Duplicate id='{id_val}' (first at line {seen_ids[id_val]})",
                             suggestion="Make IDs unique within each page")
                else:
                    seen_ids[id_val] = i

    def _check_meta_description(self, rel_path: str, lines: List[str]):
        self.checks_run += 1
        text = ''.join(lines[:30])
        # Use double-quote-only capture to handle apostrophes in content
        m = re.search(
            r'<meta\s[^>]*name\s*=\s*"description"[^>]*content\s*=\s*"([^"]*)"',
            text, re.I
        )
        if not m:
            m = re.search(
                r'<meta\s[^>]*content\s*=\s*"([^"]*)"[^>]*name\s*=\s*"description"',
                text, re.I
            )
        if m:
            desc = m.group(1)
            if len(desc) < 50:
                self.add(Severity.WARNING, rel_path, 0,
                         f"Meta description too short ({len(desc)} chars)",
                         desc,
                         "Meta descriptions should be 50-160 characters")

    def _check_deactivated_links(self, rel_path: str, lines: List[str],
                                  deactivated_re: re.Pattern):
        for i, line in enumerate(lines, 1):
            if deactivated_re.search(line):
                self.checks_run += 1
                self.add(Severity.ERROR, rel_path, i,
                         "Links to deactivated tool",
                         line.strip(),
                         "Remove or update the link — this tool is deactivated")

    def _check_sitemap(self, all_files: Set[str], fragments: Set[str]):
        """Verify every non-fragment HTML page is listed in sitemap.xml."""
        sitemap_path = os.path.join(self.loader.root_dir, 'sitemap.xml')
        if not os.path.isfile(sitemap_path):
            self.checks_run += 1
            self.add(Severity.ERROR, "sitemap.xml", 0,
                     "sitemap.xml not found",
                     suggestion="Create a sitemap.xml for search engine discoverability")
            return

        try:
            with open(sitemap_path, 'r', encoding='utf-8') as f:
                sitemap_text = f.read()
        except Exception:
            return

        self.files_scanned += 1
        # Extract all <loc> URLs from sitemap
        sitemap_locs = set(re.findall(r'<loc>([^<]+)</loc>', sitemap_text))

        # Normalize: extract relative paths from sitemap URLs
        # e.g. "https://praxislibrary.com/learn/foo.html" -> "learn/foo.html"
        sitemap_paths = set()
        for loc in sitemap_locs:
            # Strip domain prefix
            path = re.sub(r'^https?://[^/]+/', '', loc)
            # Normalize trailing slash directories to index.html
            if not path or path.endswith('/'):
                idx_path = path + 'index.html'
                sitemap_paths.add(idx_path)
            sitemap_paths.add(path)

        # Check each non-fragment HTML page
        for rel_path in sorted(all_files):
            if rel_path in fragments:
                continue
            self.checks_run += 1
            if rel_path not in sitemap_paths:
                self.add(Severity.WARNING, rel_path, 0,
                         "Page not listed in sitemap.xml",
                         suggestion="Add this page to sitemap.xml for SEO discoverability")

    def _check_title_tags(self, fragments: Set[str]):
        """Check title tag presence and quality on all non-fragment pages."""
        re_title = re.compile(r'<title>([^<]*)</title>', re.I)
        for rel_path in self.loader.discover_html_files():
            if rel_path in fragments:
                continue
            text = self.loader.read_html_text(rel_path)
            self.checks_run += 1
            m = re_title.search(text)
            if not m:
                self.add(Severity.ERROR, rel_path, 0,
                         "Missing <title> tag",
                         suggestion="Add a descriptive title tag for SEO and accessibility")
            else:
                title = m.group(1).strip()
                if len(title) < 10:
                    self.add(Severity.WARNING, rel_path, 0,
                             f"Title tag too short ({len(title)} chars): {title}",
                             suggestion="Title tags should be 30-65 characters for optimal SEO")
                elif len(title) > 70:
                    self.add(Severity.WARNING, rel_path, 0,
                             f"Title tag too long ({len(title)} chars)",
                             suggestion="Title tags should be under 70 characters to avoid truncation in search results")


# ============================================================
# 11. DOCUMENTATION CHECKER — Validates .claude/ docs freshness
# ============================================================

class DocumentationChecker(AuditChecker):
    """Scans .claude/ documentation files for stale session references,
    outdated counts, and cross-references them against actual site state.
    Zero hardcoded values — counts derived from filesystem."""

    category = Category.DOCUMENTATION

    # Documents expected to exist with their key purpose
    REQUIRED_DOCS = {
        'HANDOFF.md': 'Current state and active tasks',
        'sourcingstandards.md': 'Citation and sourcing rules',
        'SITEMAP.md': 'Site map with navigation architecture',
        'MASTER-INVENTORY.md': 'Complete file inventory',
        'DOCUMENTATION-AUDIT.md': 'Documentation freshness audit',
    }

    REQUIRED_REFERENCE_DOCS = {
        'reference/SiteFrameworks.md': 'Architecture bible',
    }

    REQUIRED_PLANS = {
        'plans/FrameworkOverhaul.md': 'Master plan with all phases',
    }

    def _get_claude_dir(self) -> str:
        return os.path.join(self.loader.root_dir, '.claude')

    def _read_doc(self, rel_to_claude: str) -> str:
        """Read a doc file relative to .claude/ directory."""
        full = os.path.join(self._get_claude_dir(), rel_to_claude)
        try:
            with open(full, 'r', encoding='utf-8', errors='replace') as f:
                return f.read()
        except FileNotFoundError:
            return ""

    def _get_actual_counts(self) -> dict:
        """Derive actual site counts from filesystem."""
        counts = {}

        # Total HTML files
        counts['html_files'] = len(self.loader.discover_html_files())

        # Glossary terms from manifest
        manifest = self.loader.read_json('data/glossary/manifest.json')
        if manifest and isinstance(manifest, dict):
            counts['glossary_terms'] = manifest.get('totalTerms', 0)

        # Active tools (tools/*.html minus index, deactivated)
        tools_dir = os.path.join(self.loader.root_dir, 'tools')
        if os.path.isdir(tools_dir):
            all_tool_files = [f for f in os.listdir(tools_dir)
                              if f.endswith('.html') and f != 'index.html'
                              and f != 'index-main-content.html']
            # Check which ones are linked from footer
            index_content = self.loader.read_html_text('index.html')
            active = 0
            for tf in all_tool_files:
                if f'tools/{tf}' in index_content:
                    active += 1
            # Add quiz as a tool
            if os.path.isfile(os.path.join(self.loader.root_dir, 'quiz', 'index.html')):
                if 'quiz/index.html' in index_content or 'quiz/' in index_content:
                    active += 1
            counts['active_tools'] = active

        # CSS line count
        css_path = os.path.join(self.loader.root_dir, 'styles.css')
        if os.path.isfile(css_path):
            with open(css_path, 'r', encoding='utf-8', errors='replace') as f:
                counts['css_lines'] = sum(1 for _ in f)

        # JS line count
        js_path = os.path.join(self.loader.root_dir, 'app.js')
        if os.path.isfile(js_path):
            with open(js_path, 'r', encoding='utf-8', errors='replace') as f:
                counts['js_lines'] = sum(1 for _ in f)

        # Framework count (learn/*.html minus hubs — detected dynamically)
        learn_dir = os.path.join(self.loader.root_dir, 'learn')
        if os.path.isdir(learn_dir):
            # Detect hubs dynamically: index.html + any file with FRAMEWORK GRID
            hub_files = {'index.html'}
            for f in os.listdir(learn_dir):
                if f.endswith('.html') and f != 'index.html':
                    fpath = os.path.join(learn_dir, f)
                    try:
                        with open(fpath, 'r', encoding='utf-8', errors='replace') as fh:
                            if 'FRAMEWORK GRID' in fh.read():
                                hub_files.add(f)
                    except OSError:
                        pass
            text_fw = sum(1 for f in os.listdir(learn_dir)
                         if f.endswith('.html') and f not in hub_files)
            # Modality frameworks (exclude index.html hub pages)
            mod_dir = os.path.join(learn_dir, 'modality')
            mod_fw = 0
            if os.path.isdir(mod_dir):
                for sub in os.listdir(mod_dir):
                    sub_path = os.path.join(mod_dir, sub)
                    if os.path.isdir(sub_path):
                        mod_fw += sum(1 for f in os.listdir(sub_path)
                                      if f.endswith('.html') and f != 'index.html')
            counts['total_frameworks'] = text_fw + mod_fw
            counts['text_frameworks'] = text_fw
            counts['modality_frameworks'] = mod_fw

        return counts

    def _check_number_in_doc(self, doc_name: str, content: str,
                             pattern: str, fact_key: str,
                             actual: int, description: str):
        """Search doc content for a number pattern and flag mismatches."""
        for m in re.finditer(pattern, content):
            claimed = int(m.group(1).replace(',', ''))
            self.checks_run += 1
            # Allow a tolerance of 0 — exact match required
            if claimed != actual:
                # Find approximate line number
                line_num = content[:m.start()].count('\n') + 1
                self.add(Severity.WARNING,
                         f".claude/{doc_name}", line_num,
                         f"{description}: claims {claimed:,} but actual is {actual:,}",
                         context=content[m.start():m.start()+80].strip(),
                         suggestion=f"Update to {actual:,}")

    def run(self) -> AuditResult:
        claude_dir = self._get_claude_dir()
        if not os.path.isdir(claude_dir):
            self.add(Severity.ERROR, ".claude/", 0,
                     ".claude/ directory not found",
                     suggestion="Create .claude/ directory with project documentation")
            return self._result()

        # --- Check required docs exist ---
        all_required = {}
        all_required.update(self.REQUIRED_DOCS)
        all_required.update(self.REQUIRED_REFERENCE_DOCS)
        all_required.update(self.REQUIRED_PLANS)

        for rel_path, purpose in all_required.items():
            full = os.path.join(claude_dir, rel_path)
            self.checks_run += 1
            if not os.path.isfile(full):
                self.add(Severity.ERROR, f".claude/{rel_path}", 0,
                         f"Required document missing: {purpose}",
                         suggestion=f"Create .claude/{rel_path}")
            else:
                self.files_scanned += 1

        # --- Cross-reference counts in key docs ---
        actual = self._get_actual_counts()

        # Check HANDOFF.md counts
        handoff = self._read_doc('HANDOFF.md')
        if handoff:
            if 'html_files' in actual:
                self._check_number_in_doc(
                    'HANDOFF.md', handoff,
                    r'(\d+)\s+HTML\s+files', 'html_files',
                    actual['html_files'], 'HTML file count')
            if 'glossary_terms' in actual:
                self._check_number_in_doc(
                    'HANDOFF.md', handoff,
                    r'([\d,]+)\s+glossary\s+terms', 'glossary_terms',
                    actual['glossary_terms'], 'Glossary term count')
                self._check_number_in_doc(
                    'HANDOFF.md', handoff,
                    r'([\d,]+)\s+total\s+terms', 'glossary_terms',
                    actual['glossary_terms'], 'Glossary term count')
            if 'active_tools' in actual:
                self._check_number_in_doc(
                    'HANDOFF.md', handoff,
                    r'(\d+)\s+interactive\s+tools', 'active_tools',
                    actual['active_tools'], 'Interactive tools count')
            if 'total_frameworks' in actual:
                self._check_number_in_doc(
                    'HANDOFF.md', handoff,
                    r'(\d+)\s+technique\s+pages', 'total_frameworks',
                    actual['total_frameworks'], 'Technique page count')
            if 'text_frameworks' in actual:
                self._check_number_in_doc(
                    'HANDOFF.md', handoff,
                    r'(\d+)\s+text\b', 'text_frameworks',
                    actual['text_frameworks'], 'Text technique count')
            if 'modality_frameworks' in actual:
                self._check_number_in_doc(
                    'HANDOFF.md', handoff,
                    r'(\d+)\s+modality\b', 'modality_frameworks',
                    actual['modality_frameworks'], 'Modality technique count')

        # Check SiteFrameworks.md counts
        sf = self._read_doc('reference/SiteFrameworks.md')
        if sf:
            if 'css_lines' in actual:
                self._check_number_in_doc(
                    'reference/SiteFrameworks.md', sf,
                    r'styles\.css\s*\(([\d,]+)\s+lines', 'css_lines',
                    actual['css_lines'], 'CSS line count')
            if 'js_lines' in actual:
                self._check_number_in_doc(
                    'reference/SiteFrameworks.md', sf,
                    r'app\.js\s*\(([\d,]+)\s+lines', 'js_lines',
                    actual['js_lines'], 'JS line count')
            if 'html_files' in actual:
                self._check_number_in_doc(
                    'reference/SiteFrameworks.md', sf,
                    r'Total\s+HTML\s+on\s+disk[:\s]*\**(\d+)\**', 'html_files',
                    actual['html_files'], 'Total HTML count in file structure')

        # Check MASTER-INVENTORY.md counts
        mi = self._read_doc('MASTER-INVENTORY.md')
        if mi:
            if 'html_files' in actual:
                self._check_number_in_doc(
                    'MASTER-INVENTORY.md', mi,
                    r'Total\s+HTML\s+files\s*\*?\*?\s*\|\s*\*?\*?(\d+)', 'html_files',
                    actual['html_files'], 'HTML file count')
            if 'glossary_terms' in actual:
                self._check_number_in_doc(
                    'MASTER-INVENTORY.md', mi,
                    r'Glossary\s+terms\s*\*?\*?\s*\|\s*\*?\*?([\d,]+)', 'glossary_terms',
                    actual['glossary_terms'], 'Glossary term count')

        # --- Check for stale session references ---
        # Find the most recent session number mentioned across all docs
        max_session = 0
        for rel_path in all_required:
            content = self._read_doc(rel_path)
            if content:
                sessions = re.findall(r'[Ss]ession\s+(\d+)', content)
                for s in sessions:
                    snum = int(s)
                    if snum > max_session:
                        max_session = snum

        # Flag docs that haven't been updated within 3 sessions of the latest
        if max_session > 0:
            for rel_path, purpose in all_required.items():
                content = self._read_doc(rel_path)
                if not content:
                    continue
                self.checks_run += 1

                # Find the highest session number in this specific doc
                sessions = re.findall(r'[Ss]ession\s+(\d+)', content)
                if sessions:
                    doc_max = max(int(s) for s in sessions)
                    if doc_max < max_session - 5:
                        self.add(Severity.WARNING,
                                 f".claude/{rel_path}", 0,
                                 f"Possibly stale: latest session reference is {doc_max}, "
                                 f"current is {max_session} (gap of {max_session - doc_max} sessions)",
                                 suggestion=f"Review and update to reflect session {max_session} state")
                else:
                    # No session references at all
                    self.add(Severity.INFO,
                             f".claude/{rel_path}", 0,
                             f"No session references found in document ({purpose})")

        return self._result()


# ============================================================
# AUDIT RUNNER — Orchestrator
# ============================================================

CATEGORY_MAP = {
    'security': SecurityChecker,
    'continuity': ContinuityChecker,
    'broken-links': BrokenLinksChecker,
    'relevancy': RelevancyChecker,
    'accuracy': AccuracyChecker,
    'bias-inclusivity': BiasInclusivityChecker,
    'accessibility': AccessibilityChecker,
    'citation-accuracy': CitationChecker,
    'data-accuracy': DataAccuracyChecker,
    'structural': StructuralChecker,
    'documentation': DocumentationChecker,
}


class AuditRunner:
    def __init__(self, root_dir: str, check_urls: bool = False,
                 verbose: bool = False, category_filter: str = None):
        self.root_dir = os.path.abspath(root_dir)
        self.check_urls = check_urls
        self.verbose = verbose
        self.category_filter = category_filter
        self.loader = FileLoader(self.root_dir)
        self.resolver = PathResolver(self.root_dir)
        self.discovery = SiteDiscovery(self.loader)
        self.config = {'check_urls': check_urls}
        self.results: List[AuditResult] = []
        self.duration = 0.0

    def run(self) -> List[AuditResult]:
        start = time.time()

        files = self.loader.discover_html_files()
        if self.verbose:
            print(f"Discovered {len(files)} HTML files")

        # Auto-discovery report
        summary = self.discovery.summary()
        if self.verbose:
            print(f"  Glossary terms: {summary['glossary_terms']:,}")
            print(f"  Active tools: {summary['active_tools']} ({', '.join(summary['active_tool_names'])})")
            print(f"  Deactivated tools: {len(summary['deactivated_tools'])}")
            print(f"  Policy pages: {len(summary['policy_pages'])}")
            print(f"  Fragment files: {len(summary['fragment_files'])}")
            print()

        # Determine checkers
        if self.category_filter:
            checker_cls = CATEGORY_MAP.get(self.category_filter)
            if checker_cls:
                checkers = [checker_cls(self.loader, self.resolver, self.discovery, self.config)]
            else:
                print(f"Unknown category: {self.category_filter}")
                sys.exit(1)
        else:
            checkers = [
                cls(self.loader, self.resolver, self.discovery, self.config)
                for cls in CATEGORY_MAP.values()
            ]

        for checker in checkers:
            cat_name = checker.category.value
            if self.verbose:
                print(f"  Running {cat_name}...", end=" ", flush=True)

            cat_start = time.time()
            result = checker.run()
            cat_time = time.time() - cat_start

            if self.verbose:
                status = "PASS" if result.passed else "FAIL"
                print(f"{status} ({result.error_count}E/{result.warning_count}W/{result.info_count}I) [{cat_time:.1f}s]")

            self.results.append(result)

        self.duration = time.time() - start

        if self.verbose:
            print(f"\nAudit completed in {self.duration:.1f}s")

        return self.results


# ============================================================
# REPORT GENERATOR
# ============================================================

CATEGORY_CHECKS = {
    Category.SECURITY: {
        "description": "CSP A+ compliance — ensures zero inline code, no external resource dependencies, and no dangerous JavaScript patterns.",
        "why": "Content Security Policy (CSP) A+ rating requires strict separation of markup, styles, and scripts. Inline code enables cross-site scripting (XSS) attacks. External CDN dependencies create supply-chain risk and single points of failure. Dangerous JS patterns like `eval()` and `document.write()` bypass CSP and enable code injection. This category enforces the OWASP-recommended defense-in-depth strategy.",
        "how": "Line-by-line regex scan of every HTML file with multi-line comment tracking (both `<!-- -->` HTML comments and `/* */` JS block comments are skipped). Inline styles detected via `style=\"` attribute pattern. Event handlers detected via 40+ `on*=` patterns spanning mouse, keyboard, touch, drag, pointer, clipboard, animation, and transition events. Inline scripts detected by `<script>` tags lacking a `src` attribute (JSON-LD exempted). CDN references caught by domain pattern matching against known CDN hosts. External link security verified by checking `rel` attributes on `target=\"_blank\"` links. Additionally, `app.js` is scanned for dangerous JS patterns: `eval()`, `new Function()`, `document.write()`, and string arguments to `setTimeout`/`setInterval`.",
        "checks": [
            ("Inline style attributes", "ERROR", "Scans every line for `style=\"...\"` attributes (violates Content Security Policy). Skips HTML comments."),
            ("Inline event handlers", "ERROR", "Detects 40+ inline JS handlers: mouse, keyboard, touch, drag, pointer, clipboard, animation/transition, and misc events. Skips HTML comments."),
            ("Inline script blocks", "ERROR", "Finds `<script>` tags without a `src` attribute (inline JS execution). Exempts `type=\"application/ld+json\"` (JSON-LD structured data)."),
            ("External CDN references", "ERROR", "Catches `href`/`src` pointing to googleapis, cdnjs, unpkg, jsdelivr, cloudflare, etc."),
            ("External link security", "WARNING", "Flags `target=\"_blank\"` links missing `rel=\"noopener noreferrer\"`"),
            ("Dangerous JS patterns (app.js)", "ERROR", "Scans app.js for `eval()`, `new Function()`, `document.write()`, and string args to `setTimeout`/`setInterval`. Skips JS comments."),
        ]
    },
    Category.CONTINUITY: {
        "description": "Template consistency — verifies every page has the required structural, SEO, navigation, breadcrumb, and ethics elements.",
        "why": "Every page must function as a standalone entry point. Missing meta tags degrade SEO and social sharing. Missing navigation traps users. Missing accessibility infrastructure (skip links, ADL panel) violates WCAG AA. Missing ethics components (ticker, policy links) breach the site's responsible AI commitment. Missing breadcrumbs break wayfinding on interior pages. This category ensures no page ships incomplete.",
        "how": "Each HTML file is scanned for required elements using targeted string/regex matching. Structural checks look for specific tags (`<html lang=`, `<meta charset=`, `<header>`, `<main>`, `<footer>`). SEO checks verify `<link rel=\"canonical\">`, Open Graph meta tags, JSON-LD blocks, and the SEO injection marker. Navigation checks confirm both mega-menu variants (Discover categories and Resources/AI Readiness multi-column). The `app.js` check verifies both presence AND the `defer` attribute. Breadcrumb navigation checked on all pages except root index.html. Ethics checks verify both the JS IIFE (in app.js) and CSS rules (in styles.css) exist for the ethics ticker. Footer completeness verified by checking for policy and tool link hrefs within a 3000-char search window.",
        "checks": [
            ("HTML lang attribute", "ERROR", "Every page must have `<html lang=\"en\">`"),
            ("Meta charset", "ERROR", "Every page must declare `<meta charset=\"UTF-8\">`"),
            ("Viewport meta tag", "ERROR", "Every page must have a responsive viewport meta tag"),
            ("Meta description", "WARNING", "Every page should have a `<meta name=\"description\">` tag"),
            ("Favicon link", "WARNING", "Every page should link to the site favicon"),
            ("Stylesheet link", "ERROR", "Every page must link to `styles.css`"),
            ("App script with defer", "ERROR", "Every page must include `app.js` with the `defer` attribute"),
            ("Skip-to-content link", "ERROR", "Accessibility requirement: skip-link for keyboard users"),
            ("Header element", "ERROR", "Every page must have a `<header>` with site navigation"),
            ("Main content", "ERROR", "Every page must have `<main id=\"main-content\">`"),
            ("Footer element", "ERROR", "Every page must have a `<footer>` section"),
            ("Back-to-top button", "WARNING", "Every page should have the back-to-top bar"),
            ("ADL panel", "WARNING", "Every page should include the Accessibility Dashboard panel"),
            ("Badge lightbox", "WARNING", "Every page should include the badge lightbox component"),
            ("SEO meta block", "ERROR", "Every page must have `<!-- SEO Meta -->` marker (from seo_inject.py)"),
            ("Canonical URL", "ERROR", "Every page must have a `<link rel=\"canonical\">` tag"),
            ("Open Graph tags", "ERROR", "Every page must have og:title, og:description, og:image, and og:url"),
            ("JSON-LD structured data", "ERROR", "Every page must have `application/ld+json` schema markup"),
            ("Twitter/X card", "WARNING", "Every page should have a twitter:card meta tag"),
            ("Discover navigation menu", "ERROR", "Every page must have the Discover category menu (mega-menu--categories)"),
            ("Resources/AI Readiness menu", "ERROR", "Every page must have the multi-column menu (mega-menu--multi-column)"),
            ("Breadcrumb navigation", "WARNING", "All interior pages (not root index.html) must have breadcrumb navigation for wayfinding"),
            ("Ethics ticker (app.js)", "ERROR", "app.js must contain the ethics-ticker IIFE that creates the ticker DOM"),
            ("Ethics ticker (styles.css)", "ERROR", "styles.css must contain .ethics-ticker style rules"),
            ("Policy links in footer", "ERROR", "Footer must link to all active policy pages"),
            ("Tool links in footer", "ERROR", "Footer must link to all active AI Readiness Tools"),
        ]
    },
    Category.BROKEN_LINKS: {
        "description": "Link integrity — resolves every internal href/src path and verifies external `<a>` tag URLs are reachable.",
        "why": "Broken links degrade user trust and SEO ranking. Internal dead links indicate deleted or renamed files that weren't updated site-wide. External dead links point users to unavailable resources. Google Search Console penalizes sites with excessive 404 responses. This category ensures every link on every page resolves to a real destination.",
        "how": "Internal links: extracts all `href` and `src` attributes from every HTML file line-by-line, resolves relative paths from each file's directory depth (root, ../, ../../, ../../../), and checks against the filesystem. Directory links are resolved to `index.html`. Fragment-only (#), mailto:, tel:, javascript:, and data: URIs are skipped. External links: collected via a separate full-text regex pass that specifically matches `<a>` tags with external `href` values (multi-line safe, won't match `<link>`, `<meta>`, or SEO tags). Each unique external URL receives an HTTP HEAD request (15s timeout) with GET fallback on 403/405. Bot-blocked domains emit INFO with manual-verify note instead of ERROR.",
        "checks": [
            ("Internal link resolution", "ERROR", "Resolves each `href`/`src` relative to the file's directory depth and checks if the target file exists. Directory links resolved to index.html."),
            ("External URL reachability", "WARNING", "HTTP HEAD/GET check for each unique external URL in `<a>` tags only (multi-line safe regex). Skip with `--skip-urls`."),
            ("Bot-blocked domain handling", "INFO", "Known bot-blocked domains (LinkedIn, arXiv, OpenAI, etc.) get INFO instead of HTTP check — manual verification recommended."),
            ("Special URI skipping", "INFO", "Skips `#`, `mailto:`, `tel:`, `javascript:`, and `data:` URIs — not checkable links."),
        ]
    },
    Category.RELEVANCY: {
        "description": "Content freshness — detects placeholder content and outdated dates with multi-line comment awareness.",
        "why": "Placeholder text ('TODO', 'coming soon', 'lorem ipsum', 'WIP', 'HACK') in production signals incomplete work and damages credibility. Outdated date references outside of known historical contexts may mislead users about data currency. This category enforces content readiness standards. (Orphan file detection is handled by the Structural category to avoid duplication.)",
        "how": "Multi-line HTML comment tracking skips all content inside `<!-- ... -->` blocks (including across line boundaries). Placeholder detection uses case-insensitive regex for 9 common markers (TODO, TBD, FIXME, lorem ipsum, coming soon, WIP, HACK, XXX, TEMP) plus bare 'placeholder' (excluding HTML `placeholder=` attributes). Date scanning matches 4-digit year patterns (2000\u20132023) using context-aware detection: exempts URLs, `data-added` attributes, and bare `<td>` year cells. Historical context identified by keyword regex (founded, published, released, launched, introduced, born, conference names like NeurIPS/ICLR, copyright, et al., Framework Context, etc.). Component context tracked via nesting depth \u2014 dates inside known educational components (technique-demo, comparison-panel, highlight-box, benchmark-stat, element-timeline, model-timeline, poem-author) are automatically exempted regardless of nesting depth. No directory-level exemptions \u2014 all pages are scanned equally.",
        "checks": [
            ("Placeholder content", "WARNING", "Detects 'coming soon', 'TODO', 'TBD', 'FIXME', 'lorem ipsum', 'WIP', 'HACK', 'XXX', 'TEMP', and bare 'placeholder' in visible text. Skips multi-line HTML comments."),
            ("Outdated dates", "INFO", "Flags years 2000\u20132023 in content (context-aware: exempts historical keywords, academic citations, date-safe components, and educational examples \u2014 no directory-level exemptions). Skips multi-line HTML comments."),
        ]
    },
    Category.ACCURACY: {
        "description": "Content and cross-reference accuracy — validates page structure, component integrity, counters, search index, and glossary synchronization across all pages.",
        "why": "Stale counters and broken component structures undermine user trust in a site that teaches AI accuracy. Glossary desynchronization between the manifest and displayed counts creates visible contradictions. Missing template sections on framework pages break the consistent learning experience. An empty or malformed search index makes site search non-functional. This category ensures what users see matches what actually exists.",
        "how": "Glossary integrity verified by parsing `manifest.json`, summing all per-letter shard counts, and comparing against the declared total. Each shard JSON is loaded and its term count compared to the manifest declaration. Search index validated for type (must be array), non-emptiness, and required fields (title/url) on every entry. Homepage `data-counter` attributes extracted via regex and compared against auto-discovered tool count, glossary terms, AND framework page count. Framework template completeness checked by scanning each learn/ page for required section markers (hero, concept, how-it-works, comparison, examples, when-to-use, use-cases, related, CTA). Component structure validated by checking parent-child element relationships in comparison panels. Deprecated class detection skips multi-line HTML comments to avoid false positives. Footer tool count uses div-nesting-depth tracking for robust section boundary detection.",
        "checks": [
            ("HTML file count", "INFO", "Reports total HTML files discovered in the site"),
            ("Glossary manifest integrity", "ERROR", "Verifies `manifest.json` totalTerms matches the sum of all per-letter shard counts"),
            ("Shard count verification", "ERROR", "Checks each letter shard's actual term count against the manifest's declared count"),
            ("Search index validation", "ERROR/WARNING", "Validates `search-index.json` exists, is a non-empty JSON array, and every entry has title + url fields"),
            ("Homepage counter values", "WARNING", "Validates `data-counter` attributes on index.html against actual tool count, glossary terms, AND framework page count"),
            ("Glossary page count sync", "WARNING", "Verifies the glossary term count appears consistently across `pages/glossary.html` (3+ locations)"),
            ("Comparison panel structure", "WARNING", "Every comparison-panel must contain a comparison-panel__divider element"),
            ("Deprecated component classes", "WARNING", "Flags old feature-list--check/--cross format (skips HTML comments) — should use feature-list__item--positive/--neutral cards"),
            ("Framework template completeness", "WARNING", "Learn pages must have required sections: hero, concept, how-it-works, comparison, examples, when-to-use, use-cases, related, CTA"),
            ("Footer tool count consistency", "WARNING", "Footer AI Readiness section tool count must match discovered active tools on every page (div-depth-aware section parsing)"),
        ]
    },
    Category.BIAS: {
        "description": "Content quality — loads terms from `bias-terms.json` and scans visible text only (HTML tags stripped) for bias, profanity, and slurs.",
        "why": "An AI education site must model the inclusive communication standards it teaches. We maintain this term list not because these words are inherently wrong, but because language shapes perception. As a site with a neurodivergent audience, Praxis has a responsibility to surface terms that major industry style guides (Google, Microsoft, Apple, APA) have identified as carrying exclusionary, gendered, or ableist connotations. Profanity and slurs have zero tolerance on an educational site. The audit flags bias terms for human review (INFO) and profanity/slurs as best-practice violations (WARNING).",
        "how": "Terms loaded at runtime from `bias-terms.json` (alongside this script) — editable without touching Python code. Each entry has a category, suggestion, and optional severity (defaults to INFO). HTML tags are stripped from each line before pattern matching, so class names and attributes never trigger false positives. Case-insensitive regex matching with word boundaries. Comment entries (with `_comment` key) are skipped. If the JSON file is missing or malformed, a WARNING is emitted and checks are skipped gracefully.",
        "checks": [
            ("Exclusionary framing", "INFO", "Detects condescending or audience-excluding phrasing"),
            ("Gendered language", "INFO", "Flags gendered terms — suggests gender-neutral alternatives"),
            ("Tech exclusionary terms", "INFO", "Flags legacy tech terms with exclusionary origins"),
            ("Ableist language", "INFO", "Catches disability-metaphor terms — suggests neutral alternatives"),
            ("Profanity", "WARNING", "Catches profanity and informal abbreviations (wtf, stfu, etc.)"),
            ("Slurs", "WARNING", "Zero-tolerance detection of racial, homophobic, and ableist slurs"),
        ]
    },
    Category.ACCESSIBILITY: {
        "description": "WCAG AA compliance — checks language declarations, image alt text, heading hierarchy, link clarity, form labels, and tab order.",
        "why": "Web Content Accessibility Guidelines (WCAG) 2.1 Level AA compliance is both a legal requirement (ADA, Section 508) and a core site value. Missing `lang` attributes prevent screen readers from selecting the correct speech synthesizer. Missing `alt` attributes make images invisible to blind users. Skipped heading levels break document outline navigation. Vague link text ('click here') is meaningless to screen reader users who navigate by link list. Unlabelled form inputs are unusable without sight. Positive tabindex values create unpredictable tab order. This category verifies foundational accessibility requirements.",
        "how": "HTML lang attribute checked via `<html` tag inspection on every file. Image alt attributes verified using a multi-line-safe full-text regex (`re.DOTALL`) that captures entire `<img>` tags even when attributes span multiple lines; empty alt (`alt=\"\"`) noted as INFO. Heading hierarchy validated by extracting all h1-h6 tags in document order, tracking level progression, and flagging any jump > 1 level; nav/footer headings excluded. h1 presence verified separately (0 h1 = WARNING). Vague link text detected by matching common non-descriptive patterns ('click here', 'read more', 'learn more', bare 'here'/'link') inside `<a>` tags. Form label association checked by collecting all `<label for>` targets, then verifying each `<input>`/`<select>`/`<textarea>` has a matching label, `aria-label`/`aria-labelledby`, or wrapping `<label>` (skips hidden/submit/button/reset/image inputs). Positive tabindex detected via regex — values > 0 flagged as anti-pattern.",
        "checks": [
            ("HTML lang attribute", "ERROR", "Every page must declare a language on `<html>`"),
            ("Image alt attributes", "ERROR", "Every `<img>` must have an `alt` attribute. Multi-line safe (full-text regex with re.DOTALL). Empty alt for decorative images noted as INFO."),
            ("Heading hierarchy", "WARNING", "Headings must not skip levels (e.g., h1 \u2192 h3 without h2); nav/footer headings excluded from hierarchy checks"),
            ("h1 presence", "WARNING", "Every page must have exactly one `<h1>` element for accessibility and SEO"),
            ("Vague link text", "WARNING", "Links must have descriptive text \u2014 flags 'click here', 'read more', 'learn more', bare 'here'/'link'"),
            ("Form label association", "WARNING", "Every `<input>`, `<select>`, and `<textarea>` must have an associated `<label for>`, `aria-label`/`aria-labelledby`, or be wrapped in a `<label>`. Skips hidden/submit/button/reset/image types."),
            ("Positive tabindex", "WARNING", "Flags `tabindex` values > 0 \u2014 overrides natural DOM tab order and creates unpredictable navigation"),
        ]
    },
    Category.CITATION: {
        "description": "Source attribution and freshness — counts .gov/.edu citations, verifies sources, and enforces the 2024+ freshness policy.",
        "why": "An AI education site must cite authoritative, current sources. The project's sourcing policy requires .gov and .edu domains only (except benchmark pages). Citations older than 2024 are ERROR-level violations because AI research evolves rapidly and outdated data misleads users. Every statistic displayed in highlight boxes or stat cards must have visible source attribution. Citation tracking (`data-added` attributes) enables ongoing freshness auditing. This category enforces the full sourcing standards defined in `.claude/sourcingstandards.md`.",
        "how": "Citations extracted by finding `<a>` tags with .gov or .edu domains in their `href` (scoped to anchor tags via multi-line-safe regex to avoid false positives on `<link>` and `<meta>` elements). Each URL receives an HTTP HEAD request; non-200 responses are flagged as errors. Bot-blocked .gov/.edu domains (NIST, MIT Press, CMU) emit INFO with manual verification notes. Freshness enforced using a full-text regex (`RE_CITATION_LINK` with `re.DOTALL`) that extracts complete `<a>...</a>` blocks even when tags span multiple lines; year detection via URL path patterns and stripped anchor text. `data-added` attribute checked within each `<a>` tag (not the whole line) to avoid false negatives when multiple links share a line. Highlight boxes and stat cards checked for the presence of a source child element when they contain statistical content (%, $, billion/million). Framework pages (learn/) and tool pages exempted per the no-citations policy.",
        "checks": [
            (".gov/.edu citation status", "INFO", "Reports per-page .gov/.edu link count with verification status (verified by default, skip with --skip-urls)"),
            ("Highlight box attribution", "WARNING", "Content-page highlight boxes with specific stats (%, $, numeric billion/million) must have a `highlight-box__source` element. Skips learn/ (no-citations rule) and tools/ (example content). Skips historical-context (--warning) boxes."),
            ("Stat card attribution", "WARNING", "Research stat cards must have a `research-stat-card__source` element"),
            ("Citation freshness (STRICT)", "ERROR", "All external citations on content pages must be from 2024 or later. Multi-line safe (full-text regex). Detects dates in URL paths, stripped anchor text, and nearby highlight-box__source context. Skips learn/, tools/, foundations/."),
            ("Citation timestamp tracking", "WARNING", "External links on citation pages must have `data-added=\"YYYY-MM-DD\"` within the `<a>` tag itself (tag-scoped, not line-scoped)."),
            ("Citation URL reachability", "ERROR", "HTTP HEAD/GET check for each .gov/.edu URL. Bot-blocked .gov/.edu domains (NIST, MIT Press, CMU) get INFO instead. Skip with `--skip-urls`."),
        ]
    },
    Category.DATA_ACCURACY: {
        "description": "Data integrity — validates JSON files, chart values, anchor targets, glossary fields, search index entries, and count synchronization across all pages.",
        "why": "Corrupted JSON crashes the glossary, search, and chart systems at runtime. Mismatched gauge chart values display contradictory numbers. Broken anchor targets (#id links pointing to nonexistent elements) frustrate users. Missing glossary fields cause JavaScript errors during rendering. Invalid search index entries send users to 404 pages. This category ensures all structured data is parseable, internally consistent, and correctly linked.",
        "how": "Bar chart `data-width` values validated per-line against 0\u2013100 range (percentage). Gauge charts checked positionally: a full-text regex (`re.DOTALL`) captures each `<div class=\"gauge-circle\" data-value=\"N\">...</div>` block and extracts the `gauge-value` text inside it, then compares the numeric portion to the `data-value` attribute \u2014 no global matching. JSON integrity verified by attempting `json.load()` on every file in `data/`; parse failures are errors. Glossary counts cross-referenced between `index.html` and `pages/glossary.html` by regex-matching numeric patterns near glossary keywords. Anchor targets validated by collecting all `href=\"#id\"` links and checking for matching `id=` attributes on the same page. Glossary shards validated for required fields (`term`, `definition`) on every entry. Search index entries validated for `title` and `url` fields, with URL resolution against the filesystem.",
        "checks": [
            ("Bar chart data-width range", "WARNING", "Validates `data-width` values are 0\u2013100 (valid percentage range)"),
            ("Gauge chart value matching", "WARNING", "Positional: each gauge-circle's `data-value` must match the `gauge-value` text inside its own `<div>` block (multi-line safe)"),
            ("Glossary count synchronization", "WARNING", "Checks glossary term count appears consistently in both `index.html` (2+) and `pages/glossary.html` (3+)"),
            ("JSON data file integrity", "ERROR", "All .json files in data/ must parse without error"),
            ("Same-page anchor targets", "WARNING", "Fragment-only links (href=\"#id\") must have a matching id attribute on the same page"),
            ("Glossary shard field validation", "ERROR", "Each glossary term must have required fields: term, definition"),
            ("Search index entry validation", "ERROR", "Each search-index.json entry must have title and url fields, and url must resolve to an existing file"),
        ]
    },
    Category.STRUCTURAL: {
        "description": "Site architecture — detects orphan files, duplicate IDs, meta description quality, deactivated tool links, sitemap coverage, and title tag quality.",
        "why": "Orphan pages are invisible to users and waste hosting resources. Duplicate HTML IDs cause unpredictable behavior in JavaScript and assistive technology. Short meta descriptions reduce click-through rates in search results. Links to deactivated tools send users to dead pages. Missing sitemap entries prevent search engine indexing. Poor title tags hurt both SEO ranking and browser tab readability. This category validates the structural integrity of the site as a whole.",
        "how": "Orphan detection builds a link graph across all pages and identifies files with zero inbound references (directory links resolved to index.html). Duplicate IDs detected by collecting all `id=` attributes per page and flagging any value appearing more than once. Meta descriptions extracted via regex and measured by character length (below 50 chars = warning). Title tags checked for presence and optimal length (30-65 characters). Sitemap coverage verified by parsing `sitemap.xml` URLs and comparing against discovered HTML files. Deactivated tool links detected by cross-referencing `href` values against known deactivated tool paths. Fragment files (lacking `<!DOCTYPE` or `<html>`) reported as non-page includes.",
        "checks": [
            ("Orphan file detection", "WARNING", "Identifies HTML files not linked from any other page (resolves directory links to index.html, excludes fragments)"),
            ("Duplicate ID detection", "WARNING", "Finds multiple elements with the same `id` attribute within a single page"),
            ("Meta description quality", "WARNING", "Flags meta descriptions shorter than 50 characters"),
            ("Title tag quality", "ERROR/WARNING", "Verifies every page has a `<title>` tag with appropriate length (30-65 chars optimal)"),
            ("Sitemap coverage", "WARNING", "Verifies every non-fragment HTML page is listed in `sitemap.xml`"),
            ("Deactivated tool links", "ERROR", "Ensures active pages don't link to deactivated tools"),
            ("Fragment file reporting", "INFO", "Identifies files without DOCTYPE/html (partial templates, not full pages)"),
            ("Deactivated tool tracking", "INFO", "Reports tool files that exist but are not linked from the footer"),
        ]
    },
    Category.DOCUMENTATION: {
        "description": "Documentation freshness — validates .claude/ docs exist, cross-references claimed counts against filesystem, and detects stale session references.",
        "why": "Project documentation that contradicts the actual codebase causes confusion during development. Missing critical docs (HANDOFF.md, sourcing standards) break the project's session continuity model. Stale session references indicate documents that haven't been reviewed recently, increasing the risk of acting on outdated information. This category treats documentation as auditable infrastructure, not optional artifacts.",
        "how": "Required document existence verified by checking for specific files in `.claude/` (HANDOFF.md, sourcingstandards.md, SiteFrameworks.md, FrameworkOverhaul.md). Count accuracy checked by extracting numeric claims from each document (HTML file count, glossary term count, CSS/JS line counts, technique counts, tool count) and comparing against auto-discovered filesystem values. Hub pages detected dynamically by scanning for FRAMEWORK GRID markers — no hardcoded list. Session reference staleness determined by finding the highest session number mentioned across all `.claude/` documents, then flagging any document whose latest session reference is more than 5 behind the maximum.",
        "checks": [
            ("Required docs exist", "ERROR", "Verifies critical project docs (HANDOFF.md, sourcingstandards.md, SiteFrameworks.md, FrameworkOverhaul.md) exist in .claude/"),
            ("HANDOFF.md count accuracy", "WARNING", "Cross-references HTML file count, glossary terms, interactive tools, and technique counts (total/text/modality) against filesystem"),
            ("SiteFrameworks.md count accuracy", "WARNING", "Cross-references CSS/JS line counts and total HTML count against actual files"),
            ("MASTER-INVENTORY.md count accuracy", "WARNING", "Cross-references HTML file count and glossary term count against actual filesystem"),
            ("Stale session references", "WARNING", "Flags docs whose latest session reference is more than 5 sessions behind the most recent"),
        ]
    },
}


class ReportGenerator:
    def __init__(self, results: List[AuditResult], discovery: SiteDiscovery,
                 root_dir: str, duration: float, check_urls: bool = False,
                 category_filter: str = None):
        self.results = results
        self.discovery = discovery
        self.root_dir = root_dir
        self.duration = duration
        self.check_urls = check_urls
        self.category_filter = category_filter

    @staticmethod
    def _aligned_table(headers: list, rows: list, alignments: list = None) -> list:
        """Build a column-aligned markdown table.

        The last column is never right-padded — this prevents extremely wide
        tables when the final column contains long text (e.g. descriptions).

        Args:
            headers: list of header strings
            rows: list of tuples/lists matching header count
            alignments: list of 'l' or 'r' per column (default all left)

        Returns:
            list of formatted table lines
        """
        col_count = len(headers)
        if alignments is None:
            alignments = ['l'] * col_count

        # Compute max width per column
        widths = [len(h) for h in headers]
        for row in rows:
            for i, cell in enumerate(row):
                widths[i] = max(widths[i], len(str(cell)))

        last = col_count - 1

        # Build header line
        parts = []
        hdr_cells = []
        sep_cells = []
        for i, h in enumerate(headers):
            w = widths[i]
            if i == last:
                # Last column: minimal separator, no padding
                hdr_cells.append(f" {h} ")
                sep_cells.append("-" * (len(h) + 2))
            elif alignments[i] == 'r':
                hdr_cells.append(f" {h:>{w}} ")
                sep_cells.append("-" * (w + 2))
            else:
                hdr_cells.append(f" {h:<{w}} ")
                sep_cells.append("-" * (w + 2))
        parts.append("|" + "|".join(hdr_cells) + "|")
        parts.append("|" + "|".join(sep_cells) + "|")

        # Build data rows
        for row in rows:
            row_cells = []
            for i, cell in enumerate(row):
                s = str(cell)
                if i == last:
                    # Last column: no right-padding
                    row_cells.append(f" {s} ")
                elif alignments[i] == 'r':
                    w = widths[i]
                    row_cells.append(f" {s:>{w}} ")
                else:
                    w = widths[i]
                    row_cells.append(f" {s:<{w}} ")
            parts.append("|" + "|".join(row_cells) + "|")

        return parts

    def generate(self) -> str:
        parts = []
        parts.append(self._header())
        parts.append(self._site_snapshot())
        parts.append(self._executive_summary())
        parts.append(self._key_findings())

        for idx, result in enumerate(self.results, 1):
            parts.append(self._category_section(idx, result))

        parts.append(self._recommendations())
        parts.append(self._scan_summary())
        parts.append(self._footer())
        return '\n'.join(parts)

    def _header(self) -> str:
        now = datetime.now()
        date_str = now.strftime("%Y-%m-%d")
        time_str = now.strftime("%H:%M:%S")
        url_status = "Enabled" if self.check_urls else "Disabled (--skip-urls)"

        if self.category_filter:
            title = f"Praxis Library — {self.category_filter.replace('-', ' ').title()} Audit Report"
        else:
            title = "Praxis Library Site Audit Report"

        hdr_rows = [
            ("**Date**", date_str),
            ("**Time**", time_str),
            ("**Duration**", f"{self.duration:.1f}s"),
            ("**External URL Checks**", url_status),
            ("**Audit Tool**", "`PraxisLibraryAudit.py` v3.0"),
            ("**Standards**", "CSP A+, WCAG 2.1 AA, OWASP Top 10, Google SEO"),
        ]
        hdr_table = "\n".join(self._aligned_table(["Field", "Value"], hdr_rows, ['l', 'l']))

        sev_rows = [
            ("**ERROR**", "Standards violation or broken functionality", "Fails the category. Must fix before deploy."),
            ("**WARNING**", "Best-practice deviation", "Does not fail the category. Should fix to maintain quality."),
            ("**INFO**", "Inventory data or advisory note", "No action needed. Provides context for reviewers."),
        ]
        sev_table = "\n".join(self._aligned_table(["Level", "Meaning", "Impact"], sev_rows, ['l', 'l', 'l']))

        return f"""# {title}

{hdr_table}

## Audit Methodology

This audit performs **{len(Category)}** automated inspection categories across every HTML file, stylesheet, script, and data file in the Praxis Library. Each category has a defined purpose (what), rationale (why), and detection method (how) documented in its section below.

All values are **dynamically discovered** from the live filesystem — no hardcoded counts. The audit can be re-run at any time to verify the current state of the site without configuration changes.

### Severity Levels

{sev_table}

### Scoring

The overall score (0.0 – 10.0) is computed from unique issue types, not raw occurrence counts. Each unique error type deducts 0.5 points. Each unique warning type deducts 0.1 points. A score of 10.0 indicates zero errors and zero warnings across all categories.

---
"""

    def _site_snapshot(self) -> str:
        """Auto-discovered site snapshot — no hardcoded values."""
        s = self.discovery.summary()
        tools = self.discovery.get_active_tools()
        deact = self.discovery.get_deactivated_tools()
        policies = self.discovery.get_policy_pages()
        frags = self.discovery.get_fragment_files()

        lines = ["## Site Snapshot (Auto-Discovered)\n"]
        snap_rows = [
            ("Total HTML Files", str(s['total_html_files'])),
            ("Glossary Terms", f"{s['glossary_terms']:,}"),
            ("Active Tools", str(s['active_tools'])),
            ("Deactivated Tools", str(len(deact))),
            ("Policy Pages", str(len(policies))),
            ("Fragment Files", str(len(frags))),
        ]
        lines.extend(self._aligned_table(["Metric", "Value"], snap_rows, ['l', 'r']))
        lines.append("")

        if tools:
            lines.append("**Active Tools:** " + ", ".join(t['name'] for t in tools))
        if deact:
            lines.append("**Deactivated:** " + ", ".join(d.split('/')[-1] for d in deact))
        if policies:
            lines.append("**Policies:** " + ", ".join(policies))

        lines.append("")
        lines.append("---\n")
        return '\n'.join(lines)

    def _executive_summary(self) -> str:
        lines = ["## Executive Summary\n"]

        total_e = total_w = total_i = 0
        citation_info = 0
        for r in self.results:
            total_e += r.error_count
            total_w += r.warning_count
            total_i += r.info_count
            if r.category == Category.CITATION:
                citation_info = r.info_count

        # Score based on unique issue types (not raw counts)
        unique_errors = set()
        unique_warnings = set()
        for r in self.results:
            for issue in r.issues:
                if issue.severity == Severity.ERROR:
                    unique_errors.add(issue.message)
                elif issue.severity == Severity.WARNING:
                    unique_warnings.add(issue.message)

        raw_score = max(0, 100 - (len(unique_errors) * 5) - (len(unique_warnings) * 1))
        score = min(10.0, raw_score / 10)
        passed_cats = sum(1 for r in self.results if r.passed)
        total_cats = len(self.results)

        # Score card
        lines.append("### Score Card\n")
        sc_rows = [
            ("**Overall Score**", f"**{score:.1f} / 10.0**"),
            ("Categories Passed", f"{passed_cats} / {total_cats}"),
            ("Total Errors", str(total_e)),
            ("Total Warnings", str(total_w)),
            ("Unique Error Types", f"{len(unique_errors)} (each deducts 0.5 points)"),
            ("Unique Warning Types", f"{len(unique_warnings)} (each deducts 0.1 points)"),
        ]
        if citation_info > 0:
            sc_rows.append(("Citations Verified", f"\u2705 {citation_info} external links confirmed live (HTTP 200)"))
        lines.extend(self._aligned_table(["Metric", "Result"], sc_rows, ['l', 'l']))
        lines.append("")

        # Category results table — aligned columns
        lines.append("### Category Results\n")

        # Build rows first to compute widths
        cat_rows = []
        for idx, r in enumerate(self.results, 1):
            status_icon = "\u2705" if r.passed else "\u274c"
            status_text = "PASS" if r.passed else "**FAIL**"
            cat_rows.append((
                str(idx), r.category.value,
                str(r.error_count), str(r.warning_count), str(r.info_count),
                f"{status_icon} {status_text}"
            ))

        nw = max(len("#"), max(len(r[0]) for r in cat_rows))
        cw = max(len("Category"), max(len(r[1]) for r in cat_rows))
        ew = max(len("Errors"), max(len(r[2]) for r in cat_rows))
        ww = max(len("Warnings"), max(len(r[3]) for r in cat_rows))
        iw = max(len("Info"), max(len(r[4]) for r in cat_rows))
        sw = max(len("Status"), max(len(r[5]) for r in cat_rows))

        lines.append(f"| {'#':>{nw}} | {'Category':<{cw}} | {'Errors':>{ew}} | {'Warnings':>{ww}} | {'Info':>{iw}} | {'Status':<{sw}} |")
        lines.append(f"|{'-' * (nw + 2)}|{'-' * (cw + 2)}|{'-' * (ew + 2)}|{'-' * (ww + 2)}|{'-' * (iw + 2)}|{'-' * (sw + 2)}|")
        for r in cat_rows:
            lines.append(f"| {r[0]:>{nw}} | {r[1]:<{cw}} | {r[2]:>{ew}} | {r[3]:>{ww}} | {r[4]:>{iw}} | {r[5]:<{sw}} |")

        lines.append("")
        lines.append("---\n")
        return '\n'.join(lines)

    def _key_findings(self) -> str:
        """Plain-English summary of what the audit found and what to do next."""
        total_e = sum(r.error_count for r in self.results)
        total_w = sum(r.warning_count for r in self.results)
        total_i = sum(r.info_count for r in self.results)
        passed_cats = sum(1 for r in self.results if r.passed)
        total_cats = len(self.results)
        failed = [r for r in self.results if not r.passed]

        # Count verified citations separately from generic info
        citation_info = 0
        for r in self.results:
            if r.category == Category.CITATION:
                citation_info = r.info_count
                break
        other_info = total_i - citation_info

        lines = ["## Key Findings\n"]

        # Overall health statement
        if total_e == 0 and total_w == 0:
            lines.append("\u2705 **The site is in excellent health.** All {0} audit categories passed "
                         "with zero errors and zero warnings.\n".format(total_cats))
        elif total_e == 0 and total_w > 0:
            lines.append(f"\u26a0\ufe0f **The site is healthy but has {total_w} warning(s) to review.** "
                         "No critical errors were found. Warnings indicate areas where best "
                         "practices are not fully met — they do not break the site, but "
                         "fixing them improves quality and maintainability.\n")
        else:
            lines.append(f"\u274c **Action required.** The audit found {total_e} error(s) across "
                         f"{len(failed)} category/categories that need immediate attention. "
                         "Errors indicate broken functionality, security gaps, or standards "
                         "violations that affect users.\n")

        # Verified citations callout
        if citation_info > 0:
            lines.append(f"### \u2705 {citation_info} Citations Verified\n")
            lines.append(f"All {citation_info} external .gov/.edu citations were checked via HTTP "
                         "and returned **200 OK**. Every cited source on the site is live and accessible.\n")

        # Per-category plain-English bullets
        if failed:
            lines.append("### \u274c Categories Needing Attention\n")
            for r in failed:
                err_msgs = set(i.message for i in r.issues if i.severity == Severity.ERROR)
                warn_msgs = set(i.message for i in r.issues if i.severity == Severity.WARNING)
                lines.append(f"- **{r.category.value}** — "
                             f"{r.error_count} error(s), {r.warning_count} warning(s)")
                for msg in sorted(err_msgs):
                    count = sum(1 for i in r.issues
                                if i.severity == Severity.ERROR and i.message == msg)
                    lines.append(f"  - \u274c {msg} ({count} occurrence{'s' if count != 1 else ''})")
                for msg in sorted(warn_msgs):
                    count = sum(1 for i in r.issues
                                if i.severity == Severity.WARNING and i.message == msg)
                    lines.append(f"  - \u26a0\ufe0f {msg} ({count} occurrence{'s' if count != 1 else ''})")
            lines.append("")

        # Passing categories summary
        passing = [r for r in self.results if r.passed]
        if passing:
            lines.append("### \u2705 What's Working Well\n")
            for r in passing:
                status_detail = "clean" if r.warning_count == 0 else f"{r.warning_count} minor warning(s)"
                lines.append(f"- \u2705 **{r.category.value}** — PASS ({status_detail})")
            lines.append("")

        # What the remaining info items mean (if any non-verified info exists)
        if other_info > 0:
            lines.append(f"### \u2139\ufe0f About the {other_info} Info Item(s)\n")
            lines.append("Info items are **not problems** — they are inventory data the audit "
                         "collects to help you understand your site. No action is needed.\n")

        lines.append("---\n")
        return '\n'.join(lines)

    def _category_section(self, idx: int, result: AuditResult) -> str:
        lines = []
        status = "PASS" if result.passed else "FAIL"
        status_icon = "\u2705" if result.passed else "\u274c"
        lines.append(f"## {idx}. {result.category.value} — {status_icon} {status}\n")

        # Status bar
        stat_rows = [
            ("Files Scanned", f"{result.files_scanned:,}"),
            ("Checks Performed", f"{result.checks_run:,}"),
            ("Errors", str(result.error_count)),
            ("Warnings", str(result.warning_count)),
            ("Info", str(result.info_count)),
        ]
        lines.extend(self._aligned_table(["Metric", "Value"], stat_rows, ['l', 'r']))
        lines.append("")

        # What / Why / How documentation
        cat_info = CATEGORY_CHECKS.get(result.category)
        if cat_info:
            lines.append(f"**What This Scans:** {cat_info['description']}\n")
            if 'why' in cat_info:
                lines.append(f"**Why It Matters:** {cat_info['why']}\n")
            if 'how' in cat_info:
                lines.append(f"**How Detection Works:** {cat_info['how']}\n")

            # Checks reference table
            checks = cat_info['checks']
            lines.append("### Checks Performed\n")
            check_rows = []
            for n, (check_name, severity, description) in enumerate(checks, 1):
                desc_safe = description.replace('|', '\\|')
                check_rows.append((str(n), check_name, severity, desc_safe))
            lines.extend(self._aligned_table(["#", "Check", "Severity", "Description"], check_rows, ['r', 'l', 'l', 'l']))
            lines.append("")

        errors = [i for i in result.issues if i.severity == Severity.ERROR]
        warnings = [i for i in result.issues if i.severity == Severity.WARNING]
        infos = [i for i in result.issues if i.severity == Severity.INFO]

        # Helper to build aligned issue tables
        def _issue_table(issues, has_suggestion=False):
            rows = []
            for n, issue in enumerate(issues, 1):
                ln = str(issue.line_number) if issue.line_number else "-"
                msg = issue.message.replace('|', '\\|')
                if has_suggestion:
                    sug = issue.suggestion.replace('|', '\\|') if issue.suggestion else "-"
                    rows.append((str(n), f"`{issue.file_path}`", ln, msg, sug))
                else:
                    rows.append((str(n), f"`{issue.file_path}`", ln, msg))
            if has_suggestion:
                return self._aligned_table(
                    ["#", "File", "Line", "Issue", "Suggestion"],
                    rows, ['r', 'l', 'r', 'l', 'l'])
            else:
                return self._aligned_table(
                    ["#", "File", "Line", "Note"],
                    rows, ['r', 'l', 'r', 'l'])

        if errors:
            lines.append(f"### \u274c Errors ({len(errors)})\n")
            lines.extend(_issue_table(errors, has_suggestion=True))
            lines.append("")

        if warnings:
            lines.append(f"### \u26a0\ufe0f Warnings ({len(warnings)})\n")
            lines.extend(_issue_table(warnings, has_suggestion=True))
            lines.append("")

        if infos:
            lines.append(f"### \u2139\ufe0f Info ({len(infos)})\n")
            lines.extend(_issue_table(infos, has_suggestion=False))
            lines.append("")

        if not errors and not warnings and not infos:
            lines.append("\u2705 **No issues found.** All checks passed cleanly.\n")

        lines.append("---\n")
        return '\n'.join(lines)

    def _recommendations(self) -> str:
        lines = ["## Recommendations\n"]
        lines.append("Actionable items grouped by priority. De-duplicated by file and suggestion.\n")

        all_errors = []
        all_warnings = []
        for r in self.results:
            for issue in r.issues:
                if issue.severity == Severity.ERROR and issue.suggestion:
                    all_errors.append(issue)
                elif issue.severity == Severity.WARNING and issue.suggestion:
                    all_warnings.append(issue)

        if all_errors:
            lines.append("### \u274c Critical — Fix Before Deploy\n")
            seen = set()
            for issue in all_errors:
                key = (issue.file_path, issue.suggestion)
                if key not in seen:
                    seen.add(key)
                    lines.append(f"- `{issue.file_path}` — {issue.suggestion}")
            lines.append("")

        if all_warnings:
            lines.append("### \u26a0\ufe0f Important — Fix When Possible\n")
            seen = set()
            for issue in all_warnings:
                key = (issue.file_path, issue.suggestion)
                if key not in seen:
                    seen.add(key)
                    lines.append(f"- `{issue.file_path}` — {issue.suggestion}")
            lines.append("")

        if not all_errors and not all_warnings:
            lines.append("\u2705 **No recommendations.** All checks passed with no actionable items.\n")

        lines.append("---\n")
        return '\n'.join(lines)

    def _scan_summary(self) -> str:
        """End-of-report summary: what was scanned and what was found."""
        lines = ["## Scan Summary\n"]

        # --- What Was Scanned ---
        lines.append("### What Was Scanned\n")
        total_files = sum(r.files_scanned for r in self.results)
        total_checks = sum(r.checks_run for r in self.results)
        cats_run = len(self.results)
        s = self.discovery.summary()
        deact_count = len(self.discovery.get_deactivated_tools())
        policy_count = len(self.discovery.get_policy_pages())
        frag_count = len(self.discovery.get_fragment_files())

        # Build rows, then align
        scan_rows = [
            ("Audit categories run", str(cats_run)),
            ("Total file scans (across all categories)", f"{total_files:,}"),
            ("Total individual checks performed", f"{total_checks:,}"),
            ("HTML files in scope", str(s['total_html_files'])),
            ("Glossary terms validated", f"{s['glossary_terms']:,}"),
            ("Active tools verified", str(s['active_tools'])),
            ("Deactivated tools tracked", str(deact_count)),
            ("Policy pages verified", str(policy_count)),
            ("Fragment files excluded", str(frag_count)),
        ]
        lines.extend(self._aligned_table(["Scope", "Count"], scan_rows, ['l', 'r']))
        lines.append("")

        # --- Findings ---
        lines.append("### Findings\n")

        total_e = sum(r.error_count for r in self.results)
        total_w = sum(r.warning_count for r in self.results)
        total_i = sum(r.info_count for r in self.results)
        passed = sum(1 for r in self.results if r.passed)

        find_rows = []
        for idx, r in enumerate(self.results, 1):
            status_icon = "\u2705" if r.passed else "\u274c"
            status = "PASS" if r.passed else "FAIL"
            find_rows.append((
                str(idx), r.category.value, f"{status_icon} {status}",
                str(r.error_count), str(r.warning_count), str(r.info_count),
                f"{r.files_scanned:,}", f"{r.checks_run:,}"
            ))
        find_rows.append((
            "", "**TOTAL**", f"**{passed}/{len(self.results)}**",
            f"**{total_e}**", f"**{total_w}**", f"**{total_i}**",
            f"**{total_files:,}**", f"**{total_checks:,}**"
        ))
        lines.extend(self._aligned_table(
            ["#", "Category", "Status", "Errors", "Warnings", "Info", "Files", "Checks"],
            find_rows, ['r', 'l', 'l', 'r', 'r', 'r', 'r', 'r']
        ))
        lines.append("")

        # Unique issue types breakdown
        unique_errors = set()
        unique_warnings = set()
        for r in self.results:
            for issue in r.issues:
                if issue.severity == Severity.ERROR:
                    unique_errors.add(issue.message)
                elif issue.severity == Severity.WARNING:
                    unique_warnings.add(issue.message)

        if unique_errors:
            lines.append(f"### Unique Error Types ({len(unique_errors)})\n")
            for msg in sorted(unique_errors):
                count = sum(1 for r in self.results for i in r.issues
                            if i.severity == Severity.ERROR and i.message == msg)
                lines.append(f"- {msg} ({count} occurrence{'s' if count != 1 else ''})")
            lines.append("")

        if unique_warnings:
            lines.append(f"### Unique Warning Types ({len(unique_warnings)})\n")
            for msg in sorted(unique_warnings):
                count = sum(1 for r in self.results for i in r.issues
                            if i.severity == Severity.WARNING and i.message == msg)
                lines.append(f"- {msg} ({count} occurrence{'s' if count != 1 else ''})")
            lines.append("")

        if not unique_errors and not unique_warnings:
            lines.append("\u2705 **No errors or warnings found.** The site is in excellent shape.\n")

        # Score
        raw_score = max(0, 100 - (len(unique_errors) * 5) - (len(unique_warnings) * 1))
        score = min(10.0, raw_score / 10)
        lines.append(f"### Final Score: {score:.1f} / 10.0\n")
        lines.append(f"Calculated as: 10.0 \u2212 ({len(unique_errors)} error types \u00d7 0.5) \u2212 ({len(unique_warnings)} warning types \u00d7 0.1) = **{score:.1f}**\n")
        lines.append("---\n")
        return '\n'.join(lines)

    def _footer(self) -> str:
        now = datetime.now()
        lines = ["## About This Audit\n"]

        lines.append("### Tool Information\n")
        tool_rows = [
            ("Tool", "`PraxisLibraryAudit.py` v3.0"),
            ("Language", "Python 3.10+"),
            ("Dependencies", "Standard library only (`os`, `re`, `json`, `urllib`)"),
            ("External calls", "HTTP HEAD requests for URL verification (optional)"),
            ("Output format", "Markdown (.md)"),
        ]
        lines.extend(self._aligned_table(["Field", "Detail"], tool_rows, ['l', 'l']))
        lines.append("")

        lines.append("### Standards Enforced\n")
        std_rows = [
            ("**CSP A+**", "Content Security Policy \u2014 zero inline code, no external dependencies"),
            ("**WCAG 2.1 AA**", "Web Content Accessibility Guidelines \u2014 lang, alt text, heading hierarchy"),
            ("**OWASP Top 10**", "Open Web Application Security \u2014 XSS prevention via CSP, link security"),
            ("**Google SEO**", "Search engine optimization \u2014 meta tags, Open Graph, JSON-LD, sitemap"),
            ("**48 US State AI Laws**", "Ethics ticker, AI disclosure, responsible AI policy"),
        ]
        lines.extend(self._aligned_table(["Standard", "Application"], std_rows, ['l', 'l']))
        lines.append("")

        lines.append("""### How to Run

```
# Full audit (URLs verified by default)
python "Python Scipts/PraxisLibraryAudit.py" --verbose

# Offline mode (skip HTTP verification)
python "Python Scipts/PraxisLibraryAudit.py" --skip-urls

# Single category audit
python "Python Scipts/PraxisLibraryAudit.py" -c security
python "Python Scipts/PraxisLibraryAudit.py" -c citation-accuracy

# List available categories
python "Python Scipts/PraxisLibraryAudit.py" --list-categories
```

### Audit Integrity

All values in this report are **dynamically discovered** from the live filesystem at scan time. There are no hardcoded page counts, tool counts, or term counts. The audit tool can be re-run after any site change to produce an accurate, up-to-date report without configuration changes.

---""")
        lines.append(f"*Generated {now.strftime('%Y-%m-%d %H:%M:%S')} by PraxisLibraryAudit.py v3.0 \u2014 Praxis Library Quality Assurance*")
        return '\n'.join(lines)

    def to_json(self) -> dict:
        """Export complete audit data as JSON for the portal page."""
        now = datetime.now()

        # Totals
        total_e = total_w = total_i = 0
        citation_verified = 0
        unique_errors = set()
        unique_warnings = set()
        for r in self.results:
            total_e += r.error_count
            total_w += r.warning_count
            total_i += r.info_count
            if r.category == Category.CITATION:
                citation_verified = r.info_count
            for issue in r.issues:
                if issue.severity == Severity.ERROR:
                    unique_errors.add(issue.message)
                elif issue.severity == Severity.WARNING:
                    unique_warnings.add(issue.message)

        raw_score = max(0, 100 - (len(unique_errors) * 5) - (len(unique_warnings) * 1))
        score = min(10.0, raw_score / 10)

        # Site snapshot
        s = self.discovery.summary()
        tools = self.discovery.get_active_tools()
        policies = self.discovery.get_policy_pages()

        # Build categories array
        categories = []
        for idx, result in enumerate(self.results, 1):
            cat_info = CATEGORY_CHECKS.get(result.category, {})
            errors = []
            warnings = []
            infos = []
            for issue in result.issues:
                d = {
                    'file_path': issue.file_path,
                    'line_number': issue.line_number,
                    'message': issue.message,
                    'suggestion': issue.suggestion
                }
                if issue.severity == Severity.ERROR:
                    errors.append(d)
                elif issue.severity == Severity.WARNING:
                    warnings.append(d)
                else:
                    infos.append(d)

            categories.append({
                'id': idx,
                'name': result.category.value,
                'slug': result.category.value.lower().replace('/', '-').replace(' ', '-'),
                'passed': result.passed,
                'files_scanned': result.files_scanned,
                'checks_run': result.checks_run,
                'error_count': result.error_count,
                'warning_count': result.warning_count,
                'info_count': result.info_count,
                'description': cat_info.get('description', ''),
                'why': cat_info.get('why', ''),
                'checks': [
                    {'name': c[0], 'severity': c[1], 'description': c[2]}
                    for c in cat_info.get('checks', [])
                ],
                'errors': errors,
                'warnings': warnings,
                'infos': infos
            })

        return {
            'metadata': {
                'date': now.strftime("%Y-%m-%d"),
                'time': now.strftime("%H:%M:%S"),
                'timestamp': now.isoformat(),
                'duration': round(self.duration, 1),
                'tool_version': 'PraxisLibraryAudit.py v3.0',
                'url_checks_enabled': self.check_urls
            },
            'site_snapshot': {
                'total_html_files': s['total_html_files'],
                'glossary_terms': s['glossary_terms'],
                'active_tools': s['active_tools'],
                'deactivated_tools': len(s['deactivated_tools']),
                'policy_pages': len(policies),
                'fragment_files': len(s['fragment_files']),
                'active_tool_names': [t['name'] for t in tools],
                'policy_names': policies
            },
            'summary': {
                'overall_score': score,
                'categories_passed': sum(1 for r in self.results if r.passed),
                'categories_total': len(self.results),
                'total_errors': total_e,
                'total_warnings': total_w,
                'total_info': total_i,
                'unique_error_types': len(unique_errors),
                'unique_warning_types': len(unique_warnings),
                'citations_verified': citation_verified
            },
            'categories': categories
        }

    def write(self, output_path: str):
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(self.generate())


# ============================================================
# CLI
# ============================================================

def find_project_root() -> str:
    """Walk up from script location to find project root (where index.html lives)."""
    current = os.path.dirname(os.path.abspath(__file__))
    for _ in range(5):
        if os.path.isfile(os.path.join(current, 'index.html')):
            return current
        current = os.path.dirname(current)
    # Fallback: parent of script dir
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main():
    parser = argparse.ArgumentParser(
        description="Praxis Library — Comprehensive Site Audit Tool",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python "Python Scipts/PraxisLibraryAudit.py"                 Full audit (URLs verified by default)
  python "Python Scipts/PraxisLibraryAudit.py" --skip-urls     Offline mode (skip URL verification)
  python "Python Scipts/PraxisLibraryAudit.py" --verbose       Show progress
  python "Python Scipts/PraxisLibraryAudit.py" -c security     Run only security checks
  python "Python Scipts/PraxisLibraryAudit.py" -o report.md    Custom output path
        """
    )
    parser.add_argument(
        "--skip-urls", action="store_true",
        help="Skip external URL verification (faster, offline mode)"
    )
    parser.add_argument(
        "--verbose", "-v", action="store_true",
        help="Show progress during audit"
    )
    parser.add_argument(
        "--category", "-c",
        choices=list(CATEGORY_MAP.keys()),
        help="Run only a specific audit category"
    )
    parser.add_argument(
        "--output", "-o", default=None,
        help="Output path (default: .claude/reports/audit-report-YYYY-MM-DD_HHMMSS.md)"
    )
    parser.add_argument(
        "--root", default=None,
        help="Project root directory (default: auto-detect from script location)"
    )

    args = parser.parse_args()

    root_dir = args.root if args.root else find_project_root()

    if args.output is None:
        now = datetime.now()
        timestamp = now.strftime("%Y-%m-%d_%H%M%S")
        if args.category:
            # Targeted audit: e.g. "security-audit-2026-02-09_101500.md"
            args.output = os.path.join(root_dir, ".claude", "reports",
                                        f"{args.category}-audit-{timestamp}.md")
        else:
            # Full audit
            args.output = os.path.join(root_dir, ".claude", "reports",
                                        f"audit-report-{timestamp}.md")

    print("=" * 60)
    if args.category:
        print(f"  PRAXIS LIBRARY — {args.category.upper().replace('-', ' ')} AUDIT")
    else:
        print("  PRAXIS LIBRARY — COMPREHENSIVE SITE AUDIT")
    print("=" * 60)
    print(f"  Root: {root_dir}")
    print()

    runner = AuditRunner(
        root_dir=root_dir,
        check_urls=not args.skip_urls,
        verbose=args.verbose,
        category_filter=args.category
    )

    results = runner.run()

    # Generate report
    report = ReportGenerator(results, runner.discovery, root_dir,
                              runner.duration, not args.skip_urls,
                              category_filter=args.category)
    report.write(args.output)

    # Export JSON for audit portal page (delete old before writing new)
    audit_dir = os.path.join(root_dir, 'Audit')
    os.makedirs(audit_dir, exist_ok=True)
    json_path = os.path.join(audit_dir, 'audit-report.json')
    if os.path.exists(json_path):
        os.remove(json_path)
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(report.to_json(), f, indent=2, ensure_ascii=False)
    print(f"  JSON export: {json_path}")

    # Console summary
    total_e = sum(r.error_count for r in results)
    total_w = sum(r.warning_count for r in results)
    total_i = sum(r.info_count for r in results)
    passed = sum(1 for r in results if r.passed)
    total = len(results)

    print()
    print("=" * 60)
    print("  AUDIT SUMMARY")
    print("=" * 60)
    print(f"  Categories: {passed}/{total} passed")
    print(f"  Errors:     {total_e}")
    print(f"  Warnings:   {total_w}")
    print(f"  Info:       {total_i}")
    print(f"  Duration:   {runner.duration:.1f}s")
    print(f"  Report:     {args.output}")
    print("=" * 60)

    sys.exit(1 if total_e > 0 else 0)


if __name__ == "__main__":
    main()
