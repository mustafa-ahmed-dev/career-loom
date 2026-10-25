// Fetches the OFL Noto fonts used only for CJK and Devanagari text into fonts/cache/ (gitignored).
// Needs network once. Usage: node scripts/fetch-fonts.mjs
import { execFileSync, execSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.env.CL_FONT_CACHE ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'fonts', 'cache');
const PACKS = [
  { family: 'Noto Sans SC', pkg: '@fontsource/noto-sans-sc', slug: 'noto-sans-sc', weights: [400, 700] },
  { family: 'Noto Sans Devanagari', pkg: '@fontsource/noto-sans-devanagari', slug: 'noto-sans-devanagari', weights: [400, 700] },
];
mkdirSync(ROOT, { recursive: true });
const manifest = { families: {} };
// On Windows npm is npm.cmd, which Node only starts through a shell; quote every argument for it.
const npm = (args) => (process.platform === 'win32'
  ? execSync(['npm', ...args].map((a) => `"${a}"`).join(' '), { encoding: 'utf8' })
  : execFileSync('npm', args, { encoding: 'utf8' }));
for (const p of PACKS) {
  const tmp = mkdtempSync(join(tmpdir(), 'cl-font-'));
  const tgz = npm(['pack', p.pkg, '--silent', '--pack-destination', tmp]).trim().split('\n').pop();
  execFileSync('tar', ['xzf', tgz], { cwd: tmp }); // relative names only: GNU tar reads "C:\..." as a remote host
  manifest.families[p.family] = [];
  for (const w of p.weights) {
    const css = readFileSync(join(tmp, 'package', `${w}.css`), 'utf8');
    const re = /src: url\(\.\/files\/([^)]+\.woff2)\)[^}]*?unicode-range: ([^;]+);/g;
    let m;
    while ((m = re.exec(css))) {
      const file = m[1];
      mkdirSync(join(ROOT, p.slug), { recursive: true });
      if (!existsSync(join(ROOT, p.slug, file))) copyFileSync(join(tmp, 'package', 'files', file), join(ROOT, p.slug, file));
      manifest.families[p.family].push({ file: `${p.slug}/${file}`, weight: w, range: m[2] });
    }
  }
  console.log(p.family, manifest.families[p.family].length, 'files');
}
writeFileSync(join(ROOT, 'fonts.json'), JSON.stringify(manifest));
