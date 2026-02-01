# Project Standards - Praxis Library

<div align="center">

![Standards](https://img.shields.io/badge/Standards-Document-2196F3?style=for-the-badge)
![Internal Use](https://img.shields.io/badge/Internal-Use_Only-D71920?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0-4CAF50?style=for-the-badge)

**Internal standards document for maintaining quality and consistency across all prompts and content**

</div>

---

## Table of Contents

- [Overview](#overview)
- [Prompt Accuracy Guardrails](#prompt-accuracy-guardrails)
  - [Core Guardrails](#core-guardrails)
  - [Extended Guardrails](#extended-guardrails)
    - [Perspective & Bias](#3-perspective--bias)
    - [Bias Types to Monitor](#bias-types-to-monitor)
- [Ethical Prompting & Responsible AI (RAI)](#ethical-prompting--responsible-ai-rai)
  - [RAI Core Principles](#rai-core-principles)
  - [Data Privacy Requirements](#data-privacy-requirements)
  - [Prohibited Use Cases](#prohibited-use-cases)
  - [Ethical Prompting Guidelines](#ethical-prompting-guidelines)
  - [RAI Compliance Checklist](#rai-compliance-checklist)
- [Constraint Block Template](#constraint-block-template)
- [Prompt Structure Standards](#prompt-structure-standards)
- [Content Guidelines](#content-guidelines)
- [Code & Styling Standards](#code--styling-standards)
- [Security Standards](#security-standards)
- [Implementation Checklist](#implementation-checklist)

---

## Overview

This document defines the quality standards for all prompts in the Praxis Library. Every example prompt must adhere to these guardrails to ensure users receive accurate, verifiable, and responsible AI outputs.

### The 7P Protocol

> **Prior Proper Planning Prevents Piss Poor Performance**

All standards in this document reflect this philosophy.

---

## Prompt Accuracy Guardrails

### Core Guardrails

These three guardrails are **MANDATORY** for all prompts that involve data, research, or web-based information:

| Guardrail | Definition | Implementation |
|-----------|------------|----------------|
| **Source Accuracy** | Only use authoritative, verifiable sources | Require primary sources, official documentation, peer-reviewed content |
| **Data Accuracy** | Verify all facts and figures; acknowledge uncertainty | Mandate cross-referencing; flag unverifiable claims |
| **Temporal Accuracy** | Information must be current and time-relevant | Specify date ranges; require publication dates; flag outdated content |

---

### Extended Guardrails

Additional guardrails to strengthen prompt reliability:

#### 1. Citation & Attribution
| Guardrail | Purpose |
|-----------|---------|
| **Citation Required** | All factual claims must include source attribution |
| **Link Verification** | URLs must be validated before inclusion |
| **Author Attribution** | Credit original authors/organizations |

#### 2. Uncertainty & Limitations
| Guardrail | Purpose |
|-----------|---------|
| **Uncertainty Acknowledgment** | State "I cannot verify this" rather than speculate |
| **Confidence Levels** | Indicate confidence: High/Medium/Low/Unverified |
| **Scope Limitations** | Clearly state what the AI cannot access or verify |

#### 3. Perspective & Bias
| Guardrail | Purpose |
|-----------|---------|
| **Source Diversity** | Require multiple independent sources to avoid single-source bias |
| **Bias Disclosure** | Explicitly flag potential source biases (funding, affiliation, ideology) |
| **Balanced Perspective** | Present multiple viewpoints on contested or nuanced topics |
| **Stakeholder Awareness** | Consider how different stakeholders view the same information |
| **Cultural Sensitivity** | Account for regional/cultural differences in interpretation |
| **Conflict of Interest** | Disclose when sources have financial or political motivations |

#### Bias Types to Monitor

| Bias Type | Description | Mitigation |
|-----------|-------------|------------|
| **Confirmation Bias** | Favoring information that confirms existing beliefs | Actively seek contradicting evidence |
| **Selection Bias** | Cherry-picking favorable data points | Require comprehensive data sets |
| **Recency Bias** | Overweighting recent events vs. historical patterns | Balance current with historical context |
| **Authority Bias** | Accepting claims because of source prestige | Verify claims regardless of source authority |
| **Survivorship Bias** | Focusing on successes, ignoring failures | Include failure cases and lessons learned |
| **Funding Bias** | Skewed results due to sponsor interests | Disclose funding sources; seek independent verification |
| **Publication Bias** | Positive results published more than negative | Acknowledge unpublished/negative study limitations |
| **Geographic Bias** | Overrepresenting certain regions/markets | Specify geographic scope; note limitations |

#### Perspective Requirements

For complex or contested topics, prompts should instruct:

1. **Multi-Stakeholder View** - How do patients, providers, regulators, and payers each see this?
2. **Pro/Con Analysis** - What are the arguments for and against?
3. **Risk/Benefit Balance** - Who benefits? Who bears the risk?
4. **Minority Opinions** - Are there credible dissenting views?
5. **Historical Context** - How has thinking on this evolved?

#### 4. Domain-Specific Accuracy
| Guardrail | Purpose |
|-----------|---------|
| **Regulatory Compliance** | Cite specific regulations (FDA, EMA, ICH) |
| **Version Control** | Specify software/document versions |
| **Jurisdiction Awareness** | Note geographic applicability of information |

#### 5. Data Integrity
| Guardrail | Purpose |
|-----------|---------|
| **No Hallucination** | Never fabricate statistics, quotes, or references |
| **Numerical Precision** | State units, margins of error, sample sizes |
| **Context Preservation** | Don't strip context from quoted material |

---

## Ethical Prompting & Responsible AI (RAI)

All prompts must comply with Responsible AI principles. This section defines mandatory ethical guardrails for enterprise AI use.

### RAI Core Principles

| Principle | Definition | Implementation |
|-----------|------------|----------------|
| **Privacy First** | Protect personal and confidential information | Never include PII, PHI, or client data in prompts |
| **Transparency** | Be clear about AI involvement and limitations | Acknowledge AI-generated content; disclose capabilities |
| **Fairness** | Avoid discrimination and ensure equitable outcomes | Test for bias; use inclusive language |
| **Accountability** | Maintain human oversight and responsibility | Human review required for critical decisions |
| **Safety** | Prevent harm to individuals or organizations | Refuse harmful requests; flag concerning content |

---

### Data Privacy Requirements

#### Absolutely NEVER Include in Prompts:

| Category | Examples | Why Prohibited |
|----------|----------|----------------|
| **Personal Identifiable Information (PII)** | Names, SSN, addresses, phone numbers, emails | Privacy laws (GDPR, CCPA, HIPAA) |
| **Protected Health Information (PHI)** | Patient records, diagnoses, treatment plans | HIPAA compliance |
| **Client/Customer Data** | Company names, contracts, proprietary info | Confidentiality agreements |
| **Financial Information** | Account numbers, credit cards, salaries | Security and privacy |
| **Authentication Credentials** | Passwords, API keys, tokens | Security breach risk |
| **Internal Business Data** | Revenue figures, strategies, trade secrets | Competitive sensitivity |
| **Employee Information** | Performance reviews, HR records | Privacy and legal |

#### Safe Alternatives:

| Instead of... | Use... |
|---------------|--------|
| "John Smith's prescription" | "Patient-001's prescription for Product-A" |
| "Pfizer's clinical trial" | "Sponsor-A's clinical trial for Product-X" |
| "Our Q3 revenue of $50M" | "Quarterly revenue target for Period-X" |
| "Email sarah@company.com" | "Send communication to Stakeholder-A" |
| "Password: admin123" | "`[SECURE_CREDENTIAL]`" |

---

### Prohibited Use Cases

Prompts must NEVER be designed to:

| Category | Examples | Risk Level |
|----------|----------|------------|
| **Deception** | Deepfakes, impersonation, fake reviews | Critical |
| **Manipulation** | Psychological manipulation, dark patterns | Critical |
| **Discrimination** | Biased hiring, discriminatory decisions | Critical |
| **Surveillance** | Unauthorized monitoring, tracking | High |
| **Harm** | Weapons, dangerous activities, self-harm | Critical |
| **Fraud** | Financial scams, identity theft | Critical |
| **Misinformation** | Deliberate falsehoods, propaganda | High |
| **Circumvention** | Bypassing safety controls, jailbreaking | High |

---

### Ethical Prompting Guidelines

#### 1. Human Oversight
| Guideline | Implementation |
|-----------|----------------|
| **Review Requirement** | AI outputs affecting decisions must have human review |
| **Escalation Path** | Define when human intervention is required |
| **Audit Trail** | Maintain records of AI-assisted decisions |
| **Override Capability** | Humans can always override AI recommendations |

#### 2. Transparency & Disclosure
| Guideline | Implementation |
|-----------|----------------|
| **AI Disclosure** | Clearly indicate when content is AI-generated |
| **Limitation Awareness** | State what AI cannot reliably do |
| **Confidence Communication** | Express uncertainty appropriately |
| **Source Attribution** | Credit information sources |

#### 3. Fairness & Inclusion
| Guideline | Implementation |
|-----------|----------------|
| **Inclusive Language** | Use gender-neutral, accessible terminology |
| **Bias Testing** | Review outputs for discriminatory patterns |
| **Diverse Perspectives** | Consider impact on all stakeholder groups |
| **Accessibility** | Ensure outputs are accessible to all users |

#### 4. Quality & Accuracy
| Guideline | Implementation |
|-----------|----------------|
| **Fact Verification** | Cross-check AI-generated facts |
| **Source Validation** | Verify referenced sources exist |
| **Context Appropriateness** | Ensure outputs fit the use case |
| **Error Acknowledgment** | Correct mistakes promptly |

---

### RAI Compliance Checklist

Before using any prompt in production:

- [ ] **No PII/PHI**: Prompt contains no personal or health information
- [ ] **No Client Data**: No confidential business information included
- [ ] **No Credentials**: No passwords, keys, or authentication data
- [ ] **Ethical Purpose**: Use case is legitimate and non-harmful
- [ ] **Human Review**: Critical outputs will be reviewed by humans
- [ ] **Bias Check**: Prompt doesn't encourage discriminatory outputs
- [ ] **Transparency**: AI involvement will be disclosed if required
- [ ] **Data Minimization**: Only necessary information is included

---

### RAI Constraint Block

Add this to prompts involving sensitive operations:

```
[Responsible AI Constraints]
- Privacy: Do not request, store, or expose personal identifiable information (PII)
- Confidentiality: Treat all business context as confidential; use generic placeholders
- Transparency: Clearly indicate AI-generated content and limitations
- Human Oversight: Flag decisions requiring human review
- Ethical Boundaries: Refuse requests that could cause harm or violate policies
- Data Minimization: Only use information necessary for the task
```

#### Compact RAI Version:
```
[RAI Compliance]
- No PII/PHI/client data
- Use generic placeholders
- Flag for human review if critical
- Refuse harmful requests
```

---

### Constraint Block Template

Every applicable prompt should include a **\[Constraints\]** section. Use this template:

```
[Constraints]
- Source Accuracy: Only use authoritative, verifiable sources (official documentation, peer-reviewed, primary sources)
- Data Accuracy: Cross-reference facts; acknowledge uncertainty with "unverified" or "requires confirmation"
- Temporal Accuracy: Information must be from [specify date range] unless historical context required; always note publication dates
- Citation Required: Provide source attribution for all factual claims
- Bias Awareness: Disclose potential source biases; note funding sources or conflicts of interest
- Perspective Balance: Present multiple stakeholder viewpoints on contested topics; acknowledge dissenting opinions
- Uncertainty Protocol: State "I cannot verify this information" rather than speculate
- No Hallucination: Never fabricate statistics, quotes, studies, or references
- RAI Compliance: No PII/PHI/client data; use generic placeholders; flag for human review if critical
```

#### Compact Version (for space-constrained prompts)
```
[Constraints]
- Sources: Authoritative, verifiable only
- Data: Cross-reference; flag uncertainty
- Dates: Current sources; note publication dates
- Citations: Required for all claims
- Bias: Disclose source biases and conflicts
- Perspective: Present balanced viewpoints
- Privacy: No PII/PHI/confidential data
- If uncertain: State it, don't speculate
```

---

## Prompt Structure Standards

### Methodology Hierarchy

All prompts should progress through complexity levels:

| Level | Name | Complexity | Use Case |
|-------|------|------------|----------|
| 1 | CRISP | Entry | Simple, direct requests |
| 2 | CRISPE | Intermediate | Role-based with personality |
| 3 | COSTAR | Advanced | Complex multi-parameter tasks |
| 4 | ReAct | Expert | Interactive troubleshooting |

### Required Prompt Elements

Every example prompt must include:

1. **Clear Role Definition** - Who is the AI acting as?
2. **Specific Context** - What situation/environment?
3. **Defined Task** - What exactly needs to be done?
4. **Output Format** - How should results be structured?
5. **Constraints** - What guardrails apply?

### Placeholder Standards

Use generic, non-specific placeholders:

| Category | Correct Format | Incorrect |
|----------|---------------|-----------|
| Products | Product-A, Product-B | Lipitor, Humira |
| Sites | Site-001, Site-002 | Boston-Manufacturing |
| Studies | Study-001, Protocol-A | NCT12345678 |
| Systems | System-A, Platform-X | SAP, Salesforce |
| Dates | `[Current Year]`, `Q[X]` | 2024, Q3 2024 |
| Regulations | `[Applicable Regulation]` | 21 CFR Part 11 |

---

## Content Guidelines

### Tone & Voice

- **Professional**: Enterprise-appropriate language
- **Actionable**: Clear, executable instructions
- **Inclusive**: Accessible to varying experience levels
- **Neutral**: No product endorsements or vendor preferences

### Forbidden Content

Never include in prompts:

- Real company names (except in generic context)
- Real product names or trade names
- Actual study IDs or patient data
- Specific pricing or financial figures
- Personal names or contact information
- Proprietary methodologies or trade secrets

### Industry Balance

Prompts should be applicable across:

- Pharmaceutical / Biotech
- Medical Devices
- Healthcare IT
- Clinical Research Organizations
- Contract Manufacturing

---

## Code & Styling Standards

### CSS Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Classes | kebab-case | `.nav-item`, `.sec-card` |
| IDs | kebab-case | `#main-content` |
| Colors | CSS Variables | `var(--accent)` |
| Brand Color | #D71920 | Red accent |

### HTML Standards

- Semantic HTML5 elements
- ARIA labels for accessibility
- No inline styles (CSP compliance)
- No inline scripts (CSP compliance)

### JavaScript Standards

- Vanilla JS only (no frameworks)
- Event delegation pattern
- Defensive null checks
- No eval() or dynamic execution

---

## Security Standards

### Content Security Policy

All content must comply with strict CSP:

```
default-src 'none';
script-src 'self';
style-src 'self';
img-src 'self' data:;
font-src 'self';
form-action 'none';
```

### Asset Requirements

- All assets self-hosted
- No external CDNs
- No tracking scripts
- No analytics
- SVGs must be script-free

---

## Implementation Checklist

### Before Adding a New Prompt

- [ ] Follows CRISP/CRISPE/COSTAR/ReAct structure
- [ ] Includes `[Constraints]` section with accuracy guardrails
- [ ] Uses generic placeholders (no real names/products)
- [ ] Appropriate for enterprise environment
- [ ] Copy button functional
- [ ] Responsive on mobile

### Before Updating Existing Prompts

- [ ] Add `[Constraints]` section if missing
- [ ] Verify all guardrails are present
- [ ] Check placeholder format compliance
- [ ] Test copy functionality
- [ ] Validate HTML structure

### RAI Compliance Check

- [ ] No PII (names, SSN, addresses, emails, phone numbers)
- [ ] No PHI (patient data, diagnoses, treatment info)
- [ ] No client/customer confidential data
- [ ] No credentials (passwords, API keys, tokens)
- [ ] No internal financial or strategic data
- [ ] Ethical purpose (non-harmful, non-deceptive)
- [ ] Human review flagged where appropriate
- [ ] Inclusive, non-discriminatory language

### Quality Assurance

- [ ] Proofread for typos
- [ ] Verify methodology label matches content
- [ ] Check formatting consistency
- [ ] Confirm example is realistic and useful

---

## Guardrail Application Guide

### Which Prompts Need Full Guardrails?

| Prompt Type | Full Guardrails | Compact Guardrails | RAI Required | None |
|-------------|-----------------|--------------------| -------------|------|
| Research/Data requests | Yes | - | Yes | - |
| Web scraping | Yes | - | Yes | - |
| Document analysis | Yes | - | Yes | - |
| Report generation | Yes | - | Yes | - |
| Patient/Clinical data | Yes | - | **Critical** | - |
| HR/Employee data | Yes | - | **Critical** | - |
| Financial analysis | Yes | - | Yes | - |
| Simple formatting | - | - | Yes | - |
| Code generation | - | Yes | Yes | - |
| Creative writing | - | Yes | Yes | - |
| Communication drafts | - | Yes | Yes | - |

### Guardrail Priority by Role Category

| Category | Priority Guardrails |
|----------|---------------------|
| **Regulatory Affairs** | Source Accuracy, Temporal Accuracy, Citation Required, Regulatory Compliance, Jurisdiction Awareness, RAI Compliance |
| **Quality Assurance** | Data Accuracy, No Hallucination, Version Control, Bias Awareness, RAI Compliance |
| **Clinical/Medical** | All guardrails (highest scrutiny) + No PHI, Human Oversight Required, RAI Compliance |
| **IT/Engineering** | Data Accuracy, Version Control, Scope Limitations, No Credentials, RAI Compliance |
| **Corporate Services** | Source Accuracy, Citation Required, Temporal Accuracy, No PII, Perspective Balance, RAI Compliance |
| **Operations/Compliance** | Regulatory Compliance, Jurisdiction Awareness, Citation Required, Conflict of Interest, RAI Compliance |
| **AI & Innovation** | All guardrails + Bias Awareness, Perspective Balance, Ethical Boundaries, Full RAI Compliance |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | 2026-01-25 | Added Ethical Prompting & Responsible AI (RAI) section with full compliance framework |
| 1.1 | 2026-01-25 | Added Perspective & Bias guardrails with bias type monitoring |
| 1.0 | 2026-01-25 | Initial standards document with accuracy guardrails |

---

<div align="center">

**Standards maintained by < /OpenBas >**

*Prior Proper Planning Prevents Piss Poor Performance*

</div>
