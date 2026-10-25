import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { buildHtml } from '../scripts/lib/html.mjs';
import { arabicFont } from '../scripts/lib/css.mjs';
import { loadTokens, readJson, SKILL_DIR } from '../scripts/lib/util.mjs';

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
test('Cairo is swapped for IBM Plex Sans Arabic in Sorani and Kurdish, and kept for Arabic', () => {
  const role = { latin: 'Inter', arabic: 'Cairo', weight: 400 };
  assert.equal(arabicFont(role, 'ckb'), 'IBM Plex Sans Arabic');
  assert.equal(arabicFont(role, 'ku'), 'IBM Plex Sans Arabic');
  assert.equal(arabicFont(role, 'ar'), 'Cairo');
  assert.equal(arabicFont({ ...role, arabic: 'Noto Naskh Arabic' }, 'ckb'), 'Noto Naskh Arabic');
});

test('on screen the page is a centred sheet; margins become padding only for designs that rely on @page margins', () => {
  const screen = (id) => /@media screen\{([\s\S]*?)\n\}/.exec(buildHtml(cv, loadTokens(id).tokens).html)[1];
  const plain = screen('p1'), sidebar = screen('c9'), band = screen('c1');
  for (const css of [plain, sidebar, band]) { assert.match(css, /body\{width:210mm;max-width:100%/); assert.match(css, /margin:18px auto/); }
  assert.match(plain, /padding:16mm 18mm 16mm/, 'a plain design has no padding of its own on screen');
  assert.doesNotMatch(sidebar, /padding:/, 'a sidebar design already carries its margins as .layout padding');
  assert.doesNotMatch(band, /padding:/, 'a band design already carries its margins as .layout padding');
});
test('the screen block never touches print: nothing outside @media screen sets a sheet width or shadow', () => {
  const html = buildHtml(cv, loadTokens('p1').tokens).html;
  const outside = html.replace(/@media screen\{[\s\S]*?\n\}/, '');
  assert.doesNotMatch(outside, /box-shadow|width:210mm/);
});
