# Changelog

## Unreleased

## 0.1.0 - 2026-10-25 (preview)
- 20 design systems (P1-P8, C1, C3, C5-C12, C15, C20), each with `spec.md`, `design.css`, `components.html` and `tokens.json`; each tier C or D design (C9-C12, C15, C20) also has a plain, ATS-safe twin (P1); tier B designs (C1, C3, C5-C8) have none. Claude writes the HTML from these files, so it works in claude.ai chat. PDF or Word only if your Claude has a tool that can write files.
- Six open-licence font families bundled (SIL OFL); Chinese and Hindi fonts are fetched on demand by the maintainer tool only.
- The optional CV renderer and design checker (Node, with tests) live in `tools/cv-design/`, outside the plugin folder, so installing the plugin does not include them.
- Known gaps: Sorani (Kurdish) wording is not natively reviewed; Iraq/KRI CV conventions and several regional files are unverified; ESCO/O*NET data is not built; `evals/` is a starter set.
- Directory submission prep: added `plugins/career-loom/README.md` (the plugin folder had none), finalised `PRIVACY.md` and `NOTICES.md`, and added `displayName`, `homepage`, `repository`, `documentationUrl`, `supportUrl` and `privacyPolicyUrl` to `plugin.json`.
- Plugin icon is now `assets/icon.png`, the logo symbol alone (no text) cropped to fill the square; the full logo stays in `assets/logo.png` and `assets/logo.jpg`.
- Added the plugin icon: `logo.png` (set as `icon` in `plugin.json`) and the original `logo.jpg`, both in `plugins/career-loom/assets/`.
- Renamed the project from career-firm to **Career Loom** (plugin, marketplace, folder, front-door skill). Install commands now use `career-loom` and the repo `mustafa-ahmed-dev/career-loom`.
- Sources migrated to `career-references/sources/sources.csv` (236 rows, IDs kept); maintainer tools in `tools/`.
- Web search is optional and offered to the user; live findings stay separate from the library.
- README: install for non-technical users via claude.ai Customize > Plugins.
- Merged 16 skills into 9 self-sufficient skills: career-loom, cv-review, cv-write, cv-design, cover-letter, interview-coach, job-search, localization, career-references.
- Integrity rules moved to `career-references/rules/integrity.md`; each skill carries a short inline summary.
- Regional content merged into `career-references/regions/<region>/` (`pack.md` and `tips.md`).
- Added templates (fact bank, final report, critique), an interview rubric and one synthetic example.
- Agents reduced to `cv-reviewer` and `market-researcher`.
- Interview levels unified: L1 Warm-up, L2 Standard, L3 Realistic, L4 Tough, L5 Brutal.

## Before 0.1.0
- Planning scaffold.
