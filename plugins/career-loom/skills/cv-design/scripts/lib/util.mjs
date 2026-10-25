import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv/dist/2020.js';

export const SKILL_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SYSTEMS_DIR = process.env.CL_SYSTEMS_DIR ?? join(SKILL_DIR, 'systems'); // override is for tests only
export const FONTS_DIR = join(SKILL_DIR, 'fonts');
export const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ajv = new Ajv({ allErrors: true, strict: false });
const validators = {};
function validator(name) {
  return (validators[name] ??= ajv.compile(readJson(join(SKILL_DIR, 'schema', name))));
}
export function validate(schemaFile, data) {
  const v = validator(schemaFile);
  return v(data) ? [] : v.errors.map((e) => `${e.instancePath || '/'} ${e.message}${e.params?.additionalProperty ? `: "${e.params.additionalProperty}"` : ''}`);
}

export function designDir(id) {
  const key = String(id).toLowerCase();
  const hit = readdirSync(SYSTEMS_DIR, { withFileTypes: true }).find((d) => d.isDirectory() && (d.name === key || d.name.startsWith(key + '-')));
  if (!hit) throw new Error(`Unknown design "${id}". Folders: ${readdirSync(SYSTEMS_DIR).filter((n) => !n.endsWith('.md')).join(', ')}`);
  return join(SYSTEMS_DIR, hit.name);
}
export function loadTokens(id) {
  const t = readJson(join(designDir(id), 'tokens.json'));
  const errs = validate('tokens.schema.json', t);
  return { tokens: t, errors: errs, dir: designDir(id) };
}

const RTL_LANGS = ['ar', 'ckb', 'ku', 'fa', 'ur', 'he', 'ps', 'sd'];
export const isRtl = (cv, flag = 'auto') => (flag === 'on' ? true : flag === 'off' ? false : cv.meta.dir === 'rtl' || (cv.meta.dir !== 'ltr' && RTL_LANGS.includes(cv.meta.lang.split('-')[0])));
export function scriptOf(lang) {
  const l = lang.split('-')[0];
  if (RTL_LANGS.includes(l)) return 'arabic';
  if (['zh', 'ja', 'ko'].includes(l)) return 'cjk';
  if (['hi', 'mr', 'ne', 'sa'].includes(l)) return 'devanagari';
  if (['ru', 'uk', 'bg', 'sr', 'mk', 'be'].includes(l)) return 'cyrillic';
  return 'latin';
}
export const hasRtlChars = (s) => /[֐-ࣿיִ-﷿ﹰ-﻿]/.test(s);

export const finishedDesigns = () => readdirSync(SYSTEMS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => readJson(join(SYSTEMS_DIR, d.name, 'tokens.json'))).filter((t) => t.status === 'finished').map((t) => t.id);
