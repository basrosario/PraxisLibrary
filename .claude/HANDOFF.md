# Praxis Project Handoff Document

**Last Updated:** 2026-02-05 (Session 26)
**Last Commit:** cb2af07 - fix: Rewrite learn/modality/code/ pages with correct site template
**Current Phase:** Framework Overhaul - Phase 2 MAJOR PROGRESS

---

## CURRENT SESSION STATUS (Session 26)

### Completed This Session
- [x] Created 40+ new framework pages in learn/
- [x] Fixed self-refine.html and self-verification.html templates (were using old incompatible template)
- [x] Updated mega menu navigation across 99+ HTML files
- [x] Rewrote learn/modality/code/ pages with correct site template structure
- [x] Two successful git pushes (mega menu update, code folder fix)

### New Framework Pages Created (40+)
All pages follow site template with page-hero, pillar-cards, accordions, highlight-boxes:

**Advanced Frameworks:**
- decomp.html (Decomposed Prompting)
- graph-of-thought.html
- program-of-thought.html
- self-ask.html
- analogical-reasoning.html
- step-back.html

**Self-Correction:**
- chain-of-verification.html
- critic.html
- reflexion.html
- self-calibration.html

**Example Selection:**
- knn-prompting.html
- vote-k.html
- demo-ensembling.html
- active-prompting.html
- max-mutual-info.html

**CoT Variants:**
- thread-of-thought.html
- tab-cot.html
- complexity-prompting.html
- memory-of-thought.html
- meta-reasoning.html
- diverse-prompting.html
- contrastive-cot.html
- structured-cot.html
- reversing-cot.html
- faithful-cot.html
- recursion-of-thought.html
- cumulative-reasoning.html

**Other:**
- s2a.html (System 2 Attention)
- simtom.html (SimToM)
- re2.html (Re-Reading)
- prompt-mining.html
- universal-self-consistency.html
- cosp.html
- dense-prompting.html

### Mega Menu Navigation Update
Updated across 99+ HTML files with new structure:
```
Learn
├── Getting Started (2)
├── Frameworks (17 core)
├── Advanced (12 pages)
├── Self-Correction (4 pages)
└── Code (3 pages)
```

### Template Fixes Applied
- self-refine.html - Rewrote from old template to page-hero structure
- self-verification.html - Rewrote from old template to page-hero structure
- learn/modality/code/*.html - All 3 pages rewritten with correct site template

---

## ACTIVE PROJECT: Framework Overhaul

**Master Plan:** `.claude/plans/FrameworkOverhaul.md`

**Overall Scope:**
- ✅ 33 glossary terms (Phase 1 COMPLETE)
- ✅ 52+ text framework pages (Phase 2 MAJOR PROGRESS - 40+ created this session)
- ⬜ 37 modality framework pages (Phase 3)
- ✅ Navigation updates (Phase 4)
- ✅ Navigation UX overhaul (Phase 5 COMPLETE)

### Phase 2 Progress: Text Frameworks
```
Progress: [████████████████████] ~80%
```

**Remaining pages to verify/create:**
- May need zero-shot.html page review
- Check for any missing framework pages against master list

### Immediate Next Steps (Resume Here)
1. Verify all framework pages are working correctly
2. Review any remaining pages from Phase 2 list
3. Proceed to Phase 3: Modality Frameworks if Phase 2 complete

---

## CRITICAL RULES - MUST FOLLOW

### 1. Security & CSP Compliance (A+ Rating)

**NEVER violate these rules:**
- **NO inline styles** - Never use `style=""` attributes
- **NO inline scripts** - Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** - No CDNs, Google Fonts, external APIs
- **All styles → styles.css** (single file)
- **All scripts → app.js** (single file with `defer`)

### 2. Citations (USER PREFERENCE)
- **NO CITATIONS ON FRAMEWORK PAGES** (per user request)
- Will be added later if needed

### 3. NO Stat Cards
- Use highlight-box components instead of stat cards with percentages

### 4. Code Notation
```
HTML:  <!-- === SECTION === --> ... <!-- /SECTION -->
CSS:   /* === SECTION === */ ... /* Component ---- */
JS:    // === SECTION === ... /** JSDoc comments */
```

---

## FILE STRUCTURE

```
_public_html/
├── index.html              # Home page
├── styles.css              # ALL styles (single file)
├── app.js                  # ALL JavaScript (single file)
├── learn/                  # Framework pages (40+ new)
│   ├── [all framework pages]
│   └── modality/
│       └── code/           # Code frameworks
│           ├── code-prompting.html
│           ├── self-debugging.html
│           └── structured-output.html
├── data/
│   ├── glossary.json       # 33 prompting terms
│   └── search-index.json   # Site search data
└── .claude/
    ├── HANDOFF.md          # THIS FILE
    ├── COMPLETED.md        # Archived completed tasks
    └── plans/
        └── FrameworkOverhaul.md  # Master plan with session logs
```

---

## INTERACTIVE COMPONENTS AVAILABLE

| Component | CSS Class | Use For |
|-----------|-----------|---------|
| Tabbed comparisons | `.comparison-tabs` | Before/after demos |
| Accordions | `.accordion` | Expandable examples |
| Feature lists | `.feature-list` | Benefits with checkmarks |
| Highlight boxes | `.highlight-box` | Important callouts |
| Pillar cards | `.pillar-card` | Card grids |
| Icon boxes | `.icon-box` | Related frameworks |
| Split sections | `.split-section` | Two-column layouts |

---

## REFERENCE

| Document | Purpose |
|----------|---------|
| `.claude/HANDOFF.md` | Current state (this file) |
| `.claude/plans/FrameworkOverhaul.md` | Master plan with full session logs |
| `learn/chain-of-thought.html` | Reference template for interactive pages |

---

*Always read this file first when resuming work. Update FrameworkOverhaul.md frequently.*
