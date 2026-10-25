import { chromium } from 'playwright';

let browser;
export async function openBrowser() { return (browser ??= await chromium.launch()); }
export async function closeBrowser() { if (browser) await browser.close(); browser = undefined; }

/** Renders html to a tagged PDF. Returns { pages, overflowX } */
export async function renderPdf(html, outPath, tokens) {
  const b = await openBrowser();
  const page = await b.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  const stats = await page.evaluate(() => ({
    overflowX: [...document.querySelectorAll('body *')].filter((e) => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).display !== 'inline' && getComputedStyle(e).overflowX !== 'visible').length,
    wide: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  }));
  const buf = await page.pdf({ path: outPath, preferCSSPageSize: true, printBackground: true, tagged: true, outline: false });
  await page.close();
  const pages = (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  return { pages, ...stats };
}

/** Full-page PNG screenshots per page, via PDF -> not available in Chromium; use print layout screenshot instead. */
export async function screenshotHtml(html, outPath, { width = 794, scale = 1.5 } = {}) {
  const b = await openBrowser();
  const page = await b.newPage({ viewport: { width, height: 1123 }, deviceScaleFactor: scale });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: outPath, fullPage: true });
  await page.close();
}
