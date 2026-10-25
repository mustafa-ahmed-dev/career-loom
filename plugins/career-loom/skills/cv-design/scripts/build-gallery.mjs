#!/usr/bin/env node
// Builds docs/gallery/ (static HTML, PNG thumbnails, sample PDFs) for every design with status "finished".
// Needs poppler (pdftoppm) and `npm test` run first (reads tests/results/<id>.json). Usage: node build-gallery.mjs
import { readdirSync, mkdirSync, copyFileSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { SKILL_DIR, SYSTEMS_DIR, loadTokens, readJson, esc } from './lib/util.mjs';
import { render } from './cv-render.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..', '..', 'docs', 'gallery');
rmSync(OUT, { recursive: true, force: true });
for (const d of ['img', 'samples']) mkdirSync(join(OUT, d), { recursive: true });
const SAMPLES = [['en', 'short', 'English'], ['ar', 'ar', 'Arabic (RTL)']];
const ids = readdirSync(SYSTEMS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name.split('-')[0]).sort((a, b) => a[0] === b[0] ? parseInt(a.slice(1)) - parseInt(b.slice(1)) : b.localeCompare(a));
const cards = [];
for (const id of ids) {
  const { tokens } = loadTokens(id);
  if (tokens.status !== 'finished') continue;
  const res = readJson(join(SKILL_DIR, 'tests', 'results', `${id}.json`));
  if (!res.pass) throw new Error(`${tokens.id} is marked finished but its last test run failed`);
  const shots = [];
  for (const [tag, file, label] of SAMPLES) {
    const r = await render(join(SKILL_DIR, 'test-data', file + '.json'), { design: id, out: join(OUT, 'samples'), name: `${id}-${tag}`, format: 'pdf', rtl: 'auto', twin: 'on', allowDraft: false });
    for (const d of r.designs) {
      const stem = d.role === 'ats-twin' ? `${id}-${tag}-ats` : `${id}-${tag}`;
      const pr = spawnSync('pdftoppm', ['-png', '-r', '70', '-f', '1', '-l', '1', '-singlefile', join(OUT, 'samples', stem + '.pdf'), join(OUT, 'img', stem)]);
      if (pr.status !== 0) throw new Error('pdftoppm failed (poppler needed)');
      shots.push({ stem, label: d.role === 'ats-twin' ? `${label}: ${d.design} plain twin (portals)` : label, role: d.role });
    }
  }
  cards.push({ tokens, shots, res });
}
const checks = ['contrast', 'greyscale', 'render', 'extraction', 'fit'];
const names = { contrast: 'Contrast + colour-blind', greyscale: 'Greyscale print', render: 'Scripts render', extraction: 'Text extraction', fit: 'Page fit' };
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Career Loom: design gallery</title>
<style>
:root{--bg:#f6f7f9;--card:#fff;--text:#16202a;--muted:#4b5864;--line:#d5dbe1;--ok:#14633a;--okbg:#e3f3ea;--accent:#1f4e79}
@media(prefers-color-scheme:dark){:root{--bg:#12161b;--card:#1b2128;--text:#e8edf2;--muted:#a9b4be;--line:#303a44;--ok:#7fd6a3;--okbg:#18392a;--accent:#8fbbe6}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.5 system-ui,sans-serif}
main{max-width:1100px;margin:0 auto;padding:24px 16px 48px}h1{margin:0 0 4px}p.lead{color:var(--muted);margin:0 0 24px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:24px}
.card h2{margin:0}.tier{color:var(--muted);margin:2px 0 12px}
.shots{display:flex;flex-wrap:wrap;gap:16px}figure{margin:0;width:200px}figure img{display:block;width:100%;height:auto;border:1px solid var(--line);background:#fff}
figcaption{font-size:13px;color:var(--muted);margin-top:4px}a{color:var(--accent)}
.badges{list-style:none;display:flex;flex-wrap:wrap;gap:6px;padding:0;margin:12px 0 0}.badges li{background:var(--okbg);color:var(--ok);border-radius:999px;padding:2px 10px;font-size:13px}
.note{font-size:14px;color:var(--muted);margin-top:24px}
</style></head><body><main>
<h1>Career Loom designs</h1>
<p class="lead">${cards.length} of 20 designs are finished; the other ${20 - cards.length} are still specification stubs. All content is synthetic. Pages are shown on white paper.</p>
${cards.map(({ tokens: t, shots, res }) => `<section class="card"><h2>${esc(t.id)} ${esc(t.name)}</h2>
<p class="tier">Tier ${t.atsTier}${t.twin ? ` · plain twin ${esc(t.twin)} for portals` : ''} · RTL variant · <a href="https://github.com/mustafa-ahmed-dev/career-loom/blob/main/plugins/career-loom/skills/cv-design/systems/${esc(readdirSync(SYSTEMS_DIR).find((n) => n.startsWith(t.id.toLowerCase() + '-')))}/spec.md">spec and results</a></p>
<div class="shots">${shots.map((s) => `<figure><a href="samples/${s.stem}.pdf"><img src="img/${s.stem}.png" alt="${esc(t.name)} ${esc(s.label)} sample CV, page 1" loading="lazy"></a><figcaption>${esc(s.label)} · <a href="samples/${s.stem}.pdf">PDF</a></figcaption></figure>`).join('')}</div>
<ul class="badges">${checks.map((c) => `<li>${res.checks[c].pass ? '✓' : '✗'} ${names[c]}</li>`).join('')}</ul></section>`).join('\n')}
<p class="note">Sorani (Central Kurdish) output needs native-speaker review. Word output is verified in LibreOffice only.</p>
</main></body></html>`;
writeFileSync(join(OUT, 'index.html'), html);
console.log(`gallery: ${cards.length} designs -> ${OUT}`);
