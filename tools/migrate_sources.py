"""One-off migration: sources.md tables -> sources/sources.csv.

Usage: python3 tools/migrate_sources.py
Run from the repo root. The CSV becomes the editable source of truth.
"""
import csv, re, pathlib

REF = pathlib.Path("plugins/career-loom/skills/career-references")
SRC = REF / "sources.md"
OUT = REF / "sources" / "sources.csv"
COLS = ["id", "region", "country", "topic", "claim_supported", "title", "publisher", "url",
        "archive_url", "author", "published", "checked", "evidence_label", "volatility",
        "language", "status", "notes", "round", "section"]

def cells(line):
    parts = [c.strip() for c in line.strip().strip("|").split(" | ")]
    return parts

rows, section = [], ""
for line in SRC.read_text(encoding="utf-8").splitlines():
    if line.startswith("## "):
        section = re.sub(r"^## \d+\.\s*", "", line[3:]).strip()
    elif re.match(r"\| S\d{3}", line):
        c = cells(line)
        if len(c) != 9:
            raise SystemExit(f"bad row ({len(c)} cells): {line[:80]}")
        sid, src, author, org, supports, ev, rnd, checked, vol = c
        m = re.match(r"\[(.+?)\]\((https?://[^)]+)\)", src)
        title, url = (m.group(1), m.group(2)) if m else (src, "")
        title = title.strip("*").strip()
        notes = []
        if "Link pending" in src or "link pending" in src.lower():
            notes.append("link pending")
        if src.startswith("*") or (m and m.group(1).startswith("*")):
            notes.append("title inferred from link")
        status = "excluded" if sid == "S159" or "EXCLUDED" in src else ("link-pending" if not url else "listed")
        rows.append({
            "id": sid, "region": "", "country": "", "topic": section,
            "claim_supported": supports, "title": title.replace("Link pending.", "").strip(),
            "publisher": org, "url": url, "archive_url": "",
            "author": "" if author == "Not identified" else author, "published": "",
            "checked": checked.replace(" (earliest possible)", ""),
            "evidence_label": ev, "volatility": vol, "language": "", "status": status,
            "notes": "; ".join(notes + (["checked date is earliest possible"] if "earliest possible" in checked else [])),
            "round": rnd, "section": section,
        })

OUT.parent.mkdir(parents=True, exist_ok=True)
with OUT.open("w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=COLS)
    w.writeheader(); w.writerows(rows)
ids = [r["id"] for r in rows]
print(len(rows), "rows;", len(set(ids)), "unique ids;", ids[0], "->", ids[-1])
