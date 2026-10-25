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
| `cv-design` | Choose a layout and produce the document plus a plain, software-safe twin. PDF, Word and HTML files need Claude Code, Cowork or a computer with Node.js (see below). |
| `cover-letter` | Write a cover letter or a short message to a recruiter, after checking whether one is expected. |
| `interview-coach` | Practise mock interviews at five difficulty levels with practice feedback. |
| `job-search` | Plan relationship-based outreach: referrals, introductions, follow-ups, a weekly plan. |
| `localization` | Apply country and language conventions, including RTL layout and non-English polish. |
| `career-references` | Look up the sources and tips behind the advice. |

Just describe what you need, for example "review my CV" or "help me prepare for an interview", or type `/` and pick a skill.

## Where it works

- **Skills** work in claude.ai chat, Cowork and Claude Code.
- **The CV renderer** (PDF, Word and HTML files) runs only in Claude Code, Cowork or on a computer with Node.js. It cannot run in claude.ai chat. There, `cv-design` gives you Markdown or HTML and says plainly that no PDF or Word file was made.
- **Two helper agents** (`cv-reviewer`, `market-researcher`) run only in Cowork and Claude Code. In chat, the skills do the same work without them.
- The plugin has no hooks, no commands, no background programs and no connectors of its own.

## What it runs, sends and fetches

- Most of the plugin is Markdown instructions and reference files that Claude follows. The one exception is the CV renderer in `skills/cv-design/scripts/`, described next.
- **The CV renderer runs on your own computer.** It turns a CV written as JSON into a PDF, Word or HTML file. Your CV is not uploaded anywhere, and the files are written locally. Installing it is a manual step: it needs Node.js 20 or newer, `npm install`, and a Chromium download by Playwright. The plugin does not install anything by itself. Four open-licence font families are bundled. For Chinese or Hindi CVs, a script (`fetch-fonts.mjs`) can download two more open-licence fonts through npm, and only when you run it.
- It sends nothing by itself. It never sends messages, applies to jobs or shares links for you. Outreach is written one message at a time, and you send it.
- **Web search is optional.** If you turn it on in Claude, the plugin may search for current requirements, job postings or company details. Only search terms go to the search tool, not your CV. Live findings are shown separately from the plugin's own library and are not saved into it.
- Documents are saved to Google Drive, Microsoft 365 or Notion only if you ask and have that connector turned on in Claude.

See `PRIVACY.md` in this folder for the full privacy note.

## Honest limits in this version (0.1)

- All 20 CV design systems are finished. Where the renderer can run (Claude Code, Cowork or a laptop with Node) it writes PDF and HTML; in claude.ai chat Career Loom writes the HTML from the design's rules and says plainly that no PDF was made. It makes no Word file; ask Claude to convert the HTML to Word if you need one.
- Sorani (Central Kurdish) output needs native-speaker review.
- Some regional conventions are marked verified, secondary or unverified. Anything unverified is shown as unverified, never as fact. Iraq and Kurdistan Region CV conventions still need published sources.
- Interview scores are practice feedback, not predictions. Legal and quota statements are not legal advice; check with the relevant authority.
- No score from applicant-tracking software is ever invented.

## License

MIT. Source and issues: https://github.com/mustafa-ahmed-dev/career-loom
