# Career Loom: notices

Planned third-party data (not included in v0.1):
- ESCO (European Commission), CC BY 4.0. Confirm exact wording before release.
- O*NET database (US DOL/ETA), CC BY 4.0, with attribution.
- JSON Resume schema (MIT).
- Fonts: OFL only (Inter, Noto, Vazirmatn, IBM Plex after testing).

Fonts (CV renderer, `skills/cv-design/fonts/`). All SIL Open Font License 1.1. Each bundled family keeps its `OFL.txt` in its folder; files were obtained through the `@fontsource` npm packages (subsetted woff2):
- Inter. Copyright 2016 The Inter Project Authors (https://github.com/rsms/inter). Bundled.
- IBM Plex Sans Arabic. Copyright 2019 IBM Corp. Bundled.
- IBM Plex Mono. Copyright 2017 IBM Corp. Bundled.
- Cairo. Copyright 2009 The Cairo Project Authors (https://github.com/Gue3bara/Cairo). Bundled.
- Source Serif 4. Copyright 2014-2023 Adobe (http://www.adobe.com/), with Reserved Font Name 'Source'. Bundled as subsetted woff2 from `@fontsource/source-serif-4`; the licence text in `OFL.txt` is the upstream `LICENSE.md` of adobe-fonts/source-serif.
- Noto Naskh Arabic. Copyright 2022 The Noto Project Authors (https://github.com/notofonts/arabic). Bundled.
- Noto Sans SC and Noto Sans Devanagari (OFL 1.1, via `@fontsource/noto-sans-sc` and `@fontsource/noto-sans-devanagari`). Not bundled and not redistributed: `skills/cv-design/scripts/fetch-fonts.mjs` downloads them on the user's machine into `fonts/cache/` (gitignored). The Devanagari package's licence file reads "Copyright 2022 The Noto Project Authors (https://github.com/notofonts/devanagari)"; the Noto Sans SC package's licence file names only "Google Inc." as the holder.

npm dependencies of the renderer (`skills/cv-design/scripts/package.json`; installed by the user with `npm install`, not shipped in the plugin). Licences read from each package's `package.json` at the installed version:
- ajv 8.17.1, MIT.
- docx 9.5.0, MIT.
- playwright 1.63.0, Apache-2.0. It downloads Chromium separately (`npx playwright install chromium`); that download has its own licences, which have not been reviewed here.
- fontkit 2.0.4, MIT (dev dependency, used by the tests).
- jszip 3.10.2, "MIT OR GPL-3.0-or-later" (dev dependency, used by the tests).
- pdfjs-dist 4.10.38, Apache-2.0 (dev dependency, used by the tests).
Transitive dependencies were not audited.
