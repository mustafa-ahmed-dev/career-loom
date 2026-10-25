import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { loadTokens, SYSTEMS_DIR } from '../scripts/lib/util.mjs';

const dirs = readdirSync(SYSTEMS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const RETIRED = ['C2', 'C17', 'C18', 'C4', 'C13', 'C14', 'C16', 'C19', 'C21', 'C22'];

test('exactly the 20 design systems exist, none retired or dropped', () => {
  assert.equal(dirs.length, 20);
  const ids = dirs.map((d) => loadTokens(d.split('-')[0]).tokens.id);
  assert.equal(new Set(ids).size, 20);
  for (const r of RETIRED) assert.ok(!ids.includes(r), `${r} must not exist`);
});

for (const d of dirs) {
  test(`${d}: tokens.json follows the schema and the tier rules`, () => {
    const { tokens, errors } = loadTokens(d.split('-')[0]);
    assert.deepEqual(errors, []);
    assert.equal(tokens.rtlVariant, true, 'RTL is a flag of every design');
    assert.ok(d.startsWith(tokens.id.toLowerCase() + '-'), 'folder matches id');
    if (['C', 'D'].includes(tokens.atsTier)) {
      const twin = loadTokens(tokens.twin).tokens;
      assert.equal(twin.atsTier, 'A', 'the twin is tier A');
    }
    if (tokens.status === 'finished') {
      assert.ok(tokens.sizes.base >= 9 && tokens.sizes.small >= 8, 'readable sizes');
      for (const r of ['display', 'heading', 'body', 'mono']) assert.ok(tokens.fonts[r], `font role ${r}`);
    }
  });
}
