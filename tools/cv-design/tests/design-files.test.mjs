import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { buildAll } from '../scripts/build-design-files.mjs';
import { SYSTEMS_DIR, readJson } from '../scripts/lib/util.mjs';

const finished = readdirSync(SYSTEMS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory())
  .map((d) => ({ dir: join(SYSTEMS_DIR, d.name), name: d.name, t: readJson(join(SYSTEMS_DIR, d.name, 'tokens.json')) }))
  .filter((d) => d.t.status === 'finished');

test('design.css, components.html and the Tokens block are up to date with tokens.json', () => {
  assert.deepEqual(buildAll({ check: true }), [], 'run: node scripts/build-design-files.mjs');
});

for (const d of finished) {
  test(`${d.name}: plain design files exist and carry no banned elements`, () => {
    for (const f of ['design.css', 'components.html']) assert.ok(existsSync(join(d.dir, f)), `${f} missing`);
    const html = readFileSync(join(d.dir, 'components.html'), 'utf8');
    const css = readFileSync(join(d.dir, 'design.css'), 'utf8');
    assert.doesNotMatch(html, /<(img|svg|canvas|progress|meter|table)\b/i, 'no graphics, bars or tables');
    assert.doesNotMatch(html + css, /(class="[^"]*|\.)(skill-?bar|logo|progress|meter)\b/i, 'no skill-bar or logo classes');
    assert.doesNotMatch(html.replace(/<style>[\s\S]*?<\/style>/, ''), /\b\d{1,3}\s?%/, 'no percentages in the content');
    assert.match(html, /dir="rtl"/, 'shows the RTL variant of the same design');
    assert.match(readFileSync(join(d.dir, 'spec.md'), 'utf8'), /TOKENS:START/, 'spec.md has the Tokens block');
    for (const color of Object.values(d.t.colors)) assert.ok(css.includes(color) || html.includes(color), `colour ${color} appears in the files`);
  });
}
