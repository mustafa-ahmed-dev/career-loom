"""Run the plugin evals non-interactively and report PASS/FAIL per case.

Usage (from repo root): python3 evals/run_evals.py [case-id ...]
Needs the `claude` CLI. Checks are keyword rules: a PASS is necessary, not sufficient.
Read the saved outputs in evals/out/ (gitignored) and judge the 'expect' line by eye.
"""
import json, re, subprocess, sys, pathlib, concurrent.futures as cf

ROOT = pathlib.Path(__file__).resolve().parent
PLUGIN = ROOT.parent / "plugins" / "career-firm"
OUT = ROOT / "out"; OUT.mkdir(exist_ok=True)
cases = json.loads((ROOT / "cases.json").read_text(encoding="utf-8"))["cases"]
if sys.argv[1:]:
    cases = [c for c in cases if c["id"] in sys.argv[1:]]

def run(c):
    try:
        p = subprocess.run(["claude", "-p", "--plugin-dir", str(PLUGIN), c["prompt"]],
                           capture_output=True, text=True, timeout=240, cwd=OUT)
        text = p.stdout
    except subprocess.TimeoutExpired:
        text = ""
    (OUT / f'{c["id"]}.txt').write_text(text, encoding="utf-8")
    fails = []
    if not text.strip():
        fails.append("empty output")
    for pat in c.get("must_match", []):
        if not re.search(pat, text, re.I): fails.append(f"missing: {pat}")
    for group in c.get("must_match_any", []):
        if not any(re.search(re.escape(g) if not any(ch in g for ch in "[]\\|?*+") else g, text, re.I) for g in group):
            fails.append(f"none of: {group}")
    for pat in c.get("must_not_match", []):
        if re.search(pat, text, re.I): fails.append(f"forbidden: {pat}")
    return c["id"], fails

with cf.ThreadPoolExecutor(4) as ex:
    results = list(ex.map(run, cases))
bad = 0
for cid, fails in results:
    print(("PASS " if not fails else "FAIL ") + cid + ("" if not fails else "  -> " + "; ".join(fails)))
    bad += bool(fails)
print(f"{len(results) - bad}/{len(results)} passed")
sys.exit(1 if bad else 0)
