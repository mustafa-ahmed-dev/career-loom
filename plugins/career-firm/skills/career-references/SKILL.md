---
name: career-references
description: "Shared references, evidence and tips library for the career plugin. Use whenever a user asks for sources, references, evidence, statistics, \"why\", myths, or more tips and tricks about résumés, CVs, cover letters, ATS, interviews, networking, job search, photos, design, typography or a specific country or region; and whenever another career skill needs to cite a statistic, rule or regional convention."
---

# Career References & Tips

This skill holds the evidence and practical tips behind every other career skill.

## Files
| Need | File |
|---|---|
| A source, link, author or evidence label | `sources.md` (IDs S001–S236; each row has Last checked and Volatility) |
| A myth the user believes | `myths-vs-reality.md` |
| The full integrity rules (no fabrication, privacy, banned items) | `rules/integrity.md` |
| A claim that must never be repeated | `banned-claims.md` |
| Blank templates (fact bank, report, critique) | `templates/` |
| A worked before/after example | `examples/` |
| ATS and parsing | `tips/ats-and-parsing.md` |
| Bullet formulas, numbers, Voice Fidelity | `tips/writing-bullets.md` |
| Cover letters | `tips/cover-letters.md` |
| Interview prep and difficulty levels L1–L5 | `tips/interviews.md` |
| Referrals and outreach | `tips/networking-and-referrals.md` |
| Weekly plan, ghost-job signals | `tips/search-strategy.md` |
| Photo and personal data | `tips/photo-and-personal-data.md` |
| Design tiers and layout | `tips/design-and-layout.md` |
| Fonts, RTL, scripts | `tips/multilingual-typography.md` |
| A specific country or region | `regions/<region>/pack.md` (conventions, where present) and `regions/<region>/tips.md`; list in `regions/README.md` |

Read only the file the question needs. Do not load the whole library.

## Citation and freshness rules

**Two kinds of evidence, never mixed up**
- **Library source**: an entry in `sources.md`. Cite as `[S###]` with its evidence label (Strong / Moderate / Vendor survey / U).
- **Live finding**: anything from web search in this session. Cite as "Live finding, retrieved YYYY-MM-DD, not in the firm's vetted library", with a link and an evidence label assigned by the same rubric. Never present a live finding as library-vetted.

**Look up, don't load.** Find entries by S-ID, the regional index or topic search. Never load all of `sources.md` into context.

**Default claims use the library only.** The Reality note, myths-vs-reality, scoring rationale and regional defaults cite library sources. A search result never replaces a library source for these.

**Freshness check before citing a library source**
1. Stale = days since last-checked exceed the window for its `Volatility` (stable 36 months, annual 12, quarterly 3). `hypothesis` entries are never stale; cite them as unverified hypotheses.
2. Not stale: cite normally.
3. Stale and web search is available: re-check with the same publisher's current page or edition.
   - Unchanged: cite as `[S###]`, "re-checked live YYYY-MM-DD".
   - Changed: present the new value as a live finding and say the library value may be out of date. Do not silently swap numbers.
   - Can't confirm either way: cite with "as of [last-checked]; may have changed".
4. Stale and no web search: cite with "as of [last-checked]; may have changed".
5. `link pending` entries: cite without a link and keep the flag visible. Don't substitute a search result as if it were that source.

**When to use live search**
- Time-sensitive facts (quotas, laws, connector or product status), questions the library doesn't cover, company research and posting samples.
- Vendor statistics stay directional ranges, named by source. Paraphrase; at most one short quote per source.
- Legal and quota statements always carry "not legal advice; verify with the ministry."

**Conflicts.** If a library source and a live finding disagree, show both with their labels and dates and say which has stronger evidence. Don't pick one silently.

**Banned claims.** Before stating any statistic or headline claim, check it against `banned-claims.md`. If it matches, don't use it, even when a live source repeats it; use the listed correction instead.

**Nothing persists.** Live findings are never written into `sources.md` during a user session. The library changes only in the developer's quarterly review.

## Rules
1. **Paraphrase only.** Never copy passages from a source. At most one short quote (under 15 words) per source, and only when the exact wording matters.
2. **Label every statistic** with its evidence level (Strong / Moderate / Vendor / Weak) and its source ID. Never present vendor statistics as fact.
3. **Respect "U" and "pending" flags.** Say "unverified" for any U item. Never cite S014, or anything marked "link pending", as if it were confirmed.
4. **Founder observations (S159) are n=1 anecdote.** Present them as "one job seeker's experience", never as verified market fact.
5. **Regulatory items** (GCC quotas, legal rules) always carry: "Not legal advice; verify with the ministry," plus the date captured.
6. **When asked for references,** give a short list of [title](link), the organization, a one-line takeaway and the evidence label. Use only sources relevant to the answer, never the whole file.
7. **When asked for tips,** give the 3–7 most relevant tips from the matching file, adapted to the user's region, role and language. Offer more on request.
8. **Answer in the user's chosen language;** English by default. Source titles stay in their original language.

## Footer (in the user's language)
Add this line at the end of every deliverable and at the end of each stage:
> You can ask me for the references behind this answer, or for more tips and tricks, at any time.

Do not add it to:
- short follow-up replies;
- individual questions during realistic mock-interview rounds (add it once in the debrief).

## Maintenance
- Re-check every `quarterly` source each quarter (GCC quotas S081–S088, connectors and APIs S098–S141, licences S206–S214, platform docs S233–S236, and others flagged in `sources.md`); `annual` sources each year; `stable` sources by link check every 36 months.
- Maintainers run the quarterly freshness review described in the repo's `docs/verification.md` and `docs/volatility-review.md` (not shipped with the plugin).
- When a source changes, update its row and its entry in the verification log; never silently change a statistic.
