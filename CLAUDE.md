# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Claude Code / Cowork **plugin** (`.claude-plugin/plugin.json`), not an application. It is almost entirely Markdown: skills, agents, commands and one hooks file. v0.1 is a planning scaffold: skills are short stubs, design systems are spec stubs, and the renderer (`skills/resume-designer/scripts/`), ESCO/O*NET data and evals (`evals/`) are not built. There is no build, lint or test command.

Validate with `claude plugin validate --strict`. Do not add a top-level `bin/` folder.

## Architecture

- **`skills/`** holds all the content. One skill per role (roster in `skills/career-firm/roles.md`). `career-firm` is the Engagement Partner front door: it routes to the specialists, runs on the main conversation and has no agent wrapper, because a subagent cannot start other subagents.
- **`agents/*.md`** are thin wrappers that preload one skill (`skills:` frontmatter) and say "follow it exactly; it holds all content". Change behavior in the skill, never in the agent file.
- **`commands/career-*.md`** are one-line routers (`Use the <skill> skill for this request: $ARGUMENTS`). `/career-start` runs the full engagement; the others call a single specialist.
- **`hooks/hooks.json`** has a single `PreToolUse` prompt hook on `Write|Edit` that denies writes containing government/Iqama IDs, full street addresses, salary history or non-consented personal data.

### Shared rules live in one place

`skills/integrity-fact-bank/SKILL.md` is the only place the no-fabrication, privacy, banned-item and honest-label rules are written. Other skills point to it with a relative link and must not copy the rules. The reason is that claude.ai chat loads only skills and commands (no agents or hooks), so every must-keep rule has to be reachable from a skill.

Every deliverable ends with the footer defined in `skills/career-references/SKILL.md`. Skills reference siblings with `../<skill>/...` relative paths.

### Document pipeline

Any produced document must pass, in order: `integrity-fact-bank`, `skills-advisor` (if skills changed), `language-editor` (non-English), `resume-designer`, `parse-risk-diagnostician`. A single specialist called alone never skips the required checks. Final report order is fixed in `skills/career-firm/SKILL.md`.

### Library and citation rules (`skills/career-references/`)

- `sources.md` holds the evidence rows S001–S236, each with Last checked and Volatility. Look entries up by ID or topic; never load the whole file into context.
- Library sources and live web findings are kept strictly separate. Live findings are never written back into `sources.md` (it changes only in the developer's quarterly review).
- Check any statistic against `banned-claims.md` before using it.
- Regional conventions carry a verified / secondary / unverified status. Region content lives in `skills/region-packs/packs/` and `skills/career-references/tips/regional/`.

### Resume designer

`skills/resume-designer/systems/` has 27 design systems (IDs like `c1-accent-band`). IDs C2, C17 and C18 are retired and must never be reused. Layouts are in `layouts/`. Tiers A–D: every C/D design must also produce an A-rated ATS twin, and portals get the A twin. RTL is a variant flag; fonts are OFL only.

## Project conventions

- Privacy and data notes: `PRIVACY.md`. Third-party data planned for later: `NOTICES.md`.
- Rejected features (do not add): auto-apply, browser autofill, live interview copilots, view tracking, AI headshots, phrase libraries, recruiter-visibility boosts, large example libraries.
- Planned roles for later versions are listed at the bottom of `skills/career-firm/roles.md`.
