#!/usr/bin/env node
// Runs the five checks for one or more designs and prints a summary. Usage: node check-design.mjs p1 [c9 ...] [--out dir]
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { runChecks } from './lib/runchecks.mjs';
const args = process.argv.slice(2);
const oi = args.indexOf('--out'); const out = oi >= 0 ? args.splice(oi, 2)[1] : join(tmpdir(), 'career-loom-checks');
let bad = 0;
for (const id of args) {
  const r = await runChecks(id, join(out, id));
  console.log(`${r.id} ${r.name}: ${r.pass ? 'ALL PASS' : 'FAIL'}`);
  for (const [k, v] of Object.entries(r.checks)) console.log(`  ${v.pass ? 'pass' : 'FAIL'}  ${k}`);
  if (!r.pass) { bad++; console.log(JSON.stringify(r.checks, (k, v) => (v === true ? undefined : v), 1).slice(0, 6000)); }
}
process.exit(bad ? 1 : 0);
