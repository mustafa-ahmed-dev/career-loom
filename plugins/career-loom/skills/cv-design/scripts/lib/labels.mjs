// Default section headings. Other languages must supply meta.labels in the CV JSON.
export const LABELS = {
  en: { summary: 'Profile', work: 'Experience', education: 'Education', skills: 'Skills', languages: 'Languages', projects: 'Projects', certificates: 'Certificates', volunteer: 'Volunteering', publications: 'Publications', contact: 'Contact', links: 'Links', present: 'Present' },
  ar: { summary: 'نبذة', work: 'الخبرة العملية', education: 'التعليم', skills: 'المهارات', languages: 'اللغات', projects: 'المشاريع', certificates: 'الشهادات', volunteer: 'العمل التطوعي', publications: 'المنشورات', contact: 'التواصل', links: 'الروابط', present: 'حتى الآن' },
};
export function labelsFor(cv) {
  const base = LABELS[cv.meta.lang.split('-')[0]] ?? LABELS.en;
  return { ...base, ...(cv.meta.labels ?? {}) };
}
export const needsLabels = (cv) => !LABELS[cv.meta.lang.split('-')[0]] && !cv.meta.labels;
