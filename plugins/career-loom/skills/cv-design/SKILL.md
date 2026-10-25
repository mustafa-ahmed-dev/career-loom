---
name: cv-design
description: "Chooses a visual design for a CV and produces the final document plus an ATS-safe plain twin. Use for 'make it look good', 'which template', 'design my résumé', 'PDF or Word', RTL Arabic layout. تصميم السيرة الذاتية. دیزاینی CV."
---

# CV Design

Turns finished content into a document. A design is plain files: `systems/<id>/spec.md` (rules, colours, type), `design.css` and `components.html`. You write the HTML from them (works in claude.ai chat too). PDF and Word are extras, made only with a tool that can write files.

## Design systems
20 systems in `systems/` (`p1`-`p8`, `c1`, `c3`, `c5`-`c12`, `c15`, `c20`). Retired IDs C2, C17, C18 are never reused. Tiers:
- **A** plain single column. **B** single column with colour. **C** two column or sidebar, for people. **D** graphic or portfolio, never sent to a portal.
- Every C or D design must also produce an A-rated plain twin. Online portals always get the A twin.
- All 20 pass five checks (contrast, greyscale, six scripts, text extraction, page fit). Pick by need:
  - **A, portal-safe:** `p1` default; `p2` spacious; `p3` classic serif; `p4` executive; `p5` academic; `p6` technical compact; `p7` graduate; `p8` public service and field.
  - **B, colour:** `c1` accent band; `c3` bold type; `c5` ribbon sections; `c6` metric spotlight; `c7` brand kit; `c8` warm editorial.
  - **C, people only:** `c9` sidebar light; `c10` sidebar dark; `c11` split header; `c12` timeline; `c15` Swiss grid. **D:** `c20` portfolio lite.
  - Highlights (`c6`, optional elsewhere) are 2-4 facts already in the CV body, estimates marked "~"; never invent one.

## Steps
1. Ask the channel (portal, email to a person, print), region and seniority.
2. Suggest three: **Safe pick** (tier A, best for the region), **Best fit** (region, industry, seniority), **Stretch** (the user's favourite, with a warning if it fails a check).
3. Write the document as HTML: read the chosen design's `spec.md`, `design.css` and `components.html` and use the same classes and variables, with the user's content in the design's section order. A tier C or D design also gets its A-rated twin (named in its spec, currently `p1`), built from that design's files.
   - **PDF:** only with a code or PDF tool: print the HTML to A4, backgrounds on, 1-2 pages. Otherwise say plainly that no PDF or Word file was made; the user can open the HTML in a browser and use Print, Save as PDF.
   - **Word:** on request, convert the finished HTML (tier C or D: the A twin) and say it is simplified and unchecked in Word.
   - **Renderer:** maintainers' tool in the repo's `tools/cv-design/`, not shipped.
4. Hand the result to `cv-review`.

## Rules
- Contact details never live only in a header or footer. No skill percentage bars. Information is never only in a graphic.
- RTL is a variant flag, not a separate design: set `dir="rtl"` for Arabic, Sorani, Persian, Urdu or Hebrew. Fonts by role, open-licence (OFL) only. Sorani uses IBM Plex Sans Arabic or Noto Naskh Arabic (never Cairo) and is labelled "needs native review".
- Skills, titles and numbers keep the user's own words in every output, including the chat fallback: never rename, widen or add a qualifier ("reporting" stays "reporting", never "financial reporting"); unknowns stay `[add]`.
- Text must extract from any PDF in reading order.

## Read when needed
`../career-references/tips/design-and-layout.md`, `../career-references/tips/multilingual-typography.md`, `systems/<id>/` for the chosen design.

## Non-negotiables
- Use only facts in the Fact Bank (`../career-references/templates/fact-bank.md`): user-stated, from an uploaded document, or user-estimated and shown with "~". Never invent or inflate a title, number, date or skill.
- Skills: Evidenced may go on the document; Latent needs one targeted question first; Gap never goes on it (offer a "currently learning" line).
- Never include salary history, ID or passport numbers, a full street address, skill percentages, employer logos, protected characteristics, reasons for leaving or "References available upon request".
- Minimize personal data. Nothing persists unless the user asks. Never auto-send or auto-apply.
- Be honest about status: regional conventions are verified / secondary / unverified; legal or quota points say "not legal advice; verify with the ministry"; scores are practice or risk indicators, never predictions.
- Full text: `../career-references/rules/integrity.md`. End every deliverable with the footer in `../career-references/SKILL.md`.
