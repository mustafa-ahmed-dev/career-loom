// Tokens -> CSS. One stylesheet generator for all designs; the layout flags in tokens.layout choose variants.
const q = (f) => `"${f}"`;
// Cairo has no Central Kurdish (Sorani) glyphs (S144): Sorani documents use IBM Plex Sans Arabic for every role.
export const arabicFont = (r, lang) => (r.arabic === 'Cairo' && /^(ckb|ku)/.test(lang ?? '') ? 'IBM Plex Sans Arabic' : r.arabic);
export function fontStacks(t, script, lang) {
  const stack = (role) => {
    const r = t.fonts[role];
    const serif = r.latin === 'Source Serif 4';
    const fams = [r.latin, arabicFont(r, lang), t.fonts.cjk ?? 'Noto Sans SC', t.fonts.devanagari ?? 'Noto Sans Devanagari'];
    return fams.map(q).join(',') + (serif ? ',serif' : ',sans-serif');
  };
  return { display: stack('display'), heading: stack('heading'), body: stack('body'), mono: stack('mono') };
}
export function familiesUsed(t) {
  const s = new Set();
  for (const r of ['display', 'heading', 'body', 'mono']) { s.add(t.fonts[r].latin); s.add(t.fonts[r].arabic); }
  s.add('IBM Plex Sans Arabic'); // Sorani fallback for Cairo
  s.add(t.fonts.cjk ?? 'Noto Sans SC'); s.add(t.fonts.devanagari ?? 'Noto Sans Devanagari');
  return [...s];
}

export function buildCss(t, { rtl, script, lang }) {
  const c = t.colors, s = t.sizes, sp = t.spacing, L = t.layout, f = fontStacks(t, script, lang);
  const side = L.kind === 'sidebar', labelled = L.kind === 'labelled', band = L.header === 'band', split = L.header === 'split';
  const bleed = side || band || c.bg.toLowerCase() !== '#ffffff'; // page margin 0; the .layout padding repeats on every page
  const lh = script === 'arabic' ? s.arabicLineHeight ?? s.lineHeight + 0.15 : script === 'devanagari' || script === 'cjk' ? s.lineHeight + 0.1 : s.lineHeight;
  const dirTo = rtl ? 'left' : 'right';
  const edge = `${s.marginSide}mm + ${L.sidebarWidth ?? '0mm'} + ${sp.gutter / 2}mm`;
  const tint = side && c.sidebarBg.toLowerCase() !== c.bg.toLowerCase() && !L.headerFull;
  const bg = tint ? `linear-gradient(to ${dirTo}, ${c.sidebarBg} 0, ${c.sidebarBg} calc(${edge}), ${c.bg} calc(${edge}))` : c.bg;
  const upper = L.headingCase === 'upper' && (script === 'latin' || script === 'cyrillic');
  const center = L.headerAlign === 'center';
  const hs = L.headingStyle;
  const headBox = { 'rule-below': 'border-bottom:0.75pt solid var(--rule);padding-bottom:2pt;', 'rule-above': 'border-top:0.75pt solid var(--rule);padding-top:3pt;', plain: '', 'bar-start': 'border-inline-start:3pt solid var(--accent);padding-inline-start:6pt;', ribbon: `background:${c.ribbonBg};color:${c.ribbonText};padding:2.5pt 7pt;` }[hs ?? 'rule-below'];
  const pills = L.skillsStyle === 'pills', mono = L.skillsStyle === 'mono', timeline = L.entryStyle === 'timeline', cards = L.projectsStyle === 'cards';
  const dateW = 21, lineGap = 5;
  const sideBg = c.sidebarBg ?? c.bg;
  return `
:root{--bg:${c.bg};--text:${c.text};--muted:${c.muted};--accent:${c.accent};--rule:${c.rule};}
@page{size:${s.page};margin:${bleed ? 0 : `${s.marginTop}mm ${s.marginSide}mm ${s.marginBottom}mm`}}
*{box-sizing:border-box}
html{background:${bg};-webkit-print-color-adjust:exact;print-color-adjust:exact}
/* Arabic-script text: ligatures off so PDF text extraction keeps letter order (lam-alef and ba-ra ligature glyphs extract reversed otherwise). Verified in tests. */
html[data-script="arabic"] body{font-variant-ligatures:none;font-feature-settings:"rlig" 0,"liga" 0,"clig" 0,"calt" 0}
body{margin:0;color:var(--text);font-family:${f.body};font-weight:${t.fonts.body.weight};font-size:${s.base}pt;line-height:${lh};font-kerning:normal;overflow-wrap:break-word;text-align:start}
h1,h2,h3,p,ul,li{margin:0;padding:0}
ul{list-style:none}
.layout{${bleed ? `padding:${s.marginTop}mm ${s.marginSide}mm ${s.marginBottom}mm;-webkit-box-decoration-break:clone;box-decoration-break:clone;` : ''}display:grid;${side ? `grid-template-columns:${L.sidebarWidth} minmax(0,1fr);column-gap:${sp.gutter}mm;` : 'grid-template-columns:minmax(0,1fr);'}}
/* header */
.head{${side && !L.headerFull ? 'grid-column:2;grid-row:1;' : ''}${side && L.headerFull ? 'grid-column:1 / -1;grid-row:1;' : ''}margin-bottom:${sp.section * 0.6}pt;${center ? 'text-align:center;' : ''}}
${band ? `.head{margin:-${s.marginTop}mm -${s.marginSide}mm ${sp.section}pt;padding:${s.marginTop}mm ${s.marginSide}mm ${s.marginTop * 0.6}mm;background:${c.bandBg};color:${c.bandText}}
.head .headline,.head .contact{color:${c.bandText}}
.head h1{color:${c.bandText}}` : ''}
${split ? `.head{display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:${sp.gutter * 2}mm;align-items:end;padding-bottom:6pt;border-bottom:1.5pt solid var(--accent)}
.head .id{grid-column:1}
.head .contact{grid-column:2;display:block;margin-top:0;text-align:end}
.head .contact li{margin-bottom:1.5pt}` : ''}
${side ? `.side{grid-column:1;grid-row:${L.headerFull ? 2 : '1 / span 2'};color:${c.sidebarText};padding-top:${sp.section * 0.2}pt${L.headerFull ? `;padding-inline-end:${sp.gutter / 2}mm;border-inline-end:0.75pt solid var(--rule)` : ''}}
.main{grid-column:2;grid-row:${L.headerFull ? 2 : 2}}
.side .sec h2{color:${c.sidebarAccent};border:0;border-bottom:0.75pt solid ${c.sidebarAccent};background:none;padding:0 0 2pt}
.side .muted,.side .meta,.side .dates,.side .lang-list .lvl{color:${c.sidebarMuted ?? c.muted}}` : ''}
h1{font-family:${f.display};font-weight:${t.fonts.display.weight};font-size:${s.name}pt;line-height:1.12;letter-spacing:${script === 'latin' && s.name > 26 ? '-0.015em' : '0'}}
.headline{font-size:${s.headline}pt;color:var(--muted);margin-top:2pt}
.contact{display:flex;flex-wrap:wrap;gap:1pt 12pt;margin-top:5pt;font-size:${s.small + 0.5}pt;${center ? 'justify-content:center;' : ''}}
.side .contact{display:block;margin-top:0}
.side .contact li{margin-bottom:3pt}
.sec{margin-top:${sp.section}pt}
.sec:first-child{margin-top:0}
h2{font-family:${f.heading};font-weight:${t.fonts.heading.weight};font-size:${s.heading}pt;line-height:1.25;color:var(--accent);${upper ? 'text-transform:uppercase;' : ''}${upper && script === 'latin' ? 'letter-spacing:0.06em;' : ''}${headBox}margin-bottom:${sp.item * 0.7}pt;break-after:avoid}
${labelled ? `.main .sec{display:grid;grid-template-columns:${L.labelWidth} minmax(0,1fr);column-gap:${sp.gutter}mm;border-top:1.25pt solid var(--text);padding-top:5pt}
.main .sec>h2{grid-column:1;grid-row:1;border:0;padding:0;margin:0}
.main .sec>*:not(h2){grid-column:2}` : ''}
/* entries */
.entry{margin-bottom:${sp.item}pt;break-inside:avoid-page}
.entry:last-child{margin-bottom:0}
.entry-head{display:flex;flex-wrap:wrap;justify-content:${L.dateAlign === 'inline' ? 'flex-start' : 'space-between'};align-items:baseline;column-gap:8pt;break-after:avoid}
h3{font-family:${f.heading};font-weight:${t.fonts.heading.weight};font-size:${s.base + 0.5}pt;line-height:1.3}
.dates{color:var(--muted);font-size:${s.small + 0.5}pt;white-space:nowrap}
.meta{color:var(--muted);font-size:${s.base - 0.3}pt;margin-top:0.5pt}
.entry p.sum{margin-top:2pt}
${timeline ? `/* no position:relative here: positioned boxes paint last and scramble the PDF text order */
.main .entries .entry,.entries .entry{display:grid;grid-template-columns:${dateW}mm ${lineGap}mm minmax(0,1fr);column-gap:0;margin:0;padding-bottom:${sp.item}pt}
.entry-head{display:contents}
.entry h3{grid-column:3;grid-row:1}
.entry .dates{grid-column:1;grid-row:1 / span 6;align-self:start;text-align:end;padding-inline-end:2mm;white-space:normal}
.entry>*:not(.entry-head){grid-column:3}
.entry h3,.entry>.meta,.entry>.sum{padding-inline-start:2mm}
.entry>.bul{padding-inline-start:2mm}
.entry{background:linear-gradient(var(--rule),var(--rule)) ${rtl ? 'right' : 'left'} ${dateW + lineGap / 2 - 0.16}mm top / 0.9pt 100% no-repeat,radial-gradient(circle at ${rtl ? `calc(100% - ${dateW + lineGap / 2}mm)` : `${dateW + lineGap / 2}mm`} 0.62em,var(--accent) 0 1.1mm,transparent 1.2mm) no-repeat}
.entry:last-child{padding-bottom:0}` : ''}
${cards ? `.sec#projects .entries{display:grid;grid-template-columns:1fr 1fr;gap:8pt}
.sec#projects .entry{border:0.75pt solid var(--rule);background:${c.cardBg};padding:7pt 8pt;margin:0}` : ''}
.bul{margin-top:${sp.bullet + 1}pt}
.bul li{position:relative;padding-inline-start:${L.bulletStyle === 'none' ? 0 : 10}pt;margin-top:${sp.bullet}pt}
${L.bulletStyle === 'none' ? '' : `.bul li::before{content:"${L.bulletStyle === 'dash' ? '–' : '•'}";position:absolute;inset-inline-start:0;color:var(--muted)}`}
/* skills, languages */
.chips{display:block}
.chips li{display:inline}
.chips li:not(:last-child)::after{content:" · ";color:var(--muted)}
.grp{margin-bottom:${sp.bullet + 1}pt}
.grp b{font-weight:600}
.single .grp b,.labelled .grp b{display:inline}
.single .grp b::after,.labelled .grp b::after{content:":";margin-inline-end:4pt}
.single .grp .chips,.labelled .grp .chips{display:inline}
.single .lang-list li,.labelled .lang-list li{display:inline}
.single .lang-list li:not(:last-child)::after,.labelled .lang-list li:not(:last-child)::after{content:" · ";color:var(--muted)}
.side .grp{margin-bottom:${sp.item}pt}
.side .grp b{display:block}
.side .chips li{display:block}
.side .chips li:not(:last-child)::after{content:""}
.lang-list li{margin-top:1.5pt}
.lang-list .lvl{color:var(--muted)}
${mono ? `.chips li{font-family:${f.mono};font-size:${s.base - 0.5}pt}` : ''}
${pills ? `.chips li{display:inline-block;background:${c.chipBg};border-radius:3pt;padding:0.5pt 6pt;margin:0 4pt 3pt 0}
.chips li:not(:last-child)::after{content:""}
[dir=rtl] .chips li{margin:0 0 3pt 4pt}
.single .grp .chips{display:inline}` : ''}
/* highlights */
.hl{display:block}
.hl li{display:inline}
.hl li:not(:last-child)::after{content:" · ";color:var(--muted)}
.hl b{font-weight:600}
${L.highlightsStyle === 'cards' ? `.hl{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:8pt}
.hl li{display:block;border-inline-start:3pt solid var(--accent);padding-inline-start:7pt}
.hl li:not(:last-child)::after{content:""}
.hl .v{display:block;font-family:${f.display};font-weight:700;font-size:${s.base * 2}pt;line-height:1.1;color:var(--accent)}
.hl .l{display:block;font-size:${s.small}pt;color:var(--muted);margin-top:1pt}` : ''}
.summary-p{max-width:100%}
bdi.ltr{unicode-bidi:isolate}
a{color:inherit;text-decoration:none}
.mono{font-family:${f.mono}}
/* On screen the page is a centred sheet on a grey desk. @page margins only exist in print, so plain designs get them as padding here; print and PDF are unchanged. */
@media screen{
html{background:#dfe2e6}
body{width:${s.page === 'Letter' ? '8.5in' : '210mm'};max-width:100%;min-height:${s.page === 'Letter' ? '11in' : '297mm'};margin:18px auto;background:${bg};box-shadow:0 1px 3px rgba(0,0,0,.18),0 8px 28px rgba(0,0,0,.12);${bleed ? '' : `padding:${s.marginTop}mm ${s.marginSide}mm ${s.marginBottom}mm;`}}
}
`;
}
