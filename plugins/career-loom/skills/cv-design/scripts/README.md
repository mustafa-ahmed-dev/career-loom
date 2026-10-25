# CV renderer (optional)

The design itself is plain files (`../systems/<id>/spec.md`, `design.css`, `components.html`); Claude can write the HTML from them with no install. This renderer is an optional extra for a laptop and the maintainers' checking tool: it runs the five design checks on all 20 designs.

Turns a CV written as JSON into a PDF and/or an HTML file using one of the Career Loom design systems (`../systems/`). Everything runs locally. The CV is not uploaded anywhere. Fonts are embedded from `../fonts/`.

**Not runnable inside claude.ai chat.** It needs Node.js, a Chromium download and the ability to write files, none of which chat provides. It is meant for a laptop, Claude Code or similar.

## Requirements

- Node.js 20 or newer (`engines` in `package.json`).
- Disk: `node_modules` was 139 MB on my install, plus Playwright's Chromium download (size not measured).
- Only for the tests: poppler (`pdftotext`, `pdftoppm`, `pdfinfo`) and the fonts from `node fetch-fonts.mjs` (see Install).

## Install

```
cd plugins/career-loom/skills/cv-design/scripts
npm install
npx playwright install chromium
```

PDF output needs a Chromium-based browser. The renderer looks, in this order, for: the browser at `CL_BROWSER_PATH` (set it to a `.exe` or binary you choose), Playwright's own Chromium (the `npx playwright install chromium` step), then Microsoft Edge, then Google Chrome. If the Playwright download is blocked on your network, you can skip it on Windows 10/11 because Edge is normally installed (on one Windows machine where the Playwright download was blocked, a PDF was made through this fallback with Microsoft Edge, Chromium 156.0.4314.42, as reported by the summary's `pdfBrowser` line). `--format html` needs no browser at all; open the file and use the browser's Print to PDF if you want.

Once, needs internet: `node fetch-fonts.mjs` downloads the Noto Sans SC (Chinese) and Noto Sans Devanagari fonts into `../fonts/cache/` (gitignored). It uses `npm pack` and `tar`, so both must be on your PATH.

Optional for rendering: only needed for Chinese or Devanagari CVs. **Required before running the tests** (`npm test`, `check-design.mjs`): the render check covers the Chinese and Hindi samples, and on a checkout without these fonts it fails with missing glyphs and the p1 and c9 design tests fail (verified on a clean checkout: 2 of 41 tests fail). Without the fonts, a CV containing that script prints a "Fonts not available" warning and exits with code 3 (the files are still written, with fallback glyphs or gaps). English, Arabic and Cyrillic CVs never need them and exit 0.

## Usage

```
node cv-render.mjs <cv.json> --design <id> [--out dir] [--name base] [--format pdf,html] [--rtl auto|on|off] [--twin on|off] [--allow-draft]
```

| Flag | Default | Meaning |
|---|---|---|
| `<cv.json>` | required | Path to the CV file. |
| `--design` | required | Design id, case-insensitive: `p1`, `c9`, ... (folder names under `../systems/`). |
| `--out` | `.` | Output folder, created if missing. |
| `--name` | the input file name without `.json` | Base name of the output files. |
| `--format` | `pdf,html` | Comma list of `pdf` and `html`. Anything else (including `docx`) is refused with exit 1; there is no Word output. |
| `--rtl` | `auto` | `auto` follows the CV language/`meta.dir`; `on` or `off` forces it. Any other value behaves like `auto`. |
| `--twin` | `on` | `off` skips the A-rated twin for tier C/D designs. Any value except `off` means on. |
| `--allow-draft` | off | Render designs whose status is `draft` (or `stub`). Not needed for finished designs. |

All 20 designs (`p1`-`p8`, `c1`, `c3`, `c5`-`c12`, `c15`, `c20`) are `finished` and render without `--allow-draft`. A design that is a stub would stop with "Design X is a stub" and list the finished ones (exit 4); `--allow-draft` only lets a `draft` design through.

Example:

```
node cv-render.mjs ../test-data/short.json --design c9 --out ./out
```

Prints a JSON summary (files, warnings, per-design tier, pages, RTL, and `pdfBrowser`: which browser printed the PDFs, for example `msedge (Chromium 156...)`) to stdout; errors go to stderr.

### Exit codes

| Code | When |
|---|---|
| 0 | Done, no warnings. |
| 1 | Missing CV path or `--design` (usage is printed), unknown design id, or any other unexpected error. |
| 2 | CV JSON fails `../schema/cv.schema.json`, a design's `tokens.json` is invalid, or the language has no built-in labels and no `meta.labels`. |
| 3 | Files were written, with warnings: more pages than the design's limit (2), content wider than the page, or the CV contains Chinese or Devanagari text and `fetch-fonts.mjs` has not been run. |
| 4 | The design is a stub (cannot be rendered at all), or is `draft` and `--allow-draft` was not passed. |

## CV JSON

Schema: `../schema/cv.schema.json`. Unknown keys are rejected (so there is no field for skill percentages, photos, salary, ID numbers or street addresses). `meta.lang` and `basics.name` are required. Dates are free text. `"Present"` is replaced by the language's label. Sections: `summary`, `highlights` (2 to 4 `{value, label}` facts, already in the body), `work`, `projects`, `education`, `volunteer`, `publications`, `skills`, `languages`, `certificates`.

Section headings exist for `en` and `ar` only. For any other `meta.lang`, add `meta.labels` (keys: `summary work education skills languages projects certificates volunteer publications contact links present highlights`).

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

For `--name cv` and tier A/B design `X`: `cv.pdf` and `cv.html`.

For a tier C or D design the same set is written for the design, plus the A-rated twin as `cv-ats.pdf` / `cv-ats.html`. Use the twin for job portals and ATS uploads.

The renderer writes no Word file. The design is the HTML plus its rules (`../systems/<id>/spec.md`, `design.css`, `components.html`). To get a Word document, ask Claude to convert the finished HTML (for a tier C or D design, its A-rated twin). Such a conversion is not part of this project's checks: expect columns, bands, ribbons, timelines and cards to be simplified, and it has not been verified in Microsoft Word.

PDFs are tagged and use fonts embedded as subsets. The page limit is 2; going over gives a warning and exit 3.

## Tests

```
npm test                      # node run-tests.mjs: runs every ../tests/*.test.mjs (Node 20+)
node check-design.mjs p1 c9   # the five checks for chosen designs, optional --out <dir>
```

`npm test` runs: token/schema rules for all 20 designs, CLI behaviour, tests that feed deliberately bad input to the check functions, and the five design checks for every design that is not a stub. The design checks need `pdftotext`/`pdftoppm` (poppler) . Without them extraction and greyscale fail. Per-design results are written to `../tests/results/` (gitignored). `check-design.mjs` prints PASS/FAIL per check and exits 1 if any design fails; on my run p1 and c9 took about 27 seconds together and passed all five, and `npm test` ran 81 tests, all passing, in about 2 minutes (with poppler installed and the Noto fonts fetched).

The font-warning test in `cli.test.mjs` does not touch `fonts/cache`: it points the environment variable `CL_FONT_CACHE` at an empty folder. The same variable can move the font cache (`fetch-fonts.mjs` writes to it too; default `../fonts/cache/`). The test files therefore run in parallel safely.

### The five checks (`lib/checks.mjs`, `lib/runchecks.mjs`)

1. **contrast** - WCAG contrast ratio of each colour pair the design uses (text, muted, accent on the background >= 4.5; rule >= 3; band and sidebar pairs when present). The same pairs are recomputed after protanopia, deuteranopia and tritanopia simulation (Machado 2009 matrices, severity 1.0) and must still pass.
2. **greyscale** - the pairs are converted to grey (Rec. 601 luma) and re-tested; then the rendered `short` sample PDF is rasterised at 150 dpi with `pdftoppm` and, for every text item, the ink-to-paper contrast in its box must be >= 4.5. Needs poppler.
3. **render** - for six samples (en, ar, ckb, zh, hi, ru): every character must exist in the bundled or cached fonts (read with fontkit); the Sorani letters ڕ ڵ ۆ ێ ە must exist in the font actually used; and the generated HTML must contain no `img/svg/canvas/progress/meter`, no page header/footer boxes, no percentages in skills or languages, and must include the email.
4. **extraction** - `pdftotext` on each sample PDF, for the design and its twin. Key strings (name, headline, section headings, entry titles) must appear in the right order and the email must appear. LTR uses content-stream order. RTL uses poppler's own reading order, skips Latin strings, and for RTL sidebar designs only checks presence of the sidebar strings (not their order), because poppler interleaves columns. This is weaker than a real ATS.
5. **fit** - the short sample is 1 page and its text fills at least 40% of the page height; the Arabic sample is 1 page, at least 30%; the long sample is exactly 2 pages, keeps the bottom margin, and its last bullet is present. "Fill" is measured from text extents, not pixels.


## Other scripts

- `node record-results.mjs p1 [c9 ...]` writes the check results from `tests/results/<id>.json` into the RESULTS block of that design's `spec.md`. Run `npm test` first.
- `node build-design-files.mjs [--check]` writes `design.css`, `components.html` and the Tokens block of `spec.md` for every finished design, from `tokens.json`. `--check` exits 1 if they are stale; `npm test` runs it.
- `node build-gallery.mjs` rebuilds `docs/gallery/` (static page, thumbnails, sample PDFs) for every finished design. Needs `pdftoppm` and a prior `npm test`. I did not run either script; this is from reading their header comments.

## Known limits

- Windows: tested by hand on one Windows machine (Git Bash, Node 24): the CLI starts, HTML is written, a PDF is made through the Microsoft Edge fallback (Chromium 156.0.4314.42, reported by `pdfBrowser`), and `node fetch-fonts.mjs` downloads both Noto packs (after the fix in `lib/npm.mjs`, which starts `npm.cmd` with the command name unquoted). The Chinese and Hindi sample CVs then rendered with no warnings and, checked by eye in the PDFs, show real characters (Noto Sans SC and Noto Sans Devanagari embedded). Not verified on Windows: the Windows version, and Google Chrome as the fallback. `npm test` and `check-design.mjs` need poppler (`pdftotext`, `pdftoppm`), which is awkward to install on Windows; use WSL for the tests. Keep the repo in a folder path without spaces to be safe.

- Not runnable inside claude.ai chat (see above).
- Arabic-script text is rendered with ligatures disabled, so PDF text extraction keeps letter order. The letters look less joined than normal typesetting. This is deliberate.
- Sorani: glyph coverage and extraction are tested, but nobody who reads Sorani natively has reviewed the output. Treat it as unreviewed. Sorani CVs need `meta.labels` (no built-in headings). The Cairo-to-IBM-Plex-Sans-Arabic swap is applied to every Sorani or Kurdish document.
- Chinese and Hindi PDFs need the fonts from `fetch-fonts.mjs`; otherwise those characters fall back to a generic sans-serif.
- Layout flags and what they do: see `../systems/TOKENS.md`.
- The check thresholds are this project's choices, not an external standard, except the WCAG ratios.
