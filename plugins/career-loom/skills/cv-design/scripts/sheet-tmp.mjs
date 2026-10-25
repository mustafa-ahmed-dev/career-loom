import { render } from './cv-render.mjs';
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const [,, O, file, tag, ...only] = process.argv;
const ids = readdirSync('../systems', { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name.split('-')[0]).filter((i) => !['p1', 'c9'].includes(i) && (!only.length || only.includes(i)));
for (const id of ids) {
  try { const r = await render(`../test-data/${file}.json`, { design: id, out: O, name: `${id}-${tag}`, format: 'pdf', twin: 'off', rtl: 'auto', allowDraft: true });
    if (r.warnings.length) console.log(id, r.warnings.join('; ')); if (r.designs[0].pages !== 1 && file === 'short') console.log(id, 'pages', r.designs[0].pages);
  } catch (e) { console.log(id, 'ERR', e.message.split('\n')[0]); }
  spawnSync('pdftoppm', ['-png', '-r', '45', '-f', '1', '-l', '1', '-singlefile', `${O}/${id}-${tag}.pdf`, `${O}/${id}-${tag}`]);
}
