// The checks must be able to fail: each test feeds a deliberately bad input.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contrastCheck, colourBlindCheck, greyscaleTokenCheck, readingOrder, ratio, simulate } from '../scripts/lib/checks.mjs';
import { staticChecks } from '../scripts/lib/static.mjs';
import { missingGlyphs } from '../scripts/lib/glyphs.mjs';

const base = { bg: '#ffffff', text: '#111111', muted: '#4a4a4a', accent: '#111111', rule: '#767676' };

test('contrast: known ratios and failures', () => {
  assert.ok(Math.abs(ratio('#000000', '#ffffff') - 21) < 0.01);
  assert.equal(contrastCheck({ colors: base }).pass, true);
  assert.equal(contrastCheck({ colors: { ...base, muted: '#999999' } }).pass, false, '#999 on white is below 4.5');
  assert.equal(contrastCheck({ colors: { ...base, rule: '#dddddd' } }).pass, false, 'a pale rule is below 3');
});
test('colour-blind: a red/green pair that only differs by hue fails after simulation', () => {
  const t = { colors: { ...base, accent: '#b00000', bg: '#2e7d32', text: '#ffffff' } };
  assert.equal(colourBlindCheck({ colors: base }).pass, true);
  assert.equal(colourBlindCheck(t).pass, false);
  assert.notEqual(simulate('#ff0000', 'deuteranopia'), '#ff0000');
});
test('greyscale: blue on a similar-luma tint fails even if hues differ', () => {
  const t = { colors: { ...base, accent: '#3f6fb5', sidebarBg: '#c9d4e8', sidebarText: '#3f6fb5', sidebarMuted: '#3f6fb5', sidebarAccent: '#3f6fb5' } };
  assert.equal(greyscaleTokenCheck(t).pass, false);
});
test('reading order: detects wrong order and missing text', () => {
  const text = 'Sara Test\nProfile\nExperience\nEducation';
  assert.equal(readingOrder(text, ['Sara Test', 'Profile', 'Experience', 'Education']).ok, true);
  assert.deepEqual(readingOrder(text, ['Sara Test', 'Education', 'Profile']).outOfOrder, ['Profile']);
  assert.deepEqual(readingOrder(text, ['Skills']).missing, ['Skills']);
});
test('static rules: bars, graphics and percentages are rejected', () => {
  const cv = { basics: { email: 'a@example.com' } };
  const ok = '<body>a@example.com<section id="skills"><ul><li>SQL</li></ul></section></body>';
  assert.deepEqual(staticChecks(ok, cv), []);
  assert.ok(staticChecks(ok + '<progress value="90"></progress>', cv).length);
  assert.ok(staticChecks(ok + '<img src="logo.png">', cv).length);
  assert.ok(staticChecks('<body>a@example.com<section id="skills"><li>Python 95%</li></section>', cv).length);
  assert.ok(staticChecks('<style>@page{@bottom-center{content:"x"}}</style>' + ok, cv).length);
});
test('glyph coverage: reports characters no bundled font can draw', () => {
  assert.deepEqual(missingGlyphs('Hello Привет مرحبا ڕڵۆێە', ['Inter', 'IBM Plex Sans Arabic']), []);
  assert.deepEqual(missingGlyphs('ڕ', ['Cairo']), ['ڕ'], 'Cairo has no Sorani letters');
  assert.deepEqual(missingGlyphs('测', ['Inter', 'IBM Plex Sans Arabic']), ['测']);
});
