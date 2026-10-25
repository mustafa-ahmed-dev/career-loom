# Career Loom: volatility review list

Judgement calls made when the Volatility column was first assigned (24 October 2026). Where unsure, the shorter window was chosen. Review these at the next quarterly review and fix the column in `sources.md` if you disagree.

## How values were assigned (automatically, by ID range)
- `hypothesis`: S159 only (excluded from use; no shipped file cites it).
- `stable`: peer-reviewed studies and field experiments (for example S015, S016, S017, S035, S036, S057–S059, S063–S068, S070–S073, S156) and round-3 academic studies and working papers (S160–S163, S172–S174, S175, S181–S183, S196–S199).
- `quarterly`: GCC quota and legal sources (S081–S088), connectors, APIs, licences and platform documentation (S098–S141, S149–S155), KRG portals (S075–S078), and round-3 laws, tool changelogs, taxonomy licences, vendor pricing and competitor features.
- `annual`: everything else (recurring reports, regional guides, fonts).

## Needs a human look
| IDs | Why it is uncertain |
|---|---|
| S001–S014 (round 1, ATS and myths) | Assigned `annual` by default; several are one-off analyses that may be `stable` |
| S035, S036, S057, S058, S059 | Marked `stable` on the assumption they are peer-reviewed or official; link pending, so type unconfirmed |
| S068–S079 (Iraq/KRI) | Mix of studies (`stable`) and portals (`quarterly`); only S075–S078 were set `quarterly` |
| S092–S095 (Asia conventions, Japan form) | Laws and forms change; consider `quarterly` for S094 |
| S164, S165, S168 (EEOC, Korea, MHLW) | Set `quarterly`: legal and official-form sources |
| S169–S171 | Secondary coverage of the rirekisho form; set `annual` |
| S204, S205 (HireRight) | Annual vendor report, `annual`; each edition is a new source rather than an update |
| S214 | Third-party claim about Lightcast terms; `quarterly` until confirmed with Lightcast |
| S216, S217 | Greenhouse reports; `annual`, but a new edition each year supersedes them |

## Rule reminder
Volatility measures how fast a claim goes out of date, not how good the evidence is.
