import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { SKILL_DIR } from '../scripts/lib/util.mjs';

const CLI = join(SKILL_DIR, 'scripts', 'cv-render.mjs'), DATA = join(SKILL_DIR, 'test-data');
const run = (...args) => spawnSync('node', [CLI, ...args], { encoding: 'utf8' });
const runWithEnv = (env, ...args) => spawnSync('node', [CLI, ...args], { encoding: 'utf8', env: { ...process.env, ...env } });
let out;
before(() => { out = mkdtempSync(join(tmpdir(), 'cl-cli-')); });

test('tier C writes the design and an A-rated plain twin (PDF and DOCX)', () => {
  const r = run(join(DATA, 'short.json'), '--design', 'c9', '--out', out, '--name', 'c9', '--allow-draft');
  assert.equal(r.status, 0, r.stderr + r.stdout);
  for (const f of ['c9.pdf', 'c9.docx', 'c9-ats.pdf', 'c9-ats.docx']) assert.ok(existsSync(join(out, f)), f);
  const j = JSON.parse(r.stdout);
  assert.deepEqual(j.designs.map((d) => [d.design, d.tier, d.role]), [['C9', 'C', 'design'], ['P1', 'A', 'ats-twin']]);
});
test('tier A writes no twin; --twin off suppresses it', () => {
  const r = JSON.parse(run(join(DATA, 'short.json'), '--design', 'p1', '--out', out, '--name', 'p1', '--allow-draft', '--format', 'pdf').stdout);
  assert.equal(r.designs.length, 1);
  assert.ok(!existsSync(join(out, 'p1-ats.pdf')));
  const r2 = JSON.parse(run(join(DATA, 'short.json'), '--design', 'c9', '--twin', 'off', '--out', out, '--name', 'nt', '--allow-draft', '--format', 'pdf').stdout);
  assert.equal(r2.designs.length, 1);
});
test('RTL flag is respected: auto follows the language, on/off override, sidebar mirrors', () => {
  const dir = (name, ...a) => /<html[^>]*dir="(\w+)"/.exec(readFileSync(join(out, name + '.html'), 'utf8'))[1];
  run(join(DATA, 'ar.json'), '--design', 'c9', '--out', out, '--name', 'ar-auto', '--format', 'html', '--twin', 'off', '--allow-draft');
  run(join(DATA, 'ar.json'), '--design', 'c9', '--rtl', 'off', '--out', out, '--name', 'ar-off', '--format', 'html', '--twin', 'off', '--allow-draft');
  run(join(DATA, 'short.json'), '--design', 'c9', '--rtl', 'on', '--out', out, '--name', 'en-on', '--format', 'html', '--twin', 'off', '--allow-draft');
  assert.equal(dir('ar-auto'), 'rtl'); assert.equal(dir('ar-off'), 'ltr'); assert.equal(dir('en-on'), 'rtl');
  assert.match(readFileSync(join(out, 'ar-auto.html'), 'utf8'), /linear-gradient\(to left/, 'sidebar tint mirrors to the right edge');
  assert.match(readFileSync(join(out, 'ar-off.html'), 'utf8'), /linear-gradient\(to right/);
});
test('the twin is rendered in the same direction as the design', () => {
  run(join(DATA, 'ar.json'), '--design', 'c9', '--out', out, '--name', 'tw', '--format', 'html', '--allow-draft');
  assert.match(readFileSync(join(out, 'tw-ats.html'), 'utf8'), /<html[^>]*dir="rtl"/);
});
test('stubs and drafts are refused unless --allow-draft; unknown ids and bad JSON fail clearly', () => {
  assert.equal(run(join(DATA, 'short.json'), '--design', 'c3', '--out', out).status, 4);
  const stub = run(join(DATA, 'short.json'), '--design', 'c3', '--out', out, '--allow-draft');
  assert.equal(stub.status, 4, 'a stub cannot be forced with --allow-draft'); assert.match(stub.stderr, /is a stub.*(P1|C9)/);
  assert.equal(run(join(DATA, 'short.json'), '--design', 'zz', '--out', out).status, 1);
  const bad = join(out, 'bad.json'); writeFileSync(bad, JSON.stringify({ meta: { lang: 'en' }, basics: { name: 'X' }, skills: [{ name: 'a', items: ['b'], percent: 95 }] }));
  const r = run(bad, '--design', 'p1', '--out', out, '--allow-draft');
  assert.equal(r.status, 2); assert.match(r.stderr, /percent/);
});
test('a language without built-in labels needs meta.labels', () => {
  const f = join(out, 'de.json'); writeFileSync(f, JSON.stringify({ meta: { lang: 'de' }, basics: { name: 'X' } }));
  const r = run(f, '--design', 'p1', '--out', out, '--allow-draft');
  assert.equal(r.status, 2); assert.match(r.stderr, /labels/);
});
test('more than two pages is reported, not hidden', () => {
  const cv = JSON.parse(readFileSync(join(DATA, 'long.json'), 'utf8'));
  cv.work = [...cv.work, ...cv.work, ...cv.work];
  const f = join(out, 'huge.json'); writeFileSync(f, JSON.stringify(cv));
  const r = run(f, '--design', 'p1', '--out', out, '--format', 'pdf', '--allow-draft');
  assert.equal(r.status, 3); assert.match(JSON.parse(r.stdout).warnings.join(), /pages/);
});

test('Noto warnings appear only when the CV contains that script', () => {
  // An empty cache folder stands in for "fetch-fonts.mjs was never run"; the real fonts/cache is not touched, so tests can run in parallel.
  const env = { CAREER_LOOM_FONT_CACHE: mkdtempSync(join(tmpdir(), 'cl-nocache-')) };
  const en = runWithEnv(env, join(DATA, 'short.json'), '--design', 'p1', '--out', out, '--name', 'nf', '--format', 'pdf');
  assert.equal(en.status, 0, 'English CV needs no fetched fonts: ' + en.stderr + en.stdout);
  const zh = runWithEnv(env, join(DATA, 'zh.json'), '--design', 'p1', '--out', out, '--name', 'nf-zh', '--format', 'pdf');
  assert.equal(zh.status, 3); assert.match(JSON.parse(zh.stdout).warnings.join(), /Noto Sans SC/); assert.doesNotMatch(JSON.parse(zh.stdout).warnings.join(), /Devanagari/);
  const hi = runWithEnv(env, join(DATA, 'hi.json'), '--design', 'p1', '--out', out, '--name', 'nf-hi', '--format', 'pdf');
  assert.equal(hi.status, 3); assert.match(JSON.parse(hi.stdout).warnings.join(), /Devanagari/);
});
