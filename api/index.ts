import express from 'express';
import cors from 'cors';
import puppeteer, { Browser } from 'puppeteer-core';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import chromium from '@sparticuz/chromium';


const app = express();
app.use(cors());
app.use(express.json());

interface NewsArticle {
  title: string;
  image: string | null;
  description: string;
  date: string | null;
  tag: string | null;
  url: string;
  author?: string | null;
  body?: string | null;
}

// --- Shared Puppeteer browser (singleton, launched once and reused) ---
let browserInstance: Browser | null = null;

// const getBrowser = async (): Promise<Browser> => {
//   if (browserInstance && browserInstance.connected) {
//     return browserInstance;
//   }
//   browserInstance = await puppeteer.launch({
//     executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
//     // executablePath: API_URL,
//     headless: 'new' as any,
//     args: [
//       '--no-sandbox',
//       '--disable-setuid-sandbox',
//       '--disable-dev-shm-usage',
//       '--disable-gpu',
//     ],
//   });
//   return browserInstance;
// };
const getBrowser = async (): Promise<Browser> => {
  if (browserInstance && browserInstance.connected) {
    return browserInstance;
  }
  browserInstance = await puppeteer.launch({
    executablePath: await chromium.executablePath(),
    headless: true,
    args: chromium.args,
  });
  return browserInstance;
};

// Clean shutdown on exit
process.on('SIGINT', async () => {
  if (browserInstance) await browserInstance.close();
  process.exit(0);
});

// Prevent the whole server from crashing on stray unhandled errors —
// log them instead so a single bad request can't take everything down.
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

// --- Shared helper: get page HTML via a tab on the shared browser ---
const getPageHTML = async (url: string, waitFor?: string): Promise<string> => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    // Override default 60s timeout
    page.setDefaultNavigationTimeout(120000);
    page.setDefaultTimeout(120000);

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

    // Block unnecessary resources to speed up page load
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      // req.abort()/req.continue() throw if the request was already handled
      // (e.g. page navigated/closed mid-flight) — swallow that instead of
      // letting it become an unhandled rejection that crashes the process.
      try {
        const blocked = ['stylesheet', 'font', 'media'];
        if (blocked.includes(req.resourceType())) {
          req.abort();
        } else {
          req.continue();
        }
      } catch {
        // request already handled or page closed — safe to ignore
      }
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    console.log('Navigating to:', url);
    if (waitFor) {
      await page.waitForSelector(waitFor, { timeout: 10000 }).catch(() => {
        console.log(`Selector never appeared: ${waitFor}`);
      });
    }
    const html = await page.content();
    return html;
  } finally {
    await page.close();
  }
};

// --- Shared helper: extract highest resolution image from srcset or src ---
const getImage = (img: cheerio.Cheerio<any>): string | null => {
  const srcset = img.attr('srcset');
  if (srcset) {
    const urls = srcset
      .split(',')
      .map((s: string) => s.trim().split(' ')[0])
      .filter(Boolean);
    return urls[urls.length - 1] || null;
  }
  return img.attr('src') || null;
};

// -----------------------------------------------------------
// SCRAPE FUNCTIONS — one per category, shared between individual
// endpoints and the combined /api/scrape-all endpoint.
// -----------------------------------------------------------

// News — bbc.com/news
const scrapeNews = async (url: string): Promise<NewsArticle[]> => {
  const html = await getPageHTML(url);
  const $ = cheerio.load(html);
  const articles: NewsArticle[] = [];
  const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
  const baseUrl = 'https://www.bbc.com/news';

  $('[data-testid="dundee-card"]').each((_: number, el: any) => {
    const container = $(el);

    const title = clean(
      container.find('h2[data-testid="card-headline"]').first().text() ||
      container.find('[data-testid="card-headline"]').first().text()
    );
    const description = clean(container.find('p[data-testid="card-description"]').first().text());
    const href = container.find('a[data-testid="internal-link"]').first().attr('href') || '';
    const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;
    const image = getImage(container.find('div[data-testid="card-media"] > div > div > img').first());
    const date = clean(container.find('[data-testid="card-metadata-lastupdated"]').first().text()) || null;
    const tag = clean(container.find('[data-testid="card-metadata-tag"]').first().text()) || null;

    if (title && articleUrl) {
      articles.push({ title, image, description, date, tag, url: articleUrl });
    }
  });

  if (articles.length === 0) {
    throw new Error('No news articles found. BBC may have updated their class names.');
  }
  return articles;
};

// Sport — bbc.com/sport
const scrapeSport = async (url: string): Promise<NewsArticle[]> => {
  const html = await getPageHTML(url);
  const $ = cheerio.load(html);
  const articles: NewsArticle[] = [];
  const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
  const baseUrl = 'https://www.bbc.com/sport';

  // Using data-testid="promo" as it's more stable than generated class names
  $('[data-testid="promo"]').each((_: number, el: any) => {
    const container = $(el);

    // Title — navigate through the promo headline structure
    const title = clean(
      container.find('.ssrcss-6bmydz-PromoHeadline span[aria-hidden="false"]').first().text()
    );

    // Description — paragraph beneath the title
    const description = clean(
      container.find('.ssrcss-1q0x1qg-Paragraph').first().text()
    );

    // URL — href on the promo link
    const href = container.find('.ssrcss-1xznhic-PromoLink').first().attr('href') || '';
    const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;

    // Image — sport uses <picture> with <source> tags
    const image = (() => {
      const srcset = container.find('picture source').first().attr('srcset');
      if (srcset) {
        const urls = srcset
          .split(',')
          .map((s: string) => s.trim().split(' ')[0])
          .filter(Boolean);
        return urls[urls.length - 1] || null;
      }
      return container.find('picture img').first().attr('src') || null;
    })();

    // Tag — e.g. "Premier League", "Formula 1"
    const tag = clean(
      container.find('.ssrcss-61mhsj-MetadataText').first().text()
    ) || null;

    // Date — the visually hidden time text e.g. "2 hours ago"
    const date = clean(
      container.find('.visually-hidden').last().text()
    ) || null;

    if (title && articleUrl) {
      articles.push({ title, image, description, date, tag, url: articleUrl });
    }
  });

  if (articles.length === 0) {
    throw new Error('No sport articles found.');
  }
  return articles;
};

// Technology — bbc.com/technology
const scrapeTech = async (url: string): Promise<NewsArticle[]> => {
  const html = await getPageHTML(url);
  const $ = cheerio.load(html);
  const articles: NewsArticle[] = [];
  const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
  const baseUrl = 'https://www.bbc.com';

  $('div[data-testid="birmingham-card"], div[data-testid="dundee-card"]').each((_: number, el: any) => {
    // ... => {
    const container = $(el);

    const href = container.attr('href') || '';
    const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;
    const title = clean(container.find('[data-testid="card-headline"]').first().text());
    const description = clean(container.find('[data-testid="card-description"]').first().text());
    const image = getImage(container.find('div[data-testid="card-media"] > div > div > img').first());
    const date = clean(container.find('[data-testid="card-metadata-lastupdated"]').first().text()) || null;
    const tag = clean(container.find('[data-testid="card-metadata-tag"]').first().text()) || null;

    if (title && articleUrl) {
      articles.push({ title, image, description, date, tag, url: articleUrl });
    }
  });

  if (articles.length === 0) {
    throw new Error('No technology articles found.');
  }
  return articles;
};

// Health — bbc.com/health
const scrapeHealth = async (url: string): Promise<NewsArticle[]> => {
  const html = await getPageHTML(url);
  const $ = cheerio.load(html);
  const articles: NewsArticle[] = [];
  const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
  const baseUrl = 'https://www.bbc.com';

  console.log('HTML length:', html.length);
  console.log('internal-link count:', $('[data-testid="internal-link"]').length);
  console.log('card-headline count:', $('[data-testid="card-headline"]').length);

  // Container — anchor tag with data-testid="internal-link" wrapping a dundee-article
  $('div[data-testid="birmingham-card"], div[data-testid="dundee-card"]').each((_: number, el: any) => {
    const container = $(el);

    // URL — href on the anchor tag itself
    const href = container.attr('href') || '';
    const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;

    // Title — data-testid="card-headline"
    const title = clean(container.find('[data-testid="card-headline"]').first().text());

    // Description — data-testid="card-description"
    const description = clean(container.find('[data-testid="card-description"]').first().text());

    // Image — img with classes sc-5340b511-0 and hLdNfA
    const image = getImage(container.find('div[data-testid="card-media"] > div > div > img').first());

    // Tag and date — not present in this card structure
    const tag: string | null = null;
    const date: string | null = null;

    if (title && articleUrl) {
      articles.push({ title, image, description, date, tag, url: articleUrl });
    }
  });

  if (articles.length === 0) {
    throw new Error('No health articles found.');
  }
  return articles;
};

// Business — bbc.com/business
const scrapeBusiness = async (url: string): Promise<NewsArticle[]> => {
  const html = await getPageHTML(url);
  const $ = cheerio.load(html);
  const articles: NewsArticle[] = [];
  const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
  const baseUrl = 'https://www.bbc.com';

  // Container — data-testid="dundee-card"
  $('[data-testid="dundee-card"]').each((_: number, el: any) => {
    const container = $(el);

    // URL — href on the internal-link anchor inside the card
    const href = container.find('a[data-testid="internal-link"]').first().attr('href') || '';
    const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;

    // Title — data-testid="card-headline"
    const title = clean(container.find('[data-testid="card-headline"]').first().text());

    // Description — data-testid="card-description"
    const description = clean(container.find('[data-testid="card-description"]').first().text());

    // Image — img with classes sc-5340b511-0 and hLdNfA
    const image = getImage(container.find('div[data-testid="card-media"] > div > div > img').first());

    // Date — data-testid="card-metadata-lastupdated"
    const date = clean(
      container.find('[data-testid="card-metadata-lastupdated"]').first().text()
    ) || null;

    // Tag — data-testid="card-metadata-tag" e.g. "Business", "Health"
    const tag = clean(
      container.find('[data-testid="card-metadata-tag"]').first().text()
    ) || null;

    if (title && articleUrl) {
      articles.push({ title, image, description, date, tag, url: articleUrl });
    }
  });

  if (articles.length === 0) {
    throw new Error('No business articles found.');
  }
  return articles;
};

// Entertainment — bbc.com/entertainment
const scrapeEntertainment = async (url: string): Promise<NewsArticle[]> => {
  const html = await getPageHTML(url);
  const $ = cheerio.load(html);
  const articles: NewsArticle[] = [];
  const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
  const baseUrl = 'https://www.bbc.com';

  // Container — data-testid="dundee-card"
  $('[data-testid="dundee-card"]').each((_: number, el: any) => {
    const container = $(el);

    // URL — href on the internal-link anchor inside the card
    const href = container.find('a[data-testid="internal-link"]').first().attr('href') || '';
    const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;

    // Title — data-testid="card-headline"
    const title = clean(container.find('[data-testid="card-headline"]').first().text());

    // Description — data-testid="card-description"
    const description = clean(container.find('[data-testid="card-description"]').first().text());

    // Image — img with classes sc-5340b511-0 and hLdNfA
    const image = getImage(container.find('div[data-testid="card-media"] > div > div > img').first());

    // Date — data-testid="card-metadata-lastupdated"
    const date = clean(
      container.find('[data-testid="card-metadata-lastupdated"]').first().text()
    ) || null;

    // Tag — data-testid="card-metadata-tag" e.g. "Business", "Health"
    const tag = clean(
      container.find('[data-testid="card-metadata-tag"]').first().text()
    ) || null;

    if (title && articleUrl) {
      articles.push({ title, image, description, date, tag, url: articleUrl });
    }
  });

  if (articles.length === 0) {
    throw new Error('No entertainment articles found.');
  }
  return articles;
};

// Video — bbc.com/video
const scrapeVideo = async (url: string): Promise<NewsArticle[]> => {
  // const html = await getPageHTML(url);
  const html = await getPageHTML(url, '[data-testid="anchor-inner-wrapper"]');

  // fs.writeFileSync(path.join(process.cwd(), 'debug.html'), html);
  const $ = cheerio.load(html);
  const articles: NewsArticle[] = [];
  const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
  const baseUrl = 'https://www.bbc.com';

  $('[data-testid="anchor-inner-wrapper"]').each((_: number, el: any) => {
    const container = $(el);

    // URL — href on the internal-link anchor
    const href = container.find('a[data-testid="internal-link"]').first().attr('href') || '';
    const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;

    // Title
    const title = clean(container.find('[data-testid="card-headline"]').first().text());

    // Description
    const description = clean(container.find('[data-testid="card-description"]').first().text());

    // Image — no more hashed classes, just target the img inside card-media
    const image = getImage(container.find('[data-testid="card-media"] img').first());

    // Tag
    const tag = clean(
      container.find('[data-testid="card-metadata-tag"]').first().text()
    ) || null;

    const date: string | null = null;

    if (title && href) {
      articles.push({ title, image, description, date, tag, url: articleUrl });
    }
  });

  if (articles.length === 0) {
    throw new Error('No reel articles found.');
  }
  return articles;
};

// -----------------------------------------------------------
// ENDPOINT 1: BBC News — /api/scrape
// Targets: bbc.com/news
// Container: .sc-82b3c53b-0
// -----------------------------------------------------------
app.get('/api/scrape', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const articles = await scrapeNews(url);
    res.json({ success: true, count: articles.length, data: articles });
  } catch (error: any) {
    console.error('NEWS SCRAPE ERROR:', error.message);
    if (error.message.includes('No news articles found')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------------
// ENDPOINT 2: BBC Sport — /api/scrape-sport
// Targets: bbc.com/sport
// Container: [data-testid="promo"]
// -----------------------------------------------------------
app.get('/api/scrape-sport', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const articles = await scrapeSport(url);
    res.json({ success: true, count: articles.length, data: articles });
  } catch (error: any) {
    console.error('SPORT SCRAPE ERROR:', error.message);
    if (error.message.includes('No sport articles found')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------------
// ENDPOINT 3: BBC Technology — /api/scrape-tech
// Targets: bbc.com/technology
// -----------------------------------------------------------
app.get('/api/scrape-tech', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const articles = await scrapeTech(url);
    res.json({ success: true, count: articles.length, data: articles });
  } catch (error: any) {
    console.error('TECH SCRAPE ERROR:', error.message);
    if (error.message.includes('No technology articles found')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------------
// ENDPOINT 4: BBC Health — /api/scrape-health
// Targets: bbc.com/health
// -----------------------------------------------------------
app.get('/api/scrape-health', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const articles = await scrapeHealth(url);
    res.json({ success: true, count: articles.length, data: articles });
  } catch (error: any) {
    console.error('HEALTH SCRAPE ERROR:', error.message);
    if (error.message.includes('No health articles found')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/scrape-business', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const articles = await scrapeBusiness(url);
    res.json({ success: true, count: articles.length, data: articles });
  } catch (error: any) {
    console.error('BUSINESS SCRAPE ERROR:', error.message);
    if (error.message.includes('No business articles found')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/scrape-entertainment', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const articles = await scrapeEntertainment(url);
    res.json({ success: true, count: articles.length, data: articles });
  } catch (error: any) {
    console.error('ENTERTAINMENT SCRAPE ERROR:', error.message);
    if (error.message.includes('No entertainment articles found')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/scrape-video', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const articles = await scrapeVideo(url);
    res.json({ success: true, count: articles.length, data: articles });
  } catch (error: any) {
    console.error('REELS SCRAPE ERROR:', error.message);
    if (error.message.includes('No reel articles found')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

const scrapeArticle = async (url: string): Promise<NewsArticle> => {
  const html = await getPageHTML(url);
  const $ = cheerio.load(html);
  const clean = (text: string) => text.replace(/\s+/g, ' ').trim();

  // Title: match on partial class name (handles extra/hashed classes BBC may append)
  const title = clean(
    $('h1[class*="Headline-styles__HeadlineStyled-sc-6b3bb442-0"]').first().text() ||
    $('h1[class*="fxASub"]').first().text() ||
    $('h1[data-testid="headline"]').first().text() // fallback if BBC adds a stable testid
  );

  const author = clean($('[data-testid="byline-contributors"]').first().text()) || null;

  const date =
    $('time').first().attr('datetime') ||
    clean($('time').first().text()) ||
    null;

  const image = getImage($('[data-testid="hero-image"] img').first());

  // Body text: relaxed depth requirement — don't assume exactly 3 wrapper divs
  const paragraphs: string[] = [];
  $('[data-component="text-block"] p, [data-component="layout-block"] p').each(
    (_: number, el: any) => {
      const text = clean($(el).text());
      if (text) paragraphs.push(text);
    }
  );
  const body = paragraphs.join('\n\n');

  const tag = clean($('[data-testid="card-metadata-tag"]').first().text()) || null;

  if (!title || paragraphs.length === 0) {
    // Diagnostic logging to identify which selector failed and on what URL
    console.error('scrapeArticle failed:', {
      url,
      titleFound: !!title,
      paragraphCount: paragraphs.length,
    });
    throw new Error('No article content found. BBC may have updated their class names.');
  }

  return { title, image, description: paragraphs[0] ?? '', date, tag, author, url, body };
};

app.get('/api/scrape-article', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const article = await scrapeArticle(url);
    res.json({ success: true, data: article });
  } catch (error: any) {
    console.error('ARTICLE SCRAPE ERROR:', error.message);
    if (error.message.includes('No article content found')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------------
// ENDPOINT: Combined — /api/scrape-all
// Runs every category in parallel (sharing the one browser instance)
// and returns whatever succeeds, even if some categories fail.
// -----------------------------------------------------------
app.get('/api/scrape-all', async (req, res) => {
  const {
    newsUrl,
    sportUrl,
    techUrl,
    healthUrl,
    businessUrl,
    entertainmentUrl,
    videoUrl,
  } = req.query as Record<string, string | undefined>;

  const jobs: { key: string; url: string; fn: (url: string) => Promise<NewsArticle[]> }[] = [];

  if (newsUrl) jobs.push({ key: 'news', url: newsUrl, fn: scrapeNews });
  if (sportUrl) jobs.push({ key: 'sport', url: sportUrl, fn: scrapeSport });
  if (techUrl) jobs.push({ key: 'tech', url: techUrl, fn: scrapeTech });
  if (healthUrl) jobs.push({ key: 'health', url: healthUrl, fn: scrapeHealth });
  if (businessUrl) jobs.push({ key: 'business', url: businessUrl, fn: scrapeBusiness });
  if (entertainmentUrl) jobs.push({ key: 'entertainment', url: entertainmentUrl, fn: scrapeEntertainment });
  if (videoUrl) jobs.push({ key: 'video', url: videoUrl, fn: scrapeVideo });

  if (jobs.length === 0) {
    return res.status(400).json({ error: 'At least one category URL is required (newsUrl, sportUrl, techUrl, healthUrl, businessUrl, entertainmentUrl, videoUrl)' });
  }

  const results = await Promise.allSettled(jobs.map((job) => job.fn(job.url)));

  const data: Record<string, NewsArticle[]> = {};
  const errors: Record<string, string> = {};

  results.forEach((result, i) => {
    const key = jobs[i].key;
    if (result.status === 'fulfilled') {
      data[key] = result.value;
    } else {
      const message = result.reason?.message || 'Unknown error';
      console.error(`${key.toUpperCase()} SCRAPE ERROR (scrape-all):`, message);
      errors[key] = message;
    }
  });

  res.json({ success: true, data, errors });
});

export const config = {
  maxDuration: 300,
};

// app.listen(4000, () => console.log('Scraper server running on port 4000'));
export default app;