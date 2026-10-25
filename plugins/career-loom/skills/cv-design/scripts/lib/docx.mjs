// DOCX output for tiers A, B and (best effort) C: always a single column, real headings and bullets, no text boxes or tables.
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, LevelFormat, BorderStyle, TabStopType } from 'docx';
import { writeFileSync } from 'node:fs';
import { isRtl, scriptOf, hasRtlChars } from './util.mjs';
import { labelsFor } from './labels.mjs';

const ORDER = ['summary', 'work', 'projects', 'education', 'volunteer', 'publications', 'skills', 'certificates', 'languages'];
const hex = (c) => c.replace('#', '').toUpperCase();
const pt = (n) => Math.round(n * 2); // half-points

export async function renderDocx(cv, t, outPath, { rtlFlag = 'auto' } = {}) {
  const rtl = isRtl(cv, rtlFlag), lab = labelsFor(cv), c = t.colors, s = t.sizes, script = scriptOf(cv.meta.lang);
  const font = (role) => ({ ascii: t.fonts[role].latin, hAnsi: t.fonts[role].latin, cs: t.fonts[role].arabic, eastAsia: t.fonts.cjk ?? 'Noto Sans SC' });
  const run = (text, o = {}) => new TextRun({ text, font: font(o.role ?? 'body'), size: pt(o.size ?? s.base), bold: o.bold, color: hex(o.color ?? c.text), rightToLeft: rtl && hasRtlChars(text) ? true : undefined, language: { value: cv.meta.lang, bidirectional: rtl ? cv.meta.lang : undefined }, allCaps: o.caps });
  const para = (children, o = {}) => new Paragraph({ children, bidirectional: rtl || undefined, alignment: AlignmentType.START, spacing: { before: pt(o.before ?? 0) * 10, after: pt(o.after ?? 0) * 10, line: Math.round((script === 'arabic' ? (s.arabicLineHeight ?? 1.6) : s.lineHeight) * 240) }, ...o.extra });
  const heading = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [run(text, { role: 'heading', bold: true, size: s.heading, color: c.accent, caps: t.layout.headingCase === 'upper' && (script === 'latin' || script === 'cyrillic') })], bidirectional: rtl || undefined, keepNext: true, spacing: { before: t.spacing.section * 20, after: 60 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: hex(c.rule), space: 2 } } });
  const bullet = (text) => new Paragraph({ children: [run(text)], bullet: undefined, numbering: { reference: 'bul', level: 0 }, bidirectional: rtl || undefined, spacing: { after: Math.round(t.spacing.bullet * 20) } });
  const datesOf = (e) => { const end = e.end && /^present$/i.test(e.end) ? lab.present : e.end; return [e.start, end].filter(Boolean).join(' – '); };

  const kids = [];
  const b = cv.basics;
  kids.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [run(b.name, { role: 'display', bold: true, size: s.name })], bidirectional: rtl || undefined, spacing: { after: 40 } }));
  if (b.headline) kids.push(para([run(b.headline, { size: s.headline, color: c.muted })], { after: 4 }));
  const contact = [b.email, b.phone, b.location, ...(b.links ?? []).map((l) => `${l.label}: ${l.url}`)].filter(Boolean).join('  |  ');
  if (contact) kids.push(para([run(contact, { size: s.small + 0.5 })], { after: 2 }));

  const entry = (e) => {
    kids.push(para([run(e.title, { role: 'heading', bold: true, size: s.base + 0.5 }), ...(datesOf(e) ? [run('   ' + datesOf(e), { size: s.small + 0.5, color: c.muted })] : [])], { before: 4, extra: { keepNext: true } }));
    const meta = [e.org, e.location].filter(Boolean).join(' · ');
    if (meta) kids.push(para([run(meta, { color: c.muted, size: s.base - 0.3 })], { extra: { keepNext: !!(e.bullets?.length || e.summary) } }));
    if (e.summary) kids.push(para([run(e.summary)]));
    for (const x of e.bullets ?? []) kids.push(bullet(x));
  };
  const sections = {
    summary: () => cv.summary && (kids.push(heading(lab.summary)), kids.push(para([run(cv.summary)]))),
    work: () => cv.work?.length && (kids.push(heading(lab.work)), cv.work.forEach(entry)),
    projects: () => cv.projects?.length && (kids.push(heading(lab.projects)), cv.projects.forEach(entry)),
    education: () => cv.education?.length && (kids.push(heading(lab.education)), cv.education.forEach(entry)),
    volunteer: () => cv.volunteer?.length && (kids.push(heading(lab.volunteer)), cv.volunteer.forEach(entry)),
    publications: () => cv.publications?.length && (kids.push(heading(lab.publications)), cv.publications.forEach(entry)),
    skills: () => cv.skills?.length && (kids.push(heading(lab.skills)), cv.skills.forEach((g) => kids.push(para([run(g.name + ': ', { bold: true }), run(g.items.join(', '))], { after: 2 })))),
    certificates: () => cv.certificates?.length && (kids.push(heading(lab.certificates)), cv.certificates.forEach(entry)),
    languages: () => cv.languages?.length && (kids.push(heading(lab.languages)), kids.push(para([run(cv.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join(' · '))]))),
  };
  for (const k of t.layout.sectionOrder ?? ORDER) sections[k]?.();

  const doc = new Document({
    creator: 'Career Loom', title: `${b.name} – CV`, language: cv.meta.lang,
    numbering: { config: [{ reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 240 } } } }] }] },
    styles: { default: { document: { run: { font: font('body'), size: pt(s.base) } } } },
    sections: [{ properties: { page: { size: { width: s.page === 'A4' ? 11906 : 12240, height: s.page === 'A4' ? 16838 : 15840 }, margin: { top: Math.round(s.marginTop * 56.7), bottom: Math.round(s.marginBottom * 56.7), left: Math.round(s.marginSide * 56.7), right: Math.round(s.marginSide * 56.7) } }, bidi: rtl || undefined }, children: kids }],
  });
  writeFileSync(outPath, await Packer.toBuffer(doc));
}
