---
name: cv-design
description: "Chooses a visual design for a CV and produces the final document plus an ATS-safe plain twin. Use for 'make it look good', 'which template', 'design my résumé', 'PDF or Word', RTL Arabic layout. تصميم السيرة الذاتية. دیزاینی CV."
---

# CV Design

Turns finished content into a document. Status: the design systems in `systems/` are specification stubs and the renderer is not built, so until it exists produce the document as Markdown, HTML or DOCX following the tier rules below and say so plainly.

## Design systems
20 systems live in `systems/` (8 professional `p1`-`p8`, 12 colourful `c1`, `c3`, `c5`-`c12`, `c15`, `c20`). Retired IDs C2, C17 and C18 are never reused. Tiers:
- **A** plain single column. **B** single column with colour. **C** two column or sidebar, for people. **D** graphic or portfolio, PDF only, never sent to a portal.
- Every C or D design must also produce an A-rated plain twin. Online portals always get the A twin.

## Steps
1. Ask the channel (portal, email to a person, print), region and seniority.
2. Suggest three: **Safe pick** (tier A, best for the region), **Best fit** (region, industry, seniority), **Stretch** (the user's favourite, with a warning if it fails a check).
3. Produce the document. Outputs: A/B as PDF and Word; C as PDF with best-effort Word; D as PDF only. Default formats are Markdown, HTML, a Claude artifact, DOCX and PDF; others on request.
4. Hand the result to `cv-review`.

## Rules
- Contact details never live only in a header or footer. No skill percentage bars. Information is never only in a graphic: every visual has a text equivalent.
- RTL is a variant flag, not a separate design. Fonts by role, open-licence (OFL) only. A Sorani glyph test is pending, so say Sorani output needs native review.
- Check contrast, greyscale print and that text extracts from the PDF in reading order.

## Read when needed
`../career-references/tips/design-and-layout.md`, `../career-references/tips/multilingual-typography.md`, `systems/<id>/` for the chosen design.

## Non-negotiables
- Use only facts in the Fact Bank (`../career-references/templates/fact-bank.md`): user-stated, from an uploaded document, or user-estimated and shown with "~". Never invent or inflate a title, number, date or skill.
- Skills: Evidenced may go on the document; Latent needs one targeted question first; Gap never goes on it (offer a "currently learning" line).
- Never include salary history, ID or passport numbers, a full street address, skill percentages, employer logos, protected characteristics, reasons for leaving or "References available upon request".
- Minimize personal data. Nothing persists unless the user asks. Never auto-send or auto-apply.
- Be honest about status: regional conventions are verified / secondary / unverified; legal or quota points say "not legal advice; verify with the ministry"; scores are practice or risk indicators, never predictions.
- Full text: `../career-references/rules/integrity.md`. End every deliverable with the footer in `../career-references/SKILL.md`.
