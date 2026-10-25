import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { SKILL_DIR } from '../scripts/lib/util.mjs';

const CLI = join(SKILL_DIR, 'scripts', 'cv-render.mjs'), DATA = join(SKILL_DIR, 'test-data');
const run = (...args) => spawnSync('node', [CLI, ...args], { encoding: 'utf8' });
let out;
before(() => { out = mkdtempSync(join(tmpdir(), 'cl-cli-')); });

test('tier C writes the design and an A-rated plain twin (PDF and HTML)', () => {
  const r = run(join(DATA, 'short.json'), '--design', 'c9', '--out', out, '--name', 'c9', '--allow-draft');
  assert.equal(r.status, 0, r.stderr + r.stdout);
  for (const f of ['c9.pdf', 'c9.html', 'c9-ats.pdf', 'c9-ats.html']) assert.ok(existsSync(join(out, f)), f);
  const j = JSON.parse(r.stdout);
  assert.deepEqual(j.designs.map((d) => [d.design, d.tier, d.role]), [['C9', 'C', 'design'], ['P1', 'A', 'ats-twin']]);
});
test('--format docx is refused with a pointer to HTML; unknown formats are refused too', () => {
  const d = run(join(DATA, 'short.json'), '--design', 'p1', '--out', out, '--format', 'docx');
  assert.equal(d.status, 1); assert.match(d.stderr, /DOCX is not produced.*HTML/);
  const x = run(join(DATA, 'short.json'), '--design', 'p1', '--out', out, '--format', 'txt');
  assert.equal(x.status, 1); assert.match(x.stderr, /Unknown --format "txt"/);
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
  const sys = join(out, 'systems', 'p2-modern-minimal'); mkdirSync(sys, { recursive: true });
  writeFileSync(join(sys, 'tokens.json'), JSON.stringify({ id: 'P2', name: 'Modern Minimal', atsTier: 'A', status: 'stub', twin: null, rtlVariant: true }));
  const stub = spawnSync('node', [CLI, join(DATA, 'short.json'), '--design', 'p2', '--out', out, '--allow-draft'], { encoding: 'utf8', env: { ...process.env, CL_SYSTEMS_DIR: join(out, 'systems') } });
  assert.equal(stub.status, 4, 'a stub cannot be forced with --allow-draft'); assert.match(stub.stderr, /Design P2.*is a stub/);
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
  const env = { ...process.env, CL_FONT_CACHE: join(out, 'no-font-cache') }; // an empty cache, so the shared one is never touched
  const go = (file, name) => spawnSync('node', [CLI, join(DATA, file), '--design', 'p1', '--out', out, '--name', name, '--format', 'pdf'], { encoding: 'utf8', env });
  const en = go('short.json', 'nf');
  assert.equal(en.status, 0, 'English CV needs no fetched fonts: ' + en.stderr + en.stdout);
  const zh = go('zh.json', 'nf-zh');
  assert.equal(zh.status, 3); assert.match(JSON.parse(zh.stdout).warnings.join(), /Noto Sans SC/); assert.doesNotMatch(JSON.parse(zh.stdout).warnings.join(), /Devanagari/);
  const hi = go('hi.json', 'nf-hi');
  assert.equal(hi.status, 3); assert.match(JSON.parse(hi.stdout).warnings.join(), /Devanagari/);
});
