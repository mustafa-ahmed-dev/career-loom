# career-firm

A career-consulting firm in a plugin. See `PRIVACY.md`, `NOTICES.md` and `skills/career-firm/roles.md`.

**Status: v0.1 planning scaffold.** Library is drafted (`skills/career-references/`, 236 sources). Skills are short stubs; design systems are spec stubs; the renderer, ESCO/O*NET data and evals are not built.

Use: full engagement (`/career-start`), a single specialist (invoke any skill by name), or ask the firm to call specialists for you. Agents and hooks load in Cowork and Claude Code; claude.ai chat loads skills and commands only, so every must-keep rule lives in `skills/integrity-fact-bank/SKILL.md`.

Validate: `claude plugin validate --strict`. Do not add a top-level `bin/` folder.
