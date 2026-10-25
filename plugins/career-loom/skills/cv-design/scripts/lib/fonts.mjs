import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { FONTS_DIR, FONTS_CACHE_DIR, readJson } from './util.mjs';

export function inRange(range, cps) {
  if (!range) return true;
  const spans = range.split(',').map((r) => r.trim().replace(/^U\+/i, '').split('-').map((h) => parseInt(h, 16)));
  return cps.some((c) => spans.some(([a, b]) => (b === undefined ? c === a : c >= a && c <= b)));
}
export function loadManifest(dir) {
  const f = join(dir, 'fonts.json');
  return existsSync(f) ? readJson(f).families : {};
}
// Fonts that are fetched on demand are only reported missing when the text really contains their script.
const ON_DEMAND = { 'Noto Sans SC': [[0x2e80, 0xa4cf], [0xac00, 0xd7af], [0xf900, 0xfaff], [0xff00, 0xffef]], 'Noto Sans Devanagari': [[0x0900, 0x097f], [0xa8e0, 0xa8ff]] };
const needed = (fam, cps) => !ON_DEMAND[fam] || cps.some((c) => ON_DEMAND[fam].some(([a, b]) => c >= a && c <= b));

/** @font-face CSS embedding (base64) only the font files whose unicode range covers characters used in `text`. */
export function fontFaceCss(families, text) {
  const cps = [...new Set([...text].map((c) => c.codePointAt(0)))];
  const sources = [[FONTS_DIR, loadManifest(FONTS_DIR)], [FONTS_CACHE_DIR, loadManifest(FONTS_CACHE_DIR)]];
  const missing = [];
  let css = '';
  for (const fam of families) {
    let found = false;
    for (const [dir, man] of sources) {
      for (const f of man[fam] ?? []) {
        found = true;
        if (!inRange(f.range, cps)) continue;
        const b64 = readFileSync(join(dir, f.file)).toString('base64');
        css += `@font-face{font-family:"${fam}";font-weight:${f.weight};font-style:normal;src:url(data:font/woff2;base64,${b64}) format("woff2");${f.range ? `unicode-range:${f.range};` : ''}}\n`;
      }
    }
    if (!found && needed(fam, cps)) missing.push(fam);
  }
  return { css, missing };
}
