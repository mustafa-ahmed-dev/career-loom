// Design checks used by tests/ and scripts/check-design.mjs. Pure functions where possible.
import { spawnSync } from 'node:child_process';
import { readFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/* ---------- colour maths ---------- */
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
export const luminance = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
export const ratio = (a, b) => { const [x, y] = [luminance(rgb(a)), luminance(rgb(b))]; return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const toHex = (v) => '#' + v.map((n) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0')).join('');

/** Colour pairs a design actually uses. minRatio: 4.5 for text, 3 for non-text (rules). */
export function pairs(c) {
  const p = [['text', 'bg', 4.5], ['muted', 'bg', 4.5], ['accent', 'bg', 4.5], ['rule', 'bg', 3]];
  if (c.bandBg) p.push(['bandText', 'bandBg', 4.5]);
  if (c.ribbonBg) p.push(['ribbonText', 'ribbonBg', 4.5]);
  if (c.cardBg) p.push(['text', 'cardBg', 4.5], ['muted', 'cardBg', 4.5], ['rule', 'cardBg', 3]);
  if (c.chipBg) p.push(['text', 'chipBg', 4.5]);
  if (c.sidebarBg) p.push(['sidebarText', 'sidebarBg', 4.5], ['sidebarMuted', 'sidebarBg', 4.5], ['sidebarAccent', 'sidebarBg', 4.5]);
  return p.filter(([a, b]) => c[a] && c[b]);
}
export function contrastCheck(t) {
  const rows = pairs(t.colors).map(([a, b, min]) => ({ pair: `${a}/${b}`, ratio: +ratio(t.colors[a], t.colors[b]).toFixed(2), min }));
  return { pass: rows.every((r) => r.ratio >= r.min), rows };
}

// Machado et al. 2009, severity 1.0, applied to linear RGB.
const CVD = {
  protanopia: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deuteranopia: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
  tritanopia: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]],
};
const delin = (v) => 255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
export function simulate(hex, kind) {
  const l = rgb(hex).map(lin), m = CVD[kind];
  return toHex(m.map((row) => delin(Math.min(1, Math.max(0, row[0] * l[0] + row[1] * l[1] + row[2] * l[2])))));
}
/** Every used pair must keep its minimum ratio under protan/deutan/tritan simulation. Meaning is never carried by hue alone (see static checks). */
export function colourBlindCheck(t) {
  const rows = [];
  for (const kind of Object.keys(CVD)) for (const [a, b, min] of pairs(t.colors)) rows.push({ kind, pair: `${a}/${b}`, ratio: +ratio(simulate(t.colors[a], kind), simulate(t.colors[b], kind)).toFixed(2), min });
  return { pass: rows.every((r) => r.ratio >= r.min), rows, worst: rows.reduce((m, r) => (r.ratio / r.min < m.ratio / m.min ? r : m)) };
}
/** Token-level greyscale: Rec.601 luma of the sRGB values, the conversion most printer drivers use. */
export function greyscaleTokenCheck(t) {
  const grey = (h) => { const [r, g, b] = rgb(h); const y = 0.299 * r + 0.587 * g + 0.114 * b; return toHex([y, y, y]); };
  const rows = pairs(t.colors).map(([a, b, min]) => ({ pair: `${a}/${b}`, ratio: +ratio(grey(t.colors[a]), grey(t.colors[b])).toFixed(2), min }));
  return { pass: rows.every((r) => r.ratio >= r.min), rows };
}

/* ---------- poppler helpers (tests only) ---------- */
export const hasPoppler = () => spawnSync('pdftotext', ['-v']).status !== null && spawnSync('pdftoppm', ['-v']).status !== null;
export function pdfText(pdf, mode = 'raw') {
  const args = mode === 'raw' ? ['-raw', pdf, '-'] : [pdf, '-'];
  const r = spawnSync('pdftotext', args, { encoding: 'utf8' });
  if (r.status !== 0) throw new Error('pdftotext failed: ' + r.stderr);
  return r.stdout;
}
const BIDI = /[‎‏‪-‮⁦-⁩؜]/g;
export const squash = (s) => s.normalize('NFKC').replace(BIDI, '').replace(/\s+/g, '').toLowerCase();

/** Anchors must appear in order. Returns { ok, missing, outOfOrder }. */
export function readingOrder(text, anchors) {
  const hay = squash(text);
  let pos = 0; const missing = [], outOfOrder = [];
  for (const a of anchors) {
    const n = squash(a); if (!n) continue;
    const at = hay.indexOf(n, pos);
    if (at >= 0) { pos = at + n.length; continue; }
    (hay.includes(n) ? outOfOrder : missing).push(a);
  }
  return { ok: !missing.length && !outOfOrder.length, missing, outOfOrder };
}

/** Rasterises with pdftoppm (greyscale) and returns { w, h, px } for page n. */
export function raster(pdf, page, dpi = 150) {
  const dir = mkdtempSync(join(tmpdir(), 'cl-ras-'));
  const r = spawnSync('pdftoppm', ['-gray', '-r', String(dpi), '-f', String(page), '-l', String(page), pdf, join(dir, 'p')]);
  if (r.status !== 0) throw new Error('pdftoppm failed');
  const f = spawnSync('sh', ['-c', `ls ${dir}/p*`], { encoding: 'utf8' }).stdout.trim();
  const buf = readFileSync(f);
  const m = /^P5\s+(\d+)\s+(\d+)\s+255\s/.exec(buf.subarray(0, 40).toString('latin1'));
  return { w: +m[1], h: +m[2], px: buf.subarray(m[0].length), dpi };
}

/** Rendered greyscale legibility: for every text item, contrast between the paper and ink in its box, in greyscale. */
export async function greyscaleRenderCheck(pdf) {
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const doc = await getDocument({ data: new Uint8Array(readFileSync(pdf)) }).promise;
  const worst = { ratio: Infinity, text: '' }; let items = 0;
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p), vp = page.getViewport({ scale: 1 }), tc = await page.getTextContent();
    const img = raster(pdf, p), k = img.dpi / 72;
    for (const it of tc.items) {
      if (!it.str.trim() || !it.width) continue;
      const x0 = Math.floor(it.transform[4] * k), x1 = Math.ceil((it.transform[4] + it.width) * k);
      const yb = (vp.height - it.transform[5]) * k, hh = Math.abs(it.height || it.transform[3]) * k;
      const y0 = Math.floor(yb - hh * 0.8), y1 = Math.ceil(yb + hh * 0.2);
      const vals = [];
      for (let y = Math.max(0, y0); y < Math.min(img.h, y1); y++) for (let x = Math.max(0, x0); x < Math.min(img.w, x1); x++) vals.push(img.px[y * img.w + x]);
      if (vals.length < 20) continue;
      vals.sort((a, b) => a - b);
      const ink = vals[Math.floor(vals.length * 0.01)], paper = vals[Math.min(vals.length - 1, Math.floor(vals.length * 0.99))];
      const r = (lin(paper) * 0.2126 + lin(paper) * 0.7152 + lin(paper) * 0.0722 + 0.05) / (lin(ink) * 0.2126 + lin(ink) * 0.7152 + lin(ink) * 0.0722 + 0.05);
      items++; if (r < worst.ratio) { worst.ratio = r; worst.text = it.str; }
    }
  }
  return { pass: worst.ratio >= 4.5, worst: { ratio: +worst.ratio.toFixed(2), text: worst.text }, items };
}

/** Text-extent fit via pdfjs: pages and how far down the lowest text on the last/first page reaches. */
export async function fitMetrics(pdf) {
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const doc = await getDocument({ data: new Uint8Array(readFileSync(pdf)) }).promise;
  const pages = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p), vp = page.getViewport({ scale: 1 }), tc = await page.getTextContent();
    const ys = tc.items.filter((i) => i.str.trim()).map((i) => [vp.height - i.transform[5], vp.height - i.transform[5] - Math.abs(i.height)]);
    pages.push({ page: p, height: vp.height, bottom: ys.length ? Math.max(...ys.map((y) => y[0])) : 0, top: ys.length ? Math.min(...ys.map((y) => y[1])) : 0, items: ys.length });
  }
  return pages;
}
