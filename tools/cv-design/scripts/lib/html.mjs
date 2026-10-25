import { esc, isRtl, scriptOf } from './util.mjs';
import { labelsFor } from './labels.mjs';
import { buildCss, familiesUsed } from './css.mjs';
import { fontFaceCss } from './fonts.mjs';

const DEFAULT_ORDER = ['summary', 'highlights', 'work', 'projects', 'education', 'volunteer', 'publications', 'skills', 'certificates', 'languages'];
const ltr = (s) => `<bdi dir="ltr" class="ltr">${esc(s)}</bdi>`;

function dates(e, lab) {
  if (!e.start && !e.end) return '';
  const end = e.end && /^present$/i.test(e.end) ? lab.present : e.end;
  const parts = [e.start, end].filter(Boolean).map((p) => `<bdi>${esc(p)}</bdi>`);
  return `<span class="dates">${parts.join(' – ')}</span>`;
}
function entry(e, lab) {
  const meta = [e.org, e.location].filter(Boolean).map(esc).join(' · ');
  return `<article class="entry"><div class="entry-head"><h3>${esc(e.title)}</h3>${dates(e, lab)}</div>${meta ? `<p class="meta">${meta}</p>` : ''}${e.summary ? `<p class="sum">${esc(e.summary)}</p>` : ''}${e.bullets?.length ? `<ul class="bul">${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}</article>`;
}
function contactList(cv) {
  const b = cv.basics, items = [];
  if (b.email) items.push(`<li>${ltr(b.email)}</li>`);
  if (b.phone) items.push(`<li>${ltr(b.phone)}</li>`);
  if (b.location) items.push(`<li>${esc(b.location)}</li>`);
  for (const l of b.links ?? []) items.push(`<li>${esc(l.label)}: ${ltr(l.url)}</li>`);
  return `<ul class="contact">${items.join('')}</ul>`;
}
const SECTIONS = {
  summary: (cv, lab) => cv.summary && `<section class="sec" id="summary"><h2>${esc(lab.summary)}</h2><p class="summary-p">${esc(cv.summary)}</p></section>`,
  work: (cv, lab) => cv.work?.length && `<section class="sec" id="work"><h2>${esc(lab.work)}</h2><div class="entries">${cv.work.map((e) => entry(e, lab)).join('')}</div></section>`,
  projects: (cv, lab) => cv.projects?.length && `<section class="sec" id="projects"><h2>${esc(lab.projects)}</h2><div class="entries">${cv.projects.map((e) => entry(e, lab)).join('')}</div></section>`,
  education: (cv, lab) => cv.education?.length && `<section class="sec" id="education"><h2>${esc(lab.education)}</h2><div class="entries">${cv.education.map((e) => entry(e, lab)).join('')}</div></section>`,
  volunteer: (cv, lab) => cv.volunteer?.length && `<section class="sec" id="volunteer"><h2>${esc(lab.volunteer)}</h2><div class="entries">${cv.volunteer.map((e) => entry(e, lab)).join('')}</div></section>`,
  publications: (cv, lab) => cv.publications?.length && `<section class="sec" id="publications"><h2>${esc(lab.publications)}</h2><div class="entries">${cv.publications.map((e) => entry(e, lab)).join('')}</div></section>`,
  skills: (cv, lab) => cv.skills?.length && `<section class="sec" id="skills"><h2>${esc(lab.skills)}</h2>${cv.skills.map((g) => `<div class="grp"><b>${esc(g.name)}</b><ul class="chips">${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}</section>`,
  certificates: (cv, lab) => cv.certificates?.length && `<section class="sec" id="certificates"><h2>${esc(lab.certificates)}</h2><div class="entries">${cv.certificates.map((e) => entry(e, lab)).join('')}</div></section>`,
  highlights: (cv, lab) => cv.highlights?.length && `<section class="sec" id="highlights"><h2>${esc(lab.highlights)}</h2><ul class="hl" style="--n:${cv.highlights.length}">${cv.highlights.map((h) => `<li><b class="v"><bdi dir="ltr">${esc(h.value)}</bdi></b> <span class="l">${esc(h.label)}</span></li>`).join('')}</ul></section>`,
  languages: (cv, lab) => cv.languages?.length && `<section class="sec" id="languages"><h2>${esc(lab.languages)}</h2><ul class="lang-list">${cv.languages.map((l) => `<li>${esc(l.name)}${l.level ? ` <span class="lvl">(${esc(l.level)})</span>` : ''}</li>`).join('')}</ul></section>`,
  contact: (cv, lab) => `<section class="sec" id="contact"><h2>${esc(lab.contact)}</h2>${contactList(cv)}</section>`,
};

/** A section the design's order forgets is appended, never dropped: the CV's content must always reach the page. */
export function completeOrder(order, cv, side) {
  const missing = DEFAULT_ORDER.filter((k) => !order.includes(k) && !side.includes(k) && (k === 'summary' ? cv.summary : cv[k]?.length));
  return [...order, ...missing];
}

/** Returns { html, text, rtl, script }. `text` is every character that appears (used to subset fonts). */
export function buildHtml(cv, tokens, { rtlFlag = 'auto', title } = {}) {
  const rtl = isRtl(cv, rtlFlag), script = scriptOf(cv.meta.lang), lab = labelsFor(cv), L = tokens.layout;
  const side = L.kind === 'sidebar' ? L.sidebarSections : [];
  const order = completeOrder(L.sectionOrder ?? DEFAULT_ORDER, cv, side);
  const render = (keys) => keys.map((k) => SECTIONS[k]?.(cv, lab)).filter(Boolean).join('\n');
  const mainKeys = order.filter((k) => !side.includes(k));
  const sideKeys = side;
  const b = cv.basics;
  const head = `<header class="head"><div class="id"><h1>${esc(b.name)}</h1>${b.headline ? `<p class="headline">${esc(b.headline)}</p>` : ''}</div>${side.includes('contact') ? '' : contactList(cv)}</header>`;
  const body = L.kind === 'sidebar'
    ? `${head}<aside class="side">${render(sideKeys)}</aside><main class="main">${render(mainKeys)}</main>`
    : `${head}<main class="main">${render(mainKeys)}</main>`;
  const probe = body.replace(/<[^>]+>/g, ' ') + '0123456789 –·•';
  const { css: faces, missing } = fontFaceCss(familiesUsed(tokens), probe + JSON.stringify(cv));
  const html = `<!doctype html>
<html lang="${esc(cv.meta.lang)}" dir="${rtl ? 'rtl' : 'ltr'}" data-script="${script}" data-design="${esc(tokens.id)}" data-layout="${L.kind}">
<head><meta charset="utf-8"><title>${esc(title ?? `${b.name} – CV`)}</title><meta name="viewport" content="width=device-width,initial-scale=1">
<style>${faces}${buildCss(tokens, { rtl, script, lang: cv.meta.lang })}</style></head>
<body><div class="layout ${L.kind === 'sidebar' ? 'sidebar' : L.kind === 'labelled' ? 'labelled' : 'single'}">${body}</div></body></html>`;
  return { html, rtl, script, missingFonts: missing };
}

/** Strings in DOM (reading) order, split into head / side / main, used by the extraction test. */
export function anchors(cv, tokens) {
  const lab = labelsFor(cv), L = tokens.layout;
  const sideKeys = L.kind === 'sidebar' ? L.sidebarSections : [];
  const order = completeOrder(L.sectionOrder ?? DEFAULT_ORDER, cv, sideKeys);
  const named = { work: cv.work, projects: cv.projects, education: cv.education, volunteer: cv.volunteer, publications: cv.publications, certificates: cv.certificates };
  const of = (keys) => {
    const out = [];
    for (const k of keys) {
      if (k === 'contact') { out.push(lab.contact); continue; }
      if (k === 'summary') { if (cv.summary) out.push(lab.summary); continue; }
      if (k === 'highlights') { if (cv.highlights?.length) out.push(lab.highlights); continue; }
      if (k === 'skills') { if (cv.skills?.length) out.push(lab.skills, ...cv.skills.map((g) => g.name)); continue; }
      if (k === 'languages') { if (cv.languages?.length) out.push(lab.languages, cv.languages[0].name); continue; }
      if (named[k]?.length) out.push(lab[k], ...named[k].map((e) => e.title));
    }
    return out;
  };
  return { head: [cv.basics.name, cv.basics.headline].filter(Boolean), side: of(sideKeys), main: of(order.filter((k) => !sideKeys.includes(k))) };
}
