# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Career Loom is a plugin marketplace repo. `.claude-plugin/marketplace.json` lists one plugin, `plugins/career-loom` (`.claude-plugin/plugin.json`). The plugin is almost entirely Markdown: nine skills and two agents. There is no build, lint or test command. The 20 design systems are spec stubs; the renderer, ESCO/O*NET data and `evals/` are not built.

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

### Design systems
`skills/cv-design/systems/` has 20 stubs (`p1`-`p8`, `c1`, `c3`, `c5`-`c12`, `c15`, `c20`). Retired IDs C2, C17, C18 are never reused. Tiers A-D: every C/D design also produces an A-rated ATS twin; portals get the A twin. RTL is a variant flag; fonts OFL only. Dropped designs: `docs/design-backlog.md`.

## Conventions
- Skills are 300-700 words (except `career-references`): trigger-phrase description (English, Arabic, Kurdish keywords), questions, steps, output, inline non-negotiables, which reference to read.
- Region-specific rules live only under `regions/`, never in core skills.
- Interview levels: L1 Warm-up, L2 Standard, L3 Realistic, L4 Tough, L5 Brutal.
- Maintainer docs (`docs/`) are not shipped with the plugin. Privacy: `PRIVACY.md`; third-party data: `NOTICES.md`.
- Rejected features (do not add): auto-apply, browser autofill, live interview copilots, view tracking, AI headshots, phrase libraries, recruiter-visibility boosts, large example libraries.
