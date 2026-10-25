#!/usr/bin/env node
// Career Loom CV renderer. See scripts/README.md. Input: a JSON CV (schema/cv.schema.json).
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { readJson, validate, loadTokens, finishedDesigns } from './lib/util.mjs';
import { buildHtml } from './lib/html.mjs';
import { renderPdf, closeBrowser, browserLabel } from './lib/pdf.mjs';
import { needsLabels } from './lib/labels.mjs';

const USAGE = `Usage: node cv-render.mjs <cv.json> --design <id> [--out dir] [--name base] [--format pdf,html] [--rtl auto|on|off] [--twin on|off] [--allow-draft]
  Tier C/D designs also write an A-rated plain twin (<name>-ats.*). Portals get the twin.`;

export async function render(cvPath, opts) {
  const cv = readJson(cvPath);
  const errs = validate('cv.schema.json', cv);
  if (errs.length) throw Object.assign(new Error('Invalid CV JSON:\n  ' + errs.join('\n  ')), { code: 2 });
  if (needsLabels(cv)) throw Object.assign(new Error(`Language "${cv.meta.lang}" has no built-in section labels: add meta.labels to the CV JSON.`), { code: 2 });
  const out = opts.out; mkdirSync(out, { recursive: true });
  const base = opts.name ?? basename(cvPath, '.json');
  const formats = opts.format.split(',');
  const bad = formats.filter((f) => !['pdf', 'html'].includes(f));
  if (bad.length) throw Object.assign(new Error(bad.includes('docx') ? 'DOCX is not produced by the renderer. Write HTML (and PDF) and ask Claude to convert the HTML to Word if you need it. --format accepts: pdf, html.' : `Unknown --format "${bad.join(',')}". Accepted: pdf, html.`), { code: 1 });
  const result = { files: [], warnings: [], designs: [] };

  async function one(designId, suffix, role) {
    const { tokens, errors } = loadTokens(designId);
    if (errors.length) throw Object.assign(new Error(`tokens.json of ${designId} is invalid:\n  ${errors.join('\n  ')}`), { code: 2 });
    if (tokens.status === 'stub') throw Object.assign(new Error(`Design ${tokens.id} (${tokens.name}) is a stub: it has no layout or colours yet, so it cannot be rendered. Finished designs: ${finishedDesigns().join(', ')}.`), { code: 4 });
    if (tokens.status !== 'finished' && !opts.allowDraft) throw Object.assign(new Error(`Design ${tokens.id} is "${tokens.status}", not finished. Pick a finished design or pass --allow-draft.`), { code: 4 });
    const { html, rtl, script, missingFonts } = buildHtml(cv, tokens, { rtlFlag: opts.rtl });
    if (missingFonts.length) result.warnings.push(`Fonts not available (run node fetch-fonts.mjs): ${missingFonts.join(', ')}`);
    const stem = join(out, base + suffix);
    const info = { design: tokens.id, role, tier: tokens.atsTier, rtl, script };
    if (formats.includes('html')) { writeFileSync(stem + '.html', html); result.files.push(stem + '.html'); }
    if (formats.includes('pdf')) {
      const r = await renderPdf(html, stem + '.pdf', tokens);
      info.pages = r.pages; result.files.push(stem + '.pdf'); result.pdfBrowser ??= browserLabel();
      if (r.pages > (tokens.limits?.maxPages ?? 2)) result.warnings.push(`${tokens.id}: ${r.pages} pages (limit ${tokens.limits?.maxPages ?? 2}). Shorten the content.`);
      if (r.wide) result.warnings.push(`${tokens.id}: content wider than the page`);
    }
    result.designs.push(info);
    return tokens;
  }
  const main = await one(opts.design, '', 'design');
  if ((main.atsTier === 'C' || main.atsTier === 'D') && opts.twin !== 'off') await one(main.twin, '-ats', 'ats-twin');
  await closeBrowser();
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const { values, positionals } = parseArgs({ allowPositionals: true, options: { design: { type: 'string' }, out: { type: 'string', default: '.' }, name: { type: 'string' }, format: { type: 'string', default: 'pdf,html' }, rtl: { type: 'string', default: 'auto' }, twin: { type: 'string', default: 'on' }, 'allow-draft': { type: 'boolean', default: false } } });
    if (!positionals[0] || !values.design) { console.error(USAGE); process.exit(1); }
    const r = await render(positionals[0], { ...values, allowDraft: values['allow-draft'] });
    console.log(JSON.stringify(r, null, 2));
    process.exit(r.warnings.length ? 3 : 0);
  } catch (e) {
    console.error(e.message); await closeBrowser(); process.exit(e.code ?? 1);
  }
}
