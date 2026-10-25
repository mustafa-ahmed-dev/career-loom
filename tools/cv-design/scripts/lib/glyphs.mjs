import { join } from 'node:path';
import { FONTS_DIR, FONT_CACHE_DIR } from './util.mjs';
import { inRange, loadManifest } from './fonts.mjs';

import { openSync } from 'fontkit';
const opened = new Map();
const open = (file) => opened.get(file) ?? (opened.set(file, openSync(file)), opened.get(file));
/** Code points of `text` that none of `families` can draw (looks only at bundled + cached font files). */
export function missingGlyphs(text, families) {
  const cps = [...new Set([...text].map((c) => c.codePointAt(0)).filter((c) => c > 32 && !(c >= 0x200b && c <= 0x200f) && !(c >= 0x202a && c <= 0x202e) && !(c >= 0x2066 && c <= 0x2069)))];
  const sources = [[FONTS_DIR, loadManifest(FONTS_DIR)], [FONT_CACHE_DIR, loadManifest(FONT_CACHE_DIR)]];
  const missing = [];
  for (const cp of cps) {
    let ok = false;
    for (const fam of families) {
      for (const [dir, man] of sources) {
        for (const f of man[fam] ?? []) {
          if (f.weight !== 400 || !inRange(f.range, [cp])) continue;
          if (open(join(dir, f.file)).hasGlyphForCodePoint(cp)) { ok = true; break; }
        }
        if (ok) break;
      }
      if (ok) break;
    }
    if (!ok) missing.push(String.fromCodePoint(cp));
  }
  return missing;
}
