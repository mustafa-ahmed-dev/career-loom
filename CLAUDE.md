# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Career Loom is a plugin marketplace repo. `.claude-plugin/marketplace.json` lists one plugin, `plugins/career-loom` (`.claude-plugin/plugin.json`). The plugin is almost entirely Markdown: nine skills and two agents. The skills have no build step; the only code is the CV renderer in `skills/cv-design/scripts/` (Node, has tests). All 20 design systems are built and pass the five design checks. ESCO/O*NET data is not built; `evals/` is a small starter set.

Validate with `claude plugin validate plugins/career-loom` and `claude plugin validate .`. Do not add a top-level `bin/` folder inside the plugin. The two `.claude-plugin` folders are both correct: do not merge them. `CLAUDE.md` is not shipped to plugin users, so shipped guidance must live in skills.

## Architecture (`plugins/career-loom/`)

- **`skills/`** holds all content, nine skills: `career-loom` (front door, runs on the main conversation, no agent wrapper because a subagent cannot start subagents), `cv-review`, `cv-write`, `cv-design`, `cover-letter`, `interview-coach`, `job-search`, `localization`, `career-references`. Roster mapping: `docs/roadmap.md`.
- **`agents/`**: `cv-reviewer` (preloads `cv-review`) and `market-researcher`. Change behaviour in the skill, not the agent file.
- No hooks and no commands: claude.ai chat loads only skills, so every must-keep rule is inside a skill.

### Shared rules
Full text: `skills/career-references/rules/integrity.md` (canonical). Every user-facing skill also carries a short inline "Non-negotiables" block, because a skill may load without that file. If you change a rule, change the canonical file first, then update every inline block so they agree. Every deliverable ends with the footer in `skills/career-references/SKILL.md`.

### Document pipeline
`cv-write` (Fact Bank and skills gate) → `localization` → `cv-design` → `cv-review`. A single specialist called alone never skips its own checks. Final report order and templates: `skills/career-references/templates/`.

### Library and citation rules (`skills/career-references/`)
- `sources.md` holds evidence rows S001-S236 with Last checked and Volatility. Look up by ID or topic; never load the whole file.
- Library sources and live web findings stay strictly separate. Live findings are never written into `sources.md` (changed only in the quarterly review).
- Check any statistic against `banned-claims.md`.
- Regional content lives in `regions/<region>/` (`pack.md`, `tips.md`; index in `regions/README.md`). Conventions carry a verified / secondary / unverified status. Nothing unverified is presented as fact. The founder observation S159 is excluded and used nowhere; Iraq/KRI CV conventions still need published sources.

### CV renderer (`skills/cv-design/scripts/`)
`cv-render.mjs` (Node 20+, Playwright, `docx`) renders a JSON CV (`schema/cv.schema.json`) with a design's `tokens.json` to PDF, DOCX and HTML. It refuses stubs (exit 4) and drafts without `--allow-draft` and always writes the A-rated `-ats` twin for tier C/D. It cannot run in claude.ai chat. Do not edit it from skill work; change behaviour descriptions in `cv-design/SKILL.md`. Tests: `cd plugins/career-loom/skills/cv-design/scripts && npm install && npm test`.

### Design systems
`skills/cv-design/systems/` has 20 finished design systems (`p1`-`p8`, `c1`, `c3`, `c5`-`c12`, `c15`, `c20`). Retired IDs C2, C17, C18 are never reused. Tiers A-D: every C/D design also produces an A-rated ATS twin; portals get the A twin. RTL is a variant flag; fonts OFL only. Dropped designs: `docs/design-backlog.md`.

## Conventions
- Skills are 300-700 words (except `career-references`): trigger-phrase description (English, Arabic, Kurdish keywords), questions, steps, output, inline non-negotiables, which reference to read.
- Region-specific rules live only under `regions/`, never in core skills.
- Interview levels: L1 Warm-up, L2 Standard, L3 Realistic, L4 Tough, L5 Brutal.
- Maintainer docs (`docs/`) are not shipped with the plugin. Privacy: `PRIVACY.md`; third-party data: `NOTICES.md`.
- Rejected features (do not add): auto-apply, browser autofill, live interview copilots, view tracking, AI headshots, phrase libraries, recruiter-visibility boosts, large example libraries.
