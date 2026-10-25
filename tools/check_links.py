"""Check every URL in sources/sources.csv. Prints a report; does not edit the CSV.

Usage: python3 tools/check_links.py [out.csv]
Treat 403/429 as 'blocked, check by hand', not as dead. Always open ~10% manually.
"""
import csv, sys, concurrent.futures as cf, urllib.request, urllib.error, ssl, pathlib

CSV = pathlib.Path("plugins/career-firm/skills/career-references/sources/sources.csv")
UA = {"User-Agent": "Mozilla/5.0 (compatible; source-link-check)"}

def check(row):
    url = row["url"]
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, headers=UA, method=method)
            with urllib.request.urlopen(req, timeout=20) as r:
                return row["id"], url, r.status, "ok" if r.status < 400 else "bad"
        except urllib.error.HTTPError as e:
            if method == "HEAD" and e.code in (400, 403, 405, 501):
                continue
            return row["id"], url, e.code, "blocked" if e.code in (401, 403, 429) else "bad"
        except Exception as e:
            if method == "HEAD":
                continue
            msg = str(e)
            return row["id"], url, 0, ("proxy-denied" if "403 Forbidden" in msg and "Tunnel" in msg else "error:" + type(e).__name__)
    return row["id"], url, 0, "error"

rows = [r for r in csv.DictReader(CSV.open(encoding="utf-8")) if r["url"] and r["status"] != "excluded"]
with cf.ThreadPoolExecutor(12) as ex:
    res = list(ex.map(check, rows))
out = csv.writer(open(sys.argv[1], "w", newline="") if len(sys.argv) > 1 else sys.stdout)
out.writerow(["id", "url", "http", "result"]); out.writerows(res)
import collections
print(collections.Counter(r[3].split(":")[0] for r in res), file=sys.stderr)
