# CV renderer

Turns a CV written as JSON into a PDF, a DOCX and/or an HTML file using one of the Career Loom design systems (`../systems/`). Everything runs locally. The CV is not uploaded anywhere. Fonts are embedded from `../fonts/`.

**Not runnable inside claude.ai chat.** It needs Node.js, a Chromium download and the ability to write files, none of which chat provides. It is meant for a laptop, Claude Code or similar.

## Requirements

- Node.js 20 or newer (`engines` in `package.json`).
- Disk: `node_modules` was 139 MB on my install, plus Playwright's Chromium download (size not measured).
- Only for the tests: poppler (`pdftotext`, `pdftoppm`, `pdfinfo`) and LibreOffice (`soffice`).

## Install

```
cd plugins/career-loom/skills/cv-design/scripts
npm install
npx playwright install chromium
```

Optional, once, needs internet: `node fetch-fonts.mjs` downloads the Noto Sans SC (Chinese) and Noto Sans Devanagari fonts into `../fonts/cache/` (gitignored). It uses `npm pack` and `tar`, so both must be on your PATH.

Only needed for Chinese or Devanagari CVs. Without the fonts, a CV containing that script prints a "Fonts not available" warning and exits with code 3 (the files are still written, with fallback glyphs or gaps). English, Arabic and Cyrillic CVs never need them and exit 0.

## Usage

```
node cv-render.mjs <cv.json> --design <id> [--out dir] [--name base] [--format pdf,docx,html] [--rtl auto|on|off] [--twin on|off] [--allow-draft]
```

| Flag | Default | Meaning |
|---|---|---|
| `<cv.json>` | required | Path to the CV file. |
| `--design` | required | Design id, case-insensitive: `p1`, `c9`, ... (folder names under `../systems/`). |
| `--out` | `.` | Output folder, created if missing. |
| `--name` | the input file name without `.json` | Base name of the output files. |
| `--format` | `pdf,docx` | Comma list of `pdf`, `docx`, `html`. Other values are ignored without an error. |
| `--rtl` | `auto` | `auto` follows the CV language/`meta.dir`; `on` or `off` forces it. Any other value behaves like `auto`. |
| `--twin` | `on` | `off` skips the A-rated twin for tier C/D designs. Any value except `off` means on. |
| `--allow-draft` | off | Render designs whose status is `draft` (or `stub`). Not needed for finished designs. |

`p1` (tier A) and `c9` (tier C) are `finished`, so they render without `--allow-draft`. The other 18 designs are stubs with no layout data: `--allow-draft` does not help: the renderer stops with "Design X is a stub" and lists the finished designs (exit 4).

Example:

```
node cv-render.mjs ../test-data/short.json --design c9 --out ./out
```

Prints a JSON summary (files, warnings, per-design tier, pages, RTL, DOCX status) to stdout; errors go to stderr.

### Exit codes

| Code | When |
|---|---|
| 0 | Done, no warnings. |
| 1 | Missing CV path or `--design` (usage is printed), unknown design id, or any other unexpected error. |
| 2 | CV JSON fails `../schema/cv.schema.json`, a design's `tokens.json` is invalid, or the language has no built-in labels and no `meta.labels`. |
| 3 | Files were written, with warnings: more pages than the design's limit (2), content wider than the page, or the CV contains Chinese or Devanagari text and `fetch-fonts.mjs` has not been run. |
| 4 | The design is a stub (cannot be rendered at all), or is `draft` and `--allow-draft` was not passed. |

## CV JSON

Schema: `../schema/cv.schema.json`. Unknown keys are rejected (so there is no field for skill percentages, photos, salary, ID numbers or street addresses). `meta.lang` and `basics.name` are required. Dates are free text. `"Present"` is replaced by the language's label. Sections: `summary`, `work`, `projects`, `education`, `volunteer`, `publications`, `skills`, `languages`, `certificates`.

Section headings exist for `en` and `ar` only. For any other `meta.lang`, add `meta.labels` (keys: `summary work education skills languages projects certificates volunteer publications contact links present`).

```json
{
  "meta": { "lang": "en" },
  "basics": {
    "name": "Sara Test",
    "headline": "Customer Support Specialist",
    "email": "sara.test@example.com",
    "phone": "+964 750 000 0000",
    "location": "Erbil, Iraq",
    "links": [{ "label": "LinkedIn", "url": "linkedin.com/in/sara-test-example" }]
  },
  "summary": "Support specialist with three years of chat and phone experience.",
  "work": [
    { "title": "Customer Support Agent", "org": "Example Electronics Co.", "location": "Erbil",
      "start": "2022-03", "end": "Present",
      "bullets": ["Handled about 40 tickets per day (self-reported).", "Trained 3 new agents."] }
  ],
  "education": [{ "title": "BSc Computer Science", "org": "Example University", "start": "2019", "end": "2023" }],
  "skills": [{ "name": "Tools", "items": ["Zendesk", "Excel"] }],
  "languages": [{ "name": "Arabic", "level": "Native" }, { "name": "English", "level": "C1" }]
}
```

Full synthetic samples (English, Arabic, Sorani, Chinese, Hindi, Russian, and a two-page one) are in `../test-data/`. All data there is invented.

## Output

For `--name cv` and tier A/B design `X`: `cv.pdf`, `cv.docx` (and `cv.html` if requested).

For a tier C or D design the same set is written for the design, plus the A-rated twin as `cv-ats.pdf` / `cv-ats.docx`. Use the twin for job portals and ATS uploads.

| Tier | PDF | DOCX |
|---|---|---|
| A, B | yes | yes |
| C | yes | best effort: always a single column (no sidebar), real headings and bullets, no tables or text boxes |
| D | yes | none (PDF only) |

PDFs are tagged and use fonts embedded as subsets. The page limit is 2; going over gives a warning and exit 3.

## Tests

```
npm test                      # node --test ../tests/*.test.mjs
node check-design.mjs p1 c9   # the five checks for chosen designs, optional --out <dir>
```

`npm test` runs: token/schema rules for all 20 designs, CLI behaviour, tests that feed deliberately bad input to the check functions, and the five design checks for every design that is not a stub. The design checks need `pdftotext`/`pdftoppm` (poppler) and the DOCX check needs `soffice` (LibreOffice). Without them extraction and greyscale fail (poppler) or the DOCX check is reported "not verified" (LibreOffice). Per-design results are written to `../tests/results/` (gitignored). `check-design.mjs` prints PASS/FAIL per check and exits 1 if any design fails; on my run p1 and c9 took about 23 seconds together and passed all five, and `npm test` ran 36 tests, all passing, in about 22 seconds (with poppler and LibreOffice installed).

### The five checks (`lib/checks.mjs`, `lib/runchecks.mjs`)

1. **contrast** - WCAG contrast ratio of each colour pair the design uses (text, muted, accent on the background >= 4.5; rule >= 3; band and sidebar pairs when present). The same pairs are recomputed after protanopia, deuteranopia and tritanopia simulation (Machado 2009 matrices, severity 1.0) and must still pass.
2. **greyscale** - the pairs are converted to grey (Rec. 601 luma) and re-tested; then the rendered `short` sample PDF is rasterised at 150 dpi with `pdftoppm` and, for every text item, the ink-to-paper contrast in its box must be >= 4.5. Needs poppler.
3. **render** - for six samples (en, ar, ckb, zh, hi, ru): every character must exist in the bundled or cached fonts (read with fontkit); the Sorani letters ڕ ڵ ۆ ێ ە must exist in the font actually used; and the generated HTML must contain no `img/svg/canvas/progress/meter`, no page header/footer boxes, no percentages in skills or languages, and must include the email.
4. **extraction** - `pdftotext` on each sample PDF, for the design and its twin. Key strings (name, headline, section headings, entry titles) must appear in the right order and the email must appear. LTR uses content-stream order. RTL uses poppler's own reading order, skips Latin strings, and for RTL sidebar designs only checks presence of the sidebar strings (not their order), because poppler interleaves columns. This is weaker than a real ATS.
5. **fit** - the short sample is 1 page and its text fills at least 40% of the page height; the Arabic sample is 1 page, at least 30%; the long sample is exactly 2 pages, keeps the bottom margin, and its last bullet is present. "Fill" is measured from text extents, not pixels.

DOCX (not one of the five): for tier A/B/C each of en/ar/long is written, converted to PDF by LibreOffice, and the XML is checked for text order, bidi flags (RTL) and at least 3 `Heading2` paragraphs. Informational for tier C; none for D.

## Other scripts

- `node record-results.mjs p1 [c9 ...]` writes the check results from `tests/results/<id>.json` into the RESULTS block of that design's `spec.md`. Run `npm test` first.
- `node build-gallery.mjs` rebuilds `docs/gallery/` (static page, thumbnails, sample PDFs) for every finished design. Needs `pdftoppm` and a prior `npm test`. I did not run either script; this is from reading their header comments.

## Known limits

- Not runnable inside claude.ai chat (see above).
- DOCX is verified only by converting in LibreOffice. It has not been opened in Microsoft Word.
- Arabic-script text is rendered with ligatures disabled, so PDF text extraction keeps letter order. The letters look less joined than normal typesetting. This is deliberate.
- Sorani: glyph coverage and extraction are tested, but nobody who reads Sorani natively has reviewed the output. Treat it as unreviewed. Sorani CVs need `meta.labels` (no built-in headings). The Cairo-to-IBM-Plex-Sans-Arabic swap applies to both PDF and DOCX.
- Chinese and Hindi PDFs need the fonts from `fetch-fonts.mjs`; otherwise those characters fall back to a generic sans-serif.
- Token flags not implemented yet: `header` `band`/`split` and `headingStyle` `bar-start`/`ribbon` render as plain and the CLI warns (exit 3). DOCX ignores `bulletStyle`, `dateAlign` and `headingStyle`. See `../systems/TOKENS.md`.
- The check thresholds are this project's choices, not an external standard, except the WCAG ratios.
