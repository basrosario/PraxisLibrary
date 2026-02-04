# Content Cleanup Handoff

**Created:** 2026-02-03
**Status:** COMPLETE
**Purpose:** Remove all unverified statistics and generic source citations

---

## Summary

**Task:** Remove 150 unverified statistics across 23 pages and replace with qualitative placeholders.

**Result:** All 23 pages cleaned. Statistics replaced with qualitative words, source sections replaced with placeholder message.

---

## What Was Done

### All Pages Cleaned (23 of 23):

| Page | Changes Made |
|------|-------------|
| learn/react.html | Stat cards → qualitative |
| learn/flipped-interaction.html | Stat cards → qualitative |
| learn/advanced.html | Stat cards + inline text → qualitative |
| patterns/index.html | Stat cards + inline citations + sources → qualitative/placeholder |
| tools/checklist.html | Stat cards + sources → qualitative/placeholder |
| tools/hallucination.html | Stat cards + sources → qualitative/placeholder |
| pages/faq.html | Stat cards + inline citations + sources → qualitative/placeholder |
| pages/ai-safety.html | Stat cards + sources → qualitative/placeholder |
| pages/ai-for-everybody.html | Stat cards + inline + sources → qualitative/placeholder |
| learn/crisp.html | Stats highlight + sources → qualitative/placeholder |
| learn/prompt-basics.html | Stats highlight + sources → qualitative/placeholder |
| learn/crispe.html | Stats highlight + sources → qualitative/placeholder (KEPT arXiv link) |
| learn/costar.html | Stats highlight + sources → qualitative/placeholder |
| neurodivergence/adhd.html | Stat cards + sources → qualitative/placeholder |
| neurodivergence/dyslexia.html | Stat cards + sources → qualitative/placeholder |
| neurodivergence/autism.html | Stat cards + sources → qualitative/placeholder |
| neurodivergence/index.html | Sources → placeholder |
| neurodivergence/resources.html | Inline stats in descriptions → qualitative |
| pages/chatgpt-guide.html | Stat cards + inline citations + sources → qualitative/placeholder |
| pages/security.html | Sources → placeholder (kept resource links) |
| pages/performance.html | Sources → placeholder |
| pages/universal-design.html | Sources → placeholder |
| pages/ai-assisted-building.html | Inline citations + sources → qualitative/placeholder |

### CSS Added:
- `.sources-updating` class added to styles.css for placeholder styling

### Valid Source Preserved:
- **learn/crispe.html** - arXiv link `arxiv.org/abs/2005.14165` kept (valid direct paper link)

---

## Replacement Patterns Used

### For Stat Numbers:
| Original | Replacement |
|----------|-------------|
| 67% | Significant / Major |
| 40% | Higher / Better |
| 3x, 2.5x | Much / Dramatically |
| 15-25% | Common |
| 73%, 81%, 89% | Most / Often |
| 2-5 examples | Optimal / Few |

### For Sources Sections:
```html
<section class="section citations-section">
    <div class="container">
        <p class="sources-updating">We're updating our sources to meet our quality standards. Verified citations coming soon.</p>
    </div>
</section>
```

### For Inline Citations:
- Removed `<sup>1</sup>` and `<span class="inline-citation">[1]</span>` references
- Rewrote sentences to make claims general rather than citing specific research

---

## Files Modified

**HTML Files (23):**
- learn/react.html
- learn/flipped-interaction.html
- learn/advanced.html
- learn/crisp.html
- learn/prompt-basics.html
- learn/crispe.html
- learn/costar.html
- patterns/index.html
- tools/checklist.html
- tools/hallucination.html
- pages/faq.html
- pages/ai-safety.html
- pages/ai-for-everybody.html
- pages/chatgpt-guide.html
- pages/security.html
- pages/performance.html
- pages/universal-design.html
- pages/ai-assisted-building.html
- neurodivergence/adhd.html
- neurodivergence/dyslexia.html
- neurodivergence/autism.html
- neurodivergence/index.html
- neurodivergence/resources.html

**CSS File:**
- styles.css (added `.sources-updating` class)

---

## Next Steps (If Needed)

If verified sources are later obtained:
1. Replace placeholder message with actual citations
2. Add back specific statistics with proper direct links
3. Follow the format: direct links to specific articles/papers, not generic domain pages

---

*Completed: 2026-02-03*
