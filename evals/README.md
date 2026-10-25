# Evals

Automated checks that the plugin keeps its promises (nothing fabricated, privacy rules, honest labels, no auto-apply). All inputs are synthetic; never put a real person's CV here, the repo is public.

- `cases.json`: each case has a prompt, an `expect` sentence for human review, and keyword rules (`must_match`, `must_match_any`, `must_not_match`).
- `run_evals.py`: runs every case with `claude -p --plugin-dir plugins/career-loom`, saves answers to `evals/out/` (gitignored) and prints PASS/FAIL.

Run from the repo root: `python3 evals/run_evals.py` (or add case ids to run a few). A PASS only means the keyword rules held; read the saved answer against the `expect` line before trusting a change. Add a case whenever you find a failure in real use.

Not yet covered: long Arabic CVs, full interview scoring, localization rules per region, document design output.
