# Praxis Project Handoff Document

**Last Updated:** 2026-02-08 (Session 66 — Batch 005 Datasets)
**Last Commit:** `ed93abd` — feat: Batch 005 Datasets — 606 terms added (3,678 total)
**Uncommitted Changes:** None
**Current Phase:** Phase 7 — World Source Archive (Glossary 15K+ Expansion)
**Working Directory:** `C:\Users\basro\Music\PraxisLibrary`

---

## CURRENT STATE

- **Phase 1: Glossary** — COMPLETE (3,072 terms, sharded)
- **Phase 2: Text Frameworks** — COMPLETE (52/52 pages, all 13-section template)
- **Phase 3: Modality Frameworks** — COMPLETE (37/37 pages)
- **Phase 4: Site Integration** — COMPLETE (4/4)
- **Phase 5: Navigation UX** — COMPLETE
- **Phase 6: Prompt Infographic Rollout** — PAUSED (2/108 done: costar + crisp)
- **Phase 7: World Source Archive** — IN PROGRESS (4 batches done, term farming active)
- **Site totals:** 108 framework pages, 3,678 glossary terms (sharded), 149 HTML files, 187 site search entries

---

## ACTIVE WORK: Phase 7 — Term Farming

### Batches Completed

| Batch | Domain | Terms in CSV | Added | Dupes Skipped | Invalid | Commit |
|-------|--------|-------------|-------|---------------|---------|--------|
| 001 | Algorithms | 407 | 216 | 191 | 0 | `e5c7505` |
| 002 | Models | 252 | 150 | 102 | 0 | `c86cc39` |
| 003 | History | 464 | 290 | 174 | 0 | `183fc50` |
| 004 | Safety | 304 | 297 | 7 | 0 | `16a1da6` |
| 005 | Datasets | 634 | 606 | 28 | 0 | `ed93abd` |

**Running total:** 2,141 → 2,357 → 2,335 (post-dedup) → 2,485 → 2,775 → 3,072 → 3,678

### Next Steps (Term Farming)

Goal: 15,000+ verified terms. Current: 3,678. Remaining: ~11,322.

**Next batches (planned order):**
- Batch 006: Hardware (~500 terms) — GPUs, TPUs, chips, infrastructure
- Batch 007+: Second round — Models, Algorithms, General (larger batches to fill gaps)

**Batch workflow:**
```
1. Create seed CSV: glossary_factory/seeds/batch-NNN-domain.csv
2. python glossary_factory/add_terms.py seeds/batch-NNN-domain.csv
3. python glossary_factory/dedup_terms.py  (safety check)
4. python glossary_factory/build_index.py
5. python glossary_factory/validate.py
6. Update term counts in glossary.html + index.html (search for old count, replace)
7. git commit + push
```

---

## Glossary Architecture

```
data/
  glossary/
    manifest.json              # ~3KB — metadata, per-letter counts, domain counts
    search-compact.json        # ~1.3MB — lightweight search index for ALL terms
    a.json through z.json      # Per-letter shards with full definitions
  search-index.json            # ~100KB — site-wide search (NON-glossary entries only)

glossary_factory/              # LOCAL ONLY — not on GitHub
  README.md                    # Pipeline documentation
  migrate.py                   # One-time migration (DONE)
  build_index.py               # Rebuild manifest + search-compact from shards
  validate.py                  # Data integrity checks (9 passes)
  add_terms.py                 # Batch addition from CSV/JSON seeds (ID + name dedup)
  dedup_terms.py               # Remove duplicate term names (keeps longer definition)
  seeds/                       # Seed files for term farming (gitignored)
    batch-001-algorithms.csv   # 407 terms (216 added)
    batch-002-models.csv       # 252 terms (150 added)
    batch-003-history.csv      # 464 terms (290 added)
    batch-004-safety.csv       # 304 terms (297 added)
    batch-005-datasets.csv     # 634 terms (606 added)
```

### Term Domain Taxonomy (7 domains)

| Domain | Count | Target | Description |
|--------|-------|--------|-------------|
| general | 672 | — | Uncategorized terms |
| models | 665 | ~4,000 | Named architectures, model families |
| safety | 503 | ~2,000 | Ethics, alignment, policy, regulation |
| algorithms | 445 | ~3,000 | Math, optimization, algorithmic mechanics |
| history | 442 | ~2,000 | Pre-2010 milestones, pioneers, systems |
| hardware | 226 | ~1,500 | GPUs, TPUs, chips, compute |
| datasets | 725 | ~2,500 | Datasets, benchmarks, evaluation suites |

---

## Git Repository Structure

**Whitelist `.gitignore`** — everything is ignored by default, only these are tracked:

**Tracked on GitHub (public):**
- `assets/`, `data/`, `foundations/`, `learn/`, `neurodivergence/`, `pages/`, `patterns/`, `quiz/`, `tools/`
- `.htaccess`, `app.js`, `favicon.svg`, `index.html`, `LICENSE`, `README.md`, `styles.css`
- `.claude/` (project docs, plans, handoff)
- `.gitignore`

**Local only (not on GitHub):**
- `glossary_factory/` (Python scripts + seeds)
- `CLAUDE.md`, `*.py`, `*.pdf`, build scripts
- `data/infographic-content.json`, `assets/images/Alan Turing.png`

---

## PAUSED: Phase 6 — Prompt Mini Legend Rollout (106 pages remaining)

Prototype: `learn/crisp.html`. See `.claude/plans/infographic-rollout-plan.md` for details.
Progress: 2/108 done (costar + crisp).

---

## PREVIOUS SESSION SUMMARIES

### Session 66 (2026-02-08) — Batch 005 Datasets
- Batch 005 Datasets: 634 CSV terms, 606 added, 28 dupes skipped, 0 invalid
- Coverage: benchmarks, evaluation suites, training corpora, multimodal datasets, code datasets, speech/audio, video, RL environments, medical/scientific, multilingual, fairness/safety benchmarks
- Datasets domain grew from 119 to 725 terms
- Total glossary: 3,678 terms (up from 3,072)

### Session 65 (2026-02-08) — Directory Migration + Batch 004 Safety + Git Cleanup
- Migrated working directory from `_public_html` to `PraxisLibrary`
- Pulled 3 missing commits into PraxisLibrary (fc884b7, 183fc50, 5c95725)
- Batch 004 Safety: 304 CSV terms, 297 added, 7 dupes skipped (`16a1da6`)
- Git cleanup: whitelist gitignore, removed non-public files from tracking
- Seed CSVs removed from GitHub (gitignored), .claude/ re-added to tracking

### Session 64 (2026-02-08) — Term Farming Batches 1-3 + Search Fix + Cache-Busting
- Batch 001 Algorithms: 407 CSV terms, 216 added (`e5c7505`)
- Dedup fix: removed 22 duplicate term names (`96646d4`)
- Batch 002 Models: 252 CSV terms, 150 added (`c86cc39`)
- Search scoring fix for parenthetical terms (`fc884b7`)
- Batch 003 History: 464 CSV terms, 290 added (`183fc50`)
- Cache-busting for glossary fetches (`5c95725`)

### Session 63 (2026-02-08) — Glossary Sharding Architecture
- Created glossary_factory/ with 4 Python scripts
- Migrated 2,141 terms from monolithic glossary.json to 26 alphabetical shards
- Replaced loadGlossaryFromJSON() with GlossaryManager system
- Expanded filter categories 8 to 12
- Split site search: search-index.json (187 entries) + search-compact.json (glossary)

### Sessions 53-62 — See `.claude/COMPLETED.md`

---

## INFO — Optional/Advisory

- CSS ~612KB / JS ~540KB — consider minification for production
- `data/glossary.json` (819KB) is DEPRECATED but kept as backup
- Ghost reference to `learn/advanced.html` in app.js (doesn't exist)
- 4 tools not in mega-menu (bias, jailbreak, specificity, temperature) — linked from tools/index.html

---

## AUDIT RESULTS SUMMARY (Session 54, fully resolved Session 55)

| Phase | Result |
|-------|--------|
| 1. Orphaned Files | 9 DELETED, 3 REVIEW remain |
| 2. Structural Integrity | 145/145 pass |
| 3. Format Consistency | ALL FIXED |
| 4. Navigation & Links | ALL FIXED |
| 5. Content Continuity | All counters accurate |
| 6. Security & CSP | ALL FIXED — A+ rating |
| 7. Accessibility | ALL FIXED |
| 8. Performance | All optimized |

---

## FUTURE WORK

- **Phase 7: Term Farming** — Continue 500-term batches (Datasets → Hardware → round 2) toward 15K goal
- **Phase 6: Prompt Mini Rollout** — PAUSED (106 pages remaining)
- Performance optimization / CSS+JS minification (see `.claude/parkinglot.md`)
- User analytics or feedback mechanisms (see `.claude/parkinglot.md`)
- Additional framework pages for further emerging techniques

---

## KEY REFERENCE DOCUMENTS

| Document | Purpose |
|----------|---------|
| `.claude/HANDOFF.md` | Current state (this file) |
| `.claude/COMPLETED.md` | Archived completed work |
| `.claude/SiteFrameworks.md` | Architecture bible — WHY behind every decision |
| `.claude/testing-procedures.md` | Site Audit playbook (9 phases) |
| `.claude/plans/FrameworkOverhaul.md` | Master plan — Phases 1-7 + session log |
| `.claude/plans/infographic-rollout-plan.md` | Phase 6 original plan (batch approach — ABANDONED) |
| `glossary_factory/README.md` | Glossary build pipeline documentation (local only) |
| `learn/costar.html` | Infographic prototype (`.prompt-infographic` component) |
| `learn/crisp.html` | **Prompt-mini prototype** (`.prompt-mini` component — CURRENT FORMAT) |
| `learn/self-ask.html` | Canonical 13-section template (depth 1) |

---

## CRITICAL RULES - MUST FOLLOW

### 1. Security & CSP Compliance (A+ Rating)
- **NO inline styles** -- Never use `style=""` attributes
- **NO inline scripts** -- Never use `onclick=""`, `onload=""`, or inline `<script>`
- **NO external resources** -- No CDNs, Google Fonts, external APIs
- **All styles -> styles.css** (single file, ~28,600 lines)
- **All scripts -> app.js** (single file with `defer`, ~10,900 lines)

### 2. Content Rules
- **NO citations on framework pages** (per user request, Session 25)
- **NO stat cards** -- Use highlight-box components instead
- **NO content badges** -- Removed from all learn pages (Session 29)
- **NO HR or remote work examples** -- Removed site-wide (Session 37)
- **NO emoji** in code or content (user preference)
- **Historical context notices required** on all framework pages

### 3. Code Notation
```
HTML:  <!-- === SECTION === --> ... <!-- /SECTION -->
CSS:   /* === SECTION === */ ... /* Component ---- */
JS:    // === SECTION === ... /** JSDoc comments */
```

### 4. URL Construction
- **ALWAYS use `resolveInternalUrl()`** for dynamically generated internal links

### 5. Design Preferences (from Session 62 iterations)
- **Light theme** — white backgrounds, not dark
- **Brand colors ONLY** — red (#DC3545), black, gray, dark-red (#A71D2A) — NO rainbow, NO blue/green
- **Compact sizing** — small fonts (0.65-0.8rem), tight padding
- **No cookie-cutter** — each page's prompt-mini should reflect that specific framework's unique components

---

## FILE STRUCTURE

```
PraxisLibrary/
+-- index.html              # Home page (108+ frameworks counter)
+-- styles.css              # ALL CSS (~28,600 lines)
+-- app.js                  # ALL JavaScript (~10,900 lines)
+-- foundations/
|   +-- index.html          # AI Foundations timeline
+-- learn/                  # Framework pages (108) + category pages (8) + hub (1)
|   +-- index.html          # Discover hub (108 framework cards, 13 categories)
|   +-- [7 category pages]  # structured-frameworks, reasoning-cot, etc.
|   +-- [71 text framework pages]
|   +-- modality/
|       +-- index.html      # Modality hub page
|       +-- code/           # Code frameworks (8 pages)
|       +-- image/          # Image frameworks (12 pages)
|       +-- audio/          # Audio frameworks (6 pages)
|       +-- video/          # Video frameworks (6 pages)
|       +-- 3d/             # 3D frameworks (5 pages)
+-- data/
|   +-- glossary.json       # DEPRECATED — monolithic backup (2,141 terms)
|   +-- search-index.json   # 187 site search entries (glossary stripped)
|   +-- glossary/
|       +-- manifest.json       # Metadata, per-letter/domain counts
|       +-- search-compact.json # Lightweight search index (all terms)
|       +-- a.json through z.json  # Per-letter term shards
+-- glossary_factory/       # LOCAL ONLY — Python build pipeline (gitignored)
+-- pages/                  # 12 content pages
+-- tools/                  # 12 AI readiness tools
+-- neurodivergence/        # 6 ND pages
+-- .claude/
    +-- HANDOFF.md           # THIS FILE
    +-- COMPLETED.md         # Archive of all completed work
    +-- SiteFrameworks.md    # Architecture bible (1,200+ lines)
    +-- testing-procedures.md # Site Audit playbook (9 phases)
    +-- parkinglot.md        # Deferred work items
    +-- plans/
        +-- FrameworkOverhaul.md          # Master plan (Phases 1-7)
        +-- infographic-rollout-plan.md   # Phase 6 original plan (ABANDONED)
        +-- discover-hub-category-pages.md # Discover Hub plan (COMPLETE)
```

---

## ARCHITECTURAL NOTES

### resolveInternalUrl() -- Universal Path Resolver (app.js ~471)
```javascript
function resolveInternalUrl(targetPath) {
    if (!targetPath || targetPath.startsWith('http') || targetPath.startsWith('/') ||
        targetPath.startsWith('#') || targetPath.startsWith('mailto:')) {
        return targetPath;
    }
    const pathname = window.location.pathname;
    const segments = pathname.replace(/^\//, '').split('/');
    const depth = Math.max(0, segments.length - 1);
    if (depth === 0) return targetPath;
    return '../'.repeat(depth) + targetPath;
}
```

### Path Depth Reference
| Depth | Directory | Root prefix | Example file |
|-------|-----------|-------------|--------------|
| 0 | Root | (none) | `index.html` |
| 1 | One-deep | `../` | `learn/self-ask.html` |
| 2 | Two-deep | `../../` | `learn/modality/index.html` |
| 3 | Three-deep | `../../../` | `learn/modality/image/image-prompting.html` |

---

*Always read this file first when resuming work. Follow the critical rules exactly. Reference learn/crisp.html as the prototype for the prompt-mini component.*
