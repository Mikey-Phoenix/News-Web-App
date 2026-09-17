import puppeteer, { Browser } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

let browserPromise: Promise<Browser> | null = null;

export function getBrowser(): Promise<Browser> {
  if (!browserPromise) {
    browserPromise = (async () => {
      const executablePath = await chromium.executablePath();
      const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath,
        headless: true,
      });

      browser.on('disconnected', () => {
        console.warn('Puppeteer browser disconnected — will relaunch on next request');
        browserPromise = null;
      });

      return browser;
    })().catch((err) => {
      console.error('Failed to launch browser:', err);
      browserPromise = null;
      throw err;
    });
  }
  return browserPromise;
}