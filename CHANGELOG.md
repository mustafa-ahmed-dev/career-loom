# Changelog

## Unreleased
- Repo cleanup: removed the duplicate `assets/logo.jpg` (`logo.png` and `icon.png` stay) and the one-off `tools/migrate_sources.py`; corrected the "stub" wording in `systems/TOKENS.md`.
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

## 0.1.0
- Planning scaffold.
