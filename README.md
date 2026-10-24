# career-firm

A career-consulting firm in a plugin: truthful CV and résumé diagnosis, rewriting, design and localization, cover letters, mock interviews and relationship-based job search, in any language including Arabic (RTL). Nothing is fabricated and nothing unverified is presented as fact.

## Install
Needs Claude Code v2.1.275 or later for the one-step form:
```
/plugin install career-firm --marketplace mustafa-ahmed-dev/careerly
```
Or in two steps:
```
/plugin marketplace add mustafa-ahmed-dev/careerly
/plugin install career-firm@career-firm
```
Cloud sessions do not load plugins installed on your machine. In claude.ai chat or Cowork, see Anthropic's plugin docs; uploading `plugins/career-firm/` as a zip is untested here. Only skills load in claude.ai chat, so every must-keep rule is also written inline in each skill.

## Use
Start with the `career-firm` skill (full engagement), or call a specialist: `cv-review`, `cv-write`, `cv-design`, `cover-letter`, `interview-coach`, `job-search`, `localization`, `career-references`.

## Status
v0.1 in progress. Skills are rewritten; the 20 design systems are still specification stubs and the renderer, skill data and evals are not built. Regional files are lite and several are marked unverified. See `docs/roadmap.md`, `PRIVACY.md` and `NOTICES.md`.

## Maintainers
Validate with `claude plugin validate plugins/career-firm` and `claude plugin validate .`. Do not add a top-level `bin/` folder to the plugin.
