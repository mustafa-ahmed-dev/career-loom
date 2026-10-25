#!/usr/bin/env node
// Runs every ../tests/*.test.mjs. `node --test "<glob>"` only works on Node 21+ and needs shell-free glob handling,
// so the file list is built here; this works on Node 20+, Windows included. Usage: node run-tests.mjs
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'tests');
const files = readdirSync(dir).filter((f) => f.endsWith('.test.mjs')).sort().map((f) => join(dir, f));
const r = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
process.exit(r.status ?? 1);
