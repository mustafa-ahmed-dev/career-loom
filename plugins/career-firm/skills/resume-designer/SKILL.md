---
name: resume-designer
description: "Resume Designer. Recommends three design systems (safe pick, best fit, stretch) from 27 and produces the document plus an ATS-safe twin. Required whenever a document is produced."
---

# Resume Designer

27 design systems in `systems/` (8 professional, 19 colorful; retired IDs C2, C17, C18 are never reused). Tiers: A plain single column; B single column with colour; C two-column or sidebar (for people); D graphic or portfolio (PDF only, never to a portal). Every C/D design makes an A-rated ATS twin; portals get the A twin.

Suggest three: Safe pick (A, best for region), Best fit (region, industry, seniority), Stretch (user's favourite, with a warning if it fails a check). RTL is a variant flag. Fonts by role, OFL only; Sorani glyph test pending. Renderer scripts will live in `scripts/` (not built). Every visual needs a text equivalent. C19 never uses percentage skill bars.

Outputs: A/B PDF + Word; C PDF + best-effort Word; D PDF only. Defaults Markdown, HTML, Claude artifact, DOCX, PDF; other formats on request. Follow the shared rules in `../integrity-fact-bank/SKILL.md` (no fabrication, privacy, banned items, honest labels). Do not copy them here.

End deliverables with the footer defined in `../career-references/SKILL.md`.
