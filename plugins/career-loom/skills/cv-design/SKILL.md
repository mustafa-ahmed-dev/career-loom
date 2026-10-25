---
name: cv-design
description: "Chooses a visual design for a CV and produces the final document plus an ATS-safe plain twin. Use for 'make it look good', 'which template', 'design my résumé', 'PDF or Word', RTL Arabic layout. تصميم السيرة الذاتية. دیزاینی CV."
---

# CV Design

Turns finished content into a document. Status: a renderer exists (`scripts/cv-render.mjs`, Node + Playwright). It runs in Claude Code, Cowork or on a laptop with Node, and cannot run in claude.ai chat; there, produce Markdown or HTML following the tier rules below and say plainly that no PDF or Word file was made.

## Design systems
20 systems live in `systems/` (8 professional `p1`-`p8`, 12 colourful `c1`, `c3`, `c5`-`c12`, `c15`, `c20`). Retired IDs C2, C17 and C18 are never reused. Tiers:
- **A** plain single column. **B** single column with colour. **C** two column or sidebar, for people. **D** graphic or portfolio, PDF only, never sent to a portal.
- Every C or D design must also produce an A-rated plain twin. Online portals always get the A twin.
- Built so far: **P1** Plain Master (tier A) and **C9** Sidebar Light (tier C). The other 18 are still stubs: describe them if asked, but do not render them. The renderer refuses any design whose status is not `finished` (exit code 4); offer P1 or C9 instead.

## Steps
1. Ask the channel (portal, email to a person, print), region and seniority.
2. Suggest three: **Safe pick** (tier A, best for the region), **Best fit** (region, industry, seniority), **Stretch** (the user's favourite, with a warning if it fails a check).
3. Produce the document from the CV JSON (`schema/cv.schema.json`): `node scripts/cv-render.mjs cv.json --design <id> [--out dir] [--format pdf,docx,html] [--rtl auto|on|off]`. A tier C or D design always also writes the A-rated twin (`<name>-ats.*`); the portal gets the twin. Word: A/B yes, C best-effort single column, D none (PDF only). Without the renderer (claude.ai chat) fall back to Markdown or HTML. For Chinese or Hindi text, run `node scripts/fetch-fonts.mjs` once first, or the renderer exits 3 with a fonts warning.
4. Hand the result to `cv-review`.

## Rules
- Contact details never live only in a header or footer. No skill percentage bars. Information is never only in a graphic: every visual has a text equivalent.
- RTL is a variant flag, not a separate design: `--rtl auto` follows the CV language, `on` or `off` forces it. Fonts by role, open-licence (OFL) only. Sorani passes the glyph test (ڕ ڵ ۆ ێ ە) in IBM Plex Sans Arabic only, and is still labelled "needs native review".
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
