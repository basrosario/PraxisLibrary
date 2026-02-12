#!/usr/bin/env python3
"""
seo_inject.py - Inject SEO meta tags and JSON-LD structured data into all HTML pages.

Usage:
    python "Python Scipts/seo_inject.py"
    python "Python Scipts/seo_inject.py" --force       # Strip old SEO and re-inject
    python "Python Scipts/seo_inject.py" --dry-run     # Preview without writing
    python "Python Scipts/seo_inject.py" --verbose      # Show detailed progress

Idempotent: Safe to re-run. Detects and skips pages already processed.
Use --force to strip existing SEO and re-inject (for upgrades).
"""

import os
import re
import json
import html
import sys
from pathlib import Path

# === CONFIGURATION ===
DOMAIN = "https://praxislibrary.com"
SITE_NAME = "Praxis Library"
SITE_TAGLINE = "The Open Standard in AI Literacy"
SITE_DESCRIPTION = ("A comprehensive, living library of 5,000+ AI terms, "
                     "117 prompting frameworks, and interactive tools. "
                     "The definitive open resource for AI literacy, prompt "
                     "engineering, and human-AI communication.")
DEFAULT_OG_IMAGE = f"{DOMAIN}/assets/images/praxishome.png"
IDEMPOTENCY_MARKER = "<!-- SEO Meta -->"
END_MARKER = "<!-- /SEO -->"

# Social & identity
TIKTOK_URL = "https://www.tiktok.com/@thepraxislibrary"
FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61587612308104"
GITHUB_URL = "https://github.com/basrosario/PraxisLibrary"
BRAND_COLOR = "#DC3545"

PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Directories to skip entirely
EXCLUDE_DIRS = {".claude", "data", "Python Scipts", "glossary_factory",
                "assets", "node_modules", ".git", "__pycache__"}

# Page type configuration
PAGE_CONFIG = {
    "learn":            {"og_type": "article",  "schema": "LearningResource"},
    "tools":            {"og_type": "website",  "schema": "SoftwareApplication"},
    "foundations":      {"og_type": "article",  "schema": "Article"},
    "pages":            {"og_type": "website",  "schema": "WebPage"},
    "quiz":             {"og_type": "website",  "schema": "WebPage"},
    "neurodivergence":  {"og_type": "article",  "schema": "Article"},
    "patterns":         {"og_type": "article",  "schema": "Article"},
}

# Breadcrumb parent mapping (directory → display name)
BREADCRUMB_PARENTS = {
    "learn":            "Discover",
    "tools":            "AI Tools",
    "foundations":      "AI Foundations",
    "pages":            "Resources",
    "quiz":             "Quiz",
    "neurodivergence":  "Neurodivergence & AI",
    "patterns":         "Patterns",
}

# Topics the organization is known for (used in knowsAbout)
KNOWS_ABOUT = [
    "Artificial Intelligence",
    "AI Literacy",
    "Prompt Engineering",
    "AI Prompting Frameworks",
    "AI Glossary",
    "Large Language Models",
    "Chain-of-Thought Prompting",
    "AI Education",
    "Human-AI Communication",
    "Neurodivergence and AI",
    "AI Safety",
    "AI Ethics",
]


# === EXTRACTION ===

def find_html_files():
    """Walk project and return all HTML files to process."""
    html_files = []
    for dirpath, dirnames, filenames in os.walk(PROJECT_ROOT):
        # Prune excluded directories
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for f in filenames:
            if f.endswith(".html"):
                html_files.append(Path(dirpath) / f)
    return sorted(html_files)


def extract_title(content):
    """Extract <title> text from HTML."""
    m = re.search(r"<title>(.*?)</title>", content, re.DOTALL)
    return html.unescape(m.group(1).strip()) if m else ""


def extract_description(content):
    """Extract meta description content from HTML."""
    m = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', content)
    return html.unescape(m.group(1).strip()) if m else ""


def extract_headline(title):
    """Strip ' - Praxis' suffix from title for schema headline."""
    return re.sub(r"\s*[-–—]\s*Praxis\s*$", "", title).strip()


def extract_faq_pairs(content):
    """Extract FAQ question/answer pairs from faq.html."""
    pairs = []
    questions = re.finditer(
        r'<summary\s+class="faq-question">(.*?)</summary>\s*'
        r'<div\s+class="faq-answer">(.*?)</div>',
        content, re.DOTALL
    )
    for m in questions:
        q = m.group(1).strip()
        # Strip HTML tags from answer, keep text
        answer_html = m.group(2).strip()
        answer_text = re.sub(r"<[^>]+>", "", answer_html).strip()
        # Collapse whitespace
        answer_text = re.sub(r"\s+", " ", answer_text)
        if q and answer_text:
            pairs.append((q, answer_text))
    return pairs


def get_page_type(rel_path):
    """Determine page type from relative path."""
    parts = rel_path.parts
    if len(parts) == 1:
        return "root"
    return parts[0]


def get_canonical_url(rel_path):
    """Build canonical URL from relative path."""
    path_str = rel_path.as_posix()
    # index.html → directory path
    if path_str.endswith("/index.html"):
        path_str = path_str[:-10]  # Remove "index.html", keep trailing /
    elif path_str == "index.html":
        path_str = ""
    return f"{DOMAIN}/{path_str}"


def get_breadcrumb_items(rel_path, headline):
    """Build breadcrumb list items for JSON-LD."""
    items = [{"@type": "ListItem", "position": 1, "name": "Home",
              "item": DOMAIN}]
    page_type = get_page_type(rel_path)

    if page_type == "root":
        return items

    parent_name = BREADCRUMB_PARENTS.get(page_type, page_type.title())
    items.append({
        "@type": "ListItem", "position": 2, "name": parent_name,
        "item": f"{DOMAIN}/{page_type}/"
    })

    # Handle subdirectories (e.g., learn/modality/image/)
    parts = list(rel_path.parts)
    if len(parts) > 2:
        for i in range(1, len(parts) - 1):
            sub_name = parts[i].replace("-", " ").title()
            sub_path = "/".join(parts[:i + 1])
            items.append({
                "@type": "ListItem", "position": len(items) + 1,
                "name": sub_name, "item": f"{DOMAIN}/{sub_path}/"
            })

    # Current page (no item URL per schema spec for last item)
    items.append({
        "@type": "ListItem", "position": len(items) + 1,
        "name": headline
    })
    return items


def strip_existing_seo(content):
    """Remove previously injected SEO block (between markers)."""
    # Pattern: from <!-- SEO Meta --> through <!-- /SEO --> (inclusive)
    pattern = r'\n?\s*<!-- SEO Meta -->.*?<!-- /SEO -->\s*\n?'
    stripped = re.sub(pattern, '\n', content, flags=re.DOTALL)

    # Also strip old-format without end marker (<!-- SEO Meta --> through </script>)
    if IDEMPOTENCY_MARKER in stripped:
        # Old format: marker through closing </script> of JSON-LD
        pattern2 = (r'\n?\s*<!-- SEO Meta -->.*?'
                    r'</script>\s*\n?')
        stripped = re.sub(pattern2, '\n', stripped, flags=re.DOTALL)

    return stripped


# === PUBLISHER OBJECT (reused across schemas) ===

def get_publisher():
    """Shared publisher/organization object for JSON-LD."""
    return {
        "@type": "EducationalOrganization",
        "name": SITE_NAME,
        "alternateName": SITE_TAGLINE,
        "url": DOMAIN,
        "logo": f"{DOMAIN}/favicon.svg",
        "description": SITE_DESCRIPTION,
        "sameAs": [TIKTOK_URL, FACEBOOK_URL, GITHUB_URL],
        "knowsAbout": KNOWS_ABOUT
    }


# === GENERATION ===

def build_meta_tags(title, description, canonical_url, og_type):
    """Generate SEO meta tag block."""
    # Escape for HTML attributes
    t = html.escape(title, quote=True)
    d = html.escape(description, quote=True)

    lines = [
        f"    {IDEMPOTENCY_MARKER}",
        f'    <meta name="robots" content="index, follow, '
        f'max-image-preview:large, max-snippet:-1, max-video-preview:-1">',
        f'    <meta name="author" content="{SITE_NAME}">',
        f'    <meta name="theme-color" content="{BRAND_COLOR}">',
        f'    <link rel="canonical" href="{canonical_url}">',
        f"    <!-- Open Graph -->",
        f'    <meta property="og:type" content="{og_type}">',
        f'    <meta property="og:title" content="{t}">',
        f'    <meta property="og:description" content="{d}">',
        f'    <meta property="og:url" content="{canonical_url}">',
        f'    <meta property="og:image" content="{DEFAULT_OG_IMAGE}">',
        f'    <meta property="og:site_name" content="{SITE_NAME}">',
        f'    <meta property="og:locale" content="en_US">',
        f"    <!-- Social Card -->",
        f'    <meta name="twitter:card" content="summary_large_image">',
        f'    <meta name="twitter:title" content="{t}">',
        f'    <meta name="twitter:description" content="{d}">',
        f'    <meta name="twitter:image" content="{DEFAULT_OG_IMAGE}">',
    ]
    return "\n".join(lines)


def build_homepage_jsonld(description):
    """JSON-LD for the homepage: WebSite + EducationalOrganization."""
    publisher = get_publisher()
    data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "name": SITE_NAME,
                "alternateName": SITE_TAGLINE,
                "url": DOMAIN,
                "description": description,
                "publisher": {"@type": "EducationalOrganization",
                              "name": SITE_NAME},
                "inLanguage": "en-US",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": (f"{DOMAIN}/pages/glossary.html"
                               "?q={search_term_string}"),
                    "query-input": "required name=search_term_string"
                }
            },
            publisher,
            {
                "@type": "CollectionPage",
                "name": "AI Prompting Framework Library",
                "description": ("A comprehensive collection of 117 AI "
                                "prompting frameworks and techniques, from "
                                "Chain-of-Thought to CRISP to ReAct."),
                "url": f"{DOMAIN}/learn/",
                "isPartOf": {"@type": "WebSite", "url": DOMAIN},
                "about": [
                    {"@type": "Thing", "name": "Prompt Engineering"},
                    {"@type": "Thing", "name": "AI Literacy"},
                    {"@type": "Thing", "name": "AI Glossary"},
                ]
            }
        ]
    }
    return json.dumps(data, indent=2)


def build_learn_jsonld(headline, description, canonical_url, breadcrumbs):
    """JSON-LD for learn pages: LearningResource + Article + BreadcrumbList."""
    data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["LearningResource", "Article"],
                "headline": headline,
                "name": headline,
                "description": description,
                "url": canonical_url,
                "inLanguage": "en-US",
                "learningResourceType": "Tutorial",
                "educationalLevel": "Beginner to Advanced",
                "educationalUse": "AI Prompt Engineering",
                "isAccessibleForFree": True,
                "publisher": get_publisher(),
                "isPartOf": {
                    "@type": "WebSite",
                    "name": SITE_NAME,
                    "url": DOMAIN
                },
                "about": [
                    {"@type": "Thing", "name": "Prompt Engineering"},
                    {"@type": "Thing", "name": "AI Communication"},
                ]
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs
            }
        ]
    }
    return json.dumps(data, indent=2)


def build_article_jsonld(headline, description, canonical_url, breadcrumbs):
    """JSON-LD for foundations/ND/patterns pages: Article + BreadcrumbList."""
    data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "headline": headline,
                "description": description,
                "url": canonical_url,
                "inLanguage": "en-US",
                "isAccessibleForFree": True,
                "publisher": get_publisher(),
                "isPartOf": {
                    "@type": "WebSite",
                    "name": SITE_NAME,
                    "url": DOMAIN
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs
            }
        ]
    }
    return json.dumps(data, indent=2)


def build_tool_jsonld(headline, description, canonical_url, breadcrumbs):
    """JSON-LD for tools pages: SoftwareApplication + BreadcrumbList."""
    data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": headline,
                "description": description,
                "url": canonical_url,
                "applicationCategory": "EducationalApplication",
                "applicationSubCategory": "AI Prompt Engineering Tool",
                "operatingSystem": "Web Browser",
                "isAccessibleForFree": True,
                "educationalUse": "AI Prompt Engineering",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "publisher": get_publisher()
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs
            }
        ]
    }
    return json.dumps(data, indent=2)


def build_glossary_jsonld(description, canonical_url, breadcrumbs):
    """JSON-LD for glossary page: DefinedTermSet + BreadcrumbList."""
    data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "DefinedTermSet",
                "name": "AI Glossary — 5,324+ Terms Defined",
                "alternateName": "Praxis AI Glossary",
                "description": description,
                "url": canonical_url,
                "inLanguage": "en-US",
                "isAccessibleForFree": True,
                "publisher": get_publisher(),
                "about": [
                    {"@type": "Thing",
                     "name": "Artificial Intelligence Terminology"},
                    {"@type": "Thing", "name": "Machine Learning Glossary"},
                    {"@type": "Thing",
                     "name": "Prompt Engineering Definitions"},
                ]
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs
            }
        ]
    }
    return json.dumps(data, indent=2)


def build_faq_jsonld(faq_pairs, description, canonical_url, breadcrumbs):
    """JSON-LD for FAQ page: FAQPage + BreadcrumbList."""
    main_entity = []
    for q, a in faq_pairs:
        main_entity.append({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": a
            }
        })
    data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "FAQPage",
                "name": "Frequently Asked Questions - Praxis Library",
                "description": description,
                "url": canonical_url,
                "inLanguage": "en-US",
                "publisher": get_publisher(),
                "mainEntity": main_entity
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs
            }
        ]
    }
    return json.dumps(data, indent=2)


def build_webpage_jsonld(headline, description, canonical_url, breadcrumbs):
    """JSON-LD for generic pages: WebPage + BreadcrumbList."""
    data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "name": headline,
                "description": description,
                "url": canonical_url,
                "inLanguage": "en-US",
                "isAccessibleForFree": True,
                "publisher": get_publisher(),
                "isPartOf": {
                    "@type": "WebSite",
                    "name": SITE_NAME,
                    "url": DOMAIN
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs
            }
        ]
    }
    return json.dumps(data, indent=2)


def build_jsonld_block(page_type, rel_path, headline, description,
                       canonical_url, breadcrumbs, content):
    """Route to the correct JSON-LD builder based on page type."""
    rel_str = rel_path.as_posix()

    if rel_str == "index.html":
        jsonld = build_homepage_jsonld(description)
    elif rel_str == "pages/faq.html":
        faq_pairs = extract_faq_pairs(content)
        jsonld = build_faq_jsonld(faq_pairs, description, canonical_url,
                                  breadcrumbs)
    elif rel_str == "pages/glossary.html":
        jsonld = build_glossary_jsonld(description, canonical_url, breadcrumbs)
    elif page_type == "learn":
        jsonld = build_learn_jsonld(headline, description, canonical_url,
                                    breadcrumbs)
    elif page_type in ("foundations", "neurodivergence", "patterns"):
        jsonld = build_article_jsonld(headline, description, canonical_url,
                                      breadcrumbs)
    elif page_type == "tools":
        jsonld = build_tool_jsonld(headline, description, canonical_url,
                                   breadcrumbs)
    else:
        jsonld = build_webpage_jsonld(headline, description, canonical_url,
                                      breadcrumbs)

    return (f'    <script type="application/ld+json">\n{jsonld}\n'
            f'    </script>\n    {END_MARKER}')


# === INJECTION ===

def inject_seo(filepath, dry_run=False, verbose=False, force=False):
    """Inject SEO meta tags and JSON-LD into a single HTML file."""
    rel_path = filepath.relative_to(PROJECT_ROOT)
    content = filepath.read_text(encoding="utf-8")

    # Force mode: strip existing SEO first
    if force and IDEMPOTENCY_MARKER in content:
        content = strip_existing_seo(content)
        if verbose:
            print(f"  STRIPPED old SEO: {rel_path}")
    elif IDEMPOTENCY_MARKER in content:
        if verbose:
            print(f"  SKIP (already processed): {rel_path}")
        return "skipped"

    # Extract existing metadata
    title = extract_title(content)
    description = extract_description(content)

    if not title:
        if verbose:
            print(f"  SKIP (no <title>): {rel_path}")
        return "no_title"

    headline = extract_headline(title)
    page_type = get_page_type(rel_path)
    canonical_url = get_canonical_url(rel_path)
    config = PAGE_CONFIG.get(page_type, {"og_type": "website",
                                          "schema": "WebPage"})
    og_type = config["og_type"]
    breadcrumbs = get_breadcrumb_items(rel_path, headline)

    # Build injection blocks
    meta_block = build_meta_tags(title, description, canonical_url, og_type)
    jsonld_block = build_jsonld_block(page_type, rel_path, headline,
                                      description, canonical_url,
                                      breadcrumbs, content)

    # Find injection point: after the meta description tag
    desc_pattern = r'(<meta\s+name="description"\s+content="[^"]*"\s*/?>)'
    desc_match = re.search(desc_pattern, content)

    if desc_match:
        insert_pos = desc_match.end()
        new_content = (content[:insert_pos] + "\n" + meta_block + "\n" +
                       jsonld_block + "\n" + content[insert_pos:])
    else:
        # Fallback: insert before </head>
        head_match = re.search(r"</head>", content, re.IGNORECASE)
        if not head_match:
            if verbose:
                print(f"  SKIP (no </head>): {rel_path}")
            return "no_head"
        insert_pos = head_match.start()
        new_content = (content[:insert_pos] + meta_block + "\n" +
                       jsonld_block + "\n" + content[insert_pos:])

    if dry_run:
        print(f"  DRY-RUN: {rel_path} ({page_type}, {config['schema']})")
        return "dry_run"

    filepath.write_text(new_content, encoding="utf-8")
    if verbose:
        print(f"  INJECTED: {rel_path} ({page_type}, {config['schema']})")
    return "injected"


# === MAIN ===

def main():
    dry_run = "--dry-run" in sys.argv
    verbose = "--verbose" in sys.argv or dry_run
    force = "--force" in sys.argv

    mode = "FORCE RE-INJECT" if force else ("DRY RUN" if dry_run else "SEO")
    print(f"{mode} Injection: {PROJECT_ROOT}")
    print(f"Domain: {DOMAIN}")
    print()

    html_files = find_html_files()
    print(f"Found {len(html_files)} HTML files\n")

    stats = {"injected": 0, "skipped": 0, "no_title": 0, "no_head": 0,
             "dry_run": 0}

    for filepath in html_files:
        result = inject_seo(filepath, dry_run=dry_run, verbose=verbose,
                            force=force)
        stats[result] = stats.get(result, 0) + 1

    print(f"\n{'=' * 50}")
    print(f"Results:")
    print(f"  Injected:  {stats.get('injected', 0)}")
    print(f"  Skipped:   {stats.get('skipped', 0)} (already processed)")
    print(f"  No title:  {stats.get('no_title', 0)}")
    print(f"  No head:   {stats.get('no_head', 0)}")
    if dry_run:
        print(f"  Dry run:   {stats.get('dry_run', 0)}")
    print(f"{'=' * 50}")


if __name__ == "__main__":
    main()
