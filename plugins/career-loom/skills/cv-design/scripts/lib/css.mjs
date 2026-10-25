// Tokens -> CSS. One stylesheet generator for all designs; layout flags in tokens.layout choose variants.
const q = (f) => `"${f}"`;
// Cairo has no Central Kurdish (Sorani) glyphs (S144): Sorani documents use IBM Plex Sans Arabic for every role.
export const arabicFont = (r, lang) => (r.arabic === 'Cairo' && /^(ckb|ku)/.test(lang ?? '') ? 'IBM Plex Sans Arabic' : r.arabic);
export function fontStacks(t, script, lang) {
  const stack = (role) => {
    const r = t.fonts[role];
    const fams = [r.latin, arabicFont(r, lang), t.fonts.cjk ?? 'Noto Sans SC', t.fonts.devanagari ?? 'Noto Sans Devanagari'];
    return fams.map(q).join(',') + ',sans-serif';
  };
  return { display: stack('display'), heading: stack('heading'), body: stack('body'), mono: stack('mono') };
}
export function familiesUsed(t) {
  const s = new Set();
  for (const r of ['display', 'heading', 'body', 'mono']) { s.add(t.fonts[r].latin); s.add(t.fonts[r].arabic); }
  s.add(t.fonts.cjk ?? 'Noto Sans SC'); s.add(t.fonts.devanagari ?? 'Noto Sans Devanagari');
  return [...s];
}

export function buildCss(t, { rtl, script, lang }) {
  const c = t.colors, s = t.sizes, sp = t.spacing, L = t.layout, f = fontStacks(t, script, lang);
  const sidebar = L.kind === 'sidebar';
  const lh = script === 'arabic' ? s.arabicLineHeight ?? s.lineHeight + 0.15 : script === 'devanagari' || script === 'cjk' ? s.lineHeight + 0.1 : s.lineHeight;
  const dirTo = rtl ? 'left' : 'right';
  const edge = `${s.marginSide}mm + ${L.sidebarWidth ?? '0mm'} + ${sp.gutter / 2}mm`;
  const bg = sidebar ? `linear-gradient(to ${dirTo}, ${c.sidebarBg} 0, ${c.sidebarBg} calc(${edge}), ${c.bg} calc(${edge}))` : c.bg;
  const upper = L.headingCase === 'upper' && (script === 'latin' || script === 'cyrillic');
  return `
:root{--bg:${c.bg};--text:${c.text};--muted:${c.muted};--accent:${c.accent};--rule:${c.rule};}
@page{size:${s.page};margin:${sidebar ? 0 : `${s.marginTop}mm ${s.marginSide}mm ${s.marginBottom}mm ${s.marginSide}mm`}}
*{box-sizing:border-box}
html{background:${bg};-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;color:var(--text);font-family:${f.body};font-weight:${t.fonts.body.weight};font-size:${s.base}pt;line-height:${lh};font-kerning:normal;overflow-wrap:break-word;text-align:start}
/* Arabic-script text: ligatures off so PDF text extraction keeps letter order (lam-alef, ba-ra ligature glyphs extract reversed otherwise). Verified in tests/extraction. */
html[data-script="arabic"] body{font-variant-ligatures:none;font-feature-settings:"rlig" 0,"liga" 0,"clig" 0,"calt" 0}
h1,h2,h3,p,ul,li{margin:0;padding:0}
ul{list-style:none}
.layout{${sidebar ? `padding:${s.marginTop}mm ${s.marginSide}mm ${s.marginBottom}mm;-webkit-box-decoration-break:clone;box-decoration-break:clone;` : ''}display:grid;${sidebar ? `grid-template-columns:${L.sidebarWidth} minmax(0,1fr);column-gap:${sp.gutter}mm;` : 'grid-template-columns:minmax(0,1fr);'}}
.head{${sidebar ? 'grid-column:2;grid-row:1;' : ''}margin-bottom:${sp.section * 0.6}pt}
${sidebar ? `.side{grid-column:1;grid-row:1 / span 2;color:${c.sidebarText};padding-top:${sp.section * 0.2}pt}
.main{grid-column:2;grid-row:2}
.side .sec h2{color:${c.sidebarAccent};border-color:${c.sidebarAccent}}
.side .muted,.side .meta{color:${c.sidebarMuted}}` : ''}
h1{font-family:${f.display};font-weight:${t.fonts.display.weight};font-size:${s.name}pt;line-height:1.15;letter-spacing:${script === 'latin' ? '-0.01em' : '0'}}
.headline{font-size:${s.headline}pt;color:var(--muted);margin-top:2pt}
.contact{display:flex;flex-wrap:wrap;gap:1pt 12pt;margin-top:5pt;font-size:${s.small + 0.5}pt}
.side .contact{display:block;margin-top:0}
.side .contact li{margin-bottom:3pt}
.contact li{display:block}
.sec{margin-top:${sp.section}pt}
.sec:first-child{margin-top:0}
h2{font-family:${f.heading};font-weight:${t.fonts.heading.weight};font-size:${s.heading}pt;line-height:1.25;color:var(--accent);${upper ? 'text-transform:uppercase;' : ''}${upper && script === 'latin' ? 'letter-spacing:0.06em;' : ''}${L.headingStyle === 'rule-below' ? `border-bottom:0.75pt solid var(--rule);padding-bottom:2pt;` : ''}${L.headingStyle === 'rule-above' ? `border-top:0.75pt solid var(--rule);padding-top:3pt;` : ''}margin-bottom:${sp.item * 0.7}pt;break-after:avoid}
.entry{margin-bottom:${sp.item}pt;break-inside:avoid-page}
.entry:last-child{margin-bottom:0}
.entry-head{display:flex;flex-wrap:wrap;justify-content:${L.dateAlign === 'inline' ? 'flex-start' : 'space-between'};align-items:baseline;column-gap:8pt;break-after:avoid}
h3{font-family:${f.heading};font-weight:${t.fonts.heading.weight};font-size:${s.base + 0.5}pt;line-height:1.3}
.dates{color:var(--muted);font-size:${s.small + 0.5}pt;white-space:nowrap}
.meta{color:var(--muted);font-size:${s.base - 0.3}pt;margin-top:0.5pt}
.entry p.sum{margin-top:2pt}
.bul{margin-top:${sp.bullet + 1}pt}
.bul li{position:relative;padding-inline-start:${L.bulletStyle === 'none' ? 0 : 10}pt;margin-top:${sp.bullet}pt}
${L.bulletStyle === 'none' ? '' : `.bul li::before{content:"${L.bulletStyle === 'dash' ? '–' : '•'}";position:absolute;inset-inline-start:0;color:var(--muted)}`}
.chips{display:block}
.chips li{display:inline}
.chips li:not(:last-child)::after{content:" · ";color:var(--muted)}
.grp{margin-bottom:${sp.bullet + 1}pt}
.grp b{font-weight:600}
.single .grp b::after,.single .lang-list .lvl::before{content:""}
.single .grp b{display:inline}
.single .grp b::after{content:":";margin-inline-end:4pt}
.single .grp .chips{display:inline}
.single .lang-list li{display:inline}
.single .lang-list li:not(:last-child)::after{content:" · ";color:var(--muted)}
.single .lang-list{display:block}
.side .grp{margin-bottom:${sp.item}pt}
.side .grp b{display:block}
.side .chips li{display:block}
.side .chips li:not(:last-child)::after{content:""}
.lang-list li{margin-top:1.5pt}
.lang-list .lvl{color:var(--muted)}
.side .lang-list .lvl{color:${c.sidebarMuted ?? c.muted}}
.summary-p{max-width:100%}
bdi.ltr{unicode-bidi:isolate}
a{color:inherit;text-decoration:none}
.mono{font-family:${f.mono}}
`;
}
