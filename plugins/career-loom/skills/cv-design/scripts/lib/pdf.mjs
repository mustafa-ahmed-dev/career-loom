import { chromium } from 'playwright';

let browser;
/**
 * Browser used to print PDFs. Order: CL_BROWSER_PATH (a Chromium-based browser .exe/binary you choose),
 * then Playwright's own Chromium (npx playwright install chromium), then Microsoft Edge, then Google Chrome if installed.
 */
export async function openBrowser() {
  if (browser) return browser;
  const exe = process.env.CL_BROWSER_PATH;
  if (exe) return (browser = await chromium.launch({ executablePath: exe }));
  try {
    return (browser = await chromium.launch());
  } catch (e) {
    if (!/Executable doesn't exist/.test(e.message)) throw e;
    for (const channel of ['msedge', 'chrome']) {
      try { return (browser = await chromium.launch({ channel })); } catch { /* try the next one */ }
    }
    throw new Error("No browser found for PDF output. Playwright's Chromium is not installed (run: npx playwright install chromium), and neither Microsoft Edge nor Google Chrome could be started. You can also set CL_BROWSER_PATH to a Chromium-based browser (for example C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe). HTML output (--format html) does not need a browser.");
  }
}
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
