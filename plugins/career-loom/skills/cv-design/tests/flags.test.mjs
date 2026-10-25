import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { buildHtml } from '../scripts/lib/html.mjs';
import { renderDocx } from '../scripts/lib/docx.mjs';
import { loadTokens, readJson, SKILL_DIR } from '../scripts/lib/util.mjs';

const JSZip = createRequire(join(SKILL_DIR, 'scripts', 'package.json'))('jszip');
const cv = readJson(join(SKILL_DIR, 'test-data', 'short.json'));
const withLayout = (over) => { const t = structuredClone(loadTokens('p1').tokens); Object.assign(t.layout, over); return t; };
const css = (t) => buildHtml(cv, t).html;

test('bulletStyle none draws no bullet marker; dash and disc do', () => {
  assert.doesNotMatch(css(withLayout({ bulletStyle: 'none' })), /\.bul li::before/);
  assert.match(css(withLayout({ bulletStyle: 'dash' })), /\.bul li::before\{content:"–"/);
  assert.match(css(withLayout({ bulletStyle: 'disc' })), /\.bul li::before\{content:"•"/);
});
test('dateAlign inline keeps dates next to the title; end pushes them to the edge', () => {
  assert.match(css(withLayout({ dateAlign: 'inline' })), /\.entry-head\{[^}]*justify-content:flex-start/);
  assert.match(css(withLayout({ dateAlign: 'end' })), /\.entry-head\{[^}]*justify-content:space-between/);
});
test('headingStyle rule-above draws a top rule, plain draws none', () => {
  assert.match(css(withLayout({ headingStyle: 'rule-above' })), /h2\{[^}]*border-top:0\.75pt/);
  assert.doesNotMatch(css(withLayout({ headingStyle: 'plain' })), /h2\{[^}]*border-(top|bottom):/);
});
test('DOCX uses IBM Plex Sans Arabic instead of Cairo for Sorani, Cairo stays for Arabic', async () => {
  const t = structuredClone(loadTokens('p1').tokens);
  for (const r of ['display', 'heading', 'body', 'mono']) t.fonts[r].arabic = 'Cairo';
  const dir = mkdtempSync(join(tmpdir(), 'cl-flags-'));
  const fonts = async (lang) => {
    const f = join(dir, lang + '.docx');
    await renderDocx({ ...cv, meta: { lang } }, t, f);
    return (await (await JSZip.loadAsync(readFileSync(f))).file('word/document.xml').async('string'));
  };
  const ckb = await fonts('ckb'), ar = await fonts('ar');
  assert.match(ckb, /w:cs="IBM Plex Sans Arabic"/); assert.doesNotMatch(ckb, /w:cs="Cairo"/);
  assert.match(ar, /w:cs="Cairo"/);
});
