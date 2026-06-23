import fs from 'fs';
import puppeteer from 'puppeteer-core';

const LINUX_CHROMIUM = '/usr/bin/chromium';

function resolveExecutable() {
  const env = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH;
  if (env && fs.existsSync(env)) return env;
  if (fs.existsSync(LINUX_CHROMIUM)) return LINUX_CHROMIUM;
  if (process.platform === 'win32') {
    const candidates = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ];
    for (const p of candidates) {
      if (fs.existsSync(p)) return p;
    }
  }
  if (process.platform === 'darwin') {
    const mac = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    if (fs.existsSync(mac)) return mac;
  }
  throw new Error(
    'PDF requires Chromium or Google Chrome. Set PUPPETEER_EXECUTABLE_PATH (Docker: /usr/bin/chromium).',
  );
}

/**
 * Renders HTML to a PDF buffer (A4, print margins).
 * @param {string} html
 * @returns {Promise<Buffer>}
 */
export async function renderHtmlToPdf(html) {
  const executablePath = resolveExecutable();
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    const buf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: '18mm', right: '14mm', bottom: '18mm', left: '14mm' },
    });
    return Buffer.from(buf);
  } finally {
    await browser.close();
  }
}
