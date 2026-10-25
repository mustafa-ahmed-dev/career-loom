/** Static rules on the generated HTML. Returns a list of violations (empty = pass). */
export function staticChecks(html, cv) {
  const bad = [];
  if (/<(progress|meter|img|svg|canvas|video)\b/i.test(html)) bad.push('graphic element in output (progress/meter/img/svg/canvas)');
  if (/role=["']?(progressbar|meter)/i.test(html)) bad.push('progress-bar role');
  if (/@(top|bottom)-(left|center|right)/i.test(html)) bad.push('page header/footer margin box used');
  const body = html.replace(/<style>[\s\S]*?<\/style>/g, '');
  const skills = (body.match(/id="skills"[\s\S]*?<\/section>/) ?? [''])[0] + (body.match(/id="languages"[\s\S]*?<\/section>/) ?? [''])[0];
  if (/\d\s?%/.test(skills)) bad.push('percentage in skills/languages');
  if (/(width|--level|--pct)\s*:\s*\d+%/i.test(body)) bad.push('inline width/percent styling (possible bar)');
  if (cv.basics.email && !body.includes(cv.basics.email)) bad.push('email missing from body');
  return bad;
}
