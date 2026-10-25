# career-loom

A career-consulting firm in a plugin: truthful CV and résumé diagnosis, rewriting, design and localization, cover letters, mock interviews and relationship-based job search, in any language including Arabic (RTL). Nothing is fabricated and nothing unverified is presented as fact.

## Install

### In claude.ai (chat, desktop app) or Cowork: no coding needed
Open **Customize > Plugins** and choose **Add > Add marketplace**, then enter `mustafa-ahmed-dev/career-loom` and add **career-loom**. Or download this repo as a zip, choose **Add > Upload plugin** and upload it. Skills and commands work in chat; the two agents run in Cowork and Claude Code only. Then describe what you need, for example "review my CV", or type `/` and pick a career-loom skill. Turn on web search in your Claude settings if you want current requirements and postings.

### In Claude Code
Needs Claude Code v2.1.275 or later for the one-step form:
```
/plugin install career-loom --marketplace mustafa-ahmed-dev/career-loom
```
Or in two steps:
```
/plugin marketplace add mustafa-ahmed-dev/career-loom
/plugin install career-loom@career-loom
```
Cloud sessions do not load plugins installed on your machine. Every must-keep rule is also written inline in each skill, because agents and hooks do not load in chat.

## Use
Start with the `career-loom` skill (full engagement), or call a specialist: `cv-review`, `cv-write`, `cv-design`, `cover-letter`, `interview-coach`, `job-search`, `localization`, `career-references`.

## Status
v0.1 in progress. Skills are rewritten; the 20 design systems are still specification stubs and the renderer, skill data and evals are not built. Regional files are lite and several are marked unverified. See `docs/roadmap.md`, `PRIVACY.md` and `NOTICES.md`.

## Maintainers
Validate with `claude plugin validate plugins/career-loom` and `claude plugin validate .`. Do not add a top-level `bin/` folder to the plugin.
