import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = 'http://localhost:4173';
const OUT = '.tmp/shots';
fs.mkdirSync(OUT, { recursive: true });

const problems = [];
const browser = await chromium.launch();

async function newPage(width, height) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      problems.push(`[console.${msg.type()}] ${width}px: ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => problems.push(`[pageerror] ${width}px: ${err.message}`));
  page.on('requestfailed', (req) => {
    if (!req.url().includes('favicon')) problems.push(`[requestfailed] ${width}px: ${req.url()} ${req.failure()?.errorText}`);
  });
  return { context, page };
}

async function overflow(page, width) {
  const m = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  if (m.scroll > m.client) problems.push(`[overflow] ${width}px: scrollWidth ${m.scroll} > clientWidth ${m.client}`);
  return m;
}

// ── Desktop 1440 ─────────────────────────────────────────────
{
  const { context, page } = await newPage(1440, 900);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${OUT}/desktop-hero.png` });
  await overflow(page, 1440);

  await page.evaluate(() => document.getElementById('about')?.scrollIntoView());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/desktop-about.png` });

  await page.evaluate(() => document.getElementById('skills')?.scrollIntoView());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/desktop-skills.png` });

  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/desktop-projects.png` });

  // Project modal
  await page.getByRole('button', { name: /VIEW PROJECT/ }).first().click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/desktop-project-modal.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  await page.evaluate(() => document.getElementById('services')?.scrollIntoView());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/desktop-services.png` });

  await page.evaluate(() => document.getElementById('gallery')?.scrollIntoView());
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/desktop-gallery.png` });

  // Gallery filter + lightbox
  await page.getByRole('button', { name: 'Graphic designs' }).click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/desktop-gallery-filtered.png` });
  await page.getByRole('button', { name: /View larger/ }).first().click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/desktop-lightbox.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
  await page.waitForTimeout(1200);
  // Trigger validation errors
  await page.getByRole('button', { name: /SEND MESSAGE/ }).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/desktop-contact-errors.png` });
  // Fill and submit → honest "draft" state
  await page.fill('#contact-name', 'Test Visitor');
  await page.fill('#contact-email', 'test@example.com');
  await page.fill('#contact-message', 'Hello Umar, I would love to collaborate on a design project.');
  await page.waitForTimeout(2100);
  await page.getByRole('button', { name: /SEND MESSAGE/ }).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/desktop-contact-draft.png` });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/desktop-footer.png` });

  // Legal modal
  await page.getByRole('button', { name: 'Privacy Policy' }).click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/desktop-privacy.png` });
  await page.keyboard.press('Escape');

  await page.screenshot({ path: `${OUT}/desktop-full.png`, fullPage: true });
  await context.close();
}

// ── Mobile 390 ───────────────────────────────────────────────
{
  const { context, page } = await newPage(390, 844);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${OUT}/mobile-hero.png` });
  await overflow(page, 390);

  // Mobile menu
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/mobile-menu.png` });
  await page.locator('#mobile-menu').getByRole('link', { name: /Projects/ }).click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/mobile-projects.png` });
  await overflow(page, 390);

  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/mobile-contact.png` });
  await page.screenshot({ path: `${OUT}/mobile-full.png`, fullPage: true });
  await context.close();
}

// ── Narrow + tablet widths: overflow sweep ───────────────────
for (const width of [320, 375, 768, 1024]) {
  const { context, page } = await newPage(width, 800);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await overflow(page, width);
  if (width === 768) await page.screenshot({ path: `${OUT}/tablet-hero.png` });
  if (width === 320) await page.screenshot({ path: `${OUT}/narrow-hero.png` });
  await context.close();
}

await browser.close();

if (problems.length) {
  console.log('PROBLEMS FOUND:\n' + [...new Set(problems)].join('\n'));
} else {
  console.log('QA CLEAN: no console errors, no failed requests, no horizontal overflow.');
}
