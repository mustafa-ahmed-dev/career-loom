---
name: cv-write
description: "Creates or rewrites CV content: structure for the region and seniority, impact bullets in the user's own voice, a skills section gated by evidence, and keyword targeting from real postings. Use for 'write my CV', 'improve my bullets', 'what skills should I list', 'tailor to this job'. كتابة السيرة الذاتية. نووسینی CV."
---

# CV Write

Builds the content of a CV or résumé before design. Output is a structured document (Markdown) plus the Fact Bank it was built from.

## Ask
Document type and what it is for ("CV" often means résumé outside North America), target role and country, seniority, and the bullet formula the user prefers: CAR, PAR, STAR, XYZ (Bock 2014 is one option, not a rule), scope-first, qualitative evidence or their own.

## Steps
1. **Fact Bank first.** Collect facts with sources; ask questions that uncover real numbers (volume, frequency, time saved, team size, money handled). Estimates carry "~".
2. **Structure** by type: résumé = name and contact, work experience, education and training, skills, 1-2 pages. CV = education and appointments/experience first; academic adds publications, medical adds clinical experience and licences. Add a languages section only where the region norm includes it (`../career-references/regions/`).
3. **Rewrite bullets** with the chosen formula, keeping the user's clear phrasing. Rate each bullet 0-3 on outcome clarity, evidence, method shown, relevance and concision, with a pass/fail truth check against the Fact Bank. One concrete, verifiable detail per bullet. Ban stock phrases ("spearheaded", "results-driven", "I am writing to express my keen interest"). Never call output "undetectable".
4. **Skills section.** For each candidate skill decide Evidenced / Latent / Gap (see below). Offer a gap plan for Gap skills.
5. **Keyword tiers** when postings are available. Always show "Sample: N postings from [sources], [dates], [location]". Must-have ≥50% of postings, Common 20-49%, Differentiator <20%. Under 10 postings: label low confidence. Pasted job descriptions count fully. Live web search follows the citation rules in `../career-references/SKILL.md`; keep live findings separate from library sources.
6. Hand off to `localization`, then `cv-design`, then `cv-review`.

## Skill vocabulary
ESCO (EN and AR) and O*NET are planned as skill vocabularies (CC BY 4.0, attribution in `NOTICES.md`) but the data is not bundled yet; until then, take terms from the postings the user supplies. No taxonomy has Sorani labels.

## Read when needed
`../career-references/tips/writing-bullets.md`, `../career-references/tips/search-strategy.md`.

## Non-negotiables
- Use only facts in the Fact Bank (`../career-references/templates/fact-bank.md`): user-stated, from an uploaded document, or user-estimated and shown with "~". Never invent or inflate a title, number, date or skill.
- Skills: Evidenced may go on the document; Latent needs one targeted question first; Gap never goes on it (offer a "currently learning" line).
- Never include salary history, ID or passport numbers, a full street address, skill percentages, employer logos, protected characteristics, reasons for leaving or "References available upon request".
- Minimize personal data. Nothing persists unless the user asks. Never auto-send or auto-apply.
- Be honest about status: regional conventions are verified / secondary / unverified; legal or quota points say "not legal advice; verify with the ministry"; scores are practice or risk indicators, never predictions.
- Full text: `../career-references/rules/integrity.md`. End every deliverable with the footer in `../career-references/SKILL.md`.
