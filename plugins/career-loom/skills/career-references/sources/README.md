# Sources data

`sources.csv` is the editable source of truth: one row per source. `../sources.md` holds the same rows as readable tables and is what the skills read today; until a generator exists, change both together, or change the CSV and ask Claude to regenerate the tables.

Columns: `id, region, country, topic, claim_supported, title, publisher, url, archive_url, author, published, checked, evidence_label, volatility, language, status, notes, round, section`.

- `status`: `listed`, `link-pending` (no URL yet), `excluded` (kept for ID stability, never cited; S159).
- `region`, `country`, `language`, `published` and `archive_url` are empty for the original rows and are filled as regions are researched. `archive_url` is a Wayback link.
- `evidence_label`: Strong / Moderate / Vendor / Weak (as in `sources.md`). `volatility`: stable (36 months) / annual (12) / quarterly (3) / hypothesis.
- Never add a row you have not opened yourself. AI-found links are leads until opened.

Maintainer tool (repo `tools/`, not shipped): `check_links.py` (run on your own machine; cloud sandboxes block most hosts). The one-off `migrate_sources.py` was removed after the CSV became the source of truth; it is in git history. Open about 10% of rows by hand after a link check.
