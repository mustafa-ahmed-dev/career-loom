// Runs the five checks on every design whose status is draft or finished. Needs poppler (pdftotext, pdftoppm).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { runChecks } from '../scripts/lib/runchecks.mjs';
import { loadTokens, SYSTEMS_DIR, SKILL_DIR } from '../scripts/lib/util.mjs';

const ids = readdirSync(SYSTEMS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name.split('-')[0]);
const built = ids.filter((id) => loadTokens(id).tokens.status !== 'stub');
const out = join(tmpdir(), 'career-loom-design-tests');
mkdirSync(join(SKILL_DIR, 'tests', 'results'), { recursive: true });

for (const id of built) {
  test(`${id}: all five checks pass`, { timeout: 300000 }, async () => {
    const r = await runChecks(id, join(out, id));
    writeFileSync(join(SKILL_DIR, 'tests', 'results', `${id}.json`), JSON.stringify(r, null, 1) + '\n');
    for (const [k, v] of Object.entries(r.checks)) assert.ok(v.pass, `${k} failed: ${JSON.stringify(v).slice(0, 800)}`);
    if (r.twin) assert.ok(r.twin.produced, 'A twin must be produced for every sample');
  });
}
