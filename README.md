# career-firm

A career-consulting firm in a plugin: truthful CV and résumé diagnosis, rewriting, design and localization, cover letters, mock interviews and relationship-based job search, in any language including Arabic (RTL). Nothing is fabricated and nothing unverified is presented as fact.

## Install
```
/plugin marketplace add mustafa-ahmed-dev/careerly
/plugin install career-firm@career-firm
```
(Verify the exact syntax against the current Claude Code plugin docs.) In claude.ai chat, upload the contents of `plugins/career-firm/` as a zip; only skills load there, so every must-keep rule is also written inline in each skill.

## Use
Start with the `career-firm` skill (full engagement), or call a specialist: `cv-review`, `cv-write`, `cv-design`, `cover-letter`, `interview-coach`, `job-search`, `localization`, `career-references`.

## Status
v0.1 in progress. Skills are rewritten; the 20 design systems are still specification stubs and the renderer, skill data and evals are not built. Regional files are lite and several are marked unverified. See `docs/roadmap.md`, `PRIVACY.md` and `NOTICES.md`.

## Maintainers
Validate with `claude plugin validate plugins/career-firm` and `claude plugin validate .`. Do not add a top-level `bin/` folder to the plugin.
