# Career Loom: privacy

Last updated: 2026-10-25

Career Loom is a set of instructions and reference files that Claude follows. It has no server, no account system and no analytics of its own. What you type and upload is handled by Claude and by any connector you choose to turn on, under their own terms and privacy policies.

## What the plugin does with your data

- **Collects only what is needed.** It asks for the facts a career document needs and avoids sensitive details such as ID or passport numbers, salary history, a full street address and protected characteristics.
- **Asks consent for someone else's CV.** If you share a CV that is not yours, it asks whether you have that person's permission.
- **Stores nothing by default.** The plugin does not keep your documents between conversations. It offers to "forget me" and clear what it was given in the conversation.
- **Never acts for you.** It never sends messages, applies to jobs or shares links on your behalf.

## When data leaves the conversation

- **Web search (optional).** If you turn web search on in Claude, search terms go to the search tool. Your CV is not sent. Live findings are shown separately and are never saved into the plugin's library.
- **Cloud destinations (only on request).** Documents are written to Google Drive, Microsoft 365 or Notion only when you ask and have that connector enabled in Claude.
- **CV renderer (Claude Code, Cowork or your own computer).** It runs locally and writes files on your machine. Your CV content is not uploaded. Setting it up downloads software from public hosts (npm packages, a Chromium browser, and for Chinese or Hindi CVs two open-licence fonts). Those downloads send no CV content.
- **Nowhere else.** The plugin does not send your data to any other service.

## Not advice

- Interview scores are practice feedback, not predictions.
- Legal and quota statements are not legal advice; verify them with the relevant authority.

## Questions and removal requests

Open an issue at https://github.com/mustafa-ahmed-dev/career-loom/issues. Because the plugin stores nothing, deleting your conversation in Claude removes what you shared.
