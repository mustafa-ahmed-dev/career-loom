# Changelog

## Unreleased
- Sources migrated to `career-references/sources/sources.csv` (236 rows, IDs kept); maintainer tools in `tools/`.
- Web search is optional and offered to the user; live findings stay separate from the library.
- README: install for non-technical users via claude.ai Customize > Plugins.
- Merged 16 skills into 9 self-sufficient skills: career-firm, cv-review, cv-write, cv-design, cover-letter, interview-coach, job-search, localization, career-references.
- Integrity rules moved to `career-references/rules/integrity.md`; each skill carries a short inline summary.
- Regional content merged into `career-references/regions/<region>/` (`pack.md` and `tips.md`).
- Added templates (fact bank, final report, critique), an interview rubric and one synthetic example.
- Agents reduced to `cv-reviewer` and `market-researcher`.
- Interview levels unified: L1 Warm-up, L2 Standard, L3 Realistic, L4 Tough, L5 Brutal.

## 0.1.0
- Planning scaffold.
