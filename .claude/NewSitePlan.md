# Praxis Library - Comprehensive Site Expansion Plan

**Version:** 1.1
**Created:** February 2, 2026
**Updated:** February 2, 2026
**Vision:** Single source of AI knowledge with UDL/Accessibility-first design

---

## Deployment

**GitHub Repository:** https://github.com/basrosario/PROMPTLIBRARY
**Hostinger Auto-Deploy Webhook:** `https://webhooks.hostinger.com/deploy/a800287e8398fcef287424aceb309303`

Pushes to `main` branch automatically trigger deployment via GitHub webhook.

---

## Porto-Style Corporate Redesign Progress

### Completed Hub Pages ✅

| Page | Status | Design Elements Used |
|------|--------|---------------------|
| **Homepage** (index.html) | ✅ Complete | Counter grid, icon boxes (2-col & 3-col), split section with feature list, horizontal timeline, gradient CTA with neural bg |
| **Learn Hub** (learn/index.html) | ✅ Complete | Vertical timeline with progress bars, comparison table, notice box, horizontal icon boxes, dark CTA with neural bg |
| **Tools Hub** (tools/index.html) | ✅ Complete | Counter grid, split section with feature list + 2x2 icon grid, tabbed content (4 tabs), horizontal process steps, icon features row, dark CTA with neural bg |

### Design Component Library (Added to styles.css)

**Layout Components:**
- `.counter-grid` / `.counter-box` - Animated statistics (4-column grid)
- `.split-section` - Two-column content + media layouts
- `.icon-boxes` - Card grids (2-col, 3-col variants)
- `.content-tabs` - Tabbed content panels with icons
- `.icon-grid-2x2` - 2x2 visual icon grid
- `.process-steps` - Horizontal connected steps
- `.timeline` / `.timeline--vertical` - Learning path timelines
- `.comparison-table` - Framework comparison tables

**Feature Components:**
- `.feature-list` / `.feature-list--check` - Checkmark feature lists
- `.icon-feature--horizontal` - Horizontal icon + content cards
- `.tab-tool-card` - Tool cards for tabbed content
- `.notice-box` - Highlighted callout boxes

**CTA Components:**
- `.cta-corporate--dark` - Dark CTA with neural canvas background (STANDARD)
- `.cta-corporate--gradient` - Gradient background variant
- Red primary button + grey secondary button pattern

### Design Principles Established

1. **No Two Pages Same** - Each hub uses unique component combinations
2. **Engagement + Interactivity Balance:**
   - Engaging: Counters, timelines, split sections, icon grids
   - Interactive: Tabs, comparison tables, process steps, search
3. **Consistent CTA Style** - Dark neural background with red/grey buttons
4. **Porto Aesthetic** - Clean, professional, corporate feel
5. **Progressive Disclosure** - Content organized in digestible sections

### Next Pages to Redesign

| Page | Priority | Suggested Unique Elements |
|------|----------|--------------------------|
| **Foundations Hub** | High | Learning path quiz, building blocks visual, prerequisite badges |
| **Framework Pages** (CRISP, CRISPE, etc.) | High | Each needs unique layout - flip cards, before/after, role galleries |

---

## Source Citation Policy (STRICT)

**Approved Sources ONLY:**
- `.edu` domains (Stanford, MIT, Harvard, CMU, etc.)
- `.gov` domains (NIH, NSF, NIST, ED.gov, etc.)
- Peer-reviewed journals with DOI
- Official AI company documentation (anthropic.com, openai.com)

**NEVER USE:**
- Fabricated quotes or statistics
- Blog posts, Medium articles, social media
- News articles without primary source
- Anything older than 2024

**If a verifiable source cannot be found, DO NOT include the quote/statistic.**

---

## Navigation Restructure

### Current Structure
```
Learn (single dropdown)
├── Prompt Basics
├── CRISP
├── CRISPE
├── COSTAR
├── ReAct
├── Flipped Interaction
└── Advanced
```

### New Structure (Multiple Top-Level Sections)
```
Foundations          Techniques           Modern Methods        Applied AI
├── Prompt Basics    ├── ReAct            ├── XML Containers    ├── Implementation
├── CRISP            ├── Chain of         ├── Reflection        ├── Ethics & Safety
├── CRISPE           │   Thought          │   Patterns          ├── Creativity
├── COSTAR           ├── Few-Shot         ├── Meta-Prompting    ├── Accessibility
└── Context &        │   Learning         ├── Structured        └── Case Studies
    Structure        ├── Flipped          │   Output
                     │   Interaction      └── Agentic
                     └── Iteration &          Workflows
                         Refinement
```

---

## Phase 1: Foundation Pages (Enhance Existing)

### 1.1 Prompt Basics (prompt-basics.html)
**Status:** Exists - Enhance with historical context

**Unique Design Elements:**
- **Interactive Timeline:** Visual history of prompt engineering (2020-2026)
- **"First Prompt" Simulator:** Live demo showing how the same question gets different results with different prompting approaches
- **Progressive Disclosure Cards:** Click to reveal deeper explanations
- **Animated Concept Diagrams:** Show how prompts flow through AI systems

**Content Sections:**
1. What is a Prompt? (exists - enhance with animation)
2. The AI Communication Model (new - visual diagram)
3. **Historical Context Block:** "The Early Days" - brief history
4. The Five Elements (Context, Task, Format, Tone, Constraints)
5. Natural vs. Labeled Formats (exists)
6. The Iteration Mindset (exists)
7. **Evolution Callout:** "Where This Led" - bridge to Techniques

**Pull Quote Source:** Must find verifiable .edu source on prompt effectiveness

---

### 1.2 CRISP Method (crisp.html)
**Status:** Exists - Add historical framing

**Unique Design Elements:**
- **"Building Blocks" Visual:** 3D-style stacking blocks showing how elements combine
- **Before/After Showcase:** Side-by-side comparisons with quality meters
- **Interactive Prompt Builder:** (exists) - enhance with hints
- **"Why This Works" Science Box:** Brief cognitive science explanation

**Content Sections:**
1. Introduction with Historical Context
2. The Acronym Visual (exists - keep flip cards)
3. **New: "The Science of Structure"** - Why frameworks help cognition
4. Each Letter Deep Dive (exists)
5. Prompt Builder (exists)
6. **New: "When to Use CRISP"** - Use case guidance
7. **Evolution Callout:** Links to CRISPE as extension

**Historical Framing Text:**
> "CRISP emerged as one of the first widely-adopted structured frameworks for prompt engineering, providing a memorable checklist that helps users include essential elements. While modern AI systems have become more intuitive, understanding these building blocks remains valuable for deliberate, high-quality prompting."

---

### 1.3 CRISPE Method (crispe.html)
**Status:** Exists - Add few-shot learning depth

**Unique Design Elements:**
- **"Extension" Visual:** Shows CRISP → CRISPE evolution
- **Role Gallery:** Visual showcase of different persona types
- **Example Patterns Library:** Expandable examples by use case
- **Few-Shot Learning Explainer:** Animated diagram

**Content Sections:**
1. Introduction: "Building on CRISP"
2. The Six Elements (exists - flip cards)
3. **New: "The Power of Role"** - Deep dive on persona assignment
4. **New: "Few-Shot Learning Explained"** - How examples teach AI
5. Example Patterns (categorized by task type)
6. Prompt Builder (exists)
7. **When to Add Role & Examples:** Decision guide

---

### 1.4 COSTAR Method (costar.html)
**Status:** Exists - Emphasize audience awareness

**Unique Design Elements:**
- **Audience Persona Cards:** Visual representation of different audiences
- **Style Spectrum Slider:** Shows how style affects output
- **Tone Matrix:** Grid showing tone × audience combinations
- **Output Comparison Gallery:** Same prompt, different COSTAR settings

**Content Sections:**
1. Introduction: "Audience-Aware Prompting"
2. The Six Elements (exists)
3. **New: "The Audience Factor"** - Why audience matters
4. **New: "Style & Tone Deep Dive"** - Practical examples
5. Prompt Builder (exists)
6. **Comparison: CRISP vs CRISPE vs COSTAR** - When to use each

---

### 1.5 NEW: Context & Structure (context-structure.html)
**Purpose:** Bridge page introducing modern structuring concepts

**Unique Design Elements:**
- **Context Window Visualizer:** Shows how much "fits" in different models
- **Structure Comparison:** Paragraph vs. Labeled vs. XML side-by-side
- **"Cognitive Load" Meter:** Visual showing how structure reduces complexity
- **Interactive Structuring Tool:** Convert messy prompt to structured

**Content Sections:**
1. "From Frameworks to Flow" - Evolution narrative
2. Understanding Context Windows
3. Why Structure Matters (cognitive science)
4. Structuring Approaches Compared
5. Introduction to XML Tags (preview of Modern Methods)
6. When Structure Helps vs. Hinders

---

## Phase 2: Technique Pages (Enhance + New)

### 2.1 ReAct Method (react.html)
**Status:** Exists - Add modern context

**Unique Design Elements:**
- **Animated Reasoning Loop:** Visual showing Think → Act → Observe cycle
- **Transparency Showcase:** Show AI's "thinking" in real examples
- **"Under the Hood" Diagrams:** How modern models internalize this
- **Debug Mode Example:** Using ReAct for troubleshooting

**Content Sections:**
1. Introduction: "Transparent Reasoning"
2. The ReAct Loop (exists - enhance animation)
3. **New: "Historical Context"** - 2022 paper, evolution since
4. **New: "Modern Models & ReAct"** - When it's automatic vs. manual
5. Practical Applications (debugging, research, verification)
6. **When to Use Explicit ReAct:** Decision guide

**Historical Framing:**
> "The ReAct framework, introduced in 2022, formalized the reasoning-action loop that helps AI systems solve complex problems transparently. While 2025-2026 models often internalize this process, understanding ReAct remains valuable for debugging, verification, and working with systems that benefit from explicit reasoning traces."

---

### 2.2 Chain of Thought (chain-of-thought.html)
**Status:** NEW PAGE

**Unique Design Elements:**
- **Step-by-Step Visualizer:** Animated breakdown of reasoning chains
- **Complexity Meter:** Shows when CoT helps most
- **Math/Logic Showcase:** Problems that benefit from CoT
- **"Let's Think" Variations:** Different phrasings and their effects

**Content Sections:**
1. What is Chain of Thought?
2. The Science: Why Breaking Down Helps
3. **Visual: Simple vs. Complex Problems**
4. CoT Trigger Phrases (with examples)
5. **When CoT Helps vs. Hurts** (reasoning models caveat)
6. Practical Applications Grid
7. **Modern Context:** "Built-in" reasoning in 2025+ models

---

### 2.3 Few-Shot Learning (few-shot.html)
**Status:** NEW PAGE

**Unique Design Elements:**
- **Example Pattern Gallery:** Visual library of example formats
- **"Learning by Example" Animation:** Shows how AI extracts patterns
- **Quality Meter:** Good vs. bad examples comparison
- **Example Builder Tool:** Create few-shot prompts interactively

**Content Sections:**
1. What is Few-Shot Learning?
2. Zero-Shot vs. One-Shot vs. Few-Shot (visual comparison)
3. **Anatomy of a Good Example**
4. Example Patterns by Task Type:
   - Classification examples
   - Transformation examples
   - Generation examples
   - Analysis examples
5. **Common Mistakes:** Anti-patterns to avoid
6. Interactive Example Builder
7. **Modern Context:** When few-shot is still essential

---

### 2.4 Flipped Interaction (flipped-interaction.html)
**Status:** Exists - Enhance with scenarios

**Unique Design Elements:**
- **Role Reversal Animation:** Visual showing human → AI → human flow
- **Scenario Cards:** Different contexts where flipping helps
- **Question Quality Showcase:** How AI questions improve outcomes
- **Conversation Flow Diagrams:** Compare traditional vs. flipped

**Content Sections:**
1. The Flipped Paradigm (exists - enhance)
2. **New: "When to Flip"** - Scenario guide with cards
3. **New: "Question Quality"** - What makes AI questions effective
4. Implementation Guide (exists)
5. **Advanced: Structured Interviews** - Complex flipped workflows
6. Practice Scenarios

---

### 2.5 Iteration & Refinement (iteration.html)
**Status:** NEW PAGE (extracted from Advanced)

**Unique Design Elements:**
- **Refinement Journey Map:** Visual progression through iterations
- **"Delta" Showcases:** Show what changed between versions
- **Feedback Loop Diagram:** Visual of iterative improvement
- **Version Comparison Tool:** Side-by-side iteration viewer

**Content Sections:**
1. The Iteration Mindset
2. **When to Iterate vs. Start Fresh**
3. Types of Refinement:
   - Clarification iterations
   - Scope iterations
   - Style iterations
   - Correction iterations
4. **Feedback Patterns:** How to guide AI improvement
5. Knowing When to Stop
6. **Bridge:** Introduction to Reflection Patterns

---

## Phase 3: Modern Methods (New Section)

### 3.1 XML Containerization (xml-containers.html)
**Status:** NEW PAGE

**Unique Design Elements:**
- **Tag Builder Interface:** Drag-and-drop XML structure builder
- **Parsing Visualization:** Animation showing how AI reads tagged content
- **Before/After Showcase:** Paragraph vs. XML comparison
- **Template Library:** Common XML patterns by use case

**Content Sections:**
1. Why Structure Matters (More Than Ever)
2. **XML Basics for Prompting** - Not programming, just organization
3. Common Tags and Their Uses:
   - `<context>`, `<task>`, `<rules>`
   - `<examples>`, `<format>`, `<constraints>`
4. **Visual: How AI Parses Structure**
5. Interactive Tag Builder
6. Template Library (expandable)
7. **When NOT to Use XML** - Simplicity guidelines

---

### 3.2 Reflection Patterns (reflection-patterns.html)
**Status:** NEW PAGE

**Unique Design Elements:**
- **Critic Loop Animation:** Visual showing create → critique → revise
- **Persona Switching Diagram:** Writer vs. Editor vs. Fact-checker
- **Quality Improvement Meter:** Shows iteration improvements
- **Pattern Cards:** Different reflection approaches

**Content Sections:**
1. The Power of Self-Critique
2. **The Basic Pattern:** Draft → Critique → Revise
3. Reflection Personas:
   - The Critic (find flaws)
   - The Editor (improve clarity)
   - The Fact-Checker (verify claims)
   - The Devil's Advocate (challenge assumptions)
4. **Implementation Examples** by task type
5. Multi-Pass Refinement Workflows
6. **When to Stop Reflecting** - Diminishing returns

---

### 3.3 Meta-Prompting (meta-prompting.html)
**Status:** NEW PAGE

**Unique Design Elements:**
- **Inception Visualization:** "Prompt about prompts" concept
- **Quality Comparison:** Human-written vs. AI-optimized prompts
- **Workflow Diagram:** The meta-prompting process
- **Optimization Showcase:** Watch a prompt improve

**Content Sections:**
1. What is Meta-Prompting?
2. **The Core Insight:** AI is better at writing prompts than humans
3. The Meta-Prompting Workflow:
   - Write rough requirements
   - Ask AI to create optimized prompt
   - Test and refine
4. **Use Cases:**
   - System prompt optimization
   - Template creation
   - Prompt debugging
5. **Caution:** When to trust AI's prompt suggestions
6. Interactive Meta-Prompt Generator

---

### 3.4 Structured Output (structured-output.html)
**Status:** NEW PAGE

**Unique Design Elements:**
- **Format Gallery:** Visual showcase of output formats
- **Schema Builder:** Interactive JSON/table structure creator
- **Parsing Visualization:** How structured output enables automation
- **Integration Diagrams:** Connect AI output to other tools

**Content Sections:**
1. Beyond Conversation: Data-Ready Output
2. **Output Formats Compared:**
   - JSON (when and why)
   - Markdown tables
   - CSV format
   - Bullet structures
3. **Defining Schemas:** Tell AI exactly what to produce
4. Interactive Schema Builder
5. **Common Use Cases:**
   - Data extraction
   - Report generation
   - API-ready responses
6. **Error Handling:** When output doesn't match schema

---

### 3.5 Agentic Workflows (agentic-workflows.html)
**Status:** NEW PAGE

**Unique Design Elements:**
- **Agent Architecture Diagrams:** Visual system designs
- **Workflow Builder:** Interactive agentic pattern creator
- **Autonomy Spectrum:** Manual → Assisted → Autonomous visual
- **Case Study Cards:** Real agentic implementations

**Content Sections:**
1. What Makes AI "Agentic"?
2. **The Autonomy Spectrum:** From tool to agent
3. Core Agentic Patterns:
   - Planning agents
   - Tool-using agents
   - Multi-agent systems
4. **Building Blocks:**
   - Goals and constraints
   - Tool definitions
   - Feedback loops
5. **Safety Considerations:** Guardrails and oversight
6. **Current Landscape:** What's possible in 2026
7. **Hands-On:** Design your first agentic workflow

---

## Phase 4: Applied AI (New Section)

### 4.1 Implementation Guide (implementation.html)
**Status:** NEW PAGE

**Unique Design Elements:**
- **Readiness Assessment:** Interactive checklist with scoring
- **Integration Roadmap:** Visual pathway from experimentation to production
- **Tool Comparison Matrix:** Interactive filterable table
- **ROI Calculator:** Simple impact estimation tool

**Content Sections:**
1. Getting Started: First Steps
2. **Readiness Assessment:** Are you ready? (interactive)
3. Workflow Analysis: Where AI Fits
4. **Tool Selection Guide:**
   - By task type
   - By budget
   - By technical skill
5. **Integration Patterns:**
   - Augmentation (human + AI)
   - Automation (AI handles it)
   - Assistance (AI supports)
6. **Team Adoption:**
   - Training approaches
   - Change management
   - Success metrics
7. **Case Studies:** Real implementation stories

---

### 4.2 Ethics & Safety (ethics.html)
**Status:** NEW PAGE

**Unique Design Elements:**
- **Ethical Decision Tree:** Interactive scenario navigator
- **Bias Visualization:** Show how bias manifests
- **Transparency Checklist:** Interactive disclosure guide
- **Impact Assessment Tool:** Evaluate ethical implications

**Content Sections:**
1. The Responsibility of AI Use
2. **Understanding Bias:**
   - Training data bias
   - Prompt bias
   - Output bias
   - Mitigation strategies
3. **Privacy Considerations:**
   - What data goes in?
   - What data comes out?
   - Organizational policies
4. **Transparency & Disclosure:**
   - When to disclose AI use
   - How to disclose effectively
   - Industry standards
5. **Environmental Impact:** Computational costs
6. **The Human in the Loop:** Maintaining agency
7. **Ethical Decision Framework:** Interactive guide

---

### 4.3 AI for Creativity (creativity.html)
**Status:** NEW PAGE

**Unique Design Elements:**
- **Creative Partnership Model:** Visual collaboration framework
- **Ideation Tools:** Interactive brainstorming interfaces
- **Style Exploration Gallery:** Visual creative variations
- **Human + AI Showcase:** Side-by-side collaborations

**Content Sections:**
1. AI as Creative Partner, Not Replacement
2. **The Collaboration Spectrum:**
   - AI as brainstorm buddy
   - AI as first draft generator
   - AI as editor/refiner
   - AI as style explorer
3. **Creative Domains:**
   - Writing & Storytelling
   - Visual Thinking & Description
   - Problem Solving & Ideation
   - Learning & Explanation
4. **Maintaining Your Voice:** Authenticity in AI-assisted work
5. **The Iteration Dance:** Creative back-and-forth
6. **When NOT to Use AI:** Preserving human creativity
7. **Interactive:** Creative collaboration exercise

---

### 4.4 Accessibility & AI (accessibility-ai.html)
**Status:** NEW PAGE - Connects to Neurodivergent section

**Unique Design Elements:**
- **Accessibility Needs Matrix:** Visual mapping of needs to tools
- **Assistive AI Showcase:** Tools and techniques by need
- **UDL Integration Diagram:** How AI supports universal design
- **Personal Configuration Guide:** Interactive setup wizard

**Content Sections:**
1. AI as Accessibility Technology
2. **By Need:**
   - Reading & Processing (dyslexia, ADHD)
   - Writing & Expression (various)
   - Organization & Planning (executive function)
   - Communication (social, language)
   - Sensory (visual, auditory)
3. **UDL Principles with AI:**
   - Multiple means of engagement
   - Multiple means of representation
   - Multiple means of action/expression
4. **Tool Recommendations:** By accessibility need
5. **Customization Guide:** Tailoring AI to your needs
6. **Connection:** Link to full Neurodivergent Resource Center
7. **Advocacy:** Using AI for accessibility advocacy

---

### 4.5 Case Studies (case-studies.html)
**Status:** NEW PAGE

**Unique Design Elements:**
- **Industry Filter:** Browse by sector
- **Outcome Metrics:** Visual results displays
- **Before/After Showcases:** Transformation stories
- **Lesson Extracts:** Key takeaways highlighted

**Content Sections:**
1. Learning from Real Applications
2. **Case Study Format:** (consistent structure)
   - Context & Challenge
   - Approach & Methods Used
   - Implementation
   - Results & Metrics
   - Lessons Learned
   - Try It Yourself (actionable prompt)
3. **Categories:**
   - Education & Learning
   - Business & Productivity
   - Creative & Content
   - Research & Analysis
   - Accessibility & Inclusion
4. **Submit Your Story:** Community contribution invite

---

## Phase 5: Navigation & Integration

### 5.1 Mega-Menu Redesign
```html
<nav class="main-nav">
  <!-- Foundations Dropdown -->
  <div class="nav-item has-dropdown">
    <a href="foundations/index.html">Foundations</a>
    <div class="mega-menu">
      <div class="mega-menu-section">
        <h4>Learn the Basics</h4>
        <p class="mega-menu-desc">Essential frameworks for effective AI communication</p>
        <a href="foundations/prompt-basics.html">Prompt Basics</a>
        <a href="foundations/crisp.html">CRISP Method</a>
        <a href="foundations/crispe.html">CRISPE Method</a>
        <a href="foundations/costar.html">COSTAR Method</a>
        <a href="foundations/context-structure.html">Context & Structure</a>
      </div>
    </div>
  </div>

  <!-- Techniques Dropdown -->
  <div class="nav-item has-dropdown">
    <a href="techniques/index.html">Techniques</a>
    <div class="mega-menu">
      <div class="mega-menu-section">
        <h4>Build Your Skills</h4>
        <p class="mega-menu-desc">Practical methods for better results</p>
        <a href="techniques/react.html">ReAct Method</a>
        <a href="techniques/chain-of-thought.html">Chain of Thought</a>
        <a href="techniques/few-shot.html">Few-Shot Learning</a>
        <a href="techniques/flipped-interaction.html">Flipped Interaction</a>
        <a href="techniques/iteration.html">Iteration & Refinement</a>
      </div>
    </div>
  </div>

  <!-- Modern Methods Dropdown -->
  <div class="nav-item has-dropdown">
    <a href="modern/index.html">Modern Methods</a>
    <div class="mega-menu">
      <div class="mega-menu-section">
        <h4>Current Techniques</h4>
        <p class="mega-menu-desc">2025-2026 state of the art</p>
        <a href="modern/xml-containers.html">XML Containerization</a>
        <a href="modern/reflection-patterns.html">Reflection Patterns</a>
        <a href="modern/meta-prompting.html">Meta-Prompting</a>
        <a href="modern/structured-output.html">Structured Output</a>
        <a href="modern/agentic-workflows.html">Agentic Workflows</a>
      </div>
    </div>
  </div>

  <!-- Applied AI Dropdown -->
  <div class="nav-item has-dropdown">
    <a href="applied/index.html">Applied AI</a>
    <div class="mega-menu">
      <div class="mega-menu-section">
        <h4>Real-World Application</h4>
        <p class="mega-menu-desc">Put knowledge into practice</p>
        <a href="applied/implementation.html">Implementation Guide</a>
        <a href="applied/ethics.html">Ethics & Safety</a>
        <a href="applied/creativity.html">AI for Creativity</a>
        <a href="applied/accessibility-ai.html">Accessibility & AI</a>
        <a href="applied/case-studies.html">Case Studies</a>
      </div>
    </div>
  </div>
</nav>
```

### 5.2 Directory Structure
```
_public_html/
├── foundations/
│   ├── index.html
│   ├── prompt-basics.html (moved from learn/)
│   ├── crisp.html (moved from learn/)
│   ├── crispe.html (moved from learn/)
│   ├── costar.html (moved from learn/)
│   └── context-structure.html (NEW)
├── techniques/
│   ├── index.html
│   ├── react.html (moved from learn/)
│   ├── chain-of-thought.html (NEW)
│   ├── few-shot.html (NEW)
│   ├── flipped-interaction.html (moved from learn/)
│   └── iteration.html (NEW - extracted from advanced)
├── modern/
│   ├── index.html
│   ├── xml-containers.html (NEW)
│   ├── reflection-patterns.html (NEW)
│   ├── meta-prompting.html (NEW)
│   ├── structured-output.html (NEW)
│   └── agentic-workflows.html (NEW)
├── applied/
│   ├── index.html
│   ├── implementation.html (NEW)
│   ├── ethics.html (NEW)
│   ├── creativity.html (NEW)
│   ├── accessibility-ai.html (NEW)
│   └── case-studies.html (NEW)
├── tools/ (existing - keep)
├── neurodivergence/ (existing - keep)
├── pages/ (existing - keep)
└── learn/ (DEPRECATED - redirect to foundations/)
```

---

## Phase 6: Index Pages (Section Hubs)

### 6.1 Foundations Index (foundations/index.html)
**Design Concept:** "The Starting Line"

**Unique Elements:**
- Hero with animated "building blocks" visual
- Learning path recommendation quiz
- Card grid showing progression
- "Start Here" prominent CTA

**Sections:**
1. Hero: "Master the Fundamentals"
2. Why Foundations Matter (brief)
3. **Learning Path Quiz:** "Which foundation should you start with?"
4. **Method Cards:** 5 cards with preview and difficulty indicator
5. **Progression Map:** Visual showing how foundations connect
6. **Next Steps:** Bridge to Techniques

---

### 6.2 Techniques Index (techniques/index.html)
**Design Concept:** "The Workshop"

**Unique Elements:**
- Interactive technique selector by goal
- Skill-building progression tracker
- Comparison matrix
- Practice challenge cards

**Sections:**
1. Hero: "Build Your Skills"
2. **Goal-Based Navigator:** "I want to..." selector
3. **Technique Cards:** 5 cards with use-case tags
4. **Comparison Matrix:** When to use which technique
5. **Practice Challenges:** Mini-exercises
6. **Ready for More:** Bridge to Modern Methods

---

### 6.3 Modern Methods Index (modern/index.html)
**Design Concept:** "The Frontier"

**Unique Elements:**
- Timeline showing evolution from foundations
- "What's New" highlight cards
- Model compatibility indicators
- Trend indicators

**Sections:**
1. Hero: "The Cutting Edge"
2. **Evolution Timeline:** Foundations → Techniques → Modern
3. **Method Cards:** 5 cards with "new in 2025/2026" badges
4. **Model Compatibility:** Which methods work with which AI
5. **Prerequisites:** What to know before diving in
6. **Integration:** How modern methods combine with foundations

---

### 6.4 Applied AI Index (applied/index.html)
**Design Concept:** "The Launchpad"

**Unique Elements:**
- Role-based pathway selector
- Industry/domain filter
- Readiness checklist
- Success metrics preview

**Sections:**
1. Hero: "Put It Into Practice"
2. **Who Are You?** Role-based navigation
3. **Domain Cards:** 5 application areas
4. **Readiness Check:** Quick self-assessment
5. **Success Stories:** Featured case studies
6. **Get Started:** Clear CTAs per role

---

## Phase 7: CSS Components (New)

### 7.1 Historical Context Components
```css
.historical-context { }
.historical-context-badge { } /* "Est. 2023" style badges */
.evolution-timeline { }
.era-marker { }
```

### 7.2 Learning Path Components
```css
.learning-path { }
.path-node { }
.path-connector { }
.path-progress { }
.prerequisite-badge { }
```

### 7.3 Interactive Tool Components
```css
.tool-builder { }
.builder-canvas { }
.builder-toolbar { }
.builder-output { }
.drag-drop-zone { }
```

### 7.4 Comparison Components
```css
.comparison-matrix { }
.matrix-header { }
.matrix-row { }
.matrix-cell { }
.comparison-slider { }
```

### 7.5 Assessment Components
```css
.quiz-container { }
.quiz-question { }
.quiz-options { }
.quiz-result { }
.readiness-meter { }
```

---

## Phase 8: JavaScript Functionality

### 8.1 Learning Path System
```javascript
// Track user progress across pages
// Recommend next steps
// Save/restore progress
```

### 8.2 Interactive Builders
```javascript
// XML Tag Builder
// Schema Builder
// Prompt Builder enhancements
```

### 8.3 Assessment Tools
```javascript
// Learning path quiz
// Readiness assessment
// Knowledge checks
```

### 8.4 Search Enhancement
```javascript
// Add all new pages to search index
// Add technique/method filtering
// Add difficulty filtering
```

---

## Implementation Timeline

### Sprint 1: Foundation Enhancement (Weeks 1-2)
- [ ] Update prompt-basics.html with historical context
- [ ] Update crisp.html with framing
- [ ] Update crispe.html with framing
- [ ] Update costar.html with framing
- [ ] Create context-structure.html (bridge page)
- [ ] Create foundations/index.html
- [ ] Add historical context CSS components

### Sprint 2: Technique Pages (Weeks 3-4)
- [ ] Update react.html with modern context
- [ ] Create chain-of-thought.html
- [ ] Create few-shot.html
- [ ] Update flipped-interaction.html
- [ ] Create iteration.html
- [ ] Create techniques/index.html
- [ ] Add learning path CSS components

### Sprint 3: Modern Methods (Weeks 5-7)
- [ ] Create xml-containers.html
- [ ] Create reflection-patterns.html
- [ ] Create meta-prompting.html
- [ ] Create structured-output.html
- [ ] Create agentic-workflows.html
- [ ] Create modern/index.html
- [ ] Add interactive builder components

### Sprint 4: Applied AI (Weeks 8-10)
- [ ] Create implementation.html
- [ ] Create ethics.html
- [ ] Create creativity.html
- [ ] Create accessibility-ai.html
- [ ] Create case-studies.html
- [ ] Create applied/index.html

### Sprint 5: Integration (Weeks 11-12)
- [ ] Implement new navigation across all pages
- [ ] Set up redirects from old URLs
- [ ] Update search index
- [ ] Cross-link all pages
- [ ] Final testing and polish

---

## Quality Checklist (Per Page)

- [ ] Unique visual identity (not cookie-cutter)
- [ ] All quotes from verified .edu/.gov sources
- [ ] Interactive element(s) present
- [ ] Historical context where appropriate
- [ ] Clear learning progression links
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] WCAG AA compliant
- [ ] CSP A+ compliant (no inline styles/scripts)
- [ ] Lighthouse 100%

---

## Source Research Needed

Before implementing pages, research and document verifiable sources for:

1. **Prompt effectiveness studies** - .edu research
2. **Cognitive load and structure** - educational psychology .edu
3. **Few-shot learning effectiveness** - AI research papers with DOI
4. **Chain of thought research** - Original papers + follow-ups
5. **Accessibility and AI** - .gov disability resources
6. **AI ethics frameworks** - .edu and .gov guidelines
7. **Implementation success metrics** - Business school .edu research

**Document all sources in:** `.claude/verified-sources.md`

---

## Notes

- Aesthetic remains consistent with current site (neurodivergent section quality)
- Each page must feel unique while belonging to the same family
- Design pages with a mix of the features. 
- Put Multiple features next to each other whre space makes sense.
- No 2 pages should be designed the same when it comes to content layout. 
- UDL principles applied throughout
- Progressive disclosure for complexity management
- Clear paths between related content
- No fabricated citations under any circumstances
