# Career Loom

A career-coaching team in a plugin. Career Loom helps you build truthful CVs and résumés, write cover letters, practise interviews and plan a job search, in any language including Arabic (right-to-left) and Kurdish. It is written for people who are not technical.

Its one promise: **nothing is fabricated, and nothing unverified is presented as fact.** It works from facts you give it, asks when something is missing, and labels anything it cannot verify.

## Install

**In claude.ai (chat, desktop app) or Cowork:** open **Customize > Plugins**, choose **Add > Add marketplace**, enter `mustafa-ahmed-dev/career-loom`, and add **career-loom**.

**In Claude Code** (v2.1.275 or later):

```
/plugin install career-loom --marketplace mustafa-ahmed-dev/career-loom
```

## What you can ask for

| Skill | Use it to |
|---|---|
| `career-loom` | Start here. Runs a full engagement or routes you to one specialist. |
| `cv-review` | Diagnose a CV: parsing risk for applicant-tracking software, findability of key terms, structure, honesty check, hidden-text check. |
| `cv-write` | Write or rewrite CV content in your own voice, with a skills section that needs evidence. |
| `cv-design` | Choose a layout and produce the document plus a plain, software-safe twin. |
| `cover-letter` | Write a cover letter or a short message to a recruiter, after checking whether one is expected. |
| `interview-coach` | Practise mock interviews at five difficulty levels with practice feedback. |
| `job-search` | Plan relationship-based outreach: referrals, introductions, follow-ups, a weekly plan. |
| `localization` | Apply country and language conventions, including RTL layout and non-English polish. |
| `career-references` | Look up the sources and tips behind the advice. |

Just describe what you need, for example "review my CV" or "help me prepare for an interview", or type `/` and pick a skill.

## Where it works

- **Skills** work in claude.ai chat, Cowork and Claude Code.
- **Two helper agents** (`cv-reviewer`, `market-researcher`) run only in Cowork and Claude Code. In chat, the skills do the same work without them.
- The plugin has no hooks, no commands, no background programs and no connectors of its own.

## What it runs, sends and fetches

- The plugin ships no programs or scripts. It is Markdown instructions and reference files that Claude follows.
- It sends nothing by itself. It never sends messages, applies to jobs or shares links for you. Outreach is written one message at a time, and you send it.
- **Web search is optional.** If you turn it on in Claude, the plugin may search for current requirements, job postings or company details. Only search terms go to the search tool, not your CV. Live findings are shown separately from the plugin's own library and are not saved into it.
- Documents are saved to Google Drive, Microsoft 365 or Notion only if you ask and have that connector turned on in Claude.

See `PRIVACY.md` in this folder for the full privacy note.

## Honest limits in this version (0.1)

- The 20 CV design systems are written as specifications. A full automatic renderer is not built yet, so expect layout guidance and well-structured documents rather than finished graphic templates.
- Some regional conventions are marked verified, secondary or unverified. Anything unverified is shown as unverified, never as fact. Iraq and Kurdistan Region CV conventions still need published sources.
- Interview scores are practice feedback, not predictions. Legal and quota statements are not legal advice; check with the relevant authority.
- No score from applicant-tracking software is ever invented.

## License

MIT. Source and issues: https://github.com/mustafa-ahmed-dev/career-loom
