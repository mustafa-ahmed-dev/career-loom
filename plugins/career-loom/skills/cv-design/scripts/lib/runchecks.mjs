// Runs the five design checks for one design and returns a structured result. Used by tests and check-design.mjs.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SKILL_DIR, readJson, loadTokens, isRtl } from './util.mjs';
import { buildHtml, anchors } from './html.mjs';
import { renderPdf, closeBrowser } from './pdf.mjs';
import { contrastCheck, colourBlindCheck, greyscaleTokenCheck, greyscaleRenderCheck, hasPoppler, pdfText, readingOrder, fitMetrics } from './checks.mjs';
import { staticChecks } from './static.mjs';
import { missingGlyphs } from './glyphs.mjs';
import { familiesUsed, arabicFont } from './css.mjs';
import { render } from '../cv-render.mjs';

const DATA = join(SKILL_DIR, 'test-data');
const cvOf = (n) => readJson(join(DATA, n + '.json'));
const SAMPLES = [['en', 'short'], ['ar', 'ar'], ['ckb', 'ckb'], ['zh', 'zh'], ['hi', 'hi'], ['ru', 'ru']];
const SORANI = 'ڕڵۆێە';

export async function runChecks(id, outDir) {
  const { tokens, errors } = loadTokens(id);
  if (errors.length) throw new Error('invalid tokens: ' + errors.join('; '));
  mkdirSync(outDir, { recursive: true });
  const res = { id: tokens.id, name: tokens.name, tier: tokens.atsTier, checks: {} };
  const ok = (pass, detail) => ({ pass, ...detail });

  // 1 contrast + colour-blind
  const con = contrastCheck(tokens), cb = colourBlindCheck(tokens);
  res.checks.contrast = ok(con.pass && cb.pass, { contrast: con.rows, lowest: con.rows.reduce((m, r) => (r.ratio - r.min < m.ratio - m.min ? r : m)), colourBlindWorst: cb.worst });

  // render every sample (design + twin) once
  const pdfs = {};
  for (const [tag, file] of SAMPLES) {
    const r = await render(join(DATA, file + '.json'), { design: id, out: outDir, name: `${tokens.id.toLowerCase()}-${tag}`, format: 'pdf', rtl: 'auto', twin: 'on', allowDraft: true });
    pdfs[tag] = r;
  }
  for (const f of ['short', 'long']) pdfs[f] = await render(join(DATA, f + '.json'), { design: id, out: outDir, name: `${tokens.id.toLowerCase()}-${f}`, format: 'pdf', rtl: 'auto', twin: 'on', allowDraft: true });
  await closeBrowser();
  const pdfOf = (tag, role = 'design') => join(outDir, `${tokens.id.toLowerCase()}-${tag}${role === 'twin' ? '-ats' : ''}.pdf`);

  // 2 greyscale
  const gt = greyscaleTokenCheck(tokens);
  let gr = { pass: false, skipped: 'poppler not installed' };
  if (hasPoppler()) { gr = await greyscaleRenderCheck(pdfOf('short')); gr.pass = gr.pass && gt.pass; }
  res.checks.greyscale = ok(gt.pass && gr.pass, { tokens: gt.rows, rendered: gr });

  // 3 render tests: glyph coverage per script + Sorani glyphs + static rules
  const render3 = {};
  for (const [tag, file] of SAMPLES) {
    const cv = cvOf(file), fams = familiesUsed(tokens).filter((f) => f !== 'IBM Plex Mono');
    const text = JSON.stringify(cv).replace(/\\u[0-9a-f]{4}/gi, '');
    const miss = missingGlyphs(JSON.stringify(cv, null, 0).split('').filter((c) => !'{}[]":,'.includes(c)).join('') + ' ', fams);
    const rtl = isRtl(cv); const { html } = buildHtml(cv, tokens);
    render3[tag] = { dir: rtl ? 'rtl' : 'ltr', missingGlyphs: miss, staticViolations: staticChecks(html, cv), pdfs: pdfs[tag].designs.map((d) => d.design) };
  }
  const sorani = ['body', 'heading'].map((role) => ({ role, font: arabicFont(tokens.fonts[role], 'ckb'), missing: missingGlyphs(SORANI, [arabicFont(tokens.fonts[role], 'ckb')]) }));
  res.checks.render = ok(Object.values(render3).every((r) => !r.missingGlyphs.length && !r.staticViolations.length) && sorani.every((s) => !s.missing.length), { samples: render3, sorani });

  // 4 extraction (pdftotext, content-stream order) for every sample, design and twin
  const ex = {};
  if (hasPoppler()) {
    for (const [tag, file] of SAMPLES.concat([['long', 'long']])) {
      const cv = cvOf(file);
      for (const role of ['design', ...(tokens.twin ? ['twin'] : [])]) {
        const t = role === 'twin' ? loadTokens(tokens.twin).tokens : tokens;
        const rtl = isRtl(cv);
        const a = anchors(cv, t), skip = (x) => rtl && /[A-Za-z]/.test(x);
        const sidebar = t.layout.kind === 'sidebar';
        // LTR: content-stream order (what simple extractors emit). RTL: poppler's bidi-aware reading order; its column handling interleaves sidebars, so for RTL sidebars only the main column is order-checked and the sidebar is presence-checked.
        const raw = pdfText(pdfOf(tag, role), rtl ? 'default' : 'raw');
        const strict = (rtl && sidebar ? [...a.head, ...a.main] : [...a.head, ...a.side, ...a.main]).filter((x) => !skip(x));
        const r = readingOrder(raw, strict);
        const presence = readingOrder(raw, (rtl && sidebar ? a.side : []).filter((x) => !skip(x))).missing;
        const list = strict;
        const emailOk = raw.includes(cv.basics.email);
        ex[`${tag}/${role}`] = { ok: r.ok && emailOk && !presence.length, missing: [...r.missing, ...presence], outOfOrder: r.outOfOrder, email: emailOk, anchors: list.length };
      }
    }
  }
  res.checks.extraction = ok(hasPoppler() && Object.values(ex).every((e) => e.ok), { samples: ex, skipped: hasPoppler() ? undefined : 'poppler not installed' });

  // 5 fit
  const sh = await fitMetrics(pdfOf('short')), lg = await fitMetrics(pdfOf('long')), sar = await fitMetrics(pdfOf('ar'));
  const fill = (m) => +((m[0].bottom - m[0].top) / m[0].height).toFixed(2);
  const bottomOk = (m) => m.every((p) => p.height - p.bottom >= tokens.sizes.marginBottom * 2.835 * 0.9);
  const lastBullet = cvOf('long').work.at(-1).bullets.at(-1).slice(-30);
  const lgRaw = hasPoppler() ? pdfText(pdfOf('long'), 'raw').replace(/\s+/g, ' ') : '';
  res.checks.fit = ok(sh.length === 1 && fill(sh) >= 0.4 && sar.length === 1 && fill(sar) >= 0.3 && lg.length === 2 && bottomOk(lg) && bottomOk(sh) && lgRaw.includes(lastBullet), {
    short: { pages: sh.length, fill: fill(sh) }, shortArabic: { pages: sar.length, fill: fill(sar) }, long: { pages: lg.length, bottomClear: bottomOk(lg), lastBulletPresent: lgRaw.includes(lastBullet) },
  });

  res.twin = tokens.twin ? { design: tokens.twin, produced: Object.values(pdfs).every((r) => r.designs.some((d) => d.role === 'ats-twin')) } : null;
  res.pass = Object.values(res.checks).every((c) => c.pass) && (!res.twin || res.twin.produced);
  writeFileSync(join(outDir, `${tokens.id.toLowerCase()}-results.json`), JSON.stringify(res, null, 1));
  return res;
}
