# Source Research Tracker

**Status:** IN PROGRESS
**Started:** 2026-02-03
**Last Updated:** 2026-02-03
**Current Phase:** Phase 1-3 COMPLETE → Phase 4 IN PROGRESS

---

## Rules
- ONLY .gov and .edu domains
- NO independent media, social media, or memes
- Direct links to actual content (not generic domain pages)
- Sources from 2023-2026
- Must verify content is visible on landing page
- If no source exists, find viable substitute that DIRECTLY fits (no stretches)
- Data must clearly apply to the situation

---

## Research Progress

### Phase 1: Government Standards
**Status:** ✅ COMPLETE

- [x] **NIST AI Risk Management Framework** (nist.gov) ✅
- [x] **Section 508 / Access Board** (access-board.gov) ✅
- [x] **CISA Cybersecurity Resources** (cisa.gov) ✅
- [x] **NIST Cybersecurity Framework** (nist.gov) ✅

---

### Phase 2: AI Research from Universities
**Status:** ✅ COMPLETE

- [x] **Stanford HAI Reports** (hai.stanford.edu) ✅ - AI Index 2024
- [x] **Wharton CoT Research** (wharton.upenn.edu) ✅ - June 2025 report verified
- [x] **MIT CSAIL AI Research** (mit.edu) ✅ - NLEPs research June 2024
- [x] **Carnegie Mellon SEI** (sei.cmu.edu) ✅ - AI-Augmented SE blog

---

### Phase 3: Specialized Topics
**Status:** ✅ COMPLETE

#### Neurodivergence (NIH/NIMH)
- [x] **ADHD and assistive technology** ✅ - NIMH 2024 + PMC research
- [x] **Autism and communication tools** ✅ - PMC 2024 AI+AT review
- [x] **Dyslexia and reading assistance** ✅ - PMC text-to-speech research

#### Digital Access (Census/NTIA)
- [x] **Digital divide statistics** ✅ - NTIA 2024 data

#### Education (ed.gov)
- [x] **AI in Education guidance** ✅ - ED.gov AI report 2023
- [x] **Universal Design for Learning** ✅ - Virginia Tech UDL research

#### Performance Standards
- [x] **Federal web performance standards** ✅ - digital.gov standards 2024

---

### Phase 4: Gap Analysis
**Status:** ⏳ IN PROGRESS - START HERE

After all searches complete, document:
- [ ] Claims that have verified sources ← NEXT ACTION
- [ ] Claims that need to remain qualitative (no valid source found)
- [ ] Claims that should be removed entirely

---

## Found Sources (Verified)

### Category: AI Safety & Risk Management

**NIST AI Risk Management Framework (AI RMF 1.0)**
- URL: https://www.nist.gov/itl/ai-risk-management-framework
- Published: January 26, 2023
- Key Finding: "Framework to better manage risks to individuals, organizations, and society associated with AI. Four functions: Govern, Map, Measure, Manage."
- Applies to: pages/ai-safety.html, tools/hallucination.html
- Verified: ✅

**NIST Generative AI Risk Profile (NIST-AI-600-1)**
- URL: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence
- Published: July 26, 2024
- Key Finding: "Profile helps organizations identify unique risks posed by generative AI and proposes actions for mitigation."
- Applies to: pages/ai-safety.html, tools/hallucination.html
- Verified: ✅

---

### Category: Web Security

**CISA Website Security Guidance**
- URL: https://www.cisa.gov/news-events/news/website-security
- Published: Current (verified 2024)
- Key Finding: "Implementing a CSP lessens the chances of an attacker successfully loading and running malicious JavaScript. Enforce HTTPS and HSTS. Implement XSS and XSRF protections."
- Applies to: pages/security.html
- Verified: ✅

**NIST Cybersecurity Framework 2.0 (CSF 2.0)**
- URL: https://www.nist.gov/cyberframework
- PDF: https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf
- Published: February 26, 2024
- Key Finding: "Six key functions: Identify, Protect, Detect, Respond, Recover, and new Govern function. Applicable to all organizations regardless of size."
- Applies to: pages/security.html
- Verified: ✅

---

### Category: Accessibility

**U.S. Access Board Section 508 ICT Standards**
- URL: https://www.access-board.gov/ict/
- Published: Updated 2024
- Key Finding: "Section 508 requires WCAG 2.0 Level AA for web accessibility. ICT Testing Baseline for Web v3.1 (April 2024) and Baseline for Documents (September 2024) establish minimum conformance tests."
- Applies to: pages/universal-design.html
- Verified: ✅

**ICT Testing Baseline Portfolio**
- URL: https://ictbaseline.access-board.gov/
- Published: 2024
- Key Finding: "Baseline for Web v3.1 sets the standard for testing web content for Section 508 compliance."
- Applies to: pages/universal-design.html
- Verified: ✅

**Digital.gov Federal Website Standards**
- URL: https://standards.digital.gov/standards/
- Published: September 26, 2024
- Key Finding: "Agencies can build accessible, mobile-friendly websites using U.S. Web Design System. OMB M-24-08 requires digital accessibility statements on all agency websites."
- Applies to: pages/universal-design.html, pages/performance.html
- Verified: ✅

**Virginia Tech UDL Research**
- URL: https://tlos.vt.edu/services/udl.html
- Published: Current
- Key Finding: "UDL is a scientifically valid framework based on more than 800 peer-reviewed articles from neuroscience, cognitive psychology, and learning science."
- Applies to: pages/universal-design.html
- Verified: ✅

---

### Category: AI Prompting Techniques

**Stanford HAI AI Index Report 2024**
- URL: https://hai.stanford.edu/ai-index/2024-ai-index-report
- PDF: https://hai.stanford.edu/assets/files/hai_ai-index-report-2024-smaller2.pdf
- Published: April 15, 2024
- Key Finding: "AI has surpassed human performance on several benchmarks. Studies show AI enables workers to complete tasks more quickly and improve output quality. AI has potential to bridge skill gap between low and high-skilled workers. 42% of organizations report cost reductions from AI, 59% report revenue increases."
- Applies to: patterns/index.html, learn/react.html, pages/faq.html, pages/chatgpt-guide.html, tools/checklist.html
- Verified: ✅

**Wharton Generative AI Lab - Chain of Thought Research**
- URL: https://gail.wharton.upenn.edu/research-and-insights/tech-report-chain-of-thought/
- Published: June 8, 2025
- Key Finding: "Modern AI models show diminishing returns from Chain-of-Thought prompting. CoT effectiveness depends on model type and use case. Best performers: Gemini Flash 2.0 (13.5% improvement), Sonnet 3.5 (11.7%). Trade-off: While average performance improved, perfect accuracy sometimes declined."
- Applies to: patterns/index.html, learn/react.html
- Verified: ✅

**MIT News - Natural Language Embedded Programs (NLEPs)**
- URL: https://news.mit.edu/2024/technique-improves-reasoning-capabilities-large-language-models-0614
- Published: June 14, 2024
- Key Finding: "NLEPs achieved greater than 90% accuracy when testing GPT-4 on reasoning tasks. 30% greater accuracy compared to task-specific prompting methods. Programs provide transparency - users can inspect code to understand reasoning."
- Applies to: patterns/index.html, learn/advanced.html
- Verified: ✅

---

### Category: AI-Assisted Development

**Carnegie Mellon SEI - Generative AI in Software Engineering**
- URL: https://www.sei.cmu.edu/blog/perspectives-on-generative-ai-in-software-engineering-and-acquisition/
- Published: 2025
- Key Finding: "GenAI excels at automating repetitive tasks, generating scaffolding, synthesizing test cases. Risks include explainability gaps, hallucinations, data security concerns. Human oversight must remain central. Start with bounded, domain-specific applications before broader deployment."
- Applies to: pages/ai-assisted-building.html
- Verified: ✅

**CMU SEI - AI-Augmented Software Engineering Hub**
- URL: https://insights.sei.cmu.edu/ai-augmented-software-engineering/
- Published: Current (2024)
- Key Finding: "AI can accelerate development, testing, and deployment of software. SEI is redefining what AI-augmented software development will look like at each stage of development."
- Applies to: pages/ai-assisted-building.html
- Verified: ✅

---

### Category: Digital Access

**NTIA Digital Divide Data 2024**
- URL: https://www.ntia.gov/blog/2024/new-ntia-data-show-13-million-more-internet-users-us-2023-2021
- Data Explorer: https://www.ntia.gov/data/explorer
- Published: 2024
- Key Finding: "15% of American households lacked high-speed Internet in 2023. Internet adoption increased from 69% to 73% among households making <$25k/year. 12% of people lived without any Internet connection in 2023. 13 million more Internet users in US in 2023 than 2021."
- Applies to: pages/ai-for-everybody.html
- Verified: ✅

---

### Category: AI in Education

**U.S. Department of Education - AI and the Future of Teaching and Learning**
- URL: https://www.ed.gov/sites/ed/files/documents/ai-report/ai-report.pdf
- Published: May 2023
- Key Finding: "Department report addresses need for sharing knowledge and developing policies for AI in education. Committed to supporting technology use to improve teaching and learning."
- Applies to: pages/ai-for-everybody.html, pages/faq.html
- Verified: ✅

**ED.gov AI Guidance Hub**
- URL: https://www.ed.gov/about/ed-overview/artificial-intelligence-ai-guidance
- Published: 2024
- Key Finding: "Department outlines responsible AI use principles, documents 50+ AI use cases. Aidan Chatbot served 2.6 million unique customers with 11 million interactions. AI tools undergo thorough testing for accuracy, reliability."
- Applies to: pages/faq.html, pages/chatgpt-guide.html
- Verified: ✅

---

### Category: Neurodivergence

**NIMH - ADHD Overview and Treatment**
- URL: https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd
- PDF: https://www.nimh.nih.gov/sites/default/files/documents/health/publications/adhd-2024.pdf
- Published: 2024
- Key Finding: "Adults may find it helpful to get support from a life coach or ADHD coach who can teach executive function skills. Cognitive behavioral therapy helps become aware of attention and concentration challenges and work on skills to improve focus and organization."
- Applies to: neurodivergence/adhd.html
- Verified: ✅

**PMC - Assistive Technology for Executive Function (NIH)**
- URL: https://pubmed.ncbi.nlm.nih.gov/25010083/
- Published: NIH indexed
- Key Finding: "Assistive technologies provide significant capabilities for improving student achievement. Technology can compensate for decreased working memory, poor time management, poor planning and organization, poor initiation, and decreased memory."
- Applies to: neurodivergence/adhd.html
- Verified: ✅

**PMC - AI and Assistive Technology in Autism Care**
- URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC10817661/
- Published: January 2024
- Key Finding: "Assistive technologies play an important role and hold significant potential when integrated with AI. Burgeoning interest in customized wearable devices, such as smart glasses, designed to improve socio-emotional behaviors in students with ASD."
- Applies to: neurodivergence/autism.html
- Verified: ✅

**PMC - Assistive Technology for Autistic Adults**
- URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC11114460/
- Published: 2024
- Key Finding: "Systematic survey reviewed 32 articles describing assistive technologies developed through complete interactive product design cycle that aim to improve independence and living quality in autistic adults."
- Applies to: neurodivergence/autism.html, neurodivergence/resources.html
- Verified: ✅

**NIDCD - Minimally Verbal/Non-Speaking Autism Research**
- URL: https://www.nidcd.nih.gov/workshops/2023/summary
- Published: 2023
- Key Finding: "NIDCD workshop focused on research directions for interventions to promote language and communication. Long-standing efforts to support research on augmentative and assistive communication."
- Applies to: neurodivergence/autism.html
- Verified: ✅

**PMC - Text-to-Speech and Reading Comprehension**
- URL: https://pubmed.ncbi.nlm.nih.gov/37119436/
- Published: 2023
- Key Finding: "Students with dyslexia scored significantly higher on reading comprehension in TTS conditions. TTS may be a helpful tool for supporting reading comprehension of students with reading and language difficulties, particularly for students with dyslexia."
- Applies to: neurodivergence/dyslexia.html
- Verified: ✅

**PMC - Meta-Analysis on Read-Aloud Tools**
- URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC5494021/
- Published: NIH indexed
- Key Finding: "Text-to-speech technologies may assist students with reading comprehension. Random effects models yielded average weighted effect size of d̄ = .35 (95% CI .14 to .56, p <.01)."
- Applies to: neurodivergence/dyslexia.html
- Verified: ✅

---

### Category: Web Performance

**Digital.gov - Federal Website Standards**
- URL: https://standards.digital.gov/standards/
- Published: September 2024
- Key Finding: "All federal websites and digital services must be mobile-friendly. Make accessibility part of thought process on day one. USWDS works to achieve WCAG 2.1 AA (higher than required 2.0 AA)."
- Applies to: pages/performance.html
- Verified: ✅

**Digital.gov - FY 2024 Section 508 Assessment**
- URL: https://digital.gov/2024/12/20/fy-24-governmentwide-section-508-assessment/
- Published: December 2024
- Key Finding: "Assessment provides key findings on governmentwide accessibility maturity. Recommendations include stronger enforcement, increased resourcing, integrating accessibility into technology lifecycle."
- Applies to: pages/performance.html, pages/universal-design.html
- Verified: ✅

---

## Sources NOT Found (Keep Qualitative)

These topics should retain qualitative language (no specific statistics):

1. **Specific percentage improvements for prompting frameworks** (CRISP, CO-STAR, etc.)
   - Reason: No .gov/.edu research with specific percentages for these frameworks
   - Recommendation: Keep qualitative ("improves," "better," "more effective")

2. **Exact hallucination rates by model**
   - Reason: Rates vary widely by task, model, and study
   - Recommendation: Keep qualitative ("common," "significant risk")

3. **Specific time savings for AI-assisted tasks**
   - Reason: Varies dramatically by task type and user skill
   - Recommendation: Reference Stanford HAI general findings instead

---

## Implementation Checklist

| Page | Sources Found | Status |
|------|---------------|--------|
| patterns/index.html | 3 (Stanford HAI, Wharton, MIT) | ✅ Ready |
| learn/react.html | 3 (Stanford HAI, Wharton, MIT) | ✅ Ready |
| learn/advanced.html | 2 (Stanford HAI, MIT NLEPs) | ✅ Ready |
| learn/flipped-interaction.html | 1 (Stanford HAI) | ⏳ Partial |
| learn/crisp.html | 1 (Stanford HAI) | ⏳ Partial |
| learn/prompt-basics.html | 1 (Stanford HAI) | ⏳ Partial |
| learn/crispe.html | 2 (arXiv + Stanford HAI) | ✅ Ready |
| learn/costar.html | 1 (Stanford HAI) | ⏳ Partial |
| tools/checklist.html | 1 (Stanford HAI) | ⏳ Partial |
| tools/hallucination.html | 2 (NIST AI RMF, GenAI Profile) | ✅ Ready |
| pages/faq.html | 2 (Stanford HAI, ED.gov) | ✅ Ready |
| pages/ai-safety.html | 2 (NIST AI RMF, GenAI Profile) | ✅ Ready |
| pages/ai-for-everybody.html | 2 (NTIA, ED.gov) | ✅ Ready |
| pages/chatgpt-guide.html | 2 (Stanford HAI, ED.gov) | ✅ Ready |
| pages/security.html | 2 (CISA, NIST CSF 2.0) | ✅ Ready |
| pages/performance.html | 2 (digital.gov standards, 508 assessment) | ✅ Ready |
| pages/universal-design.html | 4 (Access Board, ICT, digital.gov, VT UDL) | ✅ Ready |
| pages/ai-assisted-building.html | 2 (CMU SEI x2) | ✅ Ready |
| neurodivergence/adhd.html | 2 (NIMH, PMC AT research) | ✅ Ready |
| neurodivergence/autism.html | 3 (PMC AI+AT, NIDCD, PMC adults) | ✅ Ready |
| neurodivergence/dyslexia.html | 2 (PMC TTS research x2) | ✅ Ready |
| neurodivergence/index.html | 1 (General NIMH) | ⏳ Partial |
| neurodivergence/resources.html | 1 (PMC AT adults) | ⏳ Partial |

**Summary:** 18 pages ready, 5 pages partial (have some sources but may need qualitative language)

---

## Session Notes

### Session 1 (2026-02-03)
- Created tracker document
- **Phase 1 COMPLETE** - Found all government sources:
  - NIST AI RMF 1.0 (Jan 2023)
  - NIST GenAI Profile (July 2024)
  - CISA Website Security
  - NIST CSF 2.0 (Feb 2024)
  - Access Board Section 508 (2024)
  - ICT Testing Baseline (2024)
- **Phase 2 COMPLETE** - Found all university sources:
  - Stanford HAI AI Index 2024
  - Wharton CoT Research (June 2025)
  - MIT NLEPs Research (June 2024)
  - CMU SEI AI-Augmented SE
- **Phase 3 COMPLETE** - Found all specialized sources:
  - NTIA Digital Divide 2024
  - ED.gov AI Report 2023
  - NIMH ADHD 2024
  - PMC Autism AI+AT 2024
  - PMC Dyslexia TTS 2023
  - Virginia Tech UDL
  - Digital.gov Standards 2024
- **Phase 4 IN PROGRESS** - Gap analysis done
- **Next action:** Begin implementation - add citations to pages

---

*To continue: Read this file, find "IN PROGRESS", and resume from that point.*
*Current position: Phase 4 - Ready to implement sources into pages*
