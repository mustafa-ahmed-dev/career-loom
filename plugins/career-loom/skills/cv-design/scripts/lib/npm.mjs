import { execFileSync, execSync } from 'node:child_process';

/**
 * Command line used on Windows, where npm is npm.cmd and Node only starts a .cmd through a shell.
 * The arguments are quoted; the command name must NOT be: a quoted "npm" makes npm.cmd look for its own
 * files in the current folder instead of its install folder (MODULE_NOT_FOUND ...\\node_modules\\npm\\bin\\npm-cli.js).
 */
export const winNpmCommandLine = (args) => ['npm', ...args.map((a) => `"${a}"`)].join(' ');

/** Runs npm and returns its stdout. */
export function npm(args, opts = {}) {
  return process.platform === 'win32'
    ? execSync(winNpmCommandLine(args), { encoding: 'utf8', ...opts })
    : execFileSync('npm', args, { encoding: 'utf8', ...opts });
}
